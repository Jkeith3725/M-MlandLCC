import Papa from 'papaparse';
import { Listing } from './types';
import { withBasePath } from './utils';
import { fetchWithRetryHttp } from './retry';
import { validateListings } from './schemas';

// Conditional server-side imports
let fetchListingsFromSheetWithAuth: (() => Promise<Listing[]>) | null = null;
let saveToCache: ((data: Listing[]) => void) | null = null;
let loadFromCache: (() => Listing[] | null) | null = null;

// Only import server-side modules when not in browser
if (typeof window === 'undefined') {
  try {
    const cacheModule = require('./cache');
    saveToCache = cacheModule.saveToCache;
    loadFromCache = cacheModule.loadFromCache;

    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
      const authModule = require('./google-auth');
      fetchListingsFromSheetWithAuth = authModule.fetchListingsFromSheetWithAuth;
      console.log('🔐 Service Account authentication available');
    }
  } catch (error) {
    console.log('ℹ️  Service Account auth not available, will use public CSV fallback');
  }
}

// Google Sheet ID extracted from your shared link
// https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing
const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';

// Google Sheets CSV export URL for public sheets (fallback method)
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

/**
 * Converts Google Drive sharing links to direct image URLs
 * Supports multiple Google Drive URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?export=view&id=FILE_ID (already converted)
 *
 * @param url - Google Drive sharing URL or any other URL
 * @returns Direct image URL if it's a Google Drive link, otherwise returns original URL
 */
function convertGoogleDriveUrl(url: string): string {
  if (!url || !url.includes('drive.google.com')) {
    return url; // Not a Google Drive link, return as-is
  }

  // Already a direct link
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }

  let fileId: string | null = null;

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }

  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Couldn't parse, return original
  return url;
}

/**
 * Detects which image file extension exists (.jpg or .jpeg) and returns the path
 * Only works during build time (server-side)
 * @param slug - Property slug
 * @param filename - Base filename without extension (e.g., 'thumbnail' or '1')
 * @returns Image path with correct extension, or null if neither exists
 */
function detectImagePath(slug: string, filename: string): string | null {
  // Only run on server-side (during build)
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    const fs = require('fs');
    const path = require('path');
    const basePath = path.join(process.cwd(), 'public', 'images', 'listings', slug);

    // Check .jpeg first (more common for camera uploads)
    const jpegPath = path.join(basePath, `${filename}.jpeg`);
    if (fs.existsSync(jpegPath)) {
      return withBasePath(`/images/listings/${slug}/${filename}.jpeg`);
    }

    // Check .jpg second
    const jpgPath = path.join(basePath, `${filename}.jpg`);
    if (fs.existsSync(jpgPath)) {
      return withBasePath(`/images/listings/${slug}/${filename}.jpg`);
    }
  } catch (error) {
    // fs module not available (client-side), return null
    return null;
  }

  return null; // Neither extension exists
}

/**
 * Converts YouTube URL to embed format
 * Handles watch URLs, short URLs, and embed URLs
 * @param url - YouTube URL in any format
 * @returns YouTube embed URL or original URL if not YouTube
 */
function convertYouTubeUrl(url: string): string {
  if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
    return url;
  }

  // Already an embed URL
  if (url.includes('/embed/')) {
    return url;
  }

  // Extract video ID from watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // Extract video ID from short URL: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  return url;
}

interface SheetRow {
  ID: string;
  Title: string;
  County: string;
  State: string;
  'Nearest Town': string;
  Acreage: string;
  Price: string;
  'Is New Listing': string;
  'Thumbnail Image': string;
  'Additional Photos': string;
  'Short Description': string;
  'Full Overview': string;
  'Road Frontage': string;
  Utilities: string;
  'Parcel ID': string;
  'YouTube URL': string;
  'Google Maps Embed': string;
  Slug: string;
  'Created Date': string;
}

/**
 * Fetches listing data via public CSV export (fallback method)
 * Internal function - use fetchListingsFromSheet() instead
 */
async function fetchFromPublicCSV(): Promise<Listing[]> {
  console.log('📥 Fetching from public CSV export...');

  const response = await fetchWithRetryHttp(SHEET_CSV_URL);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<SheetRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const listings: Listing[] = results.data
            .filter((row) => row.ID && row.Title)
            .map((row) => {
              const slug = row.Slug;
              const photos: string[] = [];

              if (row['Thumbnail Image'] && row['Thumbnail Image'].trim()) {
                photos.push(convertGoogleDriveUrl(row['Thumbnail Image']));
              } else if (slug) {
                const thumbnailPath = detectImagePath(slug, 'thumbnail');
                if (thumbnailPath) {
                  photos.push(thumbnailPath);
                }
              }

              if (row['Additional Photos'] && row['Additional Photos'].trim()) {
                const additionalPhotos = row['Additional Photos']
                  .split(',')
                  .map((p) => p.trim())
                  .filter((p) => p)
                  .map((p) => convertGoogleDriveUrl(p));
                photos.push(...additionalPhotos);
              } else if (slug) {
                for (let i = 1; i <= 25; i++) {
                  const imagePath = detectImagePath(slug, i.toString());
                  if (imagePath) {
                    photos.push(imagePath);
                  }
                }
              }

              const createdAt = row['Created Date']
                ? new Date(row['Created Date'])
                : new Date();

              const isNew =
                row['Is New Listing']?.toUpperCase() === 'TRUE' ||
                row['Is New Listing'] === '1';

              return {
                id: row.ID,
                title: row.Title,
                county: row.County,
                state: row.State as 'OH' | 'WV',
                nearestTown: row['Nearest Town'],
                acreage: parseFloat(row.Acreage),
                price: parseFloat(row.Price),
                isNew,
                photos,
                shortDescription: row['Short Description'] || '',
                overview: row['Full Overview'] || row['Short Description'] || '',
                roadFrontage: row['Road Frontage']?.trim() || undefined,
                utilities: row.Utilities?.trim() || undefined,
                parcelId: row['Parcel ID']?.trim() || undefined,
                youtubeUrl: row['YouTube URL']?.trim() ? convertYouTubeUrl(row['YouTube URL'].trim()) : undefined,
                mapEmbedHtml: row['Google Maps Embed']?.trim() || undefined,
                slug: row.Slug,
                createdAt,
              };
            });

          resolve(listings);
        } catch (error: unknown) {
          console.error('❌ Error parsing sheet data:', error);
          reject(error);
        }
      },
      error: (error: unknown) => {
        console.error('❌ Error parsing CSV:', error);
        reject(error);
      },
    });
  });
}

/**
 * Fetches listing data from Google Sheets with retry logic, validation, and caching
 *
 * Authentication Priority:
 * 1. Service Account (if GOOGLE_SERVICE_ACCOUNT env var is set)
 * 2. Public CSV export (fallback)
 *
 * Features:
 * - Exponential backoff retry logic (5 retries max)
 * - Zod schema validation
 * - File-based caching with fallback
 * - Detailed logging
 *
 * @returns Array of validated Listing objects
 */
export async function fetchListingsFromSheet(): Promise<Listing[]> {
  console.log('\n📊 Starting Google Sheets data fetch...');
  console.log('═'.repeat(60));

  let listings: Listing[] = [];
  let dataSource = 'unknown';

  try {
    // Try Service Account authentication first (if available)
    if (fetchListingsFromSheetWithAuth) {
      try {
        console.log('🔐 Attempting Service Account authentication...');
        listings = await fetchListingsFromSheetWithAuth();
        dataSource = 'Service Account API';
      } catch (authError) {
        console.warn('⚠️  Service Account auth failed, falling back to public CSV');
        console.error('   Error:', authError instanceof Error ? authError.message : String(authError));

        // Fallback to public CSV
        listings = await fetchFromPublicCSV();
        dataSource = 'Public CSV Export';
      }
    } else {
      // Use public CSV directly
      listings = await fetchFromPublicCSV();
      dataSource = 'Public CSV Export';
    }

    // Validate data with Zod
    console.log('\n🔍 Validating data...');
    const validatedListings = validateListings(listings);

    // Save to cache (if available)
    if (saveToCache) {
      console.log('\n💾 Saving to cache...');
      saveToCache(validatedListings);
    }

    console.log('\n✅ SUCCESS');
    console.log(`   Source: ${dataSource}`);
    console.log(`   Listings: ${validatedListings.length}`);
    console.log('═'.repeat(60) + '\n');

    return validatedListings;

  } catch (error: unknown) {
    console.error('\n❌ PRIMARY FETCH FAILED');
    console.error('   Error:', error instanceof Error ? error.message : String(error));

    // Try to load from cache as last resort (if available)
    if (loadFromCache) {
      console.log('\n📂 Attempting to load from cache...');
      const cachedData = loadFromCache();

      if (cachedData && cachedData.length > 0) {
        console.log('🔍 Validating cached data...');
        const validatedCached = validateListings(cachedData);

        console.warn('\n⚠️  USING CACHED DATA (API unavailable)');
        console.warn(`   Listings: ${validatedCached.length}`);
        console.warn('═'.repeat(60) + '\n');

        return validatedCached;
      }
    }

    // No cache available - fail the build
    console.error('\n💥 FATAL: No data available (API failed and no cache)');
    console.error('═'.repeat(60) + '\n');
    throw new Error(
      'Failed to fetch Google Sheets data and no cache available. ' +
      'Build cannot continue without property data.'
    );
  }
}

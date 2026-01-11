import Papa from 'papaparse';
import { Listing } from './types';

// Google Sheet ID extracted from your shared link
// https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing
const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';

// Google Sheets CSV export URL for public sheets
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
 * Fetches listing data from Google Sheets
 * The sheet must be publicly accessible (Anyone with the link can view)
 *
 * @returns Array of Listing objects parsed from the Google Sheet
 */
export async function fetchListingsFromSheet(): Promise<Listing[]> {
  try {
    const response = await fetch(SHEET_CSV_URL);

    if (!response.ok) {
      console.error('Failed to fetch Google Sheet:', response.statusText);
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<SheetRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const listings: Listing[] = results.data
              .filter((row) => row.ID && row.Title) // Filter out empty rows
              .map((row) => {
                const slug = row.Slug;
                const photos: string[] = [];

                // AUTO-DETECT IMAGES: If no images specified in Google Sheets,
                // automatically look for images in /public/images/listings/{slug}/

                // Handle thumbnail image
                if (row['Thumbnail Image'] && row['Thumbnail Image'].trim()) {
                  // Use image specified in Google Sheet
                  photos.push(convertGoogleDriveUrl(row['Thumbnail Image']));
                } else if (slug) {
                  // Auto-detect: Use default thumbnail path with basePath
                  photos.push(`/M-MlandLCC/images/listings/${slug}/thumbnail.jpg`);
                }

                // Handle additional photos
                if (row['Additional Photos'] && row['Additional Photos'].trim()) {
                  // Use images specified in Google Sheet
                  const additionalPhotos = row['Additional Photos']
                    .split(',')
                    .map((p) => p.trim())
                    .filter((p) => p)
                    .map((p) => convertGoogleDriveUrl(p));
                  photos.push(...additionalPhotos);
                } else if (slug) {
                  // Auto-detect: Look for numbered images (1.jpg through 10.jpg) with basePath
                  // These will be tried in order; missing images just won't display
                  for (let i = 1; i <= 10; i++) {
                    photos.push(`/M-MlandLCC/images/listings/${slug}/${i}.jpg`);
                  }
                }

                // Parse the created date
                const createdAt = row['Created Date']
                  ? new Date(row['Created Date'])
                  : new Date();

                // Parse boolean for isNew
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
            console.error('Error parsing sheet data:', error);
            reject(error);
          }
        },
        error: (error: unknown) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        },
      });
    });
  } catch (error: unknown) {
    console.error('Error fetching from Google Sheets:', error);
    throw error;
  }
}

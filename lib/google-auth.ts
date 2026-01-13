/**
 * Google Service Account Authentication
 * Securely authenticates with Google Sheets API using Service Account credentials
 *
 * IMPORTANT: This module must ONLY be used server-side (during build time)
 * Never import this in client-side code
 */

import { google } from 'googleapis';
import { Listing } from './types';
import Papa from 'papaparse';
import { withBasePath } from './utils';

const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';
const SHEET_NAME = 'Sheet1'; // Default sheet name, adjust if needed

// Ensure we're only running server-side
if (typeof window !== 'undefined') {
  throw new Error('google-auth.ts must only be imported server-side');
}

/**
 * Converts Google Drive sharing links to direct image URLs
 */
function convertGoogleDriveUrl(url: string): string {
  if (!url || !url.includes('drive.google.com')) {
    return url;
  }

  if (url.includes('drive.google.com/uc?')) {
    return url;
  }

  let fileId: string | null = null;

  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }

  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  return url;
}

/**
 * Detects which image file extension exists (.jpg or .jpeg)
 */
function detectImagePath(slug: string, filename: string): string | null {
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    const fs = require('fs');
    const path = require('path');
    const basePath = path.join(process.cwd(), 'public', 'images', 'listings', slug);

    const jpegPath = path.join(basePath, `${filename}.jpeg`);
    if (fs.existsSync(jpegPath)) {
      return withBasePath(`/images/listings/${slug}/${filename}.jpeg`);
    }

    const jpgPath = path.join(basePath, `${filename}.jpg`);
    if (fs.existsSync(jpgPath)) {
      return withBasePath(`/images/listings/${slug}/${filename}.jpg`);
    }
  } catch (error) {
    return null;
  }

  return null;
}

/**
 * Converts YouTube URL to embed format
 */
function convertYouTubeUrl(url: string): string {
  if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
    return url;
  }

  if (url.includes('/embed/')) {
    return url;
  }

  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

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
 * Creates authenticated Google Sheets client
 * @returns Authenticated Sheets API client
 */
async function getAuthenticatedSheetsClient() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT;

  if (!serviceAccountJson) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT environment variable is not set. ' +
      'Please provide Service Account credentials as a JSON string.'
    );
  }

  let credentials;
  try {
    credentials = JSON.parse(serviceAccountJson);
  } catch (error) {
    throw new Error(
      'Failed to parse GOOGLE_SERVICE_ACCOUNT JSON. ' +
      'Ensure it contains valid Service Account credentials.'
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient as any });

  return sheets;
}

/**
 * Fetches listing data from Google Sheets using Service Account authentication
 * @returns Array of Listing objects
 */
export async function fetchListingsFromSheetWithAuth(): Promise<Listing[]> {
  console.log('🔐 Authenticating with Google Sheets API...');

  const sheets = await getAuthenticatedSheetsClient();

  console.log(`📊 Fetching data from sheet: ${SHEET_ID}`);

  // Fetch all data from the sheet
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:S`, // Adjust range if you have more/fewer columns
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    console.warn('⚠️  No data found in Google Sheet');
    return [];
  }

  // First row is headers
  const headers = rows[0];
  const dataRows = rows.slice(1);

  console.log(`📋 Found ${dataRows.length} rows in sheet`);

  // Convert rows to CSV format for Papa Parse compatibility
  const csvData = [headers, ...dataRows]
    .map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return new Promise((resolve, reject) => {
    Papa.parse<SheetRow>(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const listings: Listing[] = results.data
            .filter((row) => row.ID && row.Title)
            .map((row) => {
              const slug = row.Slug;
              const photos: string[] = [];

              // Handle thumbnail image
              if (row['Thumbnail Image'] && row['Thumbnail Image'].trim()) {
                photos.push(convertGoogleDriveUrl(row['Thumbnail Image']));
              } else if (slug) {
                const thumbnailPath = detectImagePath(slug, 'thumbnail');
                if (thumbnailPath) {
                  photos.push(thumbnailPath);
                }
              }

              // Handle additional photos
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

          console.log(`✅ Successfully parsed ${listings.length} listings`);
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

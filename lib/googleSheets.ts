import Papa from 'papaparse';
import { Listing } from './types';

// Google Sheet ID extracted from your shared link
// https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing
const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';

// Google Sheets CSV export URL for public sheets
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

/**
 * Converts Google Drive sharing links to direct image URLs
 *
 * UPDATED FOR 2025: Google deprecated the uc?export=view method in January 2024.
 * Now using lh3.googleusercontent.com which is the most reliable method as of 2025.
 *
 * Supports multiple Google Drive URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 * - https://drive.google.com/open?id=FILE_ID
 *
 * Converts to: https://lh3.googleusercontent.com/d/FILE_ID
 *
 * @param url - Google Drive sharing URL or any other URL
 * @returns Direct image URL if it's a Google Drive link, otherwise returns original URL
 */
function convertGoogleDriveUrl(url: string): string {
  if (!url || !url.includes('drive.google.com')) {
    return url; // Not a Google Drive link, return as-is
  }

  // Already converted to lh3 format
  if (url.includes('lh3.googleusercontent.com')) {
    return url;
  }

  // Already converted to thumbnail format
  if (url.includes('drive.google.com/thumbnail')) {
    return url;
  }

  let fileId: string | null = null;

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }
  }

  if (fileId) {
    // Use lh3.googleusercontent.com - most reliable method as of 2025
    // This works better than the deprecated uc?export=view method
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Couldn't parse, return original
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
                // Automatically convert Google Drive links to direct image URLs
                const thumbnailUrl = convertGoogleDriveUrl(row['Thumbnail Image']);
                const photos = [thumbnailUrl];

                if (row['Additional Photos']) {
                  const additionalPhotos = row['Additional Photos']
                    .split(',')
                    .map((p) => p.trim())
                    .filter((p) => p)
                    .map((p) => convertGoogleDriveUrl(p)); // Convert each photo URL
                  photos.push(...additionalPhotos);
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
                  roadFrontage: row['Road Frontage'] || undefined,
                  utilities: row.Utilities || undefined,
                  parcelId: row['Parcel ID'] || undefined,
                  youtubeUrl: row['YouTube URL'] || undefined,
                  mapEmbedHtml: row['Google Maps Embed'] || undefined,
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

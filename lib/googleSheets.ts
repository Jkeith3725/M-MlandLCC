import Papa from 'papaparse';
import { Listing } from './types';

// Google Sheet ID extracted from your shared link
// https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing
const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';

// Google Sheets CSV export URL for public sheets
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

/**
 * Processes image URLs from Google Sheets
 *
 * IMPORTANT: Google Drive is NOT reliable for image hosting (returns 403 errors).
 *
 * Recommended image sources:
 * - Local repo images: /images/listings/property-1.jpg (MOST RELIABLE)
 * - Imgur: https://i.imgur.com/ABC123.jpg (FREE, RELIABLE)
 * - Cloudinary: https://res.cloudinary.com/account/image/upload/v1/file.jpg (PROFESSIONAL)
 *
 * @param url - Image URL from Google Sheet
 * @returns The URL as-is (no conversion needed for supported sources)
 */
function processImageUrl(url: string): string {
  if (!url || url.trim() === '') {
    return '';
  }

  // Return URL as-is - works for:
  // - Local paths: /images/listings/property-1.jpg
  // - Imgur: https://i.imgur.com/...
  // - Cloudinary: https://res.cloudinary.com/...
  // - Any other direct image URL

  return url.trim();
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
                // Process image URLs (supports local paths, Imgur, Cloudinary, etc.)
                const thumbnailUrl = processImageUrl(row['Thumbnail Image']);
                const photos = thumbnailUrl ? [thumbnailUrl] : [];

                if (row['Additional Photos']) {
                  const additionalPhotos = row['Additional Photos']
                    .split(',')
                    .map((p) => p.trim())
                    .filter((p) => p)
                    .map((p) => processImageUrl(p)); // Process each photo URL
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

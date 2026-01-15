import Papa from 'papaparse';
import { Listing } from './types';

// Google Sheet ID from your shared link
const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';
const SHEET_GID = '1534947356'; // The gid for the property-inventory tab

// Multiple URL formats to try (in order of reliability)
const SHEET_URLS = [
  // Export format with specific gid
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`,
  // Export format with gid=0 (first sheet fallback)
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`,
  // Published CSV format
  `https://docs.google.com/spreadsheets/d/e/2PACX-1vSgsyLesTzBWCoAu8l9Bx5zjYYxqf7qYvR8KWa9ddAk2cTRmXK5OPCP5M3ve4ilT5vxjlf3rJHUL4Jq/pub?gid=${SHEET_GID}&single=true&output=csv`,
  // gviz format - works when sheet is shared as "anyone with link"
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=property-inventory`,
];

const BASE_PATH = '/M-MlandLCC';

/**
 * Detects which image files exist for a listing and returns their paths
 */
function getImagePaths(slug: string): string[] {
  if (typeof window !== 'undefined') return [];

  try {
    const fs = require('fs');
    const path = require('path');
    const listingDir = path.join(process.cwd(), 'public', 'images', 'listings', slug);

    if (!fs.existsSync(listingDir)) return [];

    const files = fs.readdirSync(listingDir);
    const images: string[] = [];

    // Add thumbnail first if it exists
    const thumbnail = files.find((f: string) => f.startsWith('thumbnail'));
    if (thumbnail) {
      images.push(`${BASE_PATH}/images/listings/${slug}/${thumbnail}`);
    }

    // Add numbered images in order
    for (let i = 1; i <= 50; i++) {
      const jpg = files.find((f: string) => f === `${i}.jpg`);
      const jpeg = files.find((f: string) => f === `${i}.jpeg`);
      if (jpg) images.push(`${BASE_PATH}/images/listings/${slug}/${jpg}`);
      else if (jpeg) images.push(`${BASE_PATH}/images/listings/${slug}/${jpeg}`);
    }

    return images;
  } catch {
    return [];
  }
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
 * Fetches listings from the public Google Sheet CSV export
 * Tries multiple URL formats for maximum reliability
 */
export async function fetchListingsFromSheet(): Promise<Listing[]> {
  console.log('📊 Fetching from public Google Sheet...');

  let csvText: string | null = null;
  let lastError: Error | null = null;

  // Try each URL format until one works
  for (const url of SHEET_URLS) {
    try {
      console.log(`🔄 Trying URL format: ${url.substring(0, 60)}...`);
      const response = await fetch(url);

      if (response.ok) {
        csvText = await response.text();
        console.log(`✅ Successfully fetched from Google Sheet`);
        break;
      } else {
        console.log(`❌ URL returned HTTP ${response.status}`);
        lastError = new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ URL failed: ${error}`);
      lastError = error as Error;
    }
  }

  if (!csvText) {
    throw new Error(`All Google Sheet URL formats failed. Last error: ${lastError?.message}. Ensure the sheet is shared as "Anyone with the link can view".`);
  }

  return new Promise((resolve, reject) => {
    Papa.parse<SheetRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const listings: Listing[] = results.data
            .filter((row) => row.ID && row.Title && row.Slug)
            .map((row) => {
              const slug = row.Slug.trim();
              const photos = getImagePaths(slug);

              return {
                id: row.ID,
                title: row.Title,
                county: row.County,
                state: row.State as 'OH' | 'WV',
                nearestTown: row['Nearest Town'],
                acreage: parseFloat(row.Acreage) || 0,
                price: parseFloat(row.Price) || 0,
                isNew: row['Is New Listing']?.toUpperCase() === 'TRUE',
                photos,
                shortDescription: row['Short Description'] || '',
                overview: row['Full Overview'] || row['Short Description'] || '',
                roadFrontage: row['Road Frontage']?.trim() || undefined,
                utilities: row.Utilities?.trim() || undefined,
                parcelId: row['Parcel ID']?.trim() || undefined,
                youtubeUrl: row['YouTube URL']?.trim() || undefined,
                mapEmbedHtml: row['Google Maps Embed']?.trim() || undefined,
                slug,
                createdAt: row['Created Date'] ? new Date(row['Created Date']) : new Date(),
              };
            });

          console.log(`✅ Parsed ${listings.length} listings from Google Sheet`);
          resolve(listings);
        } catch (error) {
          console.error('❌ Error parsing CSV data:', error);
          reject(error);
        }
      },
      error: (error: Error) => {
        console.error('❌ CSV parse error:', error);
        reject(error);
      },
    });
  });
}

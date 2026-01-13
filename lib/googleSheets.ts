import Papa from 'papaparse';
import { Listing } from './types';
import { MOCK_LISTINGS } from './mockData';

// Google Sheet ID from your shared link
const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=property-inventory`;

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
 * Falls back to hardcoded data if fetch fails
 */
export async function fetchListingsFromSheet(): Promise<Listing[]> {
  console.log('📊 Fetching from public Google Sheet...');

  try {
    const response = await fetch(SHEET_CSV_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const csvText = await response.text();

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

            console.log(`✅ Fetched ${listings.length} listings from Google Sheet`);
            resolve(listings);
          } catch (error) {
            console.error('❌ Error parsing CSV:', error);
            reject(error);
          }
        },
        error: (error: Error) => {
          console.error('❌ CSV parse error:', error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('❌ Failed to fetch from Google Sheet:', error);
    console.log('📦 Using fallback data...');
    return MOCK_LISTINGS;
  }
}

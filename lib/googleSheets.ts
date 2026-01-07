import Papa from 'papaparse';
import { Listing } from './types';

// Google Sheet ID extracted from your shared link
const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';

// Google Sheets CSV export URL for public sheets
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

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
 * Fetches property listings from Google Sheets
 * @returns Promise<Listing[]> Array of property listings
 */
export async function fetchListingsFromSheet(): Promise<Listing[]> {
  try {
    // Fetch the CSV data from Google Sheets
    const response = await fetch(SHEET_CSV_URL, {
      cache: 'no-store', // Always fetch fresh data during build
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
    }

    const csvText = await response.text();

    // Parse CSV using papaparse
    const parseResult = Papa.parse<SheetRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (parseResult.errors.length > 0) {
      console.error('CSV parsing errors:', parseResult.errors);
    }

    // Transform CSV rows into Listing objects
    const listings: Listing[] = parseResult.data
      .filter((row) => row.ID && row.Title) // Skip rows without ID or Title
      .map((row) => {
        // Parse photos - thumbnail + additional photos
        const photos = [row['Thumbnail Image']];
        if (row['Additional Photos']) {
          const additionalPhotos = row['Additional Photos']
            .split(',')
            .map((p) => p.trim())
            .filter((p) => p);
          photos.push(...additionalPhotos);
        }

        // Parse date
        let createdAt: Date;
        try {
          createdAt = new Date(row['Created Date']);
          if (isNaN(createdAt.getTime())) {
            createdAt = new Date(); // Fallback to current date
          }
        } catch {
          createdAt = new Date();
        }

        return {
          id: row.ID,
          slug: row.Slug || row.Title.toLowerCase().replace(/\s+/g, '-'),
          title: row.Title,
          state: (row.State.toUpperCase() === 'OH' || row.State.toUpperCase() === 'WV'
            ? row.State.toUpperCase()
            : 'OH') as 'OH' | 'WV',
          county: row.County,
          nearestTown: row['Nearest Town'],
          acreage: parseFloat(row.Acreage) || 0,
          price: parseFloat(row.Price) || 0,
          isNew: row['Is New Listing']?.toUpperCase() === 'TRUE',
          shortDescription: row['Short Description'] || '',
          overview: row['Full Overview'] || '',
          photos: photos.filter((p) => p), // Remove empty strings
          roadFrontage: row['Road Frontage'] || undefined,
          utilities: row.Utilities || undefined,
          parcelId: row['Parcel ID'] || undefined,
          youtubeUrl: row['YouTube URL'] || undefined,
          mapEmbedHtml: row['Google Maps Embed'] || undefined,
          createdAt,
        };
      });

    console.log(`✅ Fetched ${listings.length} listings from Google Sheets`);
    return listings;
  } catch (error) {
    console.error('❌ Error fetching from Google Sheets:', error);
    // Return empty array if fetch fails - this prevents build failure
    // You could also fallback to mockData here if needed
    return [];
  }
}

/**
 * Get featured listings (newest 6)
 * @returns Promise<Listing[]> Up to 6 featured listings
 */
export async function getFeaturedListingsFromSheet(): Promise<Listing[]> {
  const listings = await fetchListingsFromSheet();
  return listings
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);
}

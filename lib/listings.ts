import { Listing } from './types';
import listingsData from '@/data/listings.json';

const BASE_PATH = '';

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

/**
 * Gets all listings from the local JSON file
 */
export function getListingsFromData(): Listing[] {
  return listingsData.listings.map((item) => {
    const photos = getImagePaths(item.slug);

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      county: item.county,
      state: item.state as 'OH' | 'WV',
      nearestTown: item.nearestTown,
      acreage: item.acreage,
      price: item.price,
      isNew: item.isNew,
      photos,
      shortDescription: item.shortDescription,
      overview: item.overview,
      roadFrontage: item.roadFrontage || undefined,
      utilities: item.utilities || undefined,
      parcelId: item.parcelId || undefined,
      youtubeUrl: item.youtubeUrl || undefined,
      mapEmbedHtml: item.mapEmbedHtml || undefined,
      createdAt: new Date(item.createdAt),
    };
  });
}

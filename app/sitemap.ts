import { MetadataRoute } from 'next';
import { getListingsFromData } from '@/lib/listings';

const SITE_URL = 'https://mmlandsales.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const listings = getListingsFromData();

  const listingUrls: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${SITE_URL}/listings/${listing.slug}`,
    lastModified: listing.createdAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...listingUrls,
  ];
}

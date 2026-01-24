import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getListingsFromData } from '@/lib/listings';
import { ListingsClient } from './ListingsClient';

export const metadata: Metadata = {
  title: 'Land for Sale - Browse All Listings',
  description: 'Browse available hunting, timber, and recreational land for sale in Ohio and West Virginia. Filter by county, price, and acreage to find your perfect property.',
  keywords: ['land listings', 'land for sale Ohio', 'land for sale West Virginia', 'hunting property', 'timber land', 'recreational land', 'acreage for sale'],
  openGraph: {
    title: 'Land for Sale - Browse All Listings | M&M Land Company',
    description: 'Browse available hunting, timber, and recreational land for sale in Ohio and West Virginia.',
    url: 'https://mmlandsales.com/listings',
  },
  alternates: {
    canonical: 'https://mmlandsales.com/listings',
  },
};

// This runs at BUILD TIME - reads listings from local JSON
export default async function ListingsPage() {
  const allListings = getListingsFromData();

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <ListingsClient initialListings={allListings} />
    </Suspense>
  );
}

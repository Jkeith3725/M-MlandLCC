import { Suspense } from 'react';
import { fetchListingsFromSheet } from '@/lib/googleSheets';
import { ListingsClient } from './ListingsClient';

// This runs at BUILD TIME - fetches all listings from Google Sheets
export default async function ListingsPage() {
  const allListings = await fetchListingsFromSheet();

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <ListingsClient initialListings={allListings} />
    </Suspense>
  );
}

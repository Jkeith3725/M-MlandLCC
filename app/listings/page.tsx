import { Suspense } from 'react';
import { getListingsFromData } from '@/lib/listings';
import { ListingsClient } from './ListingsClient';

// This runs at BUILD TIME - reads listings from local JSON
export default async function ListingsPage() {
  const allListings = getListingsFromData();

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <ListingsClient initialListings={allListings} />
    </Suspense>
  );
}

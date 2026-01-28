/**
 * Listing View Tracker Component
 * 
 * This client component tracks ViewContent events for property listing pages.
 * It should be included in listing detail pages to track when users view properties.
 * 
 * Usage:
 * ```tsx
 * import { ListingViewTracker } from '@/components/analytics/ListingViewTracker';
 * 
 * export default function ListingPage() {
 *   return (
 *     <>
 *       <ListingViewTracker
 *         listingId={listing.id}
 *         listingTitle={listing.title}
 *         listingPrice={listing.price}
 *       />
 *       {/* Rest of your page content *\/}
 *     </>
 *   );
 * }
 * ```
 */

'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/analytics';

interface ListingViewTrackerProps {
  listingId: string;
  listingTitle: string;
  listingPrice: number;
}

export function ListingViewTracker({
  listingId,
  listingTitle,
  listingPrice,
}: ListingViewTrackerProps) {
  useEffect(() => {
    // Track ViewContent event when the listing page loads
    trackViewContent(listingTitle, listingId, listingPrice);
  }, [listingId, listingTitle, listingPrice]);

  // This component doesn't render anything
  return null;
}

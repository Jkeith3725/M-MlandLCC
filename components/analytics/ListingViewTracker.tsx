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
 *         listingAcreage={listing.acreage}
 *         listingCounty={listing.county}
 *         listingState={listing.state}
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
  listingAcreage?: number;
  listingCounty?: string;
  listingState?: string;
  listingSlug?: string;
}

export function ListingViewTracker({
  listingId,
  listingTitle,
  listingPrice,
  listingAcreage,
  listingCounty,
  listingState,
  listingSlug,
}: ListingViewTrackerProps) {
  useEffect(() => {
    // Track ViewContent event when the listing page loads with detailed property data
    trackViewContent(
      listingTitle, 
      listingId, 
      listingPrice,
      {
        property_acreage: listingAcreage,
        property_county: listingCounty,
        property_state: listingState,
        property_slug: listingSlug,
      }
    );
  }, [listingId, listingTitle, listingPrice, listingAcreage, listingCounty, listingState, listingSlug]);

  // This component doesn't render anything
  return null;
}

import { Listing } from '@/lib/types';
import { ListingCard } from './ListingCard';
import { ListingGridSkeleton } from '@/components/ui/SkeletonLoader';

interface ListingGridProps {
  listings: Listing[];
  isLoading?: boolean;
}

export function ListingGrid({ listings, isLoading }: ListingGridProps) {
  if (isLoading) {
    return <ListingGridSkeleton />;
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-brown-dark/10">
        <h3 className="text-xl font-bold text-brown-dark mb-2">No Properties Found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

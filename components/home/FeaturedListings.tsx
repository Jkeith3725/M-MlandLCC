import Link from 'next/link';
import { Listing } from '@/lib/types';
import { ListingCard } from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/Button';

interface FeaturedListingsProps {
  listings: Listing[];
}

export function FeaturedListings({ listings }: FeaturedListingsProps) {
  // Ensure we show up to 6 listings, handle empty case
  const displayListings = listings ? listings.slice(0, 6) : [];

  return (
    <section className="py-10 md:py-16 bg-cream">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown-dark mb-2">Featured Properties</h2>
            <p className="text-brown-dark/70 text-lg">Hand-picked land opportunities in Ohio & West Virginia.</p>
          </div>
          <Link href="/listings">
            <Button variant="outline" className="border-brown-dark text-brown-dark hover:bg-brown-dark hover:text-cream">
              View All Inventory
            </Button>
          </Link>
        </div>

        {displayListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-soft">
            <p className="text-brown-dark/60 text-lg">No featured listings currently available.</p>
          </div>
        )}

        <div className="mt-16 text-center md:hidden">
          <Link href="/listings">
            <Button variant="outline" className="w-full border-brown-dark text-brown-dark">
              View All Inventory
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

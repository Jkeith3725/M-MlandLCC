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
    <section className="py-20 md:py-32 bg-cream relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tan-accent">Our Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown-dark">Featured Properties</h2>
            <p className="text-brown-dark/60 text-base max-w-lg">Hand-picked land opportunities in Ohio & West Virginia.</p>
          </div>
          <Link href="/listings">
            <Button variant="outline" className="border border-brown-dark text-brown-dark hover:bg-brown-dark hover:text-cream font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded-none transition-all duration-300">
              View All Inventory
            </Button>
          </Link>
        </div>

        {displayListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-cream-dark">
            <p className="text-brown-dark/50 text-sm uppercase tracking-widest">No featured listings currently available</p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/listings">
            <Button variant="outline" className="w-full border-brown-dark text-brown-dark text-xs uppercase tracking-widest rounded-none py-4">
              View All Inventory
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

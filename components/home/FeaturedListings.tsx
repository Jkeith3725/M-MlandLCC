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
    <section className="py-16 md:py-24 bg-gradient-to-b from-cream via-tan-accent/5 to-cream relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%232B1D14' fill-opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }} />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-brown-dark font-serif">Featured Properties</h2>
            <p className="text-brown-dark/70 text-lg md:text-xl max-w-2xl">Hand-picked land opportunities in Ohio & West Virginia.</p>
          </div>
          <Link href="/listings">
            <Button variant="outline" className="border-2 border-brown-dark text-brown-dark hover:bg-brown-dark hover:text-cream font-semibold px-8 py-3 text-base transition-all duration-300 hover:scale-105">
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

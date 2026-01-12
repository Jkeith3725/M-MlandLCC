import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/lib/types';
import { formatPrice, formatAcreage } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-brown-dark/5 hover:border-tan-accent/50 flex flex-col h-full cursor-pointer transform hover:-translate-y-1">
      <Link href={`/listings/${listing.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {listing.title}</span>
      </Link>

      {/* Image Container */}
      <div className="relative w-full pt-[66.67%] overflow-hidden bg-gradient-to-br from-tan-accent/20 to-forest-500/20">
        {listing.photos?.[0] ? (
          <>
            <Image
              src={listing.photos[0]}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-20 pointer-events-none">
          {listing.isNew && (
            <Badge className="bg-tan-accent text-brown-dark font-bold border-none shadow-sm">New Listing</Badge>
          )}
        </div>
      </div>

      <div className="p-7 flex flex-col flex-grow bg-gradient-to-b from-white to-cream/30">
        {/* Header */}
        <div className="mb-5 space-y-3">
          <h3 className="text-xl font-bold text-brown-dark leading-tight group-hover:text-forest-500 transition-colors line-clamp-2">
            {listing.title}
          </h3>

          <div className="flex items-center text-brown-dark/60 text-sm font-medium">
            <svg className="w-4 h-4 mr-2 text-tan-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{listing.county} County, {listing.state}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-6 py-6 px-4 bg-cream/50 rounded-lg border border-brown-dark/5 mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-brown-dark/50 font-bold mb-2">Price</p>
            <p className="text-2xl font-bold text-forest-500">{formatPrice(listing.price)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-brown-dark/50 font-bold mb-2">Acreage</p>
            <p className="text-2xl font-bold text-brown-dark">{formatAcreage(listing.acreage)}</p>
          </div>
        </div>

        {/* Enhanced Footer Action */}
        <div className="pt-5 flex justify-end">
          <span className="text-sm font-bold text-tan-accent group-hover:text-forest-500 group-hover:translate-x-2 transition-all duration-300 inline-flex items-center">
            View Details
            <svg className="w-5 h-5 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

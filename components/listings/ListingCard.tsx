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
    <article className="group relative bg-cream rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 border border-transparent hover:border-tan-accent/30 flex flex-col h-full cursor-pointer">
      <Link href={`/listings/${listing.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {listing.title}</span>
      </Link>

      {/* Image Container */}
      <div className="relative w-full pt-[66.67%] overflow-hidden bg-brown-dark/10">
        {listing.photos?.[0] ? (
          <Image
            src={listing.photos[0]}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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

      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <h3 className="text-xl font-bold text-brown-dark leading-tight group-hover:text-green-forest transition-colors line-clamp-2">
            {listing.title}
          </h3>

          <div className="flex items-center text-brown-dark/70 text-sm font-medium">
            <svg className="w-4 h-4 mr-1.5 text-tan-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{listing.county} County, {listing.state}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 py-5 border-t border-brown-dark/10 mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-brown-dark/40 font-bold mb-1">Price</p>
            <p className="text-2xl font-bold text-green-forest">{formatPrice(listing.price)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-brown-dark/40 font-bold mb-1">Acreage</p>
            <p className="text-2xl font-bold text-brown-dark">{formatAcreage(listing.acreage)}</p>
          </div>
        </div>

        {/* Minimal Footer Action */}
        <div className="pt-2 flex justify-end">
          <span className="text-sm font-bold text-tan-accent group-hover:translate-x-1 transition-transform inline-flex items-center">
            View Details <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </span>
        </div>
      </div>
    </article>
  );
}

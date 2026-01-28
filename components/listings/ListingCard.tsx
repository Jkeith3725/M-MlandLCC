'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/lib/types';
import { formatPrice, formatAcreage } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { trackCustomEvent } from '@/lib/analytics';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const handlePropertyClick = () => {
    // Track when user clicks on a property card
    trackCustomEvent('PropertyCardClick', {
      property_id: listing.id,
      property_title: listing.title,
      property_price: listing.price,
      property_acreage: listing.acreage,
      property_county: listing.county,
      property_state: listing.state,
      property_slug: listing.slug,
    });
  };

  return (
    <article className="group relative bg-white overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 flex flex-col h-full cursor-pointer hover:-translate-y-1">
      <Link 
        href={`/listings/${listing.slug}`} 
        className="absolute inset-0 z-10"
        onClick={handlePropertyClick}
      >
        <span className="sr-only">View {listing.title}</span>
      </Link>

      {/* Image Container */}
      <div className="relative w-full pt-[62%] overflow-hidden bg-cream-dark">
        {listing.photos?.[0] ? (
          <>
            <Image
              src={listing.photos[0]}
              alt={listing.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cream-dark text-brown-dark/40">
            <span className="text-sm font-medium tracking-wide uppercase">No Image</span>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-4 left-5 z-20">
          <p className="text-2xl font-serif font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{formatPrice(listing.price)}</p>
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-4 left-5 flex flex-col gap-2 z-20 pointer-events-none">
          {listing.isNew && (
            <Badge className="bg-tan-accent text-brown-dark text-[10px] font-bold uppercase tracking-widest border-none px-3 py-1">New</Badge>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-serif font-bold text-brown-dark leading-snug group-hover:text-forest-500 transition-colors line-clamp-2 mb-3">
          {listing.title}
        </h3>

        {/* Location & Acreage */}
        <div className="flex items-center justify-between text-brown-dark/60 text-sm mt-auto pt-4 border-t border-cream-dark">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-tan-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{listing.county} County, {listing.state}</span>
          </div>
          <span className="font-semibold text-brown-dark whitespace-nowrap">{formatAcreage(listing.acreage)}</span>
        </div>

        {/* Footer Action */}
        <div className="pt-4 flex items-center">
          <span className="text-xs font-semibold text-tan-accent uppercase tracking-widest group-hover:text-forest-500 transition-colors inline-flex items-center">
            View Details
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

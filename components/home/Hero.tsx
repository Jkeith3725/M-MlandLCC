'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SellLandModal } from '@/components/forms/SellLandModal';

export function Hero() {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  return (
    <section
      className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden"
      aria-label="Hero section - Land for sale in Ohio and West Virginia"
    >
      {/* Background Layer Group */}
      <div className="absolute inset-0 z-0 bg-[#09150c]">
        {/* Base Image - using img with fetchPriority for optimal LCP */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-background.jpg"
          alt="Scenic rural land property"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
        />

        {/* Subtle Dark Overlay for overall readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Gradient Overlay - Darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative accent line */}
          <div className="w-12 h-[2px] bg-tan-accent mx-auto mb-8 animate-reveal" aria-hidden="true" />

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-cream leading-[0.95] tracking-tight animate-reveal-delay-1">
            <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              Land for Sale in
            </span>
            <br />
            <span className="text-tan-accent mt-3 inline-block italic font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              Ohio & West Virginia
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-cream/90 max-w-xl mx-auto font-sans font-normal leading-relaxed tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] animate-reveal-delay-2">
            The premier land brokerage for hunting, timber, and rural acreage.
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-10 animate-reveal-delay-3"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link href="/listings" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto
                           bg-tan-accent text-brown-dark
                           hover:bg-[#d9b27a]
                           font-semibold text-base tracking-wide uppercase
                           px-10 py-4
                           rounded-none
                           shadow-[0_4px_14px_rgba(200,162,106,0.3)]
                           hover:shadow-[0_8px_24px_rgba(200,162,106,0.4)]
                           transition-all duration-300 ease-out
                           hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-tan-accent focus:ring-offset-2 focus:ring-offset-black/50"
              >
                View Listings
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsSellModalOpen(true)}
              className="w-full sm:w-auto
                         bg-transparent
                         border border-cream/40
                         text-cream
                         hover:bg-cream hover:text-brown-dark hover:border-cream
                         font-semibold text-base tracking-wide uppercase
                         px-10 py-4
                         rounded-none
                         transition-all duration-300 ease-out
                         hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-cream/70 focus:ring-offset-2 focus:ring-offset-black/50"
            >
              Sell Your Land
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SellLandModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
    </section>
  );
}

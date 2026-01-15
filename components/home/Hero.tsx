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
        {/* Base Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: 'url(/M-MlandLCC/images/hero-background.jpg)' }}
          role="img"
          aria-label="Scenic rural land property"
        />

        {/* Subtle Dark Overlay for overall readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Gradient Overlay - Darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Text Container with Semi-Transparent Background */}
        <div className="relative inline-block max-w-4xl mx-auto">
          {/* Frosted Glass Background for Text Only */}
          <div
            className="absolute -inset-x-6 -inset-y-8 sm:-inset-x-10 sm:-inset-y-10 md:-inset-x-14 md:-inset-y-12
                       bg-black/35 backdrop-blur-[6px] rounded-2xl border border-white/5"
            aria-hidden="true"
          />

          {/* Text Content */}
          <div className="relative space-y-5 md:space-y-7 px-2 py-2">
            {/* Main Headline - Improved Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-cream font-serif leading-[1.1]">
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                Land for Sale in
              </span>
              <br />
              <span
                className="text-tan-accent mt-2 md:mt-3 inline-block font-bold tracking-wide
                           drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              >
                Ohio & West Virginia
              </span>
            </h1>

            {/* Subheadline - Lighter Weight for Hierarchy */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-cream/95 max-w-2xl mx-auto
                         font-normal leading-relaxed tracking-wide
                         drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
            >
              The premier land brokerage for hunting, timber, and rural acreage.
            </p>

            {/* Action Buttons - Improved Visual Hierarchy */}
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-3 md:pt-5"
              role="group"
              aria-label="Call to action buttons"
            >
              {/* Primary CTA - View Listings (Solid Golden Background) */}
              <Link href="/listings" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto
                             bg-tan-accent text-brown-dark
                             hover:bg-[#d9b27a]
                             font-bold text-base sm:text-lg
                             px-8 sm:px-10 py-4 sm:py-5
                             rounded-xl
                             shadow-[0_4px_14px_rgba(200,162,106,0.35)]
                             hover:shadow-[0_6px_20px_rgba(200,162,106,0.5)]
                             transform transition-all duration-300 ease-out
                             hover:scale-[1.04]
                             focus:outline-none focus:ring-2 focus:ring-tan-accent focus:ring-offset-2 focus:ring-offset-black/50"
                >
                  View Listings
                </Button>
              </Link>

              {/* Secondary CTA - Sell Your Land (Transparent with Border) */}
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsSellModalOpen(true)}
                className="w-full sm:w-auto
                           bg-white/5
                           border-2 border-tan-accent/70
                           text-cream
                           hover:bg-tan-accent hover:text-brown-dark hover:border-tan-accent
                           font-semibold text-base sm:text-lg
                           px-8 sm:px-10 py-4 sm:py-5
                           rounded-xl
                           backdrop-blur-sm
                           shadow-[0_4px_14px_rgba(0,0,0,0.15)]
                           hover:shadow-[0_6px_20px_rgba(200,162,106,0.4)]
                           transform transition-all duration-300 ease-out
                           hover:scale-[1.04]
                           focus:outline-none focus:ring-2 focus:ring-cream/70 focus:ring-offset-2 focus:ring-offset-black/50"
              >
                Sell Your Land
              </Button>
            </div>
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

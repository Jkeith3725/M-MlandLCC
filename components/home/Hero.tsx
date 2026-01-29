'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SellLandModal } from '@/components/forms/SellLandModal';
import { trackCustomEvent } from '@/lib/analytics';
import { COMPANY_INFO } from '@/lib/constants';

export function Hero() {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const handleViewListingsClick = () => {
    // Track when user clicks "View Listings" button
    trackCustomEvent('ViewListingsClick', {
      button_location: 'hero',
      button_text: 'View Listings',
    });
  };

  const handleSellYourLandClick = () => {
    // Track when user clicks "Sell Your Land" button
    trackCustomEvent('SellYourLandClick', {
      button_location: 'hero',
      button_text: 'Sell Your Land',
    });
    setIsSellModalOpen(true);
  };

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

        {/* Enhanced Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Stronger Gradient Overlay - Much darker for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative accent line */}
          <div className="w-12 h-[2px] bg-tan-accent mx-auto mb-6 animate-reveal" aria-hidden="true" />

          {/* Brand Name - Enhanced with stronger shadow and background */}
          <div className="inline-block bg-black/40 backdrop-blur-sm px-8 py-3 mb-6 animate-reveal rounded-sm">
            <p className="text-base sm:text-lg md:text-xl uppercase tracking-[0.3em] text-tan-accent font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              M&M Land Company
            </p>
          </div>

          {/* Main Headline - Enhanced with text stroke and stronger shadows */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-bold leading-[0.95] tracking-tight animate-reveal-delay-1">
            <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              Land for Sale in
            </span>
            <br />
            <span className="text-tan-accent mt-3 inline-block italic font-medium drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_6px_rgb(0_0_0_/_80%)]">
              Ohio & West Virginia
            </span>
          </h1>

          {/* Subheadline - Enhanced visibility */}
          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-white max-w-xl mx-auto font-sans font-semibold leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] animate-reveal-delay-2">
            The premier land brokerage for hunting, timber, and rural acreage.
          </p>

          {/* Phone Number - Enhanced with background box for maximum visibility */}
          <div className="mt-8 animate-reveal-delay-2">
            <div className="inline-block bg-tan-accent/95 backdrop-blur-sm px-8 py-4 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <a 
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center space-x-3 text-2xl sm:text-3xl md:text-4xl font-bold text-brown-dark hover:text-forest-900 transition-all duration-300"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>
            <p className="text-white font-semibold text-sm sm:text-base mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
              Call us today to discuss your land needs
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-10 animate-reveal-delay-3"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link href="/listings" className="w-full sm:w-auto" onClick={handleViewListingsClick}>
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
              onClick={handleSellYourLandClick}
              className="w-full sm:w-auto
                         bg-transparent
                         border-2 border-cream
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

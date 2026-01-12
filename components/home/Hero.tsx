'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SellLandModal } from '@/components/forms/SellLandModal';

export function Hero() {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Layer Group */}
      <div className="absolute inset-0 z-0 bg-[#09150c]">
        {/* Base Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: 'url(/M-MlandLCC/images/hero-background.jpg)' }}
        />

        {/* Subtle Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Gradient Overlay - Darker at bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl text-cream font-serif">
            Land for Sale in <br />
            <span className="text-tan-accent mt-2 inline-block">Ohio & West Virginia</span>
          </h1>

          {/* Serious Subhead */}
          <p className="text-xl md:text-2xl text-cream/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            The premier land brokerage for hunting, timber, and rural acreage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <Link href="/listings" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-tan-accent text-brown-dark hover:bg-tan-default font-bold text-lg px-10 py-7 shadow-strong transition-all hover:scale-105 border-2 border-tan-accent"
              >
                View Listings
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsSellModalOpen(true)}
              className="w-full sm:w-auto border-2 border-cream/50 text-cream hover:bg-cream hover:text-brown-dark font-bold text-lg px-10 py-7 backdrop-blur-sm transition-all hover:scale-105"
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

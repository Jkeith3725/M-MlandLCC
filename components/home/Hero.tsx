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
          style={{ backgroundImage: 'url(/images/hero-background.jpg)' }}
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-forest-900/60 mix-blend-multiply" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/95 via-forest-900/40 to-forest-900/20" />

        {/* Topographic Texture Overlay (SVG Pattern) */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23F6F2EA' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
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

'use client';

import { useState } from 'react';
import { Footer } from './Footer';
import { ContactModal } from '@/components/forms/ContactModal';
import { SellLandModal } from '@/components/forms/SellLandModal';

export function FooterWrapper() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  return (
    <>
      <Footer
        onContactClick={() => setIsContactModalOpen(true)}
        onSellClick={() => setIsSellModalOpen(true)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <SellLandModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
    </>
  );
}

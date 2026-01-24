'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';

interface PhotoGalleryProps {
  photos: string[];
  title: string;
}

export function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const images = photos;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative h-48 rounded-lg overflow-hidden hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <Image
              src={image}
              alt={`${title} - Photo ${index + 1}`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <Modal
          isOpen={true}
          onClose={closeLightbox}
          title={`${title} - Photo ${selectedImageIndex + 1} of ${images.length}`}
          size="xl"
        >
          <div className="relative">
            <div className="relative h-[60vh]">
              <Image
                src={images[selectedImageIndex]}
                alt={`${title} - Photo ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={previousImage}
                className="p-2 rounded-full bg-forest-600 text-white hover:bg-forest-700 transition-colors disabled:opacity-50"
                disabled={images.length <= 1}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <span className="text-sm text-gray-600">
                {selectedImageIndex + 1} / {images.length}
              </span>

              <button
                onClick={nextImage}
                className="p-2 rounded-full bg-forest-600 text-white hover:bg-forest-700 transition-colors disabled:opacity-50"
                disabled={images.length <= 1}
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

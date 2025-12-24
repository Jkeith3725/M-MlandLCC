'use client';

import { Suspense, useState, useEffect } from 'react';
import { useFilteredListings } from '@/hooks/useFilteredListings';
import { getListings } from '@/lib/api';
import { Listing } from '@/lib/types';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { FiltersBar } from '@/components/listings/FiltersBar';
import { FiltersDrawer } from '@/components/listings/FiltersDrawer';
import { Pagination } from '@/components/listings/Pagination';

function ListingsContent() {
  const { filters, updateFilters, resetFilters } = useFilteredListings();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const result = await getListings(filters, currentPage);
        setListings(result.listings);
        setTotalPages(result.totalPages);
        setTotalCount(result.total);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters: typeof filters) => {
    updateFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10 md:py-16 min-h-[60vh]">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4 drop-shadow-sm">Available Properties</h1>
        <p className="text-xl text-brown-dark/70 max-w-2xl font-light">
          Browse our curated selection of premium land across Ohio & West Virginia.
        </p>
      </div>

      <FiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleDrawer={() => setIsDrawerOpen(true)}
      />

      <FiltersDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="mb-4 text-gray-600">
        {isLoading ? (
          'Loading...'
        ) : (
          `Showing ${listings.length} of ${totalCount} properties`
        )}
      </div>

      <ListingGrid listings={listings} isLoading={isLoading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <ListingsContent />
    </Suspense>
  );
}

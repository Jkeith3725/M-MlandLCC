'use client';

import { useState, useMemo } from 'react';
import { useFilteredListings } from '@/hooks/useFilteredListings';
import { Listing } from '@/lib/types';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { FiltersBar } from '@/components/listings/FiltersBar';
import { FiltersDrawer } from '@/components/listings/FiltersDrawer';
import { Pagination } from '@/components/listings/Pagination';

const PAGE_SIZE = 9;

interface ListingsClientProps {
  initialListings: Listing[];
}

export function ListingsClient({ initialListings }: ListingsClientProps) {
  const { filters, updateFilters } = useFilteredListings();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter and sort listings client-side using the pre-fetched data
  const { listings, totalPages, totalCount } = useMemo(() => {
    let filtered = [...initialListings];

    // Apply filters
    if (filters.county) {
      filtered = filtered.filter(listing => listing.county === filters.county);
    }

    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(listing => listing.price >= filters.priceMin!);
    }

    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(listing => listing.price <= filters.priceMax!);
    }

    if (filters.acreageMin !== undefined) {
      filtered = filtered.filter(listing => listing.acreage >= filters.acreageMin!);
    }

    if (filters.acreageMax !== undefined) {
      filtered = filtered.filter(listing => listing.acreage <= filters.acreageMax!);
    }

    if (filters.onlyNew) {
      filtered = filtered.filter(listing => listing.isNew);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'acreage':
        filtered.sort((a, b) => b.acreage - a.acreage);
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedListings = filtered.slice(start, end);

    return {
      listings: paginatedListings,
      totalPages,
      totalCount: total,
    };
  }, [initialListings, filters, currentPage]);

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
        Showing {listings.length} of {totalCount} properties
      </div>

      <ListingGrid listings={listings} isLoading={false} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

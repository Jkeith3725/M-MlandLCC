'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterParams } from '@/lib/types';
import { buildQueryString } from '@/lib/utils';

export function useFilteredListings() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterParams>(() => ({
    county: searchParams.get('county') || undefined,
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    acreageMin: searchParams.get('acreageMin') ? Number(searchParams.get('acreageMin')) : undefined,
    acreageMax: searchParams.get('acreageMax') ? Number(searchParams.get('acreageMax')) : undefined,
    onlyNew: searchParams.get('onlyNew') === 'true',
    sort: (searchParams.get('sort') as FilterParams['sort']) || 'newest',
  }));

  const updateFilters = useCallback((newFilters: Partial<FilterParams>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };

      // Update URL
      const query = buildQueryString({
        county: updated.county,
        priceMin: updated.priceMin,
        priceMax: updated.priceMax,
        acreageMin: updated.acreageMin,
        acreageMax: updated.acreageMax,
        onlyNew: updated.onlyNew || undefined,
        sort: updated.sort !== 'newest' ? updated.sort : undefined,
      });

      router.push(`/listings${query}`, { scroll: false });

      return updated;
    });
  }, [router]);

  const resetFilters = useCallback(() => {
    setFilters({
      sort: 'newest',
    });
    router.push('/listings');
  }, [router]);

  return { filters, updateFilters, resetFilters };
}

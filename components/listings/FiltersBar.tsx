'use client';

import { useState } from 'react';
import { FilterParams } from '@/lib/types';
import { ALL_COUNTIES, SORT_OPTIONS } from '@/lib/constants';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface FiltersBarProps {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
  onToggleDrawer?: () => void;
}

export function FiltersBar({ filters, onFilterChange, onToggleDrawer }: FiltersBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (key: keyof FilterParams, value: string | number | boolean | undefined) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const resetFilters = () => {
    onFilterChange({});
  };

  // Count active filters (excluding default sort)
  const activeFilterCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof FilterParams];
    if (key === 'sort' && value === 'newest') return false;
    return value !== undefined && value !== 'all';
  }).length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-medium mb-8 sticky top-20 z-30 border border-brown-dark/10 overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-cream/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-tan-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h2 className="text-xl font-bold text-brown-dark">Filter Properties</h2>
          {hasActiveFilters && (
            <span className="bg-tan-accent text-white text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                resetFilters();
              }}
              className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
            >
              Reset All
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 border-t border-cream-dark">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <Select
              label="County"
              value={filters.county || 'all'}
              onChange={(e) => handleChange('county', e.target.value === 'all' ? undefined : e.target.value)}
              options={[
                { value: 'all', label: 'All Counties' },
                ...ALL_COUNTIES.map(county => ({ value: county, label: county }))
              ]}
            />

            <Input
              label="Min Acreage"
              type="number"
              placeholder="0"
              value={filters.acreageMin || ''}
              onChange={(e) => handleChange('acreageMin', e.target.value ? parseFloat(e.target.value) : undefined)}
            />

            <Input
              label="Max Acreage"
              type="number"
              placeholder="Any"
              value={filters.acreageMax || ''}
              onChange={(e) => handleChange('acreageMax', e.target.value ? parseFloat(e.target.value) : undefined)}
            />

            <Select
              label="Sort By"
              value={filters.sort || 'newest'}
              onChange={(e) => handleChange('sort', e.target.value as FilterParams['sort'])}
              options={SORT_OPTIONS.map(opt => ({ value: opt.value, label: opt.label }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              label="Min Price"
              type="number"
              placeholder="$0"
              value={filters.priceMin || ''}
              onChange={(e) => handleChange('priceMin', e.target.value ? parseFloat(e.target.value) : undefined)}
            />

            <Input
              label="Max Price"
              type="number"
              placeholder="Any"
              value={filters.priceMax || ''}
              onChange={(e) => handleChange('priceMax', e.target.value ? parseFloat(e.target.value) : undefined)}
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyNew || false}
                onChange={(e) => handleChange('onlyNew', e.target.checked || undefined)}
                className="w-4 h-4 text-forest-600 border-gray-300 rounded focus:ring-forest-500"
              />
              <span className="text-sm text-gray-700">Show only new listings</span>
            </label>
          </div>
        </div>
      </div>

      {onToggleDrawer && (
        <div className="px-6 pb-6 md:hidden">
          <Button variant="outline" className="w-full" onClick={onToggleDrawer}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Advanced Filters
          </Button>
        </div>
      )}
    </div>
  );
}

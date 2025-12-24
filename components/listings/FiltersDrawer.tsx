import { useEffect, useRef } from 'react';
import { FilterParams } from '@/lib/types';
import { ALL_COUNTIES, SORT_OPTIONS } from '@/lib/constants';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
}

export function FiltersDrawer({ isOpen, onClose, filters, onFilterChange }: FiltersDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (key: keyof FilterParams, value: string | number | boolean | undefined) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const resetFilters = () => {
    onFilterChange({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-forest-900/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-cream shadow-2xl z-50 transform transition-transform duration-300 md:hidden overflow-y-auto border-l border-brown-dark/10"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-brown-dark/10">
            <h2 className="text-xl font-bold text-brown-dark">Filter Properties</h2>
            <button
              onClick={onClose}
              className="text-brown-dark/60 hover:text-brown-dark p-2 hover:bg-brown-dark/5 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
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

            <Select
              label="Sort By"
              value={filters.sort || 'newest'}
              onChange={(e) => handleChange('sort', e.target.value as FilterParams['sort'])}
              options={SORT_OPTIONS.map(opt => ({ value: opt.value, label: opt.label }))}
            />

            <div>
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

          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Reset
            </Button>
            <Button onClick={onClose} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

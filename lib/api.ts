import { Listing, FilterParams, PaginatedListings } from './types';
import { MOCK_LISTINGS } from './mockData';
import { delay } from './utils';

const PAGE_SIZE = 9;

export async function getListings(
  filters: FilterParams = {},
  page: number = 1
): Promise<PaginatedListings> {
  // Simulate network delay
  await delay(Math.random() * 300 + 300);

  let filtered = [...MOCK_LISTINGS];

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
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const listings = filtered.slice(start, end);

  return {
    listings,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
  };
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  // Simulate network delay
  await delay(Math.random() * 200 + 200);

  return MOCK_LISTINGS.find(listing => listing.slug === slug) || null;
}

export async function getFeaturedListings(count: number = 6): Promise<Listing[]> {
  // Simulate network delay
  await delay(Math.random() * 200 + 200);

  // Return newest listings as featured
  const sorted = [...MOCK_LISTINGS].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return sorted.slice(0, count);
}

export async function getSimilarListings(currentListing: Listing, count: number = 4): Promise<Listing[]> {
  // Simulate network delay
  await delay(Math.random() * 200 + 200);

  // Find similar listings based on county and price range
  const similar = MOCK_LISTINGS.filter(listing => {
    if (listing.id === currentListing.id) return false;

    const sameState = listing.state === currentListing.state;
    const similarPrice = Math.abs(listing.price - currentListing.price) < currentListing.price * 0.5;

    return sameState || similarPrice;
  });

  return similar.slice(0, count);
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  state: 'OH' | 'WV';
  county: string;
  nearestTown?: string;
  acreage: number;
  price: number;
  isNew: boolean;
  shortDescription: string;
  overview: string;
  photos: string[];
  youtubeUrl?: string;
  mapEmbedHtml?: string;
  roadFrontage?: string;
  utilities?: string;
  parcelId?: string;
  createdAt: Date;
}

export interface FilterParams {
  county?: string;
  priceMin?: number;
  priceMax?: number;
  acreageMin?: number;
  acreageMax?: number;
  onlyNew?: boolean;
  sort?: 'newest' | 'price-low' | 'price-high' | 'acreage';
}

export interface PaginatedListings {
  listings: Listing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
  listingTitle?: string;
}

export interface SellLandFormData {
  name: string;
  phone: string;
  email: string;
  county?: string;
  state?: 'OH' | 'WV';
  acreage?: number;
  askingPrice?: number;
  timeline?: string;
  message?: string;
}

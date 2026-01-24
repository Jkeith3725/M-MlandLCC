import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatAcreage(acreage: number): string {
  return `${acreage.toLocaleString()} ${acreage === 1 ? 'acre' : 'acres'}`;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function buildQueryString(params: Record<string, any>): string {
  const filtered = Object.entries(params).filter(([_, value]) => {
    return value !== undefined && value !== null && value !== '';
  });

  if (filtered.length === 0) return '';

  const query = new URLSearchParams();
  filtered.forEach(([key, value]) => {
    query.set(key, String(value));
  });

  return `?${query.toString()}`;
}

export function parseQueryString(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Adds the basePath prefix to a URL
 * Required for Next.js static exports where basePath isn't automatically added to dynamic paths
 */
export function withBasePath(path: string): string {
  // Don't add basePath to external URLs
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path;
  }

  const basePath = '';

  // Don't add if already has basePath
  if (path.startsWith(basePath)) {
    return path;
  }

  // Add basePath to relative paths
  return `${basePath}${path}`;
}

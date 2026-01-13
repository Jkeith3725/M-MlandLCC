/**
 * File-based Caching System
 * Provides fallback data when API calls fail
 */

import * as fs from 'fs';
import * as path from 'path';
import { Listing } from './types';

const CACHE_DIR = path.join(process.cwd(), '.data-cache');
const CACHE_FILE = path.join(CACHE_DIR, 'sheets-data.json');

interface CachedData {
  timestamp: string;
  data: Listing[];
}

/**
 * Ensures cache directory exists
 */
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    console.log(`📁 Created cache directory: ${CACHE_DIR}`);
  }
}

/**
 * Saves data to cache file
 * @param data - Listings data to cache
 */
export function saveToCache(data: Listing[]): void {
  try {
    ensureCacheDir();

    const cachedData: CachedData = {
      timestamp: new Date().toISOString(),
      data,
    };

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cachedData, null, 2), 'utf-8');

    console.log(`💾 Data cached successfully (${data.length} listings) at ${cachedData.timestamp}`);
  } catch (error) {
    console.error('❌ Failed to save cache:', error);
    // Don't throw - caching failure shouldn't break the build
  }
}

/**
 * Loads data from cache file
 * @returns Cached listings data or null if cache doesn't exist/is invalid
 */
export function loadFromCache(): Listing[] | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      console.warn('⚠️  No cache file found');
      return null;
    }

    const fileContent = fs.readFileSync(CACHE_FILE, 'utf-8');
    const cachedData: CachedData = JSON.parse(fileContent);

    if (!cachedData.data || !Array.isArray(cachedData.data)) {
      console.error('❌ Invalid cache data structure');
      return null;
    }

    const cacheAge = Date.now() - new Date(cachedData.timestamp).getTime();
    const cacheAgeHours = Math.round(cacheAge / (1000 * 60 * 60));

    console.log(
      `📂 Loaded ${cachedData.data.length} listings from cache ` +
      `(${cacheAgeHours}h old, created at ${cachedData.timestamp})`
    );

    return cachedData.data;
  } catch (error) {
    console.error('❌ Failed to load cache:', error);
    return null;
  }
}

/**
 * Gets cache file path (for debugging)
 */
export function getCachePath(): string {
  return CACHE_FILE;
}

/**
 * Checks if cache file exists
 */
export function cacheExists(): boolean {
  return fs.existsSync(CACHE_FILE);
}

/**
 * Gets cache age in milliseconds
 */
export function getCacheAge(): number | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return null;
    }

    const fileContent = fs.readFileSync(CACHE_FILE, 'utf-8');
    const cachedData: CachedData = JSON.parse(fileContent);

    return Date.now() - new Date(cachedData.timestamp).getTime();
  } catch (error) {
    return null;
  }
}

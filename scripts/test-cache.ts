/**
 * Test script for cache fallback functionality
 * Tests saving to and loading from cache
 */

// Only run on server-side
if (typeof window !== 'undefined') {
  throw new Error('This script must run in Node.js');
}

const cache = require('../lib/cache');
const { Listing } = require('../lib/types');

console.log('🧪 Testing cache fallback functionality...\n');

// Sample listing data for testing
const testData = [
  {
    id: 'test-1',
    slug: 'test-property',
    title: 'Test Property',
    state: 'OH',
    county: 'Test County',
    nearestTown: 'Test Town',
    acreage: 10.5,
    price: 50000,
    isNew: true,
    shortDescription: 'Test description',
    overview: 'Test overview',
    photos: ['https://example.com/photo1.jpg'],
    createdAt: new Date('2024-01-01'),
  },
];

async function testCache() {
  console.log('1️⃣  Testing saveToCache...');
  cache.saveToCache(testData);

  console.log('\n2️⃣  Testing cacheExists...');
  const exists = cache.cacheExists();
  console.log(`   Cache exists: ${exists ? '✅' : '❌'}`);

  if (exists) {
    console.log('\n3️⃣  Testing loadFromCache...');
    const cachedData = cache.loadFromCache();

    if (cachedData && cachedData.length > 0) {
      console.log(`   ✅ Loaded ${cachedData.length} listing(s) from cache`);
      console.log(`   First listing: ${cachedData[0].title}`);

      console.log('\n4️⃣  Testing getCacheAge...');
      const age = cache.getCacheAge();
      console.log(`   Cache age: ${age !== null ? `${age}ms` : 'Unknown'}`);

      console.log('\n✅ All cache tests passed!');
    } else {
      console.log('   ❌ Failed to load data from cache');
    }
  } else {
    console.log('   ❌ Cache file was not created');
  }
}

testCache().catch(console.error);

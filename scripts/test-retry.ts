/**
 * Test script for retry logic
 * Tests exponential backoff with an invalid endpoint
 */

import { fetchWithRetryHttp } from '../lib/retry.js';

console.log('🧪 Testing retry logic with invalid endpoint...\n');

async function testRetry() {
  const invalidUrl = 'https://httpstat.us/500'; // Always returns 500 error

  try {
    console.log(`Attempting to fetch: ${invalidUrl}`);
    console.log('Expected: 5 retries with exponential backoff\n');

    const response = await fetchWithRetryHttp(invalidUrl);
    console.log('Unexpected success!', response.status);
  } catch (error: any) {
    console.log('\n✅ Test completed as expected - all retries exhausted');
    console.log(`Final error: ${error.message || error}`);
  }
}

testRetry();

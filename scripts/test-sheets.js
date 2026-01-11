#!/usr/bin/env node

const https = require('https');

const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

console.log('🔍 Testing Google Sheets Connection...\n');
console.log(`📊 Sheet URL: ${SHEET_CSV_URL}\n`);

https.get(SHEET_CSV_URL, (res) => {
  let data = '';

  if (res.statusCode !== 200) {
    console.error(`❌ ERROR: Failed to fetch sheet (Status: ${res.statusCode})`);
    console.error('');
    console.error('SOLUTION: Make sure your Google Sheet is set to "Anyone with the link can view"');
    console.error('1. Open your Google Sheet');
    console.error('2. Click "Share" button (top right)');
    console.error('3. Change "Restricted" to "Anyone with the link"');
    console.error('4. Make sure permission is set to "Viewer"');
    process.exit(1);
  }

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('✅ Successfully fetched sheet data!\n');

    // Parse CSV
    const lines = data.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

    console.log('📋 Column Headers Found:');
    headers.forEach((h, i) => console.log(`   ${i + 1}. ${h}`));
    console.log('');

    // Find slug column index
    const slugIndex = headers.findIndex(h => h.toLowerCase() === 'slug');
    const titleIndex = headers.findIndex(h => h.toLowerCase() === 'title');
    const acreageIndex = headers.findIndex(h => h.toLowerCase() === 'acreage');
    const countyIndex = headers.findIndex(h => h.toLowerCase() === 'county');
    const stateIndex = headers.findIndex(h => h.toLowerCase() === 'state');

    if (slugIndex === -1) {
      console.error('❌ ERROR: No "Slug" column found in sheet!');
      console.error('   Expected column: "Slug" (Column R)');
      process.exit(1);
    }

    console.log(`📝 Slug column found at index: ${slugIndex + 1} (${String.fromCharCode(65 + slugIndex)})`);
    console.log('');
    console.log('🏘️  Property Listings:');
    console.log('─'.repeat(80));

    // Parse data rows
    for (let i = 1; i < Math.min(lines.length, 10); i++) {
      if (!lines[i].trim()) continue;

      // Simple CSV parsing (won't handle all edge cases but good enough for debugging)
      const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());

      const title = values[titleIndex] || '';
      const slug = values[slugIndex] || '';
      const acreage = values[acreageIndex] || '';
      const county = values[countyIndex] || '';
      const state = values[stateIndex] || '';

      if (!title) continue;

      console.log(`\nProperty ${i}:`);
      console.log(`   Title:    ${title}`);
      console.log(`   Acreage:  ${acreage} acres`);
      console.log(`   Location: ${county}, ${state}`);
      console.log(`   Slug:     "${slug}"`);

      // Check if slug looks correct
      if (!slug) {
        console.log(`   ⚠️  WARNING: Slug is empty!`);
      } else {
        // Expected format: 19-acres-washington-oh
        const expectedSlug = `${Math.floor(parseFloat(acreage))}-acres-${county.toLowerCase()}-${state.toLowerCase()}`;
        const normalizedExpected = expectedSlug.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
        const normalizedActual = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

        if (normalizedActual !== normalizedExpected) {
          console.log(`   ⚠️  WARNING: Slug doesn't match expected format!`);
          console.log(`   Expected: "${normalizedExpected}"`);
        } else {
          console.log(`   ✅ Slug looks good!`);
        }
      }
    }

    console.log('\n' + '─'.repeat(80));
    console.log('\n💡 NEXT STEPS:');
    console.log('1. Verify the slugs above match what you expect');
    console.log('2. If slugs are missing or wrong, update your Google Sheet Column R');
    console.log('3. After fixing slugs, go to GitHub Actions and click "Run workflow"');
    console.log('4. Wait for deployment to complete (~2-3 minutes)');
    console.log('5. Test your website again');
  });

}).on('error', (err) => {
  console.error(`❌ ERROR: ${err.message}`);
  process.exit(1);
});

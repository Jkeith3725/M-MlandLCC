#!/usr/bin/env node

/**
 * Check Row 9 Data - Specific diagnostic for the user's issue
 *
 * The user mentioned they have map data in column Q, row 9.
 * This script specifically checks that row to see what's there.
 */

const https = require('https');
const Papa = require('papaparse');

const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  Checking Row 9 Data - Map and YouTube URLs                   ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

https.get(SHEET_CSV_URL, (res) => {
  if (res.statusCode !== 200) {
    console.error(`❌ ERROR: Failed to fetch sheet (Status: ${res.statusCode})\n`);
    process.exit(1);
  }

  let csvData = '';

  res.on('data', (chunk) => {
    csvData += chunk;
  });

  res.on('end', () => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const rows = results.data;

        console.log('✅ Sheet loaded successfully!\n');
        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`TOTAL ROWS FOUND: ${rows.length}`);
        console.log('═══════════════════════════════════════════════════════════════\n');

        // Check if we have at least 9 rows (row 9 would be index 8)
        if (rows.length < 9) {
          console.log(`⚠️  WARNING: Sheet only has ${rows.length} data rows.`);
          console.log('   Row 9 does not exist.\n');
          console.log('   Remember: Row 1 is headers, so row 9 is the 8th data row.\n');
          return;
        }

        // Row 9 is index 8 (0-indexed, and row 1 is headers)
        const row9 = rows[8];

        console.log('ROW 9 DATA');
        console.log('═══════════════════════════════════════════════════════════════\n');

        console.log('Property Information:');
        console.log(`  Title: ${row9['Title'] || '(empty)'}`);
        console.log(`  County: ${row9['County'] || '(empty)'}`);
        console.log(`  State: ${row9['State'] || '(empty)'}`);
        console.log(`  Acreage: ${row9['Acreage'] || '(empty)'}`);
        console.log(`  Slug: ${row9['Slug'] || '(empty)'}\n`);

        console.log('═══════════════════════════════════════════════════════════════');
        console.log('CHECKING MAP AND YOUTUBE DATA (THE ISSUE)');
        console.log('═══════════════════════════════════════════════════════════════\n');

        // Check what column headers actually exist for P and Q
        const columnP = headers[15]; // Column P is index 15 (0-indexed)
        const columnQ = headers[16]; // Column Q is index 16

        console.log('Expected vs. Actual Headers:');
        console.log(`  Column P - Expected: "YouTube URL"`);
        console.log(`  Column P - Actual:   "${columnP}"`);
        console.log(`  Column P - Match:    ${columnP === 'YouTube URL' ? '✅ YES' : '❌ NO'}\n`);

        console.log(`  Column Q - Expected: "Google Maps Embed"`);
        console.log(`  Column Q - Actual:   "${columnQ}"`);
        console.log(`  Column Q - Match:    ${columnQ === 'Google Maps Embed' ? '✅ YES' : '❌ NO'}\n`);

        console.log('─────────────────────────────────────────────────────────────\n');

        // Check what data exists using the EXPECTED column names
        const youtubeData = row9['YouTube URL'];
        const mapData = row9['Google Maps Embed'];

        console.log('Data accessed with EXPECTED column names:');
        console.log(`  row['YouTube URL']:        ${youtubeData ? `"${youtubeData.substring(0, 60)}..."` : '❌ undefined (column not found)'}`);
        console.log(`  row['Google Maps Embed']:  ${mapData ? `"${mapData.substring(0, 60)}..."` : '❌ undefined (column not found)'}\n`);

        // If data is undefined, try to find it with actual column names
        if (!youtubeData && columnP !== 'YouTube URL') {
          const actualYoutubeData = row9[columnP];
          console.log(`⚠️  Data exists in column P, but header is wrong!`);
          console.log(`  Actual header: "${columnP}"`);
          console.log(`  Data: "${actualYoutubeData ? actualYoutubeData.substring(0, 60) : '(empty)'}..."\n`);
          console.log(`  FIX: Rename column P header to "YouTube URL"\n`);
        }

        if (!mapData && columnQ !== 'Google Maps Embed') {
          const actualMapData = row9[columnQ];
          console.log(`⚠️  Data exists in column Q, but header is wrong!`);
          console.log(`  Actual header: "${columnQ}"`);
          console.log(`  Data: "${actualMapData ? actualMapData.substring(0, 60) : '(empty)'}..."\n`);
          console.log(`  FIX: Rename column Q header to "Google Maps Embed"\n`);
        }

        console.log('═══════════════════════════════════════════════════════════════');
        console.log('DATA FORMAT CHECK');
        console.log('═══════════════════════════════════════════════════════════════\n');

        // Check if we got the data (either through correct headers or actual headers)
        const actualYoutube = youtubeData || row9[columnP];
        const actualMap = mapData || row9[columnQ];

        if (actualYoutube) {
          console.log('YouTube URL Format:');
          console.log(`  Value: "${actualYoutube}"\n`);

          if (actualYoutube.includes('youtube.com/embed/')) {
            console.log('  ✅ Format is correct! (embed URL)');
          } else if (actualYoutube.includes('youtube.com/watch')) {
            console.log('  ⚠️  Format might work, but embed URL is better');
            console.log('  Convert to: https://www.youtube.com/embed/VIDEO_ID');
          } else {
            console.log('  ❌ Format may not work');
            console.log('  Should be: https://www.youtube.com/embed/VIDEO_ID');
          }
          console.log('');
        } else {
          console.log('❌ No YouTube URL data found in row 9, column P\n');
        }

        if (actualMap) {
          console.log('Map Data Format:');
          console.log(`  Value: "${actualMap.substring(0, 100)}..."\n`);

          if (actualMap.trim().startsWith('<iframe')) {
            console.log('  ✅ Format is correct! (iframe embed code)');
            console.log('  Code will use: dangerouslySetInnerHTML');
          } else if (actualMap.includes('google.com/maps') || actualMap.includes('http')) {
            console.log('  ✅ Format is correct! (direct URL)');
            console.log('  Code will use: <iframe src="...">');
          } else {
            console.log('  ⚠️  Format unclear - might not work');
            console.log('  Should be either:');
            console.log('    - Full <iframe> HTML from Google Maps embed');
            console.log('    - Direct URL to map location');
          }
          console.log('');
        } else {
          console.log('❌ No Map data found in row 9, column Q\n');
        }

        console.log('═══════════════════════════════════════════════════════════════');
        console.log('DIAGNOSIS SUMMARY');
        console.log('═══════════════════════════════════════════════════════════════\n');

        const headerMismatch = columnP !== 'YouTube URL' || columnQ !== 'Google Maps Embed';
        const hasData = actualYoutube || actualMap;

        if (headerMismatch && hasData) {
          console.log('🔥 PROBLEM IDENTIFIED:');
          console.log('   Column headers do not match what the code expects!\n');
          console.log('   You HAVE data in row 9, but the column headers are wrong.');
          console.log('   This is why the map and YouTube are not showing.\n');
          console.log('SOLUTION:');
          console.log('   1. Open your Google Sheet');
          console.log('   2. Click on cell P1 (first row, column P)');
          console.log('   3. Type exactly: YouTube URL');
          console.log('   4. Click on cell Q1 (first row, column Q)');
          console.log('   5. Type exactly: Google Maps Embed');
          console.log('   6. Save and rebuild your website\n');
        } else if (!hasData) {
          console.log('⚠️  DATA MISSING:');
          console.log('   Row 9 does not have YouTube or Map data.\n');
          console.log('   Either:');
          console.log('   - The data is in a different row');
          console.log('   - The data has not been added yet');
          console.log('   - The columns are in the wrong position\n');
        } else {
          console.log('✅ Everything looks correct!');
          console.log('   Headers match, data exists and format looks good.\n');
          console.log('   If map/YouTube still not showing:');
          console.log('   1. Make sure website has been rebuilt after adding data');
          console.log('   2. Check browser console for JavaScript errors');
          console.log('   3. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)\n');
        }

        console.log('═══════════════════════════════════════════════════════════════\n');
      },
      error: (error) => {
        console.error('❌ ERROR parsing CSV:', error.message);
        process.exit(1);
      }
    });
  });

}).on('error', (err) => {
  console.error(`❌ ERROR: ${err.message}`);
  process.exit(1);
});

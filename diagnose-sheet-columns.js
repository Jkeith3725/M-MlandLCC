#!/usr/bin/env node

/**
 * Diagnostic Script: Check Google Sheet Column Headers
 *
 * This script fetches your Google Sheet CSV and compares the actual column
 * headers with what the code expects. This helps identify mismatches that
 * prevent maps and YouTube videos from displaying.
 */

const https = require('https');
const Papa = require('papaparse');

const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Expected column headers from SheetRow interface in lib/googleSheets.ts
const EXPECTED_COLUMNS = {
  'ID': 'A',
  'Title': 'B',
  'County': 'C',
  'State': 'D',
  'Nearest Town': 'E',
  'Acreage': 'F',
  'Price': 'G',
  'Is New Listing': 'H',
  'Thumbnail Image': 'I',
  'Additional Photos': 'J',
  'Short Description': 'K',
  'Full Overview': 'L',
  'Road Frontage': 'M',
  'Utilities': 'N',
  'Parcel ID': 'O',
  'YouTube URL': 'P',           // ← CRITICAL: Must match exactly
  'Google Maps Embed': 'Q',     // ← CRITICAL: Must match exactly
  'Slug': 'R',
  'Created Date': 'S'
};

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  Google Sheets Column Header Diagnostic Tool                  ║');
console.log('║  Checking for map and YouTube URL column mismatches           ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log(`📊 Fetching CSV from: ${SHEET_CSV_URL}\n`);

https.get(SHEET_CSV_URL, (res) => {
  if (res.statusCode !== 200) {
    console.error(`❌ ERROR: Failed to fetch sheet (Status: ${res.statusCode})\n`);
    console.error('SOLUTION: Make sure your Google Sheet is set to "Anyone with the link can view"');
    console.error('1. Open your Google Sheet');
    console.error('2. Click "Share" button (top right)');
    console.error('3. Change "Restricted" to "Anyone with the link"');
    console.error('4. Make sure permission is set to "Viewer"\n');
    process.exit(1);
  }

  let csvData = '';

  res.on('data', (chunk) => {
    csvData += chunk;
  });

  res.on('end', () => {
    console.log('✅ Successfully fetched sheet data!\n');

    // Parse CSV using Papa.parse (same library the code uses)
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const actualHeaders = results.meta.fields || [];

        console.log('═══════════════════════════════════════════════════════════════');
        console.log('COLUMN HEADER COMPARISON');
        console.log('═══════════════════════════════════════════════════════════════\n');

        let hasIssues = false;
        const criticalColumns = ['YouTube URL', 'Google Maps Embed'];

        // Check each expected column
        Object.keys(EXPECTED_COLUMNS).forEach((expectedHeader, index) => {
          const columnLetter = EXPECTED_COLUMNS[expectedHeader];
          const actualHeader = actualHeaders[index];
          const matches = actualHeader === expectedHeader;
          const isCritical = criticalColumns.includes(expectedHeader);

          let icon = matches ? '✓' : '✗';
          let status = matches ? 'OK' : 'MISMATCH';

          if (!matches && isCritical) {
            icon = '⚠️ ';
            hasIssues = true;
          }

          console.log(`Column ${columnLetter} ${icon} ${status}`);
          console.log(`  Expected: "${expectedHeader}"`);
          console.log(`  Actual:   "${actualHeader}"`);

          if (!matches) {
            console.log(`  ⚠️  WARNING: Header mismatch will cause data to not load!`);

            if (isCritical) {
              console.log(`  🔥 CRITICAL: This column is needed for maps/YouTube!`);
            }
          }
          console.log('');
        });

        console.log('═══════════════════════════════════════════════════════════════');
        console.log('SAMPLE DATA FROM ROW 2');
        console.log('═══════════════════════════════════════════════════════════════\n');

        if (results.data.length > 0) {
          const sampleRow = results.data[0];

          console.log(`Title: ${sampleRow['Title'] || '(empty)'}`);
          console.log(`YouTube URL (Column P): "${sampleRow['YouTube URL'] || '(empty)'}"`);
          console.log(`Google Maps Embed (Column Q): "${sampleRow['Google Maps Embed'] || '(empty)'}"`);

          // Try to find similar column names
          const youtubeColumn = Object.keys(sampleRow).find(key =>
            key.toLowerCase().includes('youtube') || key.toLowerCase().includes('video')
          );
          const mapColumn = Object.keys(sampleRow).find(key =>
            key.toLowerCase().includes('map')
          );

          if (youtubeColumn && youtubeColumn !== 'YouTube URL') {
            console.log(`\n⚠️  Found similar YouTube column: "${youtubeColumn}"`);
            console.log(`   Value: "${sampleRow[youtubeColumn]}"`);
            console.log(`   → This suggests the column header needs to be renamed to "YouTube URL"`);
          }

          if (mapColumn && mapColumn !== 'Google Maps Embed') {
            console.log(`\n⚠️  Found similar Map column: "${mapColumn}"`);
            console.log(`   Value: "${sampleRow[mapColumn]}"`);
            console.log(`   → This suggests the column header needs to be renamed to "Google Maps Embed"`);
          }
        }

        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('DIAGNOSIS');
        console.log('═══════════════════════════════════════════════════════════════\n');

        if (hasIssues) {
          console.log('🔥 PROBLEM FOUND: Column header mismatch detected!\n');
          console.log('WHY THIS HAPPENS:');
          console.log('- The code uses exact column names to read data from your sheet');
          console.log('- If column headers don\'t match exactly, the data appears empty');
          console.log('- Even a single extra space or wrong capitalization causes issues\n');

          console.log('HOW TO FIX:');
          console.log('1. Open your Google Sheet');
          console.log('2. Check the FIRST ROW (header row)');
          console.log('3. Make sure column headers match EXACTLY as shown above');
          console.log('4. Common issues:');
          console.log('   - Extra spaces: "YouTube  URL" should be "YouTube URL"');
          console.log('   - Wrong caps: "Youtube URL" should be "YouTube URL"');
          console.log('   - Different name: "Video URL" should be "YouTube URL"');
          console.log('   - Different name: "Map URL" should be "Google Maps Embed"');
          console.log('5. After fixing, save and rebuild your website\n');

        } else {
          console.log('✅ All column headers match correctly!\n');
          console.log('If maps/YouTube still aren\'t showing, check:');
          console.log('1. Do the cells actually have data? (check row 9 as user mentioned)');
          console.log('2. Is the data in the correct format?');
          console.log('   - YouTube: Should be an embed URL like https://www.youtube.com/embed/VIDEO_ID');
          console.log('   - Maps: Can be either HTML iframe code OR a direct URL');
          console.log('3. Has the website been rebuilt after adding the data?\n');
        }

        console.log('═══════════════════════════════════════════════════════════════');
        console.log('NEXT STEPS');
        console.log('═══════════════════════════════════════════════════════════════\n');
        console.log('1. Fix any column header mismatches in your Google Sheet');
        console.log('2. Make sure YouTube and Map data is in the correct format');
        console.log('3. Rebuild your website:');
        console.log('   → Go to https://github.com/Jkeith3725/M-MlandLCC/actions');
        console.log('   → Click "Deploy to GitHub Pages"');
        console.log('   → Click "Run workflow"');
        console.log('4. Wait 2-3 minutes for deployment');
        console.log('5. Check your website again\n');
      },
      error: (error) => {
        console.error('❌ ERROR parsing CSV:', error.message);
        process.exit(1);
      }
    });
  });

}).on('error', (err) => {
  console.error(`❌ ERROR: ${err.message}\n`);
  console.error('This usually means:');
  console.error('- No internet connection');
  console.error('- Google Sheets is blocked');
  console.error('- The sheet URL is incorrect\n');
  process.exit(1);
});

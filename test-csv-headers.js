#!/usr/bin/env node

const https = require('https');

const SHEET_ID = '1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

console.log('Fetching CSV from Google Sheets...\n');

https.get(SHEET_CSV_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Get the first two lines (header + one data row for context)
    const lines = data.split('\n');

    console.log('=== RAW CSV HEADER ===');
    console.log(lines[0]);
    console.log('\n=== PARSED HEADERS ===');

    // Parse headers - simple CSV split (may not handle all edge cases)
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

    headers.forEach((header, index) => {
      const columnLetter = String.fromCharCode(65 + index);
      console.log(`Column ${columnLetter} (${index + 1}): "${header}"`);
    });

    console.log('\n=== CHECKING EXPECTED COLUMNS ===');

    const expectedColumns = [
      'YouTube URL',
      'Google Maps Embed',
      'Map URL',
      'Map',
      'YouTube',
      'Video URL',
      'Maps Embed',
      'Google Map'
    ];

    expectedColumns.forEach(expected => {
      const found = headers.includes(expected);
      const icon = found ? '✓' : '✗';
      console.log(`${icon} "${expected}": ${found ? 'FOUND' : 'NOT FOUND'}`);
    });

    console.log('\n=== SAMPLE DATA (Row 2) ===');
    if (lines[1]) {
      const values = lines[1].split(',').map(v => v.replace(/"/g, '').trim());
      const youtubeIndex = headers.findIndex(h => h.toLowerCase().includes('youtube') || h.toLowerCase().includes('video'));
      const mapIndex = headers.findIndex(h => h.toLowerCase().includes('map'));

      if (youtubeIndex >= 0) {
        console.log(`YouTube column (${String.fromCharCode(65 + youtubeIndex)}): "${values[youtubeIndex]}"`);
      }
      if (mapIndex >= 0) {
        console.log(`Map column (${String.fromCharCode(65 + mapIndex)}): "${values[mapIndex]}"`);
      }
    }
  });

}).on('error', (err) => {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
});

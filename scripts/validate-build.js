/**
 * Pre-build Validation Script
 * Validates environment variables, Google Sheets connection, and data schema
 * before running the full build
 */

/**
 * Colors for console output
 */
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(`  ${title}`, colors.cyan);
  console.log('='.repeat(70) + '\n');
}

/**
 * Check 1: Validate Environment Variables
 */
async function checkEnvironmentVariables() {
  logSection('1. ENVIRONMENT VARIABLES CHECK');

  let allGood = true;

  // Check for Service Account (optional but recommended)
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    log('✅ GOOGLE_SERVICE_ACCOUNT is set', colors.green);

    // Try to parse it
    try {
      const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
      if (creds.type === 'service_account') {
        log('   ✓ Valid Service Account JSON format', colors.green);
      } else {
        log('   ⚠️  JSON does not appear to be a Service Account', colors.yellow);
      }
    } catch (error) {
      log('   ❌ Failed to parse GOOGLE_SERVICE_ACCOUNT JSON', colors.red);
      allGood = false;
    }
  } else {
    log('ℹ️  GOOGLE_SERVICE_ACCOUNT not set (will use public CSV fallback)', colors.yellow);
  }

  // Check basePath is configured
  const nextConfig = require('../next.config.js');
  if (nextConfig.basePath) {
    log(`✅ basePath configured: ${nextConfig.basePath}`, colors.green);
  } else {
    log('❌ basePath not configured in next.config.js', colors.red);
    allGood = false;
  }

  return allGood;
}

/**
 * Check 2: Test Google Sheets Connection
 */
async function checkGoogleSheetsConnection() {
  logSection('2. GOOGLE SHEETS CONNECTION TEST');

  try {
    log('📊 Attempting to fetch data from Google Sheets...', colors.cyan);

    // Dynamically import the module - works better for scripts
    const { fetchListingsFromSheet } = await import('../lib/googleSheets.js');
    const listings = await fetchListingsFromSheet();

    if (listings && listings.length > 0) {
      log(`✅ Successfully fetched ${listings.length} listings`, colors.green);

      // Show sample listing
      const sample = listings[0];
      log('\n📄 Sample listing:', colors.cyan);
      log(`   ID: ${sample.id}`);
      log(`   Title: ${sample.title}`);
      log(`   County: ${sample.county}, ${sample.state}`);
      log(`   Price: $${sample.price.toLocaleString()}`);
      log(`   Acreage: ${sample.acreage}`);
      log(`   Photos: ${sample.photos.length}`);

      return true;
    } else {
      log('❌ No listings returned from Google Sheets', colors.red);
      return false;
    }
  } catch (error) {
    log('❌ Failed to fetch from Google Sheets', colors.red);
    log(`   Error: ${error instanceof Error ? error.message : String(error)}`, colors.red);
    return false;
  }
}

/**
 * Check 3: Validate Data Schema
 */
async function validateDataSchema() {
  logSection('3. DATA SCHEMA VALIDATION');

  try {
    log('🔍 Fetching and validating all listings...', colors.cyan);

    const { fetchListingsFromSheet } = await import('../lib/googleSheets.js');
    const listings = await fetchListingsFromSheet();

    // Validation happens inside fetchListingsFromSheet via Zod schemas
    log(`✅ All ${listings.length} listings passed schema validation`, colors.green);

    // Check for common issues
    const listingsWithoutPhotos = listings.filter(l => l.photos.length === 0);
    if (listingsWithoutPhotos.length > 0) {
      log(`\n⚠️  ${listingsWithoutPhotos.length} listings have no photos:`, colors.yellow);
      listingsWithoutPhotos.forEach(l => {
        log(`   - ${l.title} (${l.slug})`, colors.yellow);
      });
    }

    const listingsWithoutSlug = listings.filter(l => !l.slug || l.slug.length === 0);
    if (listingsWithoutSlug.length > 0) {
      log(`\n❌ ${listingsWithoutSlug.length} listings have invalid slugs`, colors.red);
      return false;
    }

    return true;
  } catch (error) {
    log('❌ Data validation failed', colors.red);
    log(`   Error: ${error instanceof Error ? error.message : String(error)}`, colors.red);
    return false;
  }
}

/**
 * Main validation function
 */
async function runValidation() {
  log('\n🔍 PRE-BUILD VALIDATION', colors.cyan);
  log('Starting comprehensive build validation checks...', colors.cyan);

  const results = {
    env: false,
    connection: false,
    schema: false,
  };

  // Run all checks
  results.env = await checkEnvironmentVariables();
  results.connection = await checkGoogleSheetsConnection();
  results.schema = await validateDataSchema();

  // Final summary
  logSection('VALIDATION SUMMARY');

  log(`Environment Variables: ${results.env ? '✅ PASS' : '❌ FAIL'}`, results.env ? colors.green : colors.red);
  log(`Google Sheets Connection: ${results.connection ? '✅ PASS' : '❌ FAIL'}`, results.connection ? colors.green : colors.red);
  log(`Data Schema Validation: ${results.schema ? '✅ PASS' : '❌ FAIL'}`, results.schema ? colors.green : colors.red);

  const allPassed = results.env && results.connection && results.schema;

  console.log('\n' + '='.repeat(70));

  if (allPassed) {
    log('✅ ALL CHECKS PASSED - Build can proceed', colors.green);
    console.log('='.repeat(70) + '\n');
    process.exit(0);
  } else {
    log('❌ VALIDATION FAILED - Fix issues before building', colors.red);
    console.log('='.repeat(70) + '\n');
    process.exit(1);
  }
}

// Run validation
runValidation().catch((error) => {
  log('\n💥 VALIDATION SCRIPT CRASHED', colors.red);
  log(`Error: ${error instanceof Error ? error.message : String(error)}`, colors.red);
  process.exit(1);
});

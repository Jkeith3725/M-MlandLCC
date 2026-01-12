#!/usr/bin/env node

/**
 * Verifies that all image URLs in the codebase use withBasePath()
 * Run this before deploying to catch basePath issues
 */

const fs = require('fs');
const path = require('path');

const EXCLUDED_DIRS = ['node_modules', '.next', 'out', '.git', 'scripts'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Patterns that indicate problematic URL usage
const PROBLEMATIC_PATTERNS = [
  /[`'"]\/images\/(?!.*withBasePath)/,  // '/images/' without withBasePath nearby
  /\/images\/\$\{/,                      // Template literals with /images/
];

// Allowed patterns (these are OK)
const ALLOWED_PATTERNS = [
  /withBasePath\([`'"]\/images\//,      // withBasePath('/images/...')
  /src=[`'"]\/images\//,                 // Static src in JSX (Next.js handles these)
];

let issuesFound = 0;

function shouldCheckFile(filePath) {
  const ext = path.extname(filePath);
  return EXTENSIONS.includes(ext);
}

function isExcludedPath(filePath) {
  return EXCLUDED_DIRS.some(dir => filePath.includes(`/${dir}/`));
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check if line has problematic pattern
    const hasIssue = PROBLEMATIC_PATTERNS.some(pattern => pattern.test(line));

    if (hasIssue) {
      // Check if it's actually allowed
      const isAllowed = ALLOWED_PATTERNS.some(pattern => pattern.test(line));

      if (!isAllowed && !line.includes('withBasePath')) {
        console.log(`\n❌ ISSUE FOUND:`);
        console.log(`   File: ${filePath}`);
        console.log(`   Line ${index + 1}: ${line.trim()}`);
        console.log(`   Fix: Wrap URL with withBasePath()`);
        issuesFound++;
      }
    }
  });
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (isExcludedPath(fullPath)) {
      return;
    }

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (shouldCheckFile(fullPath)) {
      checkFile(fullPath);
    }
  });
}

console.log('🔍 Scanning codebase for basePath issues...\n');

try {
  scanDirectory(process.cwd());

  if (issuesFound === 0) {
    console.log('✅ No basePath issues found! Safe to deploy.\n');
    process.exit(0);
  } else {
    console.log(`\n⚠️  Found ${issuesFound} potential issue(s).`);
    console.log('Review the issues above and wrap URLs with withBasePath()');
    console.log('See BASEPATH_GUIDE.md for details.\n');
    process.exit(1);
  }
} catch (error) {
  console.error('Error scanning files:', error);
  process.exit(1);
}

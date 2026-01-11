// Quick diagnostic to check if images are set up correctly

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNOSTIC: Checking Property Image Setup\n');

// 1. Check if folder exists
const slug = '19-acres-washington-county-oh';
const folderPath = path.join(__dirname, 'public', 'images', 'listings', slug);

console.log('1. Checking folder:');
console.log(`   Path: ${folderPath}`);

if (fs.existsSync(folderPath)) {
  console.log('   ✅ Folder exists!');

  // 2. Check files in folder
  const files = fs.readdirSync(folderPath);
  console.log('\n2. Files in folder:');
  files.forEach(file => {
    const stats = fs.statSync(path.join(folderPath, file));
    console.log(`   - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });

  // 3. Check for thumbnail specifically
  const thumbnailPath = path.join(folderPath, 'thumbnail.jpg');
  if (fs.existsSync(thumbnailPath)) {
    console.log('\n3. Thumbnail check:');
    console.log('   ✅ thumbnail.jpg exists!');
    const stats = fs.statSync(thumbnailPath);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log('\n3. Thumbnail check:');
    console.log('   ❌ thumbnail.jpg NOT FOUND!');
  }

} else {
  console.log('   ❌ Folder does NOT exist!');
}

// 4. Check what the website would generate
console.log('\n4. Auto-detect paths that will be used:');
console.log(`   Thumbnail: /images/listings/${slug}/thumbnail.jpg`);
console.log(`   Additional: /images/listings/${slug}/1.jpg`);
console.log(`   Additional: /images/listings/${slug}/2.jpg`);
console.log(`   ... up to /images/listings/${slug}/10.jpg`);

console.log('\n5. Expected website URL:');
console.log(`   https://jkeith3725.github.io/M-MlandLCC/listings/${slug}`);

console.log('\n✅ Setup looks correct if folder and thumbnail exist!');
console.log('⚠️  Make sure Columns I and J are EMPTY in Google Sheets');
console.log('⚠️  Make sure you ran "Run workflow" on GitHub Actions');
console.log('⚠️  Wait 2-3 minutes for deployment to complete');

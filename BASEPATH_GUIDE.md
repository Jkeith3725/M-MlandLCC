# BasePath Guide for M&M Land Company Website

## CRITICAL: Understanding BasePath in Static Exports

This site uses Next.js static export deployed to GitHub Pages at `/M-MlandLCC` subdirectory.

**The Problem:** Next.js doesn't automatically add basePath to dynamic URLs in static exports.

**The Rule:** ALL internal URLs must use the `withBasePath()` helper function.

---

## ✅ CORRECT Usage

```typescript
import { withBasePath } from '@/lib/utils';

// Images
const imageUrl = withBasePath('/images/photo.jpg');
// Result: /M-MlandLCC/images/photo.jpg

// Links
const link = withBasePath('/listings/property-slug');
// Result: /M-MlandLCC/listings/property-slug
```

---

## ❌ WRONG Usage (Will Cause 404 Errors)

```typescript
// DON'T do this - missing basePath
const imageUrl = '/images/photo.jpg';
// Browser tries: https://jkeith3725.github.io/images/photo.jpg ❌ 404!

// This will fail on deployed site:
photos.push(`/images/listings/${slug}/thumbnail.jpg`);
```

---

## When to Use withBasePath()

### ✅ Always Use It For:
- Dynamic image URLs from Google Sheets
- Auto-detected image paths
- Programmatically generated links
- Any string concatenation creating URLs

### ❌ Don't Need It For:
- External URLs (http://, https://)
- Next.js `<Link>` component href (handles basePath automatically)
- URLs already starting with `/M-MlandLCC`

---

## Code Locations to Check

### 1. Image URL Generation (`lib/googleSheets.ts`)
```typescript
// ✅ CORRECT
photos.push(withBasePath(`/images/listings/${slug}/thumbnail.jpg`));

// ❌ WRONG
photos.push(`/images/listings/${slug}/thumbnail.jpg`);
```

### 2. Image Components (`components/**/*.tsx`)
```typescript
// ✅ CORRECT
<img src={withBasePath('/images/hero.jpg')} />

// Next.js Image component - depends on usage:
// If src is from props or state: wrap it
<Image src={withBasePath(dynamicUrl)} />

// If src is static string: Next.js handles it
<Image src="/images/static.jpg" /> // OK
```

### 3. Dynamic Imports or Fetches
```typescript
// ✅ CORRECT
const response = await fetch(withBasePath('/api/data'));

// ❌ WRONG
const response = await fetch('/api/data');
```

---

## Testing Checklist

Before deploying changes:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Serve the static site:**
   ```bash
   npx serve out
   ```

3. **Check all images load** - Open browser DevTools Network tab

4. **Look for 404s** - Any requests to `http://localhost:3000/images/...` without basePath are WRONG

5. **Inspect image URLs** - Right-click broken images → Inspect → Check `src` attribute

---

## Quick Reference: withBasePath() Function

Location: `lib/utils.ts`

```typescript
export function withBasePath(path: string): string {
  // Skips external URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const basePath = '/M-MlandLCC';

  // Don't add if already has basePath
  if (path.startsWith(basePath)) {
    return path;
  }

  // Add basePath to relative paths
  return `${basePath}${path}`;
}
```

---

## Common Mistakes to Avoid

### Mistake #1: Template Literals
```typescript
// ❌ WRONG
const url = `/images/${filename}`;

// ✅ CORRECT
const url = withBasePath(`/images/${filename}`);
```

### Mistake #2: String Concatenation
```typescript
// ❌ WRONG
const url = '/images/' + slug + '.jpg';

// ✅ CORRECT
const url = withBasePath('/images/' + slug + '.jpg');
```

### Mistake #3: Mapping Arrays
```typescript
// ❌ WRONG
const urls = filenames.map(f => `/images/${f}`);

// ✅ CORRECT
const urls = filenames.map(f => withBasePath(`/images/${f}`));
```

---

## Deployment Verification

After every deployment:

1. Visit: https://jkeith3725.github.io/M-MlandLCC/
2. Open DevTools → Network tab
3. Filter: `images`
4. **All image URLs should start with `/M-MlandLCC/`**
5. Check for 404 errors

---

## Emergency Fix

If images break after deployment:

1. Check `lib/googleSheets.ts` lines ~145 and ~161
2. Verify both use `withBasePath()`
3. Check no new code added image URLs without `withBasePath()`
4. Search codebase: `grep -r "'/images/" --include="*.tsx" --include="*.ts"`
5. Any matches should use `withBasePath()`

---

**Last Updated:** 2026-01-11
**Issue That Prompted This:** Images loaded as `/images/...` instead of `/M-MlandLCC/images/...` causing 404s on deployed site

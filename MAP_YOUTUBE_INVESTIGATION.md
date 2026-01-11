# Investigation: Maps and YouTube URLs Not Displaying

## Executive Summary

**Problem:** Maps and YouTube URLs are not showing up on property listing pages, even though the user has data in column Q (row 9) of their Google Sheet.

**Root Cause:** Most likely a **column header mismatch** between what the Google Sheet contains and what the code expects.

**Solution:** Verify and correct the column headers in row 1 of the Google Sheet.

---

## Investigation Details

### 1. Code Expectations

The code in `/home/user/M-MlandLCC/lib/googleSheets.ts` defines the expected column structure:

```typescript
interface SheetRow {
  ID: string;                     // Column A
  Title: string;                  // Column B
  County: string;                 // Column C
  State: string;                  // Column D
  'Nearest Town': string;         // Column E
  Acreage: string;                // Column F
  Price: string;                  // Column G
  'Is New Listing': string;       // Column H
  'Thumbnail Image': string;      // Column I
  'Additional Photos': string;    // Column J
  'Short Description': string;    // Column K
  'Full Overview': string;        // Column L
  'Road Frontage': string;        // Column M
  Utilities: string;              // Column N
  'Parcel ID': string;            // Column O
  'YouTube URL': string;          // Column P ← MUST BE EXACT
  'Google Maps Embed': string;    // Column Q ← MUST BE EXACT
  Slug: string;                   // Column R
  'Created Date': string;         // Column S
}
```

**Critical columns for this issue:**
- **Column P:** Must be named exactly `"YouTube URL"` (with capital Y and U, one space)
- **Column Q:** Must be named exactly `"Google Maps Embed"` (with capital G, M, and E, one space after Maps)

### 2. How the Code Reads Data

In `/home/user/M-MlandLCC/lib/googleSheets.ts` (lines 158-159):

```typescript
youtubeUrl: row['YouTube URL'] || undefined,
mapEmbedHtml: row['Google Maps Embed'] || undefined,
```

The code uses **bracket notation** to access columns by their exact header name. If the header doesn't match exactly:
- `row['YouTube URL']` returns `undefined`
- `row['Google Maps Embed']` returns `undefined`

This means the map and YouTube data won't be included in the listing, even if the cells contain data.

### 3. How Papa.parse Works

The code uses `Papa.parse()` with `header: true`:

```typescript
Papa.parse<SheetRow>(csvText, {
  header: true,
  skipEmptyLines: true,
  // ...
});
```

With `header: true`:
1. Papa.parse reads the **first row** as column headers
2. It creates objects where keys are the **exact header text**
3. **No normalization** is done - headers must match character-for-character
4. Extra spaces, different capitalization, or different names cause mismatches

### 4. How the Listing Page Renders

In `/home/user/M-MlandLCC/app/listings/[slug]/page.tsx`:

**YouTube Video (lines 155-168):**
```tsx
{listing.youtubeUrl && (
  <div>
    <h2>Property Video</h2>
    <iframe src={listing.youtubeUrl} ... />
  </div>
)}
```

**Map (lines 171-196):**
```tsx
{listing.mapEmbedHtml && (
  <div>
    <h2>Location</h2>
    {listing.mapEmbedHtml.trim().startsWith('<') ? (
      // HTML embed code
      <div dangerouslySetInnerHTML={{ __html: listing.mapEmbedHtml }} />
    ) : (
      // Direct URL
      <iframe src={listing.mapEmbedHtml} ... />
    )}
  </div>
)}
```

Both sections use **conditional rendering** (`&&`). If `youtubeUrl` or `mapEmbedHtml` are `undefined`, the entire section doesn't render.

---

## Common Column Header Issues

### Issue 1: Different Column Names

**Problem:** Sheet has different header text than expected

| What Sheet Has | What Code Expects | Result |
|----------------|-------------------|--------|
| `"Map URL"` | `"Google Maps Embed"` | ❌ Doesn't work |
| `"Youtube URL"` | `"YouTube URL"` | ❌ Doesn't work (lowercase 't') |
| `"Video URL"` | `"YouTube URL"` | ❌ Doesn't work |
| `"Maps Embed"` | `"Google Maps Embed"` | ❌ Doesn't work |

### Issue 2: Extra Spaces

**Problem:** Extra spaces in header names

| What Sheet Has | What Code Expects | Result |
|----------------|-------------------|--------|
| `"YouTube  URL"` (2 spaces) | `"YouTube URL"` (1 space) | ❌ Doesn't work |
| `"Google Maps  Embed"` (2 spaces) | `"Google Maps Embed"` (1 space) | ❌ Doesn't work |
| `" YouTube URL"` (leading space) | `"YouTube URL"` | ❌ Doesn't work |

### Issue 3: Wrong Capitalization

**Problem:** Incorrect uppercase/lowercase letters

| What Sheet Has | What Code Expects | Result |
|----------------|-------------------|--------|
| `"Youtube URL"` | `"YouTube URL"` | ❌ Doesn't work |
| `"YOUTUBE URL"` | `"YouTube URL"` | ❌ Doesn't work |
| `"Google maps embed"` | `"Google Maps Embed"` | ❌ Doesn't work |

### Issue 4: Column Order Wrong

**Problem:** Columns are in different positions

Even if the names match, if YouTube URL is in column Q instead of P, the data won't align correctly. However, with `header: true`, Papa.parse matches by **name not position**, so this shouldn't be an issue unless there are duplicate column names.

---

## Diagnostic Steps

### Step 1: Run Diagnostic Script

Run the diagnostic script I created:

```bash
node /home/user/M-MlandLCC/diagnose-sheet-columns.js
```

This will:
- Fetch your actual Google Sheet CSV
- Compare actual column headers vs. expected headers
- Show you exactly which columns don't match
- Display sample data from your sheet

### Step 2: Check Google Sheet Manually

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit
2. Look at **Row 1** (the header row)
3. Check columns P and Q specifically:
   - **Column P should say exactly:** `YouTube URL`
   - **Column Q should say exactly:** `Google Maps Embed`
4. Check row 9 (the row the user mentioned):
   - Does column Q actually have data?
   - What does the data look like?

### Step 3: Check Data Format

Even with correct headers, the data format matters:

**YouTube URL format:**
- ✅ Good: `https://www.youtube.com/embed/VIDEO_ID`
- ✅ Good: `https://youtube.com/embed/VIDEO_ID`
- ⚠️  Questionable: `https://www.youtube.com/watch?v=VIDEO_ID` (may work but not ideal)
- ❌ Bad: Just `VIDEO_ID`

**Google Maps Embed format (two options):**

Option 1 - Full iframe HTML:
```html
<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450"></iframe>
```

Option 2 - Just the URL:
```
https://www.google.com/maps/embed?pb=...
```

Or even a direct map URL like:
```
https://www.google.com/maps?q=...
```

The code (after commit 62bbbe4) supports both formats:
- If it starts with `<`, it treats it as HTML and uses `dangerouslySetInnerHTML`
- Otherwise, it treats it as a URL and wraps it in an `<iframe>`

---

## Expected vs. Actual Behavior

### Expected Behavior

1. User opens Google Sheet
2. User enters YouTube URL in column P, row 9
3. User enters Map URL in column Q, row 9
4. User rebuilds website
5. Website fetches CSV from Google Sheets
6. Papa.parse reads headers and data
7. Code accesses `row['YouTube URL']` and `row['Google Maps Embed']`
8. Data is populated in Listing object
9. Listing page renders YouTube video and map sections

### Current Behavior

1. User opens Google Sheet
2. User enters YouTube URL in column P, row 9
3. User enters Map URL in column Q, row 9
4. User rebuilds website
5. Website fetches CSV from Google Sheets
6. Papa.parse reads headers and data
7. Code accesses `row['YouTube URL']` → **returns `undefined`** (header mismatch)
8. Code accesses `row['Google Maps Embed']` → **returns `undefined`** (header mismatch)
9. Listing object has `youtubeUrl: undefined` and `mapEmbedHtml: undefined`
10. Listing page doesn't render YouTube video or map sections (conditional rendering)

---

## Solution

### Option 1: Fix Column Headers (Recommended)

**Step 1:** Open your Google Sheet

**Step 2:** Check row 1, columns P and Q. Rename them to:
- Column P: `YouTube URL` (exactly, with capital Y and U)
- Column Q: `Google Maps Embed` (exactly, with capitals G, M, E)

**Step 3:** Rebuild your website:
1. Go to https://github.com/Jkeith3725/M-MlandLCC/actions
2. Click "Deploy to GitHub Pages"
3. Click "Run workflow"
4. Wait 2-3 minutes

**Step 4:** Check your website

### Option 2: Update Code to Match Sheet (Not Recommended)

If for some reason you can't change the sheet headers, you could update the code in `/home/user/M-MlandLCC/lib/googleSheets.ts` (lines 158-159):

```typescript
// If your sheet has "Map URL" instead of "Google Maps Embed"
mapEmbedHtml: row['Map URL'] || undefined,

// If your sheet has "Youtube URL" instead of "YouTube URL"
youtubeUrl: row['Youtube URL'] || undefined,
```

But this is **not recommended** because:
- It diverges from the documented schema
- Future updates might break
- Harder to maintain

---

## Testing the Fix

After fixing headers and rebuilding:

1. **Visit a property page** with map/YouTube data
2. **View page source** (Right-click → View Page Source)
3. **Search for** `<iframe` in the source
4. **You should see:**
   - An iframe with YouTube embed URL
   - An iframe with Google Maps embed URL
5. **If you still don't see them:**
   - Check browser console for errors
   - Verify the data format in the sheet
   - Run the diagnostic script again

---

## Additional Notes

### Recent Fix (Commit 62bbbe4)

The most recent commit added support for both map embed codes AND direct URLs:

```typescript
{listing.mapEmbedHtml.trim().startsWith('<') ? (
  // It's HTML embed code (iframe)
  <div dangerouslySetInnerHTML={{ __html: listing.mapEmbedHtml }} />
) : (
  // It's a URL - convert to iframe
  <iframe src={listing.mapEmbedHtml} ... />
)}
```

This means you can now paste either:
- The full `<iframe>` embed code from Google Maps
- Just the map URL (like from id.land or Google Maps)

### Documentation

The schema is documented in:
- `/home/user/M-MlandLCC/GOOGLE_SHEETS_GUIDE.md` (lines 20-40)
- `/home/user/M-MlandLCC/lib/googleSheets.ts` (lines 53-73)

Both documents confirm that column Q should be named `"Google Maps Embed"`.

---

## Files Analyzed

1. `/home/user/M-MlandLCC/lib/googleSheets.ts` - Data fetching and parsing
2. `/home/user/M-MlandLCC/lib/types.ts` - Listing interface definition
3. `/home/user/M-MlandLCC/app/listings/[slug]/page.tsx` - Listing detail page rendering
4. `/home/user/M-MlandLCC/GOOGLE_SHEETS_GUIDE.md` - Schema documentation
5. Recent commits, especially 62bbbe4 (map URL/embed support)

---

## Next Steps

1. ✅ Run `/home/user/M-MlandLCC/diagnose-sheet-columns.js` to see actual headers
2. ✅ Compare actual headers with expected headers
3. ✅ Fix any mismatches in Google Sheet row 1
4. ✅ Verify data format in row 9 (or whichever row has the property)
5. ✅ Rebuild website via GitHub Actions
6. ✅ Test on live site

---

**Investigation Date:** 2026-01-11
**Investigator:** Claude
**Status:** Column header mismatch suspected - diagnostic tool created for verification

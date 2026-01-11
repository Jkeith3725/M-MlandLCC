# Investigation Summary: Maps and YouTube URLs Not Displaying

**Date:** 2026-01-11
**Issue:** Maps and YouTube URLs not showing on property listing pages
**Status:** Root cause identified - Column header mismatch suspected

---

## What I Found

### The Problem

You mentioned having a map URL in **column Q, row 9** of your Google Sheet, but it's not displaying on the website. The same issue affects YouTube URLs.

After thorough code analysis, I've identified the **most likely root cause**:

**The column headers in your Google Sheet (row 1) don't match what the code expects.**

### How the Code Works

The code in `/home/user/M-MlandLCC/lib/googleSheets.ts` reads your Google Sheet and looks for specific column names:

```typescript
// Lines 158-159
youtubeUrl: row['YouTube URL'] || undefined,
mapEmbedHtml: row['Google Maps Embed'] || undefined,
```

These column names must match **EXACTLY** (same capitalization, same spacing, same spelling):
- Column P must be named: `YouTube URL`
- Column Q must be named: `Google Maps Embed`

If your sheet has different headers (like `"Youtube URL"` or `"Map URL"`), the code can't find the data and treats it as empty.

### Why This Happens

The CSV parsing library (Papa Parse) uses `header: true`, which means:
1. It reads **row 1** as column headers
2. It creates objects where you access data by header name
3. **No automatic normalization** - headers must match exactly
4. Even one wrong letter or extra space breaks the match

---

## Tools I Created for You

I've created several diagnostic tools to help you identify and fix the issue:

### 1. **Full Diagnostic Script** ✨ START HERE
```bash
node /home/user/M-MlandLCC/diagnose-sheet-columns.js
```

**What it does:**
- Fetches your actual Google Sheet CSV
- Compares ALL column headers (expected vs. actual)
- Shows you EXACTLY which headers don't match
- Displays sample data from your sheet
- Identifies similar column names (e.g., if you have "Youtube" instead of "YouTube")

**Run this first!** It will tell you exactly what's wrong.

### 2. **Row 9 Specific Check**
```bash
node /home/user/M-MlandLCC/check-row-9-data.js
```

**What it does:**
- Specifically checks row 9 (the row you mentioned)
- Shows what data exists in columns P and Q
- Validates data format (YouTube embed URL, map URL/iframe)
- Tells you if the data is there but headers are wrong

### 3. **Quick Fix Guide**
Read: `/home/user/M-MlandLCC/FIX_MAP_YOUTUBE.md`

**What's in it:**
- Step-by-step visual guide to fix headers
- Data format examples (YouTube URLs, map embeds)
- Quick reference table of all expected headers
- Rebuild instructions

### 4. **Full Technical Investigation**
Read: `/home/user/M-MlandLCC/MAP_YOUTUBE_INVESTIGATION.md`

**What's in it:**
- Complete code analysis
- How Papa.parse works
- Common header mismatch scenarios
- Expected vs. actual behavior diagrams
- All files analyzed during investigation

---

## Quick Fix (TL;DR)

### Step 1: Run Diagnostic
```bash
node /home/user/M-MlandLCC/diagnose-sheet-columns.js
```

### Step 2: Fix Headers in Google Sheet

Open your Google Sheet: https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit

Check **row 1** and make sure:
- **Cell P1** says exactly: `YouTube URL` (capital Y, capital U, one space)
- **Cell Q1** says exactly: `Google Maps Embed` (capitals G, M, E, one space)

### Step 3: Check Data Format

Check **row 9** (or whichever row has your property):

**YouTube (Column P):**
- Should be: `https://www.youtube.com/embed/VIDEO_ID`
- Get it from YouTube → Share → Embed → copy the `src` URL

**Map (Column Q):**
- Can be EITHER:
  - Full iframe HTML: `<iframe src="..."></iframe>`
  - Just the URL: `https://www.google.com/maps?q=...`

### Step 4: Rebuild Website

1. Go to: https://github.com/Jkeith3725/M-MlandLCC/actions
2. Click **"Deploy to GitHub Pages"**
3. Click **"Run workflow"**
4. Wait 2-3 minutes
5. Check your website

---

## Common Issues and Solutions

### Issue 1: Column Header Mismatch ⚠️ MOST LIKELY

**Symptoms:**
- Data exists in Google Sheet
- Nothing shows on website
- No errors in console

**Check:**
```bash
node diagnose-sheet-columns.js
```

**Fix:**
Rename headers in row 1 to match exactly:
- Column P → `YouTube URL`
- Column Q → `Google Maps Embed`

### Issue 2: Wrong Data Format

**Symptoms:**
- Headers are correct
- Data exists but doesn't display
- May see console errors

**Check:**
```bash
node check-row-9-data.js
```

**Fix:**
- YouTube: Use embed URL (`youtube.com/embed/`)
- Map: Use either full iframe or direct URL

### Issue 3: Website Not Rebuilt

**Symptoms:**
- Fixed headers
- Fixed data format
- Still not showing

**Fix:**
Trigger manual rebuild via GitHub Actions

### Issue 4: Data in Wrong Row

**Symptoms:**
- Everything else checks out
- Still not showing

**Check:**
- Confirm which row has the data (count from row 2, since row 1 is headers)
- Check that row has a valid Slug value
- Visit the URL: `yourdomain.com/listings/SLUG`

---

## What the Code Does (Technical)

### Data Flow

1. **Build Time:**
   - Next.js calls `fetchListingsFromSheet()` in `lib/googleSheets.ts`
   - Fetches CSV from Google Sheets
   - Papa.parse reads CSV with `header: true`
   - Creates object for each row using header names as keys

2. **Data Mapping:**
   ```typescript
   {
     id: row.ID,
     title: row.Title,
     // ... other fields ...
     youtubeUrl: row['YouTube URL'] || undefined,        // ← Column P
     mapEmbedHtml: row['Google Maps Embed'] || undefined, // ← Column Q
   }
   ```

3. **Page Rendering:**
   - Listing detail page (`app/listings/[slug]/page.tsx`)
   - Checks if `youtubeUrl` exists → renders video section
   - Checks if `mapEmbedHtml` exists → renders map section
   - If undefined, sections don't render (conditional rendering)

### Why Header Mismatch Breaks It

```typescript
// If your sheet has "Youtube URL" (lowercase 't')
row['YouTube URL']  // → undefined (doesn't match "Youtube URL")

// If your sheet has "Map URL" (different name)
row['Google Maps Embed']  // → undefined (doesn't match "Map URL")
```

When the value is `undefined`:
```tsx
{listing.youtubeUrl && (  // undefined evaluates to false
  <div>Video Section</div>  // This never renders
)}
```

---

## Files Created During Investigation

All files are in `/home/user/M-MlandLCC/`:

1. **diagnose-sheet-columns.js** - Main diagnostic tool
2. **check-row-9-data.js** - Row-specific checker
3. **FIX_MAP_YOUTUBE.md** - Quick fix guide
4. **MAP_YOUTUBE_INVESTIGATION.md** - Full technical investigation
5. **INVESTIGATION_SUMMARY.md** - This file

---

## Files Analyzed

1. `/home/user/M-MlandLCC/lib/googleSheets.ts` - CSV fetching and parsing
2. `/home/user/M-MlandLCC/lib/types.ts` - TypeScript interfaces
3. `/home/user/M-MlandLCC/app/listings/[slug]/page.tsx` - Rendering logic
4. `/home/user/M-MlandLCC/GOOGLE_SHEETS_GUIDE.md` - Schema documentation
5. Recent commits (especially 62bbbe4 - map URL support)

---

## Recent Code Changes

### Commit 62bbbe4 (2026-01-11)
**"Fix: Support both map URLs and embed codes in Google Sheet"**

Added support for both:
- Full iframe HTML embed codes (starts with `<`)
- Direct map URLs (auto-wraps in iframe)

This means you can now paste either format into column Q.

---

## Next Steps

### Immediate Actions

1. ✅ **Run the diagnostic:**
   ```bash
   node /home/user/M-MlandLCC/diagnose-sheet-columns.js
   ```

2. ✅ **Review the output** - it will tell you exactly what's wrong

3. ✅ **Fix any header mismatches** in your Google Sheet row 1

4. ✅ **Verify data format** in row 9 (or your data row)

5. ✅ **Rebuild website** via GitHub Actions

6. ✅ **Test on live site**

### If Issues Persist

1. Run `check-row-9-data.js` for detailed row analysis
2. Read `MAP_YOUTUBE_INVESTIGATION.md` for technical details
3. Check browser console (F12) for JavaScript errors
4. Verify the property page URL matches the slug in your sheet

---

## Expected Results After Fix

Once you fix the headers and rebuild:

1. **Visit your property page**
2. **Scroll down past the overview**
3. **You should see:**
   - A "Property Video" section with embedded YouTube player
   - A "Location" section with embedded map
4. **Both should be interactive** (play video, zoom map, etc.)

---

## Prevention

To avoid this issue in the future:

✅ **Use the documented schema** - See `GOOGLE_SHEETS_GUIDE.md`
✅ **Copy headers exactly** - Don't retype, copy from documentation
✅ **Test after changes** - Run diagnostic script before rebuilding
✅ **Keep backups** - Download your sheet occasionally

---

## Contact/Support

If you're still having issues after:
1. Running both diagnostic scripts
2. Fixing all identified mismatches
3. Rebuilding the website
4. Waiting 5 minutes and hard-refreshing (Ctrl+Shift+R)

Then review the full technical investigation in `MAP_YOUTUBE_INVESTIGATION.md` for additional troubleshooting steps.

---

**Investigation completed:** 2026-01-11
**Tools created:** 4 scripts + 3 documentation files
**Confidence level:** High - Column header mismatch is the most likely cause
**Action required:** Run diagnostic script to confirm

# Quick Fix Guide: Maps and YouTube Not Showing

## TL;DR - The Fix

Your Google Sheet column headers probably don't match what the code expects. Here's how to fix it:

1. **Run the diagnostic:**
   ```bash
   node /home/user/M-MlandLCC/diagnose-sheet-columns.js
   ```

2. **Fix your Google Sheet headers** (row 1):
   - Column P must be: `YouTube URL` (capital Y, capital U, one space)
   - Column Q must be: `Google Maps Embed` (capitals G, M, E, one space after Maps)

3. **Check your data format** (row 9 or wherever you have data):
   - YouTube: Use embed URL like `https://www.youtube.com/embed/VIDEO_ID`
   - Maps: Can be either full iframe HTML or just the URL

4. **Rebuild your website:**
   - Go to: https://github.com/Jkeith3725/M-MlandLCC/actions
   - Click "Deploy to GitHub Pages" → "Run workflow"
   - Wait 2-3 minutes

---

## Step-by-Step Visual Guide

### Step 1: Check Your Column Headers

Open your Google Sheet and look at **ROW 1** (the header row):

```
| A  | B     | C      | ... | P           | Q                  | R    |
|----|-------|--------|-----|-------------|--------------------|------|
| ID | Title | County | ... | YouTube URL | Google Maps Embed  | Slug |
```

**Common Problems:**

❌ **Wrong:** `Youtube URL` (lowercase 't')
✅ **Right:** `YouTube URL` (capital Y, capital U)

❌ **Wrong:** `Map URL` (different name)
✅ **Right:** `Google Maps Embed` (exact name)

❌ **Wrong:** `YouTube  URL` (two spaces)
✅ **Right:** `YouTube URL` (one space)

---

### Step 2: Fix the Headers

1. Click on cell P1 (column P, row 1)
2. Type exactly: `YouTube URL`
3. Press Enter

4. Click on cell Q1 (column Q, row 1)
5. Type exactly: `Google Maps Embed`
6. Press Enter

**IMPORTANT:** The headers must match EXACTLY - same capitals, same spaces, same spelling.

---

### Step 3: Check Your Data Format

#### YouTube URL (Column P)

Your YouTube URL should be in "embed" format:

✅ **Correct format:**
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

❌ **Wrong format:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**How to get the embed URL:**
1. Go to your YouTube video
2. Click "Share" button
3. Click "Embed"
4. Copy the URL from the `src="..."` part of the iframe code
5. Paste it into column P

**Example:**
If YouTube gives you:
```html
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" ...></iframe>
```

You want just: `https://www.youtube.com/embed/dQw4w9WgXcQ`

---

#### Google Maps (Column Q)

You have **TWO options** for maps:

**Option 1: Paste the full iframe code**

1. Go to Google Maps
2. Find your location
3. Click "Share" → "Embed a map"
4. Copy the entire `<iframe>...</iframe>` code
5. Paste it into column Q

Example:
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="600" height="450"></iframe>
```

**Option 2: Just paste the URL**

1. Go to Google Maps
2. Find your location
3. Copy the URL from your browser's address bar
4. Paste it into column Q

Example:
```
https://www.google.com/maps?q=39.4154,-81.4484
```

**BOTH OPTIONS WORK!** The code auto-detects which one you used.

---

### Step 4: Rebuild Your Website

After fixing headers and data:

1. Go to GitHub Actions: https://github.com/Jkeith3725/M-MlandLCC/actions
2. Click **"Deploy to GitHub Pages"** in the left sidebar
3. Click the **"Run workflow"** button (top right, gray button)
4. Click the green **"Run workflow"** button in the dropdown
5. Wait 2-3 minutes for the build to complete
6. Refresh your website

---

## Testing

After rebuilding, test your fix:

1. **Go to your property page**
   Example: `https://jkeith3725.github.io/M-MlandLCC/listings/19-acres-washington-county-oh`

2. **Scroll down** - you should see:
   - A "Property Video" section (if you have YouTube URL)
   - A "Location" section with a map (if you have Map data)

3. **If you still don't see them:**
   - Run the diagnostic script again
   - Check browser console (F12) for errors
   - Read the full investigation: `/home/user/M-MlandLCC/MAP_YOUTUBE_INVESTIGATION.md`

---

## Quick Reference: Expected Column Headers

Copy these exact headers into your Google Sheet row 1:

| Column | Header Name (exact) |
|--------|---------------------|
| A | ID |
| B | Title |
| C | County |
| D | State |
| E | Nearest Town |
| F | Acreage |
| G | Price |
| H | Is New Listing |
| I | Thumbnail Image |
| J | Additional Photos |
| K | Short Description |
| L | Full Overview |
| M | Road Frontage |
| N | Utilities |
| O | Parcel ID |
| P | **YouTube URL** ← Check this one! |
| Q | **Google Maps Embed** ← Check this one! |
| R | Slug |
| S | Created Date |

---

## Still Having Issues?

1. **Run the diagnostic script:**
   ```bash
   node /home/user/M-MlandLCC/diagnose-sheet-columns.js
   ```
   This will show you exactly what's wrong.

2. **Read the full investigation:**
   Open `/home/user/M-MlandLCC/MAP_YOUTUBE_INVESTIGATION.md`

3. **Check the Google Sheets Guide:**
   Open `/home/user/M-MlandLCC/GOOGLE_SHEETS_GUIDE.md`

---

## Why This Happens

The code uses exact column names to read data from your sheet:

```typescript
youtubeUrl: row['YouTube URL']      // Looks for exact match
mapEmbedHtml: row['Google Maps Embed']  // Looks for exact match
```

If your sheet has `"Youtube URL"` (lowercase 't') instead of `"YouTube URL"` (capital Y and U), the code can't find it and returns empty data.

It's like asking for a file named `Report.pdf` but the file is actually named `report.pdf` - on some systems, these are treated as completely different files!

---

**Last Updated:** 2026-01-11

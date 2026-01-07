# Google Sheets Integration Guide

## Overview

Your M&M Land Company website now pulls property listings from Google Sheets! This means you can manage all your properties directly in a Google Sheet without touching any code.

## How It Works

1. **Your Google Sheet** contains all property data (photos, prices, descriptions, etc.)
2. **When you build the website**, it fetches data from your Google Sheet
3. **The website is generated** with the latest property information
4. **Visitors see** your updated listings

## Your Google Sheet

**Sheet URL:** https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing

### Column Structure

| Column | Field | What to Put Here |
|--------|-------|------------------|
| A | **ID** | Unique number for each property (1, 2, 3, etc.) |
| B | **Title** | Property name (e.g., "200 Acres - Washington County Legacy Property") |
| C | **County** | County name only (e.g., "Washington") |
| D | **State** | Either "OH" or "WV" |
| E | **Nearest Town** | Closest town (e.g., "Marietta") |
| F | **Acreage** | Number of acres (e.g., 200) |
| G | **Price** | Price in dollars (e.g., 1100000) |
| H | **Is New Listing** | Type "TRUE" or "FALSE" (shows "New Listing" badge) |
| I | **Thumbnail Image** | Main property photo URL (see Image Guide below) |
| J | **Additional Photos** | Other photos, separated by commas |
| K | **Short Description** | Brief 1-sentence description |
| L | **Full Overview** | Detailed property description |
| M | **Road Frontage** | Road frontage info (e.g., "3,200 feet on two roads") |
| N | **Utilities** | Available utilities (e.g., "Electric, phone available") |
| O | **Parcel ID** | Property parcel ID (e.g., "WAS-2024-001") |
| P | **YouTube URL** | YouTube embed URL (optional) |
| Q | **Google Maps Embed** | Google Maps iframe code (optional) |
| R | **Slug** | URL-friendly name (e.g., "200-acres-washington-county-oh") |
| S | **Created Date** | Date in YYYY-MM-DD format (e.g., "2024-02-10") |

## Image Guide

You have two options for property photos:

### Option 1: Use Existing Image Structure (Current)
Keep images in your repository at `/public/images/listings/` and reference them like:
```
/images/listings/listing-11-1.jpg
```

### Option 2: Use Google Drive or Other Hosting
1. Upload images to Google Drive
2. Make them publicly viewable
3. Get the direct image link
4. Paste the link in your Google Sheet

## How to Update Your Website

### Step 1: Edit Your Google Sheet
1. Open your Google Sheet
2. Add, edit, or delete property rows
3. Update prices, descriptions, or photos
4. Save (Google Sheets auto-saves)

### Step 2: Rebuild Your Website

**Option A: Manual Rebuild**
Run these commands:
```bash
npm run build
```

**Option B: Automatic Rebuild with GitHub Actions** (Recommended)
Set up a GitHub Action to rebuild automatically when you want. You can trigger this:
- On a schedule (e.g., daily at midnight)
- Manually with a button click
- Via a webhook

### Step 3: Deploy
After building, deploy to GitHub Pages:
```bash
git add out/
git commit -m "Update property listings"
git push
```

## Adding a New Property

1. **Open your Google Sheet**
2. **Add a new row** at the bottom
3. **Fill in all required fields:**
   - ID (next number in sequence)
   - Title
   - County, State, Nearest Town
   - Acreage and Price
   - Is New Listing (TRUE or FALSE)
   - Thumbnail Image
   - Short Description
   - Full Overview
   - Slug (use lowercase with hyphens, e.g., "75-acres-monroe-county-oh")
   - Created Date (today's date: YYYY-MM-DD)
4. **Optional fields:**
   - Additional Photos (comma-separated)
   - Road Frontage
   - Utilities
   - Parcel ID
   - YouTube URL
   - Google Maps Embed
5. **Save and rebuild** your website

## Editing an Existing Property

1. Open your Google Sheet
2. Find the property row you want to edit
3. Click on the cell you want to change
4. Make your changes
5. Save and rebuild your website

## Removing a Property

1. Open your Google Sheet
2. Right-click the row number of the property you want to remove
3. Select "Delete row"
4. Save and rebuild your website

## Featured Properties

The website automatically shows the **6 newest properties** on the homepage based on the "Created Date" column. To feature different properties:
- Update the "Created Date" to make them newer
- Or change which properties you want featured by adjusting their dates

## Troubleshooting

### Website shows old data
- Make sure you rebuilt the website after editing the sheet
- Check that the Google Sheet is still publicly accessible

### Property not showing
- Check that all required fields are filled in (ID, Title, County, State, Acreage, Price)
- Verify the "Slug" is unique and doesn't have spaces

### Images not loading
- Verify image URLs are correct and publicly accessible
- For Google Drive images, make sure they're set to "Anyone with the link can view"

### Wrong property count
- Make sure there are no empty rows between properties
- Check that each property has a unique ID

## Toggle Between Google Sheets and Mock Data

If you need to temporarily use the old hardcoded data:

1. Open `/lib/api.ts`
2. Find this line: `const USE_GOOGLE_SHEETS = true;`
3. Change it to: `const USE_GOOGLE_SHEETS = false;`
4. Rebuild the website

## Technical Details

### Files Modified
- `/lib/googleSheets.ts` - Fetches data from your Google Sheet
- `/lib/api.ts` - Updated to use Google Sheets data
- `/package.json` - Added `papaparse` for CSV parsing

### How Data Flows
1. Google Sheet (your data) → CSV export
2. Website build process fetches CSV
3. Parses CSV into property listings
4. Generates static HTML pages
5. Visitors see the final website

### Security
- Your Google Sheet is set to "view only" for anyone with the link
- No one can edit your sheet without your Google account access
- The website only reads data, never writes to your sheet

## Need Help?

If something isn't working:
1. Check that your Google Sheet is publicly accessible (view only)
2. Verify all required columns have data
3. Make sure you rebuilt the website after making changes
4. Check for typos in image URLs or dates

---

**Pro Tip:** Keep a backup copy of your Google Sheet in case you accidentally delete something important!

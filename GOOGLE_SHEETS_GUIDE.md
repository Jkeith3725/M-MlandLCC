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
| A | ID | Property ID number (1, 2, 3, etc.) |
| B | Title | Full property title (e.g., "45 Acres - Hocking County Timber Land") |
| C | County | County name (e.g., "Hocking", "Washington") |
| D | State | OH or WV |
| E | Nearest Town | Closest town name |
| F | Acreage | Property size in acres (e.g., 45) |
| G | Price | Price in dollars (e.g., 225000) |
| H | Is New Listing | TRUE or FALSE |
| I | Thumbnail Image | Main photo URL (see photo guide below) |
| J | Additional Photos | Other photo URLs, separated by commas |
| K | Short Description | Brief 1-2 sentence description |
| L | Full Overview | Detailed description (2-3 paragraphs) |
| M | Road Frontage | Road frontage details (e.g., "450 feet on county road") |
| N | Utilities | Available utilities (e.g., "Electric available at road") |
| O | Parcel ID | Property parcel ID (e.g., "HOC-2024-001") |
| P | YouTube URL | YouTube video embed URL (optional) |
| Q | Google Maps Embed | Google Maps embed HTML code (optional) |
| R | Slug | URL-friendly name (e.g., "45-acres-hocking-county-oh") |
| S | Created Date | Date in format: YYYY-MM-DD (e.g., 2024-01-15) |

---

## Managing Property Photos with Google Drive

### Automatic Google Drive Link Conversion

**Good News!** You can upload photos to Google Drive and just paste the sharing link. The website automatically converts it to work properly!

### Step-by-Step: Adding Photos

#### 1. Upload Photo to Google Drive

1. Go to your Google Drive folder (bookmark this): https://drive.google.com/drive/folders/1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1
2. Click **"+ New"** → **"File upload"**
3. Select your property photo
4. Wait for upload to complete

#### 2. Get the Sharing Link

1. Right-click the uploaded photo
2. Click **"Get link"**
3. Make sure it says **"Anyone with the link can view"**
4. Click **"Copy link"**

#### 3. Paste into Google Sheet

1. Go to your property spreadsheet
2. Find the property row
3. For **Thumbnail Image** (Column I): Paste the link
4. For **Additional Photos** (Column J): Paste multiple links separated by commas

**Example:**
```
https://drive.google.com/file/d/ABC123XYZ/view, https://drive.google.com/file/d/DEF456UVW/view
```

The website will **automatically convert** these Google Drive links to direct image URLs!

---

## Adding a New Property

1. **Go to the last row** in your Google Sheet
2. **Click the row below** the last property
3. **Fill in all columns**:
   - ID: Next number in sequence
   - Title: "XX Acres - County Name Property Type"
   - County, State, Nearest Town
   - Acreage, Price
   - Is New Listing: TRUE (if it's a new listing)
   - Upload photos to Google Drive, paste links
   - Short Description & Full Overview
   - Road Frontage, Utilities, Parcel ID
   - Slug: lowercase-with-hyphens (e.g., "50-acres-meigs-county-oh")
   - Created Date: Today's date (YYYY-MM-DD)

4. **Save the sheet** (it auto-saves!)
5. **Update the website** (see "Updating the Website" below)

---

## Editing an Existing Property

1. **Find the property row** in your Google Sheet
2. **Click the cell** you want to edit
3. **Make your changes** (price, description, photos, etc.)
4. **The sheet auto-saves**
5. **Update the website** (see below)

---

## Removing a Property

1. **Find the property row** in your Google Sheet
2. **Right-click the row number** (on the left)
3. **Click "Delete row"**
4. **Update the website** (see below)

---

## Updating the Website

After making changes to your Google Sheet, you need to rebuild the website to see the changes.

### Option 1: Automatic Nightly Update (Easiest!)

**Your website automatically rebuilds every night at 2 AM Eastern Time.**

Just make your changes during the day, and they'll appear on your website the next morning!

### Option 2: Manual Update (Update Right Now)

If you need changes to appear immediately:

1. **Go to GitHub Actions**: https://github.com/Jkeith3725/M-MlandLCC/actions
2. **Click "Deploy to GitHub Pages"** (in the left sidebar)
3. **Click "Run workflow"** button (top right)
4. **Click the green "Run workflow"** button again
5. **Wait 2-5 minutes** for the build to complete
6. **Check your website** - changes should be live!

---

## Enabling Google Sheets Integration

By default, the website uses mock data. To enable Google Sheets:

1. **Create a file** named `.env.local` in your project root
2. **Add this line**:
   ```
   NEXT_PUBLIC_USE_GOOGLE_SHEETS=true
   ```
3. **Save the file**
4. **Rebuild your website**

To go back to mock data, change `true` to `false`.

---

## Troubleshooting

### "My changes aren't showing on the website"

- **Did you trigger a rebuild?** The website doesn't update automatically - you need to run the workflow or wait for the nightly update
- **Is Google Sheets enabled?** Check your `.env.local` file has `NEXT_PUBLIC_USE_GOOGLE_SHEETS=true`
- **Is the sheet publicly accessible?** Make sure "Anyone with the link can view" is set

### "Photos aren't displaying"

- **Google Drive links**: Make sure the photo is set to "Anyone with the link can view"
- **Check the link format**: It should start with `https://drive.google.com/`
- **Wait for rebuild**: Changes only appear after the website rebuilds

### "I see an error when the website builds"

- **Check your CSV format**: Make sure there are no extra commas or quotes in descriptions
- **Check required fields**: ID, Title, County, State, Acreage, Price, and Slug are required
- **Check data types**: Price and Acreage should be numbers, not text

---

## Tips for Best Results

✅ **Use consistent naming**: Keep property titles in the same format
✅ **Keep IDs sequential**: 1, 2, 3, 4, etc.
✅ **Use unique slugs**: Each property needs a different slug
✅ **Test locally first**: If possible, test changes before deploying
✅ **Keep backups**: Download a copy of your Google Sheet occasionally

---

## Support

If you run into issues:
1. Check this guide's Troubleshooting section
2. Refer to the `HOW_TO_UPDATE_WEBSITE.md` guide for beginner-friendly instructions
3. Check the `FORM_SETUP_GUIDE.md` if you're having form submission issues

---

**Last Updated:** 2026-01-10

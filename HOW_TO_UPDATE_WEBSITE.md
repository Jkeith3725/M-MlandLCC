# How to Update Your Website Properties

## Overview

Your property listings are stored in `data/listings.json`. To update the website:

1. Edit the JSON file
2. Commit and push to GitHub
3. The website rebuilds automatically

---

## The Listings File

**Location:** `data/listings.json`

Each listing has these fields:

```json
{
  "id": "1",
  "title": "160 Acres - Washington County, OH",
  "slug": "160-acres-washington-county-oh",
  "county": "Washington",
  "state": "OH",
  "nearestTown": "Marietta",
  "acreage": 160,
  "price": 320000,
  "isNew": false,
  "shortDescription": "Brief description here.",
  "overview": "Full detailed description here.",
  "roadFrontage": "County road frontage",
  "utilities": "Electric available",
  "parcelId": "",
  "youtubeUrl": "",
  "mapEmbedHtml": "",
  "createdAt": "2024-01-15"
}
```

---

## Adding Photos

1. Create a folder in `public/images/listings/` with the same name as the listing's `slug`
2. Add images named `thumbnail.jpg`, `1.jpg`, `2.jpg`, etc.
3. The website automatically detects and displays them

**Example:**
```
public/images/listings/160-acres-washington-county-oh/
  ├── thumbnail.jpg
  ├── 1.jpg
  ├── 2.jpg
  └── 3.jpg
```

---

## Updating the Website

### Option 1: Automatic Daily Update
The website rebuilds every day at 3 AM Eastern. Just push your changes and wait.

### Option 2: Manual Update
1. Go to: https://github.com/Jkeith3725/M-MlandLCC/actions
2. Click "Deploy to GitHub Pages"
3. Click "Run workflow" → Select `main` → "Run workflow"
4. Wait 2-3 minutes

---

## Quick Reference

| Action | What to Do |
|--------|-----------|
| Change price | Edit `price` in listings.json |
| Add property | Add new object to the listings array |
| Remove property | Delete the object from listings.json |
| Add photos | Put images in `public/images/listings/[slug]/` |
| Update description | Edit `shortDescription` or `overview` |

---

## Your Links

- **Repository:** https://github.com/Jkeith3725/M-MlandLCC
- **Deploy Actions:** https://github.com/Jkeith3725/M-MlandLCC/actions
- **Live Website:** https://jkeith3725.github.io/M-MlandLCC

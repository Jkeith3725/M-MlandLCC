# 🔍 Maps & YouTube Investigation - START HERE

**Issue:** Maps and YouTube videos not showing on property listing pages
**Date:** 2026-01-11
**Status:** Root cause identified, diagnostic tools ready

---

## What You Need to Do Right Now

### 1️⃣ Run the Diagnostic (30 seconds)

Open your terminal and run:

```bash
node /home/user/M-MlandLCC/diagnose-sheet-columns.js
```

This will:
- ✅ Check your Google Sheet column headers
- ✅ Compare them to what the code expects
- ✅ Tell you exactly what needs to be fixed
- ✅ Show you sample data from your sheet

---

## 2️⃣ Read the Results

The diagnostic will tell you one of three things:

### ✅ **"All column headers match correctly!"**
Great! Headers are fine. The issue is elsewhere:
- Check if data actually exists in your cells
- Verify data format (see section 3 below)
- Make sure website was rebuilt after adding data

### ⚠️ **"Column header mismatch detected!"**
This is your problem! The diagnostic will show you:
- Which headers don't match
- What they should be
- How to fix them

→ **Go to Section 3** to fix it

### ❌ **"ERROR: Failed to fetch sheet"**
Your sheet isn't publicly accessible:
1. Open your Google Sheet
2. Click "Share" (top right)
3. Change to "Anyone with the link can view"
4. Run the diagnostic again

---

## 3️⃣ Fix Column Headers (if needed)

If the diagnostic found header mismatches:

1. **Open your Google Sheet:**
   https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit

2. **Look at ROW 1** (the header row)

3. **Fix these specific columns:**
   - **Cell P1:** Must say exactly `YouTube URL` (capital Y, capital U)
   - **Cell Q1:** Must say exactly `Google Maps Embed` (capitals G, M, E)

4. **Save** (it auto-saves)

→ **Go to Section 4**

---

## 4️⃣ Check Data Format

Even with correct headers, your data needs to be in the right format.

### YouTube URL (Column P)

✅ **Correct format:**
```
https://www.youtube.com/embed/VIDEO_ID
```

❌ **Wrong format:**
```
https://www.youtube.com/watch?v=VIDEO_ID
```

**How to get the right URL:**
1. Go to your YouTube video
2. Click "Share"
3. Click "Embed"
4. Copy the URL from `src="..."` in the code
5. Paste into column P

---

### Google Maps (Column Q)

You can use EITHER format:

**Option 1 - Full iframe code:**
```html
<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450"></iframe>
```

**Option 2 - Just the URL:**
```
https://www.google.com/maps?q=39.4154,-81.4484
```

**Both work!** The code auto-detects which format you used.

---

## 5️⃣ Rebuild Your Website

After fixing headers and/or data:

1. **Go to GitHub Actions:**
   https://github.com/Jkeith3725/M-MlandLCC/actions

2. **Click "Deploy to GitHub Pages"** (left sidebar)

3. **Click "Run workflow"** (top right, gray button)

4. **Click green "Run workflow"** button

5. **Wait 2-3 minutes**

6. **Visit your website and check**

---

## 6️⃣ Test the Fix

1. Go to your property page
2. Scroll down past the photos and overview
3. Look for:
   - "Property Video" section (if you have YouTube data)
   - "Location" section with map (if you have Map data)

**Still not showing?**
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console (F12) for errors
- Run the row-specific diagnostic (see below)

---

## Additional Diagnostics

### Check Specific Row Data

If you want to see exactly what's in row 9 (or any specific row):

```bash
node /home/user/M-MlandLCC/check-row-9-data.js
```

This shows:
- What data exists in columns P and Q for row 9
- Whether headers are correct
- Whether data format is valid

---

## Documentation Files

I created several files to help you:

| File | What It Is | When to Read It |
|------|-----------|-----------------|
| **START_HERE.md** | This file - Quick start guide | Read first |
| **FIX_MAP_YOUTUBE.md** | Step-by-step fix instructions | If diagnostic found issues |
| **INVESTIGATION_SUMMARY.md** | Overview of findings | For understanding the problem |
| **MAP_YOUTUBE_INVESTIGATION.md** | Full technical analysis | If you want all the details |

---

## Quick Reference

### Expected Column Headers (Row 1 of Google Sheet)

| Column | Exact Header Name |
|--------|-------------------|
| P | YouTube URL |
| Q | Google Maps Embed |

These must match **EXACTLY** - same capitalization, same spacing.

### Example Data

**YouTube (Column P):**
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

**Map Option 1 (Column Q):**
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!..." width="600" height="450"></iframe>
```

**Map Option 2 (Column Q):**
```
https://www.google.com/maps?q=39.4154,-81.4484
```

---

## Why This Happens

The code reads your Google Sheet and looks for **exact column names**:

```typescript
youtubeUrl: row['YouTube URL']          // Must match exactly
mapEmbedHtml: row['Google Maps Embed']  // Must match exactly
```

If your sheet has `"Youtube URL"` (lowercase 't') or `"Map URL"` (different name), the code can't find it and treats it as empty.

It's very picky about:
- ❌ Capitalization: `"Youtube"` ≠ `"YouTube"`
- ❌ Spacing: `"YouTube  URL"` (2 spaces) ≠ `"YouTube URL"` (1 space)
- ❌ Spelling: `"Map URL"` ≠ `"Google Maps Embed"`

---

## Next Steps

1. ✅ Run `diagnose-sheet-columns.js`
2. ✅ Fix any issues it identifies
3. ✅ Rebuild your website
4. ✅ Test the fix

**If you're still stuck:**
- Read `FIX_MAP_YOUTUBE.md` for detailed fix steps
- Read `MAP_YOUTUBE_INVESTIGATION.md` for technical details
- Run `check-row-9-data.js` for row-specific analysis

---

**Last Updated:** 2026-01-11
**Estimated fix time:** 5 minutes (if headers need fixing) + 3 minutes (rebuild)

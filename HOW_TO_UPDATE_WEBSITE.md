# How to Update Your Website Properties

## For Someone With No Computer Experience

This guide will show you how to update property listings on your website. It's easier than you think!

---

## What You Need

1. **Your Google Sheet** (bookmark this link):
   - https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing

2. **Your GitHub Repository** (bookmark this link too):
   - https://github.com/Jkeith3725/M-MlandLCC

---

## Step 1: Update Your Google Sheet

### To Change a Price:

1. **Open your Google Sheet** (click the bookmark)
2. **Find the property** you want to update
3. **Click on the Price column** (Column G)
4. **Type the new price** (just the number, like 250000)
5. **Press Enter**
6. **Done!** The sheet auto-saves

### To Add New Photos:

1. **Upload photo to Google Drive**:
   - Go to https://drive.google.com/drive/folders/1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1
   - Click **"+ New"** → **"File upload"**
   - Choose your photo
   - Wait for it to upload

2. **Get the link**:
   - Right-click the photo → **"Get link"**
   - Make sure it says **"Anyone with the link can view"**
   - Click **"Copy link"**

3. **Paste in your sheet**:
   - Go to your property row
   - Column I (Thumbnail Image): Paste the link
   - Column J (Additional Photos): Paste link (for multiple photos, separate with commas)

4. **Done!** The sheet auto-saves

### To Add a New Property:

1. **Go to the bottom** of your Google Sheet
2. **Click the first empty row**
3. **Fill in these columns**:
   - **Column A (ID):** Next number (if last is 12, use 13)
   - **Column B (Title):** "XX Acres - County Name Property Type"
   - **Column C (County):** County name
   - **Column D (State):** OH or WV
   - **Column E (Nearest Town):** Town name
   - **Column F (Acreage):** Number of acres
   - **Column G (Price):** Price in dollars (no commas or $)
   - **Column H (Is New Listing):** TRUE or FALSE
   - **Column I (Thumbnail Image):** Upload photo, paste Google Drive link
   - **Column J (Additional Photos):** More photo links, separated by commas
   - **Column K (Short Description):** 1-2 sentences
   - **Column L (Full Overview):** Detailed description
   - **Column M (Road Frontage):** "XXX feet on road type"
   - **Column N (Utilities):** What's available
   - **Column O (Parcel ID):** Your internal ID
   - **Column P (YouTube URL):** Video link (optional)
   - **Column Q (Google Maps):** Map code (optional)
   - **Column R (Slug):** lowercase-with-dashes (like "50-acres-county-oh")
   - **Column S (Created Date):** Today's date (YYYY-MM-DD format)

4. **Done!** Move to Step 2 to update the website

### To Remove a Property:

1. **Find the property row** in your Google Sheet
2. **Click the row number** (on the left side)
3. **Right-click** → **"Delete row"**
4. **Confirm**
5. **Done!** Move to Step 2 to update the website

---

## Step 2: Update Your Website

After making changes in Google Sheets, the website needs to rebuild.

### Option A: Wait for Automatic Update (Easiest!)

**Do nothing!** Your website automatically updates every night at 2 AM Eastern Time.

- Make changes during the day
- Go to bed
- Wake up to see them on your website! ☀️

### Option B: Update Right Now (Manual)

If you need changes NOW:

1. **Go to GitHub Actions**:
   - Click this bookmark: https://github.com/Jkeith3725/M-MlandLCC/actions

2. **Click "Deploy to GitHub Pages"** (on the left side)

3. **Click the "Run workflow" button** (on the right side, it's gray)

4. **Click the green "Run workflow" button** that appears

5. **Wait 2-5 minutes**:
   - The page will show a yellow dot (running)
   - Wait for it to turn green (finished)

6. **Check your website** - changes should be live!

---

## Viewing Your Live Website

**Your website:** https://jkeith3725.github.io/M-MlandLCC

---

## Common Questions

### "How do I know if the website updated?"

- **Look for the green checkmark** in GitHub Actions
- **Check the timestamp** - it should be recent
- **Visit your website** and look for your changes

### "The photos aren't showing"

- **Make sure** the Google Drive photo is set to "Anyone with the link can view"
- **Wait 5 minutes** after running the workflow
- **Clear your browser cache** (Ctrl+F5 or Cmd+Shift+R)

### "I made a mistake, how do I fix it?"

- **Just edit the Google Sheet** again with the correct information
- **Run the workflow again** (or wait for nightly update)
- **No permanent damage!** Everything can be fixed

### "Can I undo a change?"

**Yes!** Google Sheets keeps version history:
1. File → Version history → See version history
2. Find the version before your change
3. Click "Restore this version"

---

## Quick Reference

### Links to Bookmark

📊 **Your Property Sheet:**
https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing

📁 **Your Photos Folder:**
https://drive.google.com/drive/folders/1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1

🚀 **Update Website (GitHub Actions):**
https://github.com/Jkeith3725/M-MlandLCC/actions

🌐 **Your Live Website:**
https://jkeith3725.github.io/M-MlandLCC

---

## Daily Workflow

Here's what a typical day looks like:

**Morning:**
- Check your property sheet
- See what needs updating

**During the Day:**
- Upload new photos to Google Drive
- Update prices in the sheet
- Add new properties

**Evening:**
- Review your changes
- Either:
  - Click "Run workflow" to update now, OR
  - Just wait - it updates tonight at 2 AM!

**Next Morning:**
- Check your live website
- See all yesterday's changes live! ✨

---

## Tips for Success

✅ **Save links:** Bookmark all the important links
✅ **Take your time:** No rush, the sheet auto-saves
✅ **Check twice:** Review changes before updating website
✅ **Use version history:** If you make a mistake, you can undo it
✅ **Test photos first:** Make sure Google Drive links are public

---

## Getting Help

If something isn't working:

1. **Check this guide** - reread the steps
2. **Check the other guides**:
   - `GOOGLE_SHEETS_GUIDE.md` - detailed Google Sheets help
   - `FORM_SETUP_GUIDE.md` - form submission help
3. **Check GitHub Actions** - look for error messages
4. **Take a screenshot** - helpful for getting support

---

**Last Updated:** 2026-01-10

**You've got this!** 🎉

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
1. Open your Google Sheet (use the link above)
2. Find the property you want to change
3. Click on the **Price** column (column G)
4. Type the new price (example: `350000` for $350,000)
5. Press Enter
6. Done! Google Sheets saves automatically

### To Add a New Property:
1. Open your Google Sheet
2. Scroll to the bottom (after the last property)
3. Click on the first empty row
4. Fill in these columns (REQUIRED):
   - **ID**: Type the next number (if last property is 12, type `13`)
   - **Title**: Type the property name (example: `50 Acres - Monroe County Farm`)
   - **County**: Type the county (example: `Monroe`)
   - **State**: Type `OH` or `WV`
   - **Nearest Town**: Type the closest town
   - **Acreage**: Type the number of acres (example: `50`)
   - **Price**: Type the price (example: `250000`)
   - **Is New Listing**: Type `TRUE` or `FALSE`
   - **Thumbnail Image**: Paste the image web address
   - **Short Description**: Type a brief description
   - **Full Overview**: Type a detailed description
   - **Slug**: Type the property name with dashes (example: `50-acres-monroe-county-oh`)
   - **Created Date**: Type today's date like this: `2024-02-15`
5. Press Enter
6. Done! Google Sheets saves automatically

### To Delete a Property:
1. Open your Google Sheet
2. Find the property row you want to remove
3. Click on the row number on the left (the whole row will highlight)
4. Right-click on the row number
5. Click "Delete row"
6. Done! Google Sheets saves automatically

---

## Step 2: Update Your Website

After you've made changes to your Google Sheet, follow these steps to update your website:

### Option A: Let It Update Automatically (Easiest)
**Your website will automatically update every night at 2 AM Eastern Time.**

Just make your changes to the Google Sheet and wait. The website will update on its own overnight!

### Option B: Update It Right Now (Manual Button Click)

If you want the website to update immediately:

1. Go to your GitHub repository: https://github.com/Jkeith3725/M-MlandLCC

2. Click on the **"Actions"** tab at the top
   - (It's between "Pull requests" and "Projects")

3. You'll see a list on the left. Click on **"Deploy to GitHub Pages"**

4. On the right side, click the **"Run workflow"** button
   - It's a gray button

5. A box will appear. Click the green **"Run workflow"** button
   - (Yes, you click it twice)

6. Wait 2-5 minutes. You'll see:
   - A yellow circle (building...)
   - Then a green checkmark (done!)

7. Your website is now updated!

---

## How to Check if It Worked

1. Go to your website: https://jkeith3725.github.io/M-MlandLCC

2. Press **Ctrl + F5** (Windows) or **Cmd + Shift + R** (Mac) to refresh
   - This clears your browser's memory and shows the newest version

3. Look for your changes!

---

## Common Questions

### "I changed the Google Sheet but don't see changes on the website"
- Did you wait until 2 AM for automatic update? OR
- Did you click the "Run workflow" button on GitHub?
- Did you refresh your browser with Ctrl + F5?

### "I accidentally deleted something!"
- Don't panic! Go to **File → Version History** in Google Sheets
- You can restore an older version

### "The 'Run workflow' button isn't working"
- Make sure you're on the "Actions" tab
- Make sure you clicked "Deploy to GitHub Pages" on the left first
- Try refreshing the GitHub page and trying again

### "I don't understand what to put in the 'Slug' column"
- The slug is just the property title with dashes instead of spaces
- Example: "50 Acres - Monroe County Farm" becomes `50-acres-monroe-county-farm`
- Use all lowercase letters

### "Where do I get image URLs?"
For now, images are stored in your website files at `/public/images/listings/`

To add new images, you'll need help from someone who can:
- Add the image to the `/public/images/listings/` folder
- OR upload images to Google Drive and get shareable links

---

## Quick Cheat Sheet

**To update property info:**
1. Edit Google Sheet
2. Go to GitHub → Actions → Deploy to GitHub Pages
3. Click "Run workflow" button (twice)
4. Wait 2-5 minutes
5. Refresh your website

**Every night at 2 AM:** Website auto-updates from Google Sheet

---

## Need Help?

If something isn't working:
1. Double-check you saved the Google Sheet (it auto-saves, but verify)
2. Make sure all REQUIRED columns are filled in (see "Add New Property" section)
3. Wait the full 5 minutes for GitHub to finish
4. Try refreshing your browser with Ctrl + F5

---

## Bookmarks You Should Save

Save these links in your browser favorites:

1. **Google Sheet** (where you update properties):
   https://docs.google.com/spreadsheets/d/1byRYesF8cokqpOzDRGgIT_hgyrnUUKzguuphUpZh__s/edit?usp=sharing

2. **GitHub Actions** (where you click the update button):
   https://github.com/Jkeith3725/M-MlandLCC/actions

3. **Your Website** (to see the results):
   https://jkeith3725.github.io/M-MlandLCC

---

**You've got this!** It gets easier every time you do it.

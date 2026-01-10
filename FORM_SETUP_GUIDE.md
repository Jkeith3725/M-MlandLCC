# Form Submissions to Google Sheets - Setup Guide

This guide will walk you through setting up your website forms to automatically save submissions to Google Sheets in your Google Drive.

## What You'll Achieve

After following this guide:
- ✅ "Contact Us" form submissions → Save to Google Sheet
- ✅ "Sell Your Land" form submissions → Save to Google Sheet
- ✅ All submissions organized in your Drive folder
- ✅ Automatic timestamping of submissions
- ✅ No coding required after initial setup!

---

## Step 1: Create Your Google Sheets

### 1.1 Go to Your Google Drive Folder

Open your Drive folder: https://drive.google.com/drive/folders/1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1

### 1.2 Create Contact Form Sheet

1. Click **"+ New"** (top left)
2. Select **"Google Sheets" → "Blank spreadsheet"**
3. Name it: **"Contact Form Submissions"**
4. The sheet is now created!

### 1.3 Create Sell Land Form Sheet

1. Click **"+ New"** again
2. Select **"Google Sheets" → "Blank spreadsheet"**
3. Name it: **"Sell Land Form Submissions"**
4. The sheet is now created!

### 1.4 Get the Sheet IDs

For **each sheet** you just created:

1. **Open the sheet**
2. **Look at the URL** in your browser
3. **Copy the Sheet ID** - it's the long string in the middle of the URL

**Example URL:**
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ456_THIS_IS_THE_SHEET_ID_789DEF/edit
```

The Sheet ID is: `1ABC123XYZ456_THIS_IS_THE_SHEET_ID_789DEF`

**Save both Sheet IDs** - you'll need them in the next step!

---

## Step 2: Deploy Google Apps Script

### 2.1 Go to Google Apps Script

1. Go to: https://script.google.com
2. Click **"New Project"** (top left)

### 2.2 Copy the Script Code

1. **Delete** any code that's already there
2. **Open this file** in your project: `google-apps-script/form-handler.gs`
3. **Copy all the code** from that file
4. **Paste it** into the Google Apps Script editor

### 2.3 Add Your Sheet IDs

Find these two lines near the top of the script:

```javascript
const CONTACT_FORM_SHEET_ID = 'PASTE_YOUR_CONTACT_FORM_SHEET_ID_HERE';
const SELL_LAND_FORM_SHEET_ID = 'PASTE_YOUR_SELL_LAND_FORM_SHEET_ID_HERE';
```

**Replace** the placeholder text with your actual Sheet IDs:

```javascript
const CONTACT_FORM_SHEET_ID = '1ABC123XYZ456_YOUR_ACTUAL_CONTACT_SHEET_ID';
const SELL_LAND_FORM_SHEET_ID = '1DEF789UVW012_YOUR_ACTUAL_SELL_LAND_SHEET_ID';
```

### 2.4 Save the Project

1. Click the **disk icon** (or press Ctrl+S / Cmd+S)
2. Name your project: **"M&M Land Form Handler"**
3. Click **"Save"**

### 2.5 Deploy as Web App

1. Click **"Deploy"** (top right) → **"New deployment"**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Select **"Web app"**
4. Fill in the settings:
   - **Description:** "M&M Land Company Form Handler"
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone** (IMPORTANT!)
5. Click **"Deploy"**
6. **Authorize the app:**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to M&M Land Form Handler (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** - it should look like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

**SAVE THIS URL!** You'll need it in the next step.

---

## Step 3: Configure Your Website

### 3.1 Create Environment File

1. **Go to your project folder** on your computer
2. **Create a new file** named `.env.local` (note the dot at the beginning!)
3. **Open the file** in a text editor

### 3.2 Add the Web App URL

Paste this into the `.env.local` file:

```
NEXT_PUBLIC_FORM_SUBMISSION_URL=PASTE_YOUR_WEB_APP_URL_HERE
```

**Replace** `PASTE_YOUR_WEB_APP_URL_HERE` with the actual Web App URL you copied.

**Example:**
```
NEXT_PUBLIC_FORM_SUBMISSION_URL=https://script.google.com/macros/s/AKfycbz123ABC.../exec
```

### 3.3 Save the File

**Save** the `.env.local` file.

**IMPORTANT:** Add `.env.local` to your `.gitignore` so it doesn't get committed to GitHub!

---

## Step 4: Test Your Forms

### 4.1 Run Your Website Locally

```bash
npm run dev
```

### 4.2 Test the Contact Form

1. **Open your website** at http://localhost:3000
2. **Click "Contact Us"** button
3. **Fill out the form** with test data
4. **Click "Send Message"**
5. **You should see:** "Message sent successfully!" toast

### 4.3 Check Google Sheets

1. **Open your "Contact Form Submissions" sheet**
2. **You should see:**
   - Header row with column names (automatically created!)
   - Your test submission in the second row

### 4.4 Test the Sell Land Form

1. **Click "Sell Your Land"** button on your website
2. **Fill out the form** with test data
3. **Click "Submit Property"**
4. **You should see:** "Thank you! We will review your property..."

1. **Open your "Sell Land Form Submissions" sheet**
2. **You should see:** Your test submission

---

## Step 5: Deploy to Production

### 5.1 Build Your Website

```bash
npm run build
```

### 5.2 Deploy

Follow your normal deployment process (GitHub Pages, Vercel, etc.)

**For GitHub Pages:**

1. **Create `.env.local` in GitHub Secrets:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FORM_SUBMISSION_URL`
   - Value: Your Web App URL
   - Click "Add secret"

2. **Update GitHub Actions workflow** to use the secret (if needed)

---

## Troubleshooting

### "Form submission failed" error

**Check:**
- ✅ Web App URL is correct in `.env.local`
- ✅ Sheet IDs are correct in the Google Apps Script
- ✅ Google Apps Script is deployed with "Anyone" access
- ✅ Google Sheets are in the correct Drive folder

### Forms submit but data doesn't appear in sheets

**Check:**
- ✅ Sheet IDs match your actual sheets
- ✅ Google Apps Script is saved and deployed
- ✅ You're looking at the correct sheets in your Drive folder

### "Authorization required" error

**Solution:**
1. Go back to Google Apps Script
2. Click "Deploy" → "Manage deployments"
3. Click "Edit" (pencil icon)
4. Change "Who has access" to "Anyone"
5. Click "Deploy"

### Data appears but in wrong format

**Solution:**
- The script automatically creates headers on first submission
- If headers are wrong, delete row 1 and submit again
- Headers will be recreated correctly

---

## What Happens Now?

When someone submits a form on your website:

1. ✅ Form data is sent to your Google Apps Script
2. ✅ Script saves data to the correct Google Sheet
3. ✅ Timestamp is automatically added
4. ✅ User sees success message
5. ✅ You can view submissions anytime in Google Sheets

---

## Viewing Submissions

**Bookmark these sheets:**

- **Contact Form:** https://drive.google.com/drive/folders/1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1
- **Sell Land Form:** https://drive.google.com/drive/folders/1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1

Open them anytime to see new submissions!

---

## Tips

✅ **Check regularly:** Review submissions at least weekly
✅ **Export as needed:** Download as CSV/Excel for records
✅ **Archive old data:** Move old submissions to archive sheets
✅ **Set up notifications:** Use Google Sheets notifications for new submissions

---

## Next Steps

- Set up Google Sheets notifications to get email alerts for new submissions
- Create a dashboard to analyze submission trends
- Export data regularly for your records

---

**Last Updated:** 2026-01-10

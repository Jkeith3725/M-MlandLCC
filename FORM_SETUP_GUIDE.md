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

### 1.2 Create Two Google Sheets

**Sheet 1: Contact Form Submissions**
1. Click "New" → "Google Sheets" → "Blank spreadsheet"
2. Name it: `Contact Form Submissions`
3. Leave it blank for now (the script will add headers automatically)
4. Copy the Sheet ID from the URL (explained below)

**Sheet 2: Sell Land Form Submissions**
1. Click "New" → "Google Sheets" → "Blank spreadsheet"
2. Name it: `Sell Land Form Submissions`
3. Leave it blank for now
4. Copy the Sheet ID from the URL

### 1.3 How to Find Sheet IDs

When you open a Google Sheet, look at the URL:
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ456_THIS_IS_THE_SHEET_ID/edit
```

The Sheet ID is the long string between `/d/` and `/edit`.

**Copy both Sheet IDs** - you'll need them in the next step!

---

## Step 2: Create Google Apps Script

### 2.1 Open Google Apps Script

1. Go to: https://script.google.com
2. Click "New Project" (top left)

### 2.2 Copy the Script Code

1. In your project folder, open the file: `google-apps-script/form-handler.gs`
2. Copy ALL the code from that file
3. Go back to Google Apps Script
4. Delete the default code (`function myFunction() {}`)
5. Paste the code you copied

### 2.3 Configure Sheet IDs

Find these two lines near the top of the script:
```javascript
const CONTACT_FORM_SHEET_ID = 'REPLACE_WITH_YOUR_CONTACT_SHEET_ID';
const SELL_LAND_FORM_SHEET_ID = 'REPLACE_WITH_YOUR_SELL_LAND_SHEET_ID';
```

Replace them with your actual Sheet IDs from Step 1:
```javascript
const CONTACT_FORM_SHEET_ID = '1ABC123XYZ456...';  // Your Contact Form Sheet ID
const SELL_LAND_FORM_SHEET_ID = '1DEF789...';      // Your Sell Land Form Sheet ID
```

### 2.4 Save the Project

1. Click the disk icon (💾) or press `Ctrl+S` / `Cmd+S`
2. Name your project: `M&M Land Company Form Handler`

---

## Step 3: Deploy as Web App

### 3.1 Deploy

1. Click "Deploy" (top right) → "New deployment"
2. Click the gear icon ⚙️ next to "Select type"
3. Choose "Web app"
4. Fill in the settings:
   - **Description**: `M&M Land Company Form Handler`
   - **Execute as**: Select "Me (your email)"
   - **Who has access**: Select "Anyone"

### 3.2 Authorize

1. Click "Deploy"
2. You'll see a warning about authorization - click "Authorize access"
3. Choose your Google account
4. Click "Advanced" → "Go to M&M Land Company Form Handler (unsafe)"
5. Click "Allow"

### 3.3 Copy the Web App URL

After authorization, you'll see a "Web app URL" like:
```
https://script.google.com/macros/s/ABC123XYZ456.../exec
```

**Copy this entire URL** - you'll need it in the next step!

---

## Step 4: Configure Your Website

### 4.1 Create Environment Variable File

1. In your project root, you'll see a file named `.env.local.example`
2. Create a new file named `.env.local` (remove the `.example`)
3. Open `.env.local` and paste your Web App URL:

```
NEXT_PUBLIC_FORM_SUBMISSION_URL=https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec
```

### 4.2 Add to .gitignore (Important!)

Make sure `.env.local` is in your `.gitignore` file (it should already be there).

**Never commit .env.local to GitHub!** This keeps your Web App URL private.

---

## Step 5: Test Your Forms

### 5.1 Test Locally

1. Run your website locally:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/M-MlandLCC

3. Try submitting both forms:
   - Click "Sell Your Land" and fill out the form
   - Click "Contact" on a property listing and fill out the form

### 5.2 Check Google Sheets

1. Go to your Google Sheets
2. You should see:
   - Headers automatically added (Timestamp, Name, Email, etc.)
   - Your test submissions in the rows below
   - Formatted headers (bold, colored background)

### 5.3 If Something Goes Wrong

**Forms not submitting?**
- Check that you copied the Web App URL correctly to `.env.local`
- Make sure `.env.local` has no typos
- Restart your dev server after creating `.env.local`

**Data not appearing in sheets?**
- Verify you pasted the correct Sheet IDs in the Google Apps Script
- Check Sheet IDs don't have extra spaces or characters
- Make sure you clicked "Deploy" after pasting the code

**Google Sheets shows errors?**
- Check that the Web App is deployed with "Who has access: Anyone"
- Verify you authorized the script properly
- Try redeploying: Deploy → "Manage deployments" → Click the pencil → "Deploy"

---

## Step 6: Deploy to Production

### 6.1 Add Environment Variable to GitHub

Since GitHub Actions builds your site, you need to add the environment variable there too:

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `NEXT_PUBLIC_FORM_SUBMISSION_URL`
5. Value: Your Google Apps Script Web App URL
6. Click "Add secret"

### 6.2 Rebuild and Deploy

1. Commit your changes (forms are now connected!)
2. Push to main branch
3. GitHub Actions will automatically rebuild and deploy
4. Your live site now has working forms!

---

## How It Works (For Your Reference)

1. **User fills out form** on your website
2. **Form submits data** to Google Apps Script Web App
3. **Google Apps Script receives data** and determines form type
4. **Script opens correct Google Sheet** (Contact or Sell Land)
5. **Data is appended** as a new row with timestamp
6. **User sees success message** on website
7. **You check Google Sheet** to see new submission!

---

## Viewing Submissions

### In Google Sheets

1. Go to your Drive folder: https://drive.google.com/drive/folders/1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1

2. Open either sheet:
   - "Contact Form Submissions"
   - "Sell Land Form Submissions"

3. Each submission appears as a new row with:
   - Timestamp
   - All form fields
   - Formatted headers for easy reading

### Tip: Get Email Notifications (Optional)

You can set up Google Sheets to email you when new rows are added:

1. Open your Google Sheet
2. Click "Tools" → "Notification rules"
3. Choose "Any changes are made"
4. Choose "Email - right away"
5. Click "Save"

Now you'll get an email every time someone submits a form!

---

## Troubleshooting Common Issues

### "Failed to submit" Error on Website

**Possible causes:**
- `.env.local` file doesn't exist or has wrong URL
- Web App URL is incorrect
- Forgot to restart dev server after creating `.env.local`

**Solution:**
1. Double-check `.env.local` has correct URL
2. Stop dev server (`Ctrl+C`)
3. Start again: `npm run dev`

### Form Submits But No Data in Sheet

**Possible causes:**
- Wrong Sheet IDs in Google Apps Script
- Sheet permissions issue
- Web App not deployed correctly

**Solution:**
1. Re-check Sheet IDs in the script (Step 2.3)
2. Redeploy the Web App (Step 3)
3. Make sure sheets are in the correct Drive folder

### Headers Not Appearing in Sheet

**This is normal!** Headers are created automatically when the first submission arrives. Just submit a test form and headers will appear.

### "Authorization Required" Error

**Cause:** Google Apps Script needs authorization

**Solution:**
1. Go to script.google.com
2. Open your project
3. Run the `testContactForm` function manually
4. Authorize when prompted
5. Try submitting form again

---

## Security Notes

- ✅ Your Google Apps Script URL is private (stored in `.env.local`, not in GitHub)
- ✅ Only your website can submit to your forms (CORS protection)
- ✅ No sensitive data is exposed
- ✅ Google Sheets are in your private Drive folder
- ⚠️ Consider making sheets view-only to others except yourself

---

## For Non-Technical Users

Once setup is complete, managing form submissions is easy:

1. **Check submissions**: Open your Google Sheets
2. **Export data**: File → Download → Excel or CSV
3. **Share with team**: Share the Google Sheet with team members
4. **Archive old submissions**: Copy to another sheet or delete rows

**You never need to touch the code again!**

---

## Summary Checklist

- [ ] Created "Contact Form Submissions" Google Sheet
- [ ] Created "Sell Land Form Submissions" Google Sheet
- [ ] Copied both Sheet IDs
- [ ] Created Google Apps Script project
- [ ] Pasted form handler code
- [ ] Updated Sheet IDs in script
- [ ] Deployed as Web App
- [ ] Copied Web App URL
- [ ] Created `.env.local` file with URL
- [ ] Tested forms locally
- [ ] Added environment variable to GitHub
- [ ] Deployed to production
- [ ] Forms working on live site!

---

## Need Help?

If you get stuck:
1. Re-read the relevant section carefully
2. Check for typos in URLs and IDs
3. Try the troubleshooting section
4. Make sure you completed all steps in order

**Your forms are now connected to Google Sheets!** 🎉

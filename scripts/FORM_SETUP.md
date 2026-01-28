# Form Submission Setup Guide

This guide will help you set up free form submissions for your M&M Land Company website. When someone fills out the "Sell Your Land" form, you'll receive:
- An email notification with the submission details
- A Google Sheet that stores all submissions for easy tracking

**Cost: Completely FREE** (uses Google Apps Script)

---

## Step 1: Create the Google Apps Script

1. **Go to Google Apps Script**
   - Open your browser and go to: https://script.google.com
   - Sign in with your Google account (use the same account where you want to receive submissions)

2. **Create a New Project**
   - Click the **"+ New project"** button in the top left

3. **Add the Script Code**
   - Delete any existing code in the editor (select all and delete)
   - Open the file `google-apps-script.js` in this folder
   - Copy ALL the code from that file
   - Paste it into the Google Apps Script editor

4. **Configure Your Email**
   - Near the top of the code, find this line:
     ```javascript
     const NOTIFICATION_EMAIL = 'your-email@example.com';
     ```
   - Replace `your-email@example.com` with your actual email address
   - Example: `const NOTIFICATION_EMAIL = 'john@mmlandcompany.com';`

5. **Save the Project**
   - Click the floppy disk icon (or press Ctrl+S / Cmd+S)
   - Name your project "M&M Land Forms" when prompted

---

## Step 2: Deploy as Web App

1. **Click Deploy**
   - Click the **"Deploy"** button in the top right
   - Select **"New deployment"**

2. **Configure Deployment**
   - Click the gear icon next to "Select type"
   - Choose **"Web app"**

3. **Set Permissions**
   - Description: `M&M Land Form Handler`
   - Execute as: **"Me"** (your email)
   - Who has access: **"Anyone"**

4. **Deploy**
   - Click **"Deploy"**
   - You'll be asked to authorize the script - click "Authorize access"
   - Choose your Google account
   - Click "Advanced" then "Go to M&M Land Forms (unsafe)" if prompted
   - Click "Allow" to grant permissions

5. **Copy Your URL**
   - After deployment, you'll see a **Web App URL**
   - It looks like: `https://script.google.com/macros/s/XXXXX.../exec`
   - **Copy this URL** - you'll need it in the next step!

---

## Step 3: Add the URL to Your Website

### Option A: For Local Development (Recommended for Testing)

1. Create a file called `.env.local` in your project root (same folder as package.json)
2. Add this line:
   ```
   NEXT_PUBLIC_FORM_SUBMISSION_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
3. Replace the URL with your actual Web App URL from Step 2

### Option B: For GitHub Pages (Production)

1. Open the file `lib/formSubmission.ts`
2. Find this line near the top:
   ```typescript
   const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL ||
     ''; // Add your URL here after deploying the Google Apps Script
   ```
3. Add your URL inside the quotes:
   ```typescript
   const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL ||
     'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
4. Commit and push the changes to deploy

---

## Step 4: Test Your Form

1. **Test the Script Directly**
   - In Google Apps Script, click the dropdown next to "Debug"
   - Select `testFormSubmission`
   - Click "Run"
   - Check your Google Sheets for a test entry
   - Check your email for a notification

2. **Test on Your Website**
   - Run your website locally: `npm run dev`
   - Click "Sell Your Land"
   - Fill out the form with test data
   - Submit and check for:
     - Success toast message
     - Email notification
     - Entry in Google Sheets

---

## Where to Find Your Submissions

1. **Google Sheets**
   - Go to https://drive.google.com
   - Look for "M&M Land Company - Form Submissions"
   - You'll see two tabs:
     - "Sell Land Submissions" - Property submissions
     - "Contact Submissions" - General inquiries

2. **Email**
   - You'll receive an email for every new submission
   - Emails include all the form details

---

## Troubleshooting

### Form says "not configured"
- Make sure you added the URL in `lib/formSubmission.ts` or `.env.local`
- Rebuild and redeploy your site if using GitHub Pages

### Not receiving emails
- Check your spam folder
- Verify the `NOTIFICATION_EMAIL` in the Google Apps Script is correct
- Make sure you saved and redeployed after changing the email

### Submissions not appearing in Google Sheets
- Open your Google Apps Script and check the "Executions" tab for errors
- Make sure you authorized all permissions during deployment

### "Access denied" errors
- Redeploy the script with "Who has access" set to "Anyone"
- Make sure "Execute as" is set to "Me"

---

## Need Help?

If you run into issues:
1. Check the browser console (F12) for error messages
2. Check the Google Apps Script "Executions" log for server-side errors
3. Verify your Web App URL is correct and accessible

---

## Security Notes

- Your form submissions are stored in YOUR Google account
- Only you have access to the Google Sheet
- The Web App URL is public but doesn't expose any data
- No third-party services have access to your submissions

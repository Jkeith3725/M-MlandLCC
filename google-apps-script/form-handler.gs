/**
 * Google Apps Script for M&M Land Company Form Submissions
 *
 * This script receives form submissions from your website and saves them to Google Sheets.
 * It handles both "Contact Us" and "Sell Your Land" forms.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create two Google Sheets in your Drive folder (1bhlkOZhmzwiUEwHauQhworLBtA-tUTU1):
 *    - "Contact Form Submissions"
 *    - "Sell Land Form Submissions"
 * 2. Copy the Sheet IDs (found in the URL) and paste them below
 * 3. Deploy this script as a Web App (Instructions below)
 * 4. Copy the Web App URL and add it to your website forms
 */

// ============================================================================
// CONFIGURATION - REPLACE THESE WITH YOUR SHEET IDS
// ============================================================================

// Get Sheet ID from the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
const CONTACT_FORM_SHEET_ID = 'REPLACE_WITH_YOUR_CONTACT_SHEET_ID';
const SELL_LAND_FORM_SHEET_ID = 'REPLACE_WITH_YOUR_SELL_LAND_SHEET_ID';

// ============================================================================
// MAIN FUNCTION - Handles incoming form submissions
// ============================================================================

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType; // 'contact' or 'sellLand'

    // Remove formType from data (we don't need it in the sheet)
    delete data.formType;

    // Choose the correct sheet based on form type
    let sheetId;
    if (formType === 'contact') {
      sheetId = CONTACT_FORM_SHEET_ID;
    } else if (formType === 'sellLand') {
      sheetId = SELL_LAND_FORM_SHEET_ID;
    } else {
      throw new Error('Invalid form type');
    }

    // Open the sheet
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    const sheet = spreadsheet.getActiveSheet();

    // Initialize headers if this is the first submission
    initializeHeaders(sheet, formType);

    // Prepare row data
    const timestamp = new Date();
    const rowData = prepareRowData(data, formType, timestamp);

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Initialize sheet headers if they don't exist
 */
function initializeHeaders(sheet, formType) {
  // Check if headers already exist
  if (sheet.getLastRow() > 0) {
    return; // Headers already exist
  }

  let headers;
  if (formType === 'contact') {
    headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Message', 'Listing Title'];
  } else if (formType === 'sellLand') {
    headers = ['Timestamp', 'Name', 'Email', 'Phone', 'State', 'County', 'Acreage', 'Asking Price', 'Timeline', 'Message'];
  }

  // Set headers
  sheet.appendRow(headers);

  // Format headers (bold, background color)
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4a5568');
  headerRange.setFontColor('#ffffff');

  // Freeze header row
  sheet.setFrozenRows(1);

  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
}

/**
 * Prepare row data based on form type
 */
function prepareRowData(data, formType, timestamp) {
  if (formType === 'contact') {
    return [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.listingTitle || ''
    ];
  } else if (formType === 'sellLand') {
    return [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.state || '',
      data.county || '',
      data.acreage || '',
      data.askingPrice || '',
      data.timeline || '',
      data.message || ''
    ];
  }
}

/**
 * Test function to verify setup (can be deleted after testing)
 */
function testContactForm() {
  const testData = {
    formType: 'contact',
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-1234',
    message: 'This is a test message',
    listingTitle: '50 Acres - Test Property'
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}

/**
 * Test function for Sell Land form (can be deleted after testing)
 */
function testSellLandForm() {
  const testData = {
    formType: 'sellLand',
    name: 'Test Seller',
    email: 'seller@example.com',
    phone: '555-5678',
    state: 'OH',
    county: 'Washington',
    acreage: 100,
    askingPrice: 500000,
    timeline: 'Within 6 months',
    message: 'Beautiful property with creek'
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}

// ============================================================================
// DEPLOYMENT INSTRUCTIONS
// ============================================================================
/**
 * HOW TO DEPLOY THIS SCRIPT AS A WEB APP:
 *
 * 1. In Google Apps Script, click "Deploy" > "New deployment"
 * 2. Click the gear icon next to "Select type" and choose "Web app"
 * 3. Fill in:
 *    - Description: "M&M Land Company Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 4. Click "Deploy"
 * 5. Authorize the script (you'll need to allow it to access your Google Sheets)
 * 6. Copy the Web App URL - it will look like:
 *    https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 * 7. Save this URL - you'll need it for your website forms!
 *
 * IMPORTANT SECURITY NOTE:
 * - This script is set to "Anyone" access because your website is public
 * - Only form data is saved - no sensitive information should be in the forms
 * - Consider adding email notifications for new submissions
 */

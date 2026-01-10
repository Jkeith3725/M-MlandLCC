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
 * 3. Deploy this script as a Web App (Instructions in FORM_SETUP_GUIDE.md)
 * 4. Copy the Web App URL and add it to your website .env.local
 */

// ============================================================================
// CONFIGURATION - REPLACE THESE WITH YOUR SHEET IDS
// ============================================================================

// Get Sheet ID from the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
const CONTACT_FORM_SHEET_ID = 'PASTE_YOUR_CONTACT_FORM_SHEET_ID_HERE';
const SELL_LAND_FORM_SHEET_ID = 'PASTE_YOUR_SELL_LAND_FORM_SHEET_ID_HERE';

// ============================================================================
// MAIN HANDLER FUNCTION
// ============================================================================

/**
 * Handles POST requests from the website forms
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;

    // Route to appropriate handler based on form type
    if (formType === 'contact') {
      return handleContactForm(data);
    } else if (formType === 'sellLand') {
      return handleSellLandForm(data);
    } else {
      return createResponse(false, 'Unknown form type');
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'OK',
      message: 'M&M Land Company Form Handler is running',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// CONTACT FORM HANDLER
// ============================================================================

/**
 * Handles Contact Form submissions
 */
function handleContactForm(data) {
  try {
    if (!CONTACT_FORM_SHEET_ID || CONTACT_FORM_SHEET_ID === 'PASTE_YOUR_CONTACT_FORM_SHEET_ID_HERE') {
      return createResponse(false, 'Contact form sheet ID not configured');
    }

    const sheet = SpreadsheetApp.openById(CONTACT_FORM_SHEET_ID).getActiveSheet();

    // Create headers if this is the first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Message',
        'Listing Title'
      ]);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4a5568');
      headerRange.setFontColor('#ffffff');
    }

    // Append the form data
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.listingTitle || ''
    ]);

    return createResponse(true, 'Contact form submitted successfully');
  } catch (error) {
    Logger.log('Error in handleContactForm: ' + error.toString());
    return createResponse(false, 'Failed to save contact form: ' + error.toString());
  }
}

// ============================================================================
// SELL LAND FORM HANDLER
// ============================================================================

/**
 * Handles Sell Your Land Form submissions
 */
function handleSellLandForm(data) {
  try {
    if (!SELL_LAND_FORM_SHEET_ID || SELL_LAND_FORM_SHEET_ID === 'PASTE_YOUR_SELL_LAND_FORM_SHEET_ID_HERE') {
      return createResponse(false, 'Sell land form sheet ID not configured');
    }

    const sheet = SpreadsheetApp.openById(SELL_LAND_FORM_SHEET_ID).getActiveSheet();

    // Create headers if this is the first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'State',
        'County',
        'Acreage',
        'Asking Price',
        'Timeline',
        'Property Description'
      ]);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4a5568');
      headerRange.setFontColor('#ffffff');
    }

    // Append the form data
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.state || '',
      data.county || '',
      data.acreage || '',
      data.askingPrice || '',
      data.timeline || '',
      data.message || ''
    ]);

    return createResponse(true, 'Sell land form submitted successfully');
  } catch (error) {
    Logger.log('Error in handleSellLandForm: ' + error.toString());
    return createResponse(false, 'Failed to save sell land form: ' + error.toString());
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a standardized JSON response
 */
function createResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };

  if (!success) {
    response.error = message;
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

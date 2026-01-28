/**
 * M&M Land Company - Form Submission Handler
 *
 * This Google Apps Script receives form submissions from your website
 * and saves them to a Google Sheet. You'll receive email notifications
 * for new submissions.
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New project"
 * 3. Delete any existing code and paste this entire file
 * 4. Click the floppy disk icon to save (name it "M&M Land Forms")
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon and select "Web app"
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web App URL - this is your form submission URL!
 *
 * The script will automatically:
 * - Create a Google Sheet called "M&M Land Company - Form Submissions"
 * - Create separate tabs for "Sell Land" and "Contact" submissions
 * - Send you an email notification for each submission
 */

// ============================================================================
// CONFIGURATION - Update this email to receive notifications
// ============================================================================

const NOTIFICATION_EMAIL = 'your-email@example.com'; // <-- CHANGE THIS TO YOUR EMAIL

// ============================================================================
// MAIN HANDLER - Receives POST requests from your website
// ============================================================================

function doPost(e) {
  try {
    // Parse the incoming data
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No data received');
    }

    // Get or create the spreadsheet
    const spreadsheet = getOrCreateSpreadsheet();

    // Determine which sheet to use based on form type
    const sheetName = data.formType === 'sellLand' ? 'Sell Land Submissions' : 'Contact Submissions';
    const sheet = getOrCreateSheet(spreadsheet, sheetName, data.formType);

    // Add the submission to the sheet
    addSubmissionToSheet(sheet, data);

    // Send email notification
    sendNotificationEmail(data);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error processing form submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'M&M Land Company Form Handler is running. Use POST to submit forms.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// SPREADSHEET FUNCTIONS
// ============================================================================

function getOrCreateSpreadsheet() {
  const spreadsheetName = 'M&M Land Company - Form Submissions';

  // Search for existing spreadsheet
  const files = DriveApp.getFilesByName(spreadsheetName);

  if (files.hasNext()) {
    const file = files.next();
    return SpreadsheetApp.open(file);
  }

  // Create new spreadsheet if it doesn't exist
  const spreadsheet = SpreadsheetApp.create(spreadsheetName);

  // Remove default "Sheet1"
  const defaultSheet = spreadsheet.getSheetByName('Sheet1');
  if (defaultSheet) {
    spreadsheet.deleteSheet(defaultSheet);
  }

  return spreadsheet;
}

function getOrCreateSheet(spreadsheet, sheetName, formType) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);

    // Add headers based on form type
    let headers;
    if (formType === 'sellLand') {
      headers = [
        'Submitted At',
        'Name',
        'Email',
        'Phone',
        'State',
        'County',
        'Acreage',
        'Asking Price',
        'Timeline',
        'Property Description',
        'Status'
      ];
    } else {
      headers = [
        'Submitted At',
        'Name',
        'Email',
        'Phone',
        'Message',
        'Listing Title',
        'Status'
      ];
    }

    // Set headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4a5568');
    headerRange.setFontColor('#ffffff');

    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // Freeze header row
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function addSubmissionToSheet(sheet, data) {
  let row;

  if (data.formType === 'sellLand') {
    row = [
      formatDate(data.submittedAt),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.state || '',
      data.county || '',
      data.acreage || '',
      data.askingPrice ? '$' + Number(data.askingPrice).toLocaleString() : '',
      data.timeline || '',
      data.message || '',
      'New'
    ];
  } else {
    row = [
      formatDate(data.submittedAt),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.listingTitle || '',
      'New'
    ];
  }

  // Append row to sheet
  sheet.appendRow(row);

  // Highlight new submission
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, row.length).setBackground('#fffef0');
}

// ============================================================================
// EMAIL NOTIFICATION
// ============================================================================

function sendNotificationEmail(data) {
  if (NOTIFICATION_EMAIL === 'your-email@example.com') {
    console.log('Notification email not configured. Skipping email.');
    return;
  }

  let subject, body;

  if (data.formType === 'sellLand') {
    subject = 'New Property Submission - M&M Land Company';
    body = `
New Property Submission Received!

Contact Information:
- Name: ${data.name || 'Not provided'}
- Email: ${data.email || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}

Property Details:
- State: ${data.state || 'Not provided'}
- County: ${data.county || 'Not provided'}
- Acreage: ${data.acreage || 'Not provided'}
- Asking Price: ${data.askingPrice ? '$' + Number(data.askingPrice).toLocaleString() : 'Not provided'}
- Timeline: ${data.timeline || 'Not provided'}

Property Description:
${data.message || 'No description provided'}

Submitted: ${formatDate(data.submittedAt)}

---
View all submissions in your Google Sheet:
https://docs.google.com/spreadsheets
    `.trim();
  } else {
    subject = 'New Contact Form Submission - M&M Land Company';
    body = `
New Contact Form Submission!

Contact Information:
- Name: ${data.name || 'Not provided'}
- Email: ${data.email || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}
${data.listingTitle ? `- Regarding Listing: ${data.listingTitle}` : ''}

Message:
${data.message || 'No message provided'}

Submitted: ${formatDate(data.submittedAt)}

---
View all submissions in your Google Sheet:
https://docs.google.com/spreadsheets
    `.trim();
  }

  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatDate(isoString) {
  if (!isoString) return new Date().toLocaleString();

  try {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
}

// ============================================================================
// TEST FUNCTION - Run this to test the setup
// ============================================================================

function testFormSubmission() {
  const testData = {
    formType: 'sellLand',
    name: 'Test User',
    email: 'test@example.com',
    phone: '(555) 123-4567',
    state: 'OH',
    county: 'Athens',
    acreage: 50,
    askingPrice: 75000,
    timeline: 'Within 3 months',
    message: 'This is a test submission. Beautiful wooded property with creek access.',
    submittedAt: new Date().toISOString()
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

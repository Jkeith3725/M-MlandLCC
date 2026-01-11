// ============================================================================
// AUTO-APPLY DATA VALIDATION TO NEW ROWS
// This script automatically copies validation rules when you add new rows
// ============================================================================

function onEdit(e) {
  // Guard against manual execution (e will be undefined if run from editor)
  if (!e || !e.source || !e.range) return;

  const sheet = e.source.getActiveSheet();
  const row = e.range.getRow();

  // Only run for rows 2 and beyond (row 1 is header)
  if (row < 2) return;

  // Check if this row needs validation (if it's empty or newly added)
  const validationRange = sheet.getRange(row, 1, 1, sheet.getLastColumn());

  // Apply all validation rules to this row
  applyValidationToRow(sheet, row);
}

function applyValidationToRow(sheet, row) {
  // Column D: State (OH or WV dropdown)
  const stateRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['OH', 'WV'], true)
    .setAllowInvalid(false)
    .setHelpText('State must be OH or WV')
    .build();
  sheet.getRange(row, 4).setDataValidation(stateRule);

  // Column F: Acreage (positive number)
  const acreageRule = SpreadsheetApp.newDataValidation()
    .requireNumberGreaterThan(0)
    .setAllowInvalid(false)
    .setHelpText('Acreage must be a positive number')
    .build();
  sheet.getRange(row, 6).setDataValidation(acreageRule);

  // Column G: Price (positive number)
  const priceRule = SpreadsheetApp.newDataValidation()
    .requireNumberGreaterThan(0)
    .setAllowInvalid(false)
    .setHelpText('Price must be a number with no $ or commas (example: 225000)')
    .build();
  sheet.getRange(row, 7).setDataValidation(priceRule);

  // Column H: Is New Listing (TRUE or FALSE dropdown)
  const newListingRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['TRUE', 'FALSE'], true)
    .setAllowInvalid(false)
    .setHelpText('Must be TRUE or FALSE')
    .build();
  sheet.getRange(row, 8).setDataValidation(newListingRule);

  // Column S: Created Date (valid date)
  const dateRule = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(false)
    .setHelpText('Date must be in format YYYY-MM-DD (example: 2024-01-15)')
    .build();
  sheet.getRange(row, 19).setDataValidation(dateRule);
}

// ============================================================================
// SETUP FUNCTION - Run this ONCE to apply validation to ALL existing rows
// ============================================================================

function setupAllValidation() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = Math.max(sheet.getLastRow(), 100); // At least 100 rows

  // Apply validation to all rows from 2 to lastRow
  for (let row = 2; row <= lastRow; row++) {
    applyValidationToRow(sheet, row);
  }

  SpreadsheetApp.getUi().alert('✅ Validation applied to all rows!');
}

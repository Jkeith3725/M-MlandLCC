/**
 * Form submission utility for sending form data to Google Apps Script
 */

// ============================================================================
// CONFIGURATION - REPLACE WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
// ============================================================================

// After deploying your Google Apps Script, paste the Web App URL here
// It should look like: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL || '';

// ============================================================================
// FORM SUBMISSION FUNCTION
// ============================================================================

export interface FormSubmissionResult {
  success: boolean;
  error?: string;
}

/**
 * Submit form data to Google Apps Script
 * @param formType - 'contact' or 'sellLand'
 * @param data - Form data object
 * @returns Promise with submission result
 */
export async function submitFormToGoogleSheets(
  formType: 'contact' | 'sellLand',
  data: Record<string, any>
): Promise<FormSubmissionResult> {
  // Check if the URL is configured
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.warn('Google Apps Script URL not configured. Form submission will be simulated.');
    // Simulate successful submission for development
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }

  try {
    // Add form type to the data
    const payload = {
      ...data,
      formType,
    };

    // Submit to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Note: With 'no-cors' mode, we can't read the response
    // We assume success if no error is thrown
    return { success: true };

  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Helper function for contact form submissions
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  listingTitle?: string;
}): Promise<FormSubmissionResult> {
  return submitFormToGoogleSheets('contact', data);
}

/**
 * Helper function for sell land form submissions
 */
export async function submitSellLandForm(data: {
  name: string;
  email: string;
  phone: string;
  state?: string;
  county?: string;
  acreage?: number;
  askingPrice?: number;
  timeline?: string;
  message?: string;
}): Promise<FormSubmissionResult> {
  return submitFormToGoogleSheets('sellLand', data);
}

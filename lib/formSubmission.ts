/**
 * Form submission utility for sending form data to Google Apps Script
 *
 * Setup Instructions:
 * 1. Go to https://script.google.com and create a new project
 * 2. Copy the code from /scripts/google-apps-script.js into the editor
 * 3. Deploy as Web App (Execute as: Me, Who has access: Anyone)
 * 4. Copy the Web App URL and paste it below or set as NEXT_PUBLIC_FORM_SUBMISSION_URL
 */

// ============================================================================
// CONFIGURATION - YOUR GOOGLE APPS SCRIPT WEB APP URL
// ============================================================================

// Replace this URL with your deployed Google Apps Script Web App URL
// Get your URL by following the setup instructions in /scripts/FORM_SETUP.md
const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL ||
  ''; // Add your URL here after deploying the Google Apps Script

// ============================================================================
// FORM SUBMISSION FUNCTION
// ============================================================================

export interface FormSubmissionResult {
  success: boolean;
  error?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  listingTitle?: string;
}

export interface SellLandFormData {
  name: string;
  email: string;
  phone: string;
  state?: string;
  county?: string;
  acreage?: number;
  askingPrice?: number;
  timeline?: string;
  message?: string;
}

/**
 * Submits contact form data to Google Sheets via Google Apps Script
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<FormSubmissionResult> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.error('Form submission URL is not configured');
    return {
      success: false,
      error: 'Form submission is not configured. Please contact us directly.',
    };
  }

  try {
    const payload = {
      formType: 'contact',
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Use text/plain to avoid CORS preflight with Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });

    // Google Apps Script returns a redirect, so we check for ok or opaque response
    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse response, but Google Apps Script may not return JSON in all cases
    try {
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          error: result.error || 'Failed to submit form',
        };
      }
    } catch {
      // If we can't parse JSON but request succeeded, assume success
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'Failed to submit. Please try again or contact us directly.',
    };
  }
}

/**
 * Submits sell land form data to Google Sheets via Google Apps Script
 */
export async function submitSellLandForm(
  formData: SellLandFormData
): Promise<FormSubmissionResult> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.error('Form submission URL is not configured');
    return {
      success: false,
      error: 'Form submission is not configured. Please contact us directly.',
    };
  }

  try {
    const payload = {
      formType: 'sellLand',
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Use text/plain to avoid CORS preflight with Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });

    // Google Apps Script returns a redirect, so we check for ok or opaque response
    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse response, but Google Apps Script may not return JSON in all cases
    try {
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          error: result.error || 'Failed to submit form',
        };
      }
    } catch {
      // If we can't parse JSON but request succeeded, assume success
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting sell land form:', error);
    return {
      success: false,
      error: 'Failed to submit. Please try again or contact us directly.',
    };
  }
}

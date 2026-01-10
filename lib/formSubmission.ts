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
    console.error('NEXT_PUBLIC_FORM_SUBMISSION_URL is not configured');
    return {
      success: false,
      error: 'Form submission is not configured. Please check your environment variables.',
    };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: 'contact',
        ...formData,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to submit form',
      };
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
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
    console.error('NEXT_PUBLIC_FORM_SUBMISSION_URL is not configured');
    return {
      success: false,
      error: 'Form submission is not configured. Please check your environment variables.',
    };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: 'sellLand',
        ...formData,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to submit form',
      };
    }
  } catch (error) {
    console.error('Error submitting sell land form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

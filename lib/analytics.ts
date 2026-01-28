/**
 * Analytics Utility Functions
 * 
 * Helper functions for tracking events with Meta Pixel (Facebook Pixel)
 * 
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */

/**
 * Track a standard Meta Pixel event
 * 
 * @param event - The name of the standard event (e.g., 'Lead', 'ViewContent', 'Contact')
 * @param parameters - Optional event parameters
 * @param advancedMatching - Optional advanced matching data (email, phone, etc.)
 * 
 * @example
 * ```typescript
 * trackEvent('Lead', {
 *   content_name: 'Contact Form Submission',
 *   content_category: 'Lead Generation',
 * });
 * ```
 */
export function trackEvent(
  event: string,
  parameters?: Record<string, unknown>,
  advancedMatching?: {
    em?: string; // Email
    ph?: string; // Phone
    fn?: string; // First name
    ln?: string; // Last name
  }
) {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      if (advancedMatching) {
        window.fbq('track', event, parameters, advancedMatching);
      } else {
        window.fbq('track', event, parameters);
      }
    } catch (error) {
      console.error('Error tracking Meta Pixel event:', error);
    }
  }
}

/**
 * Track a custom Meta Pixel event
 * 
 * @param event - The name of your custom event
 * @param parameters - Optional event parameters
 * 
 * @example
 * ```typescript
 * trackCustomEvent('PropertyInquiry', {
 *   property_id: '123',
 *   property_price: 50000,
 *   property_acreage: 10,
 * });
 * ```
 */
export function trackCustomEvent(
  event: string,
  parameters?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('trackCustom', event, parameters);
    } catch (error) {
      console.error('Error tracking custom Meta Pixel event:', error);
    }
  }
}

/**
 * Track a Lead event (form submission, inquiry, etc.)
 * 
 * @param contentName - Name of the content that generated the lead
 * @param advancedMatching - Optional advanced matching data
 * 
 * @example
 * ```typescript
 * trackLead('Contact Form Submission', {
 *   em: 'user@example.com',
 *   ph: '1234567890',
 * });
 * ```
 */
export function trackLead(
  contentName: string,
  advancedMatching?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  }
) {
  trackEvent(
    'Lead',
    {
      content_name: contentName,
      content_category: 'Lead Generation',
    },
    advancedMatching
  );
}

/**
 * Track a ViewContent event (property listing view, etc.)
 * 
 * @param contentName - Name of the content being viewed
 * @param contentId - ID of the content
 * @param value - Optional value (e.g., property price)
 * @param additionalData - Optional additional property data (acreage, county, state, etc.)
 * @param currency - Currency code (default: 'USD')
 * 
 * @example
 * ```typescript
 * trackViewContent('10 Acres in Athens County', 'listing-123', 50000, {
 *   acreage: 10,
 *   county: 'Athens',
 *   state: 'OH'
 * });
 * ```
 */
export function trackViewContent(
  contentName: string,
  contentId: string,
  value?: number,
  additionalData?: Record<string, unknown>,
  currency: string = 'USD'
) {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_ids: [contentId],
    content_type: 'product',
    value: value,
    currency: currency,
    ...additionalData,
  });
}

/**
 * Track a Contact event (phone call, email click, etc.)
 * 
 * @param contactMethod - Method of contact (e.g., 'Phone Call', 'Email')
 * 
 * @example
 * ```typescript
 * trackContact('Phone Call');
 * ```
 */
export function trackContact(contactMethod: string) {
  trackEvent('Contact', {
    content_name: contactMethod,
  });
}

/**
 * Track a Search event
 * 
 * @param searchString - The search query
 * 
 * @example
 * ```typescript
 * trackSearch('hunting land ohio');
 * ```
 */
export function trackSearch(searchString: string) {
  trackEvent('Search', {
    search_string: searchString,
  });
}

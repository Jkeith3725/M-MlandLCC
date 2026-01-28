/**
 * Global type declarations for Meta Pixel (Facebook Pixel)
 * 
 * This file provides TypeScript type safety for the Meta Pixel API
 * that is loaded via the external script in the FacebookPixel component.
 */

interface FacebookPixel {
  /**
   * Initialize the Meta Pixel with your Pixel ID
   * @param command - The command to execute ('init')
   * @param pixelId - Your Meta Pixel ID
   */
  (command: 'init', pixelId: string): void;

  /**
   * Track a standard event
   * @param command - The command to execute ('track')
   * @param event - The name of the standard event (e.g., 'PageView', 'Lead', 'ViewContent')
   * @param parameters - Optional event parameters
   * @param options - Optional advanced matching parameters
   */
  (
    command: 'track',
    event: string,
    parameters?: Record<string, unknown>,
    options?: {
      em?: string; // Email (will be hashed)
      ph?: string; // Phone (will be hashed)
      fn?: string; // First name (will be hashed)
      ln?: string; // Last name (will be hashed)
      ct?: string; // City (will be hashed)
      st?: string; // State (will be hashed)
      zp?: string; // ZIP code (will be hashed)
      country?: string; // Country (will be hashed)
    }
  ): void;

  /**
   * Track a custom event
   * @param command - The command to execute ('trackCustom')
   * @param event - The name of your custom event
   * @param parameters - Optional event parameters
   */
  (command: 'trackCustom', event: string, parameters?: Record<string, unknown>): void;

  /**
   * Queue for events before pixel is fully loaded
   */
  push: (...args: unknown[]) => void;

  /**
   * Whether the pixel has been loaded
   */
  loaded?: boolean;

  /**
   * Pixel version
   */
  version?: string;

  /**
   * Event queue
   */
  queue?: unknown[];
}

declare global {
  interface Window {
    /**
     * Meta Pixel function
     */
    fbq?: FacebookPixel;

    /**
     * Internal Meta Pixel reference
     */
    _fbq?: FacebookPixel;
  }
}

export {};

/**
 * Exponential Backoff Retry Logic
 * Implements retry logic with exponential backoff for failed API calls
 */

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  maxJitter?: number;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 5,
  baseDelay: 1000, // 1 second
  maxDelay: 64000, // 64 seconds
  maxJitter: 1000, // up to 1 second random jitter
};

/**
 * Calculates delay for exponential backoff
 * @param attempt - Current retry attempt (0-indexed)
 * @param options - Retry options
 * @returns Delay in milliseconds
 */
function calculateDelay(attempt: number, options: Required<RetryOptions>): number {
  // Exponential backoff: baseDelay * 2^attempt
  const exponentialDelay = options.baseDelay * Math.pow(2, attempt);

  // Cap at maxDelay
  const cappedDelay = Math.min(exponentialDelay, options.maxDelay);

  // Add random jitter to prevent thundering herd
  const jitter = Math.random() * options.maxJitter;

  return cappedDelay + jitter;
}

/**
 * Determines if an error is retryable
 * @param error - Error object or HTTP response
 * @returns True if error should be retried
 */
function isRetryableError(error: any): boolean {
  // HTTP 429 (Rate Limit) - always retry
  if (error?.status === 429 || error?.statusCode === 429) {
    return true;
  }

  // HTTP 5xx (Server Errors) - retry
  if (error?.status >= 500 && error?.status < 600) {
    return true;
  }

  if (error?.statusCode >= 500 && error?.statusCode < 600) {
    return true;
  }

  // Network errors - retry
  if (
    error?.code === 'ECONNRESET' ||
    error?.code === 'ETIMEDOUT' ||
    error?.code === 'ENOTFOUND' ||
    error?.code === 'ECONNREFUSED' ||
    error?.message?.includes('fetch failed') ||
    error?.message?.includes('network') ||
    error?.message?.includes('timeout')
  ) {
    return true;
  }

  return false;
}

/**
 * Fetches data with exponential backoff retry logic
 * @param fetchFn - Async function that performs the fetch operation
 * @param options - Retry options
 * @returns Promise resolving to the fetched data
 */
export async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: any;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      // Attempt the fetch
      const result = await fetchFn();

      // Success!
      if (attempt > 0) {
        console.log(`✅ Fetch succeeded after ${attempt} ${attempt === 1 ? 'retry' : 'retries'}`);
      }

      return result;
    } catch (error: any) {
      lastError = error;

      // If this is the last attempt or error is not retryable, throw
      if (attempt === opts.maxRetries || !isRetryableError(error)) {
        console.error(`❌ Fetch failed after ${attempt} ${attempt === 1 ? 'attempt' : 'attempts'}:`, error?.message || error);
        throw error;
      }

      // Calculate delay for next retry
      const delay = calculateDelay(attempt, opts);

      // Log retry attempt
      console.warn(
        `⚠️  Retry attempt ${attempt + 1}/${opts.maxRetries} after ${Math.round(delay)}ms delay` +
        ` (Error: ${error?.status || error?.statusCode || error?.code || 'Unknown'}` +
        ` - ${error?.message || 'No message'})`
      );

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
}

/**
 * Retry-enabled fetch wrapper for standard HTTP requests
 * @param url - URL to fetch
 * @param init - Fetch options
 * @param retryOptions - Retry options
 * @returns Promise resolving to Response object
 */
export async function fetchWithRetryHttp(
  url: string,
  init?: RequestInit,
  retryOptions?: RetryOptions
): Promise<Response> {
  return fetchWithRetry(async () => {
    const response = await fetch(url, init);

    if (!response.ok) {
      // Create error with status for retry logic
      const error: any = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      error.statusCode = response.status;
      throw error;
    }

    return response;
  }, retryOptions);
}

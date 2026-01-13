/**
 * Zod Validation Schemas
 * Validates all data from Google Sheets before use
 */

import { z } from 'zod';

/**
 * Schema for a single property listing
 */
export const ListingSchema = z.object({
  id: z.string().min(1, 'Listing ID is required'),
  title: z.string().min(1, 'Title is required'),
  county: z.string().min(1, 'County is required'),
  state: z.enum(['OH', 'WV'], {
    errorMap: () => ({ message: 'State must be either OH or WV' }),
  }),
  nearestTown: z.string().optional(),
  acreage: z.number().positive('Acreage must be positive').finite(),
  price: z.number().positive('Price must be positive').finite(),
  isNew: z.boolean().default(false),
  photos: z.array(z.string().url('Photo URL must be valid')).min(0),
  shortDescription: z.string().optional().default(''),
  overview: z.string().optional().default(''),
  roadFrontage: z.string().optional(),
  utilities: z.string().optional(),
  parcelId: z.string().optional(),
  youtubeUrl: z.string().url('YouTube URL must be valid').optional(),
  mapEmbedHtml: z.string().optional(),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  createdAt: z.union([z.date(), z.string()]).transform((val) => {
    return typeof val === 'string' ? new Date(val) : val;
  }),
});

/**
 * Schema for the full array of listings
 */
export const ListingsArraySchema = z.array(ListingSchema).min(1, 'At least one listing is required');

/**
 * Type inference from schema
 */
export type ValidatedListing = z.infer<typeof ListingSchema>;

/**
 * Validates a single listing
 * @param data - Raw listing data
 * @returns Validated listing or throws error
 */
export function validateListing(data: unknown): ValidatedListing {
  try {
    return ListingSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Listing validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw error;
  }
}

/**
 * Validates an array of listings
 * @param data - Raw listings array
 * @returns Validated listings array or throws error
 */
export function validateListings(data: unknown): ValidatedListing[] {
  try {
    return ListingsArraySchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Listings validation failed:');
      console.error(`  Total errors: ${error.errors.length}`);

      // Group errors by listing index
      const errorsByListing = new Map<number, z.ZodIssue[]>();

      error.errors.forEach((err) => {
        const listingIndex = typeof err.path[0] === 'number' ? err.path[0] : -1;
        if (!errorsByListing.has(listingIndex)) {
          errorsByListing.set(listingIndex, []);
        }
        errorsByListing.get(listingIndex)!.push(err);
      });

      // Log errors grouped by listing
      errorsByListing.forEach((errors, index) => {
        if (index >= 0) {
          console.error(`\n  Listing #${index}:`);
        } else {
          console.error(`\n  General errors:`);
        }

        errors.forEach((err) => {
          const path = err.path.slice(1).join('.');
          console.error(`    - ${path || 'root'}: ${err.message}`);
        });
      });
    }
    throw error;
  }
}

/**
 * Safely validates listings with detailed error reporting
 * Returns null instead of throwing on validation failure
 * @param data - Raw listings data
 * @returns Validated listings or null
 */
export function safeValidateListings(data: unknown): ValidatedListing[] | null {
  const result = ListingsArraySchema.safeParse(data);

  if (!result.success) {
    console.error('❌ Listings validation failed:');
    console.error(`  Total errors: ${result.error.errors.length}`);

    result.error.errors.forEach((err, index) => {
      console.error(`  ${index + 1}. ${err.path.join('.')}: ${err.message}`);
    });

    return null;
  }

  console.log(`✅ Validated ${result.data.length} listings successfully`);
  return result.data;
}

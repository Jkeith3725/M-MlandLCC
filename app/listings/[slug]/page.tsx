import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PhotoGallery } from '@/components/listings/PhotoGallery';
import { ListingCard } from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getListingBySlug, getSimilarListings } from '@/lib/api';
import { MOCK_LISTINGS } from '@/lib/mockData';
import { fetchListingsFromSheet } from '@/lib/googleSheets';
import { formatPrice, formatAcreage } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';

export async function generateStaticParams() {
  // Check if we should use Google Sheets or mock data
  const useGoogleSheets = process.env.NEXT_PUBLIC_USE_GOOGLE_SHEETS === 'true';

  try {
    // Fetch listings from the appropriate source
    const listings = useGoogleSheets
      ? await fetchListingsFromSheet()
      : MOCK_LISTINGS;

    return listings.map((listing) => ({
      slug: listing.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Fallback to mock data if Google Sheets fails
    return MOCK_LISTINGS.map((listing) => ({
      slug: listing.slug,
    }));
  }
}

export default async function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = await getListingBySlug(params.slug);

  if (!listing) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="max-w-8xl mx-auto px-6 lg:px-12 text-center py-20">
            <h1 className="text-4xl font-serif font-bold text-brown-dark mb-4">Listing Not Found</h1>
            <p className="text-gray-700 mb-8">The property you&apos;re looking for doesn&apos;t exist or has been sold.</p>
            <a href="/listings">
              <Button variant="primary">View All Listings</Button>
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const similarListings = await getSimilarListings(listing, 4);

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown-dark">
                    {listing.title}
                  </h1>
                  {listing.isNew && <Badge variant="new">New</Badge>}
                </div>

                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
                    </svg>
                    <span>{formatAcreage(listing.acreage)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{listing.county}, {listing.state}</span>
                  </div>
                </div>

                <p className="text-4xl font-bold text-green-forest">
                  {formatPrice(listing.price)}
                </p>
              </div>

              {/* Photo Gallery */}
              <PhotoGallery photos={listing.photos} title={listing.title} />

              {/* Overview */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-brown-dark mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.overview}
                </p>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-brown-dark mb-4">Property Details</h2>
                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                  <table className="w-full">
                    <tbody className="divide-y divide-cream-dark">
                      <tr>
                        <td className="px-6 py-4 font-medium text-brown-dark">Acreage</td>
                        <td className="px-6 py-4 text-gray-700">{formatAcreage(listing.acreage)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-brown-dark">County</td>
                        <td className="px-6 py-4 text-gray-700">{listing.county}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-brown-dark">State</td>
                        <td className="px-6 py-4 text-gray-700">{listing.state === 'OH' ? 'Ohio' : 'West Virginia'}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-brown-dark">Nearest Town</td>
                        <td className="px-6 py-4 text-gray-700">{listing.nearestTown}</td>
                      </tr>
                      {listing.roadFrontage && (
                        <tr>
                          <td className="px-6 py-4 font-medium text-brown-dark">Road Frontage</td>
                          <td className="px-6 py-4 text-gray-700">{listing.roadFrontage}</td>
                        </tr>
                      )}
                      {listing.utilities && (
                        <tr>
                          <td className="px-6 py-4 font-medium text-brown-dark">Utilities</td>
                          <td className="px-6 py-4 text-gray-700">{listing.utilities}</td>
                        </tr>
                      )}
                      {listing.parcelId && (
                        <tr>
                          <td className="px-6 py-4 font-medium text-brown-dark">Parcel ID</td>
                          <td className="px-6 py-4 text-gray-700">{listing.parcelId}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* YouTube Video */}
              {listing.youtubeUrl && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-brown-dark mb-4">Property Video</h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-cream-dark shadow-soft">
                    <iframe
                      src={listing.youtubeUrl}
                      title="Property Video"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Map */}
              {listing.mapEmbedHtml && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-brown-dark mb-4">Location</h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-cream-dark shadow-soft">
                    <div
                      dangerouslySetInnerHTML={{ __html: listing.mapEmbedHtml }}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Note: Map location is approximate and may not reflect exact property boundaries.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h3 className="font-serif text-xl font-bold text-brown-dark mb-4">
                    Interested in this property?
                  </h3>

                  <a href={`mailto:${COMPANY_INFO.email}?subject=Inquiry about ${listing.title}`}>
                    <Button
                      variant="primary"
                      className="w-full mb-4"
                    >
                      Request Information
                    </Button>
                  </a>

                  <div className="border-t border-cream-dark pt-4 space-y-3">
                    {COMPANY_INFO.phone && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-green-forest flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-green-forest transition-colors">
                          {COMPANY_INFO.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-green-forest flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-green-forest transition-colors">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Listings */}
          {similarListings.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-3xl font-bold text-brown-dark mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {similarListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

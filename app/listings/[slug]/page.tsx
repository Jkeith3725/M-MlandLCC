import Image from 'next/image';
import type { Metadata } from 'next';
import { PhotoGallery } from '@/components/listings/PhotoGallery';
import { ListingCard } from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PropertySchema } from '@/components/seo/PropertySchema';
import { getListingBySlug, getSimilarListings } from '@/lib/api';
import { getListingsFromData } from '@/lib/listings';
import { formatPrice, formatAcreage } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';

const SITE_URL = 'https://mmlandsales.com';

export async function generateStaticParams() {
  const listings = getListingsFromData();
  return listings.map((listing) => ({
    slug: listing.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);

  if (!listing) {
    return {
      title: 'Listing Not Found',
    };
  }

  const stateName = listing.state === 'OH' ? 'Ohio' : 'West Virginia';
  const title = `${listing.acreage} Acres for Sale in ${listing.county} County, ${stateName}`;
  const description = listing.shortDescription.length > 160
    ? listing.shortDescription.substring(0, 157) + '...'
    : listing.shortDescription;
  const url = `${SITE_URL}/listings/${listing.slug}`;
  const image = listing.photos.length > 0
    ? `${SITE_URL}${listing.photos[0]}`
    : `${SITE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
    keywords: [
      `${listing.acreage} acres for sale`,
      `land for sale ${listing.county} County`,
      `${stateName} land`,
      'hunting land',
      'recreational property',
      listing.nearestTown ? `land near ${listing.nearestTown}` : '',
      `${listing.county} County ${stateName} land`,
    ].filter(Boolean),
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = await getListingBySlug(params.slug);

  if (!listing) {
    return (
      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center py-20">
          <h1 className="text-4xl font-serif font-bold text-brown-dark mb-4">Listing Not Found</h1>
          <p className="text-brown-dark/60 mb-8">The property you&apos;re looking for doesn&apos;t exist or has been sold.</p>
          <a href="/listings">
            <Button variant="primary" className="bg-forest-500 hover:bg-forest-600 text-white rounded-none py-3 px-8 text-xs uppercase tracking-widest font-semibold">View All Listings</Button>
          </a>
        </div>
      </div>
    );
  }

  const similarListings = await getSimilarListings(listing, 4);

  return (
    <>
      <PropertySchema listing={listing} />

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-brown-dark leading-tight">
                    {listing.title}
                  </h1>
                  {listing.isNew && <Badge variant="new">New</Badge>}
                </div>

                <div className="flex items-center gap-6 text-brown-dark/50 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
                    </svg>
                    <span>{formatAcreage(listing.acreage)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{listing.county}, {listing.state}</span>
                  </div>
                </div>

                <p className="text-3xl font-serif font-bold text-forest-500">
                  {formatPrice(listing.price)}
                </p>
              </div>

              {/* YouTube Video - Show first if available */}
              {listing.youtubeUrl && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-brown-dark mb-4">Property Video</h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-cream-dark shadow-soft">
                    <iframe
                      src={listing.youtubeUrl}
                      title="Property Video"
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Overview */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-brown-dark mb-5">Overview</h2>
                <p className="text-brown-dark/70 leading-relaxed whitespace-pre-line">
                  {listing.overview}
                </p>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-brown-dark mb-5">Property Details</h2>
                <div className="bg-white border border-cream-dark overflow-hidden">
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

              {/* Photo Gallery */}
              <PhotoGallery photos={listing.photos} title={listing.title} />

              {/* Map */}
              {listing.mapEmbedHtml && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-brown-dark mb-4">Location</h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-cream-dark shadow-soft">
                    {listing.mapEmbedHtml.trim().startsWith('<') ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: listing.mapEmbedHtml }}
                        className="w-full h-full"
                      />
                    ) : (
                      <iframe
                        src={listing.mapEmbedHtml}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        title="Property Map"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Note: Map location is approximate and may not reflect exact property boundaries.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Contact Card */}
                <div className="bg-white border border-cream-dark p-7">
                  <h3 className="font-serif text-xl font-bold text-brown-dark mb-5">
                    Interested in this property?
                  </h3>

                  <a href={`mailto:${COMPANY_INFO.email}?subject=Inquiry about ${listing.title}`}>
                    <Button
                      variant="primary"
                      className="w-full mb-5 bg-forest-500 hover:bg-forest-600 text-white rounded-none py-3 text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      Request Information
                    </Button>
                  </a>

                  <div className="border-t border-cream-dark pt-5 space-y-3">
                    {COMPANY_INFO.phone && (
                      <div className="flex items-center gap-3 text-brown-dark/60 text-sm">
                        <svg className="w-4 h-4 text-tan-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-forest-500 transition-colors">
                          {COMPANY_INFO.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-brown-dark/60 text-sm">
                      <svg className="w-4 h-4 text-tan-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-forest-500 transition-colors">
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
            <div className="mt-24 pt-12 border-t border-cream-dark">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tan-accent mb-3">More Properties</p>
              <h2 className="font-serif text-3xl font-bold text-brown-dark mb-10">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

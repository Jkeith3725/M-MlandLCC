import { Listing } from '@/lib/types';
import { COMPANY_INFO } from '@/lib/constants';

interface PropertySchemaProps {
  listing: Listing;
}

export function PropertySchema({ listing }: PropertySchemaProps) {
  const stateName = listing.state === 'OH' ? 'Ohio' : 'West Virginia';
  const siteUrl = 'https://mmlandsales.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.shortDescription,
    url: `${siteUrl}/listings/${listing.slug}`,
    datePosted: listing.createdAt instanceof Date
      ? listing.createdAt.toISOString().split('T')[0]
      : listing.createdAt,
    image: listing.photos.length > 0
      ? `${siteUrl}${listing.photos[0]}`
      : undefined,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.nearestTown || listing.county,
      addressRegion: listing.state,
      addressCountry: 'US',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Acreage',
        value: listing.acreage,
        unitText: 'acres',
      },
      {
        '@type': 'PropertyValue',
        name: 'County',
        value: listing.county,
      },
      {
        '@type': 'PropertyValue',
        name: 'State',
        value: stateName,
      },
      ...(listing.roadFrontage ? [{
        '@type': 'PropertyValue',
        name: 'Road Frontage',
        value: listing.roadFrontage,
      }] : []),
      ...(listing.utilities ? [{
        '@type': 'PropertyValue',
        name: 'Utilities',
        value: listing.utilities,
      }] : []),
    ],
    seller: {
      '@type': 'RealEstateAgent',
      name: COMPANY_INFO.name,
      email: COMPANY_INFO.email,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import { COMPANY_INFO } from '@/lib/constants';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: COMPANY_INFO.name,
    description: COMPANY_INFO.description,
    url: 'https://mmlandsales.com',
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1110 County House Lane',
      addressLocality: 'Marietta',
      addressRegion: 'OH',
      postalCode: '45750',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'State', name: 'Ohio' },
      { '@type': 'State', name: 'West Virginia' },
    ],
    knowsAbout: [
      'Hunting land',
      'Recreational property',
      'Timber land',
      'Rural acreage',
      'Land sales',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

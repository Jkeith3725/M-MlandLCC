export const COMPANY_INFO = {
  name: 'M&M Land Company',
  phone: '', // Phone number to be added later
  email: 'mdhaessly@gmail.com',
  address: '1110 County House Lane, Marietta, OH 45750',
  tagline: 'Premium Land in Ohio & West Virginia',
  description: 'Connecting people with exceptional land opportunities across Ohio and West Virginia.',
};

export const STATES = [
  { value: 'OH', label: 'Ohio' },
  { value: 'WV', label: 'West Virginia' },
] as const;

export const OHIO_COUNTIES = [
  'Adams', 'Athens', 'Gallia', 'Hocking', 'Jackson',
  'Lawrence', 'Meigs', 'Pike', 'Ross', 'Scioto', 'Vinton', 'Washington'
];

export const WV_COUNTIES = [
  'Cabell', 'Jackson', 'Mason', 'Pleasants', 'Putnam',
  'Ritchie', 'Roane', 'Wayne', 'Wood', 'Wirt'
];

export const ALL_COUNTIES = [...OHIO_COUNTIES, ...WV_COUNTIES].sort();

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'acreage', label: 'Acreage: High to Low' },
] as const;

export const WHY_MM_POINTS = [
  {
    title: 'Local Expertise',
    description: 'Deep knowledge of Ohio and West Virginia land markets, backed by years of experience.',
  },
  {
    title: 'Transparent Process',
    description: 'Clear communication, honest pricing, and no hidden fees. What you see is what you get.',
  },
  {
    title: 'Fast Response',
    description: 'Questions answered quickly. Site visits arranged promptly. We respect your time.',
  },
];

export const BUYER_PROCESS_STEPS = [
  {
    number: 1,
    title: 'Browse Listings',
    description: 'Explore our curated selection of land opportunities across Ohio and West Virginia.',
  },
  {
    number: 2,
    title: 'Tour & Ask Questions',
    description: 'Schedule a site visit or reach out with questions. We\'re here to help you evaluate.',
  },
  {
    number: 3,
    title: 'Close with Confidence',
    description: 'We guide you through every step of the closing process with clarity and care.',
  },
];

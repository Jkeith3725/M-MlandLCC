import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { FooterWrapper } from '@/components/layout/FooterWrapper';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';

const SITE_URL = 'https://mmlandsales.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'M&M Land Company - Land for Sale in Ohio & West Virginia',
    template: '%s | M&M Land Company',
  },
  description: 'Your trusted partner in buying and selling quality hunting, timber, and recreational land across Ohio and West Virginia. Expert service, fair prices, and local knowledge.',
  keywords: ['land for sale', 'Ohio land', 'West Virginia land', 'hunting land', 'recreational property', 'timber land', 'M&M Land Company', 'rural property', 'acreage for sale', 'hunting property Ohio', 'land for sale West Virginia'],
  authors: [{ name: 'M&M Land Company' }],
  creator: 'M&M Land Company',
  publisher: 'M&M Land Company',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'M&M Land Company',
    title: 'M&M Land Company - Land for Sale in Ohio & West Virginia',
    description: 'Your trusted partner in buying and selling quality hunting, timber, and recreational land across Ohio and West Virginia.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'M&M Land Company - Premium Land in Ohio & West Virginia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M&M Land Company - Land for Sale in Ohio & West Virginia',
    description: 'Your trusted partner in buying and selling quality hunting, timber, and recreational land across Ohio and West Virginia.',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <OrganizationSchema />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}

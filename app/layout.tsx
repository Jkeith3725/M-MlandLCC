import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { FooterWrapper } from '@/components/layout/FooterWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'M&M Land Company - Land for Sale in Ohio & West Virginia',
  description: 'Your trusted partner in buying and selling quality land across Ohio and West Virginia. Expert service, fair prices, and local knowledge.',
  keywords: 'land for sale, Ohio land, West Virginia land, hunting land, recreational property, M&M Land Company',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}

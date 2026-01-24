import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';

interface FooterProps {
  onContactClick?: () => void;
  onSellClick?: () => void;
}

export function Footer({ onContactClick, onSellClick }: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-dark text-cream/80">
      <div className="container max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-5">
              <svg className="w-6 h-6 text-tan-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg font-serif font-semibold text-cream">M&M Land Company</span>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed">
              Your trusted partner in Ohio & West Virginia land since 1998.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-tan-accent mb-5">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-cream/55 hover:text-tan-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-cream/55 hover:text-tan-accent transition-colors text-sm">
                  Listings
                </Link>
              </li>
              <li>
                <button onClick={onSellClick} className="text-cream/55 hover:text-tan-accent transition-colors text-sm">
                  Sell Your Land
                </button>
              </li>
              <li>
                <button onClick={onContactClick} className="text-cream/55 hover:text-tan-accent transition-colors text-sm">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-tan-accent mb-5">Services</h3>
            <ul className="space-y-3 text-cream/55 text-sm">
              <li>Land Sales</li>
              <li>Land Acquisition</li>
              <li>Property Valuation</li>
              <li>Land Management</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-tan-accent mb-5">Contact</h3>
            <ul className="space-y-3 text-cream/55 text-sm">
              {COMPANY_INFO.phone && (
                <li>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-tan-accent transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-tan-accent transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="text-cream/35">
                {COMPANY_INFO.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center">
          <p className="text-cream/25 text-xs tracking-wide">&copy; {currentYear} M&M Land Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

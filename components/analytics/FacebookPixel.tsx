/**
 * Facebook Pixel Component
 * 
 * This component loads the Meta Pixel (Facebook Pixel) and automatically tracks
 * page views on route changes in Next.js App Router.
 * 
 * Features:
 * - Loads pixel script with optimal performance (afterInteractive strategy)
 * - Automatically tracks PageView events on client-side navigation
 * - Supports noscript fallback for users with JavaScript disabled
 * - Uses environment variable for Pixel ID
 * 
 * Setup:
 * 1. Add NEXT_PUBLIC_FACEBOOK_PIXEL_ID to your .env.local file
 * 2. Import this component in your app/layout.tsx
 * 3. Place it inside the <body> tag
 * 
 * @see https://developers.facebook.com/docs/meta-pixel/
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  // Only load pixel in production or if explicitly enabled
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  
  if (!pixelId) {
    console.warn('Meta Pixel ID not found. Add NEXT_PUBLIC_FACEBOOK_PIXEL_ID to your environment variables.');
    return null;
  }

  return (
    <>
      {/* Meta Pixel Script */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Noscript fallback for users with JavaScript disabled */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

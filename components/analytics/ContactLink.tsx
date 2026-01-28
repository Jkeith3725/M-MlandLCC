/**
 * Contact Link Component
 * 
 * A wrapper component that tracks Contact events when users click on
 * phone numbers or email addresses.
 * 
 * Usage:
 * ```tsx
 * import { ContactLink } from '@/components/analytics/ContactLink';
 * 
 * // For phone links
 * <ContactLink type="phone" href="tel:+15551234567">
 *   (555) 123-4567
 * </ContactLink>
 * 
 * // For email links
 * <ContactLink type="email" href="mailto:info@example.com">
 *   info@example.com
 * </ContactLink>
 * ```
 */

'use client';

import { ReactNode, MouseEvent } from 'react';
import { trackContact } from '@/lib/analytics';

interface ContactLinkProps {
  type: 'phone' | 'email';
  href: string;
  children: ReactNode;
  className?: string;
}

export function ContactLink({ type, href, children, className }: ContactLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Track the contact event
    const contactMethod = type === 'phone' ? 'Phone Call Click' : 'Email Click';
    trackContact(contactMethod);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

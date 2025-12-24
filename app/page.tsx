import { getFeaturedListings } from '@/lib/api';
import { Hero } from '@/components/home/Hero';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { WhyMMSection } from '@/components/home/WhyMMSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ServiceAreaStrip } from '@/components/home/ServiceAreaStrip';

export default async function HomePage() {
  const featuredListings = await getFeaturedListings();

  return (
    <>
      <Hero />
      <FeaturedListings listings={featuredListings} />
      <WhyMMSection />
      <ProcessSection />
      <ServiceAreaStrip />
    </>
  );
}

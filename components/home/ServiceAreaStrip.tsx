import { Button } from '@/components/ui/Button';
import { COMPANY_INFO } from '@/lib/constants';

export function ServiceAreaStrip() {
  return (
    <section className="bg-tan-accent/10 border-y border-tan-accent/20 py-14 md:py-20">
      <div className="container max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown-dark mb-4">
          Serving Ohio & West Virginia
        </h2>
        <p className="text-brown-dark/60 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
          From the rolling hills of Southeast Ohio to the mountains of West Virginia, we represent the finest land in the region.
        </p>
        <div className="flex justify-center">
          <a href={`tel:${COMPANY_INFO.phone}`}>
            <Button variant="secondary" className="bg-brown-dark text-cream hover:bg-forest-900 border-transparent text-xs uppercase tracking-widest font-semibold px-8 py-3 rounded-none transition-all duration-300">
              Contact Us Today
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

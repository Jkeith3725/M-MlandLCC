import { Button } from '@/components/ui/Button';

export function ServiceAreaStrip() {
  return (
    <section className="bg-tan-accent py-10 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-brown-dark mb-4">
          Serving All Counties in Ohio & West Virginia
        </h2>
        <p className="text-brown-dark/80 max-w-2xl mx-auto mb-8 text-lg">
          From the rolling hills of Southeast Ohio to the mountains of West Virginia, we represent the finest land in the region.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" className="bg-brown-dark text-cream hover:bg-brown-dark/90 border-transparent">
            Contact Us Today
          </Button>
        </div>
      </div>
    </section>
  );
}

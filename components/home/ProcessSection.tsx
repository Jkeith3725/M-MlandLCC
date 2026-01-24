export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'Contact us to discuss your property or land needs. We listen carefully to understand your goals.',
    },
    {
      number: '02',
      title: 'Property Evaluation',
      description: 'Our team conducts a thorough assessment, including timber cruise and market analysis.',
    },
    {
      number: '03',
      title: 'Fair Offer',
      description: 'Receive a competitive, no-obligation offer based on current market conditions.',
    },
    {
      number: '04',
      title: 'Smooth Closing',
      description: 'We handle the details and paperwork, making the closing process simple and stress-fre',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-forest-900 text-cream relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tan-accent/5 to-transparent pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tan-accent mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">How It Works</h2>
          <div className="w-16 h-[2px] bg-tan-accent mx-auto" />
          <p className="mt-6 text-base text-cream/60 max-w-lg mx-auto">
            From browsing to closing, we make land ownership simple
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[20%] right-[20%] h-[1px] bg-cream/15 -z-0" />

          {/* Step 1 */}
          <div className="relative text-center group z-10">
            <div className="w-20 h-20 mx-auto mb-8 bg-tan-accent rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(200,162,106,0.3)] group-hover:shadow-[0_6px_28px_rgba(200,162,106,0.5)] group-hover:scale-110 transition-all duration-300">
              <span className="text-2xl font-serif font-bold text-brown-dark">1</span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-cream">Browse Listings</h3>
            <p className="text-cream/55 text-sm leading-relaxed max-w-[250px] mx-auto">
              Explore our curated selection of premium land in Ohio and West Virginia.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-center group z-10">
            <div className="w-20 h-20 mx-auto mb-8 bg-tan-accent rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(200,162,106,0.3)] group-hover:shadow-[0_6px_28px_rgba(200,162,106,0.5)] group-hover:scale-110 transition-all duration-300">
              <span className="text-2xl font-serif font-bold text-brown-dark">2</span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-cream">Request Info</h3>
            <p className="text-cream/55 text-sm leading-relaxed max-w-[250px] mx-auto">
              See something you like? Reach out instantly for maps, drone footage, and details.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-center group z-10">
            <div className="w-20 h-20 mx-auto mb-8 bg-tan-accent rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(200,162,106,0.3)] group-hover:shadow-[0_6px_28px_rgba(200,162,106,0.5)] group-hover:scale-110 transition-all duration-300">
              <span className="text-2xl font-serif font-bold text-brown-dark">3</span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-cream">Close with Confidence</h3>
            <p className="text-cream/55 text-sm leading-relaxed max-w-[250px] mx-auto">
              We guide you through offers, inspections, and closing. A smooth transaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

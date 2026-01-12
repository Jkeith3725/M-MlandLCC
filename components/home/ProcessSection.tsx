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
    <section className="py-16 md:py-24 bg-white text-brown-dark relative overflow-hidden">
      {/* Subtle diagonal accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-tan-accent/5 to-transparent pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-brown-dark">How It Works</h2>
          <div className="w-24 h-1.5 bg-tan-accent mx-auto rounded-full"></div>
          <p className="mt-6 text-lg md:text-xl text-brown-dark/70 max-w-2xl mx-auto">
            From browsing to closing, we make land ownership simple
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[80px] left-[16%] right-[16%] h-1 bg-gradient-to-r from-tan-accent via-tan-accent/50 to-tan-accent -z-0"></div>

          {/* Step 1 */}
          <div className="relative text-center group z-10">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-tan-accent to-tan-default rounded-2xl rotate-45 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
              <span className="text-4xl font-bold text-white -rotate-45">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-brown-dark group-hover:text-forest-500 transition-colors">Browse Listings</h3>
            <p className="text-brown-dark/70 px-2 leading-relaxed text-base">
              Explore our curated selection of premium land in Ohio and West Virginia. Filter by county, acreage, and price.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-center group z-10">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-tan-accent to-tan-default rounded-2xl rotate-45 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
              <span className="text-4xl font-bold text-white -rotate-45">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-brown-dark group-hover:text-forest-500 transition-colors">Request Info</h3>
            <p className="text-brown-dark/70 px-2 leading-relaxed text-base">
              See something you like? Reach out instantly. We provide detailed maps, drone footage, and answers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-center group z-10">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-tan-accent to-tan-default rounded-2xl rotate-45 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
              <span className="text-4xl font-bold text-white -rotate-45">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-brown-dark group-hover:text-forest-500 transition-colors">Close with Confidence</h3>
            <p className="text-brown-dark/70 px-2 leading-relaxed text-base">
              We guide you through offers, inspections, and closing. A smooth transaction from start to finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

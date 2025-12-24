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
    <section className="py-10 md:py-16 bg-cream text-brown-dark">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-brown-default">How It Works</h2>
          <div className="w-24 h-1 bg-green-forest mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[20%] left-[16%] right-[16%] h-0.5 bg-tan-default/30 -z-0"></div>

          {/* Step 1 */}
          <div className="relative text-center group z-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-white border-4 border-tan-default rounded-full flex items-center justify-center shadow-medium group-hover:border-green-forest transition-colors duration-300">
              <span className="text-3xl font-bold text-brown-dark">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-brown-dark">Browse Listings</h3>
            <p className="text-brown-dark/70 px-4">
              Explore our curated selection of premium land in Ohio and West Virginia. Filter by county, acreage, and price.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-center group z-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-white border-4 border-tan-default rounded-full flex items-center justify-center shadow-medium group-hover:border-green-forest transition-colors duration-300">
              <span className="text-3xl font-bold text-brown-dark">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-brown-dark">Request Info</h3>
            <p className="text-brown-dark/70 px-4">
              See something you like? Reach out instantly. We provide detailed maps, drone footage, and answers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-center group z-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-white border-4 border-tan-default rounded-full flex items-center justify-center shadow-medium group-hover:border-green-forest transition-colors duration-300">
              <span className="text-3xl font-bold text-brown-dark">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-brown-dark">Close with Confidence</h3>
            <p className="text-brown-dark/70 px-4">
              We guide you through offers, inspections, and closing. A smooth transaction from start to finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

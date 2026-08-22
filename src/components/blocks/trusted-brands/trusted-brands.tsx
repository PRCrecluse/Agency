export type brandLogos = {
  image: string
  name: string
}

const TrustedBrands = ({ brandLogos }: { brandLogos: brandLogos[] }) => {
  return (
    <section id='trusted-brands' className='py-4 sm:py-6 lg:py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-4 space-y-4 text-center sm:mb-6 lg:mb-8'>
          <p className='text-muted-foreground text-xl'>Trusted by startups, enterprises, and industry giants alike.</p>
        </div>

        <div className='overflow-hidden rounded-xl border border-border/60 bg-border/60'>
          <div className='grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5'>
            {brandLogos.map((logo, index) => (
              <div
                key={index}
                className='bg-background/90 flex min-h-32 items-center justify-center px-4 py-6 backdrop-blur-xs'
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className='h-10 w-auto max-w-36 object-contain opacity-95 transition-transform duration-300 hover:scale-[1.03] sm:h-12 sm:max-w-40'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBrands

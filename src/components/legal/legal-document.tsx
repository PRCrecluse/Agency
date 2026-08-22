import Link from 'next/link'

type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

type LegalDocumentProps = {
  title: string
  description: string
  effectiveDate: string
  sections: LegalSection[]
}

const LegalDocument = ({ title, description, effectiveDate, sections }: LegalDocumentProps) => {
  return (
    <section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-10 space-y-4 border-b pb-8'>
          <Link href='/' className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-300'>
            Back to home
          </Link>
          <div className='space-y-3'>
            <h1 className='text-3xl font-semibold md:text-4xl lg:text-5xl'>{title}</h1>
            <p className='text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg'>{description}</p>
            <p className='text-muted-foreground text-sm'>Effective date: {effectiveDate}</p>
          </div>
        </div>

        <div className='space-y-8'>
          {sections.map(section => (
            <article key={section.title} className='space-y-4'>
              <h2 className='text-xl font-semibold md:text-2xl'>{section.title}</h2>

              {section.paragraphs?.map(paragraph => (
                <p key={paragraph} className='text-muted-foreground leading-7'>
                  {paragraph}
                </p>
              ))}

              {section.items ? (
                <ul className='text-muted-foreground list-disc space-y-2 pl-5 leading-7'>
                  {section.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LegalDocument

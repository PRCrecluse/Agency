import type { JSX } from 'react'

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc'
import remarkGfm from 'remark-gfm'

// Helper function to generate slug from text
function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}_\-]+/gu, '')
    .replace(/\-\-+/g, '-')
}

const ComparisonTable = ({ headers, rows }: { headers: string; rows: string }) => {
  const columns = headers.split('|')
  const tableRows = rows.split(';;').map(row => row.split('|'))

  return (
    <div className='my-6 overflow-x-auto'>
      <table className='w-full border-collapse text-left text-sm'>
        <thead><tr>{columns.map(column => <th key={column} className='bg-muted border p-3 font-semibold'>{column}</th>)}</tr></thead>
        <tbody>{tableRows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex} className='text-muted-foreground border p-3 align-top'>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

const components: MDXRemoteProps['components'] = {
  ComparisonTable,
  h1: ({ children }) => <h1 className='text-4xl font-bold'>{children}</h1>,
  h2: ({ children }) => {
    const slug = generateSlug(children as string)

    return (
      <h2 id={slug} className='mt-6 scroll-mt-20 text-3xl font-semibold'>
        {children}
      </h2>
    )
  },
  h3: ({ children }) => {
    const slug = generateSlug(children as string)

    return (
      <h3 id={slug} className='mt-4 scroll-mt-20 text-xl font-medium'>
        {children}
      </h3>
    )
  },
  h4: ({ children }) => {
    const slug = generateSlug(children as string)

    return (
      <h4 id={slug} className='mt-4 scroll-mt-20 text-lg font-medium'>
        {children}
      </h4>
    )
  },
  p: ({ children }) => <p className='text-muted-foreground mt-4 text-base'>{children}</p>,
  a: ({ children, href }) => <a href={href} className='text-primary underline underline-offset-4' target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>,
  img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading='lazy' className='my-6 h-auto w-full rounded-xl border' />,
  video: ({ src, poster, children, ...props }) => (
    <video
      src={src}
      poster={poster}
      controls
      preload='metadata'
      playsInline
      className='my-6 h-auto w-full rounded-xl border bg-black'
      {...props}
    >
      {children}
    </video>
  ),
  figure: ({ children }) => <figure className='my-8'>{children}</figure>,
  figcaption: ({ children }) => <figcaption className='text-muted-foreground mt-3 text-sm leading-6'>{children}</figcaption>,
  blockquote: ({ children }) => <blockquote className='border-primary/50 my-6 border-l-4 pl-5 text-base'>{children}</blockquote>,
  table: ({ children }) => <div className='my-6 overflow-x-auto'><table className='w-full border-collapse text-left text-sm'>{children}</table></div>,
  th: ({ children }) => <th className='bg-muted border p-3 font-semibold'>{children}</th>,
  td: ({ children }) => <td className='text-muted-foreground border p-3 align-top'>{children}</td>,
  ul: ({ children }) => <ul className='mt-4 list-disc pl-6'>{children}</ul>,
  ol: ({ children }) => <ol className='mt-4 list-decimal pl-6'>{children}</ol>,
  li: ({ children }) => <li className='text-muted-foreground mt-2'>{children}</li>,
  hr: () => <hr className='my-8 border-0' />,
  pre: ({ children }) => <pre className='bg-muted my-6 overflow-x-auto rounded-lg p-4'>{children}</pre>,
  code: ({ children }) => <code className='bg-muted rounded font-mono text-sm'>{children}</code>
}

const MDXContent = (props: JSX.IntrinsicAttributes & MDXRemoteProps) => {
  const remarkPlugins = props.options?.mdxOptions?.remarkPlugins ?? []

  return (
    <MDXRemote
      {...props}
      options={{
        ...props.options,
        mdxOptions: {
          ...props.options?.mdxOptions,
          remarkPlugins: [remarkGfm, ...remarkPlugins]
        }
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}

export default MDXContent

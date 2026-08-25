import type { MetadataRoute } from 'next'

import { getSitemapEntries } from '@/lib/sitemap-data'

const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

const formatDate = (value: string | Date) => new Date(value).toISOString()

function serializeEntry(entry: MetadataRoute.Sitemap[number]) {
  const alternates = entry.alternates?.languages
    ? Object.entries(entry.alternates.languages)
        .map(
          ([language, href]) =>
            href
              ? `    <xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(href.toString())}" />`
              : ''
        )
        .filter(Boolean)
        .join('\n')
    : ''

  return [
    '  <url>',
    `    <loc>${escapeXml(entry.url.toString())}</loc>`,
    alternates,
    entry.lastModified ? `    <lastmod>${formatDate(entry.lastModified)}</lastmod>` : '',
    entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : '',
    typeof entry.priority === 'number' ? `    <priority>${entry.priority}</priority>` : '',
    '  </url>'
  ]
    .filter(Boolean)
    .join('\n')
}

export async function GET() {
  const entries = await getSitemapEntries()

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries.map(serializeEntry).join('\n'),
    '</urlset>'
  ].join('\n')

  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  })
}

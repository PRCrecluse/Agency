const stylesheet = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sitemap xhtml">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>XML Sitemap</title>
        <style>
          :root { color-scheme: light dark; }
          body { margin: 0; padding: 10px 20px 40px; background: Canvas; color: CanvasText; font: 13px/1.55 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
          .notice { margin: 0 0 14px -10px; padding: 0 10px 8px; border-bottom: 2px solid CanvasText; font-family: system-ui, sans-serif; }
          .tree { min-width: 760px; }
          .line { min-height: 20px; white-space: nowrap; }
          .indent-1 { padding-left: 18px; }
          .indent-2 { padding-left: 36px; }
          .tag { color: #881280; }
          .attr { color: #994500; }
          .value { color: #1a1aa6; }
          a { color: inherit; text-decoration: none; }
          a:hover { text-decoration: underline; }
          @media (prefers-color-scheme: dark) {
            .tag { color: #e38de3; }
            .attr { color: #d9a66c; }
            .value { color: #8ab4f8; }
          }
        </style>
      </head>
      <body>
        <p class="notice">This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> URLs.</p>
        <div class="tree">
          <div class="line"><span class="tag">&lt;urlset</span> <span class="attr">xmlns</span>=<span class="value">&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;</span> <span class="attr">xmlns:xhtml</span>=<span class="value">&quot;http://www.w3.org/1999/xhtml&quot;</span><span class="tag">&gt;</span></div>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <div class="line indent-1"><span class="tag">&lt;url&gt;</span></div>
            <div class="line indent-2"><span class="tag">&lt;loc&gt;</span><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a><span class="tag">&lt;/loc&gt;</span></div>
            <xsl:for-each select="xhtml:link">
              <div class="line indent-2"><span class="tag">&lt;xhtml:link</span> <span class="attr">rel</span>=<span class="value">&quot;<xsl:value-of select="@rel" />&quot;</span> <span class="attr">hreflang</span>=<span class="value">&quot;<xsl:value-of select="@hreflang" />&quot;</span> <span class="attr">href</span>=<span class="value">&quot;<xsl:value-of select="@href" />&quot;</span> <span class="tag">/&gt;</span></div>
            </xsl:for-each>
            <xsl:if test="sitemap:lastmod"><div class="line indent-2"><span class="tag">&lt;lastmod&gt;</span><xsl:value-of select="sitemap:lastmod" /><span class="tag">&lt;/lastmod&gt;</span></div></xsl:if>
            <xsl:if test="sitemap:changefreq"><div class="line indent-2"><span class="tag">&lt;changefreq&gt;</span><xsl:value-of select="sitemap:changefreq" /><span class="tag">&lt;/changefreq&gt;</span></div></xsl:if>
            <xsl:if test="sitemap:priority"><div class="line indent-2"><span class="tag">&lt;priority&gt;</span><xsl:value-of select="sitemap:priority" /><span class="tag">&lt;/priority&gt;</span></div></xsl:if>
            <div class="line indent-1"><span class="tag">&lt;/url&gt;</span></div>
          </xsl:for-each>
          <div class="line"><span class="tag">&lt;/urlset&gt;</span></div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`

export function GET() {
  return new Response(stylesheet, {
    headers: {
      'Content-Type': 'text/xsl; charset=UTF-8',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}

export type ServiceSection = {
  id: string
  title: string
  description: string
  bullets: string[]
}

export type ServicePage = {
  slug: string
  category: string
  title: string
  description: string
  intro: string
  keywords: string[]
  highlights: string[]
  sections: ServiceSection[]
  outcomes: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'seo-services',
    category: 'SEO Services',
    title: 'SEO Services',
    description:
      'Build a stronger organic growth engine with aligned on-page SEO, technical SEO, and programmatic SEO systems.',
    intro:
      'This page covers the full structure behind our SEO delivery. We start with page-level priorities, support them with technical fixes, and scale winning patterns with programmatic systems where they make sense.',
    keywords: ['on-page seo', 'technical seo', 'programmatic seo', 'seo services', 'internal linking'],
    highlights: [
      'Turn important landing pages into clearer ranking targets',
      'Support content work with crawl, indexation, and performance fixes',
      'Scale repeatable page templates without sacrificing search intent'
    ],
    sections: [
      {
        id: 'on-page-seo',
        title: 'On-page SEO foundations',
        description:
          'We tighten page-level signals so search engines and users immediately understand what each page is meant to rank for.',
        bullets: [
          'Search intent mapping for primary and secondary keywords',
          'Title, meta description, heading, and body copy refinement',
          'Internal linking updates to strengthen topic clusters'
        ]
      },
      {
        id: 'technical-seo',
        title: 'Technical SEO support',
        description:
          'We remove the technical blockers that quietly suppress discovery, crawling, rendering, and indexation.',
        bullets: [
          'Crawl path, sitemap, and indexation issue review',
          'Performance and Core Web Vitals recommendations tied to SEO impact',
          'Structured data, canonical, and page architecture guidance'
        ]
      },
      {
        id: 'programmatic-seo',
        title: 'Programmatic SEO systems',
        description:
          'When repeatable search demand exists, we design scalable landing page patterns that still match user intent.',
        bullets: [
          'Template planning for high-intent page families',
          'Content field and metadata systems for reusable generation',
          'Quality controls to prevent thin, duplicate, or off-target pages'
        ]
      }
    ],
    outcomes: [
      'Sharper page targeting and better topical relevance',
      'Stronger internal authority flow across your important URLs',
      'A delivery path that connects content, technical fixes, and scale'
    ]
  },
  {
    slug: 'reddit-services',
    category: 'Reddit Services',
    title: 'Reddit Services',
    description:
      'Build a credible Reddit presence with structured community participation, campaign execution, and reporting that respects platform context.',
    intro:
      'Reddit works when brands show up like informed contributors, not generic advertisers. We combine community management with campaign strategy so organic trust and paid distribution reinforce each other.',
    keywords: ['reddit marketing', 'reddit community management', 'reddit campaigns', 'reddit services'],
    highlights: [
      'Build trust inside relevant subreddits before asking for conversion',
      'Coordinate organic participation and paid campaigns in one workflow',
      'Measure sentiment, traffic quality, and conversion contribution'
    ],
    sections: [
      {
        id: 'community-management',
        title: 'Community management',
        description:
          'We help your brand participate in the right conversations with a tone, cadence, and value exchange that fits each subreddit.',
        bullets: [
          'Subreddit discovery and prioritization by audience fit',
          'Response playbooks, moderation awareness, and escalation rules',
          'Ongoing discussion support to build recognition over time'
        ]
      },
      {
        id: 'reddit-campaigns',
        title: 'Reddit campaigns',
        description:
          'We plan and launch campaigns that align creative, targeting, offer design, and landing page intent around Reddit-native behavior.',
        bullets: [
          'Campaign structure and audience strategy',
          'Creative angle testing for different subreddit contexts',
          'Landing page and conversion-path alignment with campaign intent'
        ]
      },
      {
        id: 'measurement',
        title: 'Measurement and iteration',
        description:
          'We connect platform activity back to business impact so the program can improve with evidence instead of guesswork.',
        bullets: [
          'Weekly performance reviews across engagement and acquisition signals',
          'Sentiment monitoring and narrative risk tracking',
          'Iteration roadmap for messaging, placement, and offer changes'
        ]
      }
    ],
    outcomes: [
      'A more credible presence inside the communities that influence buyers',
      'Campaigns designed for Reddit behavior instead of generic social playbooks',
      'Clearer visibility into which conversations and campaigns move pipeline'
    ]
  },
  {
    slug: 'geo-services',
    category: 'GEO Services',
    title: 'GEO Services',
    description:
      'Increase the odds that your brand appears in AI-generated answers by improving source clarity, entity signals, and content structure.',
    intro:
      'Generative Engine Optimization focuses on how your brand gets cited, summarized, and surfaced in AI discovery flows. We strengthen the signals that make your site easier for answer engines to understand and reuse.',
    keywords: ['geo services', 'generative engine optimization', 'ai search', 'llm visibility'],
    highlights: [
      'Make your brand easier for answer engines to recognize and trust',
      'Strengthen source pages that are likely to feed AI discovery journeys',
      'Align entity, content, and citation signals around authority topics'
    ],
    sections: [
      {
        id: 'generative-engine-optimization',
        title: 'Generative answer visibility',
        description:
          'We identify the pages and themes most likely to influence AI-generated answers, then improve how clearly those sources communicate expertise.',
        bullets: [
          'Entity and authority mapping for priority topics',
          'Source-page refinement for answer extraction and summarization',
          'Coverage planning for question patterns common in AI search journeys'
        ]
      },
      {
        id: 'citation-readiness',
        title: 'Citation readiness',
        description:
          'We improve the trust signals that help your content qualify as a source worth citing, referencing, or paraphrasing.',
        bullets: [
          'Clear authorship, proof points, and claim support review',
          'Structured formatting for easier extraction and reuse',
          'Cross-channel consistency between site, brand, and topic pages'
        ]
      },
      {
        id: 'topic-expansion',
        title: 'Topic expansion roadmap',
        description:
          'We turn early signals into a repeatable roadmap so your AI search footprint can grow without becoming noisy or unfocused.',
        bullets: [
          'Gap analysis across topic clusters and comparison queries',
          'New page recommendations tied to entity depth and question demand',
          'Prioritized roadmap based on likely visibility gains'
        ]
      }
    ],
    outcomes: [
      'Stronger source pages for AI answer generation and brand discovery',
      'Cleaner topic and entity signals across your content ecosystem',
      'A roadmap for expanding visibility in emerging search interfaces'
    ]
  }
]

export const serviceSlugs = servicePages.map(service => service.slug)

export const getServiceBySlug = (slug: string) => servicePages.find(service => service.slug === slug)

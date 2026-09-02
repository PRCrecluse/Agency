export const BLOG_TOPIC_IDS = ['seo', 'reddit', 'geo', 'general', 'agency'] as const

export type BlogTopicId = (typeof BLOG_TOPIC_IDS)[number]

type BlogTopicDefinition = {
  id: BlogTopicId
  label: string
  aliases: string[]
}

const BLOG_TOPICS: BlogTopicDefinition[] = [
  {
    id: 'seo',
    label: 'SEO',
    aliases: ['seo', 'technical seo', 'programmatic seo', 'content seo', 'on-page seo']
  },
  {
    id: 'reddit',
    label: 'Reddit',
    aliases: ['reddit', 'reddit marketing', 'reddit growth']
  },
  {
    id: 'geo',
    label: 'GEO',
    aliases: ['geo', 'generative engine optimization', 'ai search']
  },
  {
    id: 'general',
    label: 'General',
    aliases: ['general', 'growth', 'insights']
  },
  {
    id: 'agency',
    label: 'Agency',
    aliases: ['agency', 'meridian', 'company']
  }
]

const BLOG_TOPIC_LOOKUP = new Map<string, BlogTopicDefinition>(
  BLOG_TOPICS.flatMap(topic => topic.aliases.map(alias => [alias, topic] as const))
)

export function normalizeBlogTopic(value?: string | null): BlogTopicId | undefined {
  if (!value) {
    return undefined
  }

  const normalizedValue = value.trim().toLowerCase()

  return BLOG_TOPIC_LOOKUP.get(normalizedValue)?.id
}

export function getBlogTopicLabel(topic?: string | null): string | undefined {
  if (!topic) {
    return undefined
  }

  return BLOG_TOPICS.find(item => item.id === topic)?.label
}

export function getOrderedBlogTopicLabels(existingCategories: string[] = []): string[] {
  const defaultLabels = BLOG_TOPIC_IDS.map(topicId => getBlogTopicLabel(topicId)).filter(Boolean) as string[]
  const extraLabels = existingCategories.filter(category => !defaultLabels.includes(category))

  return [...defaultLabels, ...extraLabels]
}

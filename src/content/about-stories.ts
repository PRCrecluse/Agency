export const aboutStories = [
  {
    slug: 'goglobal-waytoagi-sequoia',
    date: 'June 28, 2026',
    title: 'GoGlobal.to Was Featured Alongside WaytoAGI at Sequoia Accelerator',
    deck: 'GoGlobal.to, our Reddit SaaS, appeared alongside the WaytoAGI project during a Sequoia Accelerator showcase, marking an early milestone for the team.',
    eyebrow: 'Founder story · GoGlobal.to',
    authorRole: 'Founder, GoGlobal.to',
    imageOne: '/images/about/stories/goglobal-sequoia-showcase.jpg',
    imageOneAlt: 'GoGlobal.to and WaytoAGI featured at a Sequoia Accelerator showcase',
    imageTwo: '/images/about/stories/goglobal-sequoia-moment.jpg',
    imageTwoAlt: 'Sequoia Accelerator showcase moment for GoGlobal.to',
    quote: 'Practical growth products deserve to be understood in the same room as ambitious AI builders.',
    paragraphs: [
      'GoGlobal.to, our Reddit SaaS, was featured alongside the WaytoAGI project during a Sequoia Accelerator showcase. For the team, it was a meaningful signal: the product could stand inside a higher-context conversation about founders, AI, and practical distribution.',
      'The moment validated more than visibility. It showed that a product built around hands-on growth execution could sit beside strong community-driven AI projects and still be understood immediately—without a long explanation of why it mattered.',
      'That early milestone strengthened our conviction that GoGlobal.to and Meridian were not just tools or services. They were becoming part of a broader narrative around AI-native distribution and global growth.'
    ],
    highlights: [
      'A founder and AI-builder context for GoGlobal.to',
      'A clearer narrative for practical distribution work',
      'Conviction to keep building at the intersection of AI and growth'
    ],
    nextSlug: 'yiwei-sparklab-birthday',
    nextLabel: 'Read the SparkLab founder story'
  },
  {
    slug: 'yiwei-sparklab-birthday',
    date: 'July 5, 2026',
    title: 'Yiwei Joined SparkLab Accelerator and Lived Alongside Fellow Founders',
    deck: 'Yiwei joined SparkLab Accelerator, lived with other founders, and celebrated an unforgettable 20th birthday there on July 5, 2026.',
    eyebrow: 'Founder story · SparkLab Accelerator',
    authorRole: 'Founder, Meridian',
    imageOne: '/images/about/stories/yiwei-sparklab-founders.jpg',
    imageOneAlt: 'Yiwei at SparkLab Accelerator with fellow founders',
    imageTwo: '/images/about/stories/yiwei-sparklab-birthday.jpg',
    imageTwoAlt: 'Yiwei celebrating a memorable twentieth birthday at SparkLab',
    quote: 'The right founder environment turns daily conversations into direction and momentum.',
    paragraphs: [
      'Yiwei joined SparkLab Accelerator and lived side by side with other founders in the program. The environment compressed product feedback, founder conversations, and daily execution into one shared rhythm.',
      'On July 5, 2026, Yiwei spent an unforgettable twentieth birthday at SparkLab together with fellow founders. The day captured what the accelerator really meant: equal parts ambition, friendship, and intense building energy.',
      'Being surrounded by founders who were equally serious about shipping sharpened the team’s direction and strengthened the conviction behind Meridian’s work: the best growth decisions are practical, close to the product, and ready to be put into motion.'
    ],
    highlights: [
      'A live feedback loop with fellow founders',
      'A shared environment for product focus and execution',
      'Renewed conviction in builder-led growth'
    ],
    nextSlug: 'goglobal-waytoagi-sequoia',
    nextLabel: 'Read the GoGlobal.to showcase story'
  }
] as const

export type AboutStory = (typeof aboutStories)[number]

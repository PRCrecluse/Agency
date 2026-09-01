export const aboutStories = [
  {
    slug: 'yiwei-linkloud-gaoning-growth-interview',
    date: 'August 24, 2026',
    title: 'Yiwei Recorded a Growth Interview With LinkLoud Co-Founder Galen Gao',
    deck: 'Yiwei sat down with LinkLoud co-founder Galen Gao for a candid growth interview about building, distribution, and helping founders go global.',
    eyebrow: 'Growth interview · LinkLoud',
    authorRole: 'Founder, Meridian',
    imageOne: '/images/about/stories/yiwei-linkloud-gaoning-interview.jpg',
    imageOneAlt: 'Yiwei recording a growth interview with LinkLoud co-founder Galen Gao',
    imageTwo: '/images/about/stories/yiwei-linkloud-gaoning-interview.jpg',
    imageTwoAlt: 'Yiwei and Galen Gao during their LinkLoud growth conversation',
    quote: 'The best founder conversations feel less like interviews and more like building the next idea together.',
    paragraphs: [
      'Yiwei invited Galen Gao, co-founder of LinkLoud, to record a candid growth interview. They had last met on the LinkLoud stage, but their first meal together quickly turned into a series of relaxed conversations captured on camera.',
      'The easy chemistry opened space for an honest exchange about growth, founder-led distribution, and the realities of helping products reach global markets. What began as Yiwei’s first formal interview felt more like two builders comparing notes in public.',
      'The Q&A is the start of a broader interview series built around practical lessons from people doing the work—founders and operators willing to share the decisions, experiments, and hard-earned insights behind sustainable growth.'
    ],
    highlights: [
      'A candid conversation with LinkLoud co-founder Galen Gao',
      'Practical lessons on founder-led growth and global distribution',
      'The beginning of Yiwei’s growth interview series'
    ],
    nextSlug: 'yiwei-sparklab-birthday',
    nextLabel: 'Read the SparkLab founder story'
  },
  {
    slug: 'yiwei-sparklab-birthday',
    date: 'July 5, 2026',
    title: 'Yiwei Joined SparkLab Accelerator and Lived Alongside Fellow Founders',
    deck: 'Yiwei joined SparkLab Accelerator, lived with other founders, and marked a memorable birthday there on July 5, 2026.',
    eyebrow: 'Founder story · SparkLab Accelerator',
    authorRole: 'Founder, Meridian',
    imageOne: '/images/about/stories/yiwei-sparklab-founders.jpg',
    imageOneAlt: 'Yiwei at SparkLab Accelerator with fellow founders',
    imageTwo: '/images/about/stories/yiwei-sparklab-birthday.jpg',
    imageTwoAlt: 'Yiwei celebrating a memorable birthday with fellow founders at SparkLab',
    quote: 'The right founder environment turns daily conversations into direction and momentum.',
    paragraphs: [
      'Yiwei joined SparkLab Accelerator and lived side by side with other founders in the program. The environment compressed product feedback, founder conversations, and daily execution into one shared rhythm.',
      'On July 5, 2026, Yiwei marked a memorable birthday at SparkLab together with fellow founders. The day captured what the accelerator really meant: equal parts ambition, friendship, and intense building energy.',
      'Being surrounded by founders who were equally serious about shipping sharpened the team’s direction and strengthened the conviction behind Meridian’s work: the best growth decisions are practical, close to the product, and ready to be put into motion.'
    ],
    highlights: [
      'A live feedback loop with fellow founders',
      'A shared environment for product focus and execution',
      'Renewed conviction in builder-led growth'
    ],
    nextSlug: 'yiwei-linkloud-gaoning-growth-interview',
    nextLabel: 'Read the LinkLoud growth interview story'
  }
] as const

export type AboutStory = (typeof aboutStories)[number]

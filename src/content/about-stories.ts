import type { SiteLang } from '@/lib/language'

export const aboutStories = [
  {
    slug: 'yiwei-linkloud-gaoning-growth-interview',
    date: '2026-08-24',
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
    date: '2026-07-05',
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

export type AboutStory = {
  [Key in keyof (typeof aboutStories)[number]]: (typeof aboutStories)[number][Key] extends readonly string[]
    ? readonly string[]
    : string
}

type StoryTranslation = Pick<
  AboutStory,
  | 'title'
  | 'deck'
  | 'eyebrow'
  | 'authorRole'
  | 'imageOneAlt'
  | 'imageTwoAlt'
  | 'quote'
  | 'paragraphs'
  | 'highlights'
  | 'nextLabel'
>

const chineseStories: Record<(typeof aboutStories)[number]['slug'], StoryTranslation> = {
  'yiwei-linkloud-gaoning-growth-interview': {
    title: '怡玮与 LinkLoud 联合创始人 Galen Gao 录制增长访谈',
    deck: '怡玮与 LinkLoud 联合创始人 Galen Gao 坐下来，坦诚交流做产品、渠道拓展，以及如何帮助创业者走向全球。',
    eyebrow: '增长访谈 · LinkLoud',
    authorRole: 'Meridian 创始人',
    imageOneAlt: '怡玮与 LinkLoud 联合创始人 Galen Gao 录制增长访谈',
    imageTwoAlt: '怡玮与 Galen Gao 在 LinkLoud 增长对话中交流',
    quote: '最好的创业者对话，就像在一起打磨下一个想法。',
    paragraphs: [
      '怡玮邀请 LinkLoud 联合创始人 Galen Gao 录制了一次坦诚的增长访谈。上一次见面还是在 LinkLoud 的舞台上，而第一次一起吃饭，很快就延伸成了一系列被镜头记录下来的轻松对话。',
      '自然的交流氛围，让两人得以深入聊增长、创始人主导的渠道拓展，以及产品走向全球市场时面对的现实问题。这是怡玮第一次正式采访，过程却更像两位创业者公开交流实战心得。',
      '这次问答也是增长访谈系列的起点。系列将聚焦一线创业者与运营者的实际经验，分享他们为实现可持续增长所做的决策、实验，以及一路积累的心得。'
    ],
    highlights: [
      '与 LinkLoud 联合创始人 Galen Gao 的坦诚对话',
      '围绕创始人主导的增长与全球渠道拓展分享实战经验',
      '开启怡玮的增长访谈系列'
    ],
    nextLabel: '阅读 SparkLab 创业故事'
  },
  'yiwei-sparklab-birthday': {
    title: '怡玮加入 SparkLab 加速器，与创业者们共同生活、共同成长',
    deck: '怡玮加入 SparkLab 加速器，与其他创业者共同生活，并在 2026 年 7 月 5 日度过了一个难忘的生日。',
    eyebrow: '创业故事 · SparkLab 加速器',
    authorRole: 'Meridian 创始人',
    imageOneAlt: '怡玮与其他创业者在 SparkLab 加速器',
    imageTwoAlt: '怡玮与 SparkLab 的创业者们一起庆祝生日',
    quote: '合适的创业环境，能让日常交流变成清晰的方向与持续的行动力。',
    paragraphs: [
      '怡玮加入 SparkLab 加速器，与项目中的其他创业者共同生活。在这里，产品反馈、创业交流与日常执行融入了同一种生活节奏。',
      '2026 年 7 月 5 日，怡玮与创业伙伴们在 SparkLab 一起度过了一个难忘的生日。这一天也记录下了加速器生活的意义：既有抱负与友谊，也有全力做产品的热情。',
      '身边都是认真做产品的创业者，让团队的方向更加清晰，也让我们更坚定地相信 Meridian 的工作理念：好的增长决策应该务实、贴近产品，并且能够付诸行动。'
    ],
    highlights: [
      '与创业伙伴持续交流、及时获得反馈',
      '在共同生活的环境中专注产品与执行',
      '更加坚定以产品实践驱动增长的信念'
    ],
    nextLabel: '阅读 LinkLoud 增长访谈故事'
  }
}

export const getAboutStories = (lang: SiteLang): AboutStory[] =>
  aboutStories.map(story => (lang === 'zh' ? { ...story, ...chineseStories[story.slug] } : story))

export const formatStoryDate = (date: string, lang: SiteLang) =>
  new Date(date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })

import type { SiteLang } from '@/lib/language'

const founderHighlights = [
  'Founded and shipped 8 products independently',
  'Driven 1M+ impressions across X/Twitter and Xiaohongshu',
  'Customers include teams from Alibaba and a16z-backed companies',
  'Creator of GoGlobal.to — an AI Reddit growth agent',
  'Built an active builder-community voice with 4,672 Xiaohongshu likes and saves'
]

const stories = [
  {
    date: 'August 24, 2026',
    eyebrow: 'Growth interview · LinkLoud',
    title: 'Yiwei recorded a growth interview with LinkLoud co-founder Galen Gao',
    quote:
      '“Their first sit-down turned into a relaxed series of conversations about growth, building, and helping founders go global.”',
    image: '/images/about/stories/yiwei-linkloud-gaoning-interview.jpg',
    alt: 'Yiwei recording a growth interview with LinkLoud co-founder Galen Gao',
    label: 'Founder conversations',
    href: '/about/stories/yiwei-linkloud-gaoning-growth-interview'
  },
  {
    date: 'July 5, 2026',
    eyebrow: 'Founder, Volumn.ai',
    title: 'Yiwei joined SparkLab Accelerator and lived alongside fellow founders',
    quote: '“Yiwei joined SparkLab Accelerator, lived with other founders, and marked a memorable birthday there.”',
    image: '/images/about/sparklab-birthday.jpg',
    alt: 'Yiwei celebrating a birthday at SparkLab',
    label: 'Building in public',
    href: '/about/stories/yiwei-sparklab-birthday'
  }
]

const specialists = [
  {
    name: 'Max',
    role: 'AI Growth Operator',
    tagline: 'Former Marswave CMO & AI media operator',
    image: '/images/about/max.jpg',
    alt: 'Max, AI growth operator',
    xUrl: 'https://x.com/MaxForAI',
    bio: 'After leaving a U.S. graduate program to build, Max served as CMO at Marswave and helped grow it from $0 to $3M ARR. His experience spans USD fund research, talent leadership for a well-known model team, AI media operations, and product roles for several million-user products.',
    highlights: [
      'Former Marswave CMO; helped drive growth from $0 to $3M ARR',
      'Brings fund research, AI-media, model-team talent, and product experience',
      'Runs Max for AI on Xiaohongshu: 40K followers and a 10M-view post'
    ]
  },
  {
    name: 'Huiling',
    role: 'Growth Marketing Specialist',
    tagline: 'A founder-minded growth marketer with a hacker edge',
    image: '/images/about/huiling.jpg',
    alt: 'Huiling, growth marketing specialist',
    bio: 'Huiling applies founder thinking and a hacker edge to growth. She works across the full AI product journey—from early user research and cold-start acquisition to scaling through high-quality KOL and KOC ecosystems—across AI companions, SaaS, and AI hardware.',
    highlights: [
      'Took an AI product to $1M ARR in four months',
      'Covers early research, acquisition, and scaled growth end to end',
      'Deep experience in SEO, paid acquisition, and KOL/KOC partnerships'
    ]
  }
]

type AboutContent = {
  title: string
  description: string
  keywords: string[]
  eyebrow: string
  headline: string
  exploreServices: string
  meetTeam: string
  founderRole: string
  founderName: string
  founderAlt: string
  founderEyebrow: string
  founderBio: string[]
  founderHighlights: string[]
  followOnX: string
  xiaohongshu: string
  specialistsEyebrow: string
  specialistsTitle: string
  specialistsDescription: string
  specialists: {
    name: string
    role: string
    tagline: string
    image: string
    alt: string
    xUrl?: string
    bio: string
    highlights: string[]
  }[]
  storiesEyebrow: string
  storiesTitle: string
  storiesDescription: string
  stories: typeof stories
  readStory: string
  ctaTitle: string
  ctaDescription: string
  bookCall: string
}

export const aboutContent: Record<SiteLang, AboutContent> = {
  en: {
    title: 'About Meridian | AI-Native Growth Team',
    description:
      'Meet the founder, specialists, and builder story behind Meridian, GoGlobal.to, and the team’s AI-native growth practice.',
    keywords: ['about meridian', 'ai growth team', 'seo agency founder', 'reddit growth team'],
    eyebrow: 'About Meridian',
    headline: 'A growth partner built by people who ship.',
    exploreServices: 'Explore services',
    meetTeam: 'Meet the team',
    founderRole: 'Founder & CEO',
    founderName: 'Yiwei (怡玮)',
    founderAlt: 'Yiwei (怡玮), founder and CEO',
    founderEyebrow: 'Meet the Founder',
    founderBio: [
      'Yiwei is an entrepreneur and serial builder who has launched eight products and driven over one million impressions across X/Twitter and Xiaohongshu. With a hands-on reputation in the overseas product-growth community, Yiwei works with teams from Alibaba and a16z-backed companies.',
      'Yiwei also founded GoGlobal.to, an AI Reddit marketing agent, applying the same philosophy of AI-powered, safety-first social automation to a second platform. Meridian brings that builder mindset into a focused growth partnership for companies that need a clear route from discovery to demand.'
    ],
    founderHighlights,
    followOnX: 'Follow on X',
    xiaohongshu: 'Xiaohongshu · Yiwei',
    specialistsEyebrow: 'Core Specialists',
    specialistsTitle: 'Operators who turn growth strategy into momentum.',
    specialistsDescription:
      'Meridian brings senior operators into the work—not just the planning. Meet the specialists behind our AI growth, product marketing, and distribution practice.',
    specialists,
    storiesEyebrow: 'Team Story',
    storiesTitle: 'Milestones that shaped the team.',
    storiesDescription:
      'The team behind Meridian is built through product launches, public learning, and close collaboration with other founders. These early moments continue to shape how we work with growth-stage brands today.',
    stories,
    readStory: 'Read story',
    ctaTitle: 'Want a growth partner who understands the work?',
    ctaDescription:
      'We can map your next search, AI-discovery, or community-growth opportunity into a delivery plan that is built for your current stage.',
    bookCall: 'Book a strategy call'
  },
  zh: {
    title: '关于 Meridian | AI 原生增长团队',
    description: '认识 Meridian 的创始人与增长专家，了解团队打造 GoGlobal.to、实践 AI 原生增长的创业故事。',
    keywords: ['关于 Meridian', 'AI 增长团队', 'SEO 服务团队', 'Reddit 增长团队'],
    eyebrow: '关于 Meridian',
    headline: '由产品实干者打造的增长伙伴。',
    exploreServices: '了解我们的服务',
    meetTeam: '认识团队',
    founderRole: '创始人兼 CEO',
    founderName: '怡玮（Yiwei）',
    founderAlt: '怡玮（Yiwei），Meridian 创始人兼 CEO',
    founderEyebrow: '认识创始人',
    founderBio: [
      '怡玮是一名连续创业者，已独立推出 8 款产品，在 X/Twitter 和小红书累计获得超过 100 万次曝光。凭借在出海产品增长领域的实战经验，怡玮与来自阿里巴巴及 a16z 投资公司的团队开展合作。',
      '怡玮还创立了 AI Reddit 营销智能体 GoGlobal.to，将 AI 驱动、安全优先的社交自动化理念拓展到另一个平台。Meridian 延续这种亲手做产品的思维，为企业梳理从获得曝光到建立市场需求的增长路径。'
    ],
    founderHighlights: [
      '独立创立并上线 8 款产品',
      '在 X/Twitter 和小红书累计获得超过 100 万次曝光',
      '客户包括来自阿里巴巴和 a16z 投资公司的团队',
      '创立 GoGlobal.to——AI Reddit 增长智能体',
      '持续分享创业实践，在小红书获得 4,672 次点赞与收藏'
    ],
    followOnX: '在 X 上关注',
    xiaohongshu: '小红书 · Yiwei 怡玮',
    specialistsEyebrow: '核心专家',
    specialistsTitle: '把增长策略落到实处的实战团队。',
    specialistsDescription:
      'Meridian 的资深增长专家直接参与执行，覆盖 AI 增长、产品营销与渠道拓展。认识推动这些工作的团队成员。',
    specialists: [
      {
        name: 'Max',
        role: 'AI 增长专家',
        tagline: '前 Marswave CMO，AI 媒体运营者',
        image: '/images/about/max.jpg',
        alt: 'Max，AI 增长专家',
        xUrl: 'https://x.com/MaxForAI',
        bio: 'Max 离开美国研究生项目后投身创业，曾担任 Marswave CMO，助力公司年经常性收入（ARR）从 0 增长至 300 万美元。他的经历涵盖美元基金研究、知名模型团队人才管理、AI 媒体运营，以及多款百万用户产品的产品工作。',
        highlights: [
          '前 Marswave CMO，助力 ARR 从 0 增长至 300 万美元',
          '兼具基金研究、AI 媒体、模型团队人才管理与产品经验',
          '运营小红书账号 Max for AI：4 万粉丝，单篇内容获得 1,000 万次浏览'
        ]
      },
      {
        name: 'Huiling',
        role: '增长营销专家',
        tagline: '兼具创业者思维与增长黑客方法的营销人',
        image: '/images/about/huiling.jpg',
        alt: 'Huiling，增长营销专家',
        bio: 'Huiling 将创业者思维与增长黑客方法融入营销实践，参与 AI 产品从早期用户研究、冷启动获客，到借助优质 KOL 与 KOC 生态实现规模化增长的完整过程，经验覆盖 AI 陪伴、SaaS 和 AI 硬件。',
        highlights: [
          '用 4 个月将一款 AI 产品的 ARR 提升至 100 万美元',
          '覆盖早期研究、获客与规模化增长的完整链路',
          '在 SEO、付费获客及 KOL/KOC 合作方面拥有丰富经验'
        ]
      }
    ],
    storiesEyebrow: '团队故事',
    storiesTitle: '塑造团队的关键时刻。',
    storiesDescription:
      'Meridian 在持续推出产品、公开分享经验、与其他创业者紧密合作的过程中成长。这些经历也影响着我们今天与成长型品牌合作的方式。',
    stories: [
      {
        date: '2026年8月24日',
        eyebrow: '增长访谈 · LinkLoud',
        title: '怡玮与 LinkLoud 联合创始人 Galen Gao 录制增长访谈',
        quote: '“第一次坐下来交流，就变成了一系列轻松的对话，聊增长、做产品，以及如何帮助创业者走向全球。”',
        image: '/images/about/stories/yiwei-linkloud-gaoning-interview.jpg',
        alt: '怡玮与 LinkLoud 联合创始人 Galen Gao 录制增长访谈',
        label: '创业者对话',
        href: '/about/stories/yiwei-linkloud-gaoning-growth-interview'
      },
      {
        date: '2026年7月5日',
        eyebrow: 'Volumn.ai 创始人',
        title: '怡玮加入 SparkLab 加速器，与创业者们共同生活、共同成长',
        quote: '“怡玮加入 SparkLab 加速器，与其他创业者共同生活，也在那里度过了一个难忘的生日。”',
        image: '/images/about/sparklab-birthday.jpg',
        alt: '怡玮在 SparkLab 庆祝生日',
        label: '公开分享创业历程',
        href: '/about/stories/yiwei-sparklab-birthday'
      }
    ],
    readStory: '阅读故事',
    ctaTitle: '寻找真正懂执行的增长伙伴？',
    ctaDescription: '我们可以把搜索、AI 推荐和社群增长中的机会，转化为适合你当前业务阶段的执行方案。',
    bookCall: '预约增长策略咨询'
  }
}

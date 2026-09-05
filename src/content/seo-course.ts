export type CourseTrack = 'foundation' | 'ai-search' | 'advanced'

export type CourseLesson = {
  number: number
  title: string
  summary: string
  duration: string
  task?: string
}

export type CourseModule = {
  id: CourseTrack
  index: string
  label: string
  title: string
  description: string
  accent: string
  lessons: CourseLesson[]
  updates: string[]
}

export const SEO_COURSE_PRICE_FEN = 89_900
export const SEO_COURSE_PRICE_LABEL = '¥899'
export const SEO_COURSE_TITLE = 'SEO 知识库·实战课'

export const seoCourseModules: CourseModule[] = [
  {
    id: 'foundation',
    index: '01',
    label: 'SEO 入门',
    title: '先把搜索增长的地基打牢',
    description: '理解搜索意图、关键词、页面结构与技术可见性，建立一套可复用的 SEO 工作方法。',
    accent: 'from-sky-500/18 to-cyan-300/5',
    lessons: [
      {
        number: 1,
        title: '搜索引擎如何理解你的网站',
        summary: '从抓取、索引到排名，看懂 SEO 优化的完整链路。',
        duration: '42 分钟'
      },
      {
        number: 2,
        title: '关键词与搜索意图研究',
        summary: '从真实业务问题出发，搭建可执行的关键词地图。',
        duration: '51 分钟'
      },
      {
        number: 3,
        title: '内容结构与 On-page SEO',
        summary: '把搜索意图落到标题、段落、内链和转化路径上。',
        duration: '47 分钟'
      },
      {
        number: 4,
        title: '技术 SEO 排查清单',
        summary: '快速定位抓取、索引、性能和站点结构问题。',
        duration: '58 分钟',
        task: '产出一份自己网站的 SEO 基础诊断表'
      }
    ],
    updates: [
      '关键词分类模板',
      '搜索意图判断清单',
      'Title 与 Meta 写作框架',
      '内链布局方法',
      'Google Search Console 快速上手',
      '技术 SEO 自查表',
      '新站 30 天启动路线'
    ]
  },
  {
    id: 'ai-search',
    index: '02',
    label: 'GEO + AEO 入门',
    title: '让品牌进入 AI 答案与答案引擎',
    description: '从引用、实体、信任信号与答案结构出发，理解传统搜索与 AI 搜索的共同点和差异。',
    accent: 'from-violet-500/18 to-fuchsia-300/5',
    lessons: [
      {
        number: 5,
        title: 'GEO 、AEO 与 SEO 的关系',
        summary: '看懂 AI 搜索的答案生成链路，找到可被优化的环节。',
        duration: '44 分钟'
      },
      {
        number: 6,
        title: '实体、主题权威与品牌信号',
        summary: '用站内内容和外部证据让引擎更准确地识别你。',
        duration: '49 分钟'
      },
      {
        number: 7,
        title: '面向答案引擎的内容写法',
        summary: '设计可抽取、可引用、可验证的答案单元。',
        duration: '53 分钟'
      },
      {
        number: 8,
        title: 'AI 搜索可见性监测',
        summary: '建立问题集、品牌提及和引用来源的追踪方法。',
        duration: '46 分钟',
        task: '建立 20 个核心问题的 GEO 可见性基线'
      }
    ],
    updates: [
      'GEO 可见性监测表',
      'AEO 答案结构模板',
      '品牌实体信号清单',
      'AI 引用来源研究法',
      '对话式搜索问题集',
      'GEO 竞品对比框架'
    ]
  },
  {
    id: 'advanced',
    index: '03',
    label: 'SEO 进阶·实战任务',
    title: '把知识变成能跑起来的增长系统',
    description: '进入站点架构、内容规模化、权威建设与增长实验，每个单元都有可交付的 task。',
    accent: 'from-amber-500/18 to-orange-300/5',
    lessons: [
      {
        number: 9,
        title: '主题集群与站点信息架构',
        summary: '从关键词清单进阶到主题地图，安排页面层级与内链。',
        duration: '61 分钟',
        task: '画出一份可落地的主题集群地图'
      },
      {
        number: 10,
        title: '程序化 SEO 与内容规模化',
        summary: '判断哪些页面适合规模化，设计模板、数据与质量门槛。',
        duration: '67 分钟',
        task: '设计一组 50 页的程序化 SEO 小实验'
      },
      {
        number: 11,
        title: '外链、数字 PR 与权威建设',
        summary: '用可被引用的资产和精准外联累积站点信任。',
        duration: '56 分钟',
        task: '完成一份 30 个目标的外联清单'
      },
      {
        number: 12,
        title: '90 天 SEO 增长项目',
        summary: '将诊断、内容、技术和权威建设整合成可追踪的计划。',
        duration: '72 分钟',
        task: '提交你的 90 天 SEO 路线图'
      }
    ],
    updates: [
      '主题集群规划模板',
      '程序化 SEO 立项表',
      '内容质量门槛清单',
      '外链外联邮件模板',
      'SEO 实验记录表',
      '90 天增长路线图',
      '月度 SEO 汇报看板'
    ]
  }
]

export const courseStats = {
  lessons: seoCourseModules.reduce((total, module) => total + module.lessons.length, 0),
  updates: seoCourseModules.reduce((total, module) => total + module.updates.length, 0),
  tasks: seoCourseModules.reduce(
    (total, module) => total + module.lessons.filter(lesson => Boolean(lesson.task)).length,
    0
  )
}

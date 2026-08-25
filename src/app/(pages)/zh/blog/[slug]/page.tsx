import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ChevronLeftIcon } from 'lucide-react'

import CTASection from '@/components/blocks/cta/cta'
import ContextualBlogCta from '@/components/blog/contextual-blog-cta'
import TableOfContents from '@/components/blog/table-of-contents'
import MDXContent from '@/components/mdx-content'
import SectionSeparator from '@/components/section-separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { SecondaryFlowButton } from '@/components/ui/flow-button'
import { Separator } from '@/components/ui/separator'
import { extractHeadings } from '@/lib/extract-headings'
import { getPostBySlug, getPosts } from '@/lib/posts'
import {
  absoluteUrl,
  buildMetadata,
  createBreadcrumbSchema,
  createOrganizationSchema,
  createWebPageSchema,
  createWebsiteSchema
} from '@/lib/seo'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getPosts(undefined, 'zh')
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'zh')
  const englishPost = await getPostBySlug(slug)

  if (!post) return {}

  const postTitle = post.metadata.title ?? 'Meridian 中文博客'
  const postDescription = post.metadata.description ?? '阅读 Meridian 的最新文章。'
  const path = `/zh/blog/${slug}`

  return {
    ...buildMetadata({
      title: `${postTitle} | Meridian`,
      description: postDescription,
      path,
      keywords: post.metadata.keywords,
      alternates: englishPost
        ? {
            canonical: path,
            languages: {
              'en-US': `/blog/${slug}`,
              'zh-CN': path,
              'x-default': `/blog/${slug}`
            }
          }
        : { canonical: path }
    }),
    openGraph: {
      title: `${postTitle} | Meridian`,
      description: postDescription,
      url: absoluteUrl(path),
      type: 'article',
      locale: 'zh_CN',
      alternateLocale: ['en_US'],
      publishedTime: post.metadata.publishedAt,
      modifiedTime: post.metadata.updatedAt ?? post.metadata.publishedAt,
      images: post.metadata.image ? [{ url: absoluteUrl(post.metadata.image), alt: postTitle }] : undefined
    }
  }
}

const ChineseBlogDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'zh')

  if (!post) notFound()

  const { metadata, content } = post
  const postTitle = metadata.title ?? 'Meridian 中文博客'
  const postDescription = metadata.description ?? '阅读 Meridian 的最新文章。'
  const path = `/zh/blog/${slug}`
  const headings = extractHeadings(content)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...createWebPageSchema({ path, title: `${postTitle} | Meridian`, description: postDescription }),
        '@type': 'BlogPosting',
        inLanguage: 'zh-CN',
        headline: postTitle,
        image: metadata.image ? [absoluteUrl(metadata.image)] : undefined,
        datePublished: metadata.publishedAt,
        dateModified: metadata.updatedAt ?? metadata.publishedAt,
        author: metadata.author ? { '@type': 'Person', name: metadata.author.name } : undefined,
        publisher: { '@id': absoluteUrl('/#organization') },
        mainEntityOfPage: { '@id': absoluteUrl(`${path}#webpage`) }
      },
      createOrganizationSchema(),
      createWebsiteSchema(),
      createBreadcrumbSchema([
        { name: '首页', path: '/' },
        { name: '博客', path: '/zh/blog' },
        { name: postTitle, path }
      ]),
      ...(metadata.video
        ? [
            {
              '@type': 'VideoObject',
              name: postTitle,
              description: metadata.video.description ?? postDescription,
              thumbnailUrl: [absoluteUrl(metadata.video.thumbnail)],
              contentUrl: absoluteUrl(metadata.video.url),
              uploadDate: metadata.video.uploadDate ?? metadata.publishedAt,
              duration: metadata.video.duration
            }
          ]
        : [])
    ]
  }

  return (
    <>
      <section lang='zh-CN' className='py-8 sm:py-16'>
        <div className='mx-auto grid w-full max-w-7xl grid-cols-1 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 lg:px-8 xl:grid-cols-[220px_minmax(0,1fr)_260px] xl:gap-10'>
          <aside className='hidden lg:block'>
            <TableOfContents headings={headings} />
          </aside>
          <article className='min-w-0'>
            <Breadcrumb className='mb-6'>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link href='/'>首页</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link href='/zh/blog'>博客</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{metadata.category}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className='mb-6 text-2xl font-semibold md:text-3xl lg:text-4xl'>{postTitle}</h1>
            <p className='text-muted-foreground'>{postDescription}</p>
            <Separator className='my-6' />

            <div className='mb-16 flex flex-wrap items-center justify-between gap-6'>
              <div className='flex items-center gap-2'>
                <Avatar className='size-11.5'>
                  <AvatarImage src={metadata.author?.picture} alt={metadata.author?.name} />
                  <AvatarFallback>{metadata.author?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col text-sm'>
                  <span className='text-muted-foreground mb-1'>作者</span>
                  <Link href='/about' className='font-medium underline-offset-4 hover:underline'>{metadata.author?.name}</Link>
                </div>
              </div>
              <div className='flex flex-col text-sm'>
                <span className='text-muted-foreground mb-1.5'>阅读时间</span>
                <span className='font-medium'>{metadata.readTime}</span>
              </div>
              <div className='flex flex-col text-sm'>
                <span className='text-muted-foreground mb-1.5'>发布日期</span>
                <span className='font-medium'>{new Date(metadata.publishedAt ?? '').toLocaleDateString('zh-CN')}</span>
              </div>
              {metadata.updatedAt && (
                <div className='flex flex-col text-sm'>
                  <span className='text-muted-foreground mb-1.5'>最近更新</span>
                  <span className='font-medium'>{new Date(metadata.updatedAt).toLocaleDateString('zh-CN')}</span>
                </div>
              )}
            </div>

            {(metadata.reviewedBy || metadata.methodology || metadata.disclosure) && (
              <aside className='bg-muted/50 mb-10 rounded-xl border p-5 text-sm leading-6' aria-label='内容可信度说明'>
                <p className='font-semibold'>内容可信度说明</p>
                {metadata.reviewedBy && <p className='mt-2'><span className='text-muted-foreground'>审核：</span>{metadata.reviewedBy.name}{metadata.reviewedBy.role ? `（${metadata.reviewedBy.role}）` : ''}</p>}
                {metadata.methodology && <p className='mt-2'><span className='text-muted-foreground'>方法：</span>{metadata.methodology}</p>}
                {metadata.disclosure && <p className='mt-2'><span className='text-muted-foreground'>利益披露：</span>{metadata.disclosure}</p>}
              </aside>
            )}

            <ContextualBlogCta
              slug={slug}
              topic={metadata.topic}
              locale='zh'
              className='mb-10 xl:hidden'
            />

            <img src={metadata.image} alt={postTitle} className='mb-16 max-h-110 w-full rounded-xl object-cover' />
            <MDXContent source={content} />

            <div className='pt-8 sm:pt-16'>
              <SecondaryFlowButton asChild>
                <Link href='/zh/blog'><ChevronLeftIcon />返回全部文章</Link>
              </SecondaryFlowButton>
            </div>
          </article>
          <div className='hidden xl:block'>
            <ContextualBlogCta slug={slug} topic={metadata.topic} locale='zh' className='sticky top-24' />
          </div>
        </div>
      </section>
      <SectionSeparator />
      <CTASection
        title='想找到最值得优先投入的自然增长渠道？'
        description='预约一次沟通，我们会一起梳理你的搜索、Reddit 与 AI 可见性，并判断最适合的起点。'
        buttonLabel='预约沟通'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}

export default ChineseBlogDetailsPage

'use client'

import { useMemo, useState } from 'react'

import {
  CheckIcon,
  ChevronRightIcon,
  ClipboardIcon,
  FileSearchIcon,
  SearchIcon,
  SlidersHorizontalIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { SeoPrompt } from '@/content/seo-prompts'
import { cn } from '@/lib/utils'

type SeoPromptLibraryProps = {
  prompts: SeoPrompt[]
  categories: readonly string[]
}

const ALL_CATEGORIES = '全部'

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)

      return
    } catch {
      // Fall back for browsers or embedded webviews that block the Clipboard API.
    }
  }

  const textarea = document.createElement('textarea')

  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  const copied = document.execCommand('copy')

  textarea.remove()

  if (!copied) {
    throw new Error('Unable to copy prompt')
  }
}

const SeoPromptLibrary = ({ prompts, categories }: SeoPromptLibraryProps) => {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [selectedId, setSelectedId] = useState(prompts[0]?.id ?? '')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('zh-CN')

    return prompts.filter(prompt => {
      const matchesCategory = activeCategory === ALL_CATEGORIES || prompt.category === activeCategory

      const matchesQuery =
        !normalizedQuery ||
        `${prompt.title} ${prompt.category} ${prompt.summary} ${prompt.prompt}`
          .toLocaleLowerCase('zh-CN')
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, prompts, query])

  const selectedPrompt = filteredPrompts.find(prompt => prompt.id === selectedId) ?? filteredPrompts[0]

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setCopiedId(null)

    if (window.matchMedia('(max-width: 1023px)').matches) {
      window.setTimeout(() => {
        document.querySelector('#prompt-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
  }

  const handleCopy = async (prompt: SeoPrompt) => {
    await copyToClipboard(prompt.prompt)
    setCopiedId(prompt.id)
    window.setTimeout(() => setCopiedId(currentId => (currentId === prompt.id ? null : currentId)), 1800)
  }

  const clearFilters = () => {
    setQuery('')
    setActiveCategory(ALL_CATEGORIES)
  }

  return (
    <section id='prompt-library' className='scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 space-y-3'>
          <Badge variant='outline' className='h-auto gap-1.5 px-3 py-1 text-sm font-normal'>
            <SlidersHorizontalIcon /> Prompt 工作台
          </Badge>
          <div className='flex flex-col justify-between gap-3 md:flex-row md:items-end'>
            <div>
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>找到任务，复制，直接执行</h2>
              <p className='text-muted-foreground mt-2 max-w-2xl leading-7'>
                按工作流筛选，或搜索关键词、工具与问题。每条 Prompt 都保留完整输入、执行规则和交付格式。
              </p>
            </div>
            <p className='text-muted-foreground shrink-0 text-sm'>
              当前显示 {filteredPrompts.length} / {prompts.length} 条
            </p>
          </div>
        </div>

        <div className='bg-background/95 sticky top-16 z-30 -mx-4 mb-6 border-y px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:rounded-2xl lg:border lg:p-4'>
          <div className='relative'>
            <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2' />
            <Input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder='搜索：Schema、内容衰退、网站迁移、GSC…'
              aria-label='搜索 SEO Prompt'
              className='bg-background h-11 pl-10'
            />
          </div>

          <div className='mt-3 flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden'>
            {[ALL_CATEGORIES, ...categories].map(category => {
              const count =
                category === ALL_CATEGORIES
                  ? prompts.length
                  : prompts.filter(prompt => prompt.category === category).length

              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type='button'
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCategory(category)
                    setCopiedId(null)
                  }}
                  className={cn(
                    'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
                    isActive
                      ? 'border-foreground bg-foreground text-background'
                      : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {category}
                  <span className={cn('tabular-nums', isActive ? 'text-background/65' : 'text-muted-foreground/70')}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {selectedPrompt ? (
          <div className='grid items-start gap-6 lg:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.55fr)]'>
            <aside className='bg-card/70 overflow-hidden rounded-2xl border lg:sticky lg:top-22'>
              <div className='flex items-center justify-between border-b px-4 py-3'>
                <p className='text-sm font-medium'>Prompt 目录</p>
                <Badge variant='secondary'>{filteredPrompts.length}</Badge>
              </div>
              <div className='max-h-80 overflow-y-auto p-2 lg:max-h-[calc(100vh-10rem)]'>
                {filteredPrompts.map(prompt => {
                  const isSelected = selectedPrompt.id === prompt.id

                  return (
                    <button
                      key={prompt.id}
                      type='button'
                      onClick={() => handleSelect(prompt.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        'group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors',
                        isSelected ? 'bg-foreground text-background' : 'hover:bg-muted'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 font-mono text-xs tabular-nums',
                          isSelected ? 'text-background/60' : 'text-muted-foreground'
                        )}
                      >
                        {prompt.id}
                      </span>
                      <span className='min-w-0 flex-1'>
                        <span className='block text-sm leading-5 font-medium'>{prompt.title}</span>
                        <span
                          className={cn(
                            'mt-1 block text-xs',
                            isSelected ? 'text-background/60' : 'text-muted-foreground'
                          )}
                        >
                          {prompt.category}
                        </span>
                      </span>
                      <ChevronRightIcon
                        className={cn(
                          'mt-0.5 size-4 shrink-0 transition-transform group-hover:translate-x-0.5',
                          isSelected ? 'text-background/65' : 'text-muted-foreground'
                        )}
                      />
                    </button>
                  )
                })}
              </div>
            </aside>

            <article
              id='prompt-detail'
              className='bg-card scroll-mt-36 overflow-hidden rounded-2xl border shadow-sm lg:scroll-mt-24'
            >
              <header className='border-b p-5 sm:p-7'>
                <div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='min-w-0'>
                    <div className='mb-3 flex flex-wrap items-center gap-2'>
                      <Badge className='font-mono'>{selectedPrompt.id}</Badge>
                      <Badge variant='outline'>{selectedPrompt.category}</Badge>
                    </div>
                    <h3 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{selectedPrompt.title}</h3>
                    <p className='text-muted-foreground mt-3 max-w-3xl leading-7'>{selectedPrompt.summary}</p>
                  </div>
                  <Button className='h-10 shrink-0 px-4' onClick={() => handleCopy(selectedPrompt)}>
                    {copiedId === selectedPrompt.id ? <CheckIcon /> : <ClipboardIcon />}
                    {copiedId === selectedPrompt.id ? '已复制' : '复制 Prompt'}
                  </Button>
                </div>
              </header>

              <div className='bg-muted/25 p-3 sm:p-5'>
                <div className='mb-3 flex items-center justify-between px-1'>
                  <div className='text-muted-foreground flex items-center gap-2 text-xs font-medium tracking-wide uppercase'>
                    <FileSearchIcon className='size-3.5' /> 完整 Prompt
                  </div>
                  <span className='text-muted-foreground text-xs'>先替换 [方括号] 内的变量</span>
                </div>
                <pre className='bg-background max-w-full overflow-x-auto rounded-xl border p-4 font-mono text-[13px] leading-6 break-words whitespace-pre-wrap sm:p-6 sm:text-sm'>
                  {selectedPrompt.prompt}
                </pre>
              </div>
            </article>
          </div>
        ) : (
          <div className='flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center'>
            <FileSearchIcon className='text-muted-foreground mb-4 size-8' />
            <h3 className='text-lg font-semibold'>没有找到匹配的 Prompt</h3>
            <p className='text-muted-foreground mt-2 text-sm'>换一个关键词，或清除当前筛选条件。</p>
            <Button variant='outline' className='mt-5' onClick={clearFilters}>
              清除筛选
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default SeoPromptLibrary

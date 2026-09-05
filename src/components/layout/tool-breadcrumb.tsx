import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { getLocalizedPath, type SiteLang } from '@/lib/language'

const ToolBreadcrumb = ({ currentLabel, lang = 'en' }: { currentLabel: string; lang?: SiteLang }) => (
  <div className='border-b px-4 py-3 sm:px-6 lg:px-8'>
    <div className='mx-auto max-w-7xl'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getLocalizedPath('/', lang)}>{lang === 'zh' ? '首页' : 'Home'}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getLocalizedPath('/tools', lang)}>{lang === 'zh' ? '免费工具' : 'Free tools'}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </div>
)

export default ToolBreadcrumb

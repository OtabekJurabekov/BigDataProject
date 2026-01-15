import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Overview - Classic Models Analytics Dashboard',
  'Comprehensive overview of the Classic Models Analytics Dashboard. Explore 30+ SQL queries, 40+ visualizations, and deep insights into database naming conventions, spelling patterns, and textual characteristics.',
  '/overview',
  [
    'analytics dashboard',
    'data visualization',
    'database analysis',
    'SQL queries',
    'naming conventions',
    'textual patterns',
    'data insights',
  ]
)

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

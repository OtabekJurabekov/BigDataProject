import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Advanced Analytics - Classic Models',
  'Cross-entity analytics and advanced insights combining customer, product, employee, and office data. Discover complex patterns and relationships in the database.',
  '/analytics',
  [
    'advanced analytics',
    'cross-entity analysis',
    'data relationships',
    'complex patterns',
    'comprehensive insights',
  ]
)

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

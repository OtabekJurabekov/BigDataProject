import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Customer Analytics - Classic Models',
  'Deep analysis of customer naming patterns, name lengths, word counts, and textual characteristics. Discover insights into customer data structure and naming conventions.',
  '/customers',
  [
    'customer analytics',
    'customer data analysis',
    'naming patterns',
    'customer insights',
    'data patterns',
  ]
)

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

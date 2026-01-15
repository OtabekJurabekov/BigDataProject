import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Product Analytics - Classic Models',
  'Comprehensive product name analysis including length distribution, word counts, starting characters, patterns, and vendor information. Explore product naming conventions.',
  '/products',
  [
    'product analytics',
    'product name analysis',
    'naming conventions',
    'product patterns',
    'vendor analysis',
  ]
)

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

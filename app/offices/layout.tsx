import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Office Analytics - Classic Models',
  'Geographic analysis of office locations including city name lengths, address characteristics, and location patterns across the Classic Models database.',
  '/offices',
  [
    'office analytics',
    'geographic analysis',
    'location data',
    'city analysis',
    'address patterns',
  ]
)

export default function OfficesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

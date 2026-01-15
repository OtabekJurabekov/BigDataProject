import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Dashboard - Classic Models Analytics',
  'Comprehensive dashboard with real-time analytics, interactive visualizations, and insights into Classic Models database patterns. Explore country names, customer data, products, and more.',
  '/dashboard',
  [
    'analytics dashboard',
    'data visualization',
    'real-time analytics',
    'database insights',
    'business intelligence',
  ]
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

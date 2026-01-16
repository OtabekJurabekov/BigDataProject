import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import OverviewPage from './overview/page'

// Root page metadata - canonical URL points to root
export const metadata: Metadata = generatePageMetadata(
  'Classic Models Analytics Dashboard',
  'Comprehensive data analytics platform exploring naming conventions, spelling patterns, and textual characteristics within the Classic Models database. 30+ SQL queries, 40+ visualizations, and deep insights into database patterns.',
  '', // Empty path means root URL
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

// Root page renders overview content directly (no redirect)
// This ensures Google can index the root URL properly
export default function Home() {
  return <OverviewPage />
}

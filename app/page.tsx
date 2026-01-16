'use client'

// Root page renders overview content directly (no redirect)
// This ensures Google can index the root URL properly
import OverviewPage from './overview/page'

export default function Home() {
  return <OverviewPage />
}

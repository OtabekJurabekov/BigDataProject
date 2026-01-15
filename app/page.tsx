import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Since root redirects to /overview, set canonical to /overview
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://bigdata.ilmora.uz/overview',
  },
  robots: {
    index: false, // Don't index the redirect page
    follow: true,
  },
}

// Server-side redirect to /overview
export default function Home() {
  redirect('/overview')
}

import { Metadata } from 'next'

const siteUrl = 'https://bigdata.ilmora.uz'
const siteName = 'Classic Models Analytics Dashboard'
const defaultDescription = 'Comprehensive data analytics platform exploring naming conventions, spelling patterns, and textual characteristics within the Classic Models database. 30+ SQL queries, 40+ visualizations, and deep insights into database patterns.'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'data analytics',
    'database analysis',
    'SQL queries',
    'data visualization',
    'naming conventions',
    'textual patterns',
    'Classic Models',
    'MySQL analytics',
    'business intelligence',
    'data insights',
    'database patterns',
    'analytics dashboard',
    'data science',
    'big data',
    'data mining',
  ],
  authors: [{ name: 'Otabek Jurabekov' }],
  creator: 'Otabek Jurabekov',
  publisher: 'Otabek Jurabekov',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/favicon.png`,
        width: 48,
        height: 48,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: [`${siteUrl}/favicon.png`],
    creator: '@OtabekJurabekov',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: 'your-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  keywords?: string[]
): Metadata {
  const url = `${siteUrl}${path}`
  
  return {
    title,
    description,
    keywords: keywords || defaultMetadata.keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

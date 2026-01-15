import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Classic Models Analytics Dashboard',
    short_name: 'Classic Models',
    description: 'Comprehensive data analytics platform exploring naming conventions, spelling patterns, and textual characteristics within the Classic Models database',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/favicon.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  }
}

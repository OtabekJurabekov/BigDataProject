import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bigdata.ilmora.uz'
  const currentDate = new Date().toISOString()

  const routes = [
    '',
    '/overview',
    '/dashboard',
    '/customers',
    '/products',
    '/employees',
    '/offices',
    '/analytics',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' || route === '/overview' ? 1.0 : 0.8,
  }))
}

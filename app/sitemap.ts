import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jerukmanis.web.id',
      lastModified: new Date(),
    }
  ]
}
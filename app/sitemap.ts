import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jerukmanis.web.id'

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/layanan/event-organizer`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/layanan/visual-documentation`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/layanan/creative-branding`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/layanan/undangan-digital`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/layanan/software-web`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/layanan/professional-live-streaming`, lastModified: new Date(), priority: 0.8 },
  ]
}
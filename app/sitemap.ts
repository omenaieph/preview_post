import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://previewpost.tool' // Note: User should update this to their actual domain

    const routes = [
        '',
        '/youtube',
        '/linkedin',
        '/tiktok',
        '/x',
        '/instagram',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://preview-post.com',
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml', '/robots.txt'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://preview-post.com/sitemap.xml',
    ],
  },
}



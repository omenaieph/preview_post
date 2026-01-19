/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://preview-post.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://preview-post.com/sitemap.xml',
    ],
  },
}

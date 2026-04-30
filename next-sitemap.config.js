/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://top-clancy-protocol.vercel.app";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  autoLastmod: true,
  exclude: [
    "/api/*",
    "/admin/*",
    "/classified",
    "/_not-found",
    "/opengraph-image",
    "/*/opengraph-image",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/classified"],
      },
    ],
  },
  transform: async (config, path) => {
    const isHomepage = path === "/";
    const isEvidenceIndex = path === "/expedientes";
    const isEvidenceDetail = path.startsWith("/expedientes/");

    let priority = 0.7;
    let changefreq = "weekly";

    if (isHomepage) {
      priority = 1.0;
      changefreq = "daily";
    } else if (isEvidenceIndex) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (isEvidenceDetail) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path === "/consola" || path === "/learn") {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/login" || path === "/smuggler") {
      priority = 0.5;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

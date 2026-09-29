import type { MetadataRoute } from "next";

const SITE = "https://stampchapters.com"; // TODO: replace with the real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}

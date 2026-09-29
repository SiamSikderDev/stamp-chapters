import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";

const SITE = "https://stampchapters.com"; // TODO: replace with the real domain

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/contact", "/privacy", "/terms", "/guides"];
  const entries: MetadataRoute.Sitemap = pages.map((p, i) => ({
    url: `${SITE}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: i === 0 ? 1 : 0.7,
  }));
  for (const g of guides) {
    entries.push({
      url: `${SITE}/guides/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  return entries;
}

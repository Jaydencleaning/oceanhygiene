import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { pages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" || page.path === "/offerte-aanvragen" ? 1 : 0.8,
  }));
}

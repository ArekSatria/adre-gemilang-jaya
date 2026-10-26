import type { MetadataRoute } from "next";
import { getActiveDivisions, getNewsCatalog } from "@/lib/api/client";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://adregemilang.co.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [divisions, newsCatalog] = await Promise.all([
    getActiveDivisions(),
    getNewsCatalog(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date("2026-12-05"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/teams`,
      lastModified: new Date("2026-12-05"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/matches`,
      lastModified: new Date("2026-12-05"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date("2026-12-05"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/partners`,
      lastModified: new Date("2026-12-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-12-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-12-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const divisionRoutes: MetadataRoute.Sitemap = divisions.map((div) => ({
    url: `${BASE_URL}/teams/${div.slug}`,
    lastModified: new Date("2026-12-05"),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsCatalog.items.map(
    (article) => ({
      url: `${BASE_URL}/news/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...divisionRoutes, ...newsRoutes];
}

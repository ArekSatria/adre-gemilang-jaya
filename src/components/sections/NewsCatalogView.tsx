"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import type { getNewsCatalog } from "@/lib/api/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { filterNewsByCategory } from "@/lib/utils/news-helpers";
import { cn } from "@/lib/utils/cn";

type NewsCatalogData = Awaited<ReturnType<typeof getNewsCatalog>>;

interface NewsCatalogViewProps {
  data: NewsCatalogData;
}

export function NewsCatalogView({ data }: NewsCatalogViewProps) {
  const { locale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredArticles = useMemo(() => {
    return filterNewsByCategory(data.items, selectedCategory);
  }, [data.items, selectedCategory]);

  const formatPublishDate = (iso: string) => {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman Berita */}
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.newsPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.newsPage.subtitle}
        </p>
      </div>

      {/* Bar Filter Kategori Berita (Client-Side Filtering - PBI-10) */}
      <div
        role="group"
        aria-label="Filter Kategori Berita"
        className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-6"
      >
        <button
          type="button"
          onClick={() => setSelectedCategory("ALL")}
          className={cn(
            "cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
            selectedCategory === "ALL"
              ? "bg-brand text-background"
              : "bg-surface text-slate-300 hover:text-foreground",
          )}
        >
          {t.newsPage.filterAllCategories}
        </button>

        {data.categories.map((cat) => {
          const active = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                "cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
                active
                  ? "bg-brand text-background"
                  : "bg-surface text-slate-300 hover:text-foreground",
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Grid Kartu Editorial Berita */}
      {filteredArticles.length === 0 ? (
        <div className="py-12 text-center text-sm text-slate-300">
          {t.newsPage.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-surface p-6 transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                  <span className="font-semibold text-brand">
                    {article.category.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span>{formatPublishDate(article.publishedAt)}</span>
                    <span>
                      {article.readingTimeMinutes} {t.newsPage.readTimeUnit}
                    </span>
                  </div>
                </div>

                <h2 className="mt-3 font-display text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                  {article.title}
                </h2>

                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-300">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 text-xs font-semibold text-brand">
                <span>{t.newsPage.readMore}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

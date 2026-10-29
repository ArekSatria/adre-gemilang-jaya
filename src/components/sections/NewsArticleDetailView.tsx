"use client";

import React from "react";
import Link from "next/link";
import type { getNewsBySlug } from "@/lib/api/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translateArticleContent } from "@/lib/utils/corporate-helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";

type NewsDetailData = NonNullable<Awaited<ReturnType<typeof getNewsBySlug>>>;

interface NewsArticleDetailViewProps {
  article: NewsDetailData;
}

export function NewsArticleDetailView({ article }: NewsArticleDetailViewProps) {
  const { locale, t } = useLanguage();

  const localizedArticle = translateArticleContent(article, locale);
  const localizedRelated = article.relatedNews.map((item) =>
    translateArticleContent(item, locale),
  );

  const formatPublishDate = (iso: string) => {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl space-y-8">
        <Link
          href="/news"
          className="inline-block text-xs font-semibold text-slate-300 transition-colors hover:text-brand"
        >
          {t.newsPage.backToNews}
        </Link>

        <header className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="rounded bg-brand/15 px-2.5 py-1 font-semibold text-brand uppercase">
              {localizedArticle.category.name}
            </span>
            <span>{formatPublishDate(localizedArticle.publishedAt)}</span>
            <span>
              {localizedArticle.readingTimeMinutes} {t.newsPage.readTimeUnit}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {localizedArticle.title}
          </h1>

          <p className="text-xs font-medium text-slate-300">
            {t.newsPage.publishedBy}{" "}
            <span className="font-semibold text-foreground">
              {localizedArticle.author.name}
            </span>
          </p>
        </header>

        <div
          className="space-y-5 text-base leading-relaxed text-slate-200 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-foreground [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-brand"
          dangerouslySetInnerHTML={{
            __html: localizedArticle.contentHtml || article.contentHtml,
          }}
        />
      </article>

      {localizedRelated.length > 0 && (
        <section className="space-y-6 border-t border-white/10 pt-12">
          <SectionHeading title={t.newsPage.relatedHeading} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {localizedRelated.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex flex-col justify-between rounded-2xl bg-surface p-6 transition-transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-brand">
                      {item.category.name}
                    </span>
                    <span>
                      {item.readingTimeMinutes} {t.newsPage.readTimeUnit}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-lg font-bold text-foreground transition-colors group-hover:text-brand">
                    {item.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-5 text-xs font-semibold text-brand">
                  <span>{t.newsPage.readMore}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

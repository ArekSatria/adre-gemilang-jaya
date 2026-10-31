"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translateArticleContent } from "@/lib/utils/corporate-helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";

export interface ArticleCategoryInfo {
  id?: string;
  name: string;
  slug: string;
}

export interface ArticleAuthorInfo {
  name: string;
  role?: string;
  avatarUrl?: string | null;
}

export interface ArticleSummaryItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes?: number;
  readTimeMinutes?: number;
  category: ArticleCategoryInfo;
}

export interface ArticleDetailItem extends ArticleSummaryItem {
  author?: ArticleAuthorInfo;
  content?: string | string[];
  body?: string | string[];
  contentParagraphs?: string[];
}

interface NewsArticleDetailViewProps {
  article: ArticleDetailItem;
  relatedArticles?: ArticleSummaryItem[];
}

export function NewsArticleDetailView({
  article,
  relatedArticles = [],
}: NewsArticleDetailViewProps) {
  const { locale, t } = useLanguage();

  const localizedArticle = translateArticleContent(article, locale);
  const localizedRelated = relatedArticles
    .filter(
      (item) =>
        item.slug !== article.slug &&
        item.category.slug !== "corporate" &&
        item.category.name.toLowerCase() !== "korporasi",
    )
    .slice(0, 2)
    .map((item) => translateArticleContent(item, locale));

  const rawContent =
    localizedArticle.contentParagraphs ??
    localizedArticle.content ??
    localizedArticle.body ??
    [];

  const paragraphs: string[] = Array.isArray(rawContent)
    ? rawContent
    : typeof rawContent === "string"
      ? rawContent.split("\n\n").filter(Boolean)
      : [localizedArticle.excerpt];

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <div className="mx-auto max-w-4xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Link
          href="/news"
          className="inline-block text-xs font-semibold text-slate-400 hover:text-brand"
        >
          {t.newsPage.backToNews}
        </Link>

        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="inline-block rounded-md border border-brand/40 bg-brand/15 px-3 py-1 font-mono font-bold text-brand uppercase">
              {localizedArticle.category.name}
            </span>
            <span className="font-mono">
              {formatDate(localizedArticle.publishedAt)}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {localizedArticle.title}
          </h1>

          {localizedArticle.author && (
            <p className="text-xs text-slate-400">
              {t.newsPage.publishedBy}{" "}
              <span className="font-semibold text-slate-200">
                {localizedArticle.author.name}
              </span>
            </p>
          )}
        </div>
      </div>

      <article className="space-y-6">
        {paragraphs.map((paragraph: string, index: number) => (
          <p
            key={index}
            className="text-base leading-relaxed text-slate-200 sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </article>

      {localizedRelated.length > 0 && (
        <section className="space-y-6 border-t border-white/10 pt-12">
          <SectionHeading title={t.newsPage.relatedHeading} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {localizedRelated.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-brand"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-brand uppercase">
                      {item.category.name}
                    </span>
                    <span className="font-mono">
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-brand">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3 text-xs font-bold text-brand uppercase">
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

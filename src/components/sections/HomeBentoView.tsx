"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomePayload } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import * as mockData from "@/lib/api/mock-data";
import {
  CORPORATE_PARTNERS_DATA,
  translateArticleContent,
  translateMatchStage,
} from "@/lib/utils/corporate-helpers";
import { formatMatchScoreDisplay } from "@/lib/utils/match-helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";

interface HomeBentoViewProps {
  data: HomePayload;
}

export function HomeBentoView({ data }: HomeBentoViewProps) {
  const { locale, t } = useLanguage();

  const allMatches = mockData.mockMatchesPayload.items;
  const upcomingMatches = allMatches.filter((m) => m.status === "UPCOMING");
  const completedMatches = allMatches.filter((m) => m.status === "COMPLETED");

  const localizedNews = data.latestNews.map((item) =>
    translateArticleContent(item, locale),
  );

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <div className="space-y-16 pb-20">
      {/* 1. FOTO TIM UTAMA (BERSIH TANPA TEKS ATAU TOMBOL YANG MENINDIH) */}
      <section className="w-full border-b border-white/10 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface sm:aspect-[21/9]">
            <Image
              src="/images/team-hero.svg"
              alt="Skuad PT Adre Gemilang Jaya"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* 2. PARTNERS */}
        <section className="space-y-6">
          <SectionHeading
            title={t.homeBigetron.partnersSectionTitle}
            subtitle={t.homeBigetron.partnersSectionSub}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CORPORATE_PARTNERS_DATA.map((partner) => (
              <Link
                key={partner.id}
                href="/partners"
                className="group flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6 transition-colors hover:border-brand"
              >
                <div>
                  <span className="text-xs font-semibold text-brand uppercase">
                    {partner.tierLabel}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-foreground group-hover:text-brand">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    {partner.category[locale]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. UPCOMING MATCHES */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              title={t.homeBigetron.upcomingTitle}
              subtitle={t.homeBigetron.upcomingSub}
            />
            <Link
              href="/matches"
              className="text-xs font-bold text-brand uppercase hover:underline"
            >
              {t.homeBigetron.viewAllMatches}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-brand uppercase">
                      {match.division.name}
                    </span>
                    <span className="font-mono text-slate-300">
                      {formatDate(match.scheduledAt)}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground">
                    {match.tournamentName}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {translateMatchStage(match.stage, locale)}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-xs font-bold text-brand uppercase">
                    {t.matchesPage.upcomingBadge}
                  </span>
                  {match.streamUrl && (
                    <SmartLink
                      href={match.streamUrl}
                      className="text-xs font-bold text-foreground hover:text-brand"
                    >
                      {t.homeBigetron.watchStream}
                    </SmartLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. DIVISION */}
        <section className="space-y-6">
          <SectionHeading
            title={t.homeBigetron.divisionTitle}
            subtitle={t.homeBigetron.divisionSub}
          />

          <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold text-brand uppercase">
                  {t.homeBigetron.divisionBadge}
                </span>
                <h3 className="font-display text-3xl font-bold text-foreground">
                  PUBG MOBILE
                </h3>
                <p className="text-xs font-semibold text-slate-300">
                  {t.homeBigetron.divisionMeta}
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  {locale === "id"
                    ? "Tim PUBG Mobile PT Adre Gemilang Jaya di Jakarta yang diperkuat oleh 4 pemain inti, 1 manajer tim, dan 2 staf pelatih."
                    : "PT Adre Gemilang Jaya's PUBG Mobile team in Jakarta featuring 4 core players, 1 team manager, and 2 coaching staff."}
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/teams/pubg-mobile"
                  className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
                >
                  {t.homeBigetron.exploreDivisionBtn}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. NEWS & EVENTS */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              title={t.homeBigetron.newsTitle}
              subtitle={t.homeBigetron.newsSub}
            />
            <Link
              href="/news"
              className="text-xs font-bold text-brand uppercase hover:underline"
            >
              {t.homeBigetron.viewAllNews}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {localizedNews.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6 transition-colors hover:border-brand"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-brand uppercase">
                      {article.category.name}
                    </span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground group-hover:text-brand">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-3 text-xs font-bold text-brand uppercase">
                  {t.newsPage.readMore}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. MATCH RESULTS */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              title={t.homeBigetron.resultsTitle}
              subtitle={t.homeBigetron.resultsSub}
            />
            <Link
              href="/matches"
              className="text-xs font-bold text-brand uppercase hover:underline"
            >
              {t.homeBigetron.viewAllMatches}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {completedMatches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6 sm:flex-row sm:items-center"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="font-bold text-brand uppercase">
                      {match.division.name}
                    </span>
                    <span>{formatDate(match.scheduledAt)}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {match.tournamentName}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {translateMatchStage(match.stage, locale)}
                  </p>
                </div>

                <div className="mt-4 shrink-0 sm:mt-0">
                  <span className="inline-block rounded-lg bg-brand/15 px-4 py-2 font-mono text-sm font-bold text-brand">
                    {formatMatchScoreDisplay(match, t.homeBigetron.pointsUnit)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

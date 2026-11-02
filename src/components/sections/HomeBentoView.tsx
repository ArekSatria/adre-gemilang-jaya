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
import { PartnerLogoGraphic } from "@/components/ui/BrandElements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils/cn";

interface HomeBentoViewProps {
  data: HomePayload;
}

export function HomeBentoView({ data }: HomeBentoViewProps) {
  const { locale, t } = useLanguage();

  const upcomingMatches = data.nextMatch ? [data.nextMatch] : [];
  const completedMatches = data.recentResults || [];

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
      {/* 1. FOTO TIM UTAMA */}
      <section className="w-full border-b border-white/10 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface sm:aspect-[21/9]">
            <Image
              src={data.hero?.heroImageUrl || "/images/team-hero.svg"}
              alt="Skuad PT Adre Gemilang Jaya"
              fill
              unoptimized
              priority
              fetchPriority="high"
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* 2. MITRA RESMI (5 CARD PERSEGI, HANYA LOGO MEMENUHI CARD TANPA TEKS) */}
        <section className="space-y-5">
          <SectionHeading title={t.home.partnersSectionTitle} />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {(data.partnersStrip && data.partnersStrip.length > 0 ? data.partnersStrip : CORPORATE_PARTNERS_DATA).map((partner) => (
              <Link
                key={partner.id}
                href="/partners"
                aria-label={partner.name}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:border-brand"
              >
                <PartnerLogoGraphic
                  partnerId={partner.id}
                  name={partner.name}
                  logoUrl={partner.logoUrl}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* 3. JADWAL PERTANDINGAN */}
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <SectionHeading title={t.home.upcomingTitle} />
            <Link
              href="/matches"
              className="text-xs font-bold text-brand uppercase hover:underline"
            >
              {t.home.viewAllMatches}
            </Link>
          </div>

          {upcomingMatches.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-surface p-8 text-center text-sm text-slate-400">
              {t.matchesPage.emptyState}
            </div>
          ) : (
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
                    <span
                      className={cn(
                        "font-mono text-xs font-bold uppercase inline-flex items-center gap-1.5",
                        match.status === "LIVE" ? "text-rose-500" : "text-brand",
                      )}
                    >
                      {match.status === "LIVE" && (
                        <span className="inline-block h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                      {match.status === "LIVE" ? "LIVE" : t.matchesPage.upcomingBadge}
                    </span>
                    {match.streamUrl && (
                      <SmartLink
                        href={match.streamUrl}
                        className="text-xs font-bold text-foreground hover:text-brand"
                      >
                        {t.home.watchStream}
                      </SmartLink>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. DIVISI KAMI */}
        <section className="space-y-5">
          <SectionHeading title={t.home.divisionTitle} />

          {data.activeDivisions && data.activeDivisions.length > 0 ? (
            <div
              className={cn(
                "grid gap-6",
                data.activeDivisions.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              )}
            >
              {data.activeDivisions.map((division) => (
                <div
                  key={division.id}
                  className="group relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface"
                >
                  <div className="pointer-events-none absolute inset-0">
                    <Image
                      src={division.bannerImageUrl || "/images/pubg-logo-bg.svg"}
                      alt={division.name}
                      fill
                      unoptimized
                      sizes="(max-width: 1280px) 100vw, 640px"
                      className="object-cover object-center opacity-80 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-background/85" />
                  </div>

                  <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div className="space-y-2">
                      {division.shortCode && (
                        <span className="inline-block rounded-md border border-brand/40 bg-brand/15 px-3 py-1 font-mono text-xs font-bold tracking-wider text-brand uppercase">
                          {division.shortCode}
                        </span>
                      )}
                      <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase">
                        {division.name}
                      </h3>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Link
                        href={`/teams/${division.slug}`}
                        className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
                      >
                        {t.home.exploreDivisionBtn}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-surface p-12 text-center text-sm text-slate-400">
              Belum ada divisi yang aktif.
            </div>
          )}
        </section>

        {/* 5. BERITA & KEGIATAN */}
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <SectionHeading title={t.home.newsTitle} />
            <Link
              href="/news"
              className="text-xs font-bold text-brand uppercase hover:underline"
            >
              {t.home.viewAllNews}
            </Link>
          </div>

          {localizedNews.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-surface p-8 text-center text-sm text-slate-400">
              {t.newsPage.emptyState}
            </div>
          ) : (
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
          )}
        </section>

        {/* 6. HASIL PERTANDINGAN */}
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <SectionHeading title={t.home.resultsTitle} />
            <Link
              href="/matches"
              className="text-xs font-bold text-brand uppercase hover:underline"
            >
              {t.home.viewAllMatches}
            </Link>
          </div>

          {completedMatches.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-surface p-8 text-center text-sm text-slate-400">
              {t.matchesPage.emptyState}
            </div>
          ) : (
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
                      {formatMatchScoreDisplay(match, t.home.pointsUnit)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

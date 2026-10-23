"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Users, Radio } from "lucide-react";
import type { HomePayload } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";

interface HomeBentoViewProps {
  data: HomePayload;
}

export function HomeBentoView({ data }: HomeBentoViewProps) {
  const { locale, t } = useLanguage();

  const formatMatchDate = (iso: string) => {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(iso));
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface p-6 sm:p-10 lg:col-span-8">
              <div className="relative z-10 space-y-5">
                <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl lg:leading-[1.08]">
                  {t.hero.titleLine1}{" "}
                  <span className="text-brand">{t.hero.titleHighlight}</span>{" "}
                  <span className="block text-foreground/95">
                    {t.hero.titleLine2}
                  </span>
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {t.hero.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/teams/pubg-mobile"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
                  >
                    <span>{t.hero.primaryCta}</span>
                  </Link>
                  <Link
                    href="/matches"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-elevated px-5 py-3 text-xs font-bold text-foreground uppercase transition-colors hover:border-brand/60"
                  >
                    <Calendar className="h-4 w-4 text-brand" />
                    <span>{t.hero.secondaryCta}</span>
                  </Link>
                </div>
              </div>

              {/* 3 Statistik Konkret Tanpa Kartu */}
              <div className="relative z-10 mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                <div>
                  <p className="font-display text-2xl font-bold text-brand">
                    #1
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300">
                    PMNC Indonesia 2026
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-brand">
                    148
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Rekor Poin Final
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-brand">
                    6
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Total Anggota Skuad
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom Samping: Next Match & Active Division */}
            <div className="flex flex-col gap-6 lg:col-span-4">
              {/* Kartu Jadwal Turnamen Terdekat & Tonton Siaran */}
              <div className="flex flex-1 flex-col justify-between rounded-2xl bg-surface p-6">
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-wider text-brand uppercase">
                    {t.hero.nextMatchHeader}
                  </span>
                  {data.nextMatch && (
                    <div className="space-y-2">
                      <p className="font-display text-xl font-bold leading-snug text-foreground">
                        {data.nextMatch.tournamentName}
                      </p>
                      <p className="text-xs font-medium text-slate-300">
                        {data.nextMatch.matchLabel.replace("—", "")}
                      </p>
                      <div className="flex items-center gap-2 rounded-lg bg-background/60 px-3 py-2 text-xs text-slate-200">
                        <Calendar className="h-4 w-4 shrink-0 text-brand" />
                        <span>
                          {formatMatchDate(data.nextMatch.scheduledAt)} WIB
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {data.nextMatch?.streamUrl && (
                  <div className="pt-5">
                    <SmartLink
                      href={data.nextMatch.streamUrl}
                      className=" flex w-full items-center justify-center gap-2.5 rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 font-display text-xs font-bold tracking-wider text-brand uppercase transition-colors hover:bg-brand hover:text-background"
                    >
                      <Radio className="h-4 w-4 shrink-0" />
                      <span>{t.hero.liveStreamBtn}</span>
                    </SmartLink>
                  </div>
                )}
              </div>

              {/* Kartu Divisi Aktif */}
              <div className="flex flex-1 flex-col justify-between rounded-2xl bg-surface p-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    {t.hero.activeDivisionHeader}
                  </span>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {data.divisionQuickCard.name}
                  </h2>
                  <p className="text-xs font-medium text-brand">
                    {t.hero.rosterStatus.replace("•", "/")}
                  </p>
                </div>

                <Link
                  href={`/teams/${data.divisionQuickCard.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-elevated px-4 py-3 text-xs font-semibold text-foreground transition-colors hover:border-brand"
                >
                  <Users className="h-4 w-4 text-brand" />
                  <span>{t.hero.viewRosterBtn}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-surface/80 px-6 py-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-xs font-semibold text-slate-300 uppercase">
              {t.homeSections.partnersLabel}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {data.partnersStrip.map((partner) => (
                <Link
                  key={partner.id}
                  href="/partners"
                  className="rounded-lg bg-elevated/70 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-foreground"
                >
                  {partner.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.homeSections.matchesTitle}
          subtitle={t.homeSections.matchesSub}
          actionLabel={t.homeSections.viewAllMatches}
          actionHref="/matches"
        />

        <div className="mt-6 divide-y divide-white/5 border-y border-white/5">
          {data.upcomingMatches.map((match) => (
            <div
              key={match.id}
              className="flex flex-col justify-between gap-3 py-4 transition-colors hover:bg-surface/40 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="font-semibold text-brand">
                    {match.division.name}
                  </span>
                  <span>{formatMatchDate(match.scheduledAt)} WIB</span>
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-foreground">
                  {match.tournamentName}{" "}
                  {match.tournamentStage.replace("-", "")}
                </h3>
              </div>

              <div>
                {match.status === "COMPLETED" && match.result ? (
                  <span className="rounded bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                    {match.result.placementBadge} ({match.result.totalPoints}{" "}
                    PTS)
                  </span>
                ) : (
                  <span className="rounded bg-warning/10 px-2.5 py-1 text-xs font-semibold text-warning">
                    UPCOMING
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.homeSections.newsTitle}
          subtitle={t.homeSections.newsSub}
          actionLabel={t.homeSections.viewAllNews}
          actionHref="/news"
        />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.latestNews.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-surface p-6 transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-brand">
                    {article.category.name}
                  </span>
                  <span>
                    {article.readingTimeMinutes} {t.homeSections.readTime}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 text-xs font-semibold text-brand">
                <span>Baca selengkapnya →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

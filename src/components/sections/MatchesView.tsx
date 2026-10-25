"use client";

import React, { useState, useMemo } from "react";
import { Calendar, Radio } from "lucide-react";
import type { MatchesPayload, MatchItem } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  filterMatches,
  formatMatchScoreDisplay,
  type MatchStatusFilter,
} from "@/lib/utils/match-helpers";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils/cn";

interface MatchesViewProps {
  data: MatchesPayload;
}

export function MatchesView({ data }: MatchesViewProps) {
  const { locale, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<MatchStatusFilter>("ALL");
  const [gameFilter, setGameFilter] = useState<string>("ALL");

  const filteredItems = useMemo(() => {
    return filterMatches(data.items, statusFilter, gameFilter);
  }, [data.items, statusFilter, gameFilter]);

  const formatScheduleTime = (iso: string) => {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(iso));
  };

  const renderResultBadge = (match: MatchItem) => {
    if (match.status === "UPCOMING" || !match.result) {
      return (
        <span className="rounded bg-warning/10 px-3 py-1 text-xs font-semibold text-warning uppercase">
          {t.matchesPage.upcomingBadge}
        </span>
      );
    }

    const label = formatMatchScoreDisplay(match, t.matchesPage.pointsUnit);
    const isWin = match.result.outcome === "WIN";

    return (
      <span
        className={cn(
          "rounded px-3 py-1 text-xs font-semibold uppercase",
          isWin ? "bg-success/15 text-success" : "bg-brand/15 text-brand",
        )}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman Matches */}
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.matchesPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.matchesPage.subtitle}
        </p>
      </div>

      {/* Bar Filter Interaktif Client-Side (PBI-09) */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        {/* Filter Status Pertandingan */}
        <div
          role="group"
          aria-label="Filter Status Pertandingan"
          className="flex flex-wrap items-center gap-2"
        >
          {(
            [
              { key: "ALL", label: t.matchesPage.filterStatusAll },
              { key: "UPCOMING", label: t.matchesPage.filterStatusUpcoming },
              { key: "COMPLETED", label: t.matchesPage.filterStatusCompleted },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={cn(
                  "cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "bg-brand text-background"
                    : "bg-surface text-slate-300 hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filter Cabang Divisi Game */}
        <div
          role="group"
          aria-label="Filter Divisi Game"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setGameFilter("ALL")}
            className={cn(
              "cursor-pointer rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              gameFilter === "ALL"
                ? "border-brand text-brand"
                : "border-white/10 text-slate-300 hover:text-foreground",
            )}
          >
            {t.matchesPage.filterGameAll}
          </button>
          {data.availableGames.map((game) => {
            const active = gameFilter === game.slug;
            return (
              <button
                key={game.slug}
                type="button"
                onClick={() => setGameFilter(game.slug)}
                className={cn(
                  "cursor-pointer rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-brand text-brand"
                    : "border-white/10 text-slate-300 hover:text-foreground",
                )}
              >
                {game.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar MatchCommandRow dengan Divide-Y Tanpa Kartu Berlebih (PBI-08) */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center text-sm text-slate-300">
          {t.matchesPage.emptyState}
        </div>
      ) : (
        <div className="divide-y divide-white/5 border-b border-white/5">
          {filteredItems.map((match) => (
            <div
              key={match.id}
              className="flex flex-col justify-between gap-4 py-5 transition-colors hover:bg-surface/40 sm:flex-row sm:items-center"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="font-semibold text-brand">
                    {match.division.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-brand" />
                    <span>{formatScheduleTime(match.scheduledAt)} WIB</span>
                  </span>
                </div>

                <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                  {match.tournamentName}
                </h2>

                <p className="text-sm text-slate-300">
                  {match.matchFormat === "VERSUS" && match.opponentName
                    ? `${match.ourTeamName} vs ${match.opponentName} (${match.tournamentStage})`
                    : `${match.ourTeamName} (${match.tournamentStage.replace("-", "")})`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {renderResultBadge(match)}

                {match.status === "UPCOMING" && match.streamUrl && (
                  <SmartLink
                    href={match.streamUrl}
                    className="inline-flex items-center gap-2 rounded-lg border border-brand/40 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-background"
                  >
                    <Radio className="h-3.5 w-3.5 shrink-0" />
                    <span>{t.matchesPage.watchStream}</span>
                  </SmartLink>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

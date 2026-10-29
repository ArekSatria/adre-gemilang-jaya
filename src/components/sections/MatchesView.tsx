"use client";

import React, { useState, useMemo } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import type { MatchesPayload } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  filterMatches,
  formatMatchScoreDisplay,
  type MatchStatusFilter,
} from "@/lib/utils/match-helpers";
import { translateMatchStage } from "@/lib/utils/corporate-helpers";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils/cn";

interface MatchesViewProps {
  data: MatchesPayload;
}

export function MatchesView({ data }: MatchesViewProps) {
  const { locale, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<MatchStatusFilter>("ALL");

  const filteredMatches = useMemo(() => {
    return filterMatches(data.items, statusFilter, "ALL");
  }, [data.items, statusFilter]);

  const formatScheduleDate = (iso: string) => {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.matchesPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.matchesPage.subtitle}
        </p>
      </div>

      {/* Filter Status Pertandingan */}
      <div
        role="group"
        aria-label="Filter Status Pertandingan"
        className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-6"
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

      {/* Daftar Pertandingan */}
      {filteredMatches.length === 0 ? (
        <div className="py-12 text-center text-sm text-slate-300">
          {t.matchesPage.emptyState}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map((match) => {
            const isCompleted = match.status === "COMPLETED";
            return (
              <div
                key={match.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-white/5 bg-surface p-6 sm:flex-row sm:items-center"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="rounded bg-brand/15 px-2.5 py-1 font-bold text-brand uppercase">
                      {match.division.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-brand" />
                      {formatScheduleDate(match.scheduledAt)}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-foreground">
                    {match.tournamentName}
                  </h2>

                  <p className="text-xs text-slate-300">
                    {translateMatchStage(match.stage, locale)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {isCompleted ? (
                    <span className="rounded-xl bg-brand/15 px-4 py-2 font-mono text-sm font-bold text-brand">
                      {formatMatchScoreDisplay(match, t.matchesPage.pointsUnit)}
                    </span>
                  ) : (
                    <span className="rounded-xl border border-white/10 bg-background/60 px-4 py-2 font-mono text-xs font-bold text-slate-300 uppercase">
                      {t.matchesPage.upcomingBadge}
                    </span>
                  )}

                  {match.streamUrl && (
                    <SmartLink
                      href={match.streamUrl}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-background px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-brand hover:text-brand"
                    >
                      <span>{t.matchesPage.watchStream}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </SmartLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

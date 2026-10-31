"use client";

import React, { useState, useMemo } from "react";
import type { MatchesPayload } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockMatchesPayload } from "@/lib/api/mock-data";
import { formatMatchScoreDisplay } from "@/lib/utils/match-helpers";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils/cn";

type MatchStatusFilter = "ALL" | "UPCOMING" | "COMPLETED";

interface MatchesViewProps {
  data?: MatchesPayload;
  initialData?: MatchesPayload;
}

export function MatchesView({ data, initialData }: MatchesViewProps) {
  const { locale, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<MatchStatusFilter>("ALL");

  const sourceMatches = useMemo(
    () => data?.items ?? initialData?.items ?? mockMatchesPayload.items,
    [data, initialData],
  );

  const filteredMatches = useMemo(() => {
    if (statusFilter === "ALL") return sourceMatches;
    return sourceMatches.filter((match) => match.status === statusFilter);
  }, [sourceMatches, statusFilter]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));

  const filterButtons: { key: MatchStatusFilter; label: string }[] = [
    { key: "ALL", label: t.matchesPage.filterStatusAll },
    { key: "UPCOMING", label: t.matchesPage.filterStatusUpcoming },
    { key: "COMPLETED", label: t.matchesPage.filterStatusCompleted },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman & Tombol Filter (Tanpa Subjudul) */}
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
          {t.matchesPage.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          {filterButtons.map((btn) => {
            const isActive = statusFilter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => setStatusFilter(btn.key)}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-xs font-bold uppercase transition-colors",
                  isActive
                    ? "bg-brand text-background"
                    : "border border-white/10 bg-surface text-slate-300 hover:border-brand hover:text-foreground",
                )}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar Card Pertandingan (Tanpa Teks Minggu/Hari/Babak Liga) */}
      {filteredMatches.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-surface p-12 text-center text-sm text-slate-300">
          {t.matchesPage.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredMatches.map((match) => {
            const isCompleted = match.status === "COMPLETED";

            return (
              <div
                key={match.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-brand/60 sm:p-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="inline-block rounded-md border border-brand/40 bg-brand/15 px-3 py-1 font-mono font-bold text-brand uppercase">
                      {match.division.name}
                    </span>
                    <span className="font-mono text-slate-300">
                      {formatDate(match.scheduledAt)}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {match.tournamentName}
                  </h2>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold uppercase",
                        isCompleted ? "text-slate-300" : "text-brand",
                      )}
                    >
                      {isCompleted
                        ? t.matchesPage.completedBadge
                        : t.matchesPage.upcomingBadge}
                    </span>

                    {isCompleted && (
                      <span className="inline-block rounded-lg bg-brand/15 px-3.5 py-1.5 font-mono text-xs font-bold text-brand">
                        {formatMatchScoreDisplay(
                          match,
                          t.matchesPage.pointsUnit,
                        )}
                      </span>
                    )}
                  </div>

                  {match.streamUrl && (
                    <SmartLink
                      href={match.streamUrl}
                      className="text-xs font-bold text-foreground uppercase transition-colors hover:text-brand"
                    >
                      {t.matchesPage.watchStream}
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

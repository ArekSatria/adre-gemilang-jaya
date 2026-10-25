"use client";

import React from "react";
import Link from "next/link";
import { Users, Trophy } from "lucide-react";
import type { DivisionSummary } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TeamsCatalogViewProps {
  divisions: DivisionSummary[];
}

export function TeamsCatalogView({ divisions }: TeamsCatalogViewProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman Katalog Divisi */}
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.teamsPage.catalogTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.teamsPage.catalogSub}
        </p>
      </div>

      {/* Grid DivisionPortalCard */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {divisions.map((div) => (
          <Link
            key={div.id}
            href={`/teams/${div.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface p-6 transition-transform hover:-translate-y-1 sm:p-8 lg:col-span-7"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand uppercase">
                  ACTIVE DIVISION
                </span>
                {div.shortCode && (
                  <span className="font-mono text-xs font-semibold text-slate-300">
                    {div.shortCode}
                  </span>
                )}
              </div>

              <h2 className="font-display text-3xl font-bold text-foreground transition-colors group-hover:text-brand sm:text-4xl">
                {div.name}
              </h2>

              {div.description && (
                <p className="text-sm leading-relaxed text-slate-300">
                  {div.description}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-5">
              <div className="flex items-center gap-6 text-xs text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand" />
                  <span>4 Core Players / 2 Staff</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-brand" />
                  <span>#1 PMNC 2026</span>
                </span>
              </div>

              <span className="text-xs font-semibold text-brand group-hover:underline">
                {t.teamsPage.openRosterCta}
              </span>
            </div>
          </Link>
        ))}

        {/* Panel Informasi Kesiapan Multi-Divisi Dinamis (5 Kolom Samping) */}
        <div className="flex flex-col justify-between rounded-2xl bg-surface/60 p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-foreground">
              {t.teamsPage.expansionTitle}
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {t.teamsPage.expansionDesc}
            </p>
          </div>

          <div className="mt-6 border-t border-white/5 pt-4 text-xs text-slate-300">
            <Link
              href="/contact"
              className="font-semibold text-brand hover:underline"
            >
              {t.footer.sponsorLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

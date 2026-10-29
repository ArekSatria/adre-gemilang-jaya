"use client";

import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import type { DivisionSummary } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TeamsCatalogViewProps {
  divisions: DivisionSummary[];
}

export function TeamsCatalogView({ divisions }: TeamsCatalogViewProps) {
  const { locale, t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.teamsPage.catalogTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.teamsPage.catalogSub}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {divisions.map((div) => (
          <Link
            key={div.id}
            href={`/teams/${div.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-surface p-6 sm:p-8 transition-transform hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-brand/15 px-3 py-1 text-xs font-bold text-brand uppercase">
                  {div.shortCode}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Users className="h-4 w-4 text-brand" />
                  <span>{t.teamsPage.personnelComposition}</span>
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-foreground group-hover:text-brand sm:text-3xl">
                {div.name}
              </h2>

              <p className="text-sm leading-relaxed text-slate-300">
                {locale === "id"
                  ? "Divisi kompetitif utama PT Adre Gemilang Jaya di Jakarta yang diperkuat oleh 4 pemain inti, 1 manajer tim, dan 2 staf pelatih analis."
                  : "PT Adre Gemilang Jaya's flagship competitive division in Jakarta featuring 4 core players, 1 team manager, and 2 coaching analysts."}
              </p>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 text-xs font-bold text-brand uppercase">
              {t.teamsPage.openRosterCta}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

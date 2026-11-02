"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { DivisionSummary } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDivisionsCatalog } from "@/lib/api/mock-data";
import { cn } from "@/lib/utils/cn";

interface TeamsCatalogViewProps {
  divisions?: DivisionSummary[];
}

export function TeamsCatalogView({ divisions }: TeamsCatalogViewProps) {
  const { t } = useLanguage();
  const activeDivisions = divisions || [];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman Tanpa Subjudul */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
          {t.teamsPage.catalogTitle}
        </h1>
      </div>

      {/* Daftar Card Divisi */}
      {activeDivisions.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-surface p-12 text-center text-sm text-slate-400">
          Belum ada divisi yang aktif.
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-8",
            activeDivisions.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          )}
        >
          {activeDivisions.map((division) => (
            <Link
              key={division.id}
              href={`/teams/${division.slug}`}
              className="group relative block aspect-[2/1] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:border-brand"
            >
              {/* Latar Belakang Foto Logo Divisi */}
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src={division.bannerImageUrl || "/images/pubg-logo-bg.svg"}
                  alt={division.name}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1280px) 100vw, 640px"
                  className="object-cover object-center opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-background/85" />
              </div>

              {/* Isi Card */}
              <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="w-full space-y-3">
                  <span className="inline-block rounded-md border border-brand/40 bg-brand/15 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-brand uppercase">
                    {division.shortCode}
                  </span>

                  <h2 className="w-full font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase transition-colors group-hover:text-brand">
                    {division.name}
                  </h2>
                </div>

                <div className="flex justify-end pt-4">
                  <span className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-xs font-bold text-background uppercase transition-opacity group-hover:opacity-90">
                    {t.teamsPage.openRosterCta}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

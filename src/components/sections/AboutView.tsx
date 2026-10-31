"use client";

import React from "react";
import { useLanguage, type Locale } from "@/lib/i18n/LanguageContext";
import {
  CORPORATE_MILESTONES,
  CORPORATE_OFFICES,
} from "@/lib/utils/corporate-helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";

function resolveLocalized(
  value: string | { id: string; en: string } | undefined,
  locale: Locale,
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale];
}

export function AboutView() {
  const { locale, t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman (Tanpa Subjudul) */}
      <div className="border-b border-white/10 pb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
          {t.aboutPage.title}
        </h1>
      </div>

      {/* Seksi Visi & Misi (Teks Gold Diperbesar Tanpa Judul Visi/Misi Perusahaan) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Card VISI */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-8 sm:p-10 lg:col-span-5">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-black tracking-tight text-brand uppercase sm:text-5xl">
              {t.aboutPage.visionBadge}
            </h2>
            <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
              {t.aboutPage.visionText}
            </p>
          </div>
        </div>

        {/* Card MISI */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-8 sm:p-10 lg:col-span-7">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-black tracking-tight text-brand uppercase sm:text-5xl">
              {t.aboutPage.missionBadge}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {t.aboutPage.missions.map((mission) => (
                <div
                  key={mission.code}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-background/60 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/15 font-mono text-sm font-bold text-brand">
                    {mission.code}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
                      {mission.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {mission.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seksi Perjalanan Kami (Tanpa Subjudul) */}
      <section className="space-y-6">
        <SectionHeading title={t.aboutPage.milestonesHeading} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CORPORATE_MILESTONES.map((item) => (
            <div
              key={item.year}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
            >
              <div className="space-y-3">
                <span className="inline-block rounded-md border border-brand/40 bg-brand/15 px-3 py-1 font-mono text-sm font-bold text-brand">
                  {item.year}
                </span>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {resolveLocalized(item.title, locale)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {resolveLocalized(item.description, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seksi Lokasi Operasional*/}
      <section className="space-y-6">
        <SectionHeading title={t.aboutPage.officesHeading} />

        <div className="grid grid-cols-1 gap-6">
          {CORPORATE_OFFICES.map((office, index) => (
            <div
              key={office.city.id || index}
              className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
            >
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-brand uppercase sm:text-2xl">
                  {resolveLocalized(office.city, locale)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {resolveLocalized(office.address, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

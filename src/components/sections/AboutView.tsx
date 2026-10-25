"use client";

import React from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CORPORATE_MILESTONES,
  CORPORATE_OFFICES,
} from "@/lib/utils/corporate-helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutView() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman About */}
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.aboutPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Bento Grid Visi & Misi Organisasi (PBI-13) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-2xl bg-surface p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-3">
            <span className="inline-block rounded bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand uppercase">
              {t.aboutPage.visionTitle}
            </span>
            <p className="font-display text-xl font-bold leading-relaxed text-foreground sm:text-2xl">
              {t.aboutPage.visionText}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <div>
              <p className="font-display text-2xl font-bold text-brand">2024</p>
              <p className="text-xs text-slate-300">Tahun Pendirian Legal</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-brand">
                Palembang &amp; Jakarta
              </p>
              <p className="text-xs text-slate-300">Basis Operasional</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface p-6 sm:p-8 lg:col-span-7 space-y-5">
          <span className="inline-block rounded bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand uppercase">
            {t.aboutPage.missionTitle}
          </span>

          <ul className="space-y-4">
            {t.aboutPage.missions.map((mission, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-slate-200 sm:text-base">
                  {mission}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Linimasa Tonggak Sejarah (Divide-Y Tanpa Kartu Berlebih) */}
      <section className="space-y-6">
        <SectionHeading
          title={t.aboutPage.milestonesHeading}
          subtitle={t.aboutPage.milestonesSub}
        />

        <div className="divide-y divide-white/5 border-y border-white/5">
          {CORPORATE_MILESTONES.map((item) => (
            <div
              key={item.year}
              className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-6"
            >
              <div className="sm:col-span-2">
                <span className="font-mono text-lg font-bold text-brand">
                  {item.year}
                </span>
              </div>
              <div className="space-y-1.5 sm:col-span-10">
                <h3 className="font-display text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lokasi Kantor Operasional */}
      <section className="space-y-6">
        <SectionHeading
          title={t.aboutPage.officesHeading}
          subtitle={t.aboutPage.officesSub}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CORPORATE_OFFICES.map((office) => (
            <div
              key={office.city}
              className="rounded-2xl bg-surface p-6 space-y-3"
            >
              <div className="flex items-center gap-2 text-brand">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase">
                  {office.role}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {office.city}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {office.address}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

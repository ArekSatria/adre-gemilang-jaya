"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CORPORATE_MILESTONES,
  CORPORATE_OFFICES,
} from "@/lib/utils/corporate-helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutView() {
  const { locale, t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-5xl">
          {t.aboutPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Visi & Misi Rapi Tanpa Penomoran Template AI */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand uppercase">
              {t.aboutPage.visionBadge}
            </span>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t.aboutPage.visionTitle}
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
              {t.aboutPage.visionText}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface p-6 sm:p-8 lg:col-span-7 space-y-5">
          <div>
            <span className="text-xs font-bold text-brand uppercase">
              {t.aboutPage.missionBadge}
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-foreground">
              {t.aboutPage.missionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {t.aboutPage.missions.map((mission) => (
              <div
                key={mission.heading}
                className="rounded-lg border border-white/10 bg-background/60 p-5 space-y-2"
              >
                <h3 className="font-display text-base font-bold text-foreground">
                  {mission.heading}
                </h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  {mission.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah Singkat */}
      <section className="space-y-6">
        <SectionHeading
          title={t.aboutPage.milestonesHeading}
          subtitle={t.aboutPage.milestonesSub}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CORPORATE_MILESTONES.map((item) => (
            <div
              key={item.year}
              className="rounded-xl border border-white/10 bg-surface p-6 space-y-2"
            >
              <span className="font-mono text-sm font-bold text-brand">
                {item.year}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">
                {item.title[locale]}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {item.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Lokasi Operasional Tunggal (Jakarta) */}
      <section className="space-y-6">
        <SectionHeading
          title={t.aboutPage.officesHeading}
          subtitle={t.aboutPage.officesSub}
        />

        <div className="grid grid-cols-1">
          {CORPORATE_OFFICES.map((office) => (
            <div
              key={office.city.id}
              className="rounded-xl border border-white/10 bg-surface p-6 sm:p-8 space-y-2"
            >
              <span className="text-xs font-bold text-brand uppercase">
                {office.role[locale]}
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {office.city[locale]}
              </h3>
              <p className="text-sm text-slate-300">{office.address[locale]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

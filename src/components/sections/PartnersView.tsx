"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CORPORATE_PARTNERS_DATA,
  PARTNERSHIP_VALUE_PILLARS,
} from "@/lib/utils/corporate-helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";

export function PartnersView() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman Mitra */}
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          {t.partnersPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.partnersPage.subtitle}
        </p>
      </div>

      {/* Grid Daftar Mitra Resmi Berdasarkan Tier (PBI-12) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {CORPORATE_PARTNERS_DATA.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col justify-between rounded-2xl bg-surface p-6 sm:p-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand uppercase">
                  {partner.tierLabel}
                </span>
                <ShieldCheck
                  className="h-5 w-5 text-brand"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {partner.name}
                </h2>
                <p className="mt-1 text-xs font-semibold text-brand">
                  {partner.category}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                {partner.description}
              </p>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4">
              <SmartLink
                href={partner.websiteUrl}
                className="text-xs font-semibold text-slate-300 transition-colors hover:text-brand"
              >
                {t.partnersPage.visitPartner}
              </SmartLink>
            </div>
          </div>
        ))}
      </div>

      {/* Seksi Proposisi Nilai Kemitraan (Why Partner With Us) */}
      <section className="space-y-6">
        <SectionHeading
          title={t.partnersPage.valueHeading}
          subtitle={t.partnersPage.valueSub}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PARTNERSHIP_VALUE_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl bg-surface/60 p-6 space-y-3"
            >
              <span className="font-display text-2xl font-bold text-brand">
                {pillar.metric}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner Ajakan Kemitraan (CTA Menuju /contact) */}
      <section className="rounded-2xl bg-surface p-8 sm:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {t.partnersPage.ctaBannerTitle}
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {t.partnersPage.ctaBannerDesc}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
          >
            {t.partnersPage.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}

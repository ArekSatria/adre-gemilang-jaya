"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CORPORATE_PARTNERS_DATA } from "@/lib/utils/corporate-helpers";
import { SmartLink } from "@/components/ui/SmartLink";

export function PartnersView() {
  const { locale, t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-5xl">
          {t.partnersPage.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {t.partnersPage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {CORPORATE_PARTNERS_DATA.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6 sm:p-8"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand uppercase">
                {partner.tierLabel}
              </span>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {partner.name}
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  {partner.category[locale]}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                {partner.description[locale]}
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4">
              <SmartLink
                href={partner.websiteUrl}
                className="text-xs font-bold text-brand uppercase hover:underline"
              >
                {t.partnersPage.visitPartner}
              </SmartLink>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-white/10 bg-surface p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t.partnersPage.ctaBannerTitle}
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {t.partnersPage.ctaBannerDesc}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand px-6 py-3 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
          >
            {t.partnersPage.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}

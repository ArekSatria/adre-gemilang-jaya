"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CORPORATE_PARTNERS_DATA } from "@/lib/utils/corporate-helpers";
import { PartnerLogoGraphic } from "@/components/ui/BrandElements";
import { SmartLink } from "@/components/ui/SmartLink";

interface PartnerDisplayItem {
  id: string;
  name: string;
  tier?: string;
  logoUrl?: string | null;
  websiteUrl: string;
  description?: string | { id: string; en: string };
}

interface PartnersViewProps {
  initialPartners?: PartnerDisplayItem[];
}

export function PartnersView({ initialPartners }: PartnersViewProps) {
  const { locale, t } = useLanguage();

  const partners =
    initialPartners && initialPartners.length > 0
      ? initialPartners
      : CORPORATE_PARTNERS_DATA;

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman */}
      <div className="border-b border-white/10 pb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
          {t.partnersPage.title}
        </h1>
      </div>

      {/* Grid Mitra Resmi dengan Logo Persegi di Setiap Card */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => {
          const desc =
            typeof partner.description === "object" && partner.description !== null
              ? (partner.description as any)[locale] || (partner.description as any)["id"]
              : partner.description || "";

          return (
            <div
              key={partner.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-brand sm:p-8"
            >
              <div className="space-y-6">
                {/* Kontainer Logo Mitra Persegi */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-background">
                  <PartnerLogoGraphic
                    partnerId={partner.id}
                    name={partner.name}
                    logoUrl={partner.logoUrl}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Nama & Deskripsi Mitra */}
                <div className="space-y-2">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-brand">
                    {partner.name}
                  </h2>
                  {desc && (
                    <p className="text-sm leading-relaxed text-slate-300">
                      {desc}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4">
                <SmartLink
                  href={partner.websiteUrl || "#"}
                  className="inline-block text-xs font-bold text-brand uppercase transition-colors hover:underline"
                >
                  {t.partnersPage.visitPartner}
                </SmartLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

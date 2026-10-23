"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import type { GlobalSettings } from "@/lib/schemas";
import { NAVIGATION_ITEMS, useLanguage } from "@/lib/i18n/LanguageContext";
import { BrandLogo, SocialIconSvg } from "@/components/ui/BrandElements";
import { SmartLink } from "@/components/ui/SmartLink";

interface ObsidianFooterProps {
  settings: GlobalSettings;
}

export function ObsidianFooter({ settings }: ObsidianFooterProps) {
  const { locale, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialEntries = [
    {
      key: "instagram" as const,
      label: "Instagram",
      url: settings.socials.instagram,
    },
    {
      key: "youtube" as const,
      label: "YouTube",
      url: settings.socials.youtube,
    },
    { key: "tiktok" as const, label: "TikTok", url: settings.socials.tiktok },
    { key: "x" as const, label: "X", url: settings.socials.x },
  ].filter((item) => Boolean(item.url));

  return (
    <footer className="border-t border-white/5 bg-surface text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Kolom 1: Brand */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <BrandLogo logoUrl={settings.logoUrl} height={32} />
              <span className="font-display text-base font-bold tracking-normal text-foreground">
                {settings.siteName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {t.footer.description}
            </p>
          </div>

          {/* Kolom 2: Menu */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-foreground">
              Menu
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Tim / Divisi */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold text-foreground">
              Tim
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {settings.activeDivisionsNav.map((div) => (
                <li key={div.slug}>
                  <Link
                    href={`/teams/${div.slug}`}
                    className="transition-colors hover:text-foreground"
                  >
                    Divisi {div.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <SmartLink
                  href="/partners"
                  className="text-xs text-brand hover:underline"
                >
                  {t.footer.sponsorLink}
                </SmartLink>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Sosial */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold text-foreground">
              Kontak
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href={`mailto:${settings.contactQuick.businessEmail}`}
                  className="hover:text-foreground"
                >
                  {settings.contactQuick.businessEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand" />
                <span>{settings.contactQuick.addressShort}</span>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3">
              {socialEntries.map((social) => (
                <a
                  key={social.key}
                  href={social.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-1 text-slate-300 hover:text-foreground"
                >
                  <SocialIconSvg platform={social.key} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/5 pt-6 text-xs text-slate-300">
          <p>
            &copy; {currentYear} {settings.siteName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

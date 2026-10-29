"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import type { GlobalSettings } from "@/lib/schemas";
import { NAVIGATION_ITEMS, useLanguage } from "@/lib/i18n/LanguageContext";
import { BrandLogo } from "@/components/ui/BrandElements";
import { SmartLink } from "@/components/ui/SmartLink";

interface ObsidianFooterProps {
  settings: GlobalSettings;
}

interface SocialEntry {
  key: "instagram" | "youtube" | "tiktok" | "x";
  label: string;
  url: string;
}

function FooterSocialSvg({
  platform,
  className = "h-4 w-4",
}: {
  platform: SocialEntry["key"];
  className?: string;
}) {
  switch (platform) {
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3v6Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      );
  }
}

export function ObsidianFooter({ settings }: ObsidianFooterProps) {
  const { locale, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const rawSocials: Array<{
    key: "instagram" | "youtube" | "tiktok" | "x";
    label: string;
    url: string | null | undefined;
  }> = [
    {
      key: "instagram",
      label: "Instagram",
      url: settings.socials.instagram,
    },
    {
      key: "youtube",
      label: "YouTube",
      url: settings.socials.youtube,
    },
    {
      key: "tiktok",
      label: "TikTok",
      url: settings.socials.tiktok,
    },
    {
      key: "x",
      label: "X",
      url: settings.socials.x,
    },
  ];

  const socialEntries: SocialEntry[] = rawSocials.filter(
    (entry): entry is SocialEntry =>
      typeof entry.url === "string" && entry.url.length > 0,
  );

  return (
    <footer className="border-t border-white/10 bg-surface text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Kolom 1: Logo Memenuhi Panjang Card Footer */}
          <div className="w-full lg:col-span-5 lg:pr-6">
            <Link
              href="/"
              aria-label={settings.siteName}
              className="block w-full transition-opacity hover:opacity-90"
            >
              <BrandLogo
                logoUrl={settings.logoUrl}
                fullWidth
                className="max-h-48 w-full"
              />
            </Link>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-bold text-foreground uppercase">
              {t.footer.navHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Divisi */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-bold text-foreground uppercase">
              {t.footer.divisionHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {settings.activeDivisionsNav.map((div) => (
                <li key={div.slug}>
                  <Link
                    href={`/teams/${div.slug}`}
                    className="transition-colors hover:text-brand"
                  >
                    {div.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <SmartLink
                  href="/contact"
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  {t.footer.sponsorLink}
                </SmartLink>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold text-foreground uppercase">
              {t.footer.contactHeading}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href={`mailto:${settings.contactQuick.businessEmail}`}
                  className="transition-colors hover:text-foreground"
                >
                  {settings.contactQuick.businessEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{t.footer.addressText}</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {socialEntries.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background text-slate-300 transition-colors hover:text-brand"
                >
                  <FooterSocialSvg platform={social.key} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {settings.siteName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

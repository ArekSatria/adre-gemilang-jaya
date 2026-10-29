"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import type { GlobalSettings } from "@/lib/schemas";
import { NAVIGATION_ITEMS, useLanguage } from "@/lib/i18n/LanguageContext";
import { BrandLogo } from "@/components/ui/BrandElements";
import { cn } from "@/lib/utils/cn";

interface FloatingGlassNavbarProps {
  settings?: GlobalSettings;
  siteName?: string;
  logoUrl?: string | null;
}

export function FloatingGlassNavbar({
  settings,
  siteName,
  logoUrl,
}: FloatingGlassNavbarProps) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resolvedSiteName =
    siteName ?? settings?.siteName ?? "PT Adre Gemilang Jaya";
  const resolvedLogoUrl =
    logoUrl !== undefined ? logoUrl : (settings?.logoUrl ?? null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleLanguage = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Hanya menampilkan gambar logo tanpa teks nama perusahaan di sampingnya */}
          <Link
            href="/"
            aria-label={resolvedSiteName}
            className="flex shrink-0 items-center py-1"
          >
            <BrandLogo logoUrl={resolvedLogoUrl} height={50} />
          </Link>

          {/* Menu Navigasi Desktop */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex lg:items-center lg:gap-1"
          >
            {NAVIGATION_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand/15 font-semibold text-brand"
                      : "text-slate-300 hover:bg-white/5 hover:text-foreground",
                  )}
                >
                  {item.label[locale]}
                </Link>
              );
            })}
          </nav>

          {/* Sakelar Bahasa ID/EN & CTA Kemitraan */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-brand/50 hover:text-brand"
            >
              <Globe className="h-3.5 w-3.5 text-brand" />
              <span>{locale.toUpperCase()}</span>
            </button>

            <Link
              href="/contact"
              className="rounded-lg bg-brand px-4 py-2.5 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
            >
              {t.nav.cta}
            </Link>
          </div>

          {/* Kontrol Layar Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs font-semibold text-slate-200"
            >
              <Globe className="h-3.5 w-3.5 text-brand" />
              <span>{locale.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-background px-6 py-6 lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <Link
              href="/"
              aria-label={resolvedSiteName}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BrandLogo logoUrl={resolvedLogoUrl} height={44} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex-1 space-y-2 overflow-y-auto">
            <p className="px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              {t.nav.mobileTitle}
            </p>
            {NAVIGATION_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3.5 font-display text-lg font-bold transition-colors",
                    isActive
                      ? "bg-brand text-background"
                      : "text-foreground hover:bg-surface",
                  )}
                >
                  {item.label[locale]}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-white/10 pt-5">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-brand py-3.5 text-sm font-bold text-background uppercase"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

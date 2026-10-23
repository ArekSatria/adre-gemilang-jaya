"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { NAVIGATION_ITEMS, useLanguage } from "@/lib/i18n/LanguageContext";
import { BrandLogo } from "@/components/ui/BrandElements";
import { SmartLink } from "@/components/ui/SmartLink";

interface FloatingGlassNavbarProps {
  siteName: string;
  logoUrl?: string | null;
}

export function FloatingGlassNavbar({
  siteName,
  logoUrl,
}: FloatingGlassNavbarProps) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-20 w-full border-b border-white/5 bg-[#0f131c]/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none"
            aria-label={siteName}
          >
            <BrandLogo logoUrl={logoUrl} height={46} />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-wider text-foreground uppercase leading-none">
                ADRE ESPORTS
              </span>
              <span className="mt-1 text-xs font-medium text-slate-300">
                PT Adre Gemilang Jaya
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            {NAVIGATION_ITEMS.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-brand"
                      : "text-slate-300 hover:text-foreground",
                  )}
                  {...(active ? { "aria-current": "page" as const } : {})}
                >
                  {item.label[locale]}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-brand" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              onClick={() => setLocale(locale === "id" ? "en" : "id")}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-foreground"
              aria-label="Ganti bahasa"
            >
              <Globe className="h-3.5 w-3.5 text-slate-300" />
              <span className="uppercase">{locale}</span>
            </button>

            <SmartLink
              href="/contact"
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
                pathname === "/contact"
                  ? "bg-brand text-background"
                  : "bg-brand/15 text-brand hover:bg-brand hover:text-background",
              )}
            >
              {t.nav.cta}
            </SmartLink>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setLocale(locale === "id" ? "en" : "id")}
              className="flex h-10 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-300 hover:text-foreground"
              aria-label="Ganti bahasa"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{locale}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-surface text-foreground transition-colors hover:border-brand/50 hover:text-brand"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer — Dirender di luar <header> agar tidak terjebak backdrop-filter & tampil persis seperti gambar referensi tanpa titik bulat */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0f131c] px-6 py-6 lg:hidden"
        >
          {/* Baris Atas Drawer */}
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <BrandLogo logoUrl={logoUrl} height={42} />
                <div className="flex flex-col">
                  <span className="font-display text-lg font-bold tracking-wider text-foreground uppercase leading-none">
                    ADRE ESPORTS
                  </span>
                  <span className="mt-1 text-xs font-medium text-slate-300">
                    PT Adre Gemilang Jaya
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-surface text-foreground hover:border-brand/50"
                aria-label="Tutup menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Daftar 6 Menu (Persis Gambar Referensi Tanpa Titik Bulat) */}
            <nav
              aria-label="Mobile Navigation"
              className="mt-8 flex flex-col space-y-2"
            >
              {NAVIGATION_ITEMS.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center rounded-xl px-5 py-4 font-display text-xl font-bold tracking-wider uppercase transition-colors",
                      active
                        ? "border border-brand/60 bg-brand/15 text-brand"
                        : "border border-transparent text-foreground hover:bg-surface",
                    )}
                    {...(active ? { "aria-current": "page" as const } : {})}
                  >
                    <span>{item.label[locale]}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Tombol Bawah Drawer */}
          <div className="border-t border-white/10 pt-6">
            <SmartLink
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-brand px-5 py-4 font-display text-sm font-bold tracking-wider text-background uppercase transition-opacity hover:opacity-90"
            >
              {t.nav.cta}
            </SmartLink>
          </div>
        </div>
      )}
    </>
  );
}

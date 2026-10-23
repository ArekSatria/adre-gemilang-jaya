"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Locale = "id" | "en";

export interface NavItemConfig {
  key: "home" | "teams" | "matches" | "news" | "partners" | "about";
  href: string;
  label: {
    id: string;
    en: string;
  };
}

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  { key: "home", href: "/", label: { id: "Beranda", en: "Home" } },
  {
    key: "teams",
    href: "/teams",
    label: { id: "Divisi & Roster", en: "Teams" },
  },
  {
    key: "matches",
    href: "/matches",
    label: { id: "Pertandingan", en: "Matches" },
  },
  { key: "news", href: "/news", label: { id: "Berita", en: "News" } },
  {
    key: "partners",
    href: "/partners",
    label: { id: "Mitra", en: "Partners" },
  },
  { key: "about", href: "/about", label: { id: "Tentang Kami", en: "About" } },
];

export const DICTIONARY = {
  id: {
    nav: {
      cta: "Kemitraan Bisnis",
      mobileTitle: "Navigasi Utama",
      langLabel: "Bahasa",
    },
    hero: {
      titleLine1: "SKUAD KOMPETITIF",
      titleHighlight: "PUBG MOBILE",
      titleLine2: "PT ADRE GEMILANG JAYA",
      description:
        "Jakarta, kami mengelola 1 divisi utama PUBG Mobile dengan 4 pemain inti, 2 staf pelatih analis, dan rekam jejak Juara 1 PMNC Indonesia 2026.",
      primaryCta: "Lihat Roster PUBG Mobile",
      secondaryCta: "Jadwal PMSL SEA 2026",
      stats: [
        { value: "Juara #1", label: "PMNC Indonesia 2026" },
        { value: "148 Poin", label: "Rekor Skor Babak Final" },
        { value: "6 Anggota", label: "4 Pemain Inti & 2 Staf" },
        { value: "2024", label: "Tahun Pendirian Resmi" },
      ],
      nextMatchHeader: "JADWAL TURNAMEN TERDEKAT",
      liveStreamBtn: "Tonton Siaran",
      activeDivisionHeader: "DIVISI AKTIF SAAT INI",
      rosterStatus: "4 Pemain Inti • 2 Staf Pelatih",
      viewRosterBtn: "Buka Profil Tim",
    },
    homeSections: {
      partnersLabel: "MITRA KOMERSIAL & SPONSOR RESMI",
      matchesTitle: "JADWAL & HASIL PERTANDINGAN",
      matchesSub: "Rekapitulasi skor Battle Royale dan agenda turnamen resmi.",
      viewAllMatches: "Semua Pertandingan",
      newsTitle: "BERITA & PENGUMUMAN RESMI",
      newsSub: "Kabar terbaru seputar roster, hasil turnamen, dan korporasi.",
      viewAllNews: "Semua Berita",
      readTime: "menit baca",
    },
    footer: {
      description:
        "Badan hukum manajemen olahraga elektronik (esports) yang beroperasi sejak 2024 di Jakarta. Fokus pada pembinaan skuad PUBG Mobile dan kemitraan komersial terukur.",
      navHeading: "Navigasi Portal",
      divisionHeading: "Divisi Kompetitif",
      divisionPrefix: "Skuad",
      sponsorLink: "Ajukan proposal sponsor & kolaborasi →",
      contactHeading: "Kontak Manajemen",
      rights: "Seluruh hak cipta dilindungi undang-undang.",
      aboutLink: "Profil Perusahaan",
      contactLink: "Kontak Bisnis",
    },
  },
  en: {
    nav: {
      cta: "Partner With Us",
      mobileTitle: "Main Navigation",
      langLabel: "Language",
    },
    hero: {
      badge: "PROFESSIONAL ESPORTS ORGANIZATION — EST. 2024",
      titleLine1: "COMPETITIVE",
      titleHighlight: "PUBG MOBILE",
      titleLine2: "ROSTER BY PT ADRE GEMILANG JAYA",
      description:
        "Operating from Palembang and Jakarta, we manage our flagship PUBG Mobile division featuring 4 core players, 2 coaching staff, and the 1st Place title at PMNC Indonesia 2026.",
      primaryCta: "Explore PUBGM Roster",
      secondaryCta: "PMSL SEA 2026 Schedule",
      stats: [
        { value: "1st Place", label: "PMNC Indonesia 2026" },
        { value: "148 Pts", label: "Grand Finals Point Record" },
        { value: "6 Active", label: "4 Core Players & 2 Staff" },
        { value: "2024", label: "Official Incorporation" },
      ],
      nextMatchHeader: "UPCOMING TOURNAMENT MATCH",
      liveStreamBtn: "Watch Stream",
      activeDivisionHeader: "ACTIVE COMPETITIVE DIVISION",
      rosterStatus: "4 Core Players • 2 Coaching Staff",
      viewRosterBtn: "View Team Profile",
    },
    homeSections: {
      partnersLabel: "OFFICIAL COMMERCIAL PARTNERS & SPONSORS",
      matchesTitle: "MATCH SCHEDULE & RESULTS",
      matchesSub:
        "Official Battle Royale standings and upcoming tournament fixtures.",
      viewAllMatches: "All Matches",
      newsTitle: "OFFICIAL NEWS & RELEASES",
      newsSub:
        "Latest updates on roster moves, tournament results, and corporate news.",
      viewAllNews: "All News",
      readTime: "min read",
    },
    footer: {
      description:
        "Registered esports management company operating since 2024 in Jakarta. Dedicated to professional PUBG Mobile athlete development and measurable brand partnerships.",
      navHeading: "Portal Navigation",
      divisionHeading: "Active Division",
      divisionPrefix: "Squad",
      sponsorLink: "Submit sponsorship & partnership inquiry →",
      contactHeading: "Management Contact",
      rights: "All rights reserved.",
      aboutLink: "Company Profile",
      contactLink: "Business Inquiry",
    },
  },
};

// Definisikan tipe kamus secara eksplisit agar kompatibel dengan union type locale
export type DictionaryType = (typeof DICTIONARY)["id"];

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: DictionaryType;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    const saved = window.localStorage.getItem("adre_locale") as Locale | null;
    if (saved === "id" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("adre_locale", nextLocale);
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: DICTIONARY[locale] as DictionaryType,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage harus digunakan di dalam LanguageProvider");
  }
  return context;
}

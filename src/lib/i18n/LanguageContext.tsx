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
      badge: "ORGANISASI ESPORTS PROFESIONAL",
      titleLine1: "SKUAD KOMPETITIF",
      titleHighlight: "PUBG MOBILE",
      titleLine2: "PT ADRE GEMILANG JAYA",
      description:
        "Berbasis di Palembang dan Jakarta, kami mengelola 1 divisi utama PUBG Mobile dengan 4 pemain inti, 2 staf pelatih analis, dan rekam jejak Juara 1 PMNC Indonesia 2026.",
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
      rosterStatus: "4 Pemain Inti / 2 Staf Pelatih",
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
    teamsPage: {
      catalogTitle: "DIVISI KOMPETITIF",
      catalogSub:
        "Daftar divisi olahraga elektronik resmi di bawah manajemen PT Adre Gemilang Jaya.",
      activePersonnelLabel: "Personel Aktif",
      openRosterCta: "Lihat Profil & Roster →",
      expansionTitle: "Arsitektur Multi-Divisi Siap Ekspansi",
      expansionDesc:
        "Sistem manajemen divisi PT Adre Gemilang Jaya dirancang dinamis. Penambahan divisi baru pada masa mendatang akan otomatis tampil pada katalog ini melalui sinkronisasi CMS.",
      backToCatalog: "← Kembali ke Katalog Divisi",
      playersHeading: "SKUAD PEMAIN INTI",
      playersSub: "Empat atlet utama yang berlaga di rotasi turnamen resmi.",
      staffHeading: "STAF KEPELATIHAN & ANALIS",
      staffSub:
        "Tim perumus strategi, bedah peta permainan, dan evaluasi performa.",
      achievementsHeading: "REKAM JEJAK PRESTASI",
      achievementsSub:
        "Pencapaian resmi divisi pada turnamen tingkat nasional dan regional.",
      scheduleCta: "Lihat Jadwal Pertandingan →",
    },
    matchesPage: {
      title: "JADWAL & HASIL PERTANDINGAN",
      subtitle:
        "Agenda turnamen resmi serta rekapitulasi poin akhir skuad kompetitif PT Adre Gemilang Jaya.",
      filterStatusAll: "Semua Status",
      filterStatusUpcoming: "Akan Datang",
      filterStatusCompleted: "Selesai",
      filterGameAll: "Semua Divisi",
      watchStream: "Tonton Siaran",
      upcomingBadge: "UPCOMING",
      emptyState:
        "Tidak ada data pertandingan yang sesuai dengan filter pilihan Anda.",
      pointsUnit: "PTS",
    },
    newsPage: {
      title: "BERITA & RILIS RESMI",
      subtitle:
        "Pusat informasi resmi seputar perkembangan roster PUBG Mobile, laporan hasil turnamen, dan agenda korporasi PT Adre Gemilang Jaya.",
      filterAllCategories: "Semua Kategori",
      readMore: "Baca artikel →",
      readTimeUnit: "menit baca",
      emptyState: "Belum ada artikel berita pada kategori ini.",
      backToNews: "← Kembali ke Semua Berita",
      publishedBy: "Ditulis oleh",
      relatedHeading: "BERITA TERKAIT LAINNYA",
    },
    footer: {
      description:
        "Badan hukum manajemen olahraga elektronik (esports) yang beroperasi sejak 2024 di Palembang & Jakarta. Fokus pada pembinaan skuad PUBG Mobile dan kemitraan komersial terukur.",
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
      badge: "PROFESSIONAL ESPORTS ORGANIZATION",
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
      rosterStatus: "4 Core Players / 2 Coaching Staff",
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
    teamsPage: {
      catalogTitle: "COMPETITIVE DIVISIONS",
      catalogSub:
        "Official esports divisions managed under PT Adre Gemilang Jaya.",
      activePersonnelLabel: "Active Personnel",
      openRosterCta: "View Profile & Roster →",
      expansionTitle: "Scalable Multi-Division Architecture",
      expansionDesc:
        "PT Adre Gemilang Jaya's division management system is built dynamically. Future game divisions added via the CMS will automatically appear in this catalog.",
      backToCatalog: "← Back to Divisions Catalog",
      playersHeading: "CORE PLAYER ROSTER",
      playersSub:
        "Four starting athletes competing in official tournament rotations.",
      staffHeading: "COACHING & ANALYST STAFF",
      staffSub:
        "Tactical masterminds behind map rotations and performance review.",
      achievementsHeading: "TOURNAMENT ACHIEVEMENTS",
      achievementsSub:
        "Official competitive milestones across national and regional leagues.",
      scheduleCta: "View Match Schedule →",
    },
    matchesPage: {
      title: "MATCH SCHEDULE & RESULTS",
      subtitle:
        "Official tournament fixtures and final standings for PT Adre Gemilang Jaya competitive divisions.",
      filterStatusAll: "All Matches",
      filterStatusUpcoming: "Upcoming",
      filterStatusCompleted: "Completed",
      filterGameAll: "All Divisions",
      watchStream: "Watch Stream",
      upcomingBadge: "UPCOMING",
      emptyState: "No matches found matching your selected filter criteria.",
      pointsUnit: "PTS",
    },
    newsPage: {
      title: "OFFICIAL NEWS & RELEASES",
      subtitle:
        "Official press releases covering PUBG Mobile roster updates, tournament recaps, and corporate initiatives by PT Adre Gemilang Jaya.",
      filterAllCategories: "All Categories",
      readMore: "Read article →",
      readTimeUnit: "min read",
      emptyState: "No news articles available in this category yet.",
      backToNews: "← Back to All News",
      publishedBy: "Written by",
      relatedHeading: "OTHER RELATED NEWS",
    },
    footer: {
      description:
        "Registered esports management company operating since 2024 in Palembang & Jakarta. Dedicated to professional PUBG Mobile athlete development and measurable brand partnerships.",
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

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
    partnersPage: {
      title: "MITRA KOMERSIAL & SPONSOR",
      subtitle:
        "Kolaborasi strategis antara PT Adre Gemilang Jaya dan mitra korporasi dalam membangun ekosistem olahraga elektronik profesional yang terukur.",
      visitPartner: "Kunjungi Situs Mitra",
      valueHeading: "PROPOSISI NILAI KEMITRAAN",
      valueSub: "Keunggulan kolaborasi merek bersama skuad kompetitif kami.",
      ctaBannerTitle: "Buka Peluang Kolaborasi Strategis 2026/2027",
      ctaBannerDesc:
        "Hubungi tim komersial kami untuk mendapatkan dokumen Media Kit, demografi audiens, dan proposal kemitraan yang disesuaikan dengan target merek Anda.",
      ctaButton: "Ajukan Proposal Kemitraan →",
    },
    aboutPage: {
      title: "TENTANG PT ADRE GEMILANG JAYA",
      subtitle:
        "Manajemen olahraga elektronik berbadan hukum resmi yang berfokus pada prestasi kompetitif, tata kelola atlet profesional, dan integritas komersial.",
      visionTitle: "VISI ORGANISASI",
      visionText:
        "Menjadi organisasi olahraga elektronik profesional terkemuka di Asia Tenggara yang mencetak atlet berprestasi tingkat dunia melalui manajemen berbasis sains olahraga dan tata kelola korporasi modern.",
      missionTitle: "MISI STRATEGIS",
      missions: [
        "Membina skuad kompetitif PUBG Mobile secara terstruktur dengan dukungan staf pelatih dan analis data.",
        "Membangun kemitraan komersial jangka panjang yang memberikan eksposur terukur bagi sponsor.",
        "Menyediakan infrastruktur pelatihan berstandar tinggi di Palembang dan Jakarta.",
      ],
      milestonesHeading: "TONGGAK SEJARAH ORGANISASI",
      milestonesSub:
        "Perjalanan pertumbuhan PT Adre Gemilang Jaya sejak pendirian resmi.",
      officesHeading: "LOKASI OPERASIONAL",
      officesSub: "Pusat manajemen korporasi dan fasilitas pelatihan tim.",
    },
    contactPage: {
      title: "KONTAK & KEMITRAAN BISNIS",
      subtitle:
        "Saluran komunikasi resmi manajemen PT Adre Gemilang Jaya untuk pengajuan sponsor, undangan turnamen, wawancara media, dan kolaborasi korporasi.",
      directInfoHeading: "INFORMASI KONTAK LANGSUNG",
      emailLabel: "Surel Resmi Kemitraan",
      hqLabel: "Kantor Operasional",
      responseSla: "Estimasi waktu respons manajemen: 1–2 hari kerja.",
      formHeading: "FORMULIR PENGAJUAN KEMITRAAN & KONTAK",
      fullNameLabel: "Nama Lengkap Pengirim",
      fullNamePlaceholder: "Contoh: Budi Santoso",
      companyLabel: "Nama Perusahaan / Instansi",
      companyPlaceholder: "Contoh: PT Nusantara Digital",
      emailInputLabel: "Alamat Email Bisnis",
      emailPlaceholder: "nama@perusahaan.co.id",
      inquiryTypeLabel: "Kategori Keperluan",
      inquiryOptions: {
        SPONSORSHIP: "Proposal Sponsorship & Brand Activation",
        MEDIA: "Liputan Media & Hubungan Masyarakat (PR)",
        TOURNAMENT: "Undangan Turnamen & Scrimmage Resmi",
        GENERAL: "Pertanyaan Umum Korporasi",
      },
      messageLabel: "Rincian Pesan / Proposal Singkat",
      messagePlaceholder:
        "Tuliskan tujuan kolaborasi atau informasi yang Anda butuhkan (minimal 20 karakter)...",
      submitButton: "Kirim Pesan Resmi",
      submittingButton: "Mengirim Pesan...",
      successTitle: "Pesan Anda Berhasil Diterima",
      successDesc:
        "Terima kasih telah menghubungi PT Adre Gemilang Jaya. Tim manajemen komersial kami akan meninjau pesan Anda dan membalas melalui email.",
      sendAnotherBtn: "Kirim Pesan Lainnya",
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
    partnersPage: {
      title: "COMMERCIAL PARTNERS & SPONSORS",
      subtitle:
        "Strategic collaborations between PT Adre Gemilang Jaya and corporate partners in building a measurable professional esports ecosystem.",
      visitPartner: "Visit Partner Website",
      valueHeading: "PARTNERSHIP VALUE PROPOSITION",
      valueSub:
        "Key brand advantages of collaborating with our competitive squad.",
      ctaBannerTitle:
        "Unlock Strategic Collaboration Opportunities for 2026/2027",
      ctaBannerDesc:
        "Contact our commercial team to request our official Media Kit, audience demographics, and tailored sponsorship proposals.",
      ctaButton: "Submit Partnership Inquiry →",
    },
    aboutPage: {
      title: "ABOUT PT ADRE GEMILANG JAYA",
      subtitle:
        "A legally incorporated esports management organization focused on competitive excellence, athlete governance, and commercial integrity.",
      visionTitle: "CORPORATE VISION",
      visionText:
        "To become a leading professional esports organization in Southeast Asia, developing world-class athletes through sports science management and modern corporate governance.",
      missionTitle: "STRATEGIC MISSIONS",
      missions: [
        "Develop our flagship PUBG Mobile squad systematically with dedicated coaching and data analyst staff.",
        "Build long-term commercial partnerships delivering measurable brand exposure for sponsors.",
        "Provide high-standard training facilities in Palembang and Jakarta.",
      ],
      milestonesHeading: "CORPORATE MILESTONES",
      milestonesSub:
        "Key growth stages of PT Adre Gemilang Jaya since official incorporation.",
      officesHeading: "OPERATIONAL LOCATIONS",
      officesSub:
        "Corporate management headquarters and team training facilities.",
    },
    contactPage: {
      title: "BUSINESS & PARTNERSHIP CONTACT",
      subtitle:
        "Official communication channel of PT Adre Gemilang Jaya for sponsorship proposals, tournament invitations, media inquiries, and corporate collaborations.",
      directInfoHeading: "DIRECT CONTACT INFORMATION",
      emailLabel: "Official Partnership Email",
      hqLabel: "Operational Offices",
      responseSla: "Estimated management response time: 1–2 business days.",
      formHeading: "PARTNERSHIP & BUSINESS INQUIRY FORM",
      fullNameLabel: "Sender Full Name",
      fullNamePlaceholder: "e.g., Budi Santoso",
      companyLabel: "Company / Organization Name",
      companyPlaceholder: "e.g., Nusantara Digital Corp",
      emailInputLabel: "Business Email Address",
      emailPlaceholder: "name@company.com",
      inquiryTypeLabel: "Inquiry Category",
      inquiryOptions: {
        SPONSORSHIP: "Sponsorship Proposal & Brand Activation",
        MEDIA: "Media Coverage & Public Relations",
        TOURNAMENT: "Tournament Invitation & Official Scrims",
        GENERAL: "General Corporate Inquiry",
      },
      messageLabel: "Message / Proposal Summary",
      messagePlaceholder:
        "Describe your collaboration goals or inquiry details (minimum 20 characters)...",
      submitButton: "Send Official Inquiry",
      submittingButton: "Sending Inquiry...",
      successTitle: "Your Inquiry Has Been Received",
      successDesc:
        "Thank you for contacting PT Adre Gemilang Jaya. Our commercial management team will review your message and respond via email.",
      sendAnotherBtn: "Send Another Message",
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

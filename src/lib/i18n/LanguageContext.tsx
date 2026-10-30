"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

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
    label: { id: "Divisi & Roster", en: "Divisions & Roster" },
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
  {
    key: "about",
    href: "/about",
    label: { id: "Tentang Kami", en: "About Us" },
  },
];

export const DICTIONARY = {
  id: {
    nav: {
      cta: "Kontak Bisnis",
      mobileTitle: "Menu",
      langLabel: "Bahasa",
    },
    home: {
      heroBadge: "",
      heroTitle: "",
      heroSubtitle: "",
      rosterCta: "Lihat Roster",
      partnerCta: "Kontak Bisnis",
      partnersSectionTitle: "MITRA RESMI",
      partnersSectionSub: "",
      upcomingTitle: "JADWAL PERTANDINGAN",
      upcomingSub: "",
      viewAllMatches: "Semua Pertandingan",
      divisionTitle: "DIVISI KAMI",
      divisionSub: "",
      divisionBadge: "",
      divisionMeta: "",
      exploreDivisionBtn: "Lihat Roster",
      newsTitle: "BERITA & KEGIATAN",
      newsSub: "",
      viewAllNews: "Semua Berita",
      resultsTitle: "HASIL PERTANDINGAN",
      resultsSub: "",
      watchStream: "Tonton Siaran",
      pointsUnit: "POIN",
    },
    teamsPage: {
      catalogTitle: "DIVISI & ROSTER",
      catalogSub: "",
      activePersonnelLabel: "Anggota Tim",
      personnelComposition: "",
      openRosterCta: "Lihat Daftar Roster",
      expansionTitle: "",
      expansionDesc: "",
      backToCatalog: "Kembali ke Divisi",
      playersHeading: "PEMAIN",
      playersSub: "",
      managementHeading: "MANAJER & STAF PELATIH",
      managementSub: "Manajer tim, pelatih kepala, dan analis.",
      staffHeading: "MANAJER & STAF PELATIH",
      staffSub: "Manajer tim, pelatih kepala, dan analis.",
      achievementsHeading: "PRESTASI TIM",
      achievementsSub: "",
      scheduleCta: "Jadwal Pertandingan",
      roleLabels: {
        IGL: "Kapten & In-Game Leader",
        RUSHER: "Rusher",
        SUPPORT: "Support",
        SCOUT: "Scout",
        MANAGER: "Manajer Tim",
        COACH: "Pelatih Kepala",
        ANALYST: "Analis",
      },
    },
    matchesPage: {
      title: "PERTANDINGAN",
      subtitle: "Jadwal turnamen mendatang dan hasil pertandingan tim.",
      filterStatusAll: "Semua",
      filterStatusUpcoming: "Akan Datang",
      filterStatusCompleted: "Selesai",
      filterGameAll: "Semua Divisi",
      watchStream: "Tonton Siaran",
      upcomingBadge: "AKAN DATANG",
      completedBadge: "SELESAI",
      emptyState: "Belum ada jadwal pertandingan untuk kategori ini.",
      pointsUnit: "POIN",
    },
    newsPage: {
      title: "BERITA & KEGIATAN",
      subtitle:
        "Informasi terbaru seputar tim PUBG Mobile dan kegiatan PT Adre Gemilang Jaya.",
      filterAllCategories: "Semua",
      readMore: "Baca Artikel",
      readTimeUnit: "menit baca",
      emptyState: "Belum ada berita di kategori ini.",
      backToNews: "Kembali ke Berita",
      publishedBy: "Oleh",
      relatedHeading: "BERITA LAINNYA",
    },
    partnersPage: {
      title: "MITRA & SPONSOR",
      subtitle:
        "Daftar mitra resmi yang bekerja sama dengan PT Adre Gemilang Jaya.",
      visitPartner: "Situs Mitra",
      ctaBannerTitle: "Kerja Sama Sponsorship",
      ctaBannerDesc:
        "Hubungi tim kami di Jakarta untuk diskusi kerja sama dan sponsorship.",
      ctaButton: "Hubungi Kami",
    },
    aboutPage: {
      title: "TENTANG KAMI",
      subtitle:
        "PT Adre Gemilang Jaya adalah perusahaan manajemen tim esports yang berkantor di Jakarta.",
      visionBadge: "VISI",
      visionTitle: "Visi Perusahaan",
      visionText:
        "Menjadi organisasi esports profesional yang kompetitif di tingkat nasional dan Asia Tenggara melalui pembinaan tim yang terarah.",
      missionBadge: "MISI",
      missionTitle: "Misi Perusahaan",
      missions: [
        {
          code: "1",
          heading: "Pembinaan Tim Kompetitif",
          desc: "Menyiapkan program latihan rutin bagi pemain bersama manajer, pelatih, dan analis.",
        },
        {
          code: "2",
          heading: "Kerja Sama Mitra",
          desc: "Menjalankan program kolaborasi yang saling menguntungkan bersama para sponsor resmi.",
        },
        {
          code: "3",
          heading: "Manajemen Operasional di Jakarta",
          desc: "Menyediakan fasilitas latihan dan dukungan penuh bagi kebutuhan skuad di Jakarta.",
        },
      ],
      milestonesHeading: "PERJALANAN KAMI",
      milestonesSub:
        "Catatan perkembangan PT Adre Gemilang Jaya sejak berdiri.",
      officesHeading: "LOKASI OPERASIONAL",
      officesSub: "Alamat kantor manajemen dan tempat latihan tim.",
    },
    contactPage: {
      title: "KONTAK",
      subtitle:
        "Hubungi manajemen PT Adre Gemilang Jaya untuk keperluan sponsorship, undangan turnamen, atau pertanyaan umum.",
      directInfoHeading: "KONTAK LANGSUNG",
      emailLabel: "Email Resmi",
      hqLabel: "Alamat Kantor",
      hqValue:
        "Kawasan Niaga Terpadu Sudirman (SCBD), Jakarta Selatan, DKI Jakarta",
      responseSla:
        "Tim kami akan membalas pesan Anda dalam 1 sampai 2 hari kerja.",
      formHeading: "KIRIM PESAN",
      fullNameLabel: "Nama Lengkap",
      fullNamePlaceholder: "Nama Anda",
      companyLabel: "Perusahaan / Instansi",
      companyPlaceholder: "Nama perusahaan atau organisasi",
      emailInputLabel: "Email",
      emailPlaceholder: "nama@perusahaan.com",
      inquiryTypeLabel: "Kategori Keperluan",
      inquiryOptions: {
        SPONSORSHIP: "Proposal Sponsorship",
        TOURNAMENT: "Undangan Turnamen",
        GENERAL: "Pertanyaan Umum",
      },
      validationErrors: {
        fullName: "Nama lengkap wajib diisi minimal 3 karakter.",
        companyName: "Nama perusahaan atau instansi wajib diisi.",
        email: "Format alamat email tidak valid.",
        message: "Pesan wajib diisi minimal 20 karakter.",
      },
      messageLabel: "Pesan",
      messagePlaceholder: "Tulis rincian keperluan Anda di sini...",
      submitButton: "Kirim Pesan",
      submittingButton: "Mengirim...",
      successTitle: "Pesan Terkirim",
      successDesc:
        "Terima kasih telah menghubungi PT Adre Gemilang Jaya. Kami akan segera membalas pesan Anda melalui email.",
      sendAnotherBtn: "Kirim Pesan Baru",
    },
    footer: {
      navHeading: "Menu",
      divisionHeading: "Divisi",
      divisionPrefix: "Tim",
      sponsorLink: "Pengajuan Sponsorship",
      contactHeading: "Kontak",
      addressText: "SCBD, Jakarta Selatan, DKI Jakarta, Indonesia",
      rights: "Seluruh hak cipta dilindungi.",
      aboutLink: "Tentang Kami",
      contactLink: "Kontak",
    },
  },
  en: {
    nav: {
      cta: "Contact Us",
      mobileTitle: "Menu",
      langLabel: "Language",
    },
    home: {
      heroBadge: "",
      heroTitle: "",
      heroSubtitle: "",
      rosterCta: "View Roster",
      partnerCta: "Contact Us",
      partnersSectionTitle: "OFFICIAL PARTNERS",
      partnersSectionSub: "",
      upcomingTitle: "UPCOMING MATCHES",
      upcomingSub: "",
      viewAllMatches: "All Matches",
      divisionTitle: "OUR DIVISION",
      divisionSub: "",
      divisionBadge: "",
      divisionMeta: "",
      exploreDivisionBtn: "View Roster",
      newsTitle: "NEWS & EVENTS",
      newsSub: "",
      viewAllNews: "All News",
      resultsTitle: "MATCH RESULTS",
      resultsSub: "",
      watchStream: "Watch Stream",
      pointsUnit: "PTS",
    },
    teamsPage: {
      catalogTitle: "DIVISIONS & ROSTER",
      catalogSub: "",
      activePersonnelLabel: "Team Members",
      personnelComposition: "",
      openRosterCta: "View Roster",
      expansionTitle: "",
      expansionDesc: "",
      backToCatalog: "Back to Divisions",
      playersHeading: "PLAYERS",
      playersSub: "",
      managementHeading: "MANAGER & COACHING STAFF",
      managementSub: "Team manager, head coach, and analyst.",
      staffHeading: "MANAGER & COACHING STAFF",
      staffSub: "Team manager, head coach, and analyst.",
      achievementsHeading: "ACHIEVEMENTS",
      achievementsSub: "",
      scheduleCta: "Match Schedule",
      roleLabels: {
        IGL: "Captain & In-Game Leader",
        RUSHER: "Rusher",
        SUPPORT: "Support",
        SCOUT: "Scout",
        MANAGER: "Team Manager",
        COACH: "Head Coach",
        ANALYST: "Analyst",
      },
    },
    matchesPage: {
      title: "MATCHES",
      subtitle: "Upcoming tournament schedule and past match results.",
      filterStatusAll: "All",
      filterStatusUpcoming: "Upcoming",
      filterStatusCompleted: "Completed",
      filterGameAll: "All Divisions",
      watchStream: "Watch Stream",
      upcomingBadge: "UPCOMING",
      completedBadge: "COMPLETED",
      emptyState: "No matches available for this filter.",
      pointsUnit: "PTS",
    },
    newsPage: {
      title: "NEWS & EVENTS",
      subtitle:
        "Latest updates on our PUBG Mobile squad and PT Adre Gemilang Jaya activities.",
      filterAllCategories: "All",
      readMore: "Read Article",
      readTimeUnit: "min read",
      emptyState: "No news articles in this category.",
      backToNews: "Back to News",
      publishedBy: "By",
      relatedHeading: "OTHER NEWS",
    },
    partnersPage: {
      title: "PARTNERS & SPONSORS",
      subtitle: "Official partners collaborating with PT Adre Gemilang Jaya.",
      visitPartner: "Partner Website",
      ctaBannerTitle: "Sponsorship Inquiries",
      ctaBannerDesc:
        "Get in touch with our team in Jakarta for sponsorship and partnership discussions.",
      ctaButton: "Contact Us",
    },
    aboutPage: {
      title: "ABOUT US",
      subtitle:
        "PT Adre Gemilang Jaya is an esports team management company based in Jakarta.",
      visionBadge: "VISION",
      visionTitle: "Company Vision",
      visionText:
        "To become a competitive professional esports organization at the national and Southeast Asian levels through structured team development.",
      missionBadge: "MISSION",
      missionTitle: "Company Mission",
      missions: [
        {
          code: "1",
          heading: "Competitive Team Training",
          desc: "Provide regular training programs for players supported by a manager, coach, and analyst.",
        },
        {
          code: "2",
          heading: "Partner Collaboration",
          desc: "Deliver mutually beneficial brand programs with our official sponsors.",
        },
        {
          code: "3",
          heading: "Jakarta Operations",
          desc: "Maintain training facilities and operational support for our squad in Jakarta.",
        },
      ],
      milestonesHeading: "OUR JOURNEY",
      milestonesSub:
        "Key milestones of PT Adre Gemilang Jaya since its establishment.",
      officesHeading: "OPERATIONAL LOCATION",
      officesSub: "Management office and team training location.",
    },
    contactPage: {
      title: "CONTACT",
      subtitle:
        "Reach out to PT Adre Gemilang Jaya management for sponsorship proposals, tournament invitations, or general inquiries.",
      directInfoHeading: "DIRECT CONTACT",
      emailLabel: "Official Email",
      hqLabel: "Office Address",
      hqValue:
        "Sudirman Central Business District (SCBD), South Jakarta, DKI Jakarta",
      responseSla: "Our team typically replies within 1 to 2 business days.",
      formHeading: "SEND A MESSAGE",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Your name",
      companyLabel: "Company / Organization",
      companyPlaceholder: "Company or organization name",
      emailInputLabel: "Email",
      emailPlaceholder: "name@company.com",
      inquiryTypeLabel: "Category",
      inquiryOptions: {
        SPONSORSHIP: "Sponsorship Proposal",
        TOURNAMENT: "Tournament Invitation",
        GENERAL: "General Inquiry",
      },
      validationErrors: {
        fullName: "Full name is required (minimum 3 characters).",
        companyName: "Company or organization name is required.",
        email: "Please enter a valid email address.",
        message: "Message must be at least 20 characters.",
      },
      messageLabel: "Message",
      messagePlaceholder: "Write the details of your inquiry here...",
      submitButton: "Send Message",
      submittingButton: "Sending...",
      successTitle: "Message Sent",
      successDesc:
        "Thank you for contacting PT Adre Gemilang Jaya. We will reply to your email shortly.",
      sendAnotherBtn: "Send Another Message",
    },
    footer: {
      navHeading: "Menu",
      divisionHeading: "Division",
      divisionPrefix: "Team",
      sponsorLink: "Sponsorship Inquiry",
      contactHeading: "Contact",
      addressText: "SCBD, South Jakarta, DKI Jakarta, Indonesia",
      rights: "All rights reserved.",
      aboutLink: "About Us",
      contactLink: "Contact",
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
    const saved = window.localStorage.getItem("adre_locale");
    if (saved === "en" || saved === "id") {
      const timer = window.setTimeout(() => {
        setLocaleState(saved);
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("adre_locale", nextLocale);
  };

  const contextValue = useMemo(
    () => ({
      locale,
      setLocale,
      t: DICTIONARY[locale] as DictionaryType,
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
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

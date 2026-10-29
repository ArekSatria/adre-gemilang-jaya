import type {
  GlobalSettings,
  HomePayload,
  DivisionSummary,
  DivisionDetail,
  MatchesPayload,
} from "@/lib/schemas";

export const mockGlobalSettings: GlobalSettings = {
  siteName: "PT Adre Gemilang Jaya",
  logoUrl: "/images/logo-adre.png",
  tagline: "Organisasi Esports Jakarta Indonesia",
  activeDivisionsNav: [
    {
      name: "PUBG Mobile",
      slug: "pubg-mobile",
    },
  ],
  contactQuick: {
    businessEmail: "contact@adregemilang.co.id",
    partnershipEmail: "partnership@adregemilang.co.id",
    addressShort: "SCBD, Jakarta Selatan, DKI Jakarta, Indonesia",
  },
  socials: {
    instagram: "https://instagram.com/adreesports",
    youtube: "https://youtube.com/@adreesports",
    tiktok: "https://tiktok.com/@adreesports",
    x: "https://x.com/adreesports",
  },
};

export const mockDivisionsCatalog: DivisionSummary[] = [
  {
    id: "div-01",
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    shortCode: "PUBGM",
    gameTitle: "PUBG Mobile",
    bannerImageUrl: null,
    activeRosterCount: 7,
    tagline: "Tim PUBG Mobile PT Adre Gemilang Jaya yang berbasis di Jakarta.",
  },
];

export const mockActiveDivisions = mockDivisionsCatalog;

export const mockDivisionDetails: Record<string, DivisionDetail> = {
  "pubg-mobile": {
    id: "div-01",
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    shortCode: "PUBGM",
    gameTitle: "PUBG Mobile",
    bannerImageUrl: null,
    activeRosterCount: 7,
    tagline: "Tim PUBG Mobile PT Adre Gemilang Jaya yang berbasis di Jakarta.",
    description:
      "Divisi PUBG Mobile PT Adre Gemilang Jaya di Jakarta yang diperkuat oleh 4 pemain inti, 1 manajer tim, serta 2 staf pelatih dan analis.",
    roster: [
      {
        id: "rst-01",
        ign: "ADRE Raptor",
        fullName: "Bagas Pratama",
        role: "IGL",
        roleType: "PLAYER",
        countryCode: "ID",
        photoUrl: null,
        joinDate: "2024-03-10",
      },
      {
        id: "rst-02",
        ign: "ADRE Blaze",
        fullName: "Rizky Ramadhan",
        role: "RUSHER",
        roleType: "PLAYER",
        countryCode: "ID",
        photoUrl: null,
        joinDate: "2024-03-10",
      },
      {
        id: "rst-03",
        ign: "ADRE Aegis",
        fullName: "Fajar Nugroho",
        role: "SUPPORT",
        roleType: "PLAYER",
        countryCode: "ID",
        photoUrl: null,
        joinDate: "2024-06-15",
      },
      {
        id: "rst-04",
        ign: "ADRE Hawk",
        fullName: "Ilham Saputra",
        role: "SCOUT",
        roleType: "PLAYER",
        countryCode: "ID",
        photoUrl: null,
        joinDate: "2024-08-01",
      },
      {
        id: "rst-05",
        ign: "ADRE Valkyrie",
        fullName: "Dimas Prakoso",
        role: "MANAGER",
        roleType: "STAFF",
        countryCode: "ID",
        photoUrl: null,
        joinDate: "2024-04-01",
      },
      {
        id: "rst-06",
        ign: "ADRE Tactix",
        fullName: "Hendra Wijaya",
        role: "COACH",
        roleType: "STAFF",
        countryCode: "ID",
        photoUrl: null,
        joinDate: "2024-03-10",
      },
      {
        id: "rst-07",
        ign: "ADRE Cipher",
        fullName: "Kevin Santoso",
        role: "ANALYST",
        roleType: "STAFF",
        countryCode: "ID",
        photoUrl: null,
        joinDate: "2025-01-12",
      },
    ],
    achievements: [
      {
        id: "ach-01",
        title: "PUBG Mobile National Championship (PMNC) Indonesia 2026",
        placement: "Juara 1 (148 Poin)",
        year: "2026",
      },
      {
        id: "ach-02",
        title: "SEA Esports Pro Invitational Fall 2025",
        placement: "Juara 2",
        year: "2025",
      },
      {
        id: "ach-03",
        title: "Jakarta Battle Royale Cup 2025",
        placement: "Juara 1",
        year: "2025",
      },
    ],
  },
};

export const mockMatchesPayload: MatchesPayload = {
  items: [
    {
      id: "mtc-101",
      tournamentName: "PUBG Mobile Super League (PMSL) SEA Fall 2026",
      stage: "Minggu 1 Hari 1 Babak Liga",
      scheduledAt: "2026-11-15T17:00:00.000Z",
      status: "UPCOMING",
      formatType: "BATTLE_ROYALE",
      division: {
        name: "PUBG Mobile",
        slug: "pubg-mobile",
        shortCode: "PUBGM",
      },
      streamUrl: "https://youtube.com/@adreesports",
      resultBattleRoyale: null,
    },
    {
      id: "mtc-102",
      tournamentName: "PUBG Mobile Super League (PMSL) SEA Fall 2026",
      stage: "Minggu 1 Hari 2 Babak Liga",
      scheduledAt: "2026-11-16T17:00:00.000Z",
      status: "UPCOMING",
      formatType: "BATTLE_ROYALE",
      division: {
        name: "PUBG Mobile",
        slug: "pubg-mobile",
        shortCode: "PUBGM",
      },
      streamUrl: "https://youtube.com/@adreesports",
      resultBattleRoyale: null,
    },
    {
      id: "mtc-098",
      tournamentName: "PMNC Indonesia 2026 Grand Finals",
      stage: "Hari 3 Babak Final",
      scheduledAt: "2026-09-20T16:00:00.000Z",
      status: "COMPLETED",
      formatType: "BATTLE_ROYALE",
      division: {
        name: "PUBG Mobile",
        slug: "pubg-mobile",
        shortCode: "PUBGM",
      },
      streamUrl: "https://youtube.com/@adreesports",
      resultBattleRoyale: {
        placement: 1,
        placementLabel: "#1 WWCD",
        totalPoints: 148,
        wwcdCount: 4,
      },
    },
    {
      id: "mtc-095",
      tournamentName: "PMNC Indonesia 2026 Babak Kualifikasi Akhir",
      stage: "Hari 2 Grup A dan Grup B",
      scheduledAt: "2026-09-05T16:00:00.000Z",
      status: "COMPLETED",
      formatType: "BATTLE_ROYALE",
      division: {
        name: "PUBG Mobile",
        slug: "pubg-mobile",
        shortCode: "PUBGM",
      },
      streamUrl: "https://youtube.com/@adreesports",
      resultBattleRoyale: {
        placement: 2,
        placementLabel: "#2 Place",
        totalPoints: 126,
        wwcdCount: 2,
      },
    },
  ],
};

export const mockNewsItems = [
  {
    id: "nws-01",
    title: "ADRE Esports Raih Juara 1 Grand Finals PMNC Indonesia 2026",
    slug: "adre-esports-juara-kualifikasi-pmnc-2026",
    excerpt:
      "Tim PUBG Mobile PT Adre Gemilang Jaya mengamankan gelar juara nasional dengan perolehan 148 poin.",
    coverImageUrl: null,
    coverImageAlt: "ADRE Esports Juara 1 PMNC Indonesia 2026",
    isFeatured: true,
    publishedAt: "2026-09-21T09:00:00.000Z",
    readingTimeMinutes: 4,
    category: {
      name: "Turnamen",
      slug: "turnamen",
    },
  },
  {
    id: "nws-02",
    title: "Persiapan Skuad PUBG Mobile Menuju PMSL SEA Fall 2026",
    slug: "persiapan-intensif-skuad-pubgm-menuju-pmsl-sea-2026",
    excerpt:
      "Manajemen dan staf pelatih di Jakarta mengadakan latihan rutin untuk menghadapi turnamen tingkat Asia Tenggara.",
    coverImageUrl: null,
    coverImageAlt: "Latihan Skuad PUBG Mobile ADRE di Jakarta",
    isFeatured: false,
    publishedAt: "2026-10-02T10:30:00.000Z",
    readingTimeMinutes: 3,
    category: {
      name: "Turnamen",
      slug: "turnamen",
    },
  },
  {
    id: "nws-03",
    title: "Pengumuman Kerja Sama Sponsor dan Kegiatan Komunitas 2026",
    slug: "ekspansi-kemitraan-komersial-adre-gemilang-jaya-2026",
    excerpt:
      "PT Adre Gemilang Jaya menjalin kolaborasi baru dan mengadakan acara komunitas PUBG Mobile di Jakarta.",
    coverImageUrl: null,
    coverImageAlt: "Kerja Sama Sponsor PT Adre Gemilang Jaya Jakarta",
    isFeatured: false,
    publishedAt: "2026-10-10T08:15:00.000Z",
    readingTimeMinutes: 5,
    category: {
      name: "Pengumuman",
      slug: "pengumuman",
    },
  },
];

export const mockNewsCatalog = {
  categories: [
    { name: "Turnamen", slug: "turnamen" },
    { name: "Pengumuman", slug: "pengumuman" },
  ],
  items: mockNewsItems,
};

export const mockNewsListPayload = mockNewsCatalog;

export const mockNewsDetailsBySlug: Record<
  string,
  (typeof mockNewsItems)[number] & {
    contentHtml: string;
    author: { name: string; avatarUrl: string | null };
    relatedNews: typeof mockNewsItems;
  }
> = {
  "adre-esports-juara-kualifikasi-pmnc-2026": {
    ...mockNewsItems[0],
    contentHtml:
      "<p>Tim PUBG Mobile PT Adre Gemilang Jaya berhasil meraih Juara 1 pada babak Grand Finals PUBG Mobile National Championship (PMNC) Indonesia 2026 dengan total 148 poin.</p><h3>Jalannya Pertandingan</h3><p>Bersama kapten tim, manajer, dan staf pelatih di Jakarta, para pemain tampil konsisten sejak hari pertama hingga memastikan tempat di turnamen PMSL SEA Fall 2026.</p>",
    author: {
      name: "Tim Media PT Adre Gemilang Jaya",
      avatarUrl: null,
    },
    relatedNews: [mockNewsItems[1], mockNewsItems[2]],
  },
  "persiapan-intensif-skuad-pubgm-menuju-pmsl-sea-2026": {
    ...mockNewsItems[1],
    contentHtml:
      "<p>Menjelang dimulainya PUBG Mobile Super League (PMSL) SEA Fall 2026, PT Adre Gemilang Jaya menambah porsi latihan tim di fasilitas latihan Jakarta.</p><h3>Evaluasi Strategi</h3><p>Latihan difokuskan pada koordinasi antar pemain inti serta pembahasan rekaman pertandingan bersama manajer dan analis tim.</p>",
    author: {
      name: "Tim Media PT Adre Gemilang Jaya",
      avatarUrl: null,
    },
    relatedNews: [mockNewsItems[0], mockNewsItems[2]],
  },
  "ekspansi-kemitraan-komersial-adre-gemilang-jaya-2026": {
    ...mockNewsItems[2],
    contentHtml:
      "<p>PT Adre Gemilang Jaya meresmikan rangkaian program bersama sponsor dan acara temu komunitas penggemar esports di Jakarta untuk musim kompetisi 2026.</p><h3>Dukungan Mitra</h3><p>Bersama mitra perangkat gaming dan apparel resmi, tim PUBG Mobile siap berlaga di berbagai turnamen resmi tahun ini.</p>",
    author: {
      name: "Tim Media PT Adre Gemilang Jaya",
      avatarUrl: null,
    },
    relatedNews: [mockNewsItems[0], mockNewsItems[1]],
  },
};

export const mockNewsDetails = mockNewsDetailsBySlug;

export const mockHomePayload: HomePayload = {
  hero: {
    badgeText: "PT ADRE GEMILANG JAYA",
    headline: "TIM PUBG MOBILE PT ADRE GEMILANG JAYA",
    subheadline:
      "Beroperasi di Jakarta dengan 4 pemain inti, 1 manajer tim, dan 2 staf pelatih.",
    primaryCta: {
      label: "Lihat Roster",
      href: "/teams/pubg-mobile",
    },
    secondaryCta: {
      label: "Jadwal Pertandingan",
      href: "/matches",
    },
    highlightStats: [
      { label: "PMNC Indonesia 2026", value: "#1" },
      { label: "Total Poin Final", value: "148" },
      { label: "Anggota Tim", value: "7" },
    ],
  },
  nextMatch: mockMatchesPayload.items[0],
  activeDivisions: mockDivisionsCatalog,
  recentResults: [mockMatchesPayload.items[2], mockMatchesPayload.items[3]],
  latestNews: mockNewsItems,
  partnersStrip: [
    {
      id: "prt-01",
      name: "Adre Gemilang Jaya Corp",
      tier: "PRINCIPAL",
      logoUrl: null,
      websiteUrl: "https://adregemilang.co.id",
    },
    {
      id: "prt-02",
      name: "Apex Gear Indonesia",
      tier: "OFFICIAL",
      logoUrl: null,
      websiteUrl: "https://example.com/apex-gear",
    },
    {
      id: "prt-03",
      name: "Vortex Pro Apparel",
      tier: "OFFICIAL",
      logoUrl: null,
      websiteUrl: "https://example.com/vortex-apparel",
    },
  ],
};

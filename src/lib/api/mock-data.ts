import type {
  GlobalSettings,
  DivisionSummary,
  DivisionDetail,
  MatchesPayload,
  NewsCatalogPayload,
  NewsDetail,
  PartnerItem,
  CompanyProfile,
  HomePayload,
} from "@/lib/schemas";

export const mockGlobalSettings: GlobalSettings = {
  siteName: "PT Adre Gemilang Jaya",
  logoUrl: null,
  tagline: "Organisasi Manajemen Esports Profesional Indonesia",
  activeDivisionsNav: [{ name: "PUBG Mobile", slug: "pubg-mobile" }],
  contactQuick: {
    businessEmail: "business@adregemilangjaya.com",
    partnershipEmail: "partnership@adregemilangjaya.com",
    addressShort: "Jakarta, Indonesia",
  },
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
    facebook: "https://facebook.com",
    x: "https://x.com",
  },
};

export const mockDivisions: DivisionSummary[] = [
  {
    id: "div-pubgm",
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    shortCode: "PUBGM",
    bannerUrl: null,
    logoUrl: null,
    description:
      "Divisi utama PT Adre Gemilang Jaya yang berkompetisi di turnamen profesional tingkat nasional dan Asia Tenggara.",
    isActive: true,
    activeRosterCount: 5,
  },
];

export const mockDivisionDetails: Record<string, DivisionDetail> = {
  "pubg-mobile": {
    ...mockDivisions[0],
    roster: [
      {
        id: "plr-1",
        ign: "ADRExValkyrie",
        fullName: "M. Rizky Pratama",
        role: "IGL",
        roleType: "PLAYER",
        photoUrl: null,
        displayOrder: 1,
        socials: {
          instagram: "https://instagram.com",
          youtube: "https://youtube.com",
        },
      },
      {
        id: "plr-2",
        ign: "ADRExNemesis",
        fullName: "Bagas Adi Saputra",
        role: "RUSHER",
        roleType: "PLAYER",
        photoUrl: null,
        displayOrder: 2,
        socials: {
          instagram: "https://instagram.com",
          tiktok: "https://tiktok.com",
        },
      },
      {
        id: "plr-3",
        ign: "ADRExAegis",
        fullName: "Fajar Ramadhan",
        role: "SUPPORT",
        roleType: "PLAYER",
        photoUrl: null,
        displayOrder: 3,
        socials: { instagram: "https://instagram.com" },
      },
      {
        id: "plr-4",
        ign: "ADRExHawkeye",
        fullName: "Kevin Wijaya",
        role: "SCOUT",
        roleType: "PLAYER",
        photoUrl: null,
        displayOrder: 4,
        socials: { instagram: "https://instagram.com" },
      },
      {
        id: "stf-1",
        ign: "ADRExTactix",
        fullName: "Hendra Kusuma",
        role: "Coach",
        roleType: "STAFF",
        photoUrl: null,
        displayOrder: 1,
        socials: { instagram: "https://instagram.com" },
      },
      {
        id: "stf-2",
        ign: "ADRExCipher",
        fullName: "Rian Firmansyah",
        role: "Analyst",
        roleType: "STAFF",
        photoUrl: null,
        displayOrder: 2,
        socials: { instagram: "https://instagram.com" },
      },
    ],
    achievements: [
      {
        id: "ach-1",
        year: 2026,
        tournamentName: "PUBG Mobile National Championship (PMNC) Indonesia",
        placementLabel: "Juara 1",
      },
      {
        id: "ach-2",
        year: 2025,
        tournamentName: "SEA Esports Pro Invitational Fall",
        placementLabel: "Juara 2",
      },
      {
        id: "ach-3",
        year: 2025,
        tournamentName: "Piala Presiden Esports Regional Qualifier",
        placementLabel: "Juara 1",
      },
    ],
  },
};

export const mockMatchesPayload: MatchesPayload = {
  availableGames: [{ name: "PUBG Mobile", slug: "pubg-mobile" }],
  items: [
    {
      id: "mtc-101",
      status: "UPCOMING",
      matchFormat: "BATTLE_ROYALE",
      scheduledAt: "2026-11-15T12:00:00Z",
      tournamentName: "PMSL SEA Fall 2026",
      tournamentStage: "Grand Finals Day 1 (6 Matches)",
      division: { name: "PUBG Mobile", slug: "pubg-mobile" },
      ourTeamName: "ADRE Esports",
      opponentName: null,
      result: null,
      streamUrl: "https://youtube.com",
    },
    {
      id: "mtc-102",
      status: "UPCOMING",
      matchFormat: "BATTLE_ROYALE",
      scheduledAt: "2026-11-16T12:00:00Z",
      tournamentName: "PMSL SEA Fall 2026",
      tournamentStage: "Grand Finals Day 2 (6 Matches)",
      division: { name: "PUBG Mobile", slug: "pubg-mobile" },
      ourTeamName: "ADRE Esports",
      opponentName: null,
      result: null,
      streamUrl: "https://youtube.com",
    },
    {
      id: "mtc-098",
      status: "COMPLETED",
      matchFormat: "BATTLE_ROYALE",
      scheduledAt: "2026-10-18T12:00:00Z",
      tournamentName: "PMNC Indonesia 2026",
      tournamentStage: "Final Stage Matchday 3",
      division: { name: "PUBG Mobile", slug: "pubg-mobile" },
      ourTeamName: "ADRE Esports",
      opponentName: null,
      result: {
        placementBadge: "#1 WWCD",
        totalPoints: 148,
        ourScore: null,
        opponentScore: null,
        outcome: "WIN",
      },
      streamUrl: null,
    },
    {
      id: "mtc-097",
      status: "COMPLETED",
      matchFormat: "BATTLE_ROYALE",
      scheduledAt: "2026-10-17T12:00:00Z",
      tournamentName: "PMNC Indonesia 2026",
      tournamentStage: "Final Stage Matchday 2",
      division: { name: "PUBG Mobile", slug: "pubg-mobile" },
      ourTeamName: "ADRE Esports",
      opponentName: null,
      result: {
        placementBadge: "#2 PLACE",
        totalPoints: 96,
        ourScore: null,
        opponentScore: null,
        outcome: "TOP3",
      },
      streamUrl: null,
    },
    {
      id: "mtc-095",
      status: "COMPLETED",
      matchFormat: "BATTLE_ROYALE",
      scheduledAt: "2026-09-20T11:30:00Z",
      tournamentName: "Piala Presiden Esports 2026",
      tournamentStage: "Closed Qualifier Finals",
      division: { name: "PUBG Mobile", slug: "pubg-mobile" },
      ourTeamName: "ADRE Esports",
      opponentName: null,
      result: {
        placementBadge: "#1 WWCD",
        totalPoints: 132,
        ourScore: null,
        opponentScore: null,
        outcome: "WIN",
      },
      streamUrl: null,
    },
  ],
};

export const mockNewsList: NewsDetail[] = [
  {
    id: "nws-1",
    title:
      "PT Adre Gemilang Jaya Resmi Umumkan Roster Utama PUBG Mobile Musim Kompetisi 2026",
    slug: "pt-adre-gemilang-jaya-resmi-umumkan-roster-utama-pubg-mobile-2026",
    excerpt:
      "Menghadapi kalender turnamen nasional dan Asia Tenggara, manajemen resmi memperkenalkan empat pemain inti beserta jajaran staf pelatih.",
    contentHtml:
      "<p><strong>PT Adre Gemilang Jaya</strong> resmi memperkenalkan susunan roster divisi PUBG Mobile untuk mengarungi musim kompetisi 2026. Langkah strategis ini merupakan bagian dari komitmen manajemen dalam membangun ekosistem atlet esports profesional yang berdaya saing tinggi.</p><h2>Fokus Persiapan Turnamen Tingkat Nasional</h2><p>Di bawah arahan pelatih kepala ADRExTactix, skuad ini telah menjalani pemusatan latihan intensif guna memperkuat koordinasi rotasi dan konsistensi poin di setiap peta pertandingan.</p>",
    coverImageUrl: null,
    coverImageAlt: "Skuad PUBG Mobile PT Adre Gemilang Jaya",
    isFeatured: true,
    publishedAt: "2026-10-15T09:00:00Z",
    readingTimeMinutes: 3,
    category: { name: "Pengumuman", slug: "pengumuman" },
    division: { name: "PUBG Mobile", slug: "pubg-mobile" },
    author: { name: "Tim Media ADRE", avatarUrl: null },
    seo: {
      metaTitle: "Roster Resmi PUBG Mobile PT Adre Gemilang Jaya 2026",
      metaDescription:
        "Susunan pemain dan pelatih divisi PUBG Mobile PT Adre Gemilang Jaya.",
      ogImageUrl: null,
    },
    relatedNews: [],
  },
  {
    id: "nws-2",
    title:
      "Raih Winner Winner Chicken Dinner, ADRE Esports Puncaki Klasemen Kualifikasi Nasional",
    slug: "raih-wwcd-adre-esports-puncaki-klasemen-kualifikasi-nasional",
    excerpt:
      "Penampilan impresif ditunjukkan oleh divisi PUBG Mobile dengan mengoleksi total 148 poin pada babak final akhir pekan lalu.",
    contentHtml:
      "<p>Divisi PUBG Mobile PT Adre Gemilang Jaya berhasil mengamankan posisi puncak klasemen setelah mencatatkan tiga kali Winner Winner Chicken Dinner (WWCD).</p>",
    coverImageUrl: null,
    coverImageAlt: "Selebrasi kemenangan tim ADRE Esports",
    isFeatured: false,
    publishedAt: "2026-10-19T14:30:00Z",
    readingTimeMinutes: 4,
    category: { name: "Hasil Turnamen", slug: "hasil-turnamen" },
    division: { name: "PUBG Mobile", slug: "pubg-mobile" },
    author: { name: "Tim Media ADRE", avatarUrl: null },
    seo: {
      metaTitle: "ADRE Esports Puncaki Klasemen Kualifikasi Nasional",
      metaDescription:
        "Rekapitulasi hasil pertandingan divisi PUBG Mobile PT Adre Gemilang Jaya.",
      ogImageUrl: null,
    },
    relatedNews: [],
  },
  {
    id: "nws-3",
    title:
      "Membangun Kemitraan Strategis di Industri Esports Bersama PT Adre Gemilang Jaya",
    slug: "membangun-kemitraan-strategis-di-industri-esports-bersama-pt-adre",
    excerpt:
      "Keterbukaan kolaborasi komersial dan eksposur audiens digital generasi muda melalui manajemen tim yang terstruktur.",
    contentHtml:
      "<p>PT Adre Gemilang Jaya membuka peluang kolaborasi strategis bagi mitra korporasi dan sponsor yang ingin menjangkau komunitas penggemar esports di Indonesia.</p>",
    coverImageUrl: null,
    coverImageAlt: "Kolaborasi strategis PT Adre Gemilang Jaya",
    isFeatured: false,
    publishedAt: "2026-10-21T10:00:00Z",
    readingTimeMinutes: 3,
    category: { name: "Korporasi", slug: "korporasi" },
    division: null,
    author: { name: "Manajemen Korporasi", avatarUrl: null },
    seo: {
      metaTitle: "Kemitraan Strategis Esports PT Adre Gemilang Jaya",
      metaDescription:
        "Peluang kerja sama sponsor dan mitra komersial PT Adre Gemilang Jaya.",
      ogImageUrl: null,
    },
    relatedNews: [],
  },
];

export const mockNewsCatalogPayload: NewsCatalogPayload = {
  categories: [
    { name: "Pengumuman", slug: "pengumuman" },
    { name: "Hasil Turnamen", slug: "hasil-turnamen" },
    { name: "Korporasi", slug: "korporasi" },
  ],
  featured: mockNewsList[0],
  items: mockNewsList,
};

export const mockPartners: PartnerItem[] = [
  {
    id: "prt-1",
    name: "Mitra Utama Korporasi",
    tier: "PRINCIPAL",
    logoUrl: null,
    description:
      "Mitra strategis utama dalam mendukung infrastruktur pelatihan dan pengembangan atlet esports profesional PT Adre Gemilang Jaya.",
    websiteUrl: "https://example.com",
    displayOrder: 1,
  },
  {
    id: "prt-2",
    name: "Mitra Perangkat Gaming Resmi",
    tier: "OFFICIAL",
    logoUrl: null,
    description:
      "Penyedia perangkat keras kompetisi berkinerja tinggi untuk mendukung performa skuad PUBG Mobile di setiap turnamen.",
    websiteUrl: "https://example.com",
    displayOrder: 2,
  },
  {
    id: "prt-3",
    name: "Mitra Apparel & Seragam Kompetisi",
    tier: "SUPPLIER",
    logoUrl: null,
    description:
      "Mitra penyedia jersey tanding resmi dengan material ergonomis bagi seluruh divisi aktif PT Adre Gemilang Jaya.",
    websiteUrl: "https://example.com",
    displayOrder: 3,
  },
];

export const mockCompanyProfile: CompanyProfile = {
  companyName: "PT Adre Gemilang Jaya",
  aboutHtml:
    "<p><strong>PT Adre Gemilang Jaya</strong> adalah perusahaan manajemen olahraga elektronik (esports) profesional di Indonesia yang berfokus pada pembinaan talenta kompetitif, pengelolaan divisi tim berstandar industri, serta penciptaan nilai komersial yang berkelanjutan bagi mitra strategis.</p><p>Berawal dari pembentukan skuad kompetitif PUBG Mobile, organisasi kami dirancang dengan fondasi manajemen modern yang siap berekspansi ke berbagai judul permainan kompetitif nasional maupun internasional.</p>",
  companyImageUrl: null,
  vision:
    "Menjadi organisasi manajemen esports profesional yang paling kredibel, berprestasi, dan bernilai tinggi di Asia Tenggara.",
  missions: [
    "Membina atlet esports profesional melalui sistem pelatihan terstruktur, analisis data, dan dukungan staf ahli.",
    "Membangun ekosistem kemitraan komersial yang transparan dan berdampak tinggi bagi sponsor.",
    "Menghadirkan tayangan serta informasi kompetitif yang inspiratif bagi komunitas penggemar esports.",
  ],
  coreValues: [
    {
      id: "val-1",
      title: "Integritas & Sportivitas",
      description:
        "Menjunjung tinggi kejujuran dan etika kompetisi di setiap turnamen resmi.",
      iconName: "shield",
    },
    {
      id: "val-2",
      title: "Mentalitas Juara",
      description:
        "Berorientasi pada pencapaian prestasi tertinggi melalui evaluasi disiplin.",
      iconName: "trophy",
    },
    {
      id: "val-3",
      title: "Adaptasi & Inovasi",
      description:
        "Responsif terhadap perkembangan meta permainan dan teknologi industri digital.",
      iconName: "zap",
    },
    {
      id: "val-4",
      title: "Sinergi Kemitraan",
      description:
        "Tumbuh bersama komunitas, pemain, dan mitra sponsor secara berkelanjutan.",
      iconName: "users",
    },
  ],
  milestones: [
    {
      year: 2026,
      title: "Peluncuran Portal Digital Resmi & Dominasi Divisi PUBG Mobile",
      description:
        "Meraih gelar juara nasional PMNC dan meluncurkan ekosistem website company profile berbasis arsitektur Headless CMS.",
    },
    {
      year: 2025,
      title: "Akselerasi Kompetitif & Akuisisi Talenta",
      description:
        "Memperkuat struktur kepelatihan divisi PUBG Mobile dan menembus babak final turnamen tingkat Asia Tenggara.",
    },
    {
      year: 2024,
      title: "Pendirian Badan Hukum PT Adre Gemilang Jaya",
      description:
        "Peresmian entitas korporasi dan peletakan fondasi manajemen organisasi esports profesional.",
    },
  ],
  contact: {
    businessEmail: "business@adregemilangjaya.com",
    partnershipEmail: "partnership@adregemilangjaya.com",
    officeAddress: "Kantor Manajemen PT Adre Gemilang Jaya, Indonesia",
    mapEmbedUrl: null,
    socials: mockGlobalSettings.socials,
  },
};

export const mockHomePayload: HomePayload = {
  hero: {
    badge: "OFFICIAL ESPORTS ORGANIZATION",
    title: "MENGUKUHKAN DOMINASI DI ARENA KOMPETITIF PROFESIONAL",
    subtitle:
      "Pusat informasi resmi manajemen korporasi, skuad divisi kompetitif PUBG Mobile, jadwal turnamen, dan pencapaian PT Adre Gemilang Jaya.",
    backgroundImageUrl: null,
    primaryCta: { label: "Eksplorasi Divisi", href: "/teams" },
    secondaryCta: { label: "Profil Perusahaan", href: "/about" },
  },
  nextMatch: {
    id: "mtc-101",
    tournamentName: "PMSL SEA Fall 2026",
    matchLabel: "ADRE Esports — Grand Finals Day 1",
    scheduledAt: "2026-11-15T12:00:00Z",
    division: { name: "PUBG Mobile", slug: "pubg-mobile" },
    streamUrl: "https://youtube.com",
  },
  divisionQuickCard: {
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    logoUrl: null,
    activeRosterCount: 5,
  },
  partnersStrip: mockPartners.map((p) => ({
    id: p.id,
    name: p.name,
    logoUrl: p.logoUrl,
    websiteUrl: p.websiteUrl,
  })),
  activeDivisions: mockDivisions,
  upcomingMatches: mockMatchesPayload.items.slice(0, 3),
  latestNews: mockNewsList.slice(0, 3),
  companyIntro: {
    headline: "Manajemen Esports Modern Berstandar Korporasi",
    summary:
      "PT Adre Gemilang Jaya menggabungkan pembinaan atlet kompetitif dengan tata kelola organisasi yang profesional dan siap berekspansi lintas divisi game.",
    imageUrl: null,
  },
};
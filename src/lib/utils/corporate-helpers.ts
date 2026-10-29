import { z } from "zod";
import type { Locale } from "@/lib/i18n/LanguageContext";

export const InquiryCategoryEnum = z.enum([
  "SPONSORSHIP",
  "TOURNAMENT",
  "GENERAL",
]);

export const ContactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Nama lengkap wajib diisi minimal 3 karakter."),
  companyName: z
    .string()
    .trim()
    .min(2, "Nama perusahaan atau instansi wajib diisi."),
  email: z.string().trim().email("Format alamat email tidak valid."),
  inquiryType: InquiryCategoryEnum,
  message: z.string().trim().min(20, "Pesan wajib diisi minimal 20 karakter."),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export function validateContactSubmission(input: unknown) {
  return ContactFormSchema.safeParse(input);
}

export interface CorporatePartnerItem {
  id: string;
  name: string;
  tierLabel: string;
  category: { id: string; en: string };
  description: { id: string; en: string };
  websiteUrl: string;
}

export const CORPORATE_PARTNERS_DATA: CorporatePartnerItem[] = [
  {
    id: "prt-01",
    name: "Adre Gemilang Jaya Corp",
    tierLabel: "MITRA UTAMA",
    category: {
      id: "Mitra Utama Manajemen Tim",
      en: "Principal Team Partner",
    },
    description: {
      id: "Mendukung operasional harian, fasilitas tempat latihan di Jakarta, dan pengembangan tim PUBG Mobile PT Adre Gemilang Jaya.",
      en: "Supporting daily operations, training facilities in Jakarta, and team development for PT Adre Gemilang Jaya.",
    },
    websiteUrl: "https://adregemilang.co.id",
  },
  {
    id: "prt-02",
    name: "Apex Gear Indonesia",
    tierLabel: "MITRA PERANGKAT",
    category: {
      id: "Mitra Perangkat Gaming",
      en: "Gaming Hardware Partner",
    },
    description: {
      id: "Menyediakan perangkat audio dan perlengkapan latihan bagi pemain inti serta staf pelatih selama musim turnamen.",
      en: "Providing audio gear and training peripherals for our players and coaching staff throughout the tournament season.",
    },
    websiteUrl: "https://example.com/apex-gear",
  },
  {
    id: "prt-03",
    name: "Vortex Pro Apparel",
    tierLabel: "MITRA APPAREL",
    category: {
      id: "Mitra Jersey Resmi Tim",
      en: "Official Team Jersey Partner",
    },
    description: {
      id: "Memproduksi seragam tanding resmi dan perlengkapan pakaian tim ADRE Esports di setiap turnamen.",
      en: "Producing official match jerseys and team apparel for ADRE Esports across all tournaments.",
    },
    websiteUrl: "https://example.com/vortex-apparel",
  },
];

export const CORPORATE_MILESTONES = [
  {
    year: "2024",
    title: {
      id: "Pendirian PT Adre Gemilang Jaya di Jakarta",
      en: "Establishment of PT Adre Gemilang Jaya in Jakarta",
    },
    description: {
      id: "Resmi berdiri di Jakarta sebagai perusahaan manajemen tim esports profesional.",
      en: "Officially established in Jakarta as a professional esports team management company.",
    },
  },
  {
    year: "2025",
    title: {
      id: "Pembentukan Tim PUBG Mobile",
      en: "Formation of the PUBG Mobile Squad",
    },
    description: {
      id: "Merekrut 4 pemain inti, 1 manajer tim, dan 2 staf pelatih di Jakarta serta meraih Juara 2 di SEA Esports Pro Invitational Fall 2025.",
      en: "Recruited 4 core players, 1 team manager, and 2 coaching staff in Jakarta, finishing 2nd at the SEA Esports Pro Invitational Fall 2025.",
    },
  },
  {
    year: "2026",
    title: {
      id: "Juara 1 PMNC Indonesia 2026",
      en: "1st Place at PMNC Indonesia 2026",
    },
    description: {
      id: "Meraih 148 poin di babak Grand Finals PMNC Indonesia 2026 dan lolos ke liga PMSL SEA Fall 2026.",
      en: "Scored 148 points in the PMNC Indonesia 2026 Grand Finals and qualified for PMSL SEA Fall 2026.",
    },
  },
];

export const CORPORATE_OFFICES = [
  {
    city: {
      id: "Jakarta",
      en: "Jakarta",
    },
    role: {
      id: "Kantor Manajemen dan Fasilitas Latihan",
      en: "Management Office and Training Facility",
    },
    address: {
      id: "Kawasan Niaga Terpadu Sudirman (SCBD), Jakarta Selatan, DKI Jakarta, Indonesia",
      en: "Sudirman Central Business District (SCBD), South Jakarta, DKI Jakarta, Indonesia",
    },
  },
];

export function translateCategoryName(
  slug: string,
  fallbackName: string,
  locale: Locale,
): string {
  const map: Record<string, { id: string; en: string }> = {
    turnamen: { id: "Turnamen", en: "Tournament" },
    pengumuman: { id: "Pengumuman", en: "Announcement" },
    event: { id: "Kegiatan", en: "Events" },
  };
  const cleanSlug = slug === "korporasi" ? "pengumuman" : slug.toLowerCase();
  return map[cleanSlug]?.[locale] ?? fallbackName;
}

export function translateArticleContent<
  T extends {
    slug: string;
    title: string;
    excerpt: string;
    contentHtml?: string;
    category: { name: string; slug: string };
  },
>(article: T, locale: Locale): T {
  const normalizedCategorySlug =
    article.category.slug === "korporasi"
      ? "pengumuman"
      : article.category.slug;

  const translations: Record<
    string,
    {
      title: { id: string; en: string };
      excerpt: { id: string; en: string };
      contentHtml: { id: string; en: string };
    }
  > = {
    "adre-esports-juara-kualifikasi-pmnc-2026": {
      title: {
        id: "ADRE Esports Raih Juara 1 Grand Finals PMNC Indonesia 2026",
        en: "ADRE Esports Wins 1st Place at PMNC Indonesia 2026 Grand Finals",
      },
      excerpt: {
        id: "Tim PUBG Mobile PT Adre Gemilang Jaya mengamankan gelar juara nasional dengan perolehan 148 poin.",
        en: "PT Adre Gemilang Jaya's PUBG Mobile team secured the national title with 148 total points.",
      },
      contentHtml: {
        id: "<p>Tim PUBG Mobile PT Adre Gemilang Jaya berhasil meraih Juara 1 pada babak Grand Finals PUBG Mobile National Championship (PMNC) Indonesia 2026 dengan total 148 poin.</p><h3>Jalannya Pertandingan</h3><p>Bersama kapten tim, manajer, dan staf pelatih di Jakarta, para pemain tampil konsisten sejak hari pertama hingga memastikan tempat di turnamen PMSL SEA Fall 2026.</p>",
        en: "<p>PT Adre Gemilang Jaya's PUBG Mobile squad won 1st Place in the PUBG Mobile National Championship (PMNC) Indonesia 2026 Grand Finals with a total of 148 points.</p><h3>Tournament Recap</h3><p>Supported by the team captain, manager, and coaching staff in Jakarta, the players performed consistently from Day 1 to secure a slot in PMSL SEA Fall 2026.</p>",
      },
    },
    "persiapan-intensif-skuad-pubgm-menuju-pmsl-sea-2026": {
      title: {
        id: "Persiapan Skuad PUBG Mobile Menuju PMSL SEA Fall 2026",
        en: "PUBG Mobile Squad Preparation Ahead of PMSL SEA Fall 2026",
      },
      excerpt: {
        id: "Manajemen dan staf pelatih di Jakarta mengadakan latihan rutin untuk menghadapi turnamen tingkat Asia Tenggara.",
        en: "Management and coaching staff in Jakarta hold regular training sessions ahead of the Southeast Asian league.",
      },
      contentHtml: {
        id: "<p>Menjelang dimulainya PUBG Mobile Super League (PMSL) SEA Fall 2026, PT Adre Gemilang Jaya menambah porsi latihan tim di fasilitas latihan Jakarta.</p><h3>Evaluasi Strategi</h3><p>Latihan difokuskan pada koordinasi antar pemain inti serta pembahasan rekaman pertandingan bersama manajer dan analis tim.</p>",
        en: "<p>Ahead of the PUBG Mobile Super League (PMSL) SEA Fall 2026, PT Adre Gemilang Jaya has increased daily team practice at our Jakarta facility.</p><h3>Strategy Review</h3><p>Sessions focus on coordination among the four core players and match review led by the team manager and analyst.</p>",
      },
    },
    "ekspansi-kemitraan-komersial-adre-gemilang-jaya-2026": {
      title: {
        id: "Pengumuman Kerja Sama Sponsor dan Kegiatan Komunitas 2026",
        en: "2026 Sponsor Collaboration and Community Events Announcement",
      },
      excerpt: {
        id: "PT Adre Gemilang Jaya menjalin kolaborasi baru dan mengadakan acara komunitas PUBG Mobile di Jakarta.",
        en: "PT Adre Gemilang Jaya launches new partner collaborations and PUBG Mobile community events in Jakarta.",
      },
      contentHtml: {
        id: "<p>PT Adre Gemilang Jaya meresmikan rangkaian program bersama sponsor dan acara temu komunitas penggemar esports di Jakarta untuk musim kompetisi 2026.</p><h3>Dukungan Mitra</h3><p>Bersama mitra perangkat gaming dan apparel resmi, tim PUBG Mobile siap berlaga di berbagai turnamen resmi tahun ini.</p>",
        en: "<p>PT Adre Gemilang Jaya announces a series of partner programs and esports community gatherings in Jakarta for the 2026 season.</p><h3>Partner Support</h3><p>Backed by our gaming hardware and apparel partners, the PUBG Mobile team is ready to compete across upcoming official tournaments.</p>",
      },
    },
  };

  const entry = translations[article.slug];

  return {
    ...article,
    title: entry ? entry.title[locale] : article.title,
    excerpt: entry ? entry.excerpt[locale] : article.excerpt,
    contentHtml:
      article.contentHtml !== undefined
        ? entry
          ? entry.contentHtml[locale]
          : article.contentHtml
        : undefined,
    category: {
      slug: normalizedCategorySlug,
      name: translateCategoryName(
        normalizedCategorySlug,
        article.category.name,
        locale,
      ),
    },
  };
}

export function translateMatchStage(stage: string, locale: Locale): string {
  const cleanStage = stage
    .replace(/[•—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (locale === "id") return cleanStage;
  return cleanStage
    .replace(/Hari/gi, "Day")
    .replace(/Minggu/gi, "Week")
    .replace(/Babak Liga/gi, "League Stage")
    .replace(/Babak Final/gi, "Grand Finals")
    .replace(/Babak Kualifikasi/gi, "Qualifier Stage")
    .replace(/Grup/gi, "Group")
    .replace(/dan/gi, "and");
}

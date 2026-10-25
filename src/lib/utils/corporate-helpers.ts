import { z } from "zod";

export const InquiryCategoryEnum = z.enum([
  "SPONSORSHIP",
  "MEDIA",
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
  email: z.string().trim().email("Format alamat email bisnis tidak valid."),
  inquiryType: InquiryCategoryEnum,
  message: z
    .string()
    .trim()
    .min(20, "Rincian pesan atau proposal wajib diisi minimal 20 karakter."),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export function validateContactSubmission(input: unknown) {
  return ContactFormSchema.safeParse(input);
}

export interface CorporatePartnerItem {
  id: string;
  name: string;
  tierLabel: string;
  category: string;
  description: string;
  websiteUrl: string;
}

export const CORPORATE_PARTNERS_DATA: CorporatePartnerItem[] = [
  {
    id: "prt-01",
    name: "Adre Gemilang Jaya Corp",
    tierLabel: "PRINCIPAL PARTNER",
    category: "Mitra Utama Korporasi & Pendanaan Strategis",
    description:
      "Induk korporasi yang mendukung penuh infrastruktur operasional, fasilitas gaming house, dan pembinaan jangka panjang atlet PUBG Mobile PT Adre Gemilang Jaya.",
    websiteUrl: "https://adregemilang.co.id",
  },
  {
    id: "prt-02",
    name: "Apex Gear Indonesia",
    tierLabel: "OFFICIAL HARDWARE PARTNER",
    category: "Mitra Perangkat Gaming & Periferal Kompetisi",
    description:
      "Menyediakan perangkat keras komunikasi audio latensi rendah dan perlengkapan latihan berstandar turnamen bagi 4 pemain inti dan 2 staf pelatih.",
    websiteUrl: "https://example.com/apex-gear",
  },
  {
    id: "prt-03",
    name: "Vortex Pro Apparel",
    tierLabel: "OFFICIAL APPAREL PARTNER",
    category: "Mitra Jersey & Seragam Resmi Turnamen",
    description:
      "Merancang dan memproduksi seragam tanding resmi (Pro Kit Jersey) yang digunakan skuad ADRE Esports di panggung PMNC dan PMSL SEA.",
    websiteUrl: "https://example.com/vortex-apparel",
  },
];

export const PARTNERSHIP_VALUE_PILLARS = [
  {
    metric: "Juara #1",
    title: "Eksposur Kompetisi Tingkat Nasional & Regional",
    description:
      "Logo dan identitas merek mitra tampil secara konsisten pada siaran langsung turnamen resmi PUBG Mobile tingkat nasional (PMNC) hingga Asia Tenggara (PMSL SEA).",
  },
  {
    metric: "6 Personel",
    title: "Aktivasi Konten Digital Bersama Atlet & Pelatih",
    description:
      "Integrasi kampanye produk melalui kanal media sosial resmi organisasi serta akun masing-masing pemain inti (IGL, Rusher, Support, Scout) dan staf analis.",
  },
  {
    metric: "100% Terukur",
    title: "Laporan Kuartalan Performa Kampanye (Brand Report)",
    description:
      "Manajemen PT Adre Gemilang Jaya menyajikan laporan metrik tayangan (impressions), keterlibatan audiens, dan dokumentasi aktivasi secara transparan.",
  },
];

export const CORPORATE_MILESTONES = [
  {
    year: "2024",
    title: "Pendirian Resmi PT Adre Gemilang Jaya",
    description:
      "Didirikan secara legal sebagai badan hukum perseroan terbatas di Palembang dengan fokus awal pada pembinaan talenta olahraga elektronik dan manajemen tim profesional.",
  },
  {
    year: "2025",
    title: "Pembentukan Divisi Utama PUBG Mobile & Runner-Up SEA Invitational",
    description:
      "Merekrut 4 atlet inti dan 2 staf pelatih analis, membuka kantor perwakilan kemitraan di Jakarta, serta meraih posisi #2 pada ajang SEA Esports Pro Invitational Fall 2025.",
  },
  {
    year: "2026",
    title: "Juara 1 PMNC Indonesia 2026 & Kualifikasi PMSL SEA Fall 2026",
    description:
      "Mencetak rekor 148 poin pada babak Grand Finals PMNC Indonesia 2026 dan mengamankan tiket menuju kompetisi tingkat Asia Tenggara PMSL SEA Fall 2026.",
  },
];

export const CORPORATE_OFFICES = [
  {
    city: "Palembang (Kantor Pusat & Training Facility)",
    role: "Headquarters & Bootcamp PUBG Mobile",
    address:
      "Jl. Jenderal Sudirman, Kawasan Bisnis Pusat, Palembang, Sumatera Selatan, Indonesia",
  },
  {
    city: "Jakarta (Kantor Kemitraan Komersial)",
    role: "Commercial Partnership & Media Representative Office",
    address:
      "Kawasan Niaga Terpadu Sudirman (SCBD), Jakarta Selatan, DKI Jakarta, Indonesia",
  },
];

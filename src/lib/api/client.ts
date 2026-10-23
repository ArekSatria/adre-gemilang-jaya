import { z } from "zod";
import {
  createApiResponseSchema,
  GlobalSettingsSchema,
  HomePayloadSchema,
  DivisionSummarySchema,
  DivisionDetailSchema,
  MatchesPayloadSchema,
  NewsCatalogPayloadSchema,
  NewsDetailSchema,
  PartnerItemSchema,
  CompanyProfileSchema,
  type GlobalSettings,
  type HomePayload,
  type DivisionSummary,
  type DivisionDetail,
  type MatchesPayload,
  type NewsCatalogPayload,
  type NewsDetail,
  type PartnerItem,
  type CompanyProfile,
} from "@/lib/schemas";
import {
  mockGlobalSettings,
  mockHomePayload,
  mockDivisions,
  mockDivisionDetails,
  mockMatchesPayload,
  mockNewsCatalogPayload,
  mockNewsList,
  mockPartners,
  mockCompanyProfile,
} from "./mock-data";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

async function fetchFromCms<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  tags: string[],
  revalidateSeconds = 3600,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    next: { tags, revalidate: revalidateSeconds },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`CMS API Error [${response.status}] pada ${endpoint}`);
  }

  const rawJson = await response.json();
  const envelopeSchema = createApiResponseSchema(schema);
  const parsed = envelopeSchema.safeParse(rawJson);

  if (!parsed.success) {
    console.error(
      `Zod Validation Error pada ${endpoint}:`,
      parsed.error.format(),
    );
    throw new Error(
      `Struktur data CMS pada ${endpoint} tidak sesuai API Contract.`,
    );
  }

  return parsed.data.data;
}

// 1. Ambil Pengaturan Global (Navbar & Footer)
export async function getGlobalSettings(): Promise<GlobalSettings> {
  if (USE_MOCK_API) {
    return GlobalSettingsSchema.parse(mockGlobalSettings);
  }
  return fetchFromCms(
    "/settings",
    GlobalSettingsSchema,
    ["settings", "home"],
    3600,
  );
}

// 2. Ambil Data Agregasi Beranda (/)
export async function getHomeData(): Promise<HomePayload> {
  if (USE_MOCK_API) {
    return HomePayloadSchema.parse(mockHomePayload);
  }
  return fetchFromCms("/home", HomePayloadSchema, ["home"], 300);
}

// 3. Ambil Katalog Divisi Aktif (/teams)
export async function getActiveDivisions(): Promise<DivisionSummary[]> {
  if (USE_MOCK_API) {
    return z.array(DivisionSummarySchema).parse(mockDivisions);
  }
  return fetchFromCms(
    "/teams?active=true",
    z.array(DivisionSummarySchema),
    ["teams"],
    3600,
  );
}

// 4. Ambil Detail Divisi & Roster (/teams/[slug])
export async function getDivisionBySlug(
  slug: string,
): Promise<DivisionDetail | null> {
  if (USE_MOCK_API) {
    const found = mockDivisionDetails[slug];
    return found ? DivisionDetailSchema.parse(found) : null;
  }
  try {
    return await fetchFromCms(
      `/teams/${slug}`,
      DivisionDetailSchema,
      ["teams", `team-${slug}`],
      3600,
    );
  } catch {
    return null;
  }
}

// 5. Ambil Daftar Pertandingan (/matches)
export async function getMatchesData(): Promise<MatchesPayload> {
  if (USE_MOCK_API) {
    return MatchesPayloadSchema.parse(mockMatchesPayload);
  }
  return fetchFromCms("/matches", MatchesPayloadSchema, ["matches"], 180);
}

// 6. Ambil Katalog Berita (/news)
export async function getNewsCatalog(): Promise<NewsCatalogPayload> {
  if (USE_MOCK_API) {
    return NewsCatalogPayloadSchema.parse(mockNewsCatalogPayload);
  }
  return fetchFromCms("/news", NewsCatalogPayloadSchema, ["news"], 600);
}

// 7. Ambil Detail Artikel Berita (/news/[slug])
export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  if (USE_MOCK_API) {
    const article = mockNewsList.find((item) => item.slug === slug);
    if (!article) return null;
    const related = mockNewsList
      .filter((item) => item.slug !== slug)
      .slice(0, 3);
    return NewsDetailSchema.parse({ ...article, relatedNews: related });
  }
  try {
    return await fetchFromCms(
      `/news/${slug}`,
      NewsDetailSchema,
      ["news", `news-${slug}`],
      3600,
    );
  } catch {
    return null;
  }
}

// 8. Ambil Daftar Mitra (/partners)
export async function getPartnersData(): Promise<PartnerItem[]> {
  if (USE_MOCK_API) {
    return z.array(PartnerItemSchema).parse(mockPartners);
  }
  return fetchFromCms(
    "/partners",
    z.array(PartnerItemSchema),
    ["partners"],
    3600,
  );
}

// 9. Ambil Profil Korporasi & Kontak (/about & /contact)
export async function getCompanyProfile(): Promise<CompanyProfile> {
  if (USE_MOCK_API) {
    return CompanyProfileSchema.parse(mockCompanyProfile);
  }
  return fetchFromCms("/company", CompanyProfileSchema, ["company"], 3600);
}

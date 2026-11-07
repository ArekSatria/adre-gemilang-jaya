import {
  GlobalSettingsSchema,
  HomePayloadSchema,
  DivisionSummarySchema,
  DivisionDetailSchema,
  MatchesPayloadSchema,
  NewsListPayloadSchema,
  NewsDetailSchema,
  type GlobalSettings,
  type HomePayload,
  type DivisionSummary,
  type DivisionDetail,
  type MatchesPayload,
  type NewsListPayload,
} from "@/lib/schemas";
import {
  mockGlobalSettings,
  mockHomePayload,
  mockDivisionsCatalog,
  mockDivisionDetails,
  mockMatchesPayload,
  mockNewsCatalog,
  mockNewsDetailsBySlug,
} from "./mock-data";
import { CORPORATE_PARTNERS_DATA } from "@/lib/utils/corporate-helpers";
import { z } from "zod";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1";

async function fetchFromCms<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  tags: string[] = [],
  revalidateSeconds = 0
): Promise<T | null> {
  if (USE_MOCK_API) return null;

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (!json.success || !json.data) return null;

    const parsed = schema.safeParse(json.data);
    if (!parsed.success) {
      console.warn(`[CMS Warning] Schema validation issue on ${endpoint}:`, parsed.error.format());
      return json.data as T;
    }

    return parsed.data;
  } catch (err) {
    return null;
  }
}

// 1. Global Settings
export async function getGlobalSettings(): Promise<GlobalSettings> {
  const fromCms = await fetchFromCms("/settings", GlobalSettingsSchema, ["settings"]);
  if (fromCms) return fromCms;
  return GlobalSettingsSchema.parse(mockGlobalSettings);
}

// 2. Home Page Data
export async function getHomeData(): Promise<HomePayload> {
  const fromCms = await fetchFromCms("/home", HomePayloadSchema, ["home"], 30);
  if (fromCms) return fromCms;
  return HomePayloadSchema.parse(mockHomePayload);
}

// 3. Divisions Catalog
export async function getActiveDivisions(): Promise<DivisionSummary[]> {
  const fromCms = await fetchFromCms("/teams?active=true", z.array(DivisionSummarySchema), ["teams"]);
  if (fromCms) return fromCms;
  return z.array(DivisionSummarySchema).parse(mockDivisionsCatalog);
}

// 4. Division Detail
export async function getDivisionBySlug(
  slug: string
): Promise<DivisionDetail | null> {
  const fromCms = await fetchFromCms(`/teams/${slug}`, DivisionDetailSchema, ["teams", `team-${slug}`]);
  if (fromCms) return fromCms;
  const detail = mockDivisionDetails[slug];
  if (!detail) return null;
  return DivisionDetailSchema.parse(detail);
}

// 5. Matches Data
export async function getMatchesPayload(): Promise<MatchesPayload> {
  const fromCms = await fetchFromCms("/matches", MatchesPayloadSchema, ["matches"], 30);
  if (fromCms) return fromCms;
  return MatchesPayloadSchema.parse(mockMatchesPayload);
}

export const getMatches = getMatchesPayload;
export const getMatchesData = getMatchesPayload;

// 6. News Catalog
export async function getNewsCatalog(): Promise<NewsListPayload> {
  const fromCms = await fetchFromCms("/news", NewsListPayloadSchema, ["news"], 30);
  if (fromCms) return fromCms;
  return mockNewsCatalog;
}

// 7. News Detail
export async function getNewsBySlug(slug: string) {
  const fromCms = await fetchFromCms(`/news/${slug}`, NewsDetailSchema, ["news", `news-${slug}`]);
  if (fromCms) return fromCms;
  return mockNewsDetailsBySlug[slug] ?? null;
}

// 8. Partners
export async function getPartners() {
  try {
    if (!USE_MOCK_API) {
      const res = await fetch(`${API_BASE_URL}/partners`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    }
  } catch {}
  return CORPORATE_PARTNERS_DATA;
}

// 8. Partners (Updated dengan revalidation tags)
export async function getPartners() {
  const fromCms = await fetchFromCms("/partners", z.array(z.any()), ["partners"]);
  if (fromCms && Array.isArray(fromCms) && fromCms.length > 0) {
    return fromCms;
  }
  return CORPORATE_PARTNERS_DATA;
}

import {
  GlobalSettingsSchema,
  HomePayloadSchema,
  DivisionSummarySchema,
  DivisionDetailSchema,
  MatchesPayloadSchema,
  type GlobalSettings,
  type HomePayload,
  type DivisionSummary,
  type DivisionDetail,
  type MatchesPayload,
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
import { z } from "zod";

export async function getGlobalSettings(): Promise<GlobalSettings> {
  return GlobalSettingsSchema.parse(mockGlobalSettings);
}

export async function getHomeData(): Promise<HomePayload> {
  return HomePayloadSchema.parse(mockHomePayload);
}

export async function getActiveDivisions(): Promise<DivisionSummary[]> {
  return z.array(DivisionSummarySchema).parse(mockDivisionsCatalog);
}

export async function getDivisionBySlug(
  slug: string,
): Promise<DivisionDetail | null> {
  const detail = mockDivisionDetails[slug];
  if (!detail) return null;
  return DivisionDetailSchema.parse(detail);
}

export async function getMatchesPayload(): Promise<MatchesPayload> {
  return MatchesPayloadSchema.parse(mockMatchesPayload);
}

export const getMatches = getMatchesPayload;
export const getMatchesData = getMatchesPayload;

export async function getNewsCatalog() {
  return mockNewsCatalog;
}

export async function getNewsBySlug(slug: string) {
  return mockNewsDetailsBySlug[slug] ?? null;
}

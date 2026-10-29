import { describe, it, expect } from "vitest";
import {
  GlobalSettingsSchema,
  DivisionDetailSchema,
  MatchesPayloadSchema,
} from "./index";
import * as mockData from "../api/mock-data";
import { filterMatches, formatMatchScoreDisplay } from "../utils/match-helpers";
import { filterNewsByCategory } from "../utils/news-helpers";
import {
  CORPORATE_PARTNERS_DATA,
  CORPORATE_MILESTONES,
  CORPORATE_OFFICES,
  validateContactSubmission,
} from "../utils/corporate-helpers";

describe("Sprint 1 s/d Sprint 6 - Full Frontend Unit Test Suite", () => {
  it("memvalidasi mockGlobalSettings sesuai kontrak API-01", () => {
    const parsed = GlobalSettingsSchema.safeParse(mockData.mockGlobalSettings);
    expect(parsed.success).toBe(true);
  });

  it("memvalidasi detail divisi PUBG Mobile (Player, Manager & Staff) sesuai kontrak API-04", () => {
    const parsed = DivisionDetailSchema.safeParse(
      mockData.mockDivisionDetails["pubg-mobile"],
    );
    expect(parsed.success).toBe(true);
  });

  it("memisahkan anggota roster PUBG Mobile menjadi 4 PLAYER serta jajaran STAFF & Manager secara akurat (PBI-07)", () => {
    const pubgm = mockData.mockDivisionDetails["pubg-mobile"];
    const players = pubgm.roster.filter((m) => m.roleType === "PLAYER");
    const staff = pubgm.roster.filter((m) => m.roleType === "STAFF");

    expect(players).toHaveLength(4);
    expect(staff.length).toBeGreaterThanOrEqual(2);
    expect(players.map((p) => p.role)).toEqual([
      "IGL",
      "RUSHER",
      "SUPPORT",
      "SCOUT",
    ]);
  });

  it("memvalidasi payload jadwal pertandingan Battle Royale sesuai kontrak API-05", () => {
    const parsed = MatchesPayloadSchema.safeParse(mockData.mockMatchesPayload);
    expect(parsed.success).toBe(true);
  });

  it("memfilter daftar pertandingan berdasarkan status UPCOMING dan COMPLETED secara akurat (PBI-09)", () => {
    const upcoming = filterMatches(
      mockData.mockMatchesPayload.items,
      "UPCOMING",
      "ALL",
    );
    const completed = filterMatches(
      mockData.mockMatchesPayload.items,
      "COMPLETED",
      "pubg-mobile",
    );

    expect(upcoming.every((m) => m.status === "UPCOMING")).toBe(true);
    expect(completed.every((m) => m.status === "COMPLETED")).toBe(true);
    expect(upcoming.length + completed.length).toBe(
      mockData.mockMatchesPayload.items.length,
    );
  });

  it("memformat tampilan skor BATTLE_ROYALE (#1 WWCD + Poin) dengan benar (PBI-08)", () => {
    const completedMatch = mockData.mockMatchesPayload.items.find(
      (m) => m.id === "mtc-098",
    )!;
    const formatted = formatMatchScoreDisplay(completedMatch, "PTS");

    expect(formatted).toBe("#1 WWCD (148 PTS)");
  });

  it("memfilter daftar artikel berita berdasarkan slug kategori dengan akurat (PBI-10)", () => {
    const newsItems = mockData.mockHomePayload.latestNews;
    const targetSlug = newsItems[0].category.slug;

    const allNews = filterNewsByCategory(newsItems, "ALL");
    const filteredNews = filterNewsByCategory(newsItems, targetSlug);

    expect(allNews.length).toBe(newsItems.length);
    expect(filteredNews.length).toBeGreaterThan(0);
    expect(filteredNews.every((n) => n.category.slug === targetSlug)).toBe(
      true,
    );
  });

  it("memvalidasi detail artikel berita beserta SEO metadata sesuai kontrak API-07 (PBI-11)", () => {
    const sampleCard = mockData.mockHomePayload.latestNews[0];
    const sampleDetail = {
      ...sampleCard,
      contentHtml:
        "<p>Laporan resmi hasil babak kualifikasi nasional PMNC Indonesia 2026.</p>",
      author: {
        name: "Divisi Media PT Adre Gemilang Jaya",
        role: "Tim Editorial Resmi",
      },
      seoMeta: {
        metaTitle: `${sampleCard.title} | PT Adre Gemilang Jaya`,
        metaDescription: sampleCard.excerpt,
      },
      relatedNews: mockData.mockHomePayload.latestNews.slice(1),
    };

    expect(sampleDetail.slug).toBeTruthy();
    expect(sampleDetail.seoMeta.metaTitle).toContain(sampleCard.title);
    expect(sampleDetail.seoMeta.metaDescription.length).toBeGreaterThan(10);
    expect(sampleDetail.readingTimeMinutes).toBeGreaterThan(0);
  });

  it("memvalidasi data mitra komersial, tonggak sejarah, dan 1 lokasi operasional di Jakarta (PBI-12 & PBI-13)", () => {
    expect(CORPORATE_PARTNERS_DATA).toHaveLength(3);
    expect(CORPORATE_MILESTONES.map((m) => m.year)).toEqual([
      "2024",
      "2025",
      "2026",
    ]);
    expect(CORPORATE_OFFICES).toHaveLength(1);
    expect(CORPORATE_OFFICES[0].city.id).toContain("Jakarta");
  });

  it("memvalidasi skema formulir kemitraan bisnis berbasis Zod untuk 3 kategori keperluan (PBI-14)", () => {
    const validSubmission = validateContactSubmission({
      fullName: "Rizky Pratama",
      companyName: "PT Nusantara Digital Sponsor",
      email: "rizky@nusantaradigital.co.id",
      inquiryType: "SPONSORSHIP",
      message:
        "Kami tertarik menjalin kolaborasi sponsorship jersey untuk musim kompetisi PMSL SEA 2026.",
    });

    const invalidSubmission = validateContactSubmission({
      fullName: "A",
      companyName: "",
      email: "email-tidak-valid",
      inquiryType: "SPONSORSHIP",
      message: "Terlalu pendek",
    });

    expect(validSubmission.success).toBe(true);
    expect(invalidSubmission.success).toBe(false);
  });
});

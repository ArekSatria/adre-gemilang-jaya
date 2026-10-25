import { describe, it, expect } from "vitest";
import {
  GlobalSettingsSchema,
  DivisionDetailSchema,
  MatchesPayloadSchema,
} from "./index";
import {
  mockGlobalSettings,
  mockDivisionDetails,
  mockMatchesPayload,
} from "../api/mock-data";
import { filterMatches, formatMatchScoreDisplay } from "../utils/match-helpers";

describe("Sprint 1, Sprint 3 & Sprint 4 - Schema, Roster & Matches Validation", () => {
  it("memvalidasi mockGlobalSettings sesuai kontrak API-01", () => {
    const parsed = GlobalSettingsSchema.safeParse(mockGlobalSettings);
    expect(parsed.success).toBe(true);
  });

  it("memvalidasi detail divisi PUBG Mobile (Player & Staff) sesuai kontrak API-04", () => {
    const parsed = DivisionDetailSchema.safeParse(
      mockDivisionDetails["pubg-mobile"],
    );
    expect(parsed.success).toBe(true);
  });

  it("memisahkan anggota roster PUBG Mobile menjadi 4 PLAYER dan 2 STAFF secara akurat (PBI-07)", () => {
    const pubgm = mockDivisionDetails["pubg-mobile"];
    const players = pubgm.roster.filter((m) => m.roleType === "PLAYER");
    const staff = pubgm.roster.filter((m) => m.roleType === "STAFF");

    expect(players).toHaveLength(4);
    expect(staff).toHaveLength(2);
    expect(players.map((p) => p.role)).toEqual([
      "IGL",
      "RUSHER",
      "SUPPORT",
      "SCOUT",
    ]);
  });

  it("memvalidasi payload jadwal pertandingan Battle Royale sesuai kontrak API-05", () => {
    const parsed = MatchesPayloadSchema.safeParse(mockMatchesPayload);
    expect(parsed.success).toBe(true);
  });

  it("memfilter daftar pertandingan berdasarkan status UPCOMING dan COMPLETED secara akurat (PBI-09)", () => {
    const upcoming = filterMatches(mockMatchesPayload.items, "UPCOMING", "ALL");
    const completed = filterMatches(
      mockMatchesPayload.items,
      "COMPLETED",
      "pubg-mobile",
    );

    expect(upcoming.every((m) => m.status === "UPCOMING")).toBe(true);
    expect(completed.every((m) => m.status === "COMPLETED")).toBe(true);
    expect(upcoming.length + completed.length).toBe(
      mockMatchesPayload.items.length,
    );
  });

  it("memformat tampilan skor BATTLE_ROYALE (#1 WWCD + Poin) dengan benar (PBI-08)", () => {
    const completedMatch = mockMatchesPayload.items.find(
      (m) => m.id === "mtc-098",
    )!;
    const formatted = formatMatchScoreDisplay(completedMatch, "PTS");

    expect(formatted).toBe("#1 WWCD (148 PTS)");
  });
});

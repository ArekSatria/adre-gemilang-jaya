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

describe("Sprint 1 & Sprint 3 - Zod Runtime Schema & Roster Validation", () => {
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
});

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const setting = await db.globalSetting.findUnique({ where: { id: "default" } });

    // 1. Divisi Aktif
    const rawDivisions = await db.division.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { roster: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    const activeDivisions = rawDivisions.map((div) => ({
      id: div.id,
      name: div.name,
      slug: div.slug,
      shortCode: div.shortCode || "PUBGM",
      gameTitle: div.gameTitle || div.name,
      bannerImageUrl: div.bannerImageUrl,
      activeRosterCount: div._count.roster,
      tagline: div.tagline || "",
    }));

    // 2. Next Match & Recent Results
    const rawMatches = await db.match.findMany({
      include: {
        division: { select: { name: true, slug: true, shortCode: true } },
        resultBattleRoyale: true,
      },
      orderBy: { scheduledAt: "asc" },
    });

    const formatMatch = (m: (typeof rawMatches)[number]) => ({
      id: m.id,
      tournamentName: m.tournamentName,
      stage: m.stage,
      scheduledAt: m.scheduledAt.toISOString(),
      status: m.status as "UPCOMING" | "LIVE" | "COMPLETED",
      formatType: m.formatType as "BATTLE_ROYALE" | "TACTICAL_5V5",
      division: {
        name: m.division.name,
        slug: m.division.slug,
        shortCode: m.division.shortCode || "PUBGM",
      },
      streamUrl: m.streamUrl,
      resultBattleRoyale: m.resultBattleRoyale
        ? {
            placement: m.resultBattleRoyale.placement,
            placementLabel: m.resultBattleRoyale.placementLabel,
            totalPoints: m.resultBattleRoyale.totalPoints,
            wwcdCount: m.resultBattleRoyale.wwcdCount ?? undefined,
          }
        : null,
    });

    const upcoming = rawMatches.filter((m) => m.status === "UPCOMING" || m.status === "LIVE");
    const nextMatch = upcoming[0] ? formatMatch(upcoming[0]) : null;

    const completed = rawMatches
      .filter((m) => m.status === "COMPLETED")
      .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());
    const recentResults = completed.slice(0, 2).map(formatMatch);

    // 3. Latest News
    const rawNews = await db.article.findMany({
      take: 3,
      orderBy: { publishedAt: "desc" },
      include: {
        category: { select: { name: true, slug: true } },
      },
    });

    const latestNews = rawNews.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      coverImageUrl: a.coverImageUrl,
      coverImageAlt: a.coverImageAlt || a.title,
      isFeatured: a.isFeatured,
      publishedAt: a.publishedAt.toISOString(),
      readingTimeMinutes: a.readingTimeMinutes,
      category: a.category,
    }));

    // 4. Partners Strip
    const partners = await db.partner.findMany({
      orderBy: { displayOrder: "asc" },
      select: {
        id: true,
        name: true,
        tier: true,
        logoUrl: true,
        websiteUrl: true,
      },
    });

    // 5. Highlight Stats
    const rawStats = await db.heroStat.findMany({
      orderBy: { displayOrder: "asc" },
      select: { label: true, value: true },
    });

    const highlightStats =
      rawStats.length > 0
        ? rawStats
        : [
            { label: "PMNC Indonesia 2026", value: "#1" },
            { label: "Total Poin Final", value: "148" },
            { label: "Anggota Tim", value: "7" },
          ];

    const socialsData = (setting?.socials as any) || {};
    const heroImageUrl = socialsData.heroImageUrl || null;

    const payload = {
      hero: {
        badgeText: "PT ADRE GEMILANG JAYA",
        headline: setting?.siteName
          ? `TIM PUBG MOBILE ${setting.siteName.toUpperCase()}`
          : "TIM PUBG MOBILE PT ADRE GEMILANG JAYA",
        subheadline:
          setting?.tagline ||
          "Beroperasi di Jakarta dengan 4 pemain inti, 1 manajer tim, dan 2 staf pelatih.",
        heroImageUrl,
        primaryCta: {
          label: "Lihat Roster",
          href: "/teams/pubg-mobile",
        },
        secondaryCta: {
          label: "Jadwal Pertandingan",
          href: "/matches",
        },
        highlightStats,
      },
      nextMatch,
      activeDivisions,
      recentResults,
      latestNews,
      partnersStrip: partners,
    };

    return NextResponse.json({
      success: true,
      message: "Data beranda berhasil dimuat.",
      data: payload,
    });
  } catch (error) {
    console.error("GET /api/v1/home error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat data beranda." },
      { status: 500 }
    );
  }
}

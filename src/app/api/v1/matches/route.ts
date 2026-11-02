import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const divisionSlug = searchParams.get("division");

    const matches = await db.match.findMany({
      where: {
        status: status ? status : undefined,
        division: divisionSlug ? { slug: divisionSlug } : undefined,
      },
      include: {
        division: {
          select: { name: true, slug: true, shortCode: true },
        },
        resultBattleRoyale: true,
      },
      orderBy: { scheduledAt: "asc" },
    });

    const items = matches.map((m) => ({
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
    }));

    return NextResponse.json({
      success: true,
      message: "Data pertandingan berhasil diambil.",
      data: { items },
    });
  } catch (error) {
    console.error("GET /api/v1/matches error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat jadwal pertandingan." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      divisionId,
      divisionSlug,
      status,
      formatType,
      matchFormat,
      scheduledAt,
      tournamentName,
      stage,
      tournamentStage,
      streamUrl,
      resultBattleRoyale,
      result,
    } = body;

    const divTarget = divisionId || divisionSlug;
    const div = await db.division.findFirst({
      where: {
        OR: [{ id: divTarget }, { slug: divTarget }],
      },
    });

    if (!div) {
      return NextResponse.json(
        { success: false, message: "Divisi tidak ditemukan." },
        { status: 404 }
      );
    }

    const finalStage = stage || tournamentStage || "Babak Final";
    const finalFormat = formatType || matchFormat || "BATTLE_ROYALE";

    const match = await db.match.create({
      data: {
        divisionId: div.id,
        tournamentName,
        stage: finalStage,
        scheduledAt: new Date(scheduledAt),
        status: status || "UPCOMING",
        formatType: finalFormat,
        streamUrl: streamUrl || null,
      },
    });

    // Handle Battle Royale Result if provided
    const brData = resultBattleRoyale || (result ? {
      placement: result.placement || (result.placementBadge ? parseInt(result.placementBadge.replace(/\D/g, "")) || 1 : 1),
      placementLabel: result.placementLabel || result.placementBadge || "#1",
      totalPoints: result.totalPoints !== undefined ? parseInt(result.totalPoints) : 0,
      wwcdCount: result.wwcdCount !== undefined ? parseInt(result.wwcdCount) : 0,
    } : null);

    if (brData && status === "COMPLETED") {
      await db.battleRoyaleResult.create({
        data: {
          matchId: match.id,
          placement: brData.placement || 1,
          placementLabel: brData.placementLabel || `#${brData.placement || 1}`,
          totalPoints: brData.totalPoints || 0,
          wwcdCount: brData.wwcdCount || 0,
        },
      });
    }

    try {
      revalidateTag("matches", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Jadwal pertandingan berhasil dibuat.",
      data: match,
    });
  } catch (error) {
    console.error("POST /api/v1/matches error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Gagal membuat pertandingan." },
      { status: 500 }
    );
  }
}

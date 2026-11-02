import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const {
      tournamentName,
      stage,
      tournamentStage,
      scheduledAt,
      status,
      formatType,
      matchFormat,
      streamUrl,
      resultBattleRoyale,
      result,
      divisionId,
      divisionSlug,
    } = body;

    let finalDivId: string | undefined = undefined;
    const divTarget = divisionId || divisionSlug;
    if (divTarget) {
      const div = await db.division.findFirst({
        where: { OR: [{ id: divTarget }, { slug: divTarget }] },
      });
      if (div) finalDivId = div.id;
    }

    const finalStage = stage || tournamentStage;
    const finalFormat = formatType || matchFormat;

    const updated = await db.match.update({
      where: { id },
      data: {
        tournamentName: tournamentName || undefined,
        stage: finalStage || undefined,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        status: status || undefined,
        formatType: finalFormat || undefined,
        streamUrl: streamUrl !== undefined ? streamUrl : undefined,
        divisionId: finalDivId || undefined,
      },
    });

    const brData = resultBattleRoyale || (result ? {
      placement: result.placement || (result.placementBadge ? parseInt(result.placementBadge.replace(/\D/g, "")) || 1 : 1),
      placementLabel: result.placementLabel || result.placementBadge || "#1",
      totalPoints: result.totalPoints !== undefined ? parseInt(result.totalPoints) : 0,
      wwcdCount: result.wwcdCount !== undefined ? parseInt(result.wwcdCount) : 0,
    } : null);

    if (updated.status === "COMPLETED" && brData) {
      await db.battleRoyaleResult.upsert({
        where: { matchId: id },
        update: {
          placement: brData.placement || 1,
          placementLabel: brData.placementLabel || `#${brData.placement || 1}`,
          totalPoints: brData.totalPoints !== undefined ? parseInt(brData.totalPoints) : 0,
          wwcdCount: brData.wwcdCount !== undefined ? parseInt(brData.wwcdCount) : 0,
        },
        create: {
          matchId: id,
          placement: brData.placement || 1,
          placementLabel: brData.placementLabel || `#${brData.placement || 1}`,
          totalPoints: brData.totalPoints !== undefined ? parseInt(brData.totalPoints) : 0,
          wwcdCount: brData.wwcdCount !== undefined ? parseInt(brData.wwcdCount) : 0,
        },
      });
    } else if (updated.status !== "COMPLETED") {
      await db.battleRoyaleResult.deleteMany({
        where: { matchId: id },
      });
    }

    try {
      revalidateTag("matches", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Data pertandingan berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/v1/matches/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Gagal memperbarui pertandingan." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    await db.match.delete({
      where: { id },
    });

    try {
      revalidateTag("matches", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Pertandingan berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/v1/matches/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus pertandingan." },
      { status: 500 }
    );
  }
}

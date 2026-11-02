import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const division = await db.division.findUnique({
      where: { slug },
      include: {
        roster: {
          orderBy: { displayOrder: "asc" },
        },
        achievements: {
          orderBy: { year: "desc" },
        },
      },
    });

    if (!division) {
      return NextResponse.json(
        { success: false, message: `Divisi '${slug}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    const payload = {
      id: division.id,
      name: division.name,
      slug: division.slug,
      shortCode: division.shortCode || "PUBGM",
      gameTitle: division.gameTitle || division.name,
      bannerImageUrl: division.bannerImageUrl,
      activeRosterCount: division.roster.length,
      tagline: division.tagline || "",
      description: division.description || "",
      roster: division.roster.map((r) => ({
        id: r.id,
        ign: r.ign,
        fullName: r.fullName,
        role: r.role as any,
        roleType: r.roleType as "PLAYER" | "STAFF",
        countryCode: r.countryCode || "ID",
        photoUrl: r.photoUrl,
        joinDate: r.joinDate || undefined,
      })),
      achievements: division.achievements.map((a) => ({
        id: a.id,
        title: a.title,
        placement: a.placement,
        year: a.year,
      })),
    };

    return NextResponse.json({
      success: true,
      message: "Detail divisi berhasil diambil.",
      data: payload,
    });
  } catch (error) {
    console.error("GET /api/v1/teams/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat detail divisi." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  try {
    const { slug } = await params;
    const body = await request.json();

    const updated = await db.division.update({
      where: { slug },
      data: {
        name: body.name,
        slug: body.slug ? body.slug.toLowerCase().trim() : undefined,
        shortCode: body.shortCode,
        gameTitle: body.gameTitle,
        bannerImageUrl: body.bannerImageUrl || body.bannerUrl,
        tagline: body.tagline,
        description: body.description,
        isActive: body.isActive,
      },
    });

    try {
      revalidateTag("teams", { expire: 0 });
      revalidateTag(`team-${slug}`, { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Divisi berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/v1/teams/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui divisi." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { slug } = await params;
    await db.division.delete({
      where: { slug },
    });

    try {
      revalidateTag("teams", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Divisi berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/v1/teams/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus divisi." },
      { status: 500 }
    );
  }
}

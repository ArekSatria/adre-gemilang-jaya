import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    const divisions = await db.division.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      include: {
        _count: {
          select: { roster: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const payload = divisions.map((div) => ({
      id: div.id,
      name: div.name,
      slug: div.slug,
      shortCode: div.shortCode || "PUBGM",
      gameTitle: div.gameTitle || div.name,
      bannerImageUrl: div.bannerImageUrl,
      activeRosterCount: div._count.roster,
      tagline: div.tagline || "",
    }));

    return NextResponse.json({
      success: true,
      message: "Daftar divisi berhasil diambil.",
      data: payload,
    });
  } catch (error) {
    console.error("GET /api/v1/teams error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat data divisi." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { name, slug, shortCode, gameTitle, bannerImageUrl, bannerUrl, tagline, description, isActive } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Nama dan slug divisi wajib diisi." },
        { status: 400 }
      );
    }

    const created = await db.division.create({
      data: {
        name,
        slug: slug.toLowerCase().trim(),
        shortCode: shortCode || "PUBGM",
        gameTitle: gameTitle || name,
        bannerImageUrl: bannerImageUrl || bannerUrl || null,
        tagline: tagline || "",
        description: description || "",
        isActive: isActive ?? true,
      },
    });

    try {
      revalidateTag("teams", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Divisi berhasil ditambahkan.",
      data: created,
    });
  } catch (error) {
    console.error("POST /api/v1/teams error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan divisi." },
      { status: 500 }
    );
  }
}

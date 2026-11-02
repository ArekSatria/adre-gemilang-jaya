import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function POST(
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
    const body = await request.json();

    const division = await db.division.findUnique({
      where: { slug },
    });

    if (!division) {
      return NextResponse.json(
        { success: false, message: "Divisi tidak ditemukan." },
        { status: 404 }
      );
    }

    const { ign, fullName, role, roleType, photoUrl, displayOrder, countryCode, joinDate } = body;

    const currentCount = await db.rosterMember.count({ where: { divisionId: division.id } });
    const finalOrder = displayOrder ? parseInt(displayOrder) : currentCount + 1;

    const roster = await db.rosterMember.create({
      data: {
        divisionId: division.id,
        ign,
        fullName,
        role,
        roleType: roleType || "PLAYER",
        countryCode: countryCode || "ID",
        photoUrl: photoUrl || null,
        joinDate: joinDate || null,
        displayOrder: finalOrder,
      },
    });

    try {
      revalidateTag("teams", { expire: 0 });
      revalidateTag(`team-${slug}`, { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Anggota tim/roster berhasil ditambahkan.",
      data: roster,
    });
  } catch (error) {
    console.error("POST /api/v1/teams/[slug]/roster error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan anggota roster." },
      { status: 500 }
    );
  }
}

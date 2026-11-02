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

    const updated = await db.rosterMember.update({
      where: { id },
      data: {
        ign: body.ign,
        fullName: body.fullName,
        role: body.role,
        roleType: body.roleType,
        countryCode: body.countryCode,
        photoUrl: body.photoUrl,
        joinDate: body.joinDate,
        displayOrder: body.displayOrder !== undefined ? parseInt(body.displayOrder) : undefined,
      },
    });

    try {
      revalidateTag("teams", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Data roster berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/v1/roster/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data roster." },
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
    await db.rosterMember.delete({
      where: { id },
    });

    try {
      revalidateTag("teams", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Data roster berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/v1/roster/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data roster." },
      { status: 500 }
    );
  }
}

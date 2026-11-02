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

    const updated = await db.partner.update({
      where: { id },
      data: {
        name: body.name,
        tier: body.tier,
        logoUrl: body.logoUrl,
        websiteUrl: body.websiteUrl,
        description: body.description,
        displayOrder: body.displayOrder !== undefined ? parseInt(body.displayOrder) : undefined,
      },
    });

    try {
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Data mitra berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/v1/partners/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui mitra." },
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
    await db.partner.delete({
      where: { id },
    });

    try {
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Mitra berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/v1/partners/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus mitra." },
      { status: 500 }
    );
  }
}

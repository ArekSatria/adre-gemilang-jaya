import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
  try {
    const partners = await db.partner.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      message: "Daftar mitra berhasil diambil.",
      data: partners,
    });
  } catch (error) {
    console.error("GET /api/v1/partners error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat daftar mitra." },
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
    const { name, tier, logoUrl, websiteUrl, description, displayOrder } = body;

    const created = await db.partner.create({
      data: {
        name,
        tier: tier || "OFFICIAL",
        logoUrl: logoUrl || null,
        websiteUrl: websiteUrl || "https://adregemilangjaya.co.id",
        description: description || null,
        displayOrder: displayOrder ? parseInt(displayOrder) : 1,
      },
    });

    // Paksa bersihkan cache halaman publik agar mitra baru langsung muncul
    try {
      revalidateTag("home");
      revalidateTag("partners");
      revalidatePath("/", "layout");
      revalidatePath("/partners", "page");
    } catch (err) {
      console.warn("Revalidation warning:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Mitra berhasil ditambahkan.",
      data: created,
    });
  } catch (error) {
    console.error("POST /api/v1/partners error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan mitra." },
      { status: 500 }
    );
  }
}

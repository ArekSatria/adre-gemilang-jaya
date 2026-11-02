import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    let setting = await db.globalSetting.findUnique({
      where: { id: "default" },
    });

    if (!setting) {
      setting = await db.globalSetting.create({
        data: {
          id: "default",
          siteName: "PT Adre Gemilang Jaya",
          logoUrl: "/images/logo-adre.png",
          tagline: "Organisasi Esports Jakarta Indonesia",
          businessEmail: "contact@adregemilang.co.id",
          partnershipEmail: "partnership@adregemilang.co.id",
          addressShort: "SCBD, Jakarta Selatan, DKI Jakarta, Indonesia",
          socials: {
            instagram: "https://instagram.com/adreesports",
            youtube: "https://youtube.com/@adreesports",
            tiktok: "https://tiktok.com/@adreesports",
            x: "https://x.com/adreesports",
          },
        },
      });
    }

    const activeDivisions = await db.division.findMany({
      where: { isActive: true },
      select: { name: true, slug: true },
      orderBy: { name: "asc" },
    });

    const socialsData = (setting.socials as any) || {};

    const payload = {
      siteName: setting.siteName,
      logoUrl: setting.logoUrl,
      tagline: setting.tagline,
      heroImageUrl: socialsData.heroImageUrl || null,
      activeDivisionsNav: activeDivisions,
      contactQuick: {
        businessEmail: setting.businessEmail,
        partnershipEmail: setting.partnershipEmail,
        addressShort: setting.addressShort,
      },
      socials: socialsData,
    };

    return NextResponse.json({
      success: true,
      message: "Pengaturan global berhasil diambil.",
      data: payload,
    });
  } catch (error) {
    console.error("GET /api/v1/settings error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat pengaturan global." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const existingSocials = ((await db.globalSetting.findUnique({ where: { id: "default" } }))?.socials as any) || {};
    const mergedSocials = {
      ...existingSocials,
      ...(body.socials || {}),
      heroImageUrl: body.heroImageUrl !== undefined ? body.heroImageUrl : (body.socials?.heroImageUrl ?? existingSocials.heroImageUrl ?? null),
    };

    const updated = await db.globalSetting.upsert({
      where: { id: "default" },
      update: {
        siteName: body.siteName,
        logoUrl: body.logoUrl,
        tagline: body.tagline,
        businessEmail: body.contactQuick?.businessEmail ?? body.businessEmail,
        partnershipEmail: body.contactQuick?.partnershipEmail ?? body.partnershipEmail,
        addressShort: body.contactQuick?.addressShort ?? body.addressShort,
        socials: mergedSocials,
      },
      create: {
        id: "default",
        siteName: body.siteName || "PT Adre Gemilang Jaya",
        logoUrl: body.logoUrl || "/images/logo-adre.png",
        tagline: body.tagline || "",
        businessEmail: body.contactQuick?.businessEmail || "contact@adregemilang.co.id",
        partnershipEmail: body.contactQuick?.partnershipEmail || "partnership@adregemilang.co.id",
        addressShort: body.contactQuick?.addressShort || "SCBD, Jakarta Selatan, DKI Jakarta, Indonesia",
        socials: mergedSocials,
      },
    });

    try {
      revalidateTag("settings", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Pengaturan global berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/v1/settings error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui pengaturan global." },
      { status: 500 }
    );
  }
}

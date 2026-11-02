import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getAuthSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Tidak ada file yang dipilih." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const folder = (formData.get("folder") as string) || "general";
    const safeFolder = folder.replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "general";

    // Sanitize filename & extension
    const ext = path.extname(file.name).toLowerCase() || ".png";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 30);
    const uniqueName = `${baseName || "image"}-${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${uniqueName}`;

    return NextResponse.json({
      success: true,
      message: "File foto berhasil diunggah.",
      url: publicUrl,
    });
  } catch (error) {
    console.error("POST /api/v1/upload error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengunggah file foto." },
      { status: 500 }
    );
  }
}


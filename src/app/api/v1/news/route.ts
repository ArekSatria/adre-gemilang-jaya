import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");

    const categories = await db.articleCategory.findMany({
      select: { name: true, slug: true },
      orderBy: { name: "asc" },
    });

    const articles = await db.article.findMany({
      where: categorySlug
        ? { category: { slug: categorySlug } }
        : undefined,
      include: {
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: "desc" },
    });

    const items = articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      coverImageUrl: a.coverImageUrl,
      coverImageAlt: a.coverImageAlt || a.title,
      isFeatured: a.isFeatured,
      publishedAt: a.publishedAt.toISOString(),
      readingTimeMinutes: a.readingTimeMinutes,
      category: a.category,
    }));

    const payload = {
      categories,
      items,
    };

    return NextResponse.json({
      success: true,
      message: "Katalog berita berhasil dimuat.",
      data: payload,
    });
  } catch (error) {
    console.error("GET /api/v1/news error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat berita." },
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
    const {
      title,
      slug,
      excerpt,
      contentHtml,
      coverImageUrl,
      coverImageAlt,
      isFeatured,
      readingTimeMinutes,
      categoryId,
      authorName,
      authorAvatarUrl,
    } = body;

    if (!title || !slug || !contentHtml || !categoryId) {
      return NextResponse.json(
        { success: false, message: "Judul, slug, konten, dan kategori wajib diisi." },
        { status: 400 }
      );
    }

    if (isFeatured) {
      await db.article.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false },
      });
    }

    let finalCategoryId = categoryId;
    const cat = await db.articleCategory.findFirst({
      where: {
        OR: [{ id: categoryId }, { slug: categoryId }],
      },
    });

    if (cat) {
      finalCategoryId = cat.id;
    } else {
      const newCat = await db.articleCategory.create({
        data: {
          name: categoryId,
          slug: categoryId.toLowerCase().replace(/\s+/g, "-"),
        },
      });
      finalCategoryId = newCat.id;
    }

    const created = await db.article.create({
      data: {
        title,
        slug: slug.toLowerCase().trim(),
        excerpt: excerpt || title,
        contentHtml,
        coverImageUrl: coverImageUrl || null,
        coverImageAlt: coverImageAlt || title,
        isFeatured: Boolean(isFeatured),
        readingTimeMinutes: readingTimeMinutes ? parseInt(readingTimeMinutes) : 3,
        categoryId: finalCategoryId,
        authorName: authorName || session.name || "Tim Media PT Adre Gemilang Jaya",
        authorAvatarUrl: authorAvatarUrl || null,
      },
    });

    try {
      revalidateTag("news", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diterbitkan.",
      data: created,
    });
  } catch (error) {
    console.error("POST /api/v1/news error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Gagal menerbitkan berita." },
      { status: 500 }
    );
  }
}

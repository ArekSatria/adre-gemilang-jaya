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

    const article = await db.article.findUnique({
      where: { slug },
      include: {
        category: { select: { name: true, slug: true } },
      },
    });

    if (!article) {
      return NextResponse.json(
        { success: false, message: `Berita '${slug}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    const related = await db.article.findMany({
      where: {
        slug: { not: slug },
      },
      include: {
        category: { select: { name: true, slug: true } },
      },
      take: 2,
      orderBy: { publishedAt: "desc" },
    });

    const formatCard = (a: typeof article) => ({
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
    });

    const payload = {
      ...formatCard(article),
      contentHtml: article.contentHtml,
      author: {
        name: article.authorName,
        avatarUrl: article.authorAvatarUrl,
      },
      relatedNews: related.map(formatCard),
    };

    return NextResponse.json({
      success: true,
      message: "Detail berita berhasil dimuat.",
      data: payload,
    });
  } catch (error) {
    console.error("GET /api/v1/news/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat detail berita." },
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

    if (body.isFeatured) {
      await db.article.updateMany({
        where: { isFeatured: true, slug: { not: slug } },
        data: { isFeatured: false },
      });
    }

    let categoryId = body.categoryId;
    if (categoryId) {
      const cat = await db.articleCategory.findFirst({
        where: {
          OR: [{ id: categoryId }, { slug: categoryId }],
        },
      });
      if (cat) categoryId = cat.id;
    }

    const updated = await db.article.update({
      where: { slug },
      data: {
        title: body.title,
        slug: body.slug ? body.slug.toLowerCase().trim() : undefined,
        excerpt: body.excerpt,
        contentHtml: body.contentHtml,
        coverImageUrl: body.coverImageUrl || null,
        coverImageAlt: body.coverImageAlt || body.title,
        isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : undefined,
        readingTimeMinutes: body.readingTimeMinutes ? parseInt(body.readingTimeMinutes) : undefined,
        categoryId: categoryId || undefined,
        authorName: body.authorName,
      },
    });

    try {
      revalidateTag("news", { expire: 0 });
      revalidateTag(`news-${slug}`, { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("PUT /api/v1/news/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Gagal memperbarui berita." },
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
    await db.article.delete({
      where: { slug },
    });

    try {
      revalidateTag("news", { expire: 0 });
      revalidateTag("home", { expire: 0 });
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/v1/news/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus berita." },
      { status: 500 }
    );
  }
}

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  mockGlobalSettings,
  mockDivisionsCatalog,
  mockDivisionDetails,
  mockMatchesPayload,
  mockNewsItems,
  mockNewsDetailsBySlug,
  mockHomePayload,
} from "../src/lib/api/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Menjalankan Seeding Database Neon untuk Webad...");

  // 1. Admin User Default
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@adregemilangjaya.com" },
    update: {},
    create: {
      email: "admin@adregemilangjaya.com",
      name: "Administrator ADRE",
      password: hashedPassword,
    },
  });
  console.log(`✅ Admin siap: ${admin.email} (Password: admin123)`);

  // 2. Global Settings
  await prisma.globalSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: mockGlobalSettings.siteName,
      logoUrl: mockGlobalSettings.logoUrl,
      tagline: mockGlobalSettings.tagline,
      businessEmail: mockGlobalSettings.contactQuick.businessEmail,
      partnershipEmail: mockGlobalSettings.contactQuick.partnershipEmail,
      addressShort: mockGlobalSettings.contactQuick.addressShort,
      socials: mockGlobalSettings.socials,
    },
  });
  console.log("✅ Global settings berhasil di-seed.");

  // 3. Divisi & Roster Atlet
  for (const div of mockDivisionsCatalog) {
    const detail = mockDivisionDetails[div.slug] || {
      ...div,
      roster: [],
      achievements: [],
    };

    const createdDiv = await prisma.division.upsert({
      where: { slug: div.slug },
      update: {},
      create: {
        id: div.id,
        name: div.name,
        slug: div.slug,
        shortCode: div.shortCode || "PUBGM",
        gameTitle: div.gameTitle || "PUBG Mobile",
        bannerImageUrl: div.bannerImageUrl,
        activeRosterCount: detail.roster.length,
        tagline: div.tagline || "",
        description: detail.description || "",
        isActive: true,
      },
    });

    // Roster Members
    for (let i = 0; i < detail.roster.length; i++) {
      const r = detail.roster[i];
      await prisma.rosterMember.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          divisionId: createdDiv.id,
          ign: r.ign,
          fullName: r.fullName,
          role: r.role,
          roleType: r.roleType,
          countryCode: r.countryCode || "ID",
          photoUrl: r.photoUrl,
          joinDate: r.joinDate,
          displayOrder: i + 1,
        },
      });
    }

    // Achievements
    for (const ach of detail.achievements) {
      await prisma.achievement.upsert({
        where: { id: ach.id },
        update: {},
        create: {
          id: ach.id,
          divisionId: createdDiv.id,
          title: ach.title,
          placement: ach.placement,
          year: ach.year,
        },
      });
    }
  }
  console.log("✅ Divisi, roster, dan prestasi berhasil di-seed.");

  // 4. Matches
  for (const m of mockMatchesPayload.items) {
    const div = await prisma.division.findFirst({
      where: {
        OR: [{ slug: m.division.slug }, { shortCode: m.division.shortCode }],
      },
    });
    if (!div) continue;

    const match = await prisma.match.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        divisionId: div.id,
        tournamentName: m.tournamentName,
        stage: m.stage,
        scheduledAt: new Date(m.scheduledAt),
        status: m.status,
        formatType: m.formatType,
        streamUrl: m.streamUrl,
      },
    });

    if (m.resultBattleRoyale) {
      await prisma.battleRoyaleResult.upsert({
        where: { matchId: match.id },
        update: {},
        create: {
          matchId: match.id,
          placement: m.resultBattleRoyale.placement,
          placementLabel: m.resultBattleRoyale.placementLabel,
          totalPoints: m.resultBattleRoyale.totalPoints,
          wwcdCount: m.resultBattleRoyale.wwcdCount || 0,
        },
      });
    }
  }
  console.log("✅ Pertandingan berhasil di-seed.");

  // 5. Kategori Berita & Artikel
  const categories = [
    { name: "Turnamen", slug: "turnamen" },
    { name: "Pengumuman", slug: "pengumuman" },
  ];

  for (const cat of categories) {
    await prisma.articleCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  for (const item of mockNewsItems) {
    const cat = await prisma.articleCategory.findUnique({
      where: { slug: item.category.slug },
    });
    if (!cat) continue;

    const detail = mockNewsDetailsBySlug[item.slug];

    await prisma.article.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        contentHtml: detail?.contentHtml || `<p>${item.excerpt}</p>`,
        coverImageUrl: item.coverImageUrl,
        coverImageAlt: item.coverImageAlt,
        isFeatured: item.isFeatured,
        publishedAt: new Date(item.publishedAt),
        readingTimeMinutes: item.readingTimeMinutes,
        categoryId: cat.id,
        authorName: detail?.author.name || "Tim Media PT Adre Gemilang Jaya",
        authorAvatarUrl: detail?.author.avatarUrl,
      },
    });
  }
  console.log("✅ Berita berhasil di-seed.");

  // 6. Partners
  await prisma.partner.deleteMany({});
  const realPartners = [
    {
      id: "prt-01",
      name: "Renee Tournament",
      tier: "OFFICIAL",
      logoUrl: "/images/partners/partner-1.png",
      websiteUrl: "https://www.instagram.com/renevents.official",
      description: "Penyelenggara turnamen esports komunitas PUBG Mobile, seperti PMRB 2026 dan Adre Dominion Battle League.",
      displayOrder: 1,
    },
    {
      id: "prt-02",
      name: "Level Up Indonesia",
      tier: "OFFICIAL",
      logoUrl: "/images/partners/partner-2.png",
      websiteUrl: "https://www.instagram.com/levelupid_",
      description: "Platform media komunitas esports dan informasi kompetisi gaming terpopuler di Indonesia.",
      displayOrder: 2,
    },
    {
      id: "prt-03",
      name: "Coach Online ID",
      tier: "OFFICIAL",
      logoUrl: "/images/partners/partner-3.png",
      websiteUrl: "https://www.instagram.com/coach.online.id",
      description: "Media komunitas dan analisis taktik seputar dunia esports PUBG Mobile Indonesia.",
      displayOrder: 3,
    },
    {
      id: "prt-04",
      name: "Community Leader Indopride",
      tier: "OFFICIAL",
      logoUrl: "/images/partners/partner-4.png",
      websiteUrl: "https://www.instagram.com/cli.official_",
      description: "Wadah komunitas dan penyelenggara turnamen pihak ketiga untuk ekosistem kompetitif PUBG Mobile.",
      displayOrder: 4,
    },
    {
      id: "prt-05",
      name: "Chopper Tournament",
      tier: "OFFICIAL",
      logoUrl: "/images/partners/partner-5.png",
      websiteUrl: "https://www.instagram.com/choppertournament",
      description: "Platform turnamen pihak ketiga populer penyelenggara Chopper Crew, Showdown, dan Ladies League.",
      displayOrder: 5,
    },
  ];

  for (const p of realPartners) {
    await prisma.partner.create({
      data: p,
    });
  }
  console.log("✅ 5 Mitra resmi ADRE berhasil di-seed.");

  // 7. Hero Stats
  for (let i = 0; i < mockHomePayload.hero.highlightStats.length; i++) {
    const s = mockHomePayload.hero.highlightStats[i];
    await prisma.heroStat.upsert({
      where: { id: `stat-${i + 1}` },
      update: { label: s.label, value: s.value },
      create: {
        id: `stat-${i + 1}`,
        label: s.label,
        value: s.value,
        displayOrder: i + 1,
      },
    });
  }
  console.log("✅ Hero highlight stats berhasil di-seed.");

  console.log("🎉 Seeding database Neon untuk Webad selesai sempurna!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

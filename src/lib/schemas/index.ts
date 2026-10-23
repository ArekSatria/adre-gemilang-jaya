import { z } from "zod";

// 1. Amplop Respons Standar (Standard Response Envelope)
export const PaginationMetaSchema = z.object({
  currentPage: z.number(),
  perPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

export const createApiResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
    meta: PaginationMetaSchema.optional(),
  });

// 2. Skema Pengaturan Global (API-01: /api/v1/settings)
export const SocialLinksSchema = z.object({
  instagram: z.string().nullable().optional(),
  youtube: z.string().nullable().optional(),
  tiktok: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
  x: z.string().nullable().optional(),
});

export const GlobalSettingsSchema = z.object({
  siteName: z.string(),
  logoUrl: z.string().nullable(),
  tagline: z.string(),
  activeDivisionsNav: z.array(
    z.object({
      name: z.string(),
      slug: z.string(),
    }),
  ),
  contactQuick: z.object({
    businessEmail: z.string().email(),
    partnershipEmail: z.string().email(),
    addressShort: z.string(),
  }),
  socials: SocialLinksSchema,
});

// 3. Skema Divisi & Roster (API-03 & API-04: /teams & /teams/:slug)
export const RosterMemberSchema = z.object({
  id: z.string(),
  ign: z.string(),
  fullName: z.string(),
  role: z.string(), // IGL, RUSHER, SUPPORT, SCOUT, Coach, Analyst, Manager
  roleType: z.enum(["PLAYER", "STAFF"]),
  photoUrl: z.string().nullable(),
  displayOrder: z.number(),
  socials: SocialLinksSchema.optional(),
});

export const AchievementSchema = z.object({
  id: z.string(),
  year: z.number(),
  tournamentName: z.string(),
  placementLabel: z.string(),
});

export const DivisionSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  shortCode: z.string().optional(),
  bannerUrl: z.string().nullable(),
  logoUrl: z.string().nullable(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  activeRosterCount: z.number(),
});

export const DivisionDetailSchema = DivisionSummarySchema.extend({
  roster: z.array(RosterMemberSchema),
  achievements: z.array(AchievementSchema),
});

// 4. Skema Pertandingan (API-05: /matches - Mendukung BATTLE_ROYALE & VERSUS)
export const MatchResultSchema = z.object({
  placementBadge: z.string().nullable(), // Contoh: "#1 WWCD"
  totalPoints: z.number().nullable(),
  ourScore: z.number().nullable(),
  opponentScore: z.number().nullable(),
  outcome: z.enum(["WIN", "LOSS", "DRAW", "TOP3"]),
});

export const MatchItemSchema = z.object({
  id: z.string(),
  status: z.enum(["UPCOMING", "COMPLETED"]),
  matchFormat: z.enum(["BATTLE_ROYALE", "VERSUS"]),
  scheduledAt: z.string(),
  tournamentName: z.string(),
  tournamentStage: z.string(),
  division: z.object({
    name: z.string(),
    slug: z.string(),
  }),
  ourTeamName: z.string(),
  opponentName: z.string().nullable(),
  result: MatchResultSchema.nullable(),
  streamUrl: z.string().nullable(),
});

export const MatchesPayloadSchema = z.object({
  availableGames: z.array(
    z.object({
      name: z.string(),
      slug: z.string(),
    }),
  ),
  items: z.array(MatchItemSchema),
});

// 5. Skema Berita & Artikel (API-06 & API-07: /news & /news/:slug)
export const NewsSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  coverImageUrl: z.string().nullable(),
  coverImageAlt: z.string(),
  isFeatured: z.boolean(),
  publishedAt: z.string(),
  readingTimeMinutes: z.number(),
  category: z.object({
    name: z.string(),
    slug: z.string(),
  }),
  division: z
    .object({
      name: z.string(),
      slug: z.string(),
    })
    .nullable(),
});

export const NewsCatalogPayloadSchema = z.object({
  categories: z.array(z.object({ name: z.string(), slug: z.string() })),
  featured: NewsSummarySchema.nullable(),
  items: z.array(NewsSummarySchema),
});

export const NewsDetailSchema = NewsSummarySchema.extend({
  contentHtml: z.string(),
  author: z.object({
    name: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    ogImageUrl: z.string().nullable(),
  }),
  relatedNews: z.array(NewsSummarySchema),
});

// 6. Skema Mitra & Sponsor (API-08: /partners)
export const PartnerItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.enum(["PRINCIPAL", "OFFICIAL", "SUPPLIER"]),
  logoUrl: z.string().nullable(),
  description: z.string(),
  websiteUrl: z.string().nullable(),
  displayOrder: z.number(),
});

// 7. Skema Profil Perusahaan & Kontak (API-09: /company)
export const CompanyProfileSchema = z.object({
  companyName: z.string(),
  aboutHtml: z.string(),
  companyImageUrl: z.string().nullable(),
  vision: z.string(),
  missions: z.array(z.string()),
  coreValues: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      iconName: z.string(),
    }),
  ),
  milestones: z.array(
    z.object({
      year: z.number(),
      title: z.string(),
      description: z.string(),
    }),
  ),
  contact: z.object({
    businessEmail: z.string().email(),
    partnershipEmail: z.string().email(),
    officeAddress: z.string(),
    mapEmbedUrl: z.string().nullable(),
    socials: SocialLinksSchema,
  }),
});

// 8. Skema Agregasi Beranda (API-02: /home)
export const HomePayloadSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    backgroundImageUrl: z.string().nullable(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }),
  }),
  nextMatch: z
    .object({
      id: z.string(),
      tournamentName: z.string(),
      matchLabel: z.string(),
      scheduledAt: z.string(),
      division: z.object({ name: z.string(), slug: z.string() }),
      streamUrl: z.string().nullable(),
    })
    .nullable(),
  divisionQuickCard: z.object({
    name: z.string(),
    slug: z.string(),
    logoUrl: z.string().nullable(),
    activeRosterCount: z.number(),
  }),
  partnersStrip: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      logoUrl: z.string().nullable(),
      websiteUrl: z.string().nullable(),
    }),
  ),
  activeDivisions: z.array(DivisionSummarySchema),
  upcomingMatches: z.array(MatchItemSchema),
  latestNews: z.array(NewsSummarySchema),
  companyIntro: z.object({
    headline: z.string(),
    summary: z.string(),
    imageUrl: z.string().nullable(),
  }),
});

// Ekspor Tipe TypeScript Otomatis dari Skema Zod
export type GlobalSettings = z.infer<typeof GlobalSettingsSchema>;
export type DivisionSummary = z.infer<typeof DivisionSummarySchema>;
export type DivisionDetail = z.infer<typeof DivisionDetailSchema>;
export type RosterMember = z.infer<typeof RosterMemberSchema>;
export type MatchItem = z.infer<typeof MatchItemSchema>;
export type MatchesPayload = z.infer<typeof MatchesPayloadSchema>;
export type NewsSummary = z.infer<typeof NewsSummarySchema>;
export type NewsCatalogPayload = z.infer<typeof NewsCatalogPayloadSchema>;
export type NewsDetail = z.infer<typeof NewsDetailSchema>;
export type PartnerItem = z.infer<typeof PartnerItemSchema>;
export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
export type HomePayload = z.infer<typeof HomePayloadSchema>;

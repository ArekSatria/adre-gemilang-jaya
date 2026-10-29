import { z } from "zod";

// 1. Global Settings Schema (API-01)
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
  socials: z.object({
    instagram: z.string().nullable().optional(),
    youtube: z.string().nullable().optional(),
    tiktok: z.string().nullable().optional(),
    x: z.string().nullable().optional(),
  }),
});

// 2. Division Summary Schema (API-03)
export const DivisionSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  shortCode: z.string(),
  gameTitle: z.string(),
  bannerImageUrl: z.string().nullable(),
  activeRosterCount: z.number(),
  tagline: z.string(),
});

// 3. Roster Member & Division Detail Schema (API-04 — Mendukung MANAGER)
export const RosterMemberSchema = z.object({
  id: z.string(),
  ign: z.string(),
  fullName: z.string(),
  role: z.enum([
    "IGL",
    "RUSHER",
    "SUPPORT",
    "SCOUT",
    "MANAGER",
    "COACH",
    "ANALYST",
  ]),
  roleType: z.enum(["PLAYER", "STAFF"]),
  countryCode: z.string(),
  photoUrl: z.string().nullable(),
  joinDate: z.string().optional(),
});

export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  placement: z.string(),
  year: z.string(),
});

export const DivisionDetailSchema = DivisionSummarySchema.extend({
  description: z.string(),
  roster: z.array(RosterMemberSchema),
  achievements: z.array(AchievementSchema),
});

// 4. Matches Schema (API-05)
export const BattleRoyaleResultSchema = z.object({
  placement: z.number(),
  placementLabel: z.string(),
  totalPoints: z.number(),
  wwcdCount: z.number().optional(),
});

export const MatchItemSchema = z.object({
  id: z.string(),
  tournamentName: z.string(),
  stage: z.string(),
  scheduledAt: z.string(),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED"]),
  formatType: z.enum(["BATTLE_ROYALE", "TACTICAL_5V5"]),
  division: z.object({
    name: z.string(),
    slug: z.string(),
    shortCode: z.string(),
  }),
  streamUrl: z.string().nullable(),
  resultBattleRoyale: BattleRoyaleResultSchema.nullable(),
});

export const MatchesPayloadSchema = z.object({
  items: z.array(MatchItemSchema),
});

// 5. News Schemas (API-06 & API-07)
export const NewsCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const NewsCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  coverImageUrl: z.string().nullable(),
  coverImageAlt: z.string(),
  isFeatured: z.boolean(),
  publishedAt: z.string(),
  readingTimeMinutes: z.number(),
  category: NewsCategorySchema,
});

export const NewsListPayloadSchema = z.object({
  categories: z.array(NewsCategorySchema),
  items: z.array(NewsCardSchema),
});

export const NewsDetailSchema = NewsCardSchema.extend({
  contentHtml: z.string(),
  author: z.object({
    name: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  relatedNews: z.array(NewsCardSchema),
});

// 6. Home Payload Schema (API-02)
export const PartnerStripItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.string(),
  logoUrl: z.string().nullable(),
  websiteUrl: z.string(),
});

export const HomePayloadSchema = z.object({
  hero: z.object({
    badgeText: z.string(),
    headline: z.string(),
    subheadline: z.string(),
    primaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    secondaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    highlightStats: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
  }),
  nextMatch: MatchItemSchema.nullable(),
  activeDivisions: z.array(DivisionSummarySchema),
  recentResults: z.array(MatchItemSchema),
  latestNews: z.array(NewsCardSchema),
  partnersStrip: z.array(PartnerStripItemSchema),
});

export type GlobalSettings = z.infer<typeof GlobalSettingsSchema>;
export type DivisionSummary = z.infer<typeof DivisionSummarySchema>;
export type RosterMember = z.infer<typeof RosterMemberSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type DivisionDetail = z.infer<typeof DivisionDetailSchema>;
export type MatchItem = z.infer<typeof MatchItemSchema>;
export type MatchesPayload = z.infer<typeof MatchesPayloadSchema>;
export type NewsCategory = z.infer<typeof NewsCategorySchema>;
export type NewsCard = z.infer<typeof NewsCardSchema>;
export type NewsListPayload = z.infer<typeof NewsListPayloadSchema>;
export type NewsDetail = z.infer<typeof NewsDetailSchema>;
export type HomePayload = z.infer<typeof HomePayloadSchema>;

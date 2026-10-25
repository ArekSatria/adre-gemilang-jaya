"use client";

import React from "react";
import Link from "next/link";
import { Trophy, User } from "lucide-react";
import type { DivisionDetail, RosterMember } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIconSvg } from "@/components/ui/BrandElements";

interface DivisionDetailViewProps {
  division: DivisionDetail;
}

function RosterCutoutCard({ member }: { member: RosterMember }) {
  const socials = member.socials;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-surface transition-transform hover:-translate-y-1">
      {/* Area Visual Siluet / Foto Atlet */}
      <div className="relative flex h-52 items-end justify-center bg-gradient-to-t from-surface via-elevated/60 to-elevated px-4 pt-6">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-background/60 text-slate-300 transition-colors group-hover:text-brand">
          <User className="h-14 w-14 stroke-[1.5]" aria-hidden="true" />
        </div>
        <span className="absolute top-4 right-4 rounded bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand uppercase">
          {member.role}
        </span>
      </div>

      {/* Identitas IGN, Nama Lengkap & Tautan Sosial */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            {member.ign}
          </h3>
          <p className="mt-0.5 text-sm text-slate-300">{member.fullName}</p>
        </div>

        {socials && (
          <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-3">
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${member.ign}`}
                className="text-slate-300 transition-colors hover:text-brand"
              >
                <SocialIconSvg platform="instagram" className="h-4 w-4" />
              </a>
            )}
            {socials.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`YouTube ${member.ign}`}
                className="text-slate-300 transition-colors hover:text-brand"
              >
                <SocialIconSvg platform="youtube" className="h-4 w-4" />
              </a>
            )}
            {socials.tiktok && (
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok ${member.ign}`}
                className="text-slate-300 transition-colors hover:text-brand"
              >
                <SocialIconSvg platform="tiktok" className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function DivisionDetailView({ division }: DivisionDetailViewProps) {
  const { t } = useLanguage();

  const players = division.roster
    .filter((m) => m.roleType === "PLAYER")
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const staffMembers = division.roster
    .filter((m) => m.roleType === "STAFF")
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
      {/* Navigasi Kembali & Banner Header Divisi */}
      <div className="space-y-6">
        <Link
          href="/teams"
          className="inline-block text-xs font-semibold text-slate-300 transition-colors hover:text-brand"
        >
          {t.teamsPage.backToCatalog}
        </Link>

        <div className="rounded-2xl bg-surface p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block rounded bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand uppercase">
                ACTIVE ROSTER
              </span>
              <h1 className="font-display text-3xl font-bold text-foreground sm:text-5xl">
                {division.name}
              </h1>
              {division.description && (
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {division.description}
                </p>
              )}
            </div>

            <Link
              href="/matches"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand px-5 py-3 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
            >
              {t.teamsPage.scheduleCta}
            </Link>
          </div>
        </div>
      </div>

      {/* Seksi 1: Skuad Pemain Inti (PLAYER: IGL, RUSHER, SUPPORT, SCOUT) */}
      <section className="space-y-6">
        <SectionHeading
          title={t.teamsPage.playersHeading}
          subtitle={t.teamsPage.playersSub}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {players.map((player) => (
            <RosterCutoutCard key={player.id} member={player} />
          ))}
        </div>
      </section>

      {/* Seksi 2: Jajaran Staf Kepelatihan & Analis (STAFF: Coach & Analyst) */}
      {staffMembers.length > 0 && (
        <section className="space-y-6">
          <SectionHeading
            title={t.teamsPage.staffHeading}
            subtitle={t.teamsPage.staffSub}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staffMembers.map((staff) => (
              <RosterCutoutCard key={staff.id} member={staff} />
            ))}
          </div>
        </section>
      )}

      {/* Seksi 3: Rekam Jejak Prestasi Turnamen (Divide-Y List Tanpa Kartu) */}
      <section className="space-y-6">
        <SectionHeading
          title={t.teamsPage.achievementsHeading}
          subtitle={t.teamsPage.achievementsSub}
        />
        <div className="divide-y divide-white/5 border-y border-white/5">
          {division.achievements.map((ach) => (
            <div
              key={ach.id}
              className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-bold text-brand">
                  {ach.year}
                </span>
                <h3 className="font-display text-base font-bold text-foreground">
                  {ach.tournamentName}
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded bg-brand/15 px-3 py-1 text-xs font-semibold text-brand sm:self-auto">
                <Trophy className="h-3.5 w-3.5" />
                <span>{ach.placementLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

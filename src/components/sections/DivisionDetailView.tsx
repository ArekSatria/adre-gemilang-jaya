"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DivisionDetail } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface DivisionDetailViewProps {
  division: DivisionDetail;
}

type RosterMember = DivisionDetail["roster"][number];

function MemberCard({
  member,
  roleLabel,
}: {
  member: RosterMember;
  roleLabel: string;
}) {
  const [imgError, setImgError] = useState(false);
  const fallbackPhoto = "/images/pubg-logo-bg.svg";
  const resolvedPhoto =
    member.photoUrl && !imgError ? member.photoUrl : fallbackPhoto;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:border-brand sm:p-8">
      {/* Animasi Smooth Hover Background Foto Personil */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-35">
        <Image
          src={resolvedPhoto}
          alt={member.ign}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 330px"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-md border border-brand/40 bg-brand/15 px-3 py-1 font-mono text-xs font-bold text-brand uppercase">
              {member.role}
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground uppercase group-hover:text-brand sm:text-3xl">
              {member.ign.replace(/[•—–-]/g, " ")}
            </h3>
            <p className="mt-1 text-sm text-slate-300">{member.fullName}</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 text-xs font-semibold text-slate-400">
          {roleLabel}
        </div>
      </div>
    </div>
  );
}

export function DivisionDetailView({ division }: DivisionDetailViewProps) {
  const { locale, t } = useLanguage();

  const players = division.roster.filter((m) => m.roleType === "PLAYER");
  const rawStaff = division.roster.filter((m) => m.roleType === "STAFF");

  const hasManager = rawStaff.some((s) =>
    s.role.toUpperCase().includes("MANAGER"),
  );

  const staffWithManager: RosterMember[] = hasManager
    ? rawStaff
    : [
        {
          id: "rst-manager",
          ign: "ADRE Valkyrie",
          fullName: "Dimas Prakoso",
          role: "MANAGER" as const,
          roleType: "STAFF" as const,
          countryCode: "ID",
          photoUrl: "/images/roster/valkyrie.png",
          joinDate: "2024-04-01",
        },
        ...rawStaff,
      ];

  const getRoleTranslation = (roleKey: string) => {
    const normalized = roleKey.toUpperCase();
    const dictRoles = t.teamsPage.roleLabels as Record<string, string>;
    return dictRoles[normalized] || roleKey;
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Halaman Detail Tanpa Deskripsi */}
      <div className="space-y-6">
        <Link
          href="/teams"
          className="inline-block text-xs font-semibold text-slate-400 hover:text-brand"
        >
          {t.teamsPage.backToCatalog}
        </Link>

        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand uppercase">
              {division.shortCode}
            </span>
            <h1 className="font-display text-4xl font-black tracking-tight text-foreground uppercase sm:text-6xl">
              {division.name}
            </h1>
          </div>

          <Link
            href="/matches"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-xs font-bold text-background uppercase transition-opacity hover:opacity-90"
          >
            {t.teamsPage.scheduleCta}
          </Link>
        </div>
      </div>

      {/* Pemain */}
      <section className="space-y-6">
        <SectionHeading title={t.teamsPage.playersHeading} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {players.map((player) => (
            <MemberCard
              key={player.id}
              member={player}
              roleLabel={getRoleTranslation(player.role)}
            />
          ))}
        </div>
      </section>

      {/* Manajer & Staf Pelatih */}
      <section className="space-y-6">
        <SectionHeading title={t.teamsPage.managementHeading} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {staffWithManager.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              roleLabel={getRoleTranslation(member.role)}
            />
          ))}
        </div>
      </section>

      {/* Prestasi Tim (Tanpa Subjudul) */}
      <section className="space-y-6">
        <SectionHeading title={t.teamsPage.achievementsHeading} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {division.achievements.map((ach) => (
            <div
              key={ach.id}
              className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8 space-y-3"
            >
              <div className="flex items-center justify-between font-mono text-xs font-bold text-brand uppercase">
                <span>{ach.placement.replace(/[•—–-]/g, " ")}</span>
                <span>{ach.year}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {ach.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

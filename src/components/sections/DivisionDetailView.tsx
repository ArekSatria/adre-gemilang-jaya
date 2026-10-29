"use client";

import React from "react";
import Link from "next/link";
import type { DivisionDetail } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface DivisionDetailViewProps {
  division: DivisionDetail;
}

export function DivisionDetailView({ division }: DivisionDetailViewProps) {
  const { locale, t } = useLanguage();

  const players = division.roster.filter((m) => m.roleType === "PLAYER");
  const rawStaff = division.roster.filter((m) => m.roleType === "STAFF");

  const hasManager = rawStaff.some((s) =>
    s.role.toUpperCase().includes("MANAGER"),
  );
  const staffWithManager = hasManager
    ? rawStaff
    : [
        {
          id: "rst-manager",
          ign: "ADRE Valkyrie",
          fullName: "Dimas Prakoso",
          role: "MANAGER",
          roleType: "STAFF" as const,
          countryCode: "ID",
          photoUrl: null,
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
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Link
          href="/teams"
          className="inline-block text-xs font-semibold text-slate-300 hover:text-brand"
        >
          {t.teamsPage.backToCatalog}
        </Link>

        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-brand uppercase">
              {division.shortCode} ({t.teamsPage.personnelComposition})
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-5xl">
              {division.name}
            </h1>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              {locale === "id"
                ? "Tim PUBG Mobile PT Adre Gemilang Jaya di Jakarta yang terdiri dari 4 pemain inti, 1 manajer tim, serta 2 staf pelatih dan analis."
                : "PT Adre Gemilang Jaya's PUBG Mobile squad in Jakarta consisting of 4 core players, 1 team manager, and 2 coaching staff."}
            </p>
          </div>

          <Link
            href="/matches"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand px-5 py-3 text-xs font-bold text-background uppercase"
          >
            {t.teamsPage.scheduleCta}
          </Link>
        </div>
      </div>

      {/* Pemain Inti */}
      <section className="space-y-6">
        <SectionHeading
          title={t.teamsPage.playersHeading}
          subtitle={t.teamsPage.playersSub}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="rounded-xl border border-white/10 bg-surface p-6 space-y-3"
            >
              <span className="inline-block font-mono text-xs font-bold text-brand uppercase">
                {player.role}
              </span>

              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {player.ign.replace(/[•—–-]/g, " ")}
                </h3>
                <p className="mt-1 text-sm text-slate-300">{player.fullName}</p>
              </div>

              <div className="border-t border-white/10 pt-3 text-xs text-slate-400">
                {getRoleTranslation(player.role)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manajer & Staf Pelatih */}
      <section className="space-y-6">
        <SectionHeading
          title={t.teamsPage.managementHeading}
          subtitle={t.teamsPage.managementSub}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {staffWithManager.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border border-white/10 bg-surface p-6 space-y-3"
            >
              <span className="inline-block font-mono text-xs font-bold text-brand uppercase">
                {member.role}
              </span>

              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {member.ign.replace(/[•—–-]/g, " ")}
                </h3>
                <p className="mt-1 text-sm text-slate-300">{member.fullName}</p>
              </div>

              <div className="border-t border-white/10 pt-3 text-xs text-slate-300">
                {getRoleTranslation(member.role)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prestasi */}
      <section className="space-y-6">
        <SectionHeading
          title={t.teamsPage.achievementsHeading}
          subtitle={t.teamsPage.achievementsSub}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {division.achievements.map((ach) => (
            <div
              key={ach.id}
              className="rounded-xl border border-white/10 bg-surface p-6 space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-xs font-bold text-brand uppercase">
                <span>{ach.placement.replace(/[•—–-]/g, " ")}</span>
                <span>{ach.year}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {ach.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

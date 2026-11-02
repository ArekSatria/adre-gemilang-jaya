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
  const hasPhoto = member.photoUrl && member.photoUrl.trim() !== "" && !imgError;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:border-brand hover:shadow-xl hover:shadow-brand/5">
      {/* Container Foto Atlet (Rasio 4:5 Portrait Standar Roster Esports) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950/80 border-b border-white/5">
        {hasPhoto ? (
          <Image
            src={member.photoUrl!}
            alt={member.ign}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand/10 border border-brand/20 text-brand font-display font-black text-2xl">
              {member.ign.slice(0, 2).toUpperCase()}
            </div>
            <span className="mt-3 text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Foto Belum Tersedia
            </span>
          </div>
        )}

        {/* Gradasi lembut agar foto menyatu secara natural ke badan kartu */}
        {hasPhoto && (
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-85" />
        )}

        {/* Role Badge di sudut kiri atas foto */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block rounded-md border border-brand/40 bg-surface/90 backdrop-blur-md px-2.5 py-1 font-mono text-[11px] font-bold text-brand uppercase shadow-md">
            {member.role}
          </span>
        </div>
      </div>

      {/* Bagian Informasi Atlet & Peran */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-foreground uppercase group-hover:text-brand transition-colors sm:text-3xl">
            {member.ign.replace(/[•—–-]/g, " ")}
          </h3>
          <p className="mt-1 text-sm text-slate-300">{member.fullName}</p>
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
  const staff = division.roster.filter((m) => m.roleType === "STAFF");

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

        {players.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-surface p-12 text-center text-sm text-slate-300">
            Belum ada data pemain untuk divisi ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {players.map((player) => (
              <MemberCard
                key={player.id}
                member={player}
                roleLabel={getRoleTranslation(player.role)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Manajer & Staf Pelatih */}
      <section className="space-y-6">
        <SectionHeading title={t.teamsPage.managementHeading} />

        {staff.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-surface p-12 text-center text-sm text-slate-300">
            Belum ada data manajer & staf pelatih untuk divisi ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {staff.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                roleLabel={getRoleTranslation(member.role)}
              />
            ))}
          </div>
        )}
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

import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  Newspaper,
  Swords,
  ShieldAlert,
  Handshake,
  PlusCircle,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let isDbConnected = false;
  let stats = {
    newsCount: 0,
    matchesCount: 0,
    upcomingMatchesCount: 0,
    divisionsCount: 0,
    rosterCount: 0,
    partnersCount: 0,
  };
  let dbError = "";

  try {
    const [news, matches, upcoming, divisions, rosters, partners] = await Promise.all([
      db.article.count(),
      db.match.count(),
      db.match.count({ where: { status: "UPCOMING" } }),
      db.division.count(),
      db.rosterMember.count(),
      db.partner.count(),
    ]);

    stats = {
      newsCount: news,
      matchesCount: matches,
      upcomingMatchesCount: upcoming,
      divisionsCount: divisions,
      rosterCount: rosters,
      partnersCount: partners,
    };
    isDbConnected = true;
  } catch (error: any) {
    isDbConnected = false;
    dbError = error.message || "Tidak dapat terhubung ke Neon PostgreSQL.";
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-1">
          <Sparkles size={14} /> Ringkasan Sistem
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Dashboard Pengelolaan Konten
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Selamat datang di panel admin PT Adre Gemilang Jaya. Kelola seluruh aset dan data website dari sini.
        </p>
      </div>

      {/* Database Connection Alert */}
      {!isDbConnected ? (
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-900/50 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-200">
                Koneksi Neon PostgreSQL Belum Terhubung
              </h3>
              <p className="text-xs text-amber-300/80 mt-1 leading-relaxed max-w-2xl">
                Pastikan kamu sudah memasukkan connection string dari Neon ke dalam file{" "}
                <code className="bg-amber-950 px-1.5 py-0.5 rounded text-amber-200 font-mono">.env.local</code>{" "}
                lalu jalankan migrasi database <code className="bg-amber-950 px-1.5 py-0.5 rounded text-amber-200 font-mono">npx prisma db push</code> dan <code className="bg-amber-950 px-1.5 py-0.5 rounded text-amber-200 font-mono">npm run prisma:seed</code>.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 flex items-center justify-between text-xs text-emerald-400">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>
              Terhubung ke <strong>Neon PostgreSQL</strong> secara realtime. Data siap dikelola.
            </span>
          </div>
          <span className="font-mono text-[11px] bg-emerald-900/40 px-2 py-0.5 rounded text-emerald-300">
            SSL Enabled
          </span>
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* News */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Artikel & Berita</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Newspaper size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{stats.newsCount}</div>
            <Link
              href="/admin/news"
              className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 mt-2 font-medium"
            >
              Kelola Berita <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Matches */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Pertandingan</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Swords size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{stats.matchesCount}</div>
            <div className="text-xs text-slate-400 mt-1">
              <span className="text-amber-400 font-semibold">{stats.upcomingMatchesCount}</span> akan datang
            </div>
            <Link
              href="/admin/matches"
              className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 mt-2 font-medium"
            >
              Jadwal & Skor <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Teams & Roster */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Divisi & Roster</span>
            <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
              <ShieldAlert size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{stats.divisionsCount} Divisi</div>
            <div className="text-xs text-slate-400 mt-1">
              <span className="text-red-400 font-semibold">{stats.rosterCount}</span> atlet & staf
            </div>
            <Link
              href="/admin/teams"
              className="text-xs text-red-400 hover:text-red-300 inline-flex items-center gap-1 mt-2 font-medium"
            >
              Kelola Roster <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Partners */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Mitra & Sponsor</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Handshake size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white">{stats.partnersCount}</div>
            <Link
              href="/admin/partners"
              className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 mt-2 font-medium"
            >
              Kelola Sponsor <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
        <h2 className="text-base font-bold text-white mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            href="/admin/news"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/50 flex items-center gap-3 text-slate-300 hover:text-white transition group"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20">
              <PlusCircle size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Tulis Berita Baru</div>
              <div className="text-xs text-slate-500">Publikasi artikel / pengumuman</div>
            </div>
          </Link>

          <Link
            href="/admin/matches"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/50 flex items-center gap-3 text-slate-300 hover:text-white transition group"
          >
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
              <PlusCircle size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Input Jadwal Pertandingan</div>
              <div className="text-xs text-slate-500">Update match & hasil skor WWCD</div>
            </div>
          </Link>

          <Link
            href="/admin/teams"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/50 flex items-center gap-3 text-slate-300 hover:text-white transition group"
          >
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20">
              <PlusCircle size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">Tambah Atlet / Roster</div>
              <div className="text-xs text-slate-500">Perbarui susunan pemain aktif</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/40 bg-elevated text-brand">
        <Compass className="h-7 w-7" />
      </div>
      <p className="mt-4 font-display text-sm font-bold tracking-widest text-brand uppercase">
        ERROR 404 — ROUTE NOT FOUND
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-wide text-foreground uppercase">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Tautan halaman atau divisi yang Anda cari tidak tersedia atau telah
        dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-xs font-bold tracking-wider text-background uppercase transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}

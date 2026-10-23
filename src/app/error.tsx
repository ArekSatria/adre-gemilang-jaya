"use client";

import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-danger/40 bg-danger/10 text-danger">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold tracking-wide text-foreground uppercase">
        Gangguan Sinkronisasi Data Layanan
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {error.message ||
          "Terjadi kendala saat memuat data dari server. Silakan muat ulang komponen ini."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-xs font-bold tracking-wider text-background uppercase transition-opacity hover:opacity-90"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Coba Muat Ulang</span>
      </button>
    </div>
  );
}

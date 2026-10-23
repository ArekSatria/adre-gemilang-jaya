import React from "react";
import { getGlobalSettings } from "@/lib/api/client";

export default async function HomePageSprint1Shell() {
  const settings = await getGlobalSettings();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/10 bg-surface p-8 sm:p-12">
        <span className="inline-block rounded bg-brand/15 px-3 py-1 text-xs font-bold tracking-wider text-brand uppercase">
          Sprint 1 — Core Layout &amp; Zod Data Layer Ready
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-foreground uppercase sm:text-4xl">
          {settings.siteName}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
          {settings.tagline}. Fondasi tata letak global (FloatingGlassNavbar,
          Mobile Drawer, dan ObsidianFooter) serta lapisan validasi skema
          runtime Zod telah aktif dan terhubung dengan sumber data divisi{" "}
          <span className="font-semibold text-brand">
            {settings.activeDivisionsNav.map((d) => d.name).join(", ")}
          </span>
          .
        </p>

        {/* Kerangka Area Konten Beranda yang Akan Diisi pada Sprint 2 */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-dashed border-white/10 bg-background/50 p-5">
            <p className="font-display text-sm font-bold text-foreground uppercase">
              Slot Modul PBI-04
            </p>
            <p className="mt-1 text-xs text-slate-300">
              HeroBentoSpotlight &amp; PartnerStrip (Dijadwalkan pada Sprint 2)
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 bg-background/50 p-5">
            <p className="font-display text-sm font-bold text-foreground uppercase">
              Slot Modul PBI-05 (Bagian A)
            </p>
            <p className="mt-1 text-xs text-slate-300">
              MatchCommandRow &amp; Portal Divisi Aktif (Dijadwalkan pada Sprint
              2)
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 bg-background/50 p-5">
            <p className="font-display text-sm font-bold text-foreground uppercase">
              Slot Modul PBI-05 (Bagian B)
            </p>
            <p className="mt-1 text-xs text-slate-300">
              NewsEditorialCard Pratinjau Berita (Dijadwalkan pada Sprint 2)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

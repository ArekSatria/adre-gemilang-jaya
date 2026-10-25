import React from "react";
import type { Metadata } from "next";
import { getMatchesData } from "@/lib/api/client";
import { MatchesView } from "@/components/sections/MatchesView";

export const metadata: Metadata = {
  title: "Jadwal & Hasil Pertandingan",
  description:
    "Jadwal turnamen resmi PMSL SEA dan rekapitulasi skor akhir divisi kompetitif PUBG Mobile PT Adre Gemilang Jaya.",
};

export default async function MatchesPage() {
  const matchesData = await getMatchesData();

  return <MatchesView data={matchesData} />;
}

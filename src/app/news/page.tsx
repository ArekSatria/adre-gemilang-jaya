import React from "react";
import type { Metadata } from "next";
import { getNewsCatalog } from "@/lib/api/client";
import { NewsCatalogView } from "@/components/sections/NewsCatalogView";

export const metadata: Metadata = {
  title: "Berita & Rilis Resmi",
  description:
    "Berita resmi, pengumuman roster PUBG Mobile, laporan hasil turnamen, dan kabar korporasi PT Adre Gemilang Jaya.",
};

export default async function NewsPage() {
  const newsData = await getNewsCatalog();

  return <NewsCatalogView data={newsData} />;
}

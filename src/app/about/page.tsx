import React from "react";
import type { Metadata } from "next";
import { AboutView } from "@/components/sections/AboutView";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Tentang Perusahaan",
  description:
    "Profil korporasi, visi misi, tonggak sejarah, dan lokasi operasional PT Adre Gemilang Jaya di Palembang dan Jakarta.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let company = null;
  try {
    company = await db.companyProfile.findUnique({
      where: { id: "default" },
    });
  } catch {}

  return <AboutView company={company} />;
}

import React from "react";
import type { Metadata } from "next";
import { PartnersView } from "@/components/sections/PartnersView";
import { getPartners } from "@/lib/api/client";

export const metadata: Metadata = {
  title: "Mitra Komersial & Sponsor Resmi",
  description:
    "Daftar mitra komersial, sponsor perangkat gaming, dan peluang kolaborasi merek bersama PT Adre Gemilang Jaya.",
};

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await getPartners();

  return <PartnersView initialPartners={partners} />;
}

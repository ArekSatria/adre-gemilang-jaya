import React from "react";
import type { Metadata } from "next";
import { getActiveDivisions } from "@/lib/api/client";
import { TeamsCatalogView } from "@/components/sections/TeamsCatalogView";

export const metadata: Metadata = {
  title: "Divisi & Roster",
  description:
    "Katalog divisi olahraga elektronik resmi PT Adre Gemilang Jaya. Eksplorasi profil skuad kompetitif PUBG Mobile.",
};

export default async function TeamsPage() {
  const divisions = await getActiveDivisions();

  return <TeamsCatalogView divisions={divisions} />;
}

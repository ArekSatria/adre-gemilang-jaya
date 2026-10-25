import React from "react";
import type { Metadata } from "next";
import { AboutView } from "@/components/sections/AboutView";

export const metadata: Metadata = {
  title: "Tentang Perusahaan",
  description:
    "Profil korporasi, visi misi, tonggak sejarah, dan lokasi operasional PT Adre Gemilang Jaya di Palembang dan Jakarta.",
};

export default function AboutPage() {
  return <AboutView />;
}

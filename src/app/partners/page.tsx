import React from "react";
import type { Metadata } from "next";
import { PartnersView } from "@/components/sections/PartnersView";

export const metadata: Metadata = {
  title: "Mitra Komersial & Sponsor Resmi",
  description:
    "Daftar mitra komersial, sponsor perangkat gaming, dan peluang kolaborasi merek bersama PT Adre Gemilang Jaya.",
};

export default function PartnersPage() {
  return <PartnersView />;
}

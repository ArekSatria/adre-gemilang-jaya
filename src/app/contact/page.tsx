import React from "react";
import type { Metadata } from "next";
import { getGlobalSettings } from "@/lib/api/client";
import { ContactView } from "@/components/sections/ContactView";

export const metadata: Metadata = {
  title: "Kontak & Kemitraan Bisnis",
  description:
    "Hubungi manajemen PT Adre Gemilang Jaya untuk proposal sponsorship, kemitraan komersial, dan undangan turnamen resmi.",
};

export default async function ContactPage() {
  const settings = await getGlobalSettings();

  return <ContactView contactEmail={settings.contactQuick.partnershipEmail} />;
}

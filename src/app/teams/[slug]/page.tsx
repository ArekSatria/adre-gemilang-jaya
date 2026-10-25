import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveDivisions, getDivisionBySlug } from "@/lib/api/client";
import { DivisionDetailView } from "@/components/sections/DivisionDetailView";

interface DivisionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const divisions = await getActiveDivisions();
  return divisions.map((div) => ({
    slug: div.slug,
  }));
}

export async function generateMetadata({
  params,
}: DivisionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);

  if (!division) {
    return {
      title: "Divisi Tidak Ditemukan",
    };
  }

  return {
    title: `Divisi ${division.name} — Roster & Prestasi`,
    description:
      division.description ||
      `Daftar pemain inti, staf pelatih, dan prestasi divisi ${division.name} PT Adre Gemilang Jaya.`,
  };
}

export default async function DivisionDetailPage({
  params,
}: DivisionPageProps) {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);

  if (!division) {
    notFound();
  }

  return <DivisionDetailView division={division} />;
}

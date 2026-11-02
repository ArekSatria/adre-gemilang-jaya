import type { Metadata } from "next";
import { AdminLayoutClient } from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin CMS | PT Adre Gemilang Jaya",
  description: "Content Management System untuk PT Adre Gemilang Jaya",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

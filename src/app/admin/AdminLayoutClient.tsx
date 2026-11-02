"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Swords,
  ShieldAlert,
  Handshake,
  Building2,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
} from "lucide-react";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Jika di halaman login, tampilkan layar penuh tanpa sidebar
  if (pathname === "/admin/login") {
    return <main className="min-h-screen bg-slate-950 text-slate-100">{children}</main>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Berita & Artikel", href: "/admin/news", icon: Newspaper },
    { label: "Pertandingan", href: "/admin/matches", icon: Swords },
    { label: "Divisi & Roster", href: "/admin/teams", icon: ShieldAlert },
    { label: "Mitra & Sponsor", href: "/admin/partners", icon: Handshake },
    { label: "Profil Perusahaan", href: "/admin/company", icon: Building2 },
    { label: "Pengaturan Global", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-red-900/40">
            AG
          </div>
          <span className="font-bold text-sm tracking-wide text-white">ADRE CMS</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar Desktop */}
      <aside
        className={`fixed md:sticky top-0 h-screen z-40 w-64 bg-slate-900/90 backdrop-blur-md border-r border-slate-800 flex flex-col transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-900/40">
              AG
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide text-white leading-tight">ADRE CMS</h2>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Neon Postgres
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-900/30 font-semibold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-800/80 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> Lihat Website Publik
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition text-left"
          >
            <LogOut size={14} /> Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

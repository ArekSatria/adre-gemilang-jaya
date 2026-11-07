"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface PublicLayoutShellProps {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function PublicLayoutShell({
  navbar,
  footer,
  children,
}: PublicLayoutShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}

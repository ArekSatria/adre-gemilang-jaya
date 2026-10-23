"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BrandLogoProps {
  logoUrl?: string | null;
  height?: number;
}

export function BrandLogo({ logoUrl, height = 46 }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const resolvedSrc = logoUrl || "/images/logo-adre.png";

  if (!imgError) {
    return (
      <Image
        src={resolvedSrc}
        alt="PT Adre Gemilang Jaya"
        width={160}
        height={height}
        className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
        style={{ height: `${height}px`, width: "auto" }}
        onError={() => setImgError(true)}
        priority
      />
    );
  }

  return (
    <span className="font-display text-xl font-bold tracking-tight text-foreground">
      ADRE ESPORTS
    </span>
  );
}

export function SocialIconSvg({
  platform,
  className = "h-4 w-4",
}: {
  platform: "instagram" | "youtube" | "tiktok" | "x";
  className?: string;
}) {
  switch (platform) {
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}

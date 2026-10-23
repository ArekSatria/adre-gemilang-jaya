import React from "react";
import Link from "next/link";
import { SmartLink } from "./SmartLink";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function SectionHeading({
  title,
  subtitle,
  actionLabel,
  actionHref,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-slate-300">{subtitle}</p>}
      </div>
      {actionLabel && actionHref && (
        <SmartLink
          href={actionHref}
          className="text-xs font-semibold text-brand hover:underline"
        >
          {actionLabel} →
        </SmartLink>
      )}
    </div>
  );
}

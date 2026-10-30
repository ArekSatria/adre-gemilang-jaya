import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground uppercase sm:text-3xl">
        {title}
      </h2>
      {subtitle && subtitle.trim().length > 0 && (
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}

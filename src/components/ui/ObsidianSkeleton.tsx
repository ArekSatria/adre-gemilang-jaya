import React from "react";
import { cn } from "@/lib/utils/cn";

interface ObsidianSkeletonProps {
  className?: string;
}

export function ObsidianSkeleton({ className }: ObsidianSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl border border-subtle bg-surface/90",
        className
      )}
      aria-hidden="true"
    />
  );
}

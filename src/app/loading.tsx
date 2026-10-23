import React from "react";
import { ObsidianSkeleton } from "@/components/ui/ObsidianSkeleton";

export default function GlobalLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <ObsidianSkeleton className="h-[360px] lg:col-span-8" />
        <div className="flex flex-col gap-6 lg:col-span-4">
          <ObsidianSkeleton className="h-[168px]" />
          <ObsidianSkeleton className="h-[168px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ObsidianSkeleton className="h-64" />
        <ObsidianSkeleton className="h-64" />
        <ObsidianSkeleton className="h-64" />
      </div>
    </div>
  );
}

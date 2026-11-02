import React from "react";
import { getHomeData } from "@/lib/api/client";
import { HomeBentoView } from "@/components/sections/HomeBentoView";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const homeData = await getHomeData();

  return <HomeBentoView data={homeData} />;
}

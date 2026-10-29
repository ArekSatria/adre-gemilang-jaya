import type { MatchItem } from "@/lib/schemas";

export type MatchStatusFilter = "ALL" | "UPCOMING" | "COMPLETED";

export function filterMatches(
  items: MatchItem[],
  statusFilter: MatchStatusFilter,
  divisionSlug: string = "ALL",
): MatchItem[] {
  return items.filter((match) => {
    const matchesStatus =
      statusFilter === "ALL" || match.status === statusFilter;
    const matchesDivision =
      divisionSlug === "ALL" || match.division.slug === divisionSlug;

    return matchesStatus && matchesDivision;
  });
}

export function formatMatchScoreDisplay(
  match: MatchItem,
  pointsUnit: string = "PTS",
): string {
  if (match.status !== "COMPLETED") {
    return "UPCOMING";
  }

  if (match.formatType === "BATTLE_ROYALE" && match.resultBattleRoyale) {
    const { placementLabel, totalPoints } = match.resultBattleRoyale;
    return `${placementLabel} (${totalPoints} ${pointsUnit})`;
  }

  return "COMPLETED";
}

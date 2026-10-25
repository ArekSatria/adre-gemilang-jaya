import type { MatchItem } from "@/lib/schemas";

export type MatchStatusFilter = "ALL" | "UPCOMING" | "COMPLETED";

export function filterMatches(
  items: MatchItem[],
  statusFilter: MatchStatusFilter,
  gameSlugFilter: string,
): MatchItem[] {
  return items.filter((match) => {
    const matchesStatus =
      statusFilter === "ALL" ? true : match.status === statusFilter;
    const matchesGame =
      gameSlugFilter === "ALL" ? true : match.division.slug === gameSlugFilter;

    return matchesStatus && matchesGame;
  });
}

export function formatMatchScoreDisplay(
  match: MatchItem,
  pointsUnit = "PTS",
): string {
  if (match.status === "UPCOMING" || !match.result) {
    return "UPCOMING";
  }

  if (match.matchFormat === "BATTLE_ROYALE") {
    const badge = match.result.placementBadge || "FINISHED";
    const pts =
      match.result.totalPoints !== null
        ? ` (${match.result.totalPoints} ${pointsUnit})`
        : "";
    return `${badge}${pts}`;
  }

  // Format VERSUS (5v5 / Head-to-Head untuk kesiapan ekspansi divisi masa depan)
  const our = match.result.ourScore ?? 0;
  const opp = match.result.opponentScore ?? 0;
  return `${our} : ${opp}`;
}

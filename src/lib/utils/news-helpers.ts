export function filterNewsByCategory<T extends { category: { slug: string } }>(
  items: T[],
  categorySlug: string,
): T[] {
  if (categorySlug === "ALL") {
    return items;
  }
  return items.filter((article) => article.category.slug === categorySlug);
}

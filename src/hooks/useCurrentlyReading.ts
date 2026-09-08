import { useMemo } from "react";
import type { BookDoc, FavoriteItem } from "../types";

interface UseCurrentlyReadingArgs {
  books: BookDoc[];
  favorites: FavoriteItem[];
  favoriteIds?: string[];
  readingIds: string[];
  limit?: number;
}

const pickUnique = (list: BookDoc[], seen: Set<string>): BookDoc[] =>
  list.filter((b) => {
    if (!b?.key || seen.has(b.key)) return false;
    seen.add(b.key);
    return true;
  });

export const useCurrentlyReading = ({
  books,
  favorites,
  favoriteIds = [],
  readingIds,
  limit = 3,
}: UseCurrentlyReadingArgs): BookDoc[] => {
  return useMemo(() => {
    const seen = new Set<string>();

    const fromJournal = pickUnique(
      books.filter((b) => readingIds.includes(b.key)),
      seen
    );
    if (fromJournal.length > 0) return fromJournal.slice(0, limit);

    seen.clear();
    const unreadIds = new Set(
      favorites.filter((f) => f.status === "unread").map((f) => f.id)
    );
    const fromFavs = pickUnique(
      books.filter((b) => unreadIds.has(b.key)),
      seen
    );
    if (fromFavs.length > 0) return fromFavs.slice(0, limit);

    if (favoriteIds.length === 0) return [];

    seen.clear();
    return pickUnique(
      books.filter((b) => favoriteIds.includes(b.key)),
      seen
    ).slice(0, limit);
  }, [books, favorites, favoriteIds, readingIds, limit]);
};

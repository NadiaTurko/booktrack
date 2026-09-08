import { useMemo } from "react";
import type { FavoriteItem, LibraryStats } from "../types";

interface UseLibraryStatsArgs {
  favorites: FavoriteItem[];
  totalBooks: number;
  booksCount: number;
}

export const useLibraryStats = ({
  favorites,
  totalBooks,
  booksCount,
}: UseLibraryStatsArgs): LibraryStats => {
  return useMemo(() => {
    const finished = favorites.filter((f) => f.status === "read").length;
    const unread = favorites.filter((f) => f.status === "unread").length;

    return {
      total: totalBooks || booksCount,
      favorites: favorites.length,
      finished,
      reading: unread,
      unread,
    };
  }, [favorites, totalBooks, booksCount]);
};

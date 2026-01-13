import { useMemo } from "react";

const uniqueByKey = (arr) => {
  const map = new Map();
  for (const b of arr) {
    const k = b?.key;
    if (!k) continue;
    if (!map.has(k)) map.set(k, b);
  }
  return Array.from(map.values());
};

const useFilteredSortedBooks = ({
  books = [],
  favorites = [],
  favoritesMeta = [],
  search = "",
  sortOrder,
  onlyFavorites = false,
  statusFilter = "all",
}) => {
  return useMemo(() => {
    if (!Array.isArray(books) || books.length === 0) return [];

    const q = search.trim().toLowerCase();
    let result = uniqueByKey(books);

    // map id -> meta
    const metaMap = new Map(
      (Array.isArray(favoritesMeta) ? favoritesMeta : []).map((f) => [f.id, f])
    );

    if (onlyFavorites) {
      if (!Array.isArray(favorites) || favorites.length === 0) return [];
      const favSet = new Set(favorites);
      result = result.filter((book) => favSet.has(book.key));

      // status filter only makes sense for favorites
      if (statusFilter !== "all") {
        result = result.filter((book) => {
          const st = metaMap.get(book.key)?.status || "unread";
          return st === statusFilter;
        });
      }
    }

    if (q) {
      result = result.filter((book) =>
        (book.title || "").toLowerCase().includes(q)
      );
    }

    // sorting
    if (sortOrder === "popular") {
      return [...result].sort(
        (a, b) => (b.ratings_count || 0) - (a.ratings_count || 0)
      );
    }

    if (sortOrder === "title_asc" || sortOrder === "title_desc") {
      return [...result].sort((a, b) => {
        const t1 = (a.title || "").toLowerCase();
        const t2 = (b.title || "").toLowerCase();
        return sortOrder === "title_asc"
          ? t1.localeCompare(t2)
          : t2.localeCompare(t1);
      });
    }

    if (sortOrder === "unread_first" || sortOrder === "read_first") {
      const targetFirst = sortOrder === "read_first" ? "read" : "unread";

      return [...result].sort((a, b) => {
        const aSt = metaMap.get(a.key)?.status || "unread";
        const bSt = metaMap.get(b.key)?.status || "unread";

        if (aSt === bSt) {
          const aAt = metaMap.get(a.key)?.addedAt || 0;
          const bAt = metaMap.get(b.key)?.addedAt || 0;
          return bAt - aAt; // newest added first inside same status
        }

        return aSt === targetFirst ? -1 : 1;
      });
    }

    return [...result];
  }, [
    books,
    favorites,
    favoritesMeta,
    search,
    sortOrder,
    onlyFavorites,
    statusFilter,
  ]);
};

export default useFilteredSortedBooks;

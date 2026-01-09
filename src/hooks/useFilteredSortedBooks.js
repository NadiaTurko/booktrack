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
  search = "",
  sortOrder,
  onlyFavorites = false,
}) => {
  return useMemo(() => {
    if (!Array.isArray(books) || books.length === 0) return [];

    const q = search.trim().toLowerCase();

    let result = uniqueByKey(books);

    if (onlyFavorites) {
      if (!Array.isArray(favorites) || favorites.length === 0) return [];
      const favSet = new Set(favorites);
      result = result.filter((book) => favSet.has(book.key));
    }

    if (q) {
      result = result.filter((book) =>
        (book.title || "").toLowerCase().includes(q)
      );
    }

    if (sortOrder === "popular") {
      return [...result].sort(
        (a, b) => (b.ratings_count || 0) - (a.ratings_count || 0)
      );
    }

    if (sortOrder === "asc" || sortOrder === "desc") {
      return [...result].sort((a, b) => {
        const t1 = (a.title || "").toLowerCase();
        const t2 = (b.title || "").toLowerCase();
        return sortOrder === "asc"
          ? t1.localeCompare(t2)
          : t2.localeCompare(t1);
      });
    }

    return [...result];
  }, [books, favorites, search, sortOrder, onlyFavorites]);
};

export default useFilteredSortedBooks;

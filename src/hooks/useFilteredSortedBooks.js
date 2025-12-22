import { useMemo } from "react";

const useFilteredSortedBooks = ({
  books,
  favorites,
  search,
  sortOrder,
  onlyFavorites = false,
}) => {
  return useMemo(() => {
    if (!books?.length) return [];

    const searchLower = search.toLowerCase();

    let result = books;

    if (onlyFavorites) {
      if (!favorites?.length) return [];
      result = result.filter((book) =>
        favorites.some((f) => f.id === book.key)
      );
    }

    result = result.filter((book) =>
      book.title?.toLowerCase().includes(searchLower)
    );

    return result.sort((a, b) => {
      if (sortOrder === "popular") {
        return (b.ratings_count || 0) - (a.ratings_count || 0);
      }

      if (onlyFavorites) {
        const aAdded = favorites.find((f) => f.id === a.key)?.added || 0;
        const bAdded = favorites.find((f) => f.id === b.key)?.added || 0;
        return sortOrder === "asc" ? aAdded - bAdded : bAdded - aAdded;
      }

      return 0;
    });
  }, [books, favorites, search, sortOrder, onlyFavorites]);
};

export default useFilteredSortedBooks;

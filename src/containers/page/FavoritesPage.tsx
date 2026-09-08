import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookFilters from "../../components/BookFilters/BookFilters";
import EmptyState from "../../components/EmptyState/EmptyState";
import BooksList from "../../components/BooksList/BooksList";
import LibraryLayout from "../../components/Layout/LibraryLayout";
import LibraryHero from "../../components/LibraryHero/LibraryHero";

import { useFavorites } from "../../context/FavoritesContext";
import { useBookJournal } from "../../context/BookJournalContext";
import { useBooks } from "../../context/BooksContext";

import useFilteredSortedBooks from "../../hooks/useFilteredSortedBooks";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { useLibraryStats } from "../../hooks/useLibraryStats";
import { useCurrentlyReading } from "../../hooks/useCurrentlyReading";
import {
  DEFAULT_FAVORITES_HERO,
  getShelfMeta,
} from "../../constants/shelves";
import type { SortOrder, ViewMode } from "../../types";

const FavoritesPage = () => {
  const { books, totalBooks } = useBooks();
  const { favorites, favoriteIds } = useFavorites();
  const { readingIds } = useBookJournal();
  const [searchParams] = useSearchParams();
  const shelf = searchParams.get("shelf");
  const shelfMeta = getShelfMeta(shelf);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("unread_first");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [view, setView] = useState<ViewMode>("cards");

  useEffect(() => {
    setStatusFilter(shelfMeta?.statusFilter || "all");
    setVisibleCount(8);
  }, [shelfMeta?.statusFilter]);

  const debouncedSearch = useDebouncedValue(search, 300);

  const favoriteBooks = useFilteredSortedBooks({
    books,
    favorites: favoriteIds,
    favoritesMeta: favorites,
    search: debouncedSearch,
    sortOrder,
    onlyFavorites: true,
    statusFilter,
  });

  const favoriteBooksLimited = favoriteBooks.slice(0, visibleCount);
  const canLoadMore = favoriteBooks.length > visibleCount;

  const stats = useLibraryStats({
    favorites,
    totalBooks,
    booksCount: books.length,
  });

  const currentlyReading = useCurrentlyReading({
    books,
    favorites,
    readingIds,
  });

  const hero = shelfMeta || DEFAULT_FAVORITES_HERO;
  const emptyTitle = shelfMeta?.emptyTitle || DEFAULT_FAVORITES_HERO.emptyTitle;
  const emptyMessage =
    shelfMeta?.emptyMessage || DEFAULT_FAVORITES_HERO.emptyMessage;

  return (
    <LibraryLayout
      search={search}
      setSearch={setSearch}
      stats={stats}
      currentlyReading={currentlyReading}
    >
      <LibraryHero title={hero.title} subtitle={hero.subtitle} stats={stats} />

      {favorites.length > 0 && (
        <BookFilters
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showStatusFilter={true}
          view={view}
          setView={setView}
          stats={stats}
        />
      )}

      {favorites.length === 0 && (
        <EmptyState title={emptyTitle} message={emptyMessage} />
      )}

      {favorites.length > 0 && favoriteBooks.length === 0 && (
        <EmptyState
          title={emptyTitle}
          message={shelf ? emptyMessage : "Try another title or clear the search."}
        />
      )}

      {favoriteBooks.length > 0 && (
        <BooksList
          items={favoriteBooksLimited}
          status="succeeded"
          hideEmpty={true}
          isLoading={false}
          onLoadMore={() => setVisibleCount((prev) => prev + 8)}
          canLoadMore={canLoadMore}
          view={view}
        />
      )}
    </LibraryLayout>
  );
};

export default FavoritesPage;

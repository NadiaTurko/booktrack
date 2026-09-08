import { useState } from "react";
import { useBooks } from "../../context/BooksContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useBookJournal } from "../../context/BookJournalContext";

import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import BooksList from "../../components/BooksList/BooksList";
import BookFilters from "../../components/BookFilters/BookFilters";
import LibraryLayout from "../../components/Layout/LibraryLayout";
import LibraryHero from "../../components/LibraryHero/LibraryHero";

import useDebouncedValue from "../../hooks/useDebouncedValue";
import useFilteredSortedBooks from "../../hooks/useFilteredSortedBooks";
import { useLibraryStats } from "../../hooks/useLibraryStats";
import { useCurrentlyReading } from "../../hooks/useCurrentlyReading";
import type { SortOrder, ViewMode } from "../../types";

const BooksPage = () => {
  const { books, totalBooks, status, loadMoreBooks } = useBooks();
  const { favorites, favoriteIds } = useFavorites();
  const { readingIds } = useBookJournal();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("title_asc");
  const [view, setView] = useState<ViewMode>("cards");

  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredBooks = useFilteredSortedBooks({
    books,
    favorites: [],
    search: debouncedSearch,
    sortOrder,
    onlyFavorites: false,
  });

  const stats = useLibraryStats({
    favorites,
    totalBooks,
    booksCount: books.length,
  });

  const currentlyReading = useCurrentlyReading({
    books,
    favorites,
    favoriteIds,
    readingIds,
  });

  const showMoreDisabled = status === "loading" || books.length >= totalBooks;

  return (
    <LibraryLayout
      search={search}
      setSearch={setSearch}
      stats={stats}
      currentlyReading={currentlyReading}
    >
      <LibraryHero stats={stats} />

      <BookFilters
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        view={view}
        setView={setView}
        stats={stats}
      />

      <BooksList
        items={filteredBooks}
        status={status}
        error={null}
        isLoading={status === "loading"}
        view={view}
      />

      {status === "succeeded" && filteredBooks.length > 0 && (
        <div className="mt-6 flex justify-center">
          <ShowMoreButton
            onClick={loadMoreBooks}
            disabled={showMoreDisabled}
          />
        </div>
      )}
    </LibraryLayout>
  );
};

export default BooksPage;

import React, { useState } from "react";

import Header from "../../components/Header/Header";
import BookCard from "../../components/BookCard/BookCard";
import BookFilters from "../../components/BookFilters/BookFilters";
import EmptyState from "../../components/EmptyState/EmptyState";
import BooksList from "../../components/BooksList/BooksList";

import { useFavorites } from "../../context/FavoritesContext";
import { useBooks } from "../../context/BooksContext";

import useFilteredSortedBooks from "../../hooks/useFilteredSortedBooks";
import useDebouncedValue from "../../hooks/useDebouncedValue";

const FavoritesPage = ({ onLogout }) => {
  const { books } = useBooks();
  const { favorites } = useFavorites();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleCount, setVisibleCount] = useState(8);

  const debouncedSearch = useDebouncedValue(search, 300);

  const favoriteBooks = useFilteredSortedBooks({
    books,
    favorites,
    search: debouncedSearch,
    sortOrder,
    onlyFavorites: true,
  });

  const favoriteBooksLimited = favoriteBooks.slice(0, visibleCount);
  const canLoadMore = favoriteBooks.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <>
      <Header onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8">
        {favorites.length > 0 && (
          <BookFilters
            search={search}
            setSearch={setSearch}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        )}

        {favorites.length === 0 && (
          <EmptyState
            icon="📚"
            title="No favorite books yet"
            message="Add books to favorites to see them here."
          />
        )}

        {favorites.length > 0 && favoriteBooks.length === 0 && (
          <EmptyState
            icon="🔍"
            title="No books found"
            message="Try another title or clear the search."
          />
        )}

        {favoriteBooks.length > 0 && (
          <BooksList
            items={favoriteBooksLimited}
            status="succeeded" // фіксований, бо ми не робимо fetch
            error={null}
            hideEmpty={true}
            isLoading={false}
            onLoadMore={handleLoadMore}
            canLoadMore={canLoadMore}
          />
        )}
      </main>
    </>
  );
};

export default FavoritesPage;

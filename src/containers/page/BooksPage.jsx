import React, { useState } from "react";
import { useBooks } from "../../context/BooksContext";
import { useAuth } from "../../hooks/useAuth";

import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import BooksList from "../../components/BooksList/BooksList";
import Header from "../../components/Header/Header";
import BookFilters from "../../components/BookFilters/BookFilters";

import useDebouncedValue from "../../hooks/useDebouncedValue";
import useFilteredSortedBooks from "../../hooks/useFilteredSortedBooks";

const BooksPage = () => {
  const { books, totalBooks, status, loadMoreBooks } = useBooks();
  const { logout } = useAuth();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredBooks = useFilteredSortedBooks({
    books,
    favorites: [],
    search: debouncedSearch,
    sortOrder,
    onlyFavorites: false,
  });

  const showMoreDisabled = status === "loading" || books.length >= totalBooks;

  return (
    <>
      <Header onLogout={logout} />

      <main className="container mx-auto px-4 py-8">
        <BookFilters
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <BooksList
          items={filteredBooks}
          status={status}
          error={null}
          isLoading={status === "loading"}
        />

        {status === "succeeded" && filteredBooks.length > 0 && (
          <div className="flex justify-center mt-6">
            <ShowMoreButton
              onClick={loadMoreBooks}
              disabled={showMoreDisabled}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default BooksPage;

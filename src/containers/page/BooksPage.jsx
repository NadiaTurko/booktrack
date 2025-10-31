import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../features/books/booksSlice";

import ShowBooksButton from "../../components/Buttons/ShowBooksButton";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import BooksList from "../../components/BooksList/BooksList";
import TitleBooksPage from "../../components/Title/TitleBooksPage";

const ITEMS_PER_PAGE = 6;

const BooksPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems, status } = useSelector((state) => state.books);

  const [page, setPage] = useState(1);
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    if (!initialLoaded && items.length >= ITEMS_PER_PAGE) {
      setInitialLoaded(true);
    }
  }, [items, initialLoaded]);

  const handleShowBooks = () => {
    if (!initialLoaded) {
      dispatch(fetchBooks(1));
      setPage(1);
    }
  };

  const handleShowMore = () => {
    if (status !== "loading") {
      const nextPage = page + 1;
      dispatch(fetchBooks(nextPage));
      setPage(nextPage);
    }
  };

  const showMoreDisabled = status === "loading" || items.length >= totalItems;

  return (
    <div className="flex flex-col items-center space-y-6">
      <TitleBooksPage text="Hello BookTrack" />

      <ShowBooksButton onClick={handleShowBooks} disabled={initialLoaded} />
      <BooksList />

      {initialLoaded && (
        <ShowMoreButton onClick={handleShowMore} disabled={showMoreDisabled} />
      )}
    </div>
  );
};

export default BooksPage;

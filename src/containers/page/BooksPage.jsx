import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../features/books/booksSlice";

import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import BooksList from "../../components/BooksList/BooksList";
import TitleBooksPage from "../../components/Title/TitleBooksPage";

const BooksPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems, status } = useSelector((state) => state.books);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchBooks(1));
    }
  }, [dispatch, items.length]);

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
      <BooksList />
      <ShowMoreButton onClick={handleShowMore} disabled={showMoreDisabled} />
    </div>
  );
};

export default BooksPage;

import { useBooks } from "../../context/BooksContext";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import BooksList from "../../components/BooksList/BooksList";

const BooksPage = () => {
  const { books, totalBooks, status, loadMoreBooks } = useBooks();

  const showMoreDisabled = status === "loading" || books.length >= totalBooks;

  return (
    <div className="flex flex-col items-center space-y-6">
      <BooksList items={books} status={status} />
      <ShowMoreButton onClick={loadMoreBooks} disabled={showMoreDisabled} />
    </div>
  );
};

export default BooksPage;

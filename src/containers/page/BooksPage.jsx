import { useBooks } from "../../context/BooksContext";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import BooksList from "../../components/BooksList/BooksList";
import TitleBooksPage from "../../components/Title/TitleBooksPage";

const BooksPage = () => {
  const { books, totalBooks, status, loadMoreBooks } = useBooks();

  const showMoreDisabled = status === "loading" || books.length >= totalBooks;

  return (
    <div className="flex flex-col items-center space-y-6">
      <TitleBooksPage text="Hello BookTrack" />
      <BooksList items={books} status={status} />
      <ShowMoreButton onClick={loadMoreBooks} disabled={showMoreDisabled} />
    </div>
  );
};

export default BooksPage;

import { useBooks } from "../../context/BooksContext";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import BooksList from "../../components/BooksList/BooksList";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/useAuth";

const BooksPage = () => {
  const { books, totalBooks, status, loadMoreBooks } = useBooks();
  const { logout } = useAuth();

  const showMoreDisabled = status === "loading" || books.length >= totalBooks;

  return (
    <>
      <Header onLogout={logout} />
      <div className="flex flex-col items-center space-y-6 mt-6">
        <BooksList items={books} status={status} />

        {status === "succeeded" && books.length > 0 && (
          <ShowMoreButton onClick={loadMoreBooks} disabled={showMoreDisabled} />
        )}

        {status === "loading" && (
          <p className="text-emerald-700 font-medium mt-4 animate-pulse">
            ⏳ Loading...
          </p>
        )}
      </div>
    </>
  );
};

export default BooksPage;

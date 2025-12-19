// src/pages/FavoritesPage.jsx
import React from "react";
import Header from "../../components/Header/Header";
import BookCard from "../../components/BookCard/BookCard";
import { useFavorites } from "../../context/FavoritesContext";
import { useBooks } from "../../context/BooksContext";

const FavoritesPage = ({ onLogout }) => {
  const { books } = useBooks();
  const { favorites } = useFavorites();

  const favoriteBooks = books.filter((book) => favorites.includes(book.key));

  return (
    <>
      <Header onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8">
        {favoriteBooks.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">No favorite books yet 📚</p>
            <p>Add books to favorites to see them here.</p>
          </div>
        ) : (
          <ul
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              justify-items-center
            "
          >
            {favoriteBooks.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default FavoritesPage;

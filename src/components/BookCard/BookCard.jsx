import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import ReadMoreButton from "../Buttons/ReadMoreButton";
import FavoriteButton from "../Buttons/FavoriteButton";

const BookCard = ({ book }) => {
  const bookId = book.key;
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(bookId);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://cdn-icons-png.flaticon.com/512/29/29302.png";

  return (
    <li
      className="
        relative bg-gradient-to-br from-white to-emerald-50
        border border-emerald-200 rounded-3xl shadow-md 
        overflow-hidden transform hover:-translate-y-1 
        hover:shadow-xl transition-all duration-300
        w-72 sm:w-64 md:w-60 flex flex-col
      "
    >
      <div className="h-56 w-full overflow-hidden rounded-t-3xl">
        <img
          src={coverUrl}
          alt={book.title || "Book cover"}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-extrabold text-lg text-emerald-800 mb-2 line-clamp-2">
            {book.title || "Untitled"}
          </h3>

          {book.author_name && (
            <p className="text-gray-700 text-sm mb-1">
              <span className="font-medium text-emerald-700">Author:</span>{" "}
              {book.author_name.join(", ")}
            </p>
          )}

          {book.first_publish_year && (
            <p className="text-gray-500 text-sm">
              <span className="font-medium text-emerald-600">Year:</span>{" "}
              {book.first_publish_year}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <ReadMoreButton />
          <FavoriteButton
            favorite={isFavorite}
            onClick={() => toggleFavorite(bookId)}
          />
        </div>
      </div>
    </li>
  );
};

export default BookCard;

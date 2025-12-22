import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import ReadMoreButton from "../Buttons/ReadMoreButton";
import FavoriteButton from "../Buttons/FavoriteButton";

const BookCard = ({ book }) => {
  const bookId = book.key;
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://cdn-icons-png.flaticon.com/512/29/29302.png";

  const handleReadMore = () => {
    navigate(`/books${book.key}`);
  };

  return (
    <li
      className="
        relative bg-white border border-emerald-200 rounded-2xl shadow-sm
        hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
        w-75 flex flex-col overflow-hidden m-2
      "
    >
      <div className="h-64 w-full overflow-hidden">
        <img
          src={coverUrl}
          alt={book.title || "Book cover"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-emerald-800 line-clamp-2">
            {book.title || "Untitled"}
          </h3>

          {book.author_name && (
            <p className="text-gray-700 text-sm">
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

        <div className="flex items-center justify-between">
          <ReadMoreButton onClick={handleReadMore} />
          <FavoriteButton
            favorite={isFavorite(book.key)}
            onClick={() => toggleFavorite(book.key)}
          />
        </div>
      </div>
    </li>
  );
};

export default BookCard;

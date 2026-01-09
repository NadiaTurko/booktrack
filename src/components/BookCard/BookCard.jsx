import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

import ReadMoreButton from "../Buttons/ReadMoreButton";
import FavoriteButton from "../Buttons/FavoriteButton";

const BookCard = ({ book }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600";

  const handleOpen = () => {
    navigate(`/books${book.key}`);
  };

  return (
    <li
      className="
        group relative
        w-full h-[420px]
        rounded-2xl
        p-[1.5px]
        bg-gradient-to-b
        from-emerald-200
        via-emerald-300
        to-emerald-400
        transition-all duration-300
        hover:shadow-2xl
      "
    >
      {/* Inner card */}
      <div
        className="
          h-full w-full
          bg-white
          rounded-[14px]
          overflow-hidden
          transition-all duration-300
          group-hover:-translate-y-1
        "
      >
        {/* ✅ Cover wrapper (same size for all books) */}
        <div
          className="
            h-[260px]
            w-full
            flex items-center justify-center
            bg-emerald-50
            px-6
          "
        >
          <img
            src={coverUrl}
            alt={book.title}
            className="
              h-[200px]
              w-auto
              max-w-full
              object-contain
              drop-shadow-sm
            "
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-[160px]">
          <h3 className="font-bold text-lg line-clamp-2 mb-1 text-gray-900">
            {book.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-1">
            {book.author_name?.join(", ")}
          </p>

          <div className="mt-auto flex items-center justify-between pt-3 gap-5">
            <ReadMoreButton onClick={handleOpen} />

            <FavoriteButton
              favorite={isFavorite(book.key)}
              onClick={() => toggleFavorite(book.key)}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default BookCard;

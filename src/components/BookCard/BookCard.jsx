import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

import ReadMoreButton from "../Buttons/ReadMoreButton";
import FavoriteButton from "../Buttons/FavoriteButton";
import ReadStatusToggle from "../Buttons/ReadStatusToggle";

const BookCard = ({ book, showReadStatus = false }) => {
  const { isFavorite, getFavorite, setFavoriteStatus, toggleFavorite } =
    useFavorites();
  const fav = getFavorite(book.key);
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

        <div className="p-3 flex flex-col h-[160px]">
          <h3
            className="text-[17px] sm:text-[18px]
      font-extrabold
      leading-tight
      tracking-tight
      text-slate-900
      line-clamp-2"
          >
            {book.title}
          </h3>

          <p
            className=" mt-1
      text-[13px] sm:text-sm
      font-medium
      text-slate-500
      leading-snug
      line-clamp-1"
          >
            {book.author_name?.join(", ")}
          </p>

          {showReadStatus && isFavorite(book.key) && (
            <ReadStatusToggle
              value={fav?.status || "unread"}
              onToggle={() =>
                setFavoriteStatus(
                  book.key,
                  fav?.status === "read" ? "unread" : "read"
                )
              }
              className="mt-2 w-fit"
            />
          )}

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

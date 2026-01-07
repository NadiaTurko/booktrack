import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
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
    <li className="group relative w-full h-[420px] bg-white border border-border/40 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Cover */}
      <div className="h-[260px] w-full bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={coverUrl}
          alt={book.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[160px]">
        <h3 className="font-bold text-lg line-clamp-2 mb-1">{book.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-1">
          {book.author_name?.join(", ")}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <ReadMoreButton onClick={handleOpen} />

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

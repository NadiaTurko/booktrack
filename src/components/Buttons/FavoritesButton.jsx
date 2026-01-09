import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

const FavoritesButton = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;
  const isActive = location.pathname === "/favorites";

  return (
    <button
      onClick={() => navigate("/favorites")}
      title="Favorites"
      className={`
        relative
        px-3 py-1.5
        rounded-xl
        backdrop-blur-md
        transition-transform duration-300
        hover:scale-105
        active:scale-95
        ${isActive ? "bg-emerald-200/70 shadow-inner" : "bg-white/60"}
      `}
    >
      {/* Heart */}
      <span
        className="
          inline-block
          text-transparent
          bg-clip-text
          bg-linear-to-br
          from-emerald-400
          via-emerald-500
          to-emerald-600
          drop-shadow-sm
          transition-all duration-300
        "
      >
        ❤️
      </span>

      {/* Counter */}
      {favoritesCount > 0 && (
        <span
          className="
            absolute -top-1.5 -right-1.5
            min-w-[18px] h-[18px]
            px-1
            flex items-center justify-center
            rounded-full
            text-[11px] font-bold
            text-white
            bg-gradient-to-b
            from-emerald-400
            to-emerald-600
            shadow-md
          "
        >
          {favoritesCount}
        </span>
      )}
    </button>
  );
};

export default FavoritesButton;

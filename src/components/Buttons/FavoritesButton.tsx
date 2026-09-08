import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

const FavoritesButton = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;
  const isActive = location.pathname === "/favorites";

  return (
    <button
      type="button"
      onClick={() => navigate("/favorites")}
      title="Favorites"
      className={`
        group relative inline-flex h-9 items-center gap-1.5 overflow-hidden
        rounded-full px-2.5 text-sm font-semibold
        transition-all duration-300 active:scale-[0.97]
        sm:gap-2 sm:px-3.5
        ${
          isActive
            ? "bg-burgundy text-white shadow-[0_6px_16px_rgba(139,58,58,0.28)]"
            : "bg-rose-soft text-burgundy shadow-sm hover:bg-burgundy hover:text-white"
        }
      `}
    >
      <Heart
        className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
          isActive
            ? "fill-white text-white"
            : "fill-burgundy text-burgundy group-hover:fill-white group-hover:text-white"
        }`}
      />

      <span className="hidden sm:inline">Favorites</span>

      {favoritesCount > 0 && (
        <span
          className={`
            inline-flex min-w-[1.25rem] items-center justify-center
            rounded-full px-1 py-0.5 text-[10px] font-bold tabular-nums
            sm:min-w-[1.35rem] sm:text-[11px]
            ${
              isActive
                ? "bg-white text-burgundy"
                : "bg-burgundy text-white group-hover:bg-white group-hover:text-burgundy"
            }
          `}
        >
          {favoritesCount}
        </span>
      )}
    </button>
  );
};

export default FavoritesButton;

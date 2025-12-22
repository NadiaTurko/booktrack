import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

const FavoritesButton = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;

  return (
    <button
      onClick={() => navigate("/favorites")}
      title="Favorites"
      className="relative bg-white text-emerald-700 px-4 py-1 rounded-lg font-medium hover:bg-emerald-100 transition-colors duration-300"
    >
      ❤️
      {favoritesCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full text-xs font-bold px-1.5 py-0.5 shadow">
          {favoritesCount}
        </span>
      )}
    </button>
  );
};

export default FavoritesButton;

import { createContext, useContext, useState, useEffect } from "react";
import {
  getFavorites,
  toggleFavorite as toggleFavInStorage,
} from "../utils/favorite";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (bookId) => {
    const updated = toggleFavInStorage(bookId);
    setFavorites(updated);
  };

  const isFavorite = (bookId) => favorites.some((fav) => fav.id === bookId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getFavorites,
  toggleFavorite as toggleFavInStorage,
} from "../utils/favorite";

const FavoritesContext = createContext(null);

const normalizeFavorites = (raw) => {
  if (!Array.isArray(raw)) return [];
  const ids = raw
    .map((fav) => (typeof fav === "string" ? fav : fav?.id))
    .filter(Boolean);

  return Array.from(new Set(ids));
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() =>
    normalizeFavorites(getFavorites())
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.storageArea !== localStorage) return;
      if (e.key !== "favorites") return;

      setFavorites(normalizeFavorites(getFavorites()));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleFavorite = (bookId) => {
    const updated = toggleFavInStorage(bookId);
    setFavorites(normalizeFavorites(updated));
  };

  const isFavorite = (bookId) => favorites.includes(bookId);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
};

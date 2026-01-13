import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import {
  getFavorites,
  toggleFavorite as toggleFavInStorage,
  setFavoriteStatus as setStatusInStorage,
} from "../utils/favorite";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const user = useAuthUser();
  const uid = user?.uid;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites(uid));
  }, [uid]);

  useEffect(() => {
    const storageKey = `favorites:${uid || "guest"}`;

    const sync = () => setFavorites(getFavorites(uid));

    const onStorage = (e) => {
      if (e.storageArea !== localStorage) return;
      if (e.key !== storageKey) return;
      sync();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("favorites:changed", sync);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favorites:changed", sync);
    };
  }, [uid]);

  const toggleFavorite = (bookId) => {
    const updated = toggleFavInStorage(uid, bookId);
    setFavorites(updated);
  };

  const setFavoriteStatus = (bookId, status) => {
    const updated = setStatusInStorage(uid, bookId, status);
    setFavorites(updated);
  };

  const isFavorite = (bookId) => favorites.some((f) => f.id === bookId);

  const getFavorite = (bookId) =>
    favorites.find((f) => f.id === bookId) || null;

  const favoriteIds = useMemo(() => favorites.map((f) => f.id), [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      favoriteIds,
      toggleFavorite,
      setFavoriteStatus,
      isFavorite,
      getFavorite,
    }),
    [favorites, favoriteIds]
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

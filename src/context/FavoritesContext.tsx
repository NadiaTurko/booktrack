import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { localStorageFavoritesRepository } from "../repositories/localStorageFavoritesRepository";
import type { IFavoritesRepository } from "../domain/favoritesRepository";
import type { FavoriteItem, ShelfStatus } from "../types";

const favoritesRepo: IFavoritesRepository = localStorageFavoritesRepository;

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  favoriteIds: string[];
  toggleFavorite: (bookId: string) => void;
  setFavoriteStatus: (bookId: string, status: ShelfStatus | string) => void;
  isFavorite: (bookId: string) => boolean;
  getFavorite: (bookId: string) => FavoriteItem | null;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const user = useAuthUser();
  const uid = user?.uid;

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(favoritesRepo.getAll(uid));
  }, [uid]);

  useEffect(() => {
    return favoritesRepo.subscribe(uid, () => {
      setFavorites(favoritesRepo.getAll(uid));
    });
  }, [uid]);

  const toggleFavorite = (bookId: string) => {
    setFavorites(favoritesRepo.toggle(uid, bookId));
  };

  const setFavoriteStatus = (bookId: string, status: ShelfStatus | string) => {
    setFavorites(favoritesRepo.setStatus(uid, bookId, status));
  };

  const isFavorite = (bookId: string) => favorites.some((f) => f.id === bookId);

  const getFavorite = (bookId: string) =>
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

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
};

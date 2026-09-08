import type { FavoriteItem, ShelfStatus } from "../types";
import { localStorageFavoritesRepository } from "../repositories/localStorageFavoritesRepository";

/** Thin wrappers — prefer IFavoritesRepository via context. */
export const getFavorites = (uid?: string | null): FavoriteItem[] =>
  localStorageFavoritesRepository.getAll(uid);

export const toggleFavorite = (
  uid: string | null | undefined,
  bookId: string
): FavoriteItem[] => localStorageFavoritesRepository.toggle(uid, bookId);

export const setFavoriteStatus = (
  uid: string | null | undefined,
  bookId: string,
  status: ShelfStatus | string
): FavoriteItem[] =>
  localStorageFavoritesRepository.setStatus(uid, bookId, status);

import type { FavoriteItem, ShelfStatus } from "../types";

export interface IFavoritesRepository {
  getAll(uid: string | null | undefined): FavoriteItem[];
  toggle(uid: string | null | undefined, bookId: string): FavoriteItem[];
  setStatus(
    uid: string | null | undefined,
    bookId: string,
    status: ShelfStatus | string
  ): FavoriteItem[];
  subscribe(uid: string | null | undefined, onChange: () => void): () => void;
}

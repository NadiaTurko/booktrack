import type { FavoriteItem, ShelfStatus } from "../types";
import type { IFavoritesRepository } from "../domain/favoritesRepository";

const EVENT = "favorites:changed";

const keyFor = (uid?: string | null): string => `favorites:${uid || "guest"}`;

const notify = (): void => {
  window.dispatchEvent(new Event(EVENT));
};

const normalizeStatus = (status: string): ShelfStatus =>
  status === "read" ? "read" : "unread";

const saveFavorites = (
  uid: string | null | undefined,
  favorites: FavoriteItem[]
): void => {
  localStorage.setItem(keyFor(uid), JSON.stringify(favorites));
  notify();
};

export const localStorageFavoritesRepository: IFavoritesRepository = {
  getAll(uid) {
    try {
      const raw = JSON.parse(localStorage.getItem(keyFor(uid)) || "null");
      return Array.isArray(raw) ? (raw as FavoriteItem[]) : [];
    } catch {
      return [];
    }
  },

  toggle(uid, bookId) {
    const current = this.getAll(uid);
    const exists = current.some((f) => f?.id === bookId);

    let updated: FavoriteItem[];
    if (exists) {
      updated = current.filter((f) => f.id !== bookId);
    } else {
      updated = [
        ...current,
        { id: bookId, status: "unread", addedAt: Date.now() },
      ];
    }

    const normalized = Array.from(new Map(updated.map((f) => [f.id, f])).values());
    saveFavorites(uid, normalized);
    return normalized;
  },

  setStatus(uid, bookId, status) {
    const current = this.getAll(uid);
    const normalizedStatus = normalizeStatus(status);
    const exists = current.some((f) => f.id === bookId);

    const updated = exists
      ? current.map((f) =>
          f.id === bookId ? { ...f, status: normalizedStatus } : f
        )
      : [
          ...current,
          { id: bookId, status: normalizedStatus, addedAt: Date.now() },
        ];

    saveFavorites(uid, updated);
    return updated;
  },

  subscribe(uid, onChange) {
    const storageKey = keyFor(uid);

    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== localStorage) return;
      if (e.key !== storageKey) return;
      onChange();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT, onChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT, onChange);
    };
  },
};

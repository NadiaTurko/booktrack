import type { BookJournalEntry, BookJournalMap, BookQuote } from "../types";
import type { IBookJournalRepository } from "../domain/journalRepository";

const EVENT = "bookJournal:changed";

const keyFor = (uid?: string | null): string => `bookJournal:${uid || "guest"}`;

const notify = (): void => {
  window.dispatchEvent(new Event(EVENT));
};

const emptyEntry = (bookId: string): BookJournalEntry => ({
  id: bookId,
  comment: "",
  quotes: [],
  readingPlace: "",
  isReading: false,
  startedAt: null,
  updatedAt: Date.now(),
});

const saveMap = (uid: string | null | undefined, map: BookJournalMap): void => {
  localStorage.setItem(keyFor(uid), JSON.stringify(map));
  notify();
};

export const localStorageJournalRepository: IBookJournalRepository = {
  getMap(uid) {
    try {
      const raw = JSON.parse(localStorage.getItem(keyFor(uid)) || "null");
      return raw && typeof raw === "object" && !Array.isArray(raw)
        ? (raw as BookJournalMap)
        : {};
    } catch {
      return {};
    }
  },

  getEntry(uid, bookId) {
    if (!bookId) return null;
    const map = this.getMap(uid);
    return map[bookId] ? { ...emptyEntry(bookId), ...map[bookId] } : null;
  },

  upsert(uid, bookId, patch) {
    if (!bookId) return null;

    const map = this.getMap(uid);
    const current = map[bookId]
      ? { ...emptyEntry(bookId), ...map[bookId] }
      : emptyEntry(bookId);

    const next: BookJournalEntry = {
      ...current,
      ...patch,
      id: bookId,
      updatedAt: Date.now(),
    };

    const hasContent =
      Boolean(next.comment?.trim()) ||
      (Array.isArray(next.quotes) && next.quotes.length > 0) ||
      Boolean(next.readingPlace?.trim()) ||
      next.isReading;

    if (!hasContent) {
      delete map[bookId];
    } else {
      map[bookId] = next;
    }

    saveMap(uid, map);
    return hasContent ? next : null;
  },

  addQuote(uid, bookId, { text, page = "" }) {
    const trimmed = text?.trim();
    if (!trimmed) return this.getEntry(uid, bookId);

    const current = this.getEntry(uid, bookId) || emptyEntry(bookId);
    const quote: BookQuote = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: trimmed,
      page: String(page || "").trim(),
      createdAt: Date.now(),
    };

    return this.upsert(uid, bookId, {
      ...current,
      quotes: [quote, ...(current.quotes || [])],
    });
  },

  removeQuote(uid, bookId, quoteId) {
    const current = this.getEntry(uid, bookId);
    if (!current) return null;

    return this.upsert(uid, bookId, {
      ...current,
      quotes: (current.quotes || []).filter((q) => q.id !== quoteId),
    });
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

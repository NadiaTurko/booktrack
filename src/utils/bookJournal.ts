import type { BookJournalEntry, BookJournalMap } from "../types";
import { localStorageJournalRepository } from "../repositories/localStorageJournalRepository";

/** Thin wrappers — prefer IBookJournalRepository via context. */
export const getJournalMap = (uid?: string | null): BookJournalMap =>
  localStorageJournalRepository.getMap(uid);

export const getJournalEntries = (uid?: string | null): BookJournalEntry[] =>
  Object.values(getJournalMap(uid));

export const getBookJournal = (
  uid: string | null | undefined,
  bookId: string | null | undefined
): BookJournalEntry | null =>
  localStorageJournalRepository.getEntry(uid, bookId);

export const upsertBookJournal = (
  uid: string | null | undefined,
  bookId: string | null | undefined,
  patch: Partial<BookJournalEntry>
): BookJournalEntry | null =>
  localStorageJournalRepository.upsert(uid, bookId, patch);

export const addQuote = (
  uid: string | null | undefined,
  bookId: string,
  payload: { text: string; page?: string }
): BookJournalEntry | null =>
  localStorageJournalRepository.addQuote(uid, bookId, payload);

export const removeQuote = (
  uid: string | null | undefined,
  bookId: string,
  quoteId: string
): BookJournalEntry | null =>
  localStorageJournalRepository.removeQuote(uid, bookId, quoteId);

export const getReadingBooks = (uid?: string | null): BookJournalEntry[] =>
  getJournalEntries(uid).filter((e) => e.isReading);

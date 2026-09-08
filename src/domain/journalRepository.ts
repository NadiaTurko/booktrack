import type { BookJournalEntry, BookJournalMap } from "../types";

export interface IBookJournalRepository {
  getMap(uid: string | null | undefined): BookJournalMap;
  getEntry(
    uid: string | null | undefined,
    bookId: string | null | undefined
  ): BookJournalEntry | null;
  upsert(
    uid: string | null | undefined,
    bookId: string | null | undefined,
    patch: Partial<BookJournalEntry>
  ): BookJournalEntry | null;
  addQuote(
    uid: string | null | undefined,
    bookId: string,
    payload: { text: string; page?: string }
  ): BookJournalEntry | null;
  removeQuote(
    uid: string | null | undefined,
    bookId: string,
    quoteId: string
  ): BookJournalEntry | null;
  subscribe(uid: string | null | undefined, onChange: () => void): () => void;
}

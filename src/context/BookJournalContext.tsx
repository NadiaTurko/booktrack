import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { localStorageJournalRepository } from "../repositories/localStorageJournalRepository";
import type { IBookJournalRepository } from "../domain/journalRepository";
import type { BookJournalEntry, BookJournalMap } from "../types";

const journalRepo: IBookJournalRepository = localStorageJournalRepository;

interface BookJournalContextValue {
  journalMap: BookJournalMap;
  readingIds: string[];
  getEntry: (bookId: string) => BookJournalEntry | null;
  saveEntry: (
    bookId: string,
    patch: Partial<BookJournalEntry>
  ) => BookJournalEntry | null;
  addQuote: (
    bookId: string,
    payload: { text: string; page?: string }
  ) => BookJournalEntry | null;
  removeQuote: (bookId: string, quoteId: string) => BookJournalEntry | null;
}

const BookJournalContext = createContext<BookJournalContextValue | null>(null);

interface BookJournalProviderProps {
  children: ReactNode;
}

export const BookJournalProvider = ({ children }: BookJournalProviderProps) => {
  const user = useAuthUser();
  const uid = user?.uid;

  const [journalMap, setJournalMap] = useState<BookJournalMap>({});

  const refresh = () => setJournalMap(journalRepo.getMap(uid));

  useEffect(() => {
    refresh();
  }, [uid]);

  useEffect(() => {
    return journalRepo.subscribe(uid, refresh);
  }, [uid]);

  const getEntry = (bookId: string): BookJournalEntry | null => {
    if (!bookId) return null;
    return journalMap[bookId] || journalRepo.getEntry(uid, bookId);
  };

  const saveEntry = (
    bookId: string,
    patch: Partial<BookJournalEntry>
  ): BookJournalEntry | null => {
    const updated = journalRepo.upsert(uid, bookId, {
      ...(journalMap[bookId] || {}),
      ...patch,
    });
    refresh();
    return updated;
  };

  const addQuote = (
    bookId: string,
    payload: { text: string; page?: string }
  ): BookJournalEntry | null => {
    const updated = journalRepo.addQuote(uid, bookId, payload);
    refresh();
    return updated;
  };

  const removeQuote = (
    bookId: string,
    quoteId: string
  ): BookJournalEntry | null => {
    const updated = journalRepo.removeQuote(uid, bookId, quoteId);
    refresh();
    return updated;
  };

  const readingIds = useMemo(
    () =>
      Object.values(journalMap)
        .filter((e) => e.isReading)
        .map((e) => e.id),
    [journalMap]
  );

  const value = useMemo(
    () => ({
      journalMap,
      readingIds,
      getEntry,
      saveEntry,
      addQuote,
      removeQuote,
    }),
    [journalMap, readingIds]
  );

  return (
    <BookJournalContext.Provider value={value}>
      {children}
    </BookJournalContext.Provider>
  );
};

export const useBookJournal = (): BookJournalContextValue => {
  const ctx = useContext(BookJournalContext);
  if (!ctx) {
    throw new Error("useBookJournal must be used within a BookJournalProvider");
  }
  return ctx;
};

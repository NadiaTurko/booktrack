import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BASE_API_URL, ITEMS_PER_PAGE } from "../constants/api";
import type { BookDoc } from "../types";

type BooksStatus = "idle" | "loading" | "succeeded" | "failed";

interface BooksContextValue {
  books: BookDoc[];
  totalBooks: number;
  status: BooksStatus;
  loadMoreBooks: () => void;
}

const BooksContext = createContext<BooksContextValue | null>(null);

const mergeUniqueBooks = (prev: BookDoc[], next: BookDoc[]): BookDoc[] => {
  const map = new Map<string, BookDoc>();
  for (const book of [...prev, ...next]) {
    if (!book?.key) continue;
    if (!map.has(book.key)) map.set(book.key, book);
  }
  return Array.from(map.values());
};

interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<BookDoc[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [status, setStatus] = useState<BooksStatus>("idle");
  const [page, setPage] = useState(1);

  const fetchBooks = async (pageNum = 1) => {
    setStatus("loading");
    const offset = (pageNum - 1) * ITEMS_PER_PAGE;
    try {
      const res = await fetch(
        `${BASE_API_URL}&limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );
      const data = await res.json();
      const docs: BookDoc[] = Array.isArray(data.docs) ? data.docs : [];
      setBooks((prev) =>
        pageNum === 1 ? mergeUniqueBooks([], docs) : mergeUniqueBooks(prev, docs)
      );
      setTotalBooks(data.numFound);
      setStatus("succeeded");
    } catch {
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchBooks(1);
  }, []);

  const loadMoreBooks = () => {
    const nextPage = page + 1;
    fetchBooks(nextPage);
    setPage(nextPage);
  };

  return (
    <BooksContext.Provider value={{ books, totalBooks, status, loadMoreBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = (): BooksContextValue => {
  const ctx = useContext(BooksContext);
  if (!ctx) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return ctx;
};

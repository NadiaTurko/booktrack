import { useEffect, useMemo, useRef, useState } from "react";
import { useBooks } from "../context/BooksContext";
import type { BookDoc } from "../types";

interface OpenLibraryAuthorRef {
  author?: { key?: string };
}

interface OpenLibraryWork {
  title?: string;
  covers?: number[];
  description?: string | { value?: string };
  languages?: { key: string }[];
  first_publish_date?: string;
  authors?: OpenLibraryAuthorRef[];
  [key: string]: unknown;
}

export interface UseBookDetailsReturn {
  book: OpenLibraryWork | null;
  listBook: BookDoc | null;
  title: string;
  coverId: number | null;
  authorNames: string[];
  descriptionText: string;
  languages: string[];
  firstPublishDate: string | null;
  loading: boolean;
  error: string | null;
}

export const useBookDetails = (bookPath: string | undefined): UseBookDetailsReturn => {
  const { books } = useBooks();

  const listBook = useMemo(() => {
    if (!bookPath) return null;
    const normalized = bookPath.startsWith("/") ? bookPath : `/${bookPath}`;
    return books?.find((b) => b.key === normalized) || null;
  }, [books, bookPath]);

  const [book, setBook] = useState<OpenLibraryWork | null>(null);
  const [authorNames, setAuthorNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authorCache = useRef(new Map<string, string>());

  useEffect(() => {
    if (!bookPath) return;

    const ctrl = new AbortController();

    const fetchDetails = async () => {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(`https://openlibrary.org/${bookPath}.json`, {
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data: OpenLibraryWork = await res.json();
        setBook(data);

        if (Array.isArray(data.authors) && data.authors.length > 0) {
          const names = await Promise.all(
            data.authors.map(async (a) => {
              const key = a?.author?.key; // "/authors/..."
              if (!key) return null;

              if (authorCache.current.has(key)) {
                return authorCache.current.get(key) ?? null;
              }

              const r = await fetch(`https://openlibrary.org${key}.json`, {
                signal: ctrl.signal,
              });
              if (!r.ok) return null;

              const authorData = await r.json();
              const name = (authorData?.name as string | undefined) || null;

              if (name) authorCache.current.set(key, name);
              return name;
            })
          );

          setAuthorNames(names.filter((n): n is string => Boolean(n)));
        } else {
          setAuthorNames([]);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    };

    fetchDetails();

    return () => ctrl.abort();
  }, [bookPath]);

  const title = book?.title || listBook?.title || "Untitled";

  const pickCoverId = (...candidates: unknown[]): number | null => {
    for (const id of candidates) {
      const n = Number(id);
      if (Number.isFinite(n) && n > 0) return n;
    }
    return null;
  };

  // Prefer search cover_i — work covers[-L] often 302 to archive.org and fail in-browser
  const coverId = pickCoverId(
    listBook?.cover_i,
    ...(Array.isArray(book?.covers) ? book.covers : [])
  );

  const descriptionText = book?.description
    ? typeof book.description === "string"
      ? book.description
      : book.description.value || ""
    : "";

  const languages =
    book?.languages?.map((lang) =>
      lang.key.replace("/languages/", "").toUpperCase()
    ) || [];

  const firstPublishDate = book?.first_publish_date || null;

  return {
    book,
    listBook,
    title,
    coverId,
    authorNames,
    descriptionText,
    languages,
    firstPublishDate,
    loading,
    error,
  };
};

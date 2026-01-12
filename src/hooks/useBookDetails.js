import { useEffect, useMemo, useRef, useState } from "react";
import { useBooks } from "../context/BooksContext";

export const useBookDetails = (bookPath) => {
  const { books } = useBooks();

  const listBook = useMemo(() => {
    if (!bookPath) return null;
    const normalized = bookPath.startsWith("/") ? bookPath : `/${bookPath}`;
    return books?.find((b) => b.key === normalized) || null;
  }, [books, bookPath]);

  const [book, setBook] = useState(null);
  const [authorNames, setAuthorNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authorCache = useRef(new Map());

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

        const data = await res.json();
        setBook(data);

        if (Array.isArray(data.authors) && data.authors.length > 0) {
          const names = await Promise.all(
            data.authors.map(async (a) => {
              const key = a?.author?.key; // "/authors/..."
              if (!key) return null;

              if (authorCache.current.has(key)) {
                return authorCache.current.get(key);
              }

              const r = await fetch(`https://openlibrary.org${key}.json`, {
                signal: ctrl.signal,
              });
              if (!r.ok) return null;

              const authorData = await r.json();
              const name = authorData?.name || null;

              if (name) authorCache.current.set(key, name);
              return name;
            })
          );

          setAuthorNames(names.filter(Boolean));
        } else {
          setAuthorNames([]);
        }
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err?.message || "Something went wrong");
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    };

    fetchDetails();

    return () => ctrl.abort();
  }, [bookPath]);

  const title = book?.title || listBook?.title || "Untitled";

  const coverId = book?.covers?.[0] || listBook?.cover_i || null;

  const descriptionText = book?.description
    ? typeof book.description === "string"
      ? book.description
      : book.description.value
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

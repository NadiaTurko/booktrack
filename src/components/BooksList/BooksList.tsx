import React from "react";
import BookCard from "../BookCard/BookCard";
import type { BookDoc, ViewMode } from "../../types";

const GRID_BY_VIEW: Record<ViewMode, string> = {
  cards: "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
  books:
    "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
  library: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3",
  list: "flex flex-col gap-2",
};

const CardSkeleton = () => (
  <li className="overflow-hidden rounded-[22px] border border-sand/70 bg-white/70">
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-parchment" />
      <div className="space-y-2.5 p-3.5">
        <div className="h-4 w-4/5 rounded-full bg-parchment" />
        <div className="h-3 w-1/2 rounded-full bg-parchment" />
        <div className="h-3 w-2/5 rounded-full bg-parchment" />
        <div className="mt-3 flex gap-2 pt-1">
          <div className="h-7 w-14 rounded-full bg-parchment" />
          <div className="h-7 w-20 rounded-full bg-parchment" />
        </div>
      </div>
    </div>
  </li>
);

interface BooksListProps {
  items?: BookDoc[];
  status?: string;
  error?: string | null;
  hideEmpty?: boolean;
  isLoading?: boolean;
  onLoadMore?: (() => void) | null;
  canLoadMore?: boolean;
  view?: ViewMode | string;
}

const BooksList = ({
  items = [],
  status = "idle",
  error = null,
  hideEmpty = false,
  isLoading = false,
  onLoadMore = null,
  canLoadMore = false,
  view = "cards",
}: BooksListProps) => {
  const layout =
    GRID_BY_VIEW[view as ViewMode] || GRID_BY_VIEW.cards;
  const isInitialLoading = isLoading && items.length === 0;
  const isLoadingMore = isLoading && items.length > 0;

  return (
    <div className="mt-6 w-full">
      {error && (
        <p className="mb-4 text-sm font-medium text-burgundy">Error: {error}</p>
      )}

      {!hideEmpty && items.length === 0 && status === "succeeded" && (
        <p className="py-10 text-center text-ink-muted">No books found.</p>
      )}

      <ul className={layout}>
        {items.map((book, index) => (
          <li
            key={book.key}
            className={view === "list" ? "w-full" : "h-full"}
            style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
          >
            <BookCard
              book={book}
              view={view}
            />
          </li>
        ))}

        {isInitialLoading &&
          Array.from({ length: view === "list" ? 3 : 4 }).map((_, i) =>
            view === "list" ? (
              <li
                key={`skeleton-${i}`}
                className="h-20 animate-pulse rounded-2xl bg-parchment"
              />
            ) : (
              <CardSkeleton key={`skeleton-${i}`} />
            )
          )}
      </ul>

      {isLoadingMore && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-burgundy/70" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-burgundy/50 [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-burgundy/35 [animation-delay:240ms]" />
          <span className="ml-1">Loading more books…</span>
        </div>
      )}

      {onLoadMore && canLoadMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onLoadMore}
            className="rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-burgundy-dark"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default BooksList;

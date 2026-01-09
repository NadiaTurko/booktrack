import React from "react";
import BookCard from "../BookCard/BookCard";

const BooksList = ({
  items = [],
  status = "idle",
  error = null,
  hideEmpty = false,
  isLoading = false,
  onLoadMore = null,
  canLoadMore = false,
}) => {
  return (
    <div className="mt-10 w-full flex flex-col justify-between items-center container mx-auto ">
      {error && (
        <p className="text-red-600 text-lg font-medium mb-4">
          ❌ Error: {error}
        </p>
      )}

      {!hideEmpty && items.length === 0 && status === "succeeded" && (
        <p className="text-gray-500 text-lg italic">No books found.</p>
      )}

      <ul
        className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-12 justify-items-center w-full
        "
      >
        {items.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}

        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <li
              key={`skeleton-${i}`}
              className="w-full h-72 bg-gray-100 animate-pulse rounded-2xl"
            />
          ))}
      </ul>

      {onLoadMore && canLoadMore && (
        <button
          onClick={onLoadMore}
          className="mt-8 bg-emerald-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-md"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default BooksList;

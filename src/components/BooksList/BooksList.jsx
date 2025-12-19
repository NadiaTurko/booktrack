import React from "react";
import BookCard from "../BookCard/BookCard";

const BooksList = ({ items = [], status, error }) => {
  return (
    <div className="mt-10 mb-10 w-full flex flex-col items-center">
      {error && (
        <p className="text-red-600 text-lg font-medium mb-4">
          ❌ Error: {error}
        </p>
      )}

      {items.length === 0 && status === "succeeded" && (
        <p className="text-gray-500 text-lg italic">No books found.</p>
      )}

      <ul
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-8 justify-items-center w-full max-w-7xl px-4
        "
      >
        {items.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default BooksList;

import React from "react";
import { useSelector } from "react-redux";

const BooksList = () => {
  const { items, status, error } = useSelector((state) => state.books);

  if (status === "loading") return <p>Loading books...</p>;
  if (status === "failed")
    return <p className="text-red-600">Error: {error}</p>;

  if (status === "succeeded" && items.length === 0)
    return <p>No books found.</p>;

  if (status !== "succeeded") return null;

  return (
    <ul className="space-y-3 mt-4">
      {items.map((book, index) => (
        <li
          key={index}
          className="border p-3 rounded shadow-sm w-80 bg-white hover:shadow-md transition-shadow"
        >
          <p className="font-semibold text-lg text-green-800">
            {book.title || "Untitled"}
          </p>

          {book.author_name && (
            <p className="text-gray-700 text-sm">
              Author: {book.author_name.join(", ")}
            </p>
          )}

          {book.first_publish_year && (
            <p className="text-gray-500 text-sm">
              Year: {book.first_publish_year}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BooksList;

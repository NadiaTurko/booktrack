import React from "react";
import { useSelector } from "react-redux";

const BooksList = () => {
  const { items, status, error } = useSelector((state) => state.books);

  return (
    <div className="mt-10 w-full flex flex-col items-center">
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
        {items.map((book, index) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://cdn-icons-png.flaticon.com/512/29/29302.png";

          return (
            <li
              key={index}
              className="
                relative bg-gradient-to-br from-white to-emerald-50
                border border-emerald-200 rounded-3xl shadow-md 
                overflow-hidden transform hover:-translate-y-1 
                hover:shadow-xl transition-all duration-300
                w-72 sm:w-64 md:w-60 flex flex-col
              "
            >
              <div className="h-56 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={coverUrl}
                  alt={book.title || "Book cover"}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-emerald-800 mb-2 line-clamp-2">
                    {book.title || "Untitled"}
                  </h3>

                  {book.author_name && (
                    <p className="text-gray-700 text-sm mb-1">
                      <span className="font-medium text-emerald-700">
                        Author:
                      </span>{" "}
                      {book.author_name.join(", ")}
                    </p>
                  )}

                  {book.first_publish_year && (
                    <p className="text-gray-500 text-sm">
                      <span className="font-medium text-emerald-600">
                        Year:
                      </span>{" "}
                      {book.first_publish_year}
                    </p>
                  )}
                </div>

                <button
                  className={`
                    mt-4 py-2 px-4 rounded-lg text-sm font-medium
                    bg-emerald-600 text-white shadow-sm
                    hover:bg-emerald-700 hover:shadow-md
                    transition-colors duration-300
                  `}
                >
                  📖 Read More
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {status === "loading" && (
        <p className="text-emerald-700 font-medium mt-6 animate-pulse">
          ⏳ Loading more books...
        </p>
      )}
    </div>
  );
};

export default BooksList;

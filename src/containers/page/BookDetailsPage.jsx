import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const BookDetailsPage = () => {
  const { "*": bookPath } = useParams(); // /works/OL1643770W
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [authorNames, setAuthorNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://openlibrary.org/${bookPath}.json`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        setBook(data);

        // Fetch authors (array of objects)
        if (data.authors && data.authors.length > 0) {
          const names = await Promise.all(
            data.authors.map(async (a) => {
              const res = await fetch(
                `https://openlibrary.org${a.author.key}.json`
              );
              const authorData = await res.json();
              return authorData.name;
            })
          );
          setAuthorNames(names);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookPath) {
      fetchBook();
    }
  }, [bookPath]);

  const getCoverUrl = (id) =>
    id ? `https://covers.openlibrary.org/b/id/${id}-L.jpg` : null;

  return (
    <>
      <Header onLogout={() => navigate("/")} />

      <main className="container mx-auto px-4 py-10">
        {loading && (
          <p className="text-emerald-600 font-medium animate-pulse">
            ⏳ Loading book details...
          </p>
        )}

        {error && (
          <div className="text-center text-red-600 font-bold">
            ❗ Error: {error}
          </div>
        )}

        {book && (
          <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-10">
            {/* Left side - Cover */}
            <div className="flex justify-center items-start bg-gray-100 p-4 rounded-xl shadow-inner">
              {book.covers && book.covers.length > 0 ? (
                <img
                  src={getCoverUrl(book.covers[0])}
                  alt={book.title}
                  className="w-72 h-auto rounded-2xl border border-gray-300 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                />
              ) : (
                <div className="w-72 h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                  No Cover Available
                </div>
              )}
            </div>

            {/* Right side - Book Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-emerald-800 mb-4 leading-tight">
                {book.title || "Untitled"}
              </h1>

              {authorNames.length > 0 && (
                <p className="text-md mb-2 text-gray-700">
                  <span className="font-semibold text-emerald-600">
                    Author(s):
                  </span>{" "}
                  {authorNames.join(", ")}
                </p>
              )}

              {book.languages && (
                <p className="text-md mb-2 text-gray-700">
                  <span className="font-semibold text-emerald-600">
                    Language:
                  </span>{" "}
                  {book.languages
                    .map((lang) =>
                      lang.key.replace("/languages/", "").toUpperCase()
                    )
                    .join(", ")}
                </p>
              )}

              {book.first_publish_date && (
                <p className="text-md mb-2 text-gray-700">
                  <span className="font-semibold text-emerald-600">
                    Published:
                  </span>{" "}
                  {book.first_publish_date}
                </p>
              )}

              {/* Description */}
              {book.description && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2 text-emerald-700">
                    Description
                  </h2>
                  <p className="text-gray-800 leading-relaxed">
                    {typeof book.description === "string"
                      ? book.description
                      : book.description.value}
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate(-1)}
                className="mt-8 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-semibold"
              >
                ← Back to list
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default BookDetailsPage;

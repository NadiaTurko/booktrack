import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ReadMoreButton from "../../components/Buttons/ReadMoreButton";

const BookDetailsPage = () => {
  const { "*": bookPath } = useParams(); // /works/OL1643770W
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [authorNames, setAuthorNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(`https://openlibrary.org/${bookPath}.json`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        setBook(data);

        if (data.authors && data.authors.length > 0) {
          const names = await Promise.all(
            data.authors.map(async (a) => {
              const res = await fetch(
                `https://openlibrary.org${a.author.key}.json`
              );
              const authorData = await res.json();
              return authorData?.name;
            })
          );
          setAuthorNames(names.filter(Boolean));
        } else {
          setAuthorNames([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookPath) fetchBook();
  }, [bookPath]);

  const getCoverUrl = (id) =>
    id ? `https://covers.openlibrary.org/b/id/${id}-L.jpg` : null;

  const descriptionText = book?.description
    ? typeof book.description === "string"
      ? book.description
      : book.description.value
    : "";

  return (
    <>
      <Header onLogout={() => navigate("/")} />

      <main
        className="
          min-h-screen
          px-6
          py-10
          bg-gradient-to-b
          from-emerald-50
          via-emerald-100
          to-emerald-200
        "
      >
        {/* Loading */}
        {loading && (
          <div className="max-w-5xl mx-auto">
            <p className="text-emerald-700 font-medium animate-pulse">
              ⏳ Loading book details...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-5xl mx-auto">
            <div
              className="
                rounded-2xl
                p-[1.5px]
                bg-gradient-to-b
                from-red-200
                via-red-300
                to-red-400
              "
            >
              <div className="rounded-[14px] bg-white/90 backdrop-blur-xl p-4 text-center">
                <p className="text-red-600 font-semibold">❗ Error: {error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {book && (
          <div className="max-w-5xl mx-auto">
            {/* Gradient border wrapper (same system as BookCard) */}
            <div
              className="
                rounded-3xl
                p-[1.5px]
                bg-gradient-to-b
                from-emerald-200
                via-emerald-300
                to-emerald-400
                shadow-2xl
              "
            >
              {/* Glass card */}
              <div
                className="
                  rounded-[22px]
                  bg-white/90
                  backdrop-blur-xl
                  p-6 md:p-8
                "
              >
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Left - Cover */}
                  <div className="w-full md:w-[340px] flex justify-center">
                    <div
                      className="
                        w-full
                        rounded-2xl
                        p-[1.5px]
                    
                      "
                    >
                      <div
                        className="
                          rounded-[14px]
                          bg-white/80
                          backdrop-blur-sm
                          px-6
                          py-6
                          flex items-center justify-center
                        "
                      >
                        {book.covers && book.covers.length > 0 ? (
                          <img
                            src={getCoverUrl(book.covers[0])}
                            alt={book.title || "Book cover"}
                            className="
                              h-[360px]
                              w-auto
                              max-w-full
                              object-contain
                              rounded-md
                              drop-shadow-md
                              transition-transform duration-300
                              hover:scale-[1.03]
                            "
                          />
                        ) : (
                          <div className="w-full h-[360px] rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700/70 font-medium">
                            No Cover Available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right - Info */}
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-4 leading-tight">
                      {book.title || "Untitled"}
                    </h1>

                    <div className="space-y-2">
                      {authorNames.length > 0 && (
                        <p className="text-gray-700">
                          <span className="font-semibold text-emerald-700">
                            Author(s):
                          </span>{" "}
                          {authorNames.join(", ")}
                        </p>
                      )}

                      {book.languages && (
                        <p className="text-gray-700">
                          <span className="font-semibold text-emerald-700">
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
                        <p className="text-gray-700">
                          <span className="font-semibold text-emerald-700">
                            Published:
                          </span>{" "}
                          {book.first_publish_date}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    {descriptionText && (
                      <div className="mt-6">
                        <div
                          className="
                            rounded-2xl
                            p-[1px]
                            bg-gradient-to-b
                            from-emerald-200
                            via-emerald-300
                            to-emerald-400
                          "
                        >
                          <div className="rounded-[14px] bg-white/85 backdrop-blur-sm p-4">
                            <h2 className="text-lg font-semibold mb-2 text-emerald-800">
                              Description
                            </h2>
                            <p className="text-gray-800 leading-relaxed">
                              {descriptionText}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 max-w-xs">
                      <ReadMoreButton
                        onClick={() => navigate(-1)}
                        text="← Back to list"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default BookDetailsPage;

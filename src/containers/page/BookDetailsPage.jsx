import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ReadMoreButton from "../../components/Buttons/ReadMoreButton";
import PageLoader from "../../components/Loader/PageLoader";
import { useBookDetails } from "../../hooks/useBookDetails";

const BookDetailsPage = () => {
  const { "*": bookPath } = useParams();
  const navigate = useNavigate();

  const {
    title,
    coverId,
    authorNames,
    descriptionText,
    languages,
    firstPublishDate,
    loading,
    error,
    book,
    listBook,
  } = useBookDetails(bookPath);

  const getCoverUrl = (id) =>
    id ? `https://covers.openlibrary.org/b/id/${id}-L.jpg` : null;

  const hasContent = !!book || !!listBook;

  return (
    <>
      <Header onLogout={() => navigate("/")} />

      <main className="min-h-screen px-4 sm:px-6 py-6 sm:py-10 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200">
        <div className="max-w-5xl mx-auto">
          {loading && <PageLoader text="Loading book details..." />}

          {error && (
            <div className="rounded-2xl p-[1.5px] bg-gradient-to-b from-red-200 via-red-300 to-red-400">
              <div className="rounded-[14px] bg-white/90 backdrop-blur-xl p-4 text-center">
                <p className="text-red-600 font-semibold">❗ Error: {error}</p>
              </div>
            </div>
          )}

          {!error && hasContent && (
            <div className="mt-4 rounded-3xl p-[1.5px] bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 shadow-2xl">
              <div className="rounded-[22px] bg-white/90 backdrop-blur-xl p-5 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  {/* Cover */}
                  <div className="w-full md:w-[340px] flex justify-center">
                    <div className="w-full rounded-2xl p-[1.5px]">
                      <div className="rounded-[14px] bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-5 sm:py-6 flex items-center justify-center">
                        {coverId ? (
                          <img
                            src={getCoverUrl(coverId)}
                            alt={title}
                            className="h-[260px] sm:h-[320px] md:h-[360px] w-auto max-w-full object-contain rounded-md drop-shadow-md transition-transform duration-300 hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="w-full h-[260px] sm:h-[320px] md:h-[360px] rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700/70 font-medium">
                            No Cover Available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-800 mb-4 leading-tight">
                      {title}
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

                      {languages.length > 0 && (
                        <p className="text-gray-700">
                          <span className="font-semibold text-emerald-700">
                            Language:
                          </span>{" "}
                          {languages.join(", ")}
                        </p>
                      )}

                      {firstPublishDate && (
                        <p className="text-gray-700">
                          <span className="font-semibold text-emerald-700">
                            Published:
                          </span>{" "}
                          {firstPublishDate}
                        </p>
                      )}
                    </div>

                    {descriptionText && (
                      <div className="mt-6">
                        <div className="rounded-2xl p-[1px] bg-linear-to-b from-emerald-200 via-emerald-300 to-emerald-400">
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

                    <div className="mt-8 w-full sm:max-w-xs">
                      <ReadMoreButton
                        onClick={() => navigate(-1)}
                        text="← Back to list"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default BookDetailsPage;

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ReadMoreButton from "../../components/Buttons/ReadMoreButton";
import PageLoader from "../../components/Loader/PageLoader";
import BookJournalPanel from "../../components/BookJournal/BookJournalPanel";
import { useBookDetails } from "../../hooks/useBookDetails";
import { useFavorites } from "../../context/FavoritesContext";
import FavoriteButton from "../../components/Buttons/FavoriteButton";
import ShelfStatusControl from "../../components/Buttons/ShelfStatusControl";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600";

const DESC_LIMIT = 300;

interface BookDescriptionProps {
  text: string;
}

const BookDescription = ({ text }: BookDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = text.length > DESC_LIMIT;
  const shown =
    !needsTruncate || expanded ? text : `${text.slice(0, DESC_LIMIT).trimEnd()}…`;

  return (
    <div className="mt-6 rounded-2xl border border-sand/80 bg-white/60 p-4">
      <h2 className="mb-2 font-display text-lg font-semibold text-ink">
        Description
      </h2>
      <p className="leading-relaxed text-ink-muted whitespace-pre-wrap">{shown}</p>
      {needsTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-semibold text-burgundy transition hover:text-burgundy-dark"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

const BookDetailsPage = () => {
  const { "*": bookPath } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [coverFailed, setCoverFailed] = useState(false);

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

  useEffect(() => {
    setCoverFailed(false);
  }, [bookPath, coverId]);

  const bookId = useMemo(() => {
    if (listBook?.key) return listBook.key;
    if (!bookPath) return null;
    return bookPath.startsWith("/") ? bookPath : `/${bookPath}`;
  }, [listBook?.key, bookPath]);

  // Medium size: Large (-L) often 302s to archive.org and breaks in the browser
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : FALLBACK_COVER;

  const hasContent = !!book || !!listBook;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {loading && !hasContent && (
          <PageLoader text="Loading book details..." />
        )}

        {error && !hasContent && (
          <div className="rounded-[22px] border border-burgundy/20 bg-rose-soft/60 p-4 text-center">
            <p className="font-semibold text-burgundy">Error: {error}</p>
          </div>
        )}

        {!error && hasContent && (
          <>
            <div className="library-panel animate-softRise overflow-hidden rounded-[28px]">
              <div className="flex flex-col gap-8 p-5 sm:p-8 md:flex-row">
                <div className="flex w-full justify-center md:w-[260px] md:justify-start">
                  {!coverFailed ? (
                    <div className="w-[180px] overflow-hidden rounded-2xl shadow-[0_14px_32px_rgba(60,47,47,0.16)] sm:w-[210px]">
                      <img
                        key={coverUrl}
                        src={coverUrl}
                        alt={title}
                        onError={() => setCoverFailed(true)}
                        className="aspect-[2/3] w-full object-cover transition duration-300 hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[2/3] w-[180px] items-center justify-center rounded-2xl bg-parchment text-sm text-ink-muted sm:w-[210px]">
                      No Cover Available
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                      {title}
                    </h1>
                    {bookId && (
                      <FavoriteButton
                        favorite={isFavorite(bookId)}
                        onClick={() => toggleFavorite(bookId)}
                      />
                    )}
                  </div>

                  {bookId && (
                    <div className="mt-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted/75">
                        Shelf status
                      </p>
                      <ShelfStatusControl bookId={bookId} />
                    </div>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-ink-muted">
                    {authorNames.length > 0 && (
                      <p>
                        <span className="font-semibold text-burgundy">
                          Author(s):
                        </span>{" "}
                        {authorNames.join(", ")}
                      </p>
                    )}
                    {languages.length > 0 && (
                      <p>
                        <span className="font-semibold text-burgundy">
                          Language:
                        </span>{" "}
                        {languages.join(", ")}
                      </p>
                    )}
                    {firstPublishDate && (
                      <p>
                        <span className="font-semibold text-burgundy">
                          Published:
                        </span>{" "}
                        {firstPublishDate}
                      </p>
                    )}
                  </div>

                  {descriptionText && (
                    <BookDescription key={bookId || title} text={descriptionText} />
                  )}

                  <div className="mt-8">
                    <ReadMoreButton
                      onClick={() => navigate(-1)}
                      text="← Back to list"
                      variant="solid"
                    />
                  </div>
                </div>
              </div>
            </div>

            {bookId && <BookJournalPanel bookId={bookId} />}
          </>
        )}
      </main>
    </div>
  );
};

export default BookDetailsPage;

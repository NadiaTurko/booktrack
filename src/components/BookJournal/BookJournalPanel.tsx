import { useEffect, useState, type FormEvent } from "react";
import { MapPin, Quote, MessageSquareText, BookOpen, Trash2 } from "lucide-react";
import { useBookJournal } from "../../context/BookJournalContext";

const fieldClass =
  "w-full rounded-2xl border border-sand bg-white/90 px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/55 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/15";

interface BookJournalPanelProps {
  bookId: string;
}

const BookJournalPanel = ({ bookId }: BookJournalPanelProps) => {
  const { getEntry, saveEntry, addQuote, removeQuote } = useBookJournal();
  const entry = getEntry(bookId);

  const [comment, setComment] = useState("");
  const [readingPlace, setReadingPlace] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [quotePage, setQuotePage] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setComment(entry?.comment || "");
    setReadingPlace(entry?.readingPlace || "");
    setIsReading(Boolean(entry?.isReading));
    setQuoteText("");
    setQuotePage("");
  }, [bookId, entry?.updatedAt]);

  if (!bookId) return null;

  const flashSaved = () => {
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  };

  const handleSaveNotes = (e: FormEvent) => {
    e.preventDefault();
    saveEntry(bookId, {
      comment: comment.trim(),
      readingPlace: readingPlace.trim(),
      isReading,
      startedAt: isReading
        ? entry?.startedAt || Date.now()
        : entry?.startedAt || null,
      quotes: entry?.quotes || [],
    });
    flashSaved();
  };

  const handleToggleReading = () => {
    const next = !isReading;
    setIsReading(next);
    saveEntry(bookId, {
      comment: comment.trim(),
      readingPlace: readingPlace.trim(),
      isReading: next,
      startedAt: next ? entry?.startedAt || Date.now() : entry?.startedAt || null,
      quotes: entry?.quotes || [],
    });
  };

  const handleAddQuote = (e: FormEvent) => {
    e.preventDefault();
    if (!quoteText.trim()) return;
    addQuote(bookId, { text: quoteText, page: quotePage });
    setQuoteText("");
    setQuotePage("");
    flashSaved();
  };

  const quotes = entry?.quotes || [];

  return (
    <section className="mt-6 space-y-4 animate-softRise">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          Your reading notes
        </h2>
        {savedFlash && (
          <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage">
            Saved
          </span>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Reading status + place */}
        <div className="rounded-[22px] border border-sand/80 bg-white/65 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-ink">
            <BookOpen className="h-4 w-4 text-burgundy" />
            <h3 className="font-semibold">Reading status</h3>
          </div>

          <button
            type="button"
            onClick={handleToggleReading}
            className={`mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
              isReading
                ? "bg-sage text-white"
                : "border border-sand bg-parchment/60 text-ink-muted hover:border-burgundy/30 hover:text-ink"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${isReading ? "bg-white" : "bg-burgundy/50"}`}
            />
            {isReading ? "Currently reading" : "Mark as currently reading"}
          </button>

          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
            <MapPin className="h-3.5 w-3.5 text-burgundy" />
            Where are you reading it?
          </label>
          <input
            type="text"
            value={readingPlace}
            onChange={(e) => setReadingPlace(e.target.value)}
            placeholder="Home sofa, café, commute, library…"
            className={fieldClass}
          />
          <p className="mt-2 text-xs text-ink-muted">
            Optional — where you usually open this book (sofa, café, commute…).
          </p>

          {isReading && entry?.startedAt && (
            <p className="mt-2 text-xs text-ink-muted">
              Started{" "}
              {new Date(entry.startedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Comment */}
        <form
          onSubmit={handleSaveNotes}
          className="rounded-[22px] border border-sand/80 bg-white/65 p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-ink">
            <MessageSquareText className="h-4 w-4 text-burgundy" />
            <h3 className="font-semibold">Your comment</h3>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Thoughts, mood, why you picked this book…"
            className={`${fieldClass} resize-y min-h-[120px] rounded-2xl`}
          />
          <button
            type="submit"
            className="mt-3 rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-white transition hover:bg-burgundy-dark active:scale-[0.98]"
          >
            Save notes
          </button>
        </form>
      </div>

      {/* Quotes */}
      <div className="rounded-[22px] border border-sand/80 bg-white/65 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 text-ink">
          <Quote className="h-4 w-4 text-burgundy" />
          <h3 className="font-semibold">Quotes from the book</h3>
        </div>

        <form onSubmit={handleAddQuote} className="space-y-2.5">
          <textarea
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            rows={3}
            placeholder="Paste a line that stayed with you…"
            className={`${fieldClass} resize-y rounded-2xl`}
          />
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <input
              type="text"
              value={quotePage}
              onChange={(e) => setQuotePage(e.target.value)}
              placeholder="Page / location (optional)"
              className={`${fieldClass} sm:max-w-[220px]`}
            />
            <button
              type="submit"
              disabled={!quoteText.trim()}
              className="rounded-full bg-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add quote
            </button>
          </div>
        </form>

        {quotes.length === 0 ? (
          <p className="mt-4 text-sm text-ink-muted">
            No quotes yet. Save passages you want to remember.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {quotes.map((q) => (
              <li
                key={q.id}
                className="rounded-2xl border border-sand/70 bg-parchment/40 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <blockquote className="font-display text-[15px] leading-relaxed text-ink">
                    “{q.text}”
                  </blockquote>
                  <button
                    type="button"
                    onClick={() => removeQuote(bookId, q.id)}
                    title="Remove quote"
                    className="shrink-0 rounded-full border border-sand p-1.5 text-ink-muted transition hover:border-burgundy/30 hover:text-burgundy"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-ink-muted">
                  {q.page && (
                    <span className="rounded-full bg-white/80 px-2 py-0.5">
                      p. {q.page}
                    </span>
                  )}
                  <span>
                    {new Date(q.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default BookJournalPanel;

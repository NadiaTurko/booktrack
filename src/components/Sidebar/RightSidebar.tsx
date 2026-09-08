import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useBookJournal } from "../../context/BookJournalContext";
import type { BookDoc } from "../../types";

interface ReadingItemProps {
  book: BookDoc;
}

const ReadingItem = ({ book }: ReadingItemProps) => {
  const navigate = useNavigate();
  const { getEntry } = useBookJournal();
  const entry = getEntry(book.key);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
    : "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=120";

  const pages = book.number_of_pages_median;
  const progress = pages ? Math.min(65, 30 + ((book.cover_i || 40) % 40)) : 40;

  return (
    <li className="rounded-2xl border border-sand/70 bg-white/60 p-2.5 transition hover:border-burgundy/25">
      <div className="flex gap-2.5">
        <img
          src={coverUrl}
          alt=""
          className="h-14 w-10 shrink-0 rounded-lg object-cover shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{book.title}</p>
          <p className="truncate text-xs text-ink-muted">
            {book.author_name?.[0] || "Unknown author"}
          </p>
          {entry?.readingPlace && (
            <p className="mt-1 flex items-center gap-1 truncate text-[10px] text-burgundy/80">
              <MapPin className="h-3 w-3 shrink-0" />
              {entry.readingPlace}
            </p>
          )}
          {pages ? (
            <p className="mt-1 text-[10px] text-ink-muted">
              ~{Math.round((progress / 100) * pages)} / {pages} pages
            </p>
          ) : (
            <p className="mt-1 text-[10px] text-ink-muted">In progress</p>
          )}
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-burgundy/80 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/books${book.key}`)}
        className="mt-2 w-full rounded-full border border-sand bg-parchment/50 py-1.5 text-xs font-medium text-ink-muted transition hover:border-burgundy/30 hover:text-burgundy"
      >
        {entry?.comment ? "Edit notes" : "Add note"}
      </button>
    </li>
  );
};

interface RightSidebarProps {
  currentlyReading?: BookDoc[];
}

const RightSidebar = ({ currentlyReading = [] }: RightSidebarProps) => {
  return (
    <div className="sticky top-[76px] animate-softRise [animation-delay:120ms]">
      <section className="library-panel rounded-[22px] p-4">
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          Currently Reading
        </h2>
        {currentlyReading.length === 0 ? (
          <p className="text-sm text-ink-muted">
            Open a book and mark it as currently reading.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {currentlyReading.slice(0, 3).map((book) => (
              <ReadingItem key={book.key} book={book} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default RightSidebar;

import { BookOpen, CheckCircle2 } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

/**
 * Marks a book as To Read (unread) or Finished (read).
 * Adds it to the favorites shelf automatically if needed.
 */
interface ShelfStatusControlProps {
  bookId: string;
  size?: "sm" | "md";
}

const ShelfStatusControl = ({ bookId, size = "md" }: ShelfStatusControlProps) => {
  const { getFavorite, setFavoriteStatus } = useFavorites();
  if (!bookId) return null;

  const fav = getFavorite(bookId);
  const status = fav?.status; // undefined | "unread" | "read"
  const isToRead = status === "unread";
  const isFinished = status === "read";

  const btnBase =
    size === "sm"
      ? "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition"
      : "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition";

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        title="Mark as To Read"
        onClick={() => setFavoriteStatus(bookId, "unread")}
        className={`${btnBase} ${
          isToRead
            ? "bg-rose-soft text-burgundy shadow-sm"
            : "border border-sand bg-white/80 text-ink-muted hover:border-burgundy/30 hover:text-burgundy"
        }`}
      >
        <BookOpen className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        To Read
      </button>

      <button
        type="button"
        title="Mark as Finished"
        onClick={() => setFavoriteStatus(bookId, "read")}
        className={`${btnBase} ${
          isFinished
            ? "bg-sage-soft text-sage shadow-sm"
            : "border border-sand bg-white/80 text-ink-muted hover:border-sage/40 hover:text-sage"
        }`}
      >
        <CheckCircle2 className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        Finished
      </button>
    </div>
  );
};

export default ShelfStatusControl;

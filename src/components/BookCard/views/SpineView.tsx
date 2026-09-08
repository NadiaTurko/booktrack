import type { BookCardModel } from "../useBookCardModel";
import ShelfStatusControl from "../../Buttons/ShelfStatusControl";

/** Cover-forward “spine” / books shelf view. */
const SpineView = ({ book, coverUrl, handleOpen }: BookCardModel) => (
  <article className="group text-center animate-softRise">
    <button
      type="button"
      onClick={handleOpen}
      className="relative mx-auto mb-2 block w-full max-w-[140px] overflow-hidden rounded-xl shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
    >
      <span className="block pt-[145%]" />
      <img
        src={coverUrl}
        alt={book.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </button>
    <h3 className="line-clamp-2 px-1 font-display text-sm font-semibold text-ink">
      {book.title}
    </h3>
    <p className="mt-0.5 line-clamp-1 px-1 text-[11px] text-ink-muted">
      {book.author_name?.[0] || "Unknown"}
    </p>
    <div className="mt-2 flex justify-center gap-1">
      <ShelfStatusControl bookId={book.key} size="sm" />
    </div>
  </article>
);

export default SpineView;

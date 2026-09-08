import type { BookCardModel } from "../useBookCardModel";
import StarRating from "../StarRating";
import CardActions from "../CardActions";
import ShelfStatusControl from "../../Buttons/ShelfStatusControl";

const LibraryView = ({
  book,
  coverUrl,
  isFavorite,
  toggleFavorite,
  handleOpen,
}: BookCardModel) => (
  <article className="group flex gap-3 overflow-hidden rounded-[18px] border border-sand/80 bg-white/70 p-2.5 transition hover:border-burgundy/20 hover:shadow-sm animate-softRise">
    <button type="button" onClick={handleOpen} className="shrink-0">
      <img
        src={coverUrl}
        alt=""
        className="h-[110px] w-[76px] rounded-lg object-cover shadow-sm transition group-hover:scale-[1.02]"
      />
    </button>
    <div className="flex min-w-0 flex-1 flex-col py-0.5">
      <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-ink">
        {book.title}
      </h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">
        {book.author_name?.join(", ") || "Unknown author"}
      </p>
      <StarRating count={book.ratings_count} className="mt-1.5" />
      <div className="mt-2">
        <ShelfStatusControl bookId={book.key} size="sm" />
      </div>
      <CardActions
        book={book}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleOpen={handleOpen}
        compact
      />
    </div>
  </article>
);

export default LibraryView;

import type { BookCardModel } from "../useBookCardModel";
import StarRating from "../StarRating";
import CardActions from "../CardActions";
import ShelfStatusControl from "../../Buttons/ShelfStatusControl";

const CardsView = ({
  book,
  coverUrl,
  pages,
  progress,
  tags,
  tagPalette,
  isFavorite,
  toggleFavorite,
  handleOpen,
}: BookCardModel) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-sand/80 bg-white/75 shadow-[0_10px_28px_rgba(60,47,47,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(60,47,47,0.1)] animate-softRise">
    <button
      type="button"
      onClick={handleOpen}
      className="relative block w-full overflow-hidden bg-parchment/60 pt-[130%]"
    >
      <img
        src={coverUrl}
        alt={book.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </button>

    <div className="flex flex-1 flex-col p-3.5">
      <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-ink">
        {book.title}
      </h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">
        {book.author_name?.join(", ") || "Unknown author"}
      </p>

      <StarRating count={book.ratings_count} className="mt-1.5" />

      <div className="mt-2">
        <ShelfStatusControl bookId={book.key} size="sm" />
      </div>

      {tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagPalette[i % tagPalette.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {pages && progress !== null && (
        <div className="mt-3">
          <p className="mb-1 text-[10px] text-ink-muted">
            {Math.round((progress / 100) * pages)} / {pages} pages
          </p>
          <div className="h-1 overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-burgundy/75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <CardActions
        book={book}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleOpen={handleOpen}
      />
    </div>
  </article>
);

export default CardsView;

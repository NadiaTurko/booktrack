import type { BookCardModel } from "../useBookCardModel";
import StarRating from "../StarRating";
import ReadMoreButton from "../../Buttons/ReadMoreButton";
import FavoriteButton from "../../Buttons/FavoriteButton";
import ShelfStatusControl from "../../Buttons/ShelfStatusControl";

const ListView = ({
  book,
  coverUrl,
  pages,
  progress,
  isFavorite,
  toggleFavorite,
  handleOpen,
}: BookCardModel) => (
  <article className="rounded-2xl border border-sand/80 bg-white/75 p-3 transition hover:border-burgundy/25 hover:shadow-sm animate-softRise">
    <div className="flex gap-3">
      <button type="button" onClick={handleOpen} className="shrink-0 self-start">
        <img
          src={coverUrl}
          alt=""
          className="h-[72px] w-[52px] rounded-lg object-cover shadow-sm"
        />
      </button>

      <div className="min-w-0 flex-1">
        <button type="button" onClick={handleOpen} className="w-full text-left">
          <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-ink">
            {book.title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-ink-muted">
            {book.author_name?.join(", ") || "Unknown author"}
          </p>
        </button>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <StarRating count={book.ratings_count} />
          {pages && progress !== null && (
            <span className="text-[10px] text-ink-muted">
              {Math.round((progress / 100) * pages)} / {pages} pages
            </span>
          )}
        </div>

        <div className="mt-2">
          <ShelfStatusControl bookId={book.key} size="sm" />
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <ReadMoreButton onClick={handleOpen} text="View" />
          <FavoriteButton
            favorite={isFavorite(book.key)}
            onClick={() => toggleFavorite(book.key)}
          />
        </div>
      </div>
    </div>
  </article>
);

export default ListView;

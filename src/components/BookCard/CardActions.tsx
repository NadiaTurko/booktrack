import type { BookDoc } from "../../types";
import ReadMoreButton from "../Buttons/ReadMoreButton";
import FavoriteButton from "../Buttons/FavoriteButton";

interface CardActionsProps {
  book: BookDoc;
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  handleOpen: () => void;
  compact?: boolean;
}

const CardActions = ({
  book,
  toggleFavorite,
  isFavorite,
  handleOpen,
  compact = false,
}: CardActionsProps) => (
  <div
    className={`mt-auto flex flex-wrap items-center gap-1.5 ${compact ? "pt-2" : "pt-3"}`}
  >
    <ReadMoreButton onClick={handleOpen} text="View" />
    {!compact && <ReadMoreButton onClick={handleOpen} text="Add note" />}
    <div className="ml-auto">
      <FavoriteButton
        favorite={isFavorite(book.key)}
        onClick={() => toggleFavorite(book.key)}
      />
    </div>
  </div>
);

export default CardActions;

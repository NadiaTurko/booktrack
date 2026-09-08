import type { BookDoc } from "../../types";
import { useFavorites } from "../../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const TAG_PALETTE = [
  "bg-[#e8f0e9] text-[#4a6350]",
  "bg-[#e7eef5] text-[#3f5a73]",
  "bg-[#f3e8ef] text-[#6d4a5e]",
  "bg-[#f5efe3] text-[#7a6340]",
  "bg-[#efe8f5] text-[#5a4a6d]",
];

const pickTags = (book: BookDoc): string[] => {
  const subjects = (book.subject || []).slice(0, 2).map((s) =>
    String(s).toLowerCase().split(" ")[0]
  );
  const tags: string[] = [];
  if ((book.ratings_average ?? 0) >= 4) tags.push("gentle");
  tags.push(...subjects);
  if (book.first_publish_year) tags.push(String(book.first_publish_year));
  return [...new Set(tags)].slice(0, 3);
};

export interface BookCardModel {
  book: BookDoc;
  coverUrl: string;
  pages: number | undefined;
  progress: number | null;
  tags: string[];
  tagPalette: string[];
  isFavorite: (bookId: string) => boolean;
  toggleFavorite: (bookId: string) => void;
  handleOpen: () => void;
}

export const useBookCardModel = (book: BookDoc): BookCardModel => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600";

  const pages = book.number_of_pages_median;
  const progressSeed = (book.cover_i || book.title?.length || 20) % 70;
  const progress = pages ? 20 + progressSeed : null;
  const tags = pickTags(book);
  const handleOpen = () => navigate(`/books${book.key}`);

  return {
    book,
    coverUrl,
    pages,
    progress,
    tags,
    tagPalette: TAG_PALETTE,
    isFavorite,
    toggleFavorite,
    handleOpen,
  };
};

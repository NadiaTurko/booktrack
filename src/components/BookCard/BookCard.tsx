import type { ComponentType } from "react";
import type { BookDoc, ViewMode } from "../../types";
import { useBookCardModel, type BookCardModel } from "./useBookCardModel";
import CardsView from "./views/CardsView";
import ListView from "./views/ListView";
import LibraryView from "./views/LibraryView";
import SpineView from "./views/SpineView";

const VIEW_MAP: Record<ViewMode, ComponentType<BookCardModel>> = {
  cards: CardsView,
  list: ListView,
  library: LibraryView,
  books: SpineView,
};

interface BookCardProps {
  book: BookDoc;
  view?: ViewMode | string;
}

const BookCard = ({ book, view = "cards" }: BookCardProps) => {
  const model = useBookCardModel(book);
  const View = VIEW_MAP[view as ViewMode] || CardsView;
  return <View {...model} />;
};

export default BookCard;

export type ShelfStatus = "read" | "unread";

export interface FavoriteItem {
  id: string;
  status: ShelfStatus;
  addedAt: number;
}

export interface BookDoc {
  key: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  ratings_count?: number;
  ratings_average?: number;
  number_of_pages_median?: number;
  subject?: string[];
  first_publish_year?: number;
  [key: string]: unknown;
}

export interface BookQuote {
  id: string;
  text: string;
  page: string;
  createdAt: number;
}

export interface BookJournalEntry {
  id: string;
  comment: string;
  quotes: BookQuote[];
  readingPlace: string;
  isReading: boolean;
  startedAt: number | null;
  updatedAt: number;
}

export type BookJournalMap = Record<string, BookJournalEntry>;

export type LibraryStats = {
  total?: number;
  favorites?: number;
  finished?: number;
  reading?: number;
  unread?: number;
};

export type ViewMode = "books" | "cards" | "library" | "list";

export type SortOrder =
  | "title_asc"
  | "title_desc"
  | "unread_first"
  | "read_first"
  | "popular"
  | string;

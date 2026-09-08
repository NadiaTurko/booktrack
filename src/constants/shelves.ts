export interface ShelfMeta {
  statusFilter: string;
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyMessage: string;
}

export const DEFAULT_FAVORITES_HERO = {
  title: "Your favorites shelf.",
  subtitle:
    "Books you’ve saved — mark them To Read or Finished to keep your shelves tidy.",
  emptyTitle: "No favorite books yet",
  emptyMessage: "Add books to favorites or mark To Read / Finished.",
} as const;

export const SHELF_META: Record<string, ShelfMeta> = {
  "to-read": {
    statusFilter: "unread",
    title: "Your to-read shelf.",
    subtitle:
      "Books you’re planning to open next — mark them Finished when you’re done.",
    emptyTitle: "No to-read books yet",
    emptyMessage: "Open a book and tap To Read to add it here.",
  },
  finished: {
    statusFilter: "read",
    title: "Your finished shelf.",
    subtitle: "Books you’ve completed. Flip them back to To Read anytime.",
    emptyTitle: "No finished books yet",
    emptyMessage: "Mark a book as Finished and it will land on this shelf.",
  },
};

export const getShelfMeta = (shelf: string | null) =>
  (shelf && SHELF_META[shelf]) || null;

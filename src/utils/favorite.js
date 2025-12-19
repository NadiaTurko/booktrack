const STORAGE_KEY = "favoriteBooks";

export const getFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const toggleFavorite = (bookId) => {
  const favorites = getFavorites();

  const updated = favorites.includes(bookId)
    ? favorites.filter((id) => id !== bookId)
    : [...favorites, bookId];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

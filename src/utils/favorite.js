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

  const exists = favorites.find((fav) => fav.id === bookId);

  const updated = exists
    ? favorites.filter((fav) => fav.id !== bookId)
    : [...favorites, { id: bookId, added: Date.now() }];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

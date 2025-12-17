export const getFavorites = () => {
  const stored = localStorage.getItem("favoriteBooks");
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (bookId) => {
  const favorites = getFavorites();
  const updated = favorites.includes(bookId)
    ? favorites.filter((id) => id !== bookId)
    : [...favorites, bookId];
  localStorage.setItem("favoriteBooks", JSON.stringify(updated));
  return updated;
};

export const isFavorite = (bookId) => {
  const favorites = getFavorites();
  return favorites.includes(bookId);
};

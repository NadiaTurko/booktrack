const KEY = "favorites";

export const getFavorites = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

export const toggleFavorite = (bookId) => {
  const current = getFavorites();

  const ids = current
    .map((fav) => (typeof fav === "string" ? fav : fav?.id))
    .filter(Boolean);

  const set = new Set(ids);

  if (set.has(bookId)) set.delete(bookId);
  else set.add(bookId);

  const updated = Array.from(set);

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};

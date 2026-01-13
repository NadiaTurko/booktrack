const keyFor = (uid) => `favorites:${uid || "guest"}`;

// щоб оновлювалось в цій же вкладці (storage не тригериться в тому ж табі)
const notify = () => window.dispatchEvent(new Event("favorites:changed"));

export const getFavorites = (uid) => {
  try {
    const raw = JSON.parse(localStorage.getItem(keyFor(uid)));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

const saveFavorites = (uid, favorites) => {
  localStorage.setItem(keyFor(uid), JSON.stringify(favorites));
  notify();
};

export const toggleFavorite = (uid, bookId) => {
  const current = getFavorites(uid);

  const exists = current.some((f) => f?.id === bookId);

  let updated;
  if (exists) {
    updated = current.filter((f) => f.id !== bookId);
  } else {
    updated = [
      ...current,
      {
        id: bookId,
        status: "unread", // default
        addedAt: Date.now(),
      },
    ];
  }

  // на всяк випадок прибираємо дублікати по id
  const uniq = new Map(updated.map((f) => [f.id, f]));
  const normalized = Array.from(uniq.values());

  saveFavorites(uid, normalized);
  return normalized;
};

export const setFavoriteStatus = (uid, bookId, status) => {
  const current = getFavorites(uid);

  const normalizedStatus = status === "read" ? "read" : "unread";

  const updated = current.map((f) =>
    f.id === bookId ? { ...f, status: normalizedStatus } : f
  );

  saveFavorites(uid, updated);
  return updated;
};

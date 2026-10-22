const FAV_KEY = "library_favorite_book_ids";

export function getFavorites() {
  const data = localStorage.getItem(FAV_KEY);
  return data ? JSON.parse(data) : [];
}

export function toggleFavorite(bookId) {
  let favs = getFavorites();
  if (favs.includes(bookId)) {
    favs = favs.filter(id => id !== bookId);
  } else {
    favs.push(bookId);
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  updateFavBadge();
  return favs.includes(bookId);
}

export function updateFavBadge() {
  const badge = document.getElementById("fav-count");
  if (badge) {
    badge.textContent = getFavorites().length;
  }
}
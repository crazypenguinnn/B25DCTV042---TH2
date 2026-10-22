import { getFavorites } from "./storage.js";

export function renderBooks(books, container) {
  container.innerHTML = "";
  const favIds = getFavorites();

  books.forEach(book => {
    // 1. Tạo container thẻ sách
    const card = document.createElement("article");
    card.className = "book-card";

    // 2. Nội dung text
    const title = document.createElement("h3");
    title.textContent = book.title;

    const info = document.createElement("p");
    info.className = "book-info";
    info.textContent = `Tác giả: ${book.author} | Năm: ${book.year}`;

    const tag = document.createElement("span");
    tag.className = "book-genre-tag";
    tag.textContent = book.genre;

    // 3. Khung nút bấm
    const actions = document.createElement("div");
    actions.className = "card-actions";

    const favBtn = document.createElement("button");
    const isFav = favIds.includes(String(book.id));
    favBtn.className = isFav ? "btn-fav favorited" : "btn-fav";
    favBtn.textContent = isFav ? "❤️ Đã thích" : "🤍 Yêu thích";
    favBtn.dataset.action = "favorite";
    favBtn.dataset.id = book.id;

    const delBtn = document.createElement("button");
    delBtn.className = "btn-del";
    delBtn.textContent = "Xóa";
    delBtn.dataset.action = "delete";
    delBtn.dataset.id = book.id;

    actions.append(favBtn, delBtn);
    card.append(title, info, tag, actions);
    container.appendChild(card);
  });
}
import { fetchBooks } from "./api.js";
import { renderBooks } from "./dom.js";
import { toggleFavorite, updateFavBadge } from "./storage.js";
import { validateForm, displayErrors } from "./validate.js";

// Trạng thái toàn cục
let allBooks = [];
let selectedGenre = "All";
let searchKeyword = "";

const bookGrid = document.getElementById("book-grid");
const searchInput = document.getElementById("search-input");
const genreContainer = document.getElementById("genre-buttons");
const statusText = document.getElementById("status-text");
const bookForm = document.getElementById("book-form");

// 1. Khởi động ứng dụng
async function init() {
  updateFavBadge();
  setupThemeToggle();
  allBooks = await fetchBooks();
  setupGenreFilter(allBooks);
  applyFilterAndRender();
}

// 2. Tạo danh sách nút thể loại bằng đối tượng Set
function setupGenreFilter(books) {
  const genres = ["All", ...new Set(books.map(b => b.genre))];
  genreContainer.innerHTML = "";

  genres.forEach(genre => {
    const btn = document.createElement("button");
    btn.className = genre === selectedGenre ? "genre-btn active" : "genre-btn";
    btn.textContent = genre === "All" ? "Tất cả" : genre;
    btn.addEventListener("click", () => {
      selectedGenre = genre;
      document.querySelectorAll(".genre-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilterAndRender();
    });
    genreContainer.appendChild(btn);
  });
}

// 3. Kết hợp 2 điều kiện: Tìm theo tên + Lọc theo thể loại
function applyFilterAndRender() {
  const filtered = allBooks.filter(book => {
    const matchName = book.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchName && matchGenre;
  });

  renderBooks(filtered, bookGrid);
  statusText.textContent = `Đang hiển thị ${filtered.length} / ${allBooks.length} cuốn`;
}

// 4. Lắng nghe tìm kiếm ngay khi gõ
searchInput.addEventListener("input", (e) => {
  searchKeyword = e.target.value.trim();
  applyFilterAndRender();
});

// 5. EVENT DELEGATION: Xử lý nút Yêu thích và nút Xóa trên lưới sách
bookGrid.addEventListener("click", (e) => {
  const target = e.target;
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (!action || !id) return;

  if (action === "favorite") {
    const isNowFav = toggleFavorite(id);
    target.className = isNowFav ? "btn-fav favorited" : "btn-fav";
    target.textContent = isNowFav ? "❤️ Đã thích" : "🤍 Yêu thích";
  }

  if (action === "delete") {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?");
    if (confirmed) {
      allBooks = allBooks.filter(b => String(b.id) !== String(id));
      setupGenreFilter(allBooks);
      applyFilterAndRender();
    }
  }
});

// 6. Xử lý Form thêm sách & Validate trực tiếp khi gõ
bookForm.addEventListener("input", () => {
  const formData = {
    title: document.getElementById("book-title").value,
    author: document.getElementById("book-author").value,
    genre: document.getElementById("book-genre").value,
    year: document.getElementById("book-year").value,
  };
  displayErrors(validateForm(formData));
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    title: document.getElementById("book-title").value,
    author: document.getElementById("book-author").value,
    genre: document.getElementById("book-genre").value,
    year: document.getElementById("book-year").value,
  };

  const errors = validateForm(formData);
  displayErrors(errors);

  if (Object.keys(errors).length === 0) {
    const newBook = {
      id: Date.now().toString(),
      ...formData,
      year: Number(formData.year)
    };

    // Thêm sách mới vào đầu danh sách
    allBooks.unshift(newBook);
    bookForm.reset();
    setupGenreFilter(allBooks);
    applyFilterAndRender();
  }
});

// 7. Chế độ sáng/tối (Yêu cầu nâng cao)
function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  btn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    document.body.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
  });
}

init();
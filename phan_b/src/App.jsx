import { useState } from "react";
import { initialBooks } from "./data/booksData";
import Header from "./components/Header";
import Section from "./components/Section";
import GenreFilter from "./components/GenreFilter";
import BookList from "./components/BookList";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [books] = useState(initialBooks);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [keyword, setKeyword] = useState("");

  const handleToggleFavorite = (bookId) => {
    setFavoriteIds((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  const filteredBooks = books.filter((book) => {
    const matchGenre = selectedGenre === "All" || book.genre === selectedGenre;
    const matchKeyword = book.title.toLowerCase().includes(keyword.toLowerCase());
    return matchGenre && matchKeyword;
  });

  return (
    <div className="app-wrapper">
      <Header favoriteCount={favoriteIds.length} />

      <main className="main-content">
        <Section title="Bộ Lọc & Tìm Kiếm" className="toolbar-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Tìm theo tên sách..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="search-input"
            />
          </div>

          <GenreFilter
            genres={genres}
            currentGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />

          <p className="status-indicator">
            Đang hiển thị: <strong>{filteredBooks.length}</strong> / {books.length} cuốn sách
          </p>
        </Section>

        <Section title="Danh Sách Sách Thư Viện">
          <BookList
            books={filteredBooks}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
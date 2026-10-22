export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <div className="card-top">
        <span className="genre-tag">{book.genre}</span>
        <span className="book-year">Năm: {book.year}</span>
      </div>

      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Tác giả: <strong>{book.author}</strong></p>

      <div className="card-actions">
        <button
          className={`btn-fav ${isFavorite ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? "❤️ Đã Thích" : "🤍 Yêu Thích"}
        </button>
      </div>
    </article>
  );
}
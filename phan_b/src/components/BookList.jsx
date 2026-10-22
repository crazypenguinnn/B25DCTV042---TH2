import BookCard from "./BookCard";

export default function BookList({ books, favoriteIds, onToggleFavorite }) {
  if (books.length === 0) {
    return <p className="empty-message">Không tìm thấy cuốn sách nào phù hợp.</p>;
  }

  return (
    <div className="book-grid">
      {/* Duyệt mảng và gán thuộc tính key={book.id} chuẩn React */}
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favoriteIds.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
export default function GenreFilter({ genres, currentGenre, onSelectGenre }) {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`btn-genre ${currentGenre === genre ? "active" : ""}`}
          onClick={() => onSelectGenre(genre)}
        >
          {genre === "All" ? "Tất cả thể loại" : genre}
        </button>
      ))}
    </div>
  );
}
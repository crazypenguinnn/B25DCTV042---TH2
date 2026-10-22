export default function Header({ favoriteCount }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand">
          <span className="logo-icon">📚</span>
          <h1>Thư Viện Lớp Học</h1>
        </div>
        <div className="fav-badge">
          ❤️ Yêu thích: <span className="fav-number">{favoriteCount}</span>
        </div>
      </div>
    </header>
  );
}
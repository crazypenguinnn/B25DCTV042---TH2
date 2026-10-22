export async function fetchBooks() {
  const feedback = document.getElementById("feedback-message");
  feedback.className = "feedback-box loading";
  feedback.textContent = "Đang tải danh sách sách từ hệ thống...";

  try {
    const res = await fetch("./books.json");
    if (!res.ok) throw new Error(`Lỗi kết nối HTTP: ${res.status}`);
    const data = await res.json();
    feedback.textContent = "";
    return data;
  } catch (err) {
    feedback.className = "feedback-box error";
    feedback.textContent = `⚠️ Đã có lỗi xảy ra: ${err.message}`;
    return [];
  }
}
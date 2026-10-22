# So sánh cách xây dựng giao diện giữa Phần A (DOM thuần) và Phần B (React)

## 1. Cách tiếp cận và Quản lý giao diện (UI Rendering)
* **Phần A (JavaScript DOM thuần):**
  - Sử dụng phương pháp **Imperative (mệnh lệnh)**: Lập trình viên phải trực tiếp tìm phần tử (`querySelector`), tự tay tạo thẻ (`createElement`), gán dữ liệu (`textContent`), và chèn vào DOM (`appendChild`).
  - Khi dữ liệu thay đổi (như lọc sách, bấm yêu thích), phải tự xóa giao diện cũ (`innerHTML = ""`) và vẽ lại toàn bộ, tốn công sức và dễ xảy ra lỗi không đồng bộ giữa dữ liệu và giao diện.
* **Phần B (React):**
  - Sử dụng phương pháp **Declarative (khai báo)**: Chỉ cần định nghĩa giao diện tương ứng với `state` thông qua JSX. Khi `state` thay đổi, React tự động so sánh qua Virtual DOM và chỉ cập nhật đúng phần tử cần đổi trên màn hình.

## 2. Quản lý trạng thái (State Management)
* **Phần A:** Trạng thái nằm rải rác ở các biến toàn cục (`let allBooks`, `let selectedGenre`) và trong DOM. Khi số lượng tương tác tăng lên, việc đồng bộ giữa header, danh sách và form rất phức tạp.
* **Phần B:** Trạng thái được tập trung tại một nơi bằng hook `useState`. Dữ liệu chảy một chiều từ component cha xuống component con qua `props`, giúp luồng dữ liệu minh bạch, dễ kiểm soát và bảo trì.

## 3. Khả năng tái sử dụng và Bảo trì code
* **Phần A:** Giao diện viết lẫn trong file HTML hoặc các chuỗi JavaScript, khó tách thành các khối nhỏ độc lập để tái sử dụng ở nơi khác.
* **Phần B:** Tư duy component hóa triệt để (`Header`, `Section`, `BookCard`, `GenreFilter`). Mỗi component phụ trách một nhiệm vụ riêng, có thể truyền `props` và `children` linh hoạt, giúp code gọn gàng và dễ mở rộng.
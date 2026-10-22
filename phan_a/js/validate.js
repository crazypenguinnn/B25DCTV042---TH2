export function validateForm(formData) {
  const currentYear = new Date().getFullYear();
  const errors = {};

  if (!formData.title || formData.title.trim().length < 3) {
    errors.title = "Tên sách phải có tối thiểu 3 ký tự.";
  }

  if (!formData.author || formData.author.trim() === "") {
    errors.author = "Tác giả là thông tin bắt buộc.";
  }

  if (!formData.genre) {
    errors.genre = "Vui lòng chọn thể loại.";
  }

  const yearNum = Number(formData.year);
  if (!formData.year || yearNum < 1900 || yearNum > currentYear) {
    errors.year = `Năm xuất bản phải từ 1900 đến ${currentYear}.`;
  }

  return errors;
}

export function displayErrors(errors) {
  ["title", "author", "genre", "year"].forEach(field => {
    const errorEl = document.getElementById(`error-${field}`);
    if (errorEl) {
      errorEl.textContent = errors[field] || "";
    }
  });
}
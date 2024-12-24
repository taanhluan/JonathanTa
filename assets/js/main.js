// Toggle content visibility with animation
function toggleContent(button) {
  const content = button.parentElement.previousElementSibling; // Lấy nội dung liên quan
  const isCollapsed = content.classList.toggle('collapsed'); // Đổi trạng thái ẩn/hiện

  // Thay đổi văn bản và biểu tượng
  button.textContent = isCollapsed ? 'Expand' : 'Collapse';
  const icon = button.querySelector('i');
  if (icon) {
    icon.className = isCollapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
  }

  // Thêm hiệu ứng mượt mà
  if (isCollapsed) {
    content.style.maxHeight = '0';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

// Download the resume as a PDF
function downloadResume() {
  const resume = document.getElementById('resume'); // Lấy phần tử resume

  // Tùy chọn nâng cao cho html2pdf
  const options = {
    margin: [0.5, 0.5, 0.5, 0.5], // Lề trên, dưới, trái, phải
    filename: 'TaAnhLuan_Resume.pdf', // Tên file PDF
    image: { type: 'jpeg', quality: 0.98 }, // Chất lượng hình ảnh
    html2canvas: {
      scale: 2, // Tăng độ phân giải
      useCORS: true, // Đảm bảo tải hình ảnh từ các URL bên ngoài
      allowTaint: true, // Hỗ trợ các hình ảnh chưa được xử lý CORS
    },
    jsPDF: {
      unit: 'in', // Đơn vị đo
      format: 'letter', // Kích thước trang (Letter hoặc A4)
      orientation: 'portrait', // Hướng dọc
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'], // Ngắt trang thông minh
      after: '.section, .about', // Ngắt sau các phần chính
    },
  };

  // Áp dụng và xuất PDF
  html2pdf()
    .set(options)
    .from(resume)
    .toPdf()
    .get('pdf')
    .then((pdf) => {
      // Nếu cần thêm nội dung như header/footer vào PDF, bạn có thể tùy chỉnh tại đây
      console.log('PDF Generated Successfully!');
    })
    .save(); // Tự động tải PDF
}

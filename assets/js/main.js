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
document.addEventListener('DOMContentLoaded', () => {
  // Tìm nút download bằng ID
  const downloadButton = document.getElementById('download-btn');
  
  // Kiểm tra nếu nút tồn tại
  if (downloadButton) {
    // Gắn sự kiện click
    downloadButton.addEventListener('click', () => {
      const resume = document.getElementById('resume'); // Phần cần tải PDF
      
      if (resume) {
        // Thêm lớp CSS chỉ dành cho PDF
        resume.classList.add('pdf-export');

        // Tùy chọn cho html2pdf
        const options = {
          margin: 0.5, // Lề
          filename: 'TaAnhLuan_Resume.pdf', // Tên file
          image: { type: 'jpeg', quality: 0.98 }, // Chất lượng hình ảnh
          html2canvas: {
            scale: 2, // Độ phân giải cao
            useCORS: true, // Xử lý hình ảnh bên ngoài
          },
          jsPDF: {
            unit: 'in',
            format: 'letter', // Kích thước trang
            orientation: 'portrait', // Hướng dọc
          },
          pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'], // Ngắt trang thông minh
            after: '.section, .about', // Ngắt trang sau các phần này
          },
        };

        // Tạo PDF và tải xuống
        html2pdf()
          .set(options)
          .from(resume)
          .save()
          .finally(() => {
            // Xóa lớp CSS sau khi tạo PDF
            resume.classList.remove('pdf-export');
          });
      } else {
        console.error('Resume section not found!');
      }
    });
  } else {
    console.error('Download button not found!');
  }
});

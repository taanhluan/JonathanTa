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
  const downloadButton = document.getElementById('download-btn');

  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      const resume = document.getElementById('resume');

      if (resume) {
        resume.classList.add('pdf-export'); // Thêm lớp CSS cho PDF

        const options = {
          margin: 0.5,
          filename: 'TaAnhLuan_Resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'], after: '.section' },
        };

        html2pdf()
          .set(options)
          .from(resume)
          .save()
          .finally(() => {
            resume.classList.remove('pdf-export'); // Xóa lớp CSS sau khi tạo PDF
          });
      } else {
        console.error('Resume section not found!');
      }
    });
  } else {
    console.error('Download button not found!');
  }
});

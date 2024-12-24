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
        // Mở toàn bộ các phần collapsible
        const collapsibles = document.querySelectorAll('.collapsible');
        collapsibles.forEach((collapsible) => {
          const content = collapsible.nextElementSibling;
          if (content) {
            content.style.maxHeight = 'none';
            content.style.display = 'block'; // Hiển thị nội dung
          }
        });

        // Thêm lớp tối ưu hóa PDF
        resume.classList.add('pdf-export');

        const options = {
          margin: 0.5,
          filename: 'TaAnhLuan_Resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
          },
          jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait',
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'], after: '.section' },
        };

        // Tạo PDF
        html2pdf()
          .set(options)
          .from(resume)
          .save()
          .finally(() => {
            // Đóng lại các collapsible sau khi xuất PDF
            collapsibles.forEach((collapsible) => {
              const content = collapsible.nextElementSibling;
              if (content) {
                content.style.maxHeight = '0';
                content.style.display = 'none'; // Ẩn nội dung
              }
            });
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


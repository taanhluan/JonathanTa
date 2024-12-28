// Toggle content visibility with animation
function toggleContent(button) {
  const content = button.parentElement.previousElementSibling; // Lấy nội dung liên quan
  if (!content) {
    console.error('Content not found for toggling.');
    return;
  }

  const isCollapsed = content.classList.toggle('collapsed'); // Đổi trạng thái ẩn/hiện

  // Thay đổi văn bản và biểu tượng
  button.textContent = isCollapsed ? 'Expand' : 'Collapse';
  const icon = button.querySelector('i');
  if (icon) {
    icon.className = isCollapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
  }

  // Hiệu ứng mượt mà
  if (isCollapsed) {
    content.style.maxHeight = '0';
  } else {
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
  content.style.transition = 'max-height 0.3s ease';
}

// Hàm mở hoặc đóng tất cả collapsibles
function toggleAllCollapsibles(show = true) {
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach((collapsible) => {
    const content = collapsible.nextElementSibling;
    if (content) {
      if (show) {
        content.style.maxHeight = `${content.scrollHeight}px`;
        content.style.display = 'block';
      } else {
        content.style.maxHeight = '0';
        content.style.display = 'none';
      }
    }
  });
}

// Download the resume as a PDF
document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('download-btn');

  if (downloadButton) {
    downloadButton.addEventListener('click', async () => {
      const resume = document.getElementById('resume');

      if (resume) {
        try {
          // Mở toàn bộ các phần collapsible
          toggleAllCollapsibles(true);

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
          await html2pdf().set(options).from(resume).save();

        } catch (error) {
          console.error('Error during PDF generation:', error);
        } finally {
          // Đóng lại các collapsibles sau khi xuất PDF
          toggleAllCollapsibles(false);
          resume.classList.remove('pdf-export');
        }
      } else {
        console.error('Resume section not found!');
      }
    });
  } else {
    console.error('Download button not found!');
  }
});

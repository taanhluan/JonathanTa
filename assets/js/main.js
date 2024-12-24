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
  const resume = document.getElementById('resume'); // Lấy phần nội dung cần tải
  const options = {
    margin: 0.5,
    filename: 'TaAnhLuan_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // Sử dụng html2pdf để tạo PDF
  html2pdf().set(options).from(resume).save();
}

// Initialize the page after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Gắn sự kiện cho các nút toggle
  const toggleButtons = document.querySelectorAll('.collapsible button');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => toggleContent(button));
  });

  // Thiết lập trạng thái ban đầu cho nội dung collapsible
  const collapsibleContents = document.querySelectorAll('.content');
  collapsibleContents.forEach(content => {
    if (content.classList.contains('collapsed')) {
      content.style.maxHeight = '0';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });

  // Gắn sự kiện cho nút download
  const downloadButton = document.getElementById('download-btn');
  if (downloadButton) {
    downloadButton.addEventListener('click', downloadResume);
  }
});



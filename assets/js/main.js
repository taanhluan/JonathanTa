// Toggle content visibility with animation
function toggleContent(button) {
  const content = button.parentElement.previousElementSibling; // Lấy nội dung liên quan
  if (!content) {
    console.error("Content not found for toggling.");
    return;
  }

  const isCollapsed = content.classList.toggle("collapsed"); // Đổi trạng thái ẩn/hiện

  // Thay đổi văn bản và biểu tượng
  button.textContent = isCollapsed ? "Mở rộng" : "Thu gọn";
  const icon = button.querySelector("i");
  if (icon) {
    icon.className = isCollapsed ? "fas fa-chevron-down" : "fas fa-chevron-up";
  }

  // Hiệu ứng mượt mà
  content.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
  content.style.maxHeight = isCollapsed ? "0" : `${content.scrollHeight}px`;
  content.style.opacity = isCollapsed ? "0" : "1";
}

// Mở hoặc đóng tất cả các collapsibles
function toggleAllCollapsibles(show = true) {
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach((collapsible) => {
    const content = collapsible.nextElementSibling;
    if (content) {
      content.style.transition = "none"; // Tắt hiệu ứng tạm thời
      content.style.maxHeight = show ? `${content.scrollHeight}px` : "0";
      content.style.display = show ? "block" : "none";
      content.style.opacity = show ? "1" : "0";
    }
  });
}

// Download the resume as a PDF
document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("download-btn");

  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      const resume = document.getElementById("resume");

      if (resume) {
        try {
          // Mở toàn bộ các phần collapsible trước khi xuất PDF
          toggleAllCollapsibles(true);

          // Thêm lớp tối ưu hóa PDF
          resume.classList.add("pdf-export");

          const options = {
            margin: 0.5,
            filename: "TaAnhLuan_Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
            },
            jsPDF: {
              unit: "in",
              format: "letter",
              orientation: "portrait",
            },
            pagebreak: { mode: ["avoid-all", "css", "legacy"], after: ".section" },
          };

          // Tạo PDF
          await html2pdf().set(options).from(resume).save();
        } catch (error) {
          console.error("Lỗi khi xuất PDF:", error);
        } finally {
          // Đóng lại các collapsibles sau khi hoàn tất
          toggleAllCollapsibles(false);
          resume.classList.remove("pdf-export");
        }
      } else {
        console.error("Không tìm thấy phần hồ sơ để xuất PDF!");
      }
    });
  } else {
    console.error("Không tìm thấy nút tải xuống!");
  }
});

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

// Mở hoặc đóng tất cả các collapsibles và cập nhật trạng thái nút
function toggleAllCollapsibles(show = true) {
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach((collapsible) => {
    const content = collapsible.nextElementSibling;
    if (content) {
      content.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
      content.style.maxHeight = show ? `${content.scrollHeight}px` : "0";
      content.style.opacity = show ? "1" : "0";
    }
  });

  // Cập nhật văn bản của nút toggle all
  const toggleAllButton = document.getElementById("toggle-all-btn");
  if (toggleAllButton) {
    toggleAllButton.textContent = show ? "Thu gọn tất cả" : "Mở rộng tất cả";
  }
}

// Download the resume as a PDF with a loading indicator
document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("download-btn");
  const loadingIndicator = document.createElement("div");
  loadingIndicator.textContent = "Đang tạo PDF...";
  loadingIndicator.style.display = "none";
  loadingIndicator.style.position = "fixed";
  loadingIndicator.style.top = "50%";
  loadingIndicator.style.left = "50%";
  loadingIndicator.style.transform = "translate(-50%, -50%)";
  loadingIndicator.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  loadingIndicator.style.color = "white";
  loadingIndicator.style.padding = "10px 20px";
  loadingIndicator.style.borderRadius = "5px";
  loadingIndicator.style.zIndex = "1000";
  document.body.appendChild(loadingIndicator);

  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      const resume = document.getElementById("resume");

      if (resume) {
        try {
          // Hiển thị loading indicator
          loadingIndicator.style.display = "block";

          // Mở toàn bộ collapsibles trước khi xuất PDF
          toggleAllCollapsibles(true);
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
          // Ẩn loading indicator
          loadingIndicator.style.display = "none";
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

document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("download-btn");

  // Tạo Loading Indicator với tiến trình %
  const loadingIndicator = document.createElement("div");
  loadingIndicator.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
      <svg width="50" height="50">
        <circle cx="25" cy="25" r="20" stroke="#ddd" stroke-width="5" fill="none"></circle>
        <circle id="progressCircle" cx="25" cy="25" r="20" stroke="#3498db" stroke-width="5" fill="none"
            stroke-dasharray="125.6" stroke-dashoffset="125.6" stroke-linecap="round"></circle>
      </svg>
      <div id="progressText" style="color: white; font-size: 16px;">0%</div>
      <span style="color: white;">Đang tạo PDF...</span>
    </div>
  `;
  Object.assign(loadingIndicator.style, {
    display: "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    zIndex: "1000",
  });
  document.body.appendChild(loadingIndicator);

  // Hàm cập nhật tiến trình %
  function updateProgress(percent) {
    const circle = document.getElementById("progressCircle");
    const text = document.getElementById("progressText");
    const circumference = 2 * Math.PI * 20;
    circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    text.textContent = `${percent}%`;
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      const resume = document.getElementById("resume");

      if (resume) {
        try {
          loadingIndicator.style.display = "block";
          downloadButton.textContent = "Đang tải...";

          toggleAllCollapsibles(true);

          document.querySelectorAll(".content").forEach((el) => {
            el.style.display = "block";
            el.style.maxHeight = "none";
            el.style.opacity = "1";
          });

          resume.classList.add("pdf-export");

          // Giả lập tiến trình từ 0 → 100%
          let percent = 0;
          const progressInterval = setInterval(() => {
            if (percent >= 100) {
              clearInterval(progressInterval);
            } else {
              updateProgress(percent);
              percent += 10;
            }
          }, 300);

          // Đợi cập nhật DOM trước khi xuất PDF
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const options = {
            margin: 0.5,
            filename: "Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollY: 0, allowTaint: true, imageTimeout: 5000 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css"], after: ".section, .pdf-footer" },
          };

          await html2pdf().set(options).from(resume).save();
        } catch (error) {
          console.error("Lỗi khi xuất PDF:", error);
        } finally {
          loadingIndicator.style.display = "none";
          downloadButton.textContent = "Tải xuống PDF";
          toggleAllCollapsibles(false);
          resume.classList.remove("pdf-export");
        }
      } else {
        console.error("Không tìm thấy nội dung để xuất PDF!");
      }
    });
  } else {
    console.error("Không tìm thấy nút tải xuống!");
  }
});

// Toggle nội dung với hiệu ứng
function toggleContent(button) {
  const content = button.parentElement.previousElementSibling;
  if (!content) {
    console.error("Content not found for toggling.");
    return;
  }

  const isCollapsed = content.classList.toggle("collapsed");

  button.textContent = isCollapsed ? "Mở rộng" : "Thu gọn";
  const icon = button.querySelector("i");
  if (icon) {
    icon.className = isCollapsed ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up";
  }

  content.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
  content.style.maxHeight = isCollapsed ? "0" : `${content.scrollHeight}px`;
  content.style.opacity = isCollapsed ? "0" : "1";
}

// Mở rộng hoặc thu gọn tất cả nội dung
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

  const toggleAllButton = document.getElementById("toggle-all-btn");
  if (toggleAllButton) {
    toggleAllButton.textContent = show ? "Thu gọn tất cả" : "Mở rộng tất cả";
  }
}

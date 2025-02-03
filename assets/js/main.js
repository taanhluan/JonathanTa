// Toggle content visibility with animation
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

document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("download-btn");

  // Loading Indicator (Cải tiến UI)
  const loadingIndicator = document.createElement("div");
  loadingIndicator.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span class="loader"></span> Đang tạo PDF...
    </div>
  `;
  loadingIndicator.style.display = "none";
  loadingIndicator.style.position = "fixed";
  loadingIndicator.style.top = "50%";
  loadingIndicator.style.left = "50%";
  loadingIndicator.style.transform = "translate(-50%, -50%)";
  loadingIndicator.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  loadingIndicator.style.color = "white";
  loadingIndicator.style.padding = "15px 25px";
  loadingIndicator.style.borderRadius = "8px";
  loadingIndicator.style.zIndex = "1000";
  loadingIndicator.style.fontSize = "16px";
  document.body.appendChild(loadingIndicator);

  // Loading Spinner
  const loaderStyle = document.createElement("style");
  loaderStyle.innerHTML = `
    .loader {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid #fff;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(loaderStyle);

  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      const resume = document.getElementById("resume");

      if (resume) {
        try {
          loadingIndicator.style.display = "block";
          toggleAllCollapsibles(true);
          resume.classList.add("pdf-export");

          // Chờ 20000ms để đảm bảo tất cả nội dung đã hiển thị
          await new Promise((resolve) => setTimeout(resolve, 20000));

          const options = {
            margin: 0.5,
            filename: "Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollY: 0, allowTaint: true, imageTimeout: 5000 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css"], after: ".section, .pdf-footer" }
          };

          await html2pdf().set(options).from(resume).save();
        } catch (error) {
          console.error("Lỗi khi xuất PDF:", error);
        } finally {
          loadingIndicator.style.display = "none";
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

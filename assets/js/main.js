document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script initialized.");

  // Chức năng tải xuống PDF
  const downloadButton = document.getElementById("download");
  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      const resume = document.getElementById("resume");
      await html2pdf().from(resume).set({
        margin: 10,
        filename: "resume_ta_anh_luan.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      }).save();
    });
  }

  // Hiệu ứng nền động cho body dựa trên vị trí chuột
  document.addEventListener("mousemove", (e) => {
    const body = document.body;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    body.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb)`;
  });

  // Hiệu ứng nền động cho container dựa trên vị trí chuột
  const container = document.querySelector(".container");
  if (container) {
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e; // Lấy vị trí chuột
      const { left, top, width, height } = container.getBoundingClientRect(); // Kích thước của container
      const xPercent = ((clientX - left) / width) * 30; // Phần trăm ngang
      const yPercent = ((clientY - top) / height) * 30; // Phần trăm dọc

      // Cập nhật vị trí background của container
      container.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });
  }

  // Chức năng chuyển đổi giữa chế độ sáng và tối
  const toggleThemeButton = document.getElementById("toggle-theme");
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // CSS cho chế độ tối
  const darkModeCSS = `
    body.dark-mode {
      background-color: #2c3e50;
      color: #ecf0f1;
    }

    .header, .about, .experience, .footer {
      background-color: #34495e;
      color: #ecf0f1;
    }

    .collapsible {
      background-color: #3b5998;
      color: #ecf0f1;
    }
  `;

  // Thêm CSS chế độ tối vào trang
  const styleSheet = document.createElement("style");
  styleSheet.innerText = darkModeCSS;
  document.head.appendChild(styleSheet);
});

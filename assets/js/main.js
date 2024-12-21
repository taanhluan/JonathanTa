document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script initialized.");

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

  // Hiệu ứng nền động theo vị trí chuột
  document.addEventListener("mousemove", (e) => {
    const container = document.querySelector(".container"); // Tìm phần tử container
    if (container) {
      const { clientX, clientY } = e; // Lấy vị trí chuột
      const { left, top, width, height } = container.getBoundingClientRect(); // Kích thước của container
      const xPercent = ((clientX - left) / width) * 100; // Phần trăm ngang
      const yPercent = ((clientY - top) / height) * 100; // Phần trăm dọc

      // Cập nhật vị trí background dựa trên vị trí chuột
      container.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    }
  });
});

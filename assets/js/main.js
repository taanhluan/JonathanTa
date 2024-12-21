document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script initialized.");

  const downloadButton = document.getElementById("download");
  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      // Mở rộng tất cả các phần "collapsible"
      const collapsibles = document.querySelectorAll(".collapsible");
      const hiddenContents = []; // Danh sách phần đã ẩn
      collapsibles.forEach((collapsible) => {
        const content = collapsible.nextElementSibling;
        if (content && !content.classList.contains("show")) {
          hiddenContents.push(content); // Ghi lại phần đã ẩn
          content.classList.add("show");
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });

      // Đảm bảo hiển thị footer
      const footer = document.querySelector(".footer");
      if (footer) footer.style.display = "block";

      // Tạo PDF
      try {
        const resume = document.querySelector(".container");
        if (!resume) throw new Error("Không tìm thấy phần tử 'container'.");
        await html2pdf()
          .from(resume)
          .set({
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
          })
          .save();
      } catch (error) {
        console.error("Lỗi khi tạo PDF:", error.message);
      }

      // Thu nhỏ lại các phần "collapsible" đã ẩn trước đó
      hiddenContents.forEach((content) => {
        content.classList.remove("show");
        content.style.maxHeight = null;
      });
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
      const xPercent = ((clientX - left) / width) * 100; // Phần trăm ngang
      const yPercent = ((clientY - top) / height) * 100; // Phần trăm dọc

      // Cập nhật vị trí background của container
      container.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });
  }
});

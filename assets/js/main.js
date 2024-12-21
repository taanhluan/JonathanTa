document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script initialized.");

  const downloadButton = document.getElementById("download");
  if (downloadButton) {
    downloadButton.addEventListener("click", async () => {
      // Expand all collapsibles
      const collapsibles = document.querySelectorAll(".collapsible");
      const hiddenContents = []; // Track hidden sections
      collapsibles.forEach((collapsible) => {
        const content = collapsible.nextElementSibling;
        if (!content.classList.contains("show")) {
          hiddenContents.push(content); // Track which sections were hidden
          content.classList.add("show");
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });

      // Ensure footer visibility
      const footer = document.querySelector(".footer");
      if (footer) footer.style.display = "block";

      // Generate PDF
      const resume = document.querySelector(".container");
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

      // Collapse sections that were previously hidden
      hiddenContents.forEach((content) => {
        content.classList.remove("show");
        content.style.maxHeight = null;
      });
    });
  }
});

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

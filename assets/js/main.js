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
});

  // Hiệu ứng nền động cho body dựa trên vị trí chuột
  document.addEventListener("mousemove", (e) => {
    const body = document.body;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    body.style.background = radial-gradient(circle at ${x * 100}% ${y * 100}%, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb);
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
      container.style.backgroundPosition = ${xPercent}% ${yPercent}%;
    });
  }
});

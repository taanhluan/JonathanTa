document.addEventListener("DOMContentLoaded", () => {
  console.log("About section initialized.");
  // About-specific JavaScript
  const aboutSection = document.querySelector(".about");
  aboutSection.addEventListener("mouseover", () => {
    aboutSection.style.backgroundColor = "#f0f8ff";
  });
  aboutSection.addEventListener("mouseout", () => {
    aboutSection.style.backgroundColor = "";
  });
});

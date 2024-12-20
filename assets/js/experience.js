document.addEventListener("DOMContentLoaded", () => {
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((collapsible) => {
    collapsible.addEventListener("click", () => {
      const content = collapsible.nextElementSibling;
      const icon = collapsible.querySelector("i");
      content.classList.toggle("show");
      icon.classList.toggle("rotate");
    });
  });

  console.log("Experience section initialized.");
});

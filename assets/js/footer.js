document.addEventListener("DOMContentLoaded", () => {
  console.log("Footer section initialized.");
  // Footer-specific JavaScript
  const emailLink = document.querySelector(".footer a[href^='mailto']");
  emailLink.addEventListener("click", (event) => {
    alert("Sending email to: " + emailLink.textContent);
  });
});

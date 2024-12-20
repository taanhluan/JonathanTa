document.addEventListener("DOMContentLoaded", () => {
  console.log("Header section initialized.");
  // Header-specific JavaScript here
  const profilePhoto = document.querySelector(".profile-photo img");
  profilePhoto.addEventListener("click", () => {
    alert("Profile photo clicked!");
  });
});

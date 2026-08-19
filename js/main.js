// Route suggestion form (mockup — no backend, shows confirmation only)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("route-suggestion-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const box = document.getElementById("route-suggestion-confirm");
      form.style.display = "none";
      if (box) box.style.display = "block";
    });
  }
});

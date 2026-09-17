// Route suggestion form — sends via the send-inquiry Netlify Function.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("route-suggestion-form");
  if (!form) return;

  const submitBtn = document.getElementById("route-suggestion-submit-btn");
  const confirmBox = document.getElementById("route-suggestion-confirm");
  const errorBox = document.getElementById("route-suggestion-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (errorBox) errorBox.style.display = "none";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const payload = {
      type: "route-suggestion",
      name: document.getElementById("rs-name").value,
      email: document.getElementById("rs-email").value,
      route: document.getElementById("rs-route").value,
      notes: document.getElementById("rs-notes").value,
    };

    try {
      const res = await fetch("/.netlify/functions/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Send failed");

      form.style.display = "none";
      if (confirmBox) confirmBox.style.display = "block";
    } catch (err) {
      console.error("Route suggestion submission failed:", err);
      if (errorBox) {
        errorBox.textContent = "Sorry, something went wrong sending your suggestion. Please reach us directly instead.";
        errorBox.style.display = "block";
      }
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Suggestion";
    }
  });
});

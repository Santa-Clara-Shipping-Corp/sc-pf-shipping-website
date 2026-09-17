/*
  Contact info now lives in data/contact.json — staff edit this file
  (directly, or through the /admin CMS panel) to update office and port
  contact numbers. This script fetches it and renders both tables.
*/

async function renderContact() {
  const officeBody = document.getElementById("main-office-body");
  const portsBody = document.getElementById("ports-body");
  if (!officeBody && !portsBody) return;

  try {
    const res = await fetch("data/contact.json");
    const data = await res.json();

    if (officeBody) {
      const o = data.mainOffice;
      officeBody.innerHTML = `
        <tr><td><strong>Company Names</strong></td><td>${o.companyNames}</td></tr>
        <tr><td><strong>Address</strong></td><td>${o.address}</td></tr>
        <tr><td><strong>Landline</strong></td><td>${o.landline}</td></tr>
        <tr><td><strong>Globe</strong></td><td>${o.globe}</td></tr>
        <tr><td><strong>Smart</strong></td><td>${o.smart}</td></tr>
        <tr><td><strong>Viber for cargo bookings</strong></td><td>${o.viberCargo}</td></tr>
        <tr><td><strong>Email (Santa Clara)</strong></td><td>${o.emailSantaClara}</td></tr>
        <tr><td><strong>Email (Penafrancia)</strong></td><td>${o.emailPenafrancia}</td></tr>
      `;
    }

    if (portsBody) {
      portsBody.innerHTML = data.ports.map(p => `
        <tr><td>${p.name}</td><td>${p.phone && p.phone.trim() ? p.phone : "N/A"}</td></tr>
      `).join("");
    }
  } catch (err) {
    if (officeBody) officeBody.innerHTML = `<tr><td colspan="2">Contact info is temporarily unavailable.</td></tr>`;
    if (portsBody) portsBody.innerHTML = `<tr><td colspan="2">Contact info is temporarily unavailable.</td></tr>`;
    console.error("Failed to load contact data:", err);
  }
}

document.addEventListener("DOMContentLoaded", renderContact);

// Contact form — sends via the send-inquiry Netlify Function, routed by
// selected subject to the right inbox (see netlify/functions/send-inquiry.js).
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("contact-submit-btn");
  const confirmBox = document.getElementById("contact-confirm");
  const errorBox = document.getElementById("contact-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (errorBox) errorBox.style.display = "none";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const payload = {
      type: "contact",
      name: document.getElementById("c-name").value,
      email: document.getElementById("c-email").value,
      subject: document.getElementById("c-subject").value,
      message: document.getElementById("c-message").value,
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
      console.error("Contact form submission failed:", err);
      if (errorBox) {
        errorBox.textContent = "Sorry, something went wrong sending your message. Please reach us directly using the details above.";
        errorBox.style.display = "block";
      }
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
});

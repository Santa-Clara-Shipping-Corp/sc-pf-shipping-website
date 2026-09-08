async function renderCareers() {
  try {
    const res = await fetch("data/careers.json");
    const data = await res.json();

    document.getElementById("apprenticeship-intro").textContent = data.apprenticeshipIntro;

    const tableBody = document.getElementById("apprenticeship-table-body");
    tableBody.innerHTML = (data.apprenticeshipTable || []).map(row => `
      <tr><td><strong>${row.label}</strong></td><td>${row.description}</td></tr>
    `).join("");

    document.getElementById("requirements-text").textContent = data.requirementsText;
    document.getElementById("how-to-apply").innerHTML = data.howToApply;

    const openRolesIntroEl = document.getElementById("open-roles-intro");
    if (openRolesIntroEl) openRolesIntroEl.innerHTML = data.openRolesIntro || "";

    const openRolesGrid = document.getElementById("open-roles-grid");
    if (openRolesGrid) {
      if (data.openRoles && data.openRoles.length > 0) {
        openRolesGrid.innerHTML = data.openRoles.map(role => `
          <div class="card vessel-card">
            <img class="card-img" src="${role.image}" alt="${role.title}">
            <div class="card-body">
              <h3>${role.title}</h3>
            </div>
          </div>
        `).join("");
      } else {
        openRolesGrid.innerHTML = `<div class="note-box">No open roles at the moment. In the meantime, you can reach out via email or through our <a href="contact.html">contact form</a> to inquire.</div>`;
      }
    }
  } catch (e) {
    console.error("Failed to load careers content", e);
  }
}

document.addEventListener("DOMContentLoaded", renderCareers);

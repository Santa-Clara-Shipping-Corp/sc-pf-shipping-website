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

    const openRolesEl = document.getElementById("open-roles");
    if (data.openRoles && data.openRoles.length > 0) {
      openRolesEl.innerHTML = data.openRoles.map(role => `
        <div class="note-box" style="margin-bottom:12px;">
          <strong>${role.title}</strong><br>${role.description}
        </div>
      `).join("");
    } else {
      openRolesEl.innerHTML = `<div class="note-box">${data.openRolesNote}</div>`;
    }
  } catch (e) {
    console.error("Failed to load careers content", e);
  }
}

document.addEventListener("DOMContentLoaded", renderCareers);

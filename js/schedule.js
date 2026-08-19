/*
  Schedule data now lives in data/schedule.json — this is the file staff
  edit (directly, or through the /admin CMS panel) to update the published
  schedule. This script just fetches it and renders the table.

  Each route = { route, strait, vessels, days, departures }
*/

async function renderSchedule() {
  const tbody = document.getElementById("schedule-body");
  if (!tbody) return;
  try {
    const res = await fetch("data/schedule.json");
    const { routes: SCHEDULE_DATA } = await res.json();
    tbody.innerHTML = SCHEDULE_DATA.map(r => `
      <tr>
        <td><span class="route-badge">${r.route}</span></td>
        <td>${r.vessels}</td>
        <td>${r.days}</td>
        <td>${r.departures}</td>
      </tr>
    `).join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4">Schedule is temporarily unavailable. Please contact us directly.</td></tr>`;
    console.error("Failed to load schedule data:", err);
  }
}

document.addEventListener("DOMContentLoaded", renderSchedule);

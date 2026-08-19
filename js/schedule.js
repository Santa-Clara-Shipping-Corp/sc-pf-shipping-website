/*
  Schedule data — sourced from Santa Clara / Penafrancia staff's routes
  and daily schedule notes (Aug 2026). This is the file staff would edit
  to update the published schedule. In a production build this would
  instead be a small admin form writing to a database, but a flat,
  well-commented array like this is deliberately easy for non-technical
  staff to hand-edit and deploy quickly for the mockup / early launch.

  Each route = { from, to, vessel, days, departure, note }
  Departure times below reflect the schedule as provided by staff. Several
  routes note that timing can shift day-to-day depending on passenger/cargo
  volume — that caveat is included in the relevant rows.
*/
const SCHEDULE_DATA = [
  {
    route: "Pio Duran, Albay ↔ Masbate City",
    strait: "Ticao Pass",
    vessels: "M/V Almirante Federico, M/V Don Eduardo",
    days: "Daily",
    departures: "Pio Duran: 7:00 AM & 7:00 PM · Masbate City: 1:00 PM & 4:00 PM (schedule may shift depending on truck/bus/passenger volume)",
  },
  {
    route: "Matnog, Sorsogon ↔ Jubasan, Allen (Northern Samar)",
    strait: "San Bernardino Strait",
    vessels: "M/V Jack Daniel, M/V King Frederick, M/V Nelvin Jules, M/V Anthon Raphael, M/V Renzo Louie",
    days: "Daily, 24/7",
    departures: "No fixed schedule — 4–5 vessels run continuously, roughly every 2–3 hours",
  },
  {
    route: "Tabaco City ↔ Virac, Catanduanes",
    strait: "Lagonoy Gulf",
    vessels: "M/V Dawn Antonio",
    days: "Daily",
    departures: "Tabaco City: 6:30 AM · Virac: 6:30 PM",
  },
  {
    route: "Hilongos, Leyte ↔ Ubay, Bohol",
    strait: "Camotes Sea",
    vessels: "M/V Hansel Jobett (Penafrancia route — a Santa Clara vessel covers during Penafrancia's drydocking, roughly every 2 years)",
    days: "Daily",
    departures: "Hilongos: 8:00 AM · Ubay: 1:00 PM",
  },
  {
    route: "Palompon, Leyte ↔ Matnog, Sorsogon",
    strait: "Visayan Sea",
    vessels: "M/V Steve Albert, M/V Lance Daniel (+2 more vessels per source records — names not on file)",
    days: "Daily",
    departures: "Daily trip both directions (schedule may shift depending on volume)",
  },
  {
    route: "Maasin, Leyte ↔ Lipata, Surigao",
    strait: "Surigao Strait",
    vessels: "M/V Fritz Elson",
    days: "Daily",
    departures: "Daily trip both directions (schedule may shift depending on volume)",
  },
];

function renderSchedule() {
  const tbody = document.getElementById("schedule-body");
  if (!tbody) return;
  tbody.innerHTML = SCHEDULE_DATA.map(r => `
    <tr>
      <td><span class="route-badge">${r.route}</span></td>
      <td>${r.vessels}</td>
      <td>${r.days}</td>
      <td>${r.departures}</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderSchedule);

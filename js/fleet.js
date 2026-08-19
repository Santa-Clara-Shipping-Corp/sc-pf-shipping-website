/*
  Fleet page — vessel and port cards, plus click-to-expand popups.
  All vessel/port data now lives in data/vessels.json and data/ports.json —
  staff add, edit, or remove ships/ports (including photos) through those
  files or the /admin CMS panel, and the cards + popup content are rendered
  from that data. Missing values are shown as "N/A" rather than invented.
*/

function vesselCardHtml(v) {
  return `
    <div class="card vessel-card" data-type="vessel" data-name="${v.name}">
      <img class="card-img" src="${v.image}" alt="${v.name}">
      <div class="card-body">
        <h3>${v.name}</h3>
      </div>
    </div>
  `;
}

function portCardHtml(p) {
  return `
    <div class="card vessel-card" data-type="port" data-name="${p.name}">
      <img class="card-img" src="${p.image}" alt="${p.name}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.location || ""}</p>
      </div>
    </div>
  `;
}

function specRow(label, value) {
  const display = value === undefined || value === null || value === "" ? "N/A" : value;
  return `<li><span>${label}</span><strong>${display}</strong></li>`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const scscGrid = document.getElementById("scsc-grid");
  const pscGrid = document.getElementById("psc-grid");
  const portsGrid = document.getElementById("ports-grid");
  const overlay = document.getElementById("vessel-modal-overlay");

  let vesselData = { scsc: [], psc: [] };
  let portData = [];

  try {
    const [vRes, pRes] = await Promise.all([
      fetch("data/vessels.json"),
      fetch("data/ports.json"),
    ]);
    vesselData = await vRes.json();
    portData = (await pRes.json()).ports;
  } catch (err) {
    console.error("Failed to load fleet data:", err);
    if (scscGrid) scscGrid.innerHTML = "<p>Fleet data is temporarily unavailable.</p>";
    if (pscGrid) pscGrid.innerHTML = "<p>Fleet data is temporarily unavailable.</p>";
    if (portsGrid) portsGrid.innerHTML = "<p>Port data is temporarily unavailable.</p>";
    return;
  }

  if (scscGrid) scscGrid.innerHTML = vesselData.scsc.map(vesselCardHtml).join("");
  if (pscGrid) pscGrid.innerHTML = vesselData.psc.map(vesselCardHtml).join("");
  if (portsGrid) portsGrid.innerHTML = portData.map(portCardHtml).join("");

  if (!overlay) return;

  const modalName = document.getElementById("vessel-modal-name");
  const modalSpecs = document.getElementById("vessel-modal-specs");
  const closeBtn = document.getElementById("vessel-modal-close");

  const allVessels = [...vesselData.scsc, ...vesselData.psc];

  function openVesselModal(name) {
    const s = allVessels.find(v => v.name === name) || {};
    modalName.textContent = name;
    modalSpecs.innerHTML = [
      specRow("Year Built", s.yearBuilt),
      specRow("Country Built", s.countryBuilt),
      specRow("Operating Since", s.yearStarted),
      specRow("Net Tonnage", s.netTonnage),
      specRow("Ship Type", s.type),
      specRow("Passenger Capacity", s.passengers),
      specRow("Vehicle Capacity", s.vehicles),
    ].join("");
  }

  function openPortModal(name) {
    const p = portData.find(p => p.name === name) || {};
    modalName.textContent = name;
    const mapsLink = p.mapsUrl && p.mapsUrl.trim()
      ? `<a href="${p.mapsUrl}" target="_blank" rel="noopener">View on Google Maps</a>`
      : "N/A";
    modalSpecs.innerHTML = [
      `<li><span>Address</span><strong>${p.address && p.address.trim() ? p.address : "N/A"}</strong></li>`,
      `<li><span>Google Maps</span><strong>${mapsLink}</strong></li>`,
    ].join("");
  }

  function openModal(card) {
    const name = card.dataset.name;
    if (card.dataset.type === "port") {
      openPortModal(name);
    } else {
      openVesselModal(name);
    }
    overlay.classList.add("open");
  }

  function closeModal() {
    overlay.classList.remove("open");
  }

  document.querySelectorAll(".vessel-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

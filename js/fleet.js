/*
  Fleet page — vessel and port click-to-expand popups.
  Vessel specs sourced from the Santa Clara / Penafrancia fleet spec sheet
  (SCSC + PSC tabs, as of Aug 06, 2026). Port address/maps links sourced
  from the same spreadsheet's Ports tab. Missing values are shown as "N/A"
  rather than invented. Card click mechanism and card-face appearance are
  unchanged from the previous version — only the modal content changed.
*/

const VESSEL_SPECS = {
  "M/V Nelvin Jules":       { yearBuilt: 1985, countryBuilt: "Japan",              yearStarted: 2000, netTonnage: "357.7 Tons",  type: "Passenger/Cargo Ship", passengers: 750,  vehicles: "14 units / 6 long chassis" },
  "M/V King Frederick":     { yearBuilt: 1987, countryBuilt: "Japan",              yearStarted: 2000, netTonnage: "357.70 Tons", type: "Passenger/Cargo Ship", passengers: 760,  vehicles: "14 units / 6 long chassis" },
  "M/V Hansel Jobett":      { yearBuilt: 1979, countryBuilt: "Japan",              yearStarted: 2004, netTonnage: "288.7 Tons",  type: "Passenger/Cargo Ship", passengers: 650,  vehicles: "12 units / 2 long chassis" },
  "M/V Nathan Matthew":     { yearBuilt: 1973, countryBuilt: "Japan",              yearStarted: 2015, netTonnage: "357.75 Tons", type: "Passenger/Cargo Ship", passengers: 700,  vehicles: "14 units / 4 long chassis" },
  "M/V Jack Daniel":        { yearBuilt: 1990, countryBuilt: "Japan",              yearStarted: 2015, netTonnage: "541 Tons",    type: "Passenger/Cargo Ship", passengers: 680,  vehicles: "15 units / 5 long chassis" },
  "LCT Aldain Dowey":       { yearBuilt: 1995, countryBuilt: "Philippines (Batangas)", yearStarted: 2016, netTonnage: "172.40 Tons", type: "Passenger/Cargo Ship", passengers: 124,  vehicles: "14 units / 6 long chassis" },
  "M/V Adrian Jude":        { yearBuilt: 1990, countryBuilt: "Japan",              yearStarted: 2017, netTonnage: "542 Tons",    type: "Passenger/Cargo Ship", passengers: 1032, vehicles: "18 units / 5 long chassis" },
  "M/V Almirante Federico": { yearBuilt: 1990, countryBuilt: "Japan",              yearStarted: 2018, netTonnage: "542 Tons",    type: "Passenger/Cargo Ship", passengers: 1063, vehicles: "18 units / 5 long chassis" },
  "M/V Don Eduardo":        { yearBuilt: 2001, countryBuilt: "Japan",              yearStarted: 2022, netTonnage: "297 Tons",    type: "Passenger/Cargo Ship", passengers: 418,  vehicles: "14 units / 10 long chassis" },
  "M/V General Santos":     { yearBuilt: 2022, countryBuilt: "China",              yearStarted: 2023, netTonnage: "566 Tons",    type: "Passenger/Cargo Ship", passengers: 679,  vehicles: "16 units / 5 long chassis" },
  "M/V Renzo Louie":        { yearBuilt: 2022, countryBuilt: "China",              yearStarted: 2023, netTonnage: "1,677 Tons",  type: "RO-RO Cargo Ship",     passengers: "Drivers/helpers only", vehicles: "46 units (5 trailer / 26 10-wheeler / 6 Elf / 5 FWD / 4 long chassis)" },
  "M/V Dawn Antonio":       { yearBuilt: 1989, countryBuilt: "Japan",              yearStarted: 2024, netTonnage: "291 Tons",    type: "RO-RO Cargo Ship",     passengers: 120,  vehicles: "16 units" },
  "M/V Steve Albert":       { yearBuilt: 2022, countryBuilt: "China",              yearStarted: 2024, netTonnage: "1,676 Tons",  type: "Cargo (Deck Cargo)",   passengers: 84,   vehicles: "46 units (5 trailer / 26 10-wheeler / 6 Elf / 5 FWD / 4 long chassis)" },
  "M/V Lance Daniel":       { yearBuilt: 2021, countryBuilt: "China",              yearStarted: 2024, netTonnage: "1,676 Tons",  type: "Cargo (Deck Cargo)",   passengers: 96,   vehicles: "46 units (5 trailer / 26 10-wheeler / 6 Elf / 5 FWD / 4 long chassis)" },
  "M/V Fritz Elson":        { yearBuilt: 2022, countryBuilt: "China",              yearStarted: 2025, netTonnage: "1,676 Tons",  type: "Cargo (Deck Cargo)",   passengers: 96,   vehicles: "46 units (5 trailer / 26 10-wheeler / 6 Elf / 5 FWD / 4 long chassis)" },
  "M/V Carlo Mark":         { yearBuilt: "N/A", countryBuilt: "N/A",               yearStarted: "N/A", netTonnage: "N/A",        type: "N/A",                  passengers: "N/A", vehicles: "N/A" },

  "M/V Don Herculano":      { yearBuilt: 1970, countryBuilt: "Japan",   yearStarted: 2011, netTonnage: "204 Tons", type: "Passenger/Cargo Ship", passengers: 625, vehicles: "12 units / 4 long chassis" },
  "M/V Anthon Raphael":     { yearBuilt: 1990, countryBuilt: "Japan",   yearStarted: 2008, netTonnage: "688 Tons", type: "Passenger/Cargo Ship", passengers: 818, vehicles: "13 units / 3 long chassis" },
  "LCT ST 888":             { yearBuilt: 2010, countryBuilt: "Vietnam", yearStarted: 2017, netTonnage: "355 Tons", type: "Passenger/Cargo Ship", passengers: 144, vehicles: "12 units / 10 long chassis" },
};

const PORT_INFO = {
  "Jubasan Port (Company-owned)": { address: "Allen, Northern Samar", mapsUrl: "https://www.google.com/maps/place/Santa+Clara+Shipping/@12.4821046,124.2546357,13.75z" },
  "Matnog Port":                  { address: "Matnog, Sorsogon",      mapsUrl: "https://www.google.com/maps/place/Port+of+Matnog/@12.5842182,124.0834905,17z" },
  "Liloan Port":                  { address: "Southern Leyte",        mapsUrl: "https://www.google.com/maps/place/Liloan+Ferry+Terminal/@10.1592006,125.1224122,17z" },
  "Lipata Port":                  { address: "Surigao",                mapsUrl: "https://www.google.com/maps/place/Lipata+Ferry+Terminal/@9.8153874,125.4521474,17z" },
  "Pioduran Port":                { address: "Pioduran, Albay",        mapsUrl: "https://www.google.com/maps/place/Pio+Duran+Municipal+Port/@13.0286753,123.4432368,19.75z" },
  "Masbate Port":                 { address: "Masbate City, Masbate",  mapsUrl: "https://www.google.com/maps/place/Masbate+Port,+Masbate+City,+Masbate/@12.3692335,123.6139741,18z" },
  "Tabaco Port":                  { address: "Tabaco City, Albay",     mapsUrl: "https://www.google.com/maps/place/Tabaco+Port,+Tabaco+City,+Albay/@13.3614715,123.7355697,18z" },
  "Virac Port":                   { address: "Catanduanes",            mapsUrl: "https://www.google.com/maps/place/Virac+Port/@13.5817152,124.2310462,17z" },
  "Hilongos Port":                { address: "Hilongos, Leyte",        mapsUrl: "https://www.google.com/maps/place/Port+of+Hilongos/@10.3690903,124.7368169,17z" },
  "Ubay Port":                    { address: "Ubay, Bohol",            mapsUrl: "https://www.google.com/maps/place/Port+of+Ubay/@10.0618864,124.4705105,17z" },
  "Maasin Port":                  { address: "Maasin, Leyte",          mapsUrl: "https://www.google.com/maps/place/Port+of+Maasin/@10.1304546,124.8389482,17z" },
  "Palompon Port":                { address: "Palompon, Leyte",        mapsUrl: "N/A" },
};

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("vessel-modal-overlay");
  if (!overlay) return;

  const modalName = document.getElementById("vessel-modal-name");
  const modalSpecs = document.getElementById("vessel-modal-specs");
  const closeBtn = document.getElementById("vessel-modal-close");

  function specRow(label, value) {
    return `<li><span>${label}</span><strong>${value}</strong></li>`;
  }

  function openVesselModal(name) {
    const s = VESSEL_SPECS[name] || {};
    modalName.textContent = name;
    modalSpecs.innerHTML = [
      specRow("Year Built", s.yearBuilt ?? "N/A"),
      specRow("Country Built", s.countryBuilt ?? "N/A"),
      specRow("Operating Since", s.yearStarted ?? "N/A"),
      specRow("Net Tonnage", s.netTonnage ?? "N/A"),
      specRow("Ship Type", s.type ?? "N/A"),
      specRow("Passenger Capacity", s.passengers ?? "N/A"),
      specRow("Vehicle Capacity", s.vehicles ?? "N/A"),
    ].join("");
  }

  function openPortModal(name) {
    const p = PORT_INFO[name] || {};
    modalName.textContent = name;
    const mapsLink = p.mapsUrl && p.mapsUrl !== "N/A"
      ? `<a href="${p.mapsUrl}" target="_blank" rel="noopener">View on Google Maps</a>`
      : "N/A";
    modalSpecs.innerHTML = [
      `<li><span>Address</span><strong>${p.address ?? "N/A"}</strong></li>`,
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

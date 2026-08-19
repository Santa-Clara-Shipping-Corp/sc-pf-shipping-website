async function renderAbout() {
  try {
    const res = await fetch("data/about.json");
    const data = await res.json();

    document.getElementById("about-intro").textContent = data.intro;
    document.getElementById("sc-desc").textContent = data.santaClaraDesc;
    document.getElementById("pf-desc").textContent = data.penafranciaDesc;
    document.getElementById("history-note").textContent = data.historyNote;

    const timelineEl = document.getElementById("timeline");
    timelineEl.innerHTML = (data.timeline || []).map(t => `
      <div class="t-item">
        <div class="t-year">${t.year}</div>
        <h4>${t.title}</h4>
        <p>${t.description}</p>
      </div>
    `).join("");
  } catch (e) {
    console.error("Failed to load about content", e);
  }
}

document.addEventListener("DOMContentLoaded", renderAbout);

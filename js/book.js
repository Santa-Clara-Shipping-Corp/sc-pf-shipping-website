async function renderBook() {
  try {
    const res = await fetch("data/book.json");
    const data = await res.json();

    document.getElementById("passenger-intro").textContent = data.passengerIntro;
    document.getElementById("passenger-steps").innerHTML = (data.passengerSteps || [])
      .map(s => `<li><strong>${s.title}</strong>${s.description}</li>`).join("");

    document.getElementById("cargo-intro").textContent = data.cargoIntro;
    document.getElementById("cargo-steps").innerHTML = (data.cargoSteps || [])
      .map(s => `<li><strong>${s.title}</strong>${s.description}</li>`).join("");
  } catch (e) {
    console.error("Failed to load booking content", e);
  }
}

document.addEventListener("DOMContentLoaded", renderBook);

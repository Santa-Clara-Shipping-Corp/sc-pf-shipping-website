async function renderFaq() {
  try {
    const res = await fetch("data/faq.json");
    const { items } = await res.json();

    const container = document.getElementById("faq-list");
    container.innerHTML = (items || []).map(item => `
      <details class="faq-item"${item.open ? " open" : ""}>
        <summary>${item.question}</summary>
        <div class="faq-body">${item.answer}</div>
      </details>
    `).join("");
  } catch (e) {
    console.error("Failed to load FAQs", e);
  }
}

document.addEventListener("DOMContentLoaded", renderFaq);

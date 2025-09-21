// render.js - full card clickable, remove view button
document.addEventListener("DOMContentLoaded", async () => {
  const latestContainer = document.getElementById("LetestmobilesContainer");
  const popularContainer = document.getElementById("mobilesContainer");

  const createCard = (m) => {
    const card = document.createElement("a");
    card.href = `main.html?id=${m._id}`;
    card.className = "card me-2 shadow-sm text-decoration-none text-dark";
    card.style.minWidth = "112px"; // 25% smaller
    card.innerHTML = `
      <img src="${m.images?.[0] || 'placeholder.jpg'}" class="card-img-top" style="height:112px; object-fit:cover;">
      <div class="card-body p-2 text-center">
        <h6 class="card-title mb-1" style="font-size:0.75rem;">${m.brand} ${m.model}</h6>
        <p class="text-success mb-1" style="font-size:0.75rem;">₹ ${m.price.toLocaleString()}</p>
      </div>`;
    return card;
  };

  try {
    const res = await fetch("/api/mobiles?limit=10");
    const data = await res.json();

    // Latest
    if (latestContainer) {
      latestContainer.innerHTML = "";
      data.results.filter(m => m.latest).forEach(m => {
        latestContainer.appendChild(createCard(m));
      });
    }

    // Popular
    if (popularContainer) {
      popularContainer.innerHTML = "";
      data.results.filter(m => m.popular).forEach(m => {
        popularContainer.appendChild(createCard(m));
      });
    }
  } catch (err) {
    console.error("Error fetching mobiles:", err);
    if (latestContainer) latestContainer.innerHTML = "<p class='text-muted'>Failed to load latest mobiles.</p>";
    if (popularContainer) popularContainer.innerHTML = "<p class='text-muted'>Failed to load popular mobiles.</p>";
  }
});

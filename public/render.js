// render.js for index.html
document.addEventListener("DOMContentLoaded", async () => {
  const latestContainer = document.getElementById("LetestmobilesContainer");
  const popularContainer = document.getElementById("mobilesContainer");

  try {
    // Fetch latest 10 mobiles
    const res = await fetch("/api/mobiles?limit=10");
    const data = await res.json();

    // Render Latest Mobiles
    if (latestContainer) {
      latestContainer.innerHTML = "";
      data.results.forEach(m => {
        const card = document.createElement("div");
        card.className = "card me-2";
        card.style.minWidth = "150px";
        card.innerHTML = `
          <img src="${m.images?.[0] || 'placeholder.jpg'}" class="card-img-top" style="height:150px; object-fit:cover;">
          <div class="card-body p-2 text-center">
            <h6 class="card-title mb-1">${m.brand} ${m.model}</h6>
            <p class="text-success mb-1">₹ ${m.price.toLocaleString()}</p>
            <a href="main.html?id=${m._id}" class="btn btn-sm btn-outline-primary">View</a>
          </div>`;
        latestContainer.appendChild(card);
      });
    }

    // Render Popular Mobiles (same as latest for now)
    if (popularContainer) {
      popularContainer.innerHTML = "";
      data.results.forEach(m => {
        const card = document.createElement("div");
        card.className = "card me-2";
        card.style.minWidth = "150px";
        card.innerHTML = `
          <img src="${m.images?.[0] || 'placeholder.jpg'}" class="card-img-top" style="height:150px; object-fit:cover;">
          <div class="card-body p-2 text-center">
            <h6 class="card-title mb-1">${m.brand} ${m.model}</h6>
            <p class="text-success mb-1">₹ ${m.price.toLocaleString()}</p>
            <a href="main.html?id=${m._id}" class="btn btn-sm btn-outline-primary">View</a>
          </div>`;
        popularContainer.appendChild(card);
      });
    }

  } catch (err) {
    console.error("Error fetching mobiles:", err);
    if (latestContainer) latestContainer.innerHTML = "<p class='text-muted'>Failed to load latest mobiles.</p>";
    if (popularContainer) popularContainer.innerHTML = "<p class='text-muted'>Failed to load popular mobiles.</p>";
  }
});

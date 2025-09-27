document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("searchResultsContainer");
  const searchTitle = document.getElementById("searchTitle");

  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get("q") || "";

  if (!q) {
    container.innerHTML = "<p class='text-muted'>No search query provided.</p>";
    return;
  }

  searchTitle.textContent = `Search results for "${q}"`;

  try {
    const res = await fetch(`/api/mobiles?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      container.innerHTML = "<p class='text-muted'>No mobiles found.</p>";
      return;
    }

    data.results.forEach(m => {
      const card = document.createElement("a");
      card.href = `main.html?id=${m._id}`;
      card.className = "text-decoration-none text-center m-2";
      card.style.flex = "1 1 150px";
      card.style.maxWidth = "180px";
      card.innerHTML = `
        <div class="card shadow-sm text-center">
          <img src="${m.images?.[0] || 'placeholder.jpg'}" class="card-img-top mx-auto mt-2" style="width:90%; height:auto; object-fit:contain;">
          <div class="card-body p-2">
            <h6 class="card-title mb-1" style="font-size:0.85rem;">${m.brand} ${m.model}</h6>
            <p class="text-success fw-bold mt-2" style="font-size:0.9rem;">₹ ${m.price.toLocaleString()}</p>
          </div>
        </div>`;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error fetching search results:", err);
    container.innerHTML = "<p class='text-muted'>Failed to fetch search results.</p>";
  }
});

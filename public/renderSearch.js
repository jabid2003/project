document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("searchResultsContainer");
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");

  if (!q) {
    container.innerHTML = "<p class='text-muted'>No search query provided.</p>";
    return;
  }

  // Show loader
  container.innerHTML = `
    <div class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  try {
    const res = await fetch(`/api/mobiles?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    container.innerHTML = ""; // Clear loader

    if (!data.results.length) {
      container.innerHTML = "<p class='text-muted'>No results found.</p>";
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
          <img src="${m.images?.[0] || 'placeholder.jpg'}" 
               class="card-img-top mx-auto mt-2" 
               style="width:90%; height:auto; object-fit:contain;">
          <div class="card-body p-2">
            <h6 class="card-title mb-1" style="font-size:0.85rem;">${m.brand} ${m.model}</h6>
            <p class="text-success fw-bold mt-2" style="font-size:0.9rem;">
              ₹${m.price.toLocaleString()}
            </p>
          </div>
        </div>`;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p class='text-danger'>Failed to load search results.</p>";
    console.error("Error fetching search results:", err);
  }
});

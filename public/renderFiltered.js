document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("filteredMobilesContainer");
  if (!container) return;

  const brandSelect = document.getElementById("brandFilter");
  const sortSelect = document.getElementById("sortFilter");
  const filterBtn = document.getElementById("filterBtnPage");
  const searchBox = document.getElementById("searchBox");

  // Populate brand options dynamically
  try {
    const res = await fetch("/api/mobiles/brands");
    const brands = await res.json();
    brands.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b;
      opt.textContent = b;
      brandSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Error fetching brands:", err);
  }

  // Helper to fetch mobiles with filters
  async function fetchMobiles() {
    const params = new URLSearchParams();
    const q = searchBox.value.trim();
    const brand = brandSelect.value;
    const sort = sortSelect.value;

    if (q) params.append("q", q);
    if (brand) params.append("brand", brand);
    if (sort) params.append("sort", sort);

    try {
      const res = await fetch(`/api/mobiles?${params.toString()}`);
      const data = await res.json();

      container.innerHTML = "";
      if (!data.results || data.results.length === 0) {
        container.innerHTML = `<p class="text-muted">No mobiles found.</p>`;
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
              <p class="text-success fw-bold mt-2" style="font-size:0.9rem;">₹${m.price.toLocaleString()}</p>
            </div>
          </div>`;
        container.appendChild(card);
      });

      container.style.display = "flex";
      container.style.flexWrap = "wrap";
      container.style.gap = "0.5rem";

    } catch (err) {
      console.error("Error fetching mobiles:", err);
    }
  }

  // Event listeners
  filterBtn.addEventListener("click", fetchMobiles);
  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchMobiles();
    }
  });

  // On page load, if URL has query params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("brand")) brandSelect.value = urlParams.get("brand");
  if (urlParams.has("sort")) sortSelect.value = urlParams.get("sort");
  if (urlParams.has("q")) searchBox.value = urlParams.get("q");

  fetchMobiles(); // initial render
});


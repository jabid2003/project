document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("filteredMobilesContainer");
  const brandSelect = document.getElementById("brandFilter");
  const sortSelect = document.getElementById("sortFilter");
  const filterBtn = document.getElementById("filterBtnPage");
  const searchBox = document.getElementById("searchBox");

  // Populate brands
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

  // Get URL params for initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const brandParam = urlParams.get("brand") || "";
  const sortParam = urlParams.get("sort") || "";

  brandSelect.value = brandParam;
  sortSelect.value = sortParam;

  async function fetchMobiles() {
    const params = new URLSearchParams();
    if (brandSelect.value) params.append("brand", brandSelect.value);
    if (sortSelect.value) params.append("sort", sortSelect.value);

    try {
      const res = await fetch(`/api/mobiles?${params.toString()}`);
      const data = await res.json();

      container.innerHTML = "";
      if (!data.results.length) {
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
              <p class="text-success fw-bold mt-2" style="font-size:0.9rem;">₹${m.price.toLocaleString()}</p>
            </div>
          </div>`;
        container.appendChild(card);
      });

    } catch (err) {
      console.error("Error fetching mobiles:", err);
    }
  }

  // Filter button on filtered.html
  filterBtn.addEventListener("click", fetchMobiles);
  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchMobiles();
    }
  });

  // Initial load
  fetchMobiles();
});

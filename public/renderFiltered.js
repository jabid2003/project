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

  // Get URL params
  const urlParams = new URLSearchParams(window.location.search);
  const brandParam = urlParams.get("brand") || "";
  const sortParam = urlParams.get("sort") || "";

  // Set initial values and fetch mobiles **after options populated**
  setTimeout(() => {
    brandSelect.value = brandParam;
    sortSelect.value = sortParam;
    fetchMobiles(); // initial load with query params
  }, 50); // short timeout to ensure options are ready

  async function fetchMobiles() {
    const params = new URLSearchParams();
    if (brandSelect.value) params.append("brand", brandSelect.value);
    if (sortSelect.value) params.append("sort", sortSelect.value);

    container.innerHTML = `<div class="d-flex justify-content-center my-5">
      <div class="spinner-border text-success" style="width:3rem; height:3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;

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
              <p class="text-success fw-bold mt-2" style="font-size:0.9rem;">₹ ${m.price.toLocaleString()}</p>
            </div>
          </div>`;
        container.appendChild(card);
      });
    } catch (err) {
      container.innerHTML = "<p class='text-danger'>Failed to load mobiles.</p>";
      console.error(err);
    }
  }

  // Filter button & Enter key
  filterBtn.addEventListener("click", fetchMobiles);
  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchMobiles();
    }
  });
});

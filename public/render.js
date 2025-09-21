document.addEventListener("DOMContentLoaded", async () => {
  const latestContainer = document.getElementById("LetestmobilesContainer");
  const popularContainer = document.getElementById("mobilesContainer");
  const brandSelect = document.getElementById("brandFilter");
  const filterBtn = document.getElementById("filterBtnPage"); // brand filter
  const filterBtnSearch = document.getElementById("filterBtnSearch"); // search button
  const searchBox = document.getElementById("searchBoxFilter");

  // Fetch all mobiles (limit 10)
  try {
    const res = await fetch("/api/mobiles?limit=10");
    const data = await res.json();

    // Latest
    if (latestContainer) {
      latestContainer.innerHTML = "";
      data.results.filter(m => m.latest).forEach(m => {
        const card = document.createElement("a");
        card.href = `main.html?id=${m._id}`;
        card.className = "card me-2 text-decoration-none text-dark";
        card.style.minWidth = "150px";
        card.innerHTML = `
          <img src="${m.images?.[0] || 'placeholder.jpg'}" class="card-img-top" style="height:150px; object-fit:cover;">
          <div class="card-body p-2 text-center">
            <h6 class="card-title mb-1">${m.brand} ${m.model}</h6>
            <p class="text-success mb-1">₹${m.price.toLocaleString()}</p>
          </div>`;
        latestContainer.appendChild(card);
      });
    }

    // Popular
    if (popularContainer) {
      popularContainer.innerHTML = "";
      data.results.filter(m => m.popular).forEach(m => {
        const card = document.createElement("a");
        card.href = `main.html?id=${m._id}`;
        card.className = "card me-2 text-decoration-none text-dark";
        card.style.minWidth = "150px";
        card.innerHTML = `
          <img src="${m.images?.[0] || 'placeholder.jpg'}" class="card-img-top" style="height:150px; object-fit:cover;">
          <div class="card-body p-2 text-center">
            <h6 class="card-title mb-1">${m.brand} ${m.model}</h6>
            <p class="text-success mb-1">₹${m.price.toLocaleString()}</p>
          </div>`;
        popularContainer.appendChild(card);
      });
    }

  } catch (err) {
    console.error("Error fetching mobiles:", err);
  }

  // Populate brand options dynamically
  if (brandSelect) {
    try {
      const resBrands = await fetch("/api/mobiles/brands");
      const brands = await resBrands.json();
      brands.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b;
        opt.textContent = b;
        brandSelect.appendChild(opt);
      });
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  }

  // Brand Filter click → redirect to filtered.html
  if (filterBtn) {
    filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const brand = brandSelect.value;
      const sort = document.getElementById("sortFilter")?.value || "";
      window.location.href = `filtered.html?brand=${encodeURIComponent(brand)}&sort=${encodeURIComponent(sort)}`;
    });
  }

  // Search bar → redirect to searchResults.html
  if (filterBtnSearch && searchBox) {
    filterBtnSearch.addEventListener("click", (e) => {
      e.preventDefault();
      const query = searchBox.value.trim();
      if (query) {
        window.location.href = `searchResults.html?q=${encodeURIComponent(query)}`;
      }
    });

    // Enter key in search box
    searchBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = searchBox.value.trim();
        if (query) {
          window.location.href = `searchResults.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // Optional: Enter key in brand select triggers filter
  if (brandSelect) {
    brandSelect.addEventListener("keydown", (e) => {
      if (e.key === "Enter") filterBtn.click();
    });
  }
});

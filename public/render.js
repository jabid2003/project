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

    // Helper function to create card
    function createCard(mobile) {
      const card = document.createElement("a");
      card.href = `main.html?id=${mobile._id}`;
      card.className = "card me-2 text-decoration-none text-dark";
      card.style.minWidth = "150px";
      card.innerHTML = `
        <img src="${mobile.images?.[0] || 'placeholder.jpg'}" class="card-img-top" style="height:150px; object-fit:cover;">
        <div class="card-body text-center">
          <h6 class="card-title mb-1">${mobile.brand}</h6>
          <h6 class="card-title mb-1">${mobile.model}</h6>
          <p class="text-success mb-1">₹${mobile.price.toLocaleString()}</p>
        </div>`;
      return card;
    }

    // Popular Mobiles - filter by popular
    if (popularContainer) {
      popularContainer.innerHTML = "";
      data.results.filter(m => m.popular).forEach(mobile => {
        popularContainer.appendChild(createCard(mobile));
      });
    }

    // Latest Mobiles - last 7 added
    if (latestContainer) {
      latestContainer.innerHTML = "";
      data.results.slice(-7).forEach(mobile => {
        latestContainer.appendChild(createCard(mobile));
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
    const performSearch = () => {
      const query = searchBox.value.trim();
      if (query) window.location.href = `searchResults.html?q=${encodeURIComponent(query)}`;
    };
    filterBtnSearch.addEventListener("click", (e) => { e.preventDefault(); performSearch(); });
    searchBox.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); performSearch(); } });
  }

  // Navbar search logic
  const navbarSearchForm = document.getElementById("navbarSearchForm");
  const navbarSearchInput = document.getElementById("navbarSearchInput");
  if (navbarSearchForm && navbarSearchInput) {
    navbarSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = navbarSearchInput.value.trim();
      if (query) window.location.href = `searchResults.html?q=${encodeURIComponent(query)}`;
    });
  }

  // Optional: Enter key in brand select triggers filter
  if (brandSelect) {
    brandSelect.addEventListener("keydown", (e) => {
      if (e.key === "Enter") filterBtn.click();
    });
  }
});

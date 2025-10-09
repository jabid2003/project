document.addEventListener("DOMContentLoaded", async () => {
  const latestContainer = document.getElementById("LetestmobilesContainer");
  const popularContainer = document.getElementById("mobilesContainer");
  const brandSelect = document.getElementById("brandFilter");
  const filterBtn = document.getElementById("filterBtnPage"); // brand filter
  const filterBtnSearch = document.getElementById("filterBtnSearch"); // search button
  const searchBox = document.getElementById("searchBoxFilter");

  // 🔹 Compare List global state
  let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
  let allMobiles = [];

  try {
    const res = await fetch("/api/mobiles?limit=50");
    const data = await res.json();
    allMobiles = data.results;

    // Helper: create a card with Compare Checkbox
    function createCard(mobile) {
      const card = document.createElement("div");
      card.className = "card me-2 text-dark";
      card.style.minWidth = "150px";
      card.innerHTML = `
        <a href="main.html?id=${mobile._id}" class="text-decoration-none text-dark">
          <img src="${mobile.images?.[0] || 'placeholder.jpg'}" 
               class="card-img-top" 
               style="height:150px; object-fit:cover;">
          <div class="card-body text-center p-0 mt-1">
            <h6 class="card-title mb-1">${mobile.brand}</h6>
            <h6 class="card-title mb-1">${mobile.model}</h6>
            <p class="text-success mb-1">₹ ${mobile.price.toLocaleString()}</p>
          </div>
        </a>
        <div class="form-check d-flex mx-1">
          <input class="form-check-input compareCheckbox me-1 border border-dark " type="checkbox" data-id="${mobile._id}" id="compare-${mobile._id}"style="cursor:alias;">
          <label class="form-check-label w-100 text-primary small" for="compare-${mobile._id}">
            Add to Compare
          </label>
        </div>
      `;

      const checkbox = card.querySelector(".compareCheckbox");

      // 🔹 Initial sync from localStorage
      checkbox.checked = compareList.some(m => m._id === mobile._id);

      // Checkbox change logic
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          if (!compareList.some(m => m._id === mobile._id)) {
            if (compareList.length >= 2) {
              // सबसे पहला remove करो
              const removed = compareList.shift();

              // उसके सारे checkboxes uncheck कर दो
              document.querySelectorAll(`.compareCheckbox[data-id="${removed._id}"]`).forEach(cb => {
                cb.checked = false;
              });
            }
            compareList.push(mobile);
          }
        } else {
          // Uncheck → remove
          compareList = compareList.filter(m => m._id !== mobile._id);
        }

        // ✅ LocalStorage update
        localStorage.setItem("compareList", JSON.stringify(compareList));

        // ✅ उसी ID वाले सारे checkboxes sync कर दो (Latest + Popular दोनों)
        document.querySelectorAll(`.compareCheckbox[data-id="${mobile._id}"]`).forEach(cb => {
          cb.checked = checkbox.checked;
        });
      });

      return card;
    }

    // Reusable render function
    function renderMobiles(container, mobiles, flagKey) {
      if (!container) return;
      container.innerHTML = "";

      const filtered = mobiles.filter(m => m[flagKey]);
      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-muted w-100 text-center">No mobiles found</p>`;
      } else {
        filtered.forEach(mobile => container.appendChild(createCard(mobile)));
      }
    }

    // Initial render
    renderMobiles(popularContainer, allMobiles, "popular");
    renderMobiles(latestContainer, allMobiles, "latest");

  } catch (err) {
    console.error("Error fetching mobiles:", err);
  }

  // 🔹 Brand dropdown populate
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

  // 🔹 Brand filter redirect
  if (filterBtn) {
    filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const brand = brandSelect.value;
      const sort = document.getElementById("sortFilter")?.value || "";
      window.location.href = `filtered.html?brand=${encodeURIComponent(brand)}&sort=${encodeURIComponent(sort)}`;
    });
  }

  // 🔹 Search filter section
  if (filterBtnSearch && searchBox) {
    const performSearch = () => {
      const query = searchBox.value.trim();
      if (query) window.location.href = `searchResults.html?q=${encodeURIComponent(query)}`;
    };
    filterBtnSearch.addEventListener("click", (e) => { e.preventDefault(); performSearch(); });
    searchBox.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); performSearch(); } });
  }

  // 🔹 Navbar search
  const navbarSearchForm = document.getElementById("navbarSearchForm");
  const navbarSearchInput = document.getElementById("navbarSearchInput");
  if (navbarSearchForm && navbarSearchInput) {
    navbarSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = navbarSearchInput.value.trim();
      if (query) window.location.href = `searchResults.html?q=${encodeURIComponent(query)}`;
    });
  }

  // 🔹 Enter key in brand select
  if (brandSelect) {
    brandSelect.addEventListener("keydown", (e) => {
      if (e.key === "Enter") filterBtn.click();
    });
  }

  // 🔹 🔹 Sync all checkboxes on page load & back/forward navigation
  const syncAllCheckboxes = () => {
    const compareList = JSON.parse(localStorage.getItem("compareList")) || [];
    document.querySelectorAll(".compareCheckbox").forEach(cb => {
      const id = cb.dataset.id;
      cb.checked = compareList.some(m => m._id === id);
    });
  };

  // Initial sync
  syncAllCheckboxes();

  // Sync on browser back/forward
  window.addEventListener("pageshow", syncAllCheckboxes);
});

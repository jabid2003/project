document.addEventListener("DOMContentLoaded", async () => {
  const compareContainer = document.getElementById("compareContainer");
  let compareList = JSON.parse(localStorage.getItem("compareList")) || [];

  if (compareList.length === 0) {
    compareContainer.innerHTML = `<p class="text-muted text-center w-100">No mobiles selected for compare.</p>`;
    return;
  }

  // Fetch full data from backend for each mobile
  const promises = compareList.map(m => fetch(`/api/mobiles/${m._id}`).then(res => res.json()));
  const mobiles = await Promise.all(promises);

  mobiles.forEach(mobile => {
    const card = document.createElement("div");
    card.className = "col-md-6";

    card.innerHTML = `
      <div class="card shadow-sm">
        <img src="${mobile.images?.[0] || 'placeholder.jpg'}" class="card-img-top p-3" style="max-height:200px">
        <div class="card-body">
          <h5 class="card-title">${mobile.brand} ${mobile.model}</h5>
          <p class="text-success mb-2">₹ ${mobile.price.toLocaleString()}</p>
          <ul class="list-group list-group-flush mb-2">
            ${(mobile.highlights || []).slice(0,4).map(h => `<li class="list-group-item">${h}</li>`).join('')}
          </ul>
          <button class="btn btn-danger btn-sm removeBtn" data-id="${mobile._id}">Remove</button>
        </div>
      </div>
    `;
    compareContainer.appendChild(card);
  });

  // Remove mobile
  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      compareList = compareList.filter(m => m._id !== id);
      localStorage.setItem("compareList", JSON.stringify(compareList));

      // 👇 ये flag set करेंगे ताकि index page पर checkboxes update हों
      localStorage.setItem("compareUpdated", "true");

      location.reload();
    });
  });
});

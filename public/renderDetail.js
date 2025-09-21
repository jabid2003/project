// renderDetail.js
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const container = document.getElementById("mobileDetailContainer") || document.body;

  if (!id) {
    container.innerHTML = "<p class='text-muted'>No mobile selected.</p>";
    return;
  }

  try {
    const res = await fetch(`/api/mobiles/${id}`);
    if (!res.ok) throw new Error("Mobile not found");

    const mobile = await res.json();

    // Image
    const imgEl = document.getElementById("mobile-image");
    imgEl.src = mobile.images?.[0] || "placeholder.jpg";
    imgEl.alt = `${mobile.brand} ${mobile.model}`;

    // Title & Price
    document.getElementById("mobile-title").textContent = `${mobile.brand} ${mobile.model}`;
    document.getElementById("mobile-price").textContent = mobile.price
      ? `₹ ${mobile.price.toLocaleString()}`
      : "Price not available";

    // Specifications
    const specList = document.getElementById("spec-list");
    specList.innerHTML = "";

    if (mobile.specs) {
      for (const category in mobile.specs) {
        specList.innerHTML += `<li><strong>${category}:</strong></li>`;
        for (const key in mobile.specs[category]) {
          specList.innerHTML += `<li class="ms-3">${key}: ${mobile.specs[category][key]}</li>`;
        }
      }
    } else {
      specList.innerHTML = "<li>No specifications available</li>";
    }

    // Features / Highlights
    const featureList = document.getElementById("feature-list");
    featureList.innerHTML =
      mobile.highlights?.map(f => `<li>${f}</li>`).join("") ||
      "<li>No features listed</li>";

  } catch (err) {
    console.error("Error fetching mobile details:", err);
    container.innerHTML = `<p class='text-muted'>Failed to load mobile details.</p>`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const filterBtnS = document.getElementById("filterBtnSearch"); // same as HTML id
  const searchBoxFilter = document.getElementById("searchBoxFilter");

  filterBtnS.addEventListener("click", () => {
    const q = searchBoxFilter.value.trim();
    if (!q) return;
    // redirect to searchResults.html with query param
    window.location.href = `searchResults.html?q=${encodeURIComponent(q)}`;
  });

  // allow Enter key
  searchBoxFilter.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      filterBtnS.click();
    }
  });
});

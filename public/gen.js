document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("pageLoader");

  // ------------------------
  // Loader control with fade
  // ------------------------
  const showLoader = () => {
    if (loader) {
      loader.style.opacity = 0;
      loader.style.display = "flex";
      setTimeout(() => { loader.style.transition = "opacity 0.3s"; loader.style.opacity = 1; }, 10);
    }
  };

  const hideLoader = () => {
    if (loader) {
      loader.style.transition = "opacity 0.3s";
      loader.style.opacity = 0;
      setTimeout(() => { loader.style.display = "none"; }, 300);
    }
  };

  // Page load / back → hide loader
  hideLoader();
  window.addEventListener("pageshow", hideLoader);

  // Links → show loader on click
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href !== "#" && !href.startsWith("javascript")) {
      link.addEventListener("click", showLoader);
    }
  });

  // Forms → show loader on submit
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", showLoader);
  });

  // Navbar collapse → close on outside click
  document.addEventListener("click", (event) => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (!navbarCollapse) return;

    const isClickInside = navbarCollapse.contains(event.target);
    const isNavbarToggler = event.target.classList.contains("navbar-toggler");

    if (!isClickInside && !isNavbarToggler && navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

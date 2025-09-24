
document.addEventListener("click", function (event) {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const isClickInside = navbarCollapse.contains(event.target);
    const isNavbarToggler = event.target.classList.contains("navbar-toggler");

    if (!isClickInside && !isNavbarToggler && navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse).hide();
    }
});

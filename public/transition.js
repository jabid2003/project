document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
        e.preventDefault();

        document.body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = href;
        }, 400); // match transition time
      }
    });
  });

  document.body.classList.add("fade-in");
});


const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const menuIcon = menuToggle.querySelector("i");

// Toggle mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
});

// Close the menu after selecting a link
document.querySelectorAll(".nav-link, .mobile-cta a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-xmark");
  });
});

// Add a background to the header when scrolling
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();



/* ========================================
   PROJECT CATEGORY FILTERS
======================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    projectCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.classList.toggle("hidden", !matches);
    });
  });
});


/* ========================================
   AUTOMATIC FOOTER YEAR
======================================== */

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

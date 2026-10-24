
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


/* ========================================
   EMAILJS CONTACT FORM
======================================== */

const EMAILJS_PUBLIC_KEY = "oZy4vrGesApfk8ui7";
const EMAILJS_SERVICE_ID = "service_r21aioj";
const EMAILJS_TEMPLATE_ID = "template_7du59iq";

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const originalButtonText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML =
      'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      alert("Thank you! Your inquiry has been sent successfully ✅✅.");
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS submission failed:", error);

      alert(
        "Sorry, your message could not be sent. Please try again or email Olaakeem94@gmail.com."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
}

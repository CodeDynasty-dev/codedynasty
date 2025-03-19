// Simple form handling
document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email-input").value;
    const feedback = document.getElementById("form-feedback");

    if (email) {
      feedback.classList.remove("hidden");
      feedback.querySelector("p").textContent =
        "Thank you for subscribing! Check your inbox to confirm.";
      document.getElementById("email-input").value = "";
    }
  });

// Add this for 3D hover effect simulation on cards
const cards = document.querySelectorAll(".card-3d");

cards.forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    this.querySelector(
      ".card-3d-inner"
    ).style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", function () {
    this.querySelector(".card-3d-inner").style.transform = "translateZ(0)";
  });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

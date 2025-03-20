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

document.addEventListener("DOMContentLoaded", function () {
  // Handle mobile menu
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Responsive tables
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("overflow-x-auto");
    wrapper.style.webkitOverflowScrolling = "touch";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // Responsive images
  const images = document.querySelectorAll("article img");
  images.forEach((img) => {
    img.classList.add("max-w-full", "h-auto");
  });

  // Handle window resize
  let timeout;
  window.addEventListener("resize", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (window.innerWidth > 1024) {
        // mobileMenu.classList.add("hidden");
        // tocOverlay.classList.add("hidden");
      }
    }, 150);
  });
});

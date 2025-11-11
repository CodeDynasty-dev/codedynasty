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
      ".card-3d-inner",
    ).style.transform =
      `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", function () {
    this.querySelector(".card-3d-inner").style.transform = "translateZ(0)";
  });
});

// Share functionality
function setupShareButtons() {
  const currentUrl = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const text = encodeURIComponent(
    document.querySelector('meta[name="description"]')?.content || "",
  );

  // Share URLs for different platforms
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
    linkedin:
      `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
    facebook:
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${title}`,
    copy: window.location.href,
  };

  // Set up share buttons
  const shareButtons = document.querySelectorAll(
    '[class*="fa-twitter"], [class*="fa-linkedin"], [class*="fa-facebook"], [class*="fa-link"]',
  );

  shareButtons.forEach((button) => {
    button.closest("a").addEventListener("click", (e) => {
      e.preventDefault();
      const platform = button.classList.contains("fa-twitter")
        ? "twitter"
        : button.classList.contains("fa-linkedin")
        ? "linkedin"
        : button.classList.contains("fa-facebook")
        ? "facebook"
        : "copy";

      if (platform === "copy") {
        navigator.clipboard.writeText(currentUrl).then(() => {
          // Show tooltip or feedback
          const tooltip = button.closest(".copy-link-button");
          if (tooltip) {
            const originalTitle = tooltip.getAttribute("data-tooltip");
            tooltip.setAttribute("data-tooltip", "Copied!");
            setTimeout(() => {
              tooltip.setAttribute(
                "data-tooltip",
                originalTitle || "Copy Link",
              );
            }, 2000);
          }
        });
      } else {
        window.open(shareUrls[platform], "_blank", "width=600,height=400");
      }
    });
  });

  // Mobile share dialog
  const mobileShareButton = document.getElementById("mobile-share-button");
  const mobileShareDialog = document.getElementById("mobile-share-dialog");
  const mobileShareOverlay = document.getElementById("mobile-share-overlay");
  const closeShareDialog = document.getElementById("close-share-dialog");

  if (mobileShareButton && mobileShareDialog) {
    mobileShareButton.addEventListener("click", () => {
      mobileShareDialog.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  }

  const closeShare = () => {
    mobileShareDialog.classList.add("hidden");
    document.body.style.overflow = "";
  };

  if (mobileShareOverlay) {
    mobileShareOverlay.addEventListener("click", closeShare);
  }
  if (closeShareDialog) closeShareDialog.addEventListener("click", closeShare);
}

document.addEventListener("DOMContentLoaded", function () {
  // Setup share functionality
  setupShareButtons();

  // Scroll to top button
  const scrollTopButton = document.getElementById("scroll-top");
  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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

  document.querySelectorAll("code").forEach((innerCode) => {
    if (innerCode.classList.length === 0) return;
    innerCode.innerHTML = fixBrokenHighlightHTML(innerCode.innerHTML);
  });

  // Premium Features
  initFloatingParticles();
  initScrollAnimations();
  initParallaxEffect();
  initNewsletterForm();
});

// Floating Particles System
function initFloatingParticles() {
  const container = document.getElementById("particles-container");
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container, i);
  }
}

function createParticle(container, index) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random positioning
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = (index * 0.5) + "s";
  particle.style.animationDuration = (10 + Math.random() * 10) + "s";

  // Random size
  const size = 2 + Math.random() * 4;
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  // Random color variation
  const colors = [
    "rgba(99, 102, 241, 0.6)",
    "rgba(139, 92, 246, 0.6)",
    "rgba(236, 72, 153, 0.6)",
    "rgba(245, 158, 11, 0.6)",
  ];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];

  container.appendChild(particle);
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll(".modern-card, .project-card").forEach((el) => {
    observer.observe(el);
  });
}

// Parallax Effect for Hero
function initParallaxEffect() {
  const hero = document.querySelector(".hero-premium");
  if (!hero) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = hero.querySelectorAll(".gradient-orb");

    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + (index * 0.2);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Mouse move parallax
  hero.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;

    const orbs = hero.querySelectorAll(".gradient-orb");
    orbs.forEach((orb, index) => {
      const speed = 20 + (index * 10);
      orb.style.transform = `translate(${xPercent * speed}px, ${
        yPercent * speed
      }px)`;
    });
  });
}

// Newsletter Form Handler
function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;

  const input = form.querySelector(".newsletter-input");
  const button = form.querySelector('button[type="submit"]');
  const originalButtonText =
    button.querySelector("span:last-child").textContent;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = input.value.trim();

    // Validation
    if (!email || !isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      shakeElement(input);
      return;
    }

    // Disable form during submission
    button.disabled = true;
    input.disabled = true;
    button.classList.add("loading");

    // Update button text with loading animation
    const buttonTextSpan = button.querySelector("span:last-child");
    buttonTextSpan.innerHTML =
      '<span class="loading-dots">Subscribing<span>.</span><span>.</span><span>.</span></span>';

    try {
      // Send subscription request
      const response = await fetch("https://crude-monkey.deno.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: "CodeDynasty Newsletter",
          message: `New newsletter subscription: ${email}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success animation
        showNotification(
          "Successfully subscribed! Check your inbox.",
          "success",
        );

        // Confetti effect
        createConfetti(button);

        // Clear form
        input.value = "";

        // Update button to success state
        buttonTextSpan.textContent = "✓ Subscribed!";
        button.classList.add("success");

        // Reset button after delay
        setTimeout(() => {
          buttonTextSpan.textContent = originalButtonText;
          button.classList.remove("success", "loading");
          button.disabled = false;
          input.disabled = false;
        }, 3000);
      } else {
        throw new Error(result.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      showNotification(
        "Oops! Something went wrong. Please try again.",
        "error",
      );

      // Reset button
      buttonTextSpan.textContent = originalButtonText;
      button.classList.remove("loading");
      button.disabled = false;
      input.disabled = false;

      // Shake the form
      shakeElement(form);
    }
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existing = document.querySelector(".notification-toast");
  if (existing) {
    existing.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification-toast notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${
    type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"
  }</span>
      <span class="notification-message">${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">×</button>
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => notification.classList.add("show"), 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Shake animation
function shakeElement(element) {
  element.classList.add("shake");
  setTimeout(() => element.classList.remove("shake"), 500);
}

// Confetti effect
function createConfetti(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];
  const confettiCount = 30;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = centerX + "px";
    confetti.style.top = centerY + "px";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    const angle = (Math.PI * 2 * i) / confettiCount;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    confetti.style.setProperty("--tx", tx + "px");
    confetti.style.setProperty("--ty", ty + "px");

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => confetti.remove(), 1000);
  }
}

function fixBrokenHighlightHTML(html) {
  return (
    html
      // Remove <p> and </p> inside code
      .replace(/<\/?p>/gi, "")
      // Remove nested <pre><code> and </code></pre>
      .replace(/<pre><code>/gi, "")
      .replace(/<\/code><\/pre>/gi, "")
      // Fix double-escaped tags like &lt;span&gt; → <span>
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
  );
}

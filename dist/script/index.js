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

// Share functionality
function setupShareButtons() {
  const currentUrl = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const text = encodeURIComponent(
    document.querySelector('meta[name="description"]')?.content || ""
  );

  // Share URLs for different platforms
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${title}`,
    copy: window.location.href,
  };

  // Set up share buttons
  const shareButtons = document.querySelectorAll(
    '[class*="fa-twitter"], [class*="fa-linkedin"], [class*="fa-facebook"], [class*="fa-link"]'
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
                originalTitle || "Copy Link"
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

  // Create Canvas for supernova
  const canvas = document.createElement("canvas");
  canvas.id = "supernova-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];
  let energyWaves = [];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  let time = 0;

  // Supernova Particle - Explosive outward motion
  class SupernovaParticle {
    constructor(burstPhase = 0) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 2 + Math.random() * 4;
      
      this.x = centerX;
      this.y = centerY;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity;
      this.size = Math.random() * 3 + 1;
      this.life = 1;
      this.decay = 0.003 + Math.random() * 0.005;
      this.color = Math.random() > 0.5 ? [251, 191, 36] : [14, 165, 233];
      this.trail = [];
      this.maxTrailLength = 15;
      this.burstPhase = burstPhase;
    }

    update() {
      // Add current position to trail
      this.trail.push({ x: this.x, y: this.y, life: this.life });
      if (this.trail.length > this.maxTrailLength) {
        this.trail.shift();
      }

      // Update position with acceleration
      this.x += this.vx;
      this.y += this.vy;
      
      // Slight gravity and drag
      this.vy += 0.02;
      this.vx *= 0.99;
      this.vy *= 0.99;
      
      // Decay life
      this.life -= this.decay;
      
      return this.life > 0;
    }

    draw() {
      // Draw trail
      this.trail.forEach((point, index) => {
        const trailLife = (index / this.trail.length) * point.life;
        const trailSize = this.size * trailLife;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${trailLife * 0.6})`;
        ctx.fill();
      });

      // Draw particle with glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.life})`;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.life})`;
      ctx.fill();
      
      ctx.shadowBlur = 0;
    }
  }

  // Energy Wave - Expanding rings
  class EnergyWave {
    constructor() {
      this.radius = 0;
      this.maxRadius = Math.max(canvas.width, canvas.height);
      this.speed = 3 + Math.random() * 2;
      this.opacity = 1;
      this.color = Math.random() > 0.5 ? [251, 191, 36] : [14, 165, 233];
    }

    update() {
      this.radius += this.speed;
      this.opacity = 1 - (this.radius / this.maxRadius);
      return this.radius < this.maxRadius;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Inner glow
      ctx.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity * 0.3})`;
      ctx.lineWidth = 6;
      ctx.stroke();
    }
  }

  // Create initial burst
  function createBurst() {
    const burstSize = 50 + Math.random() * 50;
    for (let i = 0; i < burstSize; i++) {
      particles.push(new SupernovaParticle(time));
    }
    energyWaves.push(new EnergyWave());
  }

  // Initial burst
  createBurst();

  // Periodic bursts
  setInterval(() => {
    createBurst();
  }, 2000);

  // Animation loop
  function animate() {
    time++;
    
    // Fade effect for trails
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pulsing core
    const coreSize = 30 + Math.sin(time * 0.05) * 10;
    const coreGlow = 40 + Math.sin(time * 0.05) * 20;
    
    ctx.shadowBlur = coreGlow;
    ctx.shadowColor = "rgba(251, 191, 36, 0.8)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
    ctx.fill();
    
    ctx.shadowBlur = coreGlow * 1.5;
    ctx.shadowColor = "rgba(14, 165, 233, 0.6)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, coreSize * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(14, 165, 233, 0.8)";
    ctx.fill();
    
    ctx.shadowBlur = 0;

    // Update and draw energy waves
    energyWaves = energyWaves.filter(wave => {
      wave.update();
      wave.draw();
      return wave.opacity > 0;
    });

    // Update and draw particles
    particles = particles.filter(particle => {
      const alive = particle.update();
      if (alive) particle.draw();
      return alive;
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Add supernova overlay elements
  createSupernovaOverlays(container);
}

function createSupernovaOverlays(container) {
  // Supernova core
  const core = document.createElement("div");
  core.className = "supernova-core";
  container.appendChild(core);

  // Energy rings
  for (let i = 0; i < 5; i++) {
    const ring = document.createElement("div");
    ring.className = "energy-ring";
    ring.style.animationDelay = i * 0.8 + "s";
    container.appendChild(ring);
  }

  // Shockwaves
  for (let i = 0; i < 3; i++) {
    const shockwave = document.createElement("div");
    shockwave.className = "shockwave";
    shockwave.style.animationDelay = i * 1 + "s";
    container.appendChild(shockwave);
  }

  // Stellar flares (rotating beams)
  for (let i = 0; i < 12; i++) {
    const flare = document.createElement("div");
    flare.className = "stellar-flare";
    flare.style.transform = `rotate(${i * 30}deg)`;
    flare.style.animationDelay = i * 0.1 + "s";
    container.appendChild(flare);
  }

  // Nebula clouds
  for (let i = 0; i < 3; i++) {
    const nebula = document.createElement("div");
    nebula.className = "nebula-cloud";
    nebula.style.left = Math.random() * 60 + 20 + "%";
    nebula.style.top = Math.random() * 60 + 20 + "%";
    nebula.style.background = i % 2 === 0
      ? "radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent)"
      : "radial-gradient(circle, rgba(251, 191, 36, 0.2), transparent)";
    nebula.style.animationDelay = i * 3 + "s";
    container.appendChild(nebula);
  }

  // Cosmic dust
  const dust = document.createElement("div");
  dust.className = "cosmic-dust";
  container.appendChild(dust);

  // Plasma waves
  for (let i = 0; i < 2; i++) {
    const plasma = document.createElement("div");
    plasma.className = "plasma-wave";
    plasma.style.animationDelay = i * 4 + "s";
    container.appendChild(plasma);
  }
}
    gridLine.style.animationDelay = i * 1 + "s";
    container.appendChild(gridLine);
  }
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
      const speed = 0.5 + index * 0.2;
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
      const speed = 20 + index * 10;
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
          "success"
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
        "error"
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

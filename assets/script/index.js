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

  if (mobileShareOverlay)
    mobileShareOverlay.addEventListener("click", closeShare);
  if (closeShareDialog) closeShareDialog.addEventListener("click", closeShare);
}

document.addEventListener("DOMContentLoaded", function () {
  // Handle mobile menu
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

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
});

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

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
 
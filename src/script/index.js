document
  .getElementById("newsletter-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const button = document.getElementById("subscribe-button");
    const feedback = document.getElementById("form-feedback");
    const feedbackText = feedback.querySelector("p");

    // Disable button and show loading state
    button.disabled = true;
    button.innerHTML = "Subscribing...";

    try {
      const response = await fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        feedbackText.className = "text-green-500";
        feedbackText.textContent = data.message;
        document.getElementById("email-input").value = "";
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      feedbackText.className = "text-red-500";
      feedbackText.textContent =
        error.message || "Something went wrong. Please try again.";
    } finally {
      button.disabled = false;
      button.innerHTML = "Subscribe";
      feedback.classList.remove("hidden");
    }
  });

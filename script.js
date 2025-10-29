// script.js

// 🌟 Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// ✉️ Contact form submission
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple validation
  if (!name || !email || !message) {
    alert("⚠️ Please fill in all fields before submitting.");
    return;
  }

  const formData = { name, email, message };

  try {
    // Send data to backend
    const response = await fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Check server response
    if (response.ok) {
      alert("✅ Your message has been sent successfully!");
      form.reset();

      // Add success animation
      const contactBox = document.querySelector(".contact-container");
      contactBox.classList.add("success-animation");
      setTimeout(() => contactBox.classList.remove("success-animation"), 1500);
    } else {
      const errText = await response.text();
      alert(`❌ Failed to send message. Server says: ${errText}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Server error. Please try again later.");
  }
});

// 🖼️ Small fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

document.querySelectorAll(".section").forEach(section => observer.observe(section));

// Initialize AOS Animation Library
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  delay: 0,
  easing: "ease-out-cubic",
});

// DOM Elements
const navbar = document.querySelector(".glass-nav");
const progressBars = document.querySelectorAll(".progress-bar");
const contactForm = document.getElementById("contactForm");
const toast = new bootstrap.Toast(document.getElementById("successToast"));

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Animate progress bars when About section is visible
  animateProgressBars();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    }
  });
});

// Typing Animation for Hero Text
const typingText = document.querySelector(".typing-text");
const phrases = [
  "a Full Stack Developer",
  "a UI/UX Designer",
  "a Web Designer",
  "a Problem Solver",
  "an Open Source Enthusiast",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeAnimation() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeAnimation, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(typeAnimation, 1000);
});

// Progress Bars Animation
function animateProgressBars() {
  const aboutSection = document.getElementById("about");
  const sectionPos = aboutSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    progressBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      if (bar.style.width === "0%" || bar.style.width === "") {
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      }
    });
  }
}

// Form Handling
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector(".submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const spinner = submitBtn.querySelector(".spinner-border");

  // Validate form
  if (!contactForm.checkValidity()) {
    e.stopPropagation();
    contactForm.classList.add("was-validated");
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.classList.add("btn-loading");
  btnText.textContent = "Sending...";
  spinner.classList.remove("d-none");

  // Simulate form submission (replace with actual API call)
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success toast
    toast.show();

    // Reset form
    contactForm.reset();
    contactForm.classList.remove("was-validated");

    // Reset button
    submitBtn.disabled = false;
    submitBtn.classList.remove("btn-loading");
    btnText.textContent = "Send Message";
    spinner.classList.add("d-none");
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");

    submitBtn.disabled = false;
    submitBtn.classList.remove("btn-loading");
    btnText.textContent = "Send Message";
    spinner.classList.add("d-none");
  }
});

// Add animation classes on scroll for elements without AOS
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for custom animations
document.querySelectorAll(".skill-item").forEach((el) => observer.observe(el));

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-section");
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Dynamic Year in Footer
const yearSpan = document.querySelector("footer p");
if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.innerHTML = `&copy; ${currentYear} Alex Morgan. All rights reserved.`;
}

// Project Card Hover Sound Effect (Optional enhancement)
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });
});

// Initialize Bootstrap Tooltips
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]'),
);
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Performance: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// Console Easter Egg
console.log(
  "%c👋 Hey there, curious developer!",
  "color: #3b82f6; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cFeel free to explore the code. If you have any questions or want to collaborate, reach out!",
  "color: #64748b; font-size: 14px;",
);

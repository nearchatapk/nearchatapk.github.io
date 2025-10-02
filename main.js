// Real-time clock for phone mockup
function updatePhoneTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Convert to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Add leading zero to minutes if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const timeString = hours + ":" + minutes;

  const timeElement = document.querySelector(".time");
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

// Update time every second
function startPhoneClock() {
  updatePhoneTime(); // Set initial time
  setInterval(updatePhoneTime, 1000); // Update every second
}

// Mobile menu functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.remove("active");
  hamburger.classList.remove("active");
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Random horizontal position
    particle.style.left = Math.random() * 100 + "%";

    // Random animation delay
    particle.style.animationDelay = Math.random() * 15 + "s";

    // Random animation duration
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Smooth scrolling for navigation links
document
  .querySelectorAll('nav a[href^="#"], .mobile-menu a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(28, 42, 58, 0.95)";
  } else {
    header.style.background = "rgba(28, 42, 58, 0.9)";
  }
});

// Download app function
function downloadApp() {
  // Create a temporary download link
  const link = document.createElement("a");
  link.href = "#"; // Replace with actual app download link
  link.download = "NearChat.apk";

  // Show download modal
  showModal("Download Started!");
}

// Modal functions
function showModal(title, message) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-message").textContent = message || "";
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Close modal when clicking outside
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Initialize particles and clock when page loads
window.addEventListener("load", function () {
  createParticles();
  startPhoneClock(); // Start the real-time clock
});

// Add scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".feature-card, .section-title");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize scroll animations
window.addEventListener("scroll", animateOnScroll);

// Set initial state for animated elements
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".feature-card");
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.6s ease";
  });
});

// Close mobile menu when window is resized to desktop
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Prevent body scroll when mobile menu is open
function preventBodyScroll() {
  const mobileMenu = document.getElementById("mobile-menu");
  const body = document.body;

  if (mobileMenu.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}

// Update the toggle function to include scroll prevention
const originalToggleMobileMenu = toggleMobileMenu;
toggleMobileMenu = function () {
  originalToggleMobileMenu();
  preventBodyScroll();
};

const originalCloseMobileMenu = closeMobileMenu;
closeMobileMenu = function () {
  originalCloseMobileMenu();
  document.body.style.overflow = "auto";
};

/* ================================
   EMAILJS FEEDBACK FORM INTEGRATION
   ================================ */

// Initialize EmailJS with your public key
(function () {
  emailjs.init("kFFGuGyWPPiZVQgNo"); // replace with your EmailJS Public Key
})();

// Feedback form submit function
window.submitFeedback = function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

  // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual IDs
  emailjs
    .send("service_dbv7w6v", "template_s0ah9dt", templateParams)
    .then(function (response) {
      alert("✅ Feedback sent successfully! Thank you.");
      document.querySelector(".feedback-form").reset();
    })
    .catch(function (error) {
      alert("❌ Failed to send feedback. Please try again.");
      console.error("error:", error);
    });
};

 // Social Links Configuration
        // Simply edit the URLs below to change where each icon links to
        const socialLinks = {
            twitter: 'https://twitter.com/yourchannel',
            youtube: 'https://youtube.com/@yourchannel',
            tiktok: 'https://tiktok.com/@yourchannel',
            discord: 'https://discord.gg/yourserver',
            github: 'https://github.com/yourusername',
            huggingface: 'https://huggingface.co/yourusername',
            microsoft: 'https://www.microsoft.com',
            linkedin: 'https://linkedin.com/in/yourprofile',
            website: 'https://yourwebsite.com'
        };

        // SVG Icons Data
        const icons = {
            twitter: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
            youtube: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
            tiktok: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
            discord: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
            github: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
            huggingface: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.286c5.373 0 9.714 4.34 9.714 9.714S17.373 21.714 12 21.714 2.286 17.373 2.286 12 6.627 2.286 12 2.286zM8.857 8.571a1.714 1.714 0 1 0 0 3.429 1.714 1.714 0 0 0 0-3.429zm6.286 0a1.714 1.714 0 1 0 0 3.429 1.714 1.714 0 0 0 0-3.429zM12 13.714c-2.122 0-3.857 1.029-3.857 2.286h7.714c0-1.257-1.735-2.286-3.857-2.286z"/></svg>',
            microsoft: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.4 0H0v11.4h11.4V0zm12.6 0H12.6v11.4H24V0zM11.4 12.6H0V24h11.4V12.6zm12.6 0H12.6V24H24V12.6z"/></svg>',
            linkedin: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
            website: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.5 11h-3.844c-.066-2.245-.506-4.364-1.256-6.194C18.615 5.937 20.669 8.254 21.5 11zM12 2c.684 0 2.098 2.377 2.386 5h-4.772C9.902 4.377 11.316 2 12 2zM2.5 13h3.844c.066 2.245.506 4.364 1.256 6.194C5.385 18.063 3.331 15.746 2.5 13zm5.347 0h4.653v5.682C11.053 17.458 9.202 15.542 7.847 13zm4.653-2H7.847C9.202 8.458 11.053 6.542 12.5 7.766V11zm6.653 0h-4.653V7.318c1.447-1.224 3.298.692 4.653 3.682zm-4.653 2h4.653c-1.355 2.542-3.206 4.458-4.653 3.234V13zm-2 0v5.682c-1.447 1.224-3.298-.692-4.653-3.682H12.5zM7.4 4.806C6.65 6.636 6.21 8.755 6.144 11H2.5c.831-2.746 2.885-5.063 5.1-6.194zM2.5 13c.831 2.746 2.885 5.063 5.1 6.194C6.65 17.364 6.21 15.245 6.144 13H2.5zm14.1 6.194C17.35 17.364 17.79 15.245 17.856 13H21.5c-.831 2.746-2.885 5.063-5.1 6.194z"/></svg>'
        };

        // Label mapping for accessibility
        const labels = {
            twitter: 'X (Twitter)',
            youtube: 'YouTube',
            tiktok: 'TikTok',
            discord: 'Discord',
            github: 'GitHub',
            huggingface: 'Hugging Face',
            microsoft: 'Microsoft',
            linkedin: 'LinkedIn',
            website: 'Website'
        };

        // Generate social links
        function generateSocialLinks() {
            const container = document.getElementById('social-links');
            
            for (const [platform, url] of Object.entries(socialLinks)) {
                if (icons[platform]) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('aria-label', labels[platform]);
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                    link.innerHTML = icons[platform];
                    container.appendChild(link);
                }
            }
        }

        // Initialize on page load
        generateSocialLinks();
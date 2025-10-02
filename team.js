let currentSlideIndex = 0;
const slides = document.querySelectorAll(".team-slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;

function goHome() {
  // Add a smooth transition effect before redirecting
  document.body.style.opacity = "0.8";
  document.body.style.transform = "scale(0.98)";
  document.body.style.transition = "all 0.3s ease";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 200);
}

function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active class to current slide and dot
  slides[index].classList.add("active");
  dots[index].classList.add("active");

  // Center the active slide
  const carousel = document.getElementById("teamCarousel");
  const slideWidth = slides[0].offsetWidth + 20; // width + margin
  const containerWidth = carousel.parentElement.offsetWidth;
  const offset = containerWidth / 2 - slideWidth / 2 - index * slideWidth;

  carousel.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(currentSlideIndex);
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Click on slide to make it active
slides.forEach((slide, index) => {
  slide.addEventListener("click", (e) => {
    if (!isDragging) {
      currentSlideIndex = index;
      showSlide(currentSlideIndex);
    }
  });
});

// Initialize carousel position
window.addEventListener("load", () => {
  showSlide(currentSlideIndex);
});

// Handle window resize
window.addEventListener("resize", () => {
  showSlide(currentSlideIndex);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prevSlide();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    nextSlide();
  }
});

// Mouse drag support
let startX = 0;
let isDragging = false;
let currentX = 0;

const carousel = document.getElementById("teamCarousel");

// Mouse events for dragging
carousel.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  isDragging = true;
  carousel.style.cursor = "grabbing";
  e.preventDefault();
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  currentX = e.clientX;
  const diffX = currentX - startX;

  // Visual feedback while dragging
  const slideWidth = slides[0].offsetWidth + 20;
  const containerWidth = carousel.parentElement.offsetWidth;
  const baseOffset =
    containerWidth / 2 - slideWidth / 2 - currentSlideIndex * slideWidth;

  carousel.style.transform = `translateX(${baseOffset + diffX}px)`;
});

carousel.addEventListener("mouseup", (e) => {
  if (!isDragging) return;

  const endX = e.clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 80) {
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  } else {
    showSlide(currentSlideIndex);
  }

  isDragging = false;
  carousel.style.cursor = "grab";
});

carousel.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    carousel.style.cursor = "grab";
    showSlide(currentSlideIndex);
  }
});

// Touch/swipe support for mobile
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
});

carousel.addEventListener("touchend", (e) => {
  if (!isDragging) return;

  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  isDragging = false;
});

// Set initial cursor
carousel.style.cursor = "grab";

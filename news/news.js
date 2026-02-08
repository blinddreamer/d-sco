// --- CAROUSEL SETUP ---
const track = document.getElementById("carouselTrack");
let index = 0;
let visibleCount = 3;

// Detect visible count from CSS
function updateVisibleCount() {
  if (window.innerWidth <= 720) visibleCount = 1;
  else if (window.innerWidth <= 1050) visibleCount = 2;
  else visibleCount = 3;
}

// Setup Carousel (infinite loop removed for simplicity)
function setupCarousel() {
  // Nothing here since infinite looping removed
}

// Move carousel left/right
function moveCarousel(dir) {
  updateVisibleCount();

  const item = track.firstElementChild;
  const style = getComputedStyle(track);
  const gap = parseFloat(style.gap) || 10;
  const imgWidth = (item ? item.offsetWidth : 250) + gap;

  const maxIndex = Math.max(0, track.children.length - visibleCount);

  index += dir;

  if (index < 0) {
    index = 0;
  } else if (index > maxIndex) {
    index = maxIndex;
  }

  track.style.transform = `translateX(${-index * imgWidth}px)`;
}

// --- LIGHTBOX ---
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const fullSizeLink = document.getElementById("fullSizeLink");

  lightboxImg.src = img.src;
  fullSizeLink.href = img.src; // set link to original image
  lightbox.style.display = "flex";
}

function closeLightbox(e) {
  // Prevent closing if user clicked the "Open Full Size" link
  if (e && e.target.id === "fullSizeLink") return;

  document.getElementById("lightbox").style.display = "none";
}

// --- CAROUSEL TITLES ---
document.querySelectorAll(".carousel-item").forEach((item) => {
  const title = item.dataset.title;
  const titleEl = document.createElement("div");
  titleEl.className = "carousel-title";
  titleEl.textContent = title;
  item.appendChild(titleEl);
});

// --- WINDOW RESIZE ---
window.addEventListener("resize", () => {
  index = 0;
  track.style.transform = "translateX(0)";
});

// --- INITIALIZE ---
updateVisibleCount();
setupCarousel();

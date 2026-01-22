const track = document.getElementById("carouselTrack");
let index = 0;
let visibleCount = 3;

// Detect visible count from CSS
function updateVisibleCount() {
  if (window.innerWidth <= 720) visibleCount = 1;
  else if (window.innerWidth <= 1050) visibleCount = 2;
  else visibleCount = 3;
}

// Duplicate images to allow infinite looping
function setupCarousel() {
  // Infinite loop removed
}

function moveCarousel(dir) {
  updateVisibleCount();
  const imgWidth = 260; // image (250) + gap (10)
  const maxIndex = Math.max(0, track.children.length - visibleCount);

  index += dir;

  if (index < 0) {
    index = 0;
  } else if (index > maxIndex) {
    index = maxIndex;
  }

  track.style.transform = `translateX(${-index * imgWidth}px)`;
}

function openLightbox(img) {
  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

window.addEventListener("resize", () => {
  index = 0;
  track.style.transform = "translateX(0)";
});

document.querySelectorAll(".carousel-item").forEach((item) => {
  const title = item.dataset.title;
  const titleEl = document.createElement("div");
  titleEl.className = "carousel-title";
  titleEl.textContent = title;
  item.appendChild(titleEl);
});

updateVisibleCount();
setupCarousel();

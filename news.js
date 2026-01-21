const track = document.getElementById("carouselTrack");
let index = 0;
let visibleCount = 3;

// Detect visible count from CSS
function updateVisibleCount() {
  if (window.innerWidth <= 600) visibleCount = 1;
  else if (window.innerWidth <= 900) visibleCount = 2;
  else visibleCount = 3;
}

// Duplicate images to allow infinite looping
function setupCarousel() {
  const originals = Array.from(track.children);
  while (track.children.length < originals.length + visibleCount * 2) {
    originals.forEach((img) => {
      track.appendChild(img.cloneNode(true));
    });
  }
}

function moveCarousel(dir) {
  updateVisibleCount();
  const imgWidth = 240; // image + gap
  index += dir;

  if (index < 0) {
    index = track.children.length - visibleCount;
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

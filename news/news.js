// --- CAROUSEL SETUP ---
const track = document.getElementById("carouselTrack");
let index = 0;
let visibleCount = 3;

function updateVisibleCount() {
  if (window.innerWidth <= 720) visibleCount = 1;
  else if (window.innerWidth <= 1050) visibleCount = 2;
  else visibleCount = 3;
}

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
  fullSizeLink.href = img.src;
  lightbox.style.display = "flex";
}

function closeLightbox(e) {
  if (e && e.target.id === "fullSizeLink") return;
  document.getElementById("lightbox").style.display = "none";
}

// --- BUILD CAROUSEL FROM JSON ---
fetch("../assets/news/news-data.json")
  .then((res) => res.json())
  .then((items) => {
    items.forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "carousel-item";
      div.dataset.title = item.title;

      if (i === 0) {
        const badge = document.createElement("div");
        badge.className = "latest-badge";
        badge.textContent = "HOT";
        div.appendChild(badge);
      }

      const img = document.createElement("img");
      img.src = `../assets/news/${item.file}`;
      img.className = "carousel-img";
      img.onclick = () => openLightbox(img);
      div.appendChild(img);

      const titleEl = document.createElement("div");
      titleEl.className = "carousel-title";
      titleEl.textContent = item.title;
      div.appendChild(titleEl);

      track.appendChild(div);
    });

    updateVisibleCount();
  });

// --- WINDOW RESIZE ---
window.addEventListener("resize", () => {
  index = 0;
  track.style.transform = "translateX(0)";
});

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
  if (!item) return;

  const style = getComputedStyle(track);
  const gap = parseFloat(style.gap) || 10;
  const imgWidth = item.offsetWidth + gap;

  const maxIndex = Math.max(0, track.children.length - visibleCount);

  index = Math.min(Math.max(index + dir, 0), maxIndex);

  track.style.transform = `translateX(${-index * imgWidth}px)`;
}

// --- LIGHTBOX ---
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("fullSizeLink").href = img.src;
  lightbox.style.display = "flex";
}

function closeLightbox(e) {
  if (e && e.target.id === "fullSizeLink") return;
  document.getElementById("lightbox").style.display = "none";
}

// --- TOUCH / SWIPE ---
let touchStartX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) moveCarousel(diff > 0 ? 1 : -1);
}, { passive: true });

// --- BUILD CAROUSEL FROM JSON ---
fetch("assets/news/news-data.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load news");
    return res.json();
  })
  .then((items) => {
    items.forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "carousel-item";

      if (i === 0) {
        const badge = document.createElement("div");
        badge.className = "latest-badge";
        badge.textContent = "HOT";
        div.appendChild(badge);
      }

      const img = document.createElement("img");
      img.src = `assets/news/${item.file}`;
      img.className = "carousel-img";
      img.alt = item.title;
      img.onclick = () => openLightbox(img);
      div.appendChild(img);

      const titleEl = document.createElement("div");
      titleEl.className = "carousel-title";
      titleEl.textContent = item.title;
      div.appendChild(titleEl);

      track.appendChild(div);
    });

    updateVisibleCount();
  })
  .catch(() => {
    const msg = document.createElement("p");
    msg.style.cssText = "color:#666;font-size:0.85rem;letter-spacing:1px;padding:20px;";
    msg.textContent = "No news available.";
    track.appendChild(msg);
  });

// --- WINDOW RESIZE ---
window.addEventListener("resize", () => {
  updateVisibleCount();
  index = 0;
  track.style.transform = "translateX(0)";
});

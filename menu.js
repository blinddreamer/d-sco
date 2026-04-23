const hamburger = document.getElementById("hamburger");
const overlay = document.getElementById("mobile-overlay");
const closeBtn = document.getElementById("mobile-close");

function openMenu() {
  overlay.style.display = "flex";
  requestAnimationFrame(() => overlay.classList.add("open"));
}

function closeMenu() {
  overlay.classList.remove("open");
  overlay.addEventListener("transitionend", () => {
    overlay.style.display = "none";
  }, { once: true });
}

if (hamburger) hamburger.addEventListener("click", openMenu);
if (closeBtn) closeBtn.addEventListener("click", closeMenu);

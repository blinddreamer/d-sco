(function () {
  var hamburger = document.getElementById("hamburger");
  var overlay   = document.getElementById("mobile-overlay");
  var closeBtn  = document.getElementById("mobile-close");

  function openMenu() {
    overlay.style.display = "flex";
    requestAnimationFrame(function () { overlay.classList.add("open"); });
  }

  function closeMenu() {
    overlay.classList.remove("open");
    overlay.addEventListener("transitionend", function () {
      overlay.style.display = "none";
    }, { once: true });
  }

  if (hamburger) hamburger.addEventListener("click", openMenu);
  if (closeBtn)  closeBtn.addEventListener("click", closeMenu);
})();

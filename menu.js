(function () {
  var hamburger = document.getElementById("hamburger");
  var menu      = document.getElementById("mobile-overlay");
  var closeBtn  = document.getElementById("mobile-close");
  if (!hamburger || !menu) return;

  // <dialog> gives us focus trap, Esc-to-close and focus return for free.
  hamburger.addEventListener("click", function () {
    menu.showModal();
    hamburger.setAttribute("aria-expanded", "true");
  });
  closeBtn.addEventListener("click", function () { menu.close(); });
  menu.addEventListener("close", function () {
    hamburger.setAttribute("aria-expanded", "false");
  });
})();

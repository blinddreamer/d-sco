(function () {
  var purifier = document.querySelector(".purifier-link");
  var egg      = document.querySelector(".easter-egg");
  if (!purifier || !egg) return;

  purifier.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    egg.classList.toggle("hidden");
  });

  document.addEventListener("click", function () {
    if (!egg.classList.contains("hidden")) egg.classList.add("hidden");
  });
})();

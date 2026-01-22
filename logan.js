const purifier = document.querySelector(".purifier-link");
const egg = document.querySelector(".easter-egg");

purifier.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation(); // important
  egg.classList.toggle("hidden");
});

// close when clicking anywhere else
document.addEventListener("click", () => {
  if (!egg.classList.contains("hidden")) {
    egg.classList.add("hidden");
  }
});

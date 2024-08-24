window.addEventListener("scroll", function () {
  const stickyElement = document.getElementById("stickyElement");
  const stickyOffset = stickyElement.offsetTop;

  if (window.pageYOffset > stickyOffset) {
    stickyElement.classList.add("bg-orange-400");
    stickyElement.classList.remove("bg-blue-300");
  } else {
    stickyElement.classList.add("bg-blue-300");
    stickyElement.classList.remove("bg-orange-400");
  }
});

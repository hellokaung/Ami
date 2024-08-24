const tabs = document.querySelectorAll(".tab");
const swiperWrapper = document.querySelector(".swiper-wrapper");
let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// Function to set the active slide and tab
function setActiveSlide(index) {
  currentIndex = index;
  currentTranslate = -currentIndex * window.innerWidth;
  prevTranslate = currentTranslate;
  swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;

  // Update active tab
  document.querySelector(".tab.active").classList.remove("active");
  tabs[currentIndex].classList.add("active");
}

// Add event listeners to the tabs
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    setActiveSlide(index);
  });
});

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

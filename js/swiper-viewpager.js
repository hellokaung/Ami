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

// Touch Events
swiperWrapper.addEventListener("touchstart", touchStart);
swiperWrapper.addEventListener("touchend", touchEnd);
swiperWrapper.addEventListener("touchmove", touchMove);

// Mouse Events
swiperWrapper.addEventListener("mousedown", touchStart);
swiperWrapper.addEventListener("mouseup", touchEnd);
swiperWrapper.addEventListener("mouseleave", touchEnd);
swiperWrapper.addEventListener("mousemove", touchMove);

function touchStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  swiperWrapper.style.transition = "none";
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < tabs.length - 1) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setActiveSlide(currentIndex);

  swiperWrapper.style.transition = "transform 0.4s ease-in-out";
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

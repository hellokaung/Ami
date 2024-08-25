const changeDate = document.getElementById("change-date");
const datePicker = document.getElementById("date-picker");
changeDate.addEventListener("click", () => {
  // Change the class of the content div
  datePicker.classList.toggle("hidden");
  datePicker.classList.toggle("block");
});
// JavaScript code for saving date and time
let date = document.getElementById("datePicker").value;
const time = document.getElementById("timePicker").value || "00:00:00"; // Default time
const saveBtn = document.getElementById("saveBtn");
document.getElementById("datePicker").addEventListener("change", () => {
  date = document.getElementById("datePicker").value;
  if (date) {
    saveBtn.textContent = `Save`;
  } else {
    saveBtn.textContent = "Close";
  }
});
saveBtn.addEventListener("click", function () {
  date = document.getElementById("datePicker").value;
  if (date) {
    const dateTime = `${date}T${time}`;
    localStorage.setItem("savedDate", dateTime);
    location.reload();
  } else {
    datePicker.classList.toggle("block");
    datePicker.classList.toggle("hidden");
  }
});

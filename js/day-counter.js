const startDate = new Date("2022-11-27T00:00:00"); // Set the common start date

// Year Progress Section
function updateProgressBar(startDate) {
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerHour = 60 * 60 * 1000;
  const msPerMinute = 60 * 1000;
  const msPerSecond = 1000;

  // Calculate the total time passed since the start date
  const totalMsPassed = now - startDate;
  const totalDaysPassed = Math.floor(totalMsPassed / msPerDay);

  let displayText = "";

  if (totalDaysPassed > 0) {
    // Display days if there are any days passed
    displayText = ` ${totalDaysPassed} Days`;
  } else {
    const totalHoursPassed = Math.floor(totalMsPassed / msPerHour);
    if (totalHoursPassed > 0) {
      // Display hours if no days but there are hours passed
      displayText = ` ${totalHoursPassed} Hours`;
    } else {
      const totalMinutesPassed = Math.floor(totalMsPassed / msPerMinute);
      if (totalMinutesPassed > 0) {
        // Display minutes if no hours but there are minutes passed
        displayText = ` ${totalMinutesPassed} Minutes`;
      } else {
        const totalSecondsPassed = Math.floor(totalMsPassed / msPerSecond);
        // Display seconds if no minutes but there are seconds passed
        displayText = ` ${totalSecondsPassed} Seconds`;
      }
    }
  }

  // Calculate leap years to adjust the year calculation
  const yearsPassed = Math.floor(totalDaysPassed / 365.25); // Adjust for leap years
  const daysInCurrentYear = totalDaysPassed % 365.25;

  // Calculate percentage progress in the current year
  const progressPercent = (daysInCurrentYear / 365) * 100;

  // Update the progress bar and text
  const progressBar = document.getElementById("progress");
  progressBar.style.width = progressPercent + "%";
  document.getElementById("progress-text").textContent =
    Math.floor(progressPercent) + "%";

  // Update labels for the start and end of the progress
  document.getElementById("label-left").textContent = `${yearsPassed} years`;
  document.getElementById("label-right").textContent = `${
    yearsPassed + 1
  } years`;

  // Update the days info
  document.getElementById("days-info").textContent = displayText;
}

function startProgressTracker() {
  updateProgressBar(startDate);
  setInterval(() => updateProgressBar(startDate), 1000);
}
startProgressTracker();

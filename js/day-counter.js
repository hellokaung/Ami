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

// Time Difference Section
function calculateTimeDifference(startDate) {
  const now = new Date();
  let years, months, days, hours, minutes, seconds;

  years = now.getFullYear() - startDate.getFullYear();
  months = now.getMonth() - startDate.getMonth();
  days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  hours = now.getHours() - startDate.getHours();
  minutes = now.getMinutes() - startDate.getMinutes();
  seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    minutes--;
    seconds += 60;
  }
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }
  if (hours < 0) {
    days--;
    hours += 24;
  }

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

function startCountdown() {
  calculateTimeDifference(startDate);
  setInterval(() => calculateTimeDifference(startDate), 1000);
}
startCountdown();

// Upcoming Anniversaries Section
function calculateAnniversaries(startDate, yearsAhead) {
  const now = new Date();
  const anniversaries = [];

  for (let yearOffset = 0; yearOffset <= yearsAhead; yearOffset++) {
    for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
      // Calculate the anniversary date
      const anniversaryDate = new Date(startDate);
      anniversaryDate.setFullYear(startDate.getFullYear() + yearOffset);
      anniversaryDate.setMonth(startDate.getMonth() + monthOffset);

      // Handle invalid dates due to month overflow
      if (anniversaryDate.getDate() !== startDate.getDate()) {
        anniversaryDate.setDate(0); // Set to the last day of the previous month
      }

      // Skip anniversaries in the past
      if (anniversaryDate >= now) {
        const diffInMillis = anniversaryDate - now;
        const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
        const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));

        anniversaries.push({
          date: anniversaryDate,
          year: yearOffset,
          month: monthOffset,
          daysUntil: diffInDays,
          hoursUntil: diffInHours,
          minutesUntil: diffInMinutes,
        });
      }
    }
  }

  return anniversaries;
}

function displayAnniversaries(anniversaries) {
  const list = document.getElementById("anniversary-list");

  anniversaries.forEach((anniversary) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "text-base",
      "shadow-lg",
      "mb-5",
      "rounded-lg",
      "p-3",
      "shadow-purple-400",
      "bg-purple-400",
      "hover:shadow-md"
    );

    let displayText = `In ${anniversary.daysUntil} days: ${
      anniversary.year
    } years and ${
      anniversary.month
    } months anniversary on ${anniversary.date.toDateString()}`;

    // Check if the countdown is less than a day
    if (anniversary.daysUntil === 0) {
      if (anniversary.hoursUntil === 0) {
        const minutesLeft = anniversary.minutesUntil % 60;
        displayText = `In ${minutesLeft} minutes: ${
          anniversary.year
        } years and ${
          anniversary.month
        } months anniversary on ${anniversary.date.toDateString()}`;
      } else {
        const hoursLeft = anniversary.hoursUntil % 24;
        displayText = `In ${hoursLeft} hours: ${anniversary.year} years and ${
          anniversary.month
        } months anniversary on ${anniversary.date.toDateString()}`;
      }
    }
    displayText = displayText.replace(": 0 years and", ": ");
    // Highlight special anniversaries
    if (anniversary.month % 12 === 0) {
      listItem.classList.add("text-white");
      listItem.classList.add("font-bold");
      displayText = displayText.replace("and 0 months", "");
      displayText += " 🎉 Special Yearly Anniversary!";
    }

    // Highlight today's anniversary
    if (
      anniversary.daysUntil === 0 &&
      anniversary.hoursUntil === 0 &&
      anniversary.minutesUntil === 0
    ) {
      listItem.classList.add("special-today");
      displayText = `🎉 Today is the ${anniversary.year} years and ${anniversary.month} months anniversary! 🎉`;
    }

    listItem.textContent = displayText;
    list.appendChild(listItem);
  });
}

function startAnniversaryTracker() {
  const anniversaries = calculateAnniversaries(startDate, 20);
  displayAnniversaries(anniversaries);
}

startAnniversaryTracker();

// Anniversary Check Section
function checkAnniversary(startDate) {
  const now = new Date();
  const anniversaryThisYear = new Date(startDate);
  anniversaryThisYear.setFullYear(now.getFullYear());

  if (anniversaryThisYear.toDateString() === now.toDateString()) {
    const yearsPassed = now.getFullYear() - startDate.getFullYear();
    const monthsPassed = now.getMonth() - startDate.getMonth();
    const daysPassed = now.getDate() - startDate.getDate();

    let totalMonths = yearsPassed * 12 + monthsPassed;
    if (daysPassed < 0) {
      totalMonths -= 1;
      const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
      const daysInPreviousMonth = previousMonth.getDate();
      daysPassed += daysInPreviousMonth;
    }
    document.getElementById("anniversary-status").textContent =
      "Congratulation";
    document
      .getElementById("progress-bar")
      .classList.add("bg-purple-600", "shadow-inner", "shadow-lime-700");
    document.getElementById("progress").classList.add("bg-purple-600");

    document.getElementById("anniversary-info").innerHTML =
      `<span class="text-lime-200 font-bold text-xl ">🎉 Today is the anniversary! 🎉</span>` +
      `<br>It's been <span class="text-lime-200 font-bold text-xl "> ${yearsPassed} years</span>, since ${startDate.toDateString()}.`;
  } else {
    // Calculate how long ago or until the next anniversary
    const nextAnniversary = new Date(startDate);
    nextAnniversary.setFullYear(
      now.getFullYear() + (now > anniversaryThisYear ? 1 : 0)
    );

    const countdownElem = document.getElementById("anniversary-info");

    const intervalId = setInterval(() => {
      const now = new Date();
      const diffInMillis = nextAnniversary - now;
      const diffInSeconds = Math.floor(diffInMillis / 1000);

      if (diffInMillis <= 0) {
        clearInterval(intervalId);
        countdownElem.textContent = "The anniversary is today!";
        return;
      }

      const days = Math.floor(diffInSeconds / (60 * 60 * 24));
      const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
      const seconds = diffInSeconds % 60;

      countdownElem.innerHTML =
        `The next anniversary is in ${days} days: ${hours} hours: ${minutes} minutes: ${seconds} seconds`
          .replace("1 days", "1 day")
          .replace("0 days:", "");
    }, 1000);
  }
}

checkAnniversary(startDate);

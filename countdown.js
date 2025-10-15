// countdown.js (corrected)
// Shows a countdown to March 1 of next year and toggles show/hide via #launchBtn.
// Safe: checks for element existence and cleans up intervals.

document.addEventListener("DOMContentLoaded", () => {
  const launchBtn = document.getElementById("launchBtn");
  const countdownEl = document.getElementById("countdown");
  const launchDateEl = document.getElementById("launchDate");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Build launch date: March 1 of next calendar year at 00:00:00 local time
  const now = new Date();
  const currentYear = now.getFullYear();
  const launchYear = currentYear + 1;
  const launchDate = new Date(launchYear, 2, 1, 0, 0, 0); // month index 2 = March

  // If target elements missing, bail gracefully
  if (!countdownEl || !launchDateEl || !launchBtn) return;

  // Format and show the launch date text
  const humanDate = launchDate.toLocaleString(undefined, {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
  launchDateEl.textContent = `Launch: ${humanDate}`;

  let intervalId = null;
  let active = false;

  function formatTime(ms) {
    if (ms <= 0) return "0d 0h 0m 0s";
    const totalSec = Math.floor(ms / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function updateOnce() {
    const now = new Date();
    const diff = launchDate - now;
    countdownEl.textContent = formatTime(diff);
    if (diff <= 0) {
      // Reached launch: stop interval and set final state
      clearInterval(intervalId);
      intervalId = null;
      countdownEl.textContent = "Launched!";
    }
  }

  // Toggle handler
  launchBtn.addEventListener("click", () => {
    if (!active) {
      // Show countdown
      launchDateEl.style.display = "block";
      updateOnce();
      countdownEl.classList.add("show");
      launchDateEl.classList.add("show");
      launchBtn.classList.add("active");
      intervalId = setInterval(updateOnce, 1000);
      launchBtn.textContent = "Hide Countdown";
      active = true;
    } else {
      // Hide countdown
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      countdownEl.classList.remove("show");
      launchDateEl.classList.remove("show");
      launchBtn.classList.remove("active");
      launchBtn.textContent = "Show Countdown";
      active = false;
    }
  });
});

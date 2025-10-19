// Countdown target (March 1, 2026 at 00:00 Kuala Lumpur time, UTC+8)
const target = new Date("2026-03-01T00:00:00+08:00").getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = Date.now();
  let diff = target - now;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    clearInterval(timerInterval);
    // Optionally show a "Launched" message or other UI update here.
    return;
  }

  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / (3600 * 24));
  const hours = Math.floor((s % (3600 * 24)) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// ---------------------------
// Waitlist form (Formspree integration)
// ---------------------------

const form = document.getElementById('waitlistForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  feedback.textContent = "";

  const email = form.email.value.trim();
  const name = form.name.value.trim();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    return;
  }

  // Submit form data to Formspree (the form action attribute handles the POST)
  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name })
    });

    if (res.ok) {
      feedback.textContent = "Thanks — you're on the list. We'll be in touch.";
      form.reset();
    } else {
      feedback.textContent = "Something went wrong. Try again later.";
    }
  } catch (err) {
    feedback.textContent = "Network error. Try again later.";
  }
});

// ---------------------------
// Misc UI enhancements
// ---------------------------

// Update footer year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// "Remind me" button action
document.getElementById('subscribeLater').addEventListener('click', () => {
  alert("Set a reminder for March 1, 2026 — or join the waitlist for automatic updates.");
});
// Header fade effect on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

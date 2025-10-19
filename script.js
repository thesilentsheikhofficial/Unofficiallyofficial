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
  } catch {
    feedback.textContent = "Network error. Try again later.";
  }
});

// ---------------------------
// Misc UI enhancements
// ---------------------------

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Remind me button
document.getElementById('subscribeLater').addEventListener('click', () => {
  alert("Set a reminder for March 1, 2026 — or join the waitlist for automatic updates.");
});

// Header fade (80% → 90%)
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

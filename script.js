const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const yearEl = document.getElementById("year");

/* Menü */
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

/* Footer yıl */
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* Tema */
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) {
      themeToggle.textContent = "☀️ Gündüz";
    }
  } else {
    document.body.classList.remove("dark");
    if (themeToggle) {
      themeToggle.textContent = "🌙 Gece";
    }
  }
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
}

/* Ana sayfa slider */
const track = document.getElementById("sliderTrack");
const dots = document.querySelectorAll(".slider-btn");

if (track && dots.length > 0) {
  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  setInterval(() => {
    const next = (currentSlide + 1) % dots.length;
    showSlide(next);
  }, 3500);

  showSlide(0);
}

/* Geri sayım */
function startCountdown(targetDate, prefix) {
  const daysEl = document.getElementById(`${prefix}-days`);
  const hoursEl = document.getElementById(`${prefix}-hours`);
  const minutesEl = document.getElementById(`${prefix}-minutes`);
  const secondsEl = document.getElementById(`${prefix}-seconds`);
  const noteEl = document.getElementById(`${prefix}-note`);

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minutesEl.textContent = "0";
      secondsEl.textContent = "0";

      if (noteEl) {
        noteEl.textContent = "Sınav günü geldi. Başarılar!";
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    if (noteEl) {
      noteEl.textContent = "Geri sayım otomatik olarak canlı güncellenir.";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

startCountdown(new Date("2026-06-20T10:15:00+03:00").getTime(), "tyt");
startCountdown(new Date("2026-06-21T10:15:00+03:00").getTime(), "ayt");

/* SSS açılır kapanır */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
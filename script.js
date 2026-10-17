/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Highlight the current section in the nav ---------- */
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", highlightNav);
highlightNav();

/* ---------- Skill bars animate when scrolled into view ---------- */
document.documentElement.classList.add("js");

const skillsBlock = document.querySelector(".skills");

if (skillsBlock && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsBlock.classList.add("live");
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(skillsBlock);
} else if (skillsBlock) {
  skillsBlock.classList.add("live");
}

/* ---------- Settings panel (theme, accent color, text size) ---------- */
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const themeSelect = document.getElementById("themeSelect");
const accentSelect = document.getElementById("accentSelect");
const fontRange = document.getElementById("fontRange");
const resetBtn = document.getElementById("resetSettings");
const root = document.documentElement;

const defaults = { theme: "dark", accent: "amber", font: "100" };

function applySettings(s) {
  root.setAttribute("data-theme", s.theme);
  root.setAttribute("data-accent", s.accent);
  root.style.setProperty("--font-scale", s.font + "%");
  themeSelect.value = s.theme;
  accentSelect.value = s.accent;
  fontRange.value = s.font;
}

function saveSettings() {
  try {
    localStorage.setItem("portfolioSettings", JSON.stringify({
      theme: themeSelect.value, accent: accentSelect.value, font: fontRange.value,
    }));
  } catch (e) { /* storage unavailable; ignore */ }
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("portfolioSettings"));
    return saved ? { ...defaults, ...saved } : defaults;
  } catch (e) { return defaults; }
}

applySettings(loadSettings());

settingsBtn.addEventListener("click", () => {
  const isOpen = settingsPanel.classList.toggle("open");
  settingsBtn.setAttribute("aria-expanded", isOpen);
  settingsPanel.setAttribute("aria-hidden", !isOpen);
});

[themeSelect, accentSelect, fontRange].forEach((control) => {
  control.addEventListener("input", () => {
    applySettings({ theme: themeSelect.value, accent: accentSelect.value, font: fontRange.value });
    saveSettings();
  });
});

resetBtn.addEventListener("click", () => {
  applySettings(defaults);
  saveSettings();
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
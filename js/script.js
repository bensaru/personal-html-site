/* 
Project Name: Bensaru personal website
Description: A complete responsive personal website design
             by using HTML CSS and Vanilla JavaScript from scratch.
Author: Ben Sakai
Github: https://github.com/bensaru
License: MIT License
Copyright: 2026 ©Ben Sakai 
*/

// Typing animation
var typed = new Typed(".typing", {
  strings: [
    "",
    "",
    "Full Stack Developer",
    "Blockchain Developer",
    "Game Developer",
  ],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});

// Aside
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    for (let k = 0; k < totalSection; k++) {
      allSection[k].classList.remove("back-section");
    }
    //Loop for removing active class
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        allSection[j].classList.add("back-section");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    //Adding active class
    this.classList.add("active");
    showSection(this); //Function call
    //Nav click event - Hiding the nav menu
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}
function showSection(element) {
  //Loop for removing active class
  for (let k = 0; k < totalSection; k++) {
    allSection[k].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}

//For Hire me section
document.querySelector(".hire-me").addEventListener("click", function () {
  showSection(this);
  updateNav(this);
});

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}

//For Nav Toggler Button
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
}

// Portfolio filter by category (each card has data-categories as array)
function initPortfolioFilter() {
  const portfolioSection = document.getElementById("portfolio");
  if (!portfolioSection) return;

  portfolioSection.addEventListener("click", function (e) {
    const btn = e.target.closest("button.portfolio-filter");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const category = btn.getAttribute("data-category");
    if (!category) return;

    const portfolioGrid = document.getElementById("portfolio-grid");
    if (!portfolioGrid) return;

    const portfolioItems = portfolioGrid.querySelectorAll(".portfolio-item");
    const filterButtons = portfolioSection.querySelectorAll(".portfolio-filter");

    filterButtons.forEach(function (b) {
      b.classList.remove("is-active");
    });
    btn.classList.add("is-active");

    portfolioItems.forEach(function (item) {
      var categories = [];
      try {
        var raw = item.getAttribute("data-categories");
        if (raw) categories = JSON.parse(raw);
      } catch (err) {
        categories = [];
      }
      var show = category === "all" || categories.indexOf(category) !== -1;
      item.classList.toggle("portfolio-item--hidden", !show);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolioFilter);
} else {
  initPortfolioFilter();
}

// Contact form: validate all fields, show error if empty, else open mailto
function initContactForm() {
  const form = document.getElementById("contact-form");
  const errorEl = document.getElementById("contact-form-error");
  if (!form || !errorEl) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.style.display = "none";
    errorEl.textContent = "";

    const name = (form.querySelector('input[name="name"]') || {}).value || "";
    const email = (form.querySelector('input[name="email"]') || {}).value || "";
    const subject = (form.querySelector('input[name="subject"]') || {}).value || "";
    const body = (form.querySelector('textarea[name="body"]') || {}).value || "";

    const trim = function (s) { return (s && String(s).trim()) || ""; };
    const trimmedName = trim(name);
    const trimmedEmail = trim(email);
    const trimmedSubject = trim(subject);
    const trimmedBody = trim(body);

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedBody) {
      const missing = [];
      if (!trimmedName) missing.push("Name");
      if (!trimmedEmail) missing.push("Email");
      if (!trimmedSubject) missing.push("Subject");
      if (!trimmedBody) missing.push("Message");
      errorEl.textContent = "Please fill in all fields: " + missing.join(", ") + ".";
      errorEl.style.display = "block";
      return;
    }

    const encodedSubject = encodeURIComponent(trimmedSubject);
    const encodedBody = encodeURIComponent(
      "From: " + trimmedName + " <" + trimmedEmail + ">\n\n" + trimmedBody
    );
    const mailto = "mailto:vensakai1030@gmail.com?subject=" + encodedSubject + "&body=" + encodedBody;
    window.location.href = mailto;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactForm);
} else {
  initContactForm();
}

// Portfolio image modal: open on eye icon click, close on backdrop or Escape
const portfolioModal = document.getElementById("portfolio-modal");
const portfolioModalImg = document.querySelector(".portfolio-modal__img");
const portfolioModalBackdrop = document.querySelector(".portfolio-modal__backdrop");

function openPortfolioModal(src, alt) {
  if (!portfolioModal || !portfolioModalImg) return;
  portfolioModalImg.src = src;
  portfolioModalImg.alt = alt || "Project preview";
  portfolioModal.classList.add("is-open");
  portfolioModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePortfolioModal() {
  if (!portfolioModal) return;
  portfolioModal.classList.remove("is-open");
  portfolioModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("click", function (e) {
  const eyeLink = e.target.closest(".portfolio-card__action[aria-label='Preview']");
  if (eyeLink) {
    e.preventDefault();
    const card = eyeLink.closest(".portfolio-card");
    const img = card ? card.querySelector(".portfolio-card__img img") : null;
    if (img && img.src) openPortfolioModal(img.src, img.alt);
  }
});

if (portfolioModalBackdrop) portfolioModalBackdrop.addEventListener("click", closePortfolioModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && portfolioModal && portfolioModal.classList.contains("is-open")) {
    closePortfolioModal();
  }
});

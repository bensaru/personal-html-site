/* 
Project Name: Bensaru personal website
Description: A complete responsive personal website design
             by using HTML CSS and Vanilla JavaScript from scratch.
Author: Ben Sakai
Github: https://github.com/bensaru
License: MIT License
Copyright: 2026 ©Ben Sakai 
*/

// Contact form: attach as early as possible so it works even if other script fails
(function contactFormInit() {
  const RECIPIENT_EMAIL = "vensakai1030@gmail.com";
  function handleContactSubmit(e) {
    const form = e.target && e.target.id === "contact-form" ? e.target : null;
    if (!form) return;
    e.preventDefault();
    e.stopPropagation();

    var errorEl = document.getElementById("contact-form-error");
    var successEl = document.getElementById("contact-form-success");
    if (errorEl) { errorEl.style.display = "none"; errorEl.textContent = ""; }
    if (successEl) { successEl.style.display = "none"; successEl.textContent = ""; }

    var nameInput = form.querySelector('input[name="name"]');
    var emailInput = form.querySelector('input[name="email"]');
    var subjectInput = form.querySelector('input[name="subject"]');
    var bodyInput = form.querySelector('textarea[name="body"]');
    var name = (nameInput && nameInput.value) ? String(nameInput.value).trim() : "";
    var email = (emailInput && emailInput.value) ? String(emailInput.value).trim() : "";
    var subject = (subjectInput && subjectInput.value) ? String(subjectInput.value).trim() : "";
    var body = (bodyInput && bodyInput.value) ? String(bodyInput.value).trim() : "";

    if (!name || !email || !subject || !body) {
      var missing = [];
      if (!name) missing.push("Name");
      if (!email) missing.push("Email");
      if (!subject) missing.push("Subject");
      if (!body) missing.push("Message");
      if (errorEl) {
        errorEl.textContent = "Please fill in all fields: " + missing.join(", ") + ".";
        errorEl.style.display = "block";
        errorEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      return;
    }

    var encodedSubject = encodeURIComponent(subject);
    var encodedBody = encodeURIComponent("From: " + name + " <" + email + ">\n\n" + body);
    var mailto = "mailto:" + RECIPIENT_EMAIL + "?subject=" + encodedSubject + "&body=" + encodedBody;

    var a = document.createElement("a");
    a.href = mailto;
    a.setAttribute("rel", "noopener");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (successEl) {
      successEl.textContent = "Your email client will open to send to " + RECIPIENT_EMAIL + ". If it doesn't open, please email " + RECIPIENT_EMAIL + " directly.";
      successEl.style.display = "block";
      successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      document.addEventListener("submit", handleContactSubmit, true);
    });
  } else {
    document.addEventListener("submit", handleContactSubmit, true);
  }
})();

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

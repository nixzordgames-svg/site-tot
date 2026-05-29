/* =========================================================
   Totalizator Sportowy Media — Shared JavaScript
   ========================================================= */

(function () {
  "use strict";

  // ---------- MENU PANEL ----------
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuPanel  = document.querySelector("[data-menu-panel]");
  const menuClose  = document.querySelector("[data-menu-close]");
  const menuBackdrop = document.querySelector("[data-menu-backdrop]");

  function openMenu() {
    if (!menuPanel) return;
    menuPanel.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuPanel.setAttribute("aria-hidden", "false");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
    // focus first link for accessibility
    const firstLink = menuPanel.querySelector(".menu-nav a");
    if (firstLink) setTimeout(() => firstLink.focus(), 320);
  }

  function closeMenu() {
    if (!menuPanel) return;
    menuPanel.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuPanel.setAttribute("aria-hidden", "true");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  }

  if (menuToggle)   menuToggle.addEventListener("click", openMenu);
  if (menuClose)    menuClose.addEventListener("click", closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener("click", closeMenu);

  // Esc to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuPanel && menuPanel.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // Close menu when navigating internally
  if (menuPanel) {
    menuPanel.querySelectorAll(".menu-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        // Allow native navigation, just close panel
        closeMenu();
      });
    });
  }

  // ---------- ACTIVE LINK HIGHLIGHTING ----------
  (function setActiveLink() {
    if (!menuPanel) return;
    let path = window.location.pathname.replace(/\/index\.html?$/, "/");
    if (path === "") path = "/";
    menuPanel.querySelectorAll(".menu-nav a").forEach(function (a) {
      const href = a.getAttribute("href");
      // normalize
      let target = href;
      if (target.endsWith("/index.html")) target = target.replace("/index.html", "/");
      if (target === path) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
    });
  })();

  // ---------- SMOOTH SCROLL FOR HASH LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ---------- FAQ ACCORDION ----------
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const isOpen = item.classList.contains("is-open");
      // close siblings (optional behavior — single open)
      item.parentElement.querySelectorAll(".faq-item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          const ob = other.querySelector(".faq-question");
          if (ob) ob.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // ---------- CONTACT FORM (static notice) ----------
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const note = contactForm.querySelector(".form-note");
      if (note) {
        note.textContent = "For inquiries, please email us directly at support@totalsportmedia.com.";
        note.style.background = "rgba(0, 67, 136, 0.12)";
      }
    });
  }
})();

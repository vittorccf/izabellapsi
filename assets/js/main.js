/* =========================================================
   main.js — interações leves, sem dependências
   · Header com fundo ao rolar
   · Menu mobile acessível
   · Scroll-spy nos links de navegação
   · Reveal de elementos ao entrar na viewport
   · FAQ accordion acessível
   · Ano dinâmico no rodapé
   ========================================================= */
(function () {
  "use strict";

  const select = (sel, ctx = document) => ctx.querySelector(sel);
  const selectAll = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Header: sombra/fundo ao rolar ---------- */
  const header = select(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const toggle = select(".nav-toggle");
  const nav = select("#primary-nav");

  const closeNav = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    // Fecha ao clicar num link
    selectAll("a", nav).forEach((link) =>
      link.addEventListener("click", closeNav)
    );

    // Fecha com Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Reveal ao rolar ---------- */
  const reveals = selectAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Scroll-spy (link ativo) ---------- */
  const navLinks = selectAll(".nav__link");
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id && id.startsWith("#") ? select(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach((link) =>
            link.classList.toggle("is-active", link.getAttribute("href") === id)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((sec) => spy.observe(sec));
  }

  /* ---------- FAQ accordion ---------- */
  selectAll(".faq__trigger").forEach((trigger) => {
    const panel = select("#" + trigger.getAttribute("aria-controls"));
    if (!panel) return;

    trigger.addEventListener("click", () => {
      const open = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!open));
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });

  /* ---------- Ano dinâmico no rodapé ---------- */
  const yearEl = select("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

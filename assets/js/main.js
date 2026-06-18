/* =========================================================
   main.js — interações leves, sem dependências
   · Header com fundo ao rolar
   · Menu mobile acessível
   · Scroll-spy nos links de navegação
   · Reveal de elementos ao entrar na viewport
   · FAQ accordion acessível
   · Carrossel de depoimentos
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

  /* ---------- Carrossel de depoimentos ---------- */
  selectAll("[data-carousel]").forEach((carousel) => {
    const track = select("[data-carousel-track]", carousel);
    const slides = selectAll(".carousel__slide", track);
    const prev = select("[data-carousel-prev]", carousel);
    const next = select("[data-carousel-next]", carousel);
    const dotsWrap = select("[data-carousel-dots]", carousel);
    if (!track || slides.length === 0) return;

    let index = 0;

    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Ir para o depoimento " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsWrap && dotsWrap.appendChild(dot);
      return dot;
    });

    const update = () => {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      slides.forEach((slide, i) => slide.setAttribute("aria-hidden", String(i !== index)));
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
    };

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    prev && prev.addEventListener("click", () => goTo(index - 1));
    next && next.addEventListener("click", () => goTo(index + 1));

    const viewport = select("[data-carousel-viewport]", carousel);
    viewport &&
      viewport.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
      });

    update();
  });

  /* ---------- Ano dinâmico no rodapé ---------- */
  const yearEl = select("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

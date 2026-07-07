/* ============ YOLDA v2 — common.js — loader, cursor, transitions ============ */
(function () {
  "use strict";

  window.YOLDA = window.YOLDA || {};
  const lerp = (a, b, t) => a + (b - a) * t;
  window.YOLDA.lerp = lerp;
  window.YOLDA.fmt = window.YOLDA.fmt || ((v) => String(v)); // i18n.js overrides for fa
  window.YOLDA.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  const loader = document.getElementById("loader");
  const loaderCount = document.getElementById("loaderCount");
  const quick = loader.classList.contains("loader--quick") || sessionStorage.getItem("yolda-v2-visited");
  const loadDuration = quick ? 450 : 1600;
  const loadStart = performance.now();

  window.YOLDA.onReady = [];

  let loaderFinished = false;
  function finishLoader() {
    if (loaderFinished) return;
    loaderFinished = true;
    if (loaderCount) loaderCount.textContent = window.YOLDA.fmt(100);
    sessionStorage.setItem("yolda-v2-visited", "1");
    loader.classList.add("is-done");
    setTimeout(() => window.YOLDA.onReady.forEach((fn) => fn()), 300);
  }
  function tickLoader(now) {
    const p = Math.min(1, (now - loadStart) / loadDuration);
    if (loaderCount) loaderCount.textContent = window.YOLDA.fmt(Math.floor(p * 100));
    if (p < 1) requestAnimationFrame(tickLoader);
    else finishLoader();
  }
  requestAnimationFrame(tickLoader);
  // rAF is suspended in hidden tabs — guarantee completion regardless
  setTimeout(finishLoader, loadDuration + 200);

  /* ---------- Cursor ---------- */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  let mx = -100, my = -100, fx = -100, fy = -100;
  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

  let lastT = performance.now();
  (function cursorRaf() {
    const now = performance.now();
    const dt = Math.min((now - lastT) / 1000, 0.1);
    lastT = now;
    const k = 1 - Math.pow(1 - 0.18, dt * 60);
    fx = lerp(fx, mx, k);
    fy = lerp(fy, my, k);
    cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    follower.style.transform = `translate(${fx - follower.offsetWidth / 2}px, ${fy - follower.offsetHeight / 2}px)`;
    requestAnimationFrame(cursorRaf);
  })();

  window.YOLDA.bindHovers = function (root) {
    (root || document).querySelectorAll("[data-hover], a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => follower.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => follower.classList.remove("is-hover"));
    });
    (root || document).querySelectorAll("[data-hover-media]").forEach((el) => {
      el.addEventListener("mouseenter", () => follower.classList.add("is-media"));
      el.addEventListener("mouseleave", () => follower.classList.remove("is-media"));
    });
  };
  window.YOLDA.bindHovers(document);

  /* ---------- Page transitions ---------- */
  const transition = document.getElementById("transition");
  window.YOLDA.goTo = function (href) {
    transition.classList.add("is-active");
    setTimeout(() => { window.location.href = href; }, 750);
  };
  window.YOLDA.bindTransitions = function (root) {
    (root || document).querySelectorAll("[data-transition]").forEach((link) => {
      if (link.__bound) return;
      link.__bound = true;
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;
        e.preventDefault();
        if (href.split("?")[0] === location.pathname.split("/").pop() && !href.includes("?")) return;
        window.YOLDA.goTo(href);
      });
    });
  };
  window.YOLDA.bindTransitions(document);
  window.addEventListener("pageshow", () => transition.classList.remove("is-active"));

  /* ---------- Hi-DPI 2d canvas painter ---------- */
  window.YOLDA.paint = function (canvas, service, variant) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || 600;
    const h = canvas.clientHeight || 750;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const x = canvas.getContext("2d");
    x.scale(dpr, dpr);
    window.YOLDA.drawArt(x, w, h, service, variant);
  };
})();

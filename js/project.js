/* ============ YOLDA v2 — project.js — case study + about pages ============ */
(function () {
  "use strict";

  const Y = window.YOLDA;
  const page = document.body.dataset.page;

  /* ---------- Populate case study from ?s= ---------- */
  if (page === "project") {
    const id = new URLSearchParams(location.search).get("s") || Y.SERVICES[0].id;
    const idx = Math.max(0, Y.SERVICES.findIndex((s) => s.id === id));
    const s = Y.SERVICES[idx];
    const nextS = Y.SERVICES[(idx + 1) % Y.SERVICES.length];

    document.title = s.lines.join(" ") + " — " + (Y.lang === "fa" ? "یولدا" : "Yolda");
    document.getElementById("phLine1").textContent = s.lines[0];
    document.getElementById("phLine2").innerHTML = "<em>" + s.lines[1] + "</em>";
    document.getElementById("phCat").textContent = s.category + " — " + s.year;
    document.getElementById("pIntro").textContent = s.intro;
    document.getElementById("pQuote").textContent =
      Y.lang === "fa" ? "«" + s.quote + "»" : "“" + s.quote + "”";

    const meta = document.getElementById("pMeta");
    Object.entries(s.meta).forEach(([k, v]) => {
      const d = document.createElement("div");
      d.className = "pmeta__item reveal";
      d.innerHTML = `<span>${k}</span><strong>${v}</strong>`;
      meta.appendChild(d);
    });

    const body = document.getElementById("pBody");
    s.body.forEach((t) => {
      const p = document.createElement("p");
      p.className = "reveal";
      p.textContent = t;
      body.appendChild(p);
    });

    const stats = document.getElementById("pStats");
    s.stats.forEach(([n, label]) => {
      const d = document.createElement("div");
      d.className = "stat reveal";
      d.innerHTML = `<strong>${n}</strong><span>${label}</span>`;
      stats.appendChild(d);
    });

    const nextLink = document.getElementById("pNext");
    nextLink.href = "project.html?s=" + nextS.id;
    const arrow = Y.t ? Y.t("arrow") : "→";
    document.getElementById("pNextTitle").innerHTML =
      nextS.lines[0] + " <em>" + nextS.lines[1] + "</em> " + arrow;

    Y.paint(document.getElementById("phCanvas"), s, 0);
    Y.paint(document.getElementById("galA"), s, 1);
    Y.paint(document.getElementById("galB"), s, 2);
    Y.bindHovers(document);
    Y.bindTransitions(document);
  }

  if (page === "about") {
    const abCanvas = document.getElementById("abCanvas");
    if (abCanvas) Y.paint(abCanvas, Y.SERVICES[3], 0);
  }

  /* ---------- Smooth scroll (subpages scroll normally, content lerps) ---------- */
  const scrollEl = document.getElementById("scroll");
  let target = 0, current = 0;

  function setHeight() {
    document.body.style.height = scrollEl.scrollHeight + "px";
  }
  setHeight();
  window.addEventListener("resize", setHeight);
  window.addEventListener("load", setHeight);
  setTimeout(setHeight, 1200);

  window.addEventListener("scroll", () => (target = window.scrollY), { passive: true });

  /* ---------- Reveals (observe .line wrappers — split spans start clipped) ---------- */
  const revealTargets = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (revealTargets.get(e.target) || [e.target]).forEach((el) => el.classList.add("is-in"));
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal, [data-split]").forEach((el) => {
    const watch = el.closest(".line") || el;
    if (!revealTargets.has(watch)) {
      revealTargets.set(watch, []);
      io.observe(watch);
    }
    revealTargets.get(watch).push(el);
  });

  /* ---------- Parallax items ---------- */
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));

  let lastT = performance.now();
  function raf(now) {
    const dt = Math.min((now - lastT) / 1000, 0.1);
    lastT = now;
    const k = Y.reduced ? 1 : 1 - Math.pow(1 - 0.08, dt * 60);
    current = Y.lerp(current, target, k);
    if (Math.abs(target - current) < 0.05) current = target;
    scrollEl.style.transform = `translate3d(0, ${-current}px, 0)`;

    parallaxEls.forEach((el) => {
      const f = parseFloat(el.dataset.parallax);
      const r = el.getBoundingClientRect();
      // subtract the parallax offset we applied last frame to avoid feedback
      const baseTop = r.top - (el.__py || 0);
      const centerDelta = baseTop + r.height / 2 - window.innerHeight / 2;
      el.__py = -centerDelta * f;
      el.style.transform = `translate3d(0, ${el.__py}px, 0)`;
    });

    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();

/* ============ YOLDA v2 — slider.js — full-screen WebGL slider ============ */
(function () {
  "use strict";

  const Y = window.YOLDA;
  const services = Y.SERVICES;
  const sliderEl = document.getElementById("slider");
  if (!sliderEl) return;

  /* ---------- Build slide DOM ---------- */
  services.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "slide";
    el.dataset.index = i;
    el.innerHTML = `
      <a class="slide__hit" data-hover-media href="project.html?s=${s.id}" aria-label="${s.lines.join(" ")}"></a>
      <h2 class="slide__title">
        <span class="line"><span>${s.lines[0]}</span></span>
        <span class="line"><span><em>${s.lines[1]}</em></span></span>
      </h2>
      <p class="slide__cat"><span class="line"><span>${s.category} — ${s.year}</span></span></p>`;
    sliderEl.appendChild(el);
  });
  const slides = Array.from(sliderEl.children);
  Y.bindHovers(sliderEl);

  const rail = document.getElementById("rail");
  services.forEach(() => rail.appendChild(document.createElement("i")));
  const railBars = Array.from(rail.children);
  const idxCurrent = document.getElementById("idxCurrent");
  document.getElementById("idxTotal").textContent = Y.fmt(String(services.length).padStart(2, "0"));

  /* ---------- WebGL ---------- */
  const canvas = document.getElementById("gl");
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  let glOk = !!gl;

  const vsSrc = `
    attribute vec2 aPos;
    attribute vec2 aUv;
    uniform vec2 uScale;
    uniform float uProgress;
    uniform float uDir;
    uniform float uVelocity;
    varying vec2 vUv;
    void main() {
      vUv = aUv;
      vec2 pos = aPos;
      float w = sin(uProgress * 3.14159);
      pos.y += sin(aUv.x * 3.14159) * (w * 0.09 * uDir + uVelocity * 0.06);
      pos *= 1.0 + w * 0.045;
      gl_Position = vec4(pos * uScale, 0.0, 1.0);
    }`;

  // NOTE: uniforms shared with the vertex stage must be highp to match (WebGL1 link rule)
  const fsSrc = `
    precision mediump float;
    uniform sampler2D uTexA;
    uniform sampler2D uTexB;
    uniform highp float uProgress;
    uniform highp float uDir;
    uniform highp float uVelocity;
    uniform float uHover;
    uniform float uReveal;
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      uv = (uv - 0.5) * (1.0 - uHover * 0.05 - uReveal * 0.04 + 0.04) + 0.5;
      float p = uProgress;
      float w = sin(p * 3.14159);
      vec2 uvA = uv + vec2(0.0, -uDir * p * 0.5);
      vec2 uvB = uv + vec2(0.0,  uDir * (1.0 - p) * 0.5);
      uvA.x += sin(uv.y * 3.14159 + p * 3.14159) * 0.03 * w * uDir;
      uvB.x += sin(uv.y * 3.14159 + p * 3.14159) * 0.03 * w * uDir;
      float shift = w * 0.014 + abs(uVelocity) * 0.006 + uHover * 0.004;
      vec3 a = vec3(
        texture2D(uTexA, uvA + vec2(shift, 0.0)).r,
        texture2D(uTexA, uvA).g,
        texture2D(uTexA, uvA - vec2(shift, 0.0)).b);
      vec3 b = vec3(
        texture2D(uTexB, uvB + vec2(shift, 0.0)).r,
        texture2D(uTexB, uvB).g,
        texture2D(uTexB, uvB - vec2(shift, 0.0)).b);
      float m = smoothstep(0.0, 1.0, p + (uv.y - 0.5) * -uDir * 0.35 * w);
      vec3 c = mix(a, b, m);
      c *= 0.92 + 0.08 * uReveal;
      gl_FragColor = vec4(c, uReveal);
    }`;

  let prog, U = {};
  if (glOk) {
    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("shader:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("link:", gl.getProgramInfoLog(prog));
      glOk = false;
    } else {
      gl.useProgram(prog);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const SEG = 32;
      const positions = [], uvs = [], indices = [];
      for (let y = 0; y <= SEG; y++)
        for (let x = 0; x <= SEG; x++) {
          positions.push(x / SEG - 0.5, 0.5 - y / SEG);
          uvs.push(x / SEG, y / SEG);
        }
      for (let y = 0; y < SEG; y++)
        for (let x = 0; x < SEG; x++) {
          const i = y * (SEG + 1) + x;
          indices.push(i, i + 1, i + SEG + 1, i + 1, i + SEG + 2, i + SEG + 1);
        }
      window.__idxCount = indices.length;

      function buffer(data, name, size) {
        const loc = gl.getAttribLocation(prog, name);
        const b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      }
      buffer(positions, "aPos", 2);
      buffer(uvs, "aUv", 2);
      const ibo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

      ["uScale", "uProgress", "uDir", "uVelocity", "uHover", "uReveal", "uTime", "uTexA", "uTexB"]
        .forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));
      gl.uniform1i(U.uTexA, 0);
      gl.uniform1i(U.uTexB, 1);
    }
  }

  /* ---------- Textures ---------- */
  const textures = glOk
    ? services.map((s) => {
        const c = document.createElement("canvas");
        c.width = 1200; c.height = 900;
        Y.drawArt(c.getContext("2d"), 1200, 900, s, 0);
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return tex;
      })
    : [];

  function resize() {
    if (!glOk) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---------- Slider state machine ---------- */
  let current = 0;
  let next = 0;
  let progress = 0;      // 0..1 transition progress
  let animating = false;
  let dir = 1;
  let animStart = 0;
  let reveal = 0;
  let revealTarget = 0;
  let hover = 0, hoverTarget = 0;
  let vel = 0, velTarget = 0;
  let zoom = 0, zoomTarget = 0; // click-to-expand
  const DURATION = 1300;

  const easeInOutQuint = (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

  function setHud(i) {
    // roll the index number
    idxCurrent.parentElement.style.overflow = "hidden";
    idxCurrent.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-115%)" }],
      { duration: 300, easing: "cubic-bezier(0.77,0,0.18,1)", fill: "forwards" }
    );
    setTimeout(() => {
      idxCurrent.textContent = Y.fmt(String(i + 1).padStart(2, "0"));
      idxCurrent.animate(
        [{ transform: "translateY(115%)" }, { transform: "translateY(0)" }],
        { duration: 400, easing: "cubic-bezier(0.19,1,0.22,1)", fill: "forwards" }
      );
    }, 310);
    railBars.forEach((b, k) => b.classList.toggle("is-on", k === i));
  }

  function go(direction) {
    if (animating || zoomTarget > 0) return;
    animating = true;
    dir = direction;
    next = (current + direction + services.length) % services.length;
    animStart = performance.now();

    slides[current].classList.remove("is-active");
    slides[current].classList.add("is-leaving");
    setTimeout(() => {
      slides.forEach((s, k) => k !== next && s.classList.remove("is-leaving"));
      slides[next].classList.add("is-active");
    }, 350);
    setHud(next);
  }

  /* ---------- Input: wheel / touch / keys ---------- */
  let wheelLock = 0;
  window.addEventListener(
    "wheel",
    (e) => {
      velTarget = Math.max(-1, Math.min(1, e.deltaY / 300));
      const now = performance.now();
      if (animating || now < wheelLock) return;
      if (Math.abs(e.deltaY) > 24) {
        wheelLock = now + 300;
        go(e.deltaY > 0 ? 1 : -1);
      }
    },
    { passive: true }
  );

  let touchY = null;
  window.addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY), { passive: true });
  window.addEventListener(
    "touchend",
    (e) => {
      if (touchY === null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) go(dy > 0 ? 1 : -1);
      touchY = null;
    },
    { passive: true }
  );
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") go(1);
    if (e.key === "ArrowUp" || e.key === "PageUp") go(-1);
  });

  /* ---------- Hover + click-to-expand ---------- */
  slides.forEach((slide) => {
    const hit = slide.querySelector(".slide__hit");
    hit.addEventListener("mouseenter", () => (hoverTarget = 1));
    hit.addEventListener("mouseleave", () => (hoverTarget = 0));
    hit.addEventListener("click", (e) => {
      e.preventDefault();
      if (animating) return;
      zoomTarget = 1;
      slides[current].classList.remove("is-active");
      slides[current].classList.add("is-leaving");
      document.querySelectorAll(".hud").forEach((h) => (h.style.opacity = 0, h.style.transition = "opacity .5s"));
      setTimeout(() => Y.goTo(hit.getAttribute("href")), 700);
    });
  });

  /* ---------- Reveal after loader ---------- */
  Y.onReady.push(() => {
    revealTarget = 1;
    slides[0].classList.add("is-active");
    railBars[0].classList.add("is-on");
    idxCurrent.textContent = Y.fmt("01");
  });

  /* ---------- Render loop ---------- */
  const start = performance.now();
  let lastT = start;

  function raf(now) {
    const dt = Math.min((now - lastT) / 1000, 0.1);
    lastT = now;
    const k60 = (f) => 1 - Math.pow(1 - f, dt * 60);

    if (animating) {
      const t = Math.min(1, (now - animStart) / DURATION);
      progress = Y.reduced ? 1 : easeInOutQuint(t);
      if (t >= 1) {
        current = next;
        progress = 0;
        animating = false;
      }
    }

    velTarget *= Math.pow(0.02, dt); // decay
    vel += (velTarget - vel) * k60(0.1);
    hover += (hoverTarget - hover) * k60(0.08);
    reveal += (revealTarget - reveal) * k60(0.05);
    zoom += (zoomTarget - zoom) * k60(0.09);

    if (glOk) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const vw = window.innerWidth, vh = window.innerHeight;
      const mobile = vw < 769;
      const baseW = mobile ? 0.86 : 0.58;
      const baseH = mobile ? 0.52 : 0.62;
      const zw = baseW + (2.15 - baseW) * zoom; // expand past edges on click
      const zh = baseH + (2.15 - baseH) * zoom;
      const rv = 0.92 + 0.08 * reveal;

      // quad verts span [-0.5, 0.5], so clip size = fraction * 2
      gl.uniform2f(U.uScale, zw * rv * 2, zh * rv * 2);
      gl.uniform1f(U.uProgress, progress);
      gl.uniform1f(U.uDir, dir);
      gl.uniform1f(U.uVelocity, vel);
      gl.uniform1f(U.uHover, hover);
      gl.uniform1f(U.uReveal, reveal);
      gl.uniform1f(U.uTime, (now - start) / 1000);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[current]);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[animating ? next : current]);
      gl.drawElements(gl.TRIANGLES, window.__idxCount, gl.UNSIGNED_SHORT, 0);
    }

    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();

/* ============ YOLDA v2 — waitlist.js ============ */
(function () {
  "use strict";

  const Y = window.YOLDA;
  const form = document.getElementById("wlForm");
  if (!form) return;

  /* side art */
  const canvas = document.getElementById("wlCanvas");
  if (canvas) Y.paint(canvas, Y.SERVICES[0], 1);

  /* service select from localized data */
  const select = document.getElementById("wlService");
  Y.SERVICES.forEach((s) => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.lines.join(" ");
    select.appendChild(o);
  });

  /* submit → local persist + success state */
  const errorEl = document.getElementById("wlError");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("wlName").value.trim();
    const email = document.getElementById("wlEmail").value.trim();
    const valid = name.length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;

    const entry = {
      name,
      email,
      city: document.getElementById("wlCity").value.trim(),
      service: select.value,
      lang: Y.lang,
      at: new Date().toISOString(),
    };
    try {
      const list = JSON.parse(localStorage.getItem("yolda-waitlist") || "[]");
      list.push(entry);
      localStorage.setItem("yolda-waitlist", JSON.stringify(list));
    } catch (_) { /* storage unavailable — success state still shows */ }

    form.hidden = true;
    const ok = document.getElementById("wlSuccess");
    ok.hidden = false;
    ok.classList.add("is-shown");
    // body height changed — refresh smooth-scroll bounds
    document.body.style.height = document.getElementById("scroll").scrollHeight + "px";
  });
})();

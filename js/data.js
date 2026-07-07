/* ============ YOLDA v2 — data.js — services + procedural art ============ */
window.YOLDA = (function () {
  "use strict";

  const SERVICES = [
    {
      id: "food",
      lines: ["Food", "Delivery"],
      category: "Restaurants — hot & fast",
      year: "2026",
      meta: { Coverage: "48 cities", "Avg. time": "12 min", Since: "2026" },
      intro:
        "A midnight craving is a race against the clock. Yolda Food pairs every restaurant with the nearest golden courier, so the plov arrives steaming and the ice cream arrives frozen.",
      quote: "Twelve minutes, door to door — still hot, still perfect.",
      body: [
        "We built our own routing engine that thinks in seconds, not blocks. It watches kitchens, traffic and weather at once, and dispatches a courier before the chef plates the dish.",
        "Insulated golden packs, live GPS you can actually trust, and a courier who rings the bell with a smile. That's the whole trick — done thousands of times a night.",
      ],
      stats: [
        ["12", "min average delivery"],
        ["2.4k", "partner restaurants"],
        ["4.9", "average rating"],
      ],
      palette: { bg: ["#3b1a68", "#17092e"], accent: "#f9e29c", motif: "bowl" },
    },
    {
      id: "groceries",
      lines: ["Grocery", "Runs"],
      category: "Markets — the full basket",
      year: "2026",
      meta: { Coverage: "36 cities", "Avg. time": "27 min", Since: "2026" },
      intro:
        "The whole market, folded into your pocket. Yolda Grocery sends trained pickers through the aisles — the ripest tomatoes, the coldest milk, the bread that came out of the oven an hour ago.",
      quote: "Your list, picked like it's ours.",
      body: [
        "Every picker follows a golden rule: never take an item you wouldn't take home. Bruised fruit stays on the shelf; short expiry dates never make it into the bag.",
        "Cold chain from shelf to doorstep — chilled compartments in every courier bag, so frozen stays frozen through summer traffic.",
      ],
      stats: [
        ["27", "min average run"],
        ["18k", "products available"],
        ["98", "% pick accuracy"],
      ],
      palette: { bg: ["#2b1250", "#100621"], accent: "#e8c15c", motif: "leaves" },
    },
    {
      id: "parcels",
      lines: ["Parcel", "Express"],
      category: "Documents & gifts — same day",
      year: "2026",
      meta: { Coverage: "City to city", "Avg. time": "Same day", Since: "2026" },
      intro:
        "A contract that must be signed today. A birthday gift that cannot wait for Monday. Yolda Parcel moves what matters across the city — and between cities — before the sun goes down.",
      quote: "Handled like it's wrapped in gold leaf.",
      body: [
        "Photo confirmation at pickup and at the door, a sealed chain of custody, and one courier responsible from first hand to last.",
        "Fragile mode adds padding, a slower ride and a courier who takes the stairs instead of risking a crowded lift. Some things deserve ceremony.",
      ],
      stats: [
        ["3", "hr cross-city average"],
        ["100", "% insured parcels"],
        ["0", "lost in 2026"],
      ],
      palette: { bg: ["#41216f", "#1a0b33"], accent: "#f6da8b", motif: "box" },
    },
    {
      id: "anything",
      lines: ["Anything", "Anywhere"],
      category: "Concierge — you name it",
      year: "2026",
      meta: { Coverage: "Wherever you are", "Avg. time": "You decide", Since: "2026" },
      intro:
        "Forgot your keys at a friend's place? Need a phone charger delivered to seat 14C before the train leaves? Type it in plain words — a golden courier figures out the rest.",
      quote: "If it fits on a bike, it's already on the way.",
      body: [
        "Yolda Anything is a human-powered search engine for your city. Couriers hunt down out-of-print books, last-minute flowers and the exact cable you described badly.",
        "You set the budget, we send the quote, you tap once. The strangest request we've fulfilled? A single goldfish, delivered with its bowl, unspilled.",
      ],
      stats: [
        ["9", "min to first quote"],
        ["96", "% requests fulfilled"],
        ["1", "goldfish, unspilled"],
      ],
      palette: { bg: ["#2f0f5c", "#12071f"], accent: "#ffefb0", motif: "bolt" },
    },
  ];

  /* Draw branded art onto a 2d context. variant shifts composition for gallery shots. */
  function drawArt(x, W, H, service, variant) {
    const p = service.palette;
    const v = variant || 0;
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, p.bg[0]);
    g.addColorStop(1, p.bg[1]);
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);

    const cx = W * (0.5 + (v === 1 ? 0.18 : v === 2 ? -0.18 : 0));
    const cy = H * (0.5 + (v === 2 ? 0.1 : 0));
    const R = Math.min(W, H);

    // gold glow
    const rg = x.createRadialGradient(cx, cy, R * 0.03, cx, cy, R * 0.6);
    rg.addColorStop(0, "rgba(232,193,92,0.35)");
    rg.addColorStop(1, "rgba(232,193,92,0)");
    x.fillStyle = rg;
    x.fillRect(0, 0, W, H);

    // concentric rings
    x.strokeStyle = p.accent;
    for (let i = 0; i < 6; i++) {
      x.globalAlpha = 0.22 - i * 0.03;
      x.lineWidth = 1.2;
      x.beginPath();
      x.arc(cx, cy, R * (0.16 + i * 0.085), 0, Math.PI * 2);
      x.stroke();
    }
    x.globalAlpha = 1;

    // diagonal shine lines
    x.globalAlpha = 0.08;
    x.lineWidth = 1;
    for (let i = -4; i < 10; i++) {
      x.beginPath();
      x.moveTo(W * (i / 8) + v * 40, 0);
      x.lineTo(W * (i / 8) - W * 0.3 + v * 40, H);
      x.stroke();
    }
    x.globalAlpha = 1;

    // motif
    const s = R * 0.0016; // motif scale relative to 512-ish base
    x.save();
    x.translate(cx, cy);
    x.scale(s * (v === 1 ? 0.8 : 1), s * (v === 1 ? 0.8 : 1));
    x.strokeStyle = p.accent;
    x.fillStyle = p.accent;
    x.lineWidth = 6 / s / 2;
    x.lineCap = "round";
    if (p.motif === "bowl") {
      x.beginPath(); x.arc(0, 0, 80, 0, Math.PI, false); x.stroke();
      x.beginPath(); x.moveTo(-96, 0); x.lineTo(96, 0); x.stroke();
      for (let i = -1; i <= 1; i++) {
        x.beginPath();
        x.moveTo(i * 40, -55);
        x.quadraticCurveTo(i * 40 + 10, -85, i * 40, -115);
        x.stroke();
      }
    } else if (p.motif === "leaves") {
      for (let i = -1; i <= 1; i++) {
        x.save(); x.translate(i * 70, 0); x.rotate(i * 0.5);
        x.beginPath(); x.moveTo(0, 60);
        x.quadraticCurveTo(45, 0, 0, -70);
        x.quadraticCurveTo(-45, 0, 0, 60);
        x.stroke(); x.restore();
      }
    } else if (p.motif === "box") {
      x.strokeRect(-80, -55, 160, 130);
      x.beginPath(); x.moveTo(-80, -55); x.lineTo(-30, -100); x.lineTo(130, -100);
      x.lineTo(80, -55); x.stroke();
      x.beginPath(); x.moveTo(130, -100); x.lineTo(130, 30); x.lineTo(80, 75); x.stroke();
      x.beginPath(); x.moveTo(0, -55); x.lineTo(0, 75); x.stroke();
    } else {
      x.beginPath();
      x.moveTo(24, -130); x.lineTo(-46, 10); x.lineTo(6, 10);
      x.lineTo(-24, 130); x.lineTo(66, -20); x.lineTo(12, -20);
      x.closePath();
      x.globalAlpha = 0.9; x.fill(); x.globalAlpha = 1;
    }
    x.restore();

    // grain
    x.globalAlpha = 0.05;
    for (let i = 0; i < (W * H) / 400; i++) {
      x.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
      x.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4);
    }
    x.globalAlpha = 1;
  }

  return { SERVICES, drawArt };
})();

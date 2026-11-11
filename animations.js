/* =========================================================
   animations.js : the extra animations, loaded AFTER script.js
   Everything here is decoration. If it ever fails, the site still works.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce) return;

  var mouse = { x: -999, y: -999 };

  /* ---------- 1) Constellation ---------- */
  var cv = document.createElement("canvas");
  cv.className = "stars";
  cv.setAttribute("aria-hidden", "true");
  document.body.insertBefore(cv, document.body.firstChild);
  var ctx = cv.getContext("2d");
  var W = 0, H = 0, dpr = 1, pts = [], running = true;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = W < 700 ? 26 : Math.min(64, Math.round(W * H / 24000));   // ✏️ EDIT: number of points
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
        r: Math.random() * 1 + .6, gold: Math.random() < .6
      });
    }
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    var link = W < 700 ? 90 : 125, i, j, a, b, dx, dy, d;
    for (i = 0; i < pts.length; i++) {
      a = pts[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
      for (j = i + 1; j < pts.length; j++) {
        b = pts[j]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < link) {
          ctx.strokeStyle = "rgba(201,164,92," + ((1 - d / link) * .16).toFixed(3) + ")";
          ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) {
        ctx.strokeStyle = "rgba(127,214,255," + ((1 - d / 150) * .35).toFixed(3) + ")";
        ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = a.gold ? "rgba(201,164,92,.55)" : "rgba(127,214,255,.5)";
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  size();
  addEventListener("resize", size);
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);

  if (!fine) return;   // everything below is for mouse devices only

  addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });

  /* ---------- 2) Hero emblem leans toward the cursor ---------- */
  var hero = document.querySelector(".hero"), emblem = document.querySelector(".emblem");
  if (hero && emblem) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      emblem.style.setProperty("--ex", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      emblem.style.setProperty("--ey", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
    hero.addEventListener("pointerleave", function () {
      emblem.style.setProperty("--ex", 0); emblem.style.setProperty("--ey", 0);
    });
  }

  /* ---------- 3) Gold cursor ring ---------- */
  var ring = document.createElement("div");
  ring.className = "cring"; ring.setAttribute("aria-hidden", "true");
  document.body.appendChild(ring);
  var rx = 0, ry = 0;
  (function follow() {
    rx += (mouse.x - rx) * .18; ry += (mouse.y - ry) * .18;
    ring.style.transform = "translate(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px)";
    requestAnimationFrame(follow);
  })();
  addEventListener("pointermove", function () { ring.classList.add("on"); }, { once: true });
  document.addEventListener("pointerleave", function () { ring.classList.remove("on"); });
  document.addEventListener("pointerover", function (e) {
    ring.classList.toggle("big", !!(e.target.closest && e.target.closest("a, button, .card, input, textarea")));
  });
})();

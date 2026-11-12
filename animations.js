/* =========================================================
   animations.js : the extra animations, loaded AFTER script.js
   Everything here is decoration. If it ever fails, the site still works.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce) return;

  /* ✏️ EDIT: true = the opening intro plays every time. Change to false to switch it off. */
  var SHOW_INTRO = true;

  var root = document.documentElement;
  var mouse = { x: -999, y: -999 };

  /* ---------- 1) Opening intro ---------- */
  if (SHOW_INTRO) {
    var intro = document.createElement("div");
    intro.className = "splash";
    intro.setAttribute("aria-hidden", "true");
    intro.innerHTML = '<div class="splash-in"><div class="splash-logo"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" pathLength="1"/></svg><span class="logo-mark"></span></div><span class="wordmark"></span></div>';
    document.body.appendChild(intro);
    root.classList.add("splash-on");
    setTimeout(function () { intro.classList.add("out"); root.classList.remove("splash-on"); }, 2100);
    setTimeout(function () { intro.remove(); }, 3000);
  }

  /* ---------- 2) Name glint, skill-box order ---------- */
  setTimeout(function () { var h = document.getElementById("name"); if (h) h.classList.add("glint"); }, SHOW_INTRO ? 4300 : 2400);
  document.querySelectorAll(".skill-group .chips").forEach(function (c) {
    c.querySelectorAll("b").forEach(function (b, i) { b.style.setProperty("--k", i); });
  });

  /* ---------- 3) Menu: sliding gold line ---------- */
  var nav = document.querySelector(".links");
  if (nav) {
    var ind = document.createElement("i");
    ind.className = "ind";
    nav.appendChild(ind);
    var hovering = false;
    var place = function (a) {
      if (!a) { ind.style.opacity = 0; return; }
      ind.style.left = a.offsetLeft + "px";
      ind.style.width = a.offsetWidth + "px";
      ind.style.top = (a.offsetTop + a.offsetHeight - 1) + "px";
      ind.style.opacity = 1;
    };
    var current = function () { return nav.querySelector("a.active"); };
    nav.addEventListener("mouseover", function (e) { if (e.target.tagName === "A") { hovering = true; place(e.target); } });
    nav.addEventListener("mouseleave", function () { hovering = false; place(current()); });
    new MutationObserver(function () { if (!hovering) place(current()); })
      .observe(nav, { subtree: true, attributes: true, attributeFilter: ["class"] });
    addEventListener("resize", function () { place(current()); });
  }

  /* ---------- 4) Constellation ---------- */
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

  /* ---------- 5) Hero emblem leans toward the cursor ---------- */
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
})();
/* =========================================================
   1) YOUR PROJECTS: this is the only place you edit to add one.
   Copy a { ... }, block, paste it, and change the text.
   image: put the screenshot in the "images" folder, e.g. "images/mysite.png"
          (leave it as "" to show a plain placeholder)
   live / code: links; leave as "" to hide that link
   featured: true shows a small "Featured" badge (optional)
   flagship: true shows a gold shimmering "Flagship" tag instead (use it for your best project)
   ========================================================= */
const projects = [
  {
    title: "ISL Sign Language Translator",
    description: "A real-time AI system that reads Indian Sign Language and facial expression through a webcam, then speaks a natural English sentence aloud. Built entirely on free tools.",
    tags: ["Python", "OpenCV", "MediaPipe", "Ollama", "Streamlit"],
    image: "images/isl.png",          // ✏️ EDIT: save a screenshot of the app as images/isl.png
    live: "",
    code: "",                         // ✏️ EDIT: add your GitHub link, or leave empty to hide it
    flagship: true,                   // ✏️ EDIT: the gold "Flagship" tag, remove this line to switch it off
    featured: true
  },
  {
    title: "Mars Rover",
    description: "A rover that streams live video and reports temperature and moisture as it moves, built around an ESP32-CAM and an Arduino Uno with an L293D motor driver.",
    tags: ["ESP32-CAM", "Arduino Uno", "L293D", "Sensors"],
    image: "images/mars-rover.jpg",   // ✏️ EDIT: save a photo of your rover as images/mars-rover.jpg
    live: "",
    code: "",                         // ✏️ EDIT: add your GitHub link if you have the code online
    featured: true
  },
  {
    title: "JEE Tracker",
    description: "A daily companion for JEE aspirants: log your classes, plan your study hours and manage your time with clarity.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "images/jee.png",
    live: "https://jee-tirtha.netlify.app/",
    code: "https://github.com/yourname/project-one", // ✏️ EDIT: put your real GitHub link here
    featured: true
  },
  {
    title: "NEET Tracker",
    description: "Track your daily NEET classes, clear your backlogs and stay on course with daily aims and progress records.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "images/neet.png",
    live: "https://neet-torsha.netlify.app/",
    code: "https://github.com/yourname/project-two", // ✏️ EDIT: put your real GitHub link here
    featured: true
  },
  {
    title: "Firefighting Robot",
    description: "A robot with an automatic water-pump system, driven by an Arduino Uno and an L298N motor driver, built to meet fire with a steady response.",
    // ✏️ EDIT: if it finds the fire with flame sensors (or something else), say so in the description above
    tags: ["Arduino Uno", "L298N", "Water pump"],
    image: "images/firefighting-robot.jpg", // ✏️ EDIT: save a photo as images/firefighting-robot.jpg
    live: "",
    code: ""
  },
  {
    title: "Voice Control Robot Car",
    description: "A car that obeys your voice: spoken commands travel over Bluetooth (HC-05) to an Arduino Uno, which steers the wheels through an L293D motor driver.",
    tags: ["Arduino Uno", "L293D", "HC-05"],
    image: "images/voice-car.jpg",     // ✏️ EDIT: save a photo as images/voice-car.jpg
    live: "",
    code: ""
  }
  // ✏️ EDIT: to add another project, copy one { ... } block above, paste it here (after a comma) and change the text
];

/* =========================================================
   2) ROTATING ROLES under your name. Change the words freely.
   ========================================================= */
const roles = ["developer", "problem solver", "growing enthusiast", "lifelong learner"];

/* ---------- Everything below runs the site. You can leave it alone. ---------- */

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Build project cards
const grid = document.getElementById("projectGrid");
projects.forEach(p => {
  const card = document.createElement("article");
  card.className = "card reveal";
  const shot = p.image
    ? `<img src="${p.image}" alt="Screenshot of ${p.title}" loading="lazy">`
    : `<span>${p.title}</span>`;
  const links = [
    p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live site</a>` : "",
    p.code ? `<a href="${p.code}" target="_blank" rel="noopener">Source code</a>` : ""
  ].join("");
  card.innerHTML = `
    ${p.flagship ? '<span class="badge flag-badge">Flagship</span>' : p.featured ? '<span class="badge">Featured</span>' : ""}
    <div class="shot">${shot}</div>
    <div class="body">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="actions">${links}</div>
    </div>`;
  grid.appendChild(card);
});
// If a screenshot is missing, show a tidy placeholder instead of a broken image
grid.querySelectorAll(".shot img").forEach(img =>
  img.addEventListener("error", () => {
    const s = document.createElement("span");
    s.textContent = img.alt.replace("Screenshot of ", "");
    img.replaceWith(s);
  })
);

// Tick marks on the middle emblem ring
const ticks = document.getElementById("ticks");
let t = "";
for (let i = 0; i < 72; i++) {
  const a = (i * 5) * Math.PI / 180, len = i % 6 === 0 ? 12 : 5;
  const x1 = 200 + Math.sin(a) * 160, y1 = 200 - Math.cos(a) * 160;
  const x2 = 200 + Math.sin(a) * (160 - len), y2 = 200 - Math.cos(a) * (160 - len);
  t += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="currentColor" stroke-width="1"/>`;
}
ticks.innerHTML = t;

// Name slides in letter by letter
const nameEl = document.getElementById("name");
if (nameEl && !reduce) {
  const full = nameEl.textContent.trim();
  nameEl.setAttribute("aria-label", full);
  nameEl.textContent = "";
  let n = 0;
  full.split(" ").forEach((word, wi, all) => {
    const w = document.createElement("span");
    w.className = "w";
    w.setAttribute("aria-hidden", "true");
    [...word].forEach(ch => {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = ch;
      s.style.setProperty("--i", n++);
      w.appendChild(s);
    });
    nameEl.appendChild(w);
    if (wi < all.length - 1) nameEl.appendChild(document.createTextNode(" "));
  });
}

// Typing effect for roles
const roleEl = document.getElementById("role");
let ri = 0, ci = 0, deleting = false;
function type() {
  const word = roles[ri];
  roleEl.textContent = word.slice(0, ci);
  if (!deleting && ci === word.length) { deleting = true; return setTimeout(type, 1600); }
  if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  ci += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 85);
}
if (reduce) roleEl.textContent = roles[0]; else type();

// Skills strip: repeat the items so the scroll loops with no gap
const track = document.querySelector(".track");
if (track && !reduce) track.innerHTML += track.innerHTML;

// Scroll reveal with a gentle stagger
document.querySelectorAll(".reveal").forEach(el => {
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
  el.style.setProperty("--i", siblings.indexOf(el));
});
const revealer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    revealer.unobserve(el);
    const done = ev => {
      if (ev.target !== el) return;
      el.classList.add("done");
      el.removeEventListener("transitionend", done);
    };
    el.addEventListener("transitionend", done);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll(".reveal").forEach(el => revealer.observe(el));

// Highlight the current section in the menu
const navLinks = [...document.querySelectorAll(".links a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));

// ---------- Extra scroll motion (you can leave this alone) ----------
const root = document.documentElement;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sections = [...document.querySelectorAll(".section")];
const timeline = document.querySelector(".timeline");
const timelineItems = timeline ? [...timeline.children] : [];
const circuit = document.querySelector(".circuit");
const decos = [...document.querySelectorAll(".deco > svg")];
const toTop = document.querySelector(".totop");
const toTopRing = toTop && toTop.querySelector(".fg");
if (toTop) toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

function motion(max) {
  const y = scrollY, vh = innerHeight;
  // back-to-top button with a progress ring
  if (toTop) {
    toTop.classList.toggle("show", y > 500);
    toTopRing.style.strokeDashoffset = (1 - (max > 0 ? y / max : 0)).toFixed(3);
  }
  if (reduce) return;
  root.style.setProperty("--sy", y.toFixed(0));                       // used by rings and drifting light
  root.style.setProperty("--hp", clamp(y / (vh * 0.9)).toFixed(3));   // hero exit progress
  // each section reports how far you have scrolled through it (drives the ghost words)
  sections.forEach(s => {
    const r = s.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    const p = clamp((vh - r.top) / (vh + r.height));
    s.style.setProperty("--p", p.toFixed(3));
    if (s === circuit?.parentElement) {
      circuit.style.setProperty("--d", (1 - clamp((p - 0.12) * 1.7)).toFixed(3));
      circuit.classList.toggle("lit", p > 0.45);
    }
  });
  // achievements: the gold line fills as you read down
  if (timeline) {
    const r = timeline.getBoundingClientRect();
    timeline.style.setProperty("--tp", clamp((vh * 0.6 - r.top) / r.height).toFixed(3));
    timelineItems.forEach(li => li.classList.toggle("lit", li.getBoundingClientRect().top < vh * 0.6));
  }
  // floating marks sway and turn with the scroll
  decos.forEach(d => {
    d.style.translate = `0 ${(Math.sin(y / 450 * +d.dataset.s) * 46).toFixed(1)}px`;
    d.style.rotate = (y * +d.dataset.r).toFixed(1) + "deg";
  });
}

// Hand-tracking illustration (21 landmarks, like MediaPipe) drawn as an SVG
const handSvg = document.getElementById("hand");
if (handSvg) {
  const P = [[100,215],[68,190],[46,160],[32,132],[22,108],[74,128],[68,92],[64,66],[61,42],[100,120],[100,80],[100,50],[100,24],[124,126],[130,92],[133,68],[136,46],[146,140],[158,112],[166,92],[172,74]];
  const E = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
  let svg = "";
  E.forEach(([a, b], i) => {
    const [x1, y1] = P[a], [x2, y2] = P[b];
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="--len:${Math.hypot(x2 - x1, y2 - y1).toFixed(1)};--i:${i}"/>`;
  });
  P.forEach(([x, y], i) => {
    svg += `<circle cx="${x}" cy="${y}" r="${[4, 8, 12, 16, 20].includes(i) ? 4.4 : 3.2}" style="--i:${i}"/>`;
  });
  handSvg.innerHTML = svg;
}
// The example reading under the hand cycles through a few of your 20 signs
const signEl = document.getElementById("sign"), moodEl = document.getElementById("mood");
if (signEl && !reduce) {
  const demo = [["HELLO", "happy"], ["I", "neutral"], ["LOVE", "happy"], ["YOU", "surprised"], ["HELP", "sad"]];
  let k = 0;
  setInterval(() => { k = (k + 1) % demo.length; signEl.textContent = demo[k][0]; moodEl.textContent = demo[k][1]; }, 2200);
}

// Numbers in the featured build count up when they scroll into view
const counters = document.querySelectorAll(".specs b");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    counterObserver.unobserve(e.target);
    const el = e.target, end = +el.dataset.to, t0 = performance.now();
    (function step(t) {
      const k = clamp((t - t0) / 1400);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  });
}, { threshold: 0.6 });
counters.forEach(c => { c.dataset.to = c.textContent; if (!reduce) { c.textContent = "0"; counterObserver.observe(c); } });

// Scroll progress line + cursor spotlight
const bar = document.querySelector(".progress");
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    motion(max);
    ticking = false;
  });
}
addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", onScroll);
onScroll();

if (fine && !reduce) {
  const root = document.documentElement;
  let raf = 0;
  addEventListener("pointermove", e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
    });
  }, { passive: true });

  // Project cards tilt and glow toward the cursor
  document.querySelectorAll(".card").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--gx", x * 100 + "%");
      c.style.setProperty("--gy", y * 100 + "%");
      c.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateY(-4px)`;
    });
    c.addEventListener("pointerleave", () => { c.style.transform = ""; });
  });

  // Buttons lean slightly toward the cursor
  document.querySelectorAll(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
    });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });
}

// Mobile menu
const btn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
btn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
links.addEventListener("click", e => {
  if (e.target.tagName === "A") { links.classList.remove("open"); btn.setAttribute("aria-expanded", false); }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
/* =========================================================
   1) YOUR PROJECTS: this is the only place you edit to add one.
   Copy a { ... }, block, paste it, and change the text.
   image: put the screenshot in the "images" folder, e.g. "images/mysite.png"
          (leave it as "" to show a plain placeholder)
   live / code: links; leave as "" to hide that link
   featured: true shows a small "Featured" badge (optional)
   ========================================================= */
const projects = [
  {
    title: "ISL Sign Language Translator",
    description: "A real-time AI system that reads Indian Sign Language and facial expression through a webcam, then speaks a natural English sentence aloud. Built entirely on free tools.",
    tags: ["Python", "OpenCV", "MediaPipe", "Ollama", "Streamlit"],
    image: "images/isl.png",          // ✏️ EDIT: save a screenshot of the app as images/isl.png
    live: "",
    code: "",                         // ✏️ EDIT: add your GitHub link, or leave empty to hide it
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
    ${p.featured ? '<span class="badge">Featured</span>' : ""}
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

// Scroll progress line + cursor spotlight
const bar = document.querySelector(".progress");
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  });
}
addEventListener("scroll", onScroll, { passive: true });
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
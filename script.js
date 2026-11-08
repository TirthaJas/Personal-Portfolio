/* =========================================================
   1) YOUR PROJECTS: this is the only place you edit to add one.
   Copy a { ... }, block, paste it, and change the text.
   image: put the screenshot in the "images" folder, e.g. "images/mysite.png"
          (leave it as "" to show a plain placeholder)
   live / code: links; leave as "" to hide that link
   ========================================================= */
const projects = [
  {
    title: "JEE Tracker",
    description: "Track you daily JEE classes and manage your time effectively.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "images/jee.png",
    live: "https://jee-tirtha.netlify.app/",
    code: "https://github.com/yourname/project-one"
  },
  {
    title: "NEET Tracker",
    description: "Track you daily NEET classes and clear your backlogs with daily aims and records.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "images/neet.png",
    live: "https://neet-torsha.netlify.app/",
    code: "https://github.com/yourname/project-two"
  },
  {
    title: "Project Three",
    description: "Say what you learned or what is special about this one.",
    tags: ["Java"],
    image: "",
    live: "",
    code: ""
  }
];

/* =========================================================
   2) ROTATING ROLES under your name. Change the words freely.
   ========================================================= */
const roles = ["developer", "problem solver", "growing enthusiast", "lifelong learner"];

/* ---------- Everything below runs the site. You can leave it alone. ---------- */

// Build project cards
const grid = document.getElementById("projectGrid");
projects.forEach(p => {
  const card = document.createElement("article");
  card.className = "card";
  const shot = p.image
    ? `<img src="${p.image}" alt="Screenshot of ${p.title}" loading="lazy">`
    : `<span>${p.title}</span>`;
  const links = [
    p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live site</a>` : "",
    p.code ? `<a href="${p.code}" target="_blank" rel="noopener">Source code</a>` : ""
  ].join("");
  card.innerHTML = `
    <div class="shot">${shot}</div>
    <div class="body">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="actions">${links}</div>
    </div>`;
  grid.appendChild(card);
});

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

// Typing effect for roles
const roleEl = document.getElementById("role");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

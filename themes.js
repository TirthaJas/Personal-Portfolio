/* =========================================================
   themes.js : choose your colour palette here
   ========================================================= */
(function () {
  "use strict";

  /* ✏️ EDIT: change the word between the quotes to pick your palette. Choices:
        "original"   your current midnight and gold look (nothing changes)
        "cream"      warm ivory paper, navy ink, orange highlights  (light)
        "porcelain"  cool white, deep navy, cobalt-blue highlights   (light)
        "graphite"   near-black, champagne, orange highlights        (dark)
        "copper"     ink blue-black, copper, teal highlights         (dark)
     After changing it, save the file and refresh the site with Ctrl+Shift+R. */
  var THEME = "original";

  /* ✏️ EDIT: true = while testing, press the T key to flip through all palettes.
     (It only changes what you see until you refresh.) Set it to false when you are finished. */
  var PREVIEW_KEYS = true;

  var NAMES = ["original", "cream", "porcelain", "graphite", "copper"];
  var BAR = { original: "#0a0e1a", cream: "#F3EEE4", porcelain: "#F4F6F9", graphite: "#0E0E12", copper: "#0D1117" };
  var root = document.documentElement;

  function apply(name) {
    if (NAMES.indexOf(name) < 0) name = "original";
    if (name === "original") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", name);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", BAR[name]);
    return name;
  }

  /* You can also test one palette by adding ?theme=cream to the end of the web address */
  var asked = null;
  try { asked = new URLSearchParams(location.search).get("theme"); } catch (e) {}
  var current = apply(asked || THEME);

  if (PREVIEW_KEYS) {
    var tag = null, timer = 0;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "t" && e.key !== "T") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var el = e.target;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      current = apply(NAMES[(NAMES.indexOf(current) + 1) % NAMES.length]);
      window.dispatchEvent(new Event("themechange"));
      if (!tag) { tag = document.createElement("div"); tag.className = "theme-tag"; tag.setAttribute("aria-hidden", "true"); document.body.appendChild(tag); }
      tag.textContent = "Palette: " + current;
      tag.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(function () { tag.classList.remove("show"); }, 1800);
    });
  }
})();
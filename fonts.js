/* =========================================================
   fonts.js : choose your fonts here
   One file does everything: it loads the fonts and applies them.
   "original" = your current fonts (nothing changes).
   ========================================================= */
(function () {
  "use strict";

  /* ✏️ EDIT: change the word between the quotes to pick your fonts. Choices:
        "original"   Cormorant Garamond + Space Grotesk   (your current look)
        "playfair"   Playfair Display + Inter             (classic, high contrast)
        "fraunces"   Fraunces + Manrope                   (warm, soft serif)
        "cinzel"     Cinzel + Jost                        (Roman capitals, very regal)
        "bodoni"     Bodoni Moda + Hanken Grotesk         (fashion-magazine elegance)
        "lora"       Lora + Work Sans                     (calm and very readable)
        "garamond"   EB Garamond + IBM Plex Sans          (classic book + technical)
        "typewriter" Cormorant Garamond + IBM Plex Mono   (blueprint, code feel)
        "modern"     Sora + Inter                         (clean modern, no serif)
     After changing it, save the file and refresh the site with Ctrl+Shift+R. */
  var FONT = "original";

  /* ✏️ EDIT: true = while testing, press the F key to flip through all the fonts.
     (It only changes what you see until you refresh.) Set it to false when you are finished. */
  var PREVIEW_KEYS = true;

  /* serif = titles and big words, sans = normal text.
     load = the Google Fonts to download (leave it empty for fonts you already have). */
  var FONTS = {
    original:   { name: "1)Cormorant Garamond + Space Grotesk", load: [] },
    playfair:   { name: "2)Playfair Display + Inter",
                  serif: '"Playfair Display", Georgia, serif', sans: '"Inter", system-ui, sans-serif',
                  load: ["Playfair+Display:ital,wght@0,500;0,600;0,700;1,500", "Inter:wght@400;500;600"] },
    fraunces:   { name: "3)Fraunces + Manrope",
                  serif: '"Fraunces", Georgia, serif', sans: '"Manrope", system-ui, sans-serif',
                  load: ["Fraunces:ital,wght@0,500;0,600;0,700;1,500", "Manrope:wght@400;500;600"] },
    cinzel:     { name: "4)Cinzel + Jost",
                  serif: '"Cinzel", Georgia, serif', sans: '"Jost", system-ui, sans-serif',
                  load: ["Cinzel:wght@500;600;700", "Jost:wght@400;500;600"] },
    bodoni:     { name: "5)Bodoni Moda + Hanken Grotesk",
                  serif: '"Bodoni Moda", Georgia, serif', sans: '"Hanken Grotesk", system-ui, sans-serif',
                  load: ["Bodoni+Moda:ital,wght@0,500;0,600;0,700;1,500", "Hanken+Grotesk:wght@400;500;600"] },
    lora:       { name: "6)Lora + Work Sans",
                  serif: '"Lora", Georgia, serif', sans: '"Work Sans", system-ui, sans-serif',
                  load: ["Lora:ital,wght@0,500;0,600;0,700;1,500", "Work+Sans:wght@400;500;600"] },
    garamond:   { name: "7)EB Garamond + IBM Plex Sans",
                  serif: '"EB Garamond", Georgia, serif', sans: '"IBM Plex Sans", system-ui, sans-serif',
                  load: ["EB+Garamond:ital,wght@0,500;0,600;0,700;1,500", "IBM+Plex+Sans:wght@400;500;600"] },
    typewriter: { name: "8)Cormorant Garamond + IBM Plex Mono",
                  serif: '"Cormorant Garamond", Georgia, serif', sans: '"IBM Plex Mono", ui-monospace, monospace',
                  load: ["IBM+Plex+Mono:wght@400;500"] },
    modern:     { name: "9)Sora + Inter",
                  serif: '"Sora", system-ui, sans-serif', sans: '"Inter", system-ui, sans-serif',
                  load: ["Sora:wght@500;600;700", "Inter:wght@400;500;600"] }
  };
  var ORDER = ["original", "playfair", "fraunces", "cinzel", "bodoni", "lora", "garamond", "typewriter", "modern"];

  var root = document.documentElement;
  var loaded = {};

  /* Writes the rules that swap the fonts, and the small preview label's style */
  var css = "";
  ORDER.forEach(function (k) {
    if (k === "original") return;
    css += 'html[data-font="' + k + '"]{--serif:' + FONTS[k].serif + ';--sans:' + FONTS[k].sans + ';}';
  });
  css += ".font-tag{position:fixed;left:1rem;bottom:3.4rem;z-index:120;padding:.4rem .9rem;border:1px solid var(--line);border-radius:999px;background:var(--bg2);color:var(--text);font:500 .8rem system-ui,sans-serif;opacity:0;pointer-events:none;transition:opacity .3s;}.font-tag.show{opacity:1;}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function ensureLoaded(k) {
    var f = FONTS[k];
    if (!f || loaded[k] || !f.load.length) return;
    loaded[k] = true;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?" + f.load.map(function (x) { return "family=" + x; }).join("&") + "&display=swap";
    document.head.appendChild(link);
  }

  function apply(k) {
    if (!FONTS[k]) k = "original";
    ensureLoaded(k);
    if (k === "original") root.removeAttribute("data-font"); else root.setAttribute("data-font", k);
    return k;
  }

  /* You can also test one font by adding ?font=playfair to the end of the web address */
  var asked = null;
  try { asked = new URLSearchParams(location.search).get("font"); } catch (e) {}
  var current = apply(asked || FONT);

  if (PREVIEW_KEYS) {
    var tag = null, timer = 0;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "f" && e.key !== "F") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var el = e.target;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      current = apply(ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
      ensureLoaded(ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);   // gets the next one ready
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { window.dispatchEvent(new Event("resize")); });
      if (!tag) { tag = document.createElement("div"); tag.className = "font-tag"; tag.setAttribute("aria-hidden", "true"); document.body.appendChild(tag); }
      tag.textContent = "Font: " + current + " (" + FONTS[current].name + ")";
      tag.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(function () { tag.classList.remove("show"); }, 2200);
    });
  }
})();

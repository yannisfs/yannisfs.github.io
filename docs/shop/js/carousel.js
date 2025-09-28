// Elements
const scroller = document.getElementById("scroller");
const carousel = document.getElementById("carousel");
const tiles = Array.from(carousel.querySelectorAll(".tile"));

// Config
const MIN_SCALE = 0.6;  // size of far tiles
const MAX_SCALE = 1.0;  // center tile size
const EDGE_FADE  = 0.45; // how much to fade at edges (0..1)
const ROTATE_MAX_DEG = 12; // slight Y rotation for "round" feel

function updateScales() {
  if (!scroller) return;

  const rect = scroller.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const maxDistance = rect.width / 2; // half the viewport width inside scroller

  tiles.forEach(tile => {
    const r = tile.getBoundingClientRect();
    const tileCenterX = r.left + r.width / 2;
    const dx = Math.abs(centerX - tileCenterX);

    // distance ratio 0 (center) -> 1 (edge)
    const t = Math.min(1, dx / maxDistance);

    // cosine ease for smoother scale curve
    const ease = 0.5 - 0.5 * Math.cos(Math.PI * (1 - t));
    const scale = Math.max(MIN_SCALE, MAX_SCALE - ease * (MAX_SCALE - MIN_SCALE));

    // subtle opacity drop & Y rotation based on direction
    const sign = Math.sign(tileCenterX - centerX) || 0;
    const rotateY = sign * ROTATE_MAX_DEG * ease;
    const opacity = Math.max(0.35, 1 - t * EDGE_FADE);

    tile.style.transform = `translateZ(0) scale(${scale}) rotateY(${rotateY}deg)`;
    tile.style.opacity = String(opacity);
    tile.style.zIndex = String(Math.round(scale * 1000));
  });
}

// Initial + on events
function rafUpdate(){ requestAnimationFrame(updateScales); }
window.addEventListener("load", updateScales);
window.addEventListener("resize", rafUpdate);
scroller.addEventListener("scroll", rafUpdate, { passive: true });

// Optional: keep the first tile centered on load for nicer entry
if ("scrollTo" in scroller) {
  setTimeout(() => {
    const first = tiles[0];
    if (!first) return;
    const left = first.offsetLeft + first.offsetWidth / 2 - scroller.clientWidth / 2;
    scroller.scrollTo({ left, behavior: "instant" in scroller ? "instant" : "auto" });
    updateScales();
  }, 0);
}
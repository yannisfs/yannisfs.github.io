const scroller = document.getElementById("scroller");
const tiles = Array.from(document.querySelectorAll(".tile"));

function updateScales() {
  const rect = scroller.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;

  tiles.forEach(tile => {
    const r = tile.getBoundingClientRect();
    const tileCenter = r.left + r.width / 2;
    const dx = Math.abs(centerX - tileCenter);
    const maxDist = rect.width / 2;

    // distance ratio 0 at center, 1 at far edge
    const t = Math.min(1, dx / maxDist);

    // scale and opacity falloff
    const scale = 1 - 0.4 * t;     // 1.0 in center → 0.6 at edge
    const opacity = 1 - 0.5 * t;   // fades slightly
    const angle = (tileCenter - centerX) / maxDist * 15; // -15deg … 15deg

    tile.style.transform = `scale(${scale}) rotateY(${angle}deg)`;
    tile.style.opacity = opacity;
    tile.style.zIndex = Math.round(scale * 1000);
  });
}

updateScales();
window.addEventListener("resize", () => requestAnimationFrame(updateScales));
scroller.addEventListener("scroll", () => requestAnimationFrame(updateScales));
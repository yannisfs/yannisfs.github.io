const carousel = document.getElementById("carousel");
const tiles = [...carousel.querySelectorAll(".tile")];

function updateScales() {
  const rect = carousel.getBoundingClientRect();
  const center = rect.left + rect.width / 2;

  tiles.forEach(tile => {
    const tileRect = tile.getBoundingClientRect();
    const tileCenter = tileRect.left + tileRect.width / 2;

    const distance = Math.abs(center - tileCenter);
    const maxDistance = rect.width / 2;

    // scale factor: 1 in center, down to 0.6 on edges
    const scale = Math.max(0.6, 1 - distance / maxDistance * 0.4);
    const opacity = Math.max(0.4, 1 - distance / maxDistance * 0.6);

    tile.style.transform = `scale(${scale})`;
    tile.style.opacity = opacity;
    tile.style.zIndex = Math.round(scale * 100); // bring bigger to front
  });
}

updateScales();
window.addEventListener("resize", updateScales);
carousel.addEventListener("scroll", () => {
  requestAnimationFrame(updateScales);
});
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Array of crystal IDs
const crystals = ["#crystal1", "#crystal2", "#crystal3", "#crystal4", "#crystal5"];

// Create a timeline linked to scroll
const tl = gsap.timeline({
    scrollTrigger: {
    trigger: document.body, // animate throughout the full page
    start: "top top",
    end: "bottom bottom",
    scrub: true,       // links animation progress to scroll
    }
});

// Animate each crystal "breaking" upward with random offsets
crystals.forEach((selector) => {
    const randX = gsap.utils.random(-40, 40);
    const randY = gsap.utils.random(-150, -300);
    const randRot = gsap.utils.random(-30, 30);

    tl.to(selector, {
    duration: 3,
    x: randX,
    y: randY,
    rotation: randRot,
    transformOrigin: "50% 100%", // pivot from bottom center
    ease: "power2.inOut"
    }, 0); // Start all at timeline position 0
});

// Optionally fade them out near the end
tl.to(crystals, {
    duration: 1.5,
    opacity: 0
}, ">-0.5");
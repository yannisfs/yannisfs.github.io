const tl = gsap.timeline({defaults: { ease: 'power4.out, duration: .7'}});

gsap.set('g', {
    autoAlpha : 1,
    transformOrigin : "50% 50%",
    scale : 5
});

gsap.set(['#Title', '.swipe-indicator'], {
    opacity : 0
});

gsap.set('.main-content', {
    autoAlpha : 1
});

tl
    .add('logo_animate')
    .to('#Logo-1', {
        x : -580,
        y : 580,
        duration : 0.5
    }, 'logo_animate')
    .to('#Logo-3', {
        x : 580,
        y : -580,
        duration : 0.5
    }, 'logo_animate');

tl
    .add('logo_title_animate')
    .to('#Logo-1', {
        x : -3280,
        y : 580,
        duration : 0.8,
        immediateRender: false
    }, 'logo_title_animate')
    .to('#Logo-2', {
        x : -2700,
        duration : 0.8,
        immediateRender: false
    }, 'logo_title_animate')
    .to('#Logo-3',  {
        x : -2120,
        y : -580,
        duration : 0.8,
        immediateRender: false
    }, 'logo_title_animate')
    .fromTo('#Title', {
        x : 700
    }, {
        x : 1300,
        opacity : 1,
        delay: 0.2,
        duration : 0.6,
        immediateRender: false
    }, 'logo_title_animate')
    .to('.swipe-indicator', {
        opacity: 1,
        delay: 0.3,
        duration: 0.5
    }, 'logo_title_animate');
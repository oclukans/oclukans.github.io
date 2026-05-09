// script.js

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000) });
gsap.ticker.lagSmoothing(0);

window.addEventListener('load', () => {
    
    // 2. Elegant Intro Reveal
    const tl = gsap.timeline();
    
    tl.to("#intro-content", {
        duration: 1.5,
        opacity: 1,
        y: 0,
        ease: "power3.out"
    })
    .to({}, { duration: 0.8 }) // Pause
    .to("#intro-overlay", {
        duration: 1.5,
        opacity: 0,
        ease: "power2.inOut",
        onComplete: () => {
            document.getElementById('intro-overlay').style.display = 'none';
        }
    });

    // 3. Parallax Hero Background
    gsap.to(".hero-bg", {
        yPercent: 30, // Move down slightly as user scrolls down
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 4. Sticky Navbar Color Change
    const navbar = document.querySelector('.navbar');
    ScrollTrigger.create({
        trigger: ".hero",
        start: "bottom top",
        onEnter: () => navbar.classList.add("scrolled"),
        onLeaveBack: () => navbar.classList.remove("scrolled")
    });

    // 5. Populate Interactive Gallery (Seamless Loop)
    const galleryTrack = document.getElementById('gallery-track');
    const images = ['baby_pie.avif', 'cutie_pie.avif', 'dog_paw.avif', 'golden_retriever.avif'];
    
    // Duplicate array to ensure seamless infinite looping
    const displayList = [...images, ...images, ...images, ...images, ...images]; 
    
    displayList.forEach(filename => {
        const img = document.createElement('img');
        img.src = `assets/${filename}`;
        img.className = 'interactive-img';
        galleryTrack.appendChild(img);
    });

    // Animate the gallery track endlessly
    // We move it left by enough width to look infinite.
    // 5 arrays of 4 images = 20 images. Moving it left endlessly.
    gsap.to(".scroll-track", {
        xPercent: -50,
        ease: "none",
        duration: 50,
        repeat: -1
    });

    // 6. Editorial About Section Scroll Reveal
    gsap.from(".img-inside", {
        x: 100,
        opacity: 0,
        rotation: 5,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about",
            start: "top 70%",
        }
    });
    
    gsap.from(".img-outside", {
        x: -100,
        opacity: 0,
        rotation: -5,
        duration: 1.5,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about",
            start: "top 70%",
        }
    });

    // Generic Scroll Fade
    gsap.utils.toArray('.scroll-fade').forEach(el => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            }
        });
    });

    // Smooth Scrolling for anchor links using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            lenis.scrollTo(targetId, { offset: -100 });
        });
    });
});

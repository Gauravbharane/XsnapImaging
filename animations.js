// GSAP animations (non-invasive) - targets existing classes only
(function() {
  function init() {
    if (!window.gsap) return console.warn('GSAP not loaded');
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // Nav links entrance
    gsap.from('.nav-link', { y: -12, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' });

    // Hero headline and CTAs
    gsap.from('.hero-parallax h1, .hero-parallax p, .hero-parallax .btn-primary, .hero-parallax .btn-secondary', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    });

    // Parallax images using ScrollTrigger if available, fallback to subtle float
    const parallaxEls = gsap.utils.toArray('.parallax-image');
    if (window.ScrollTrigger) {
      parallaxEls.forEach(el => {
        gsap.to(el, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      });
    } else {
      gsap.to(parallaxEls, { y: -8, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    // Fade-in sections (replaces CSS intersection behaviour with GSAP ScrollTrigger where available)
    const fadeEls = gsap.utils.toArray('.fade-in, .fade-in-left, .fade-in-right');
    fadeEls.forEach(el => {
      const from = { opacity: 0 };
      if (el.classList.contains('fade-in-left')) from.x = -28;
      else if (el.classList.contains('fade-in-right')) from.x = 28;
      else from.y = 18;

      if (window.ScrollTrigger) {
        gsap.from(el, {
          ...from,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      } else {
        gsap.fromTo(el, { ...from }, { ...from, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });

    // Product cards entrance and subtle float for product media
    gsap.from('.product-card', { scale: 0.985, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' });
    gsap.to('.product-media', { y: -12, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Buttons hover micro-interaction (non-destructive)
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.03, duration: 0.18, ease: 'power2.out' }));
      btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power2.out' }));
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

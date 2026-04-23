// =====================================================
// GSAP ScrollTrigger Registration
// =====================================================
gsap.registerPlugin(ScrollTrigger);

// =====================================================
// SCROLL PROGRESS BAR
// =====================================================
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = progress + '%';
});

// =====================================================
// INITIAL STATES — GSAP controls visibility
// =====================================================
gsap.set(['.brand-logo', '.hero-content h1', '.hero-content p', '.usp-list li', '.hero-content .btn-primary', '.hero-content [style*="margin-top: 1.5rem"]'], {
    autoAlpha: 0, y: 30
});
gsap.set('.hero-image', { autoAlpha: 0, x: 80, scale: 0.9 });

// =====================================================
// HERO SECTION – Staggered Entry Animations
// =====================================================
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
    .to('.brand-logo', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    .to('.hero-content h1', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-content p', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to('.usp-list li', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.3')
    .to('.hero-content .btn-primary', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.1')
    .to('.hero-content [style*="margin-top: 1.5rem"]', { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.1')
    .to('.hero-image', { autoAlpha: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.8');

// Parallax disabled to stabilize image as requested
/*
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
        const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to('.hero-image', {
            x: xRatio * 14,
            y: yRatio * 8,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}
*/

// =====================================================
// ANIMATED NUMBER COUNTERS for transformation stats
// =====================================================
function animateCounter(el, target, suffix) {
    const isDecimal = target % 1 !== 0;
    gsap.fromTo({ val: 0 }, { val: target }, {
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function () {
            el.textContent = (isDecimal ? this.targets()[0].val.toFixed(1) : Math.floor(this.targets()[0].val)) + suffix;
        }
    });
}

// Observe stat elements and trigger counter on enter
const statEls = document.querySelectorAll('.data-item strong');
statEls.forEach(el => {
    const raw = el.textContent.trim(); // e.g. "12.5 KG" or "16 Weeks"
    const num = parseFloat(raw);
    const suffix = raw.replace(/[\d.]/g, '').trim(); // extracts " KG" or " Weeks"
    if (!isNaN(num)) {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => animateCounter(el, num, ' ' + suffix)
        });
    }
});

// Also animate hero "500+" 
const heroBadge = document.querySelector('.hero-content [style*="margin-top: 1.5rem"] span');
if (heroBadge && heroBadge.textContent.includes('500+')) {
    ScrollTrigger.create({
        trigger: heroBadge,
        start: 'top 90%',
        once: true,
        onEnter: () => {
            gsap.fromTo({ val: 0 }, { val: 500 }, {
                duration: 1.8, ease: 'power2.out',
                onUpdate: function () {
                    heroBadge.textContent = Math.floor(this.targets()[0].val) + '+ Transformations Done';
                }
            });
        }
    });
}

// =====================================================
// SECTION TITLE ANIMATED UNDERLINE
// =====================================================
document.querySelectorAll('.section-title').forEach(el => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: () => el.classList.add('animated')
    });
});

// =====================================================
// SECTION TITLES – General fade up
// =====================================================
gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        autoAlpha: 0, y: 40, duration: 0.8, ease: 'power3.out'
    });
});

// =====================================================
// TRANSFORMATION CARDS – Staggered Horizontal Slide
// =====================================================
gsap.from('.trans-card', {
    scrollTrigger: { trigger: '.trans-grid', start: 'top 82%', toggleActions: 'play none none none' },
    autoAlpha: 0, x: 60, duration: 0.7, stagger: 0.2, ease: 'power3.out'
});

// =====================================================
// PAIN POINT SECTION – Reveals + Parallax
// =====================================================
gsap.from('.pain-point-content h2', {
    scrollTrigger: { trigger: '.pain-point-section', start: 'top 78%' },
    autoAlpha: 0, y: 40, duration: 0.8, ease: 'power3.out'
});
gsap.from('.pain-point-sub', {
    scrollTrigger: { trigger: '.pain-point-section', start: 'top 75%' },
    autoAlpha: 0, y: 25, duration: 0.7, delay: 0.15, ease: 'power3.out'
});
gsap.from('.pain-point-text', {
    scrollTrigger: { trigger: '.pain-point-section', start: 'top 72%' },
    autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.15, ease: 'power2.out'
});
gsap.from('.loop-box', {
    scrollTrigger: { trigger: '.loop-box', start: 'top 88%' },
    autoAlpha: 0, x: -40, duration: 0.7, ease: 'back.out(1.5)'
});
gsap.from('.pain-point-conclusion', {
    scrollTrigger: { trigger: '.pain-point-conclusion', start: 'top 88%' },
    autoAlpha: 0, y: 20, duration: 0.6, ease: 'power2.out'
});
gsap.from('.pain-point-image', {
    scrollTrigger: { trigger: '.pain-point-section', start: 'top 72%' },
    autoAlpha: 0, scale: 0.88, duration: 1, ease: 'power3.out'
});
/* 
gsap.to('.pain-point-image img', {
    scrollTrigger: { trigger: '.pain-point-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    y: -60, ease: 'none'
});
*/

// SEQUENTIAL LOOP ANIMATION
const loopItems = document.querySelectorAll('.loop-item');
if (loopItems.length > 0) {
    const loopTl = gsap.timeline({ repeat: -1 });
    loopItems.forEach((item, index) => {
        loopTl
            .to(item, { color: '#E66D1B', scale: 1.1, duration: 0.5, ease: 'power2.out' })
            .to(item, { color: 'inherit', scale: 1, duration: 0.5, ease: 'power2.in' }, '+=0.5');
    });
}

// Add shimmer class to the specific button
const painPointBtn = document.querySelector('.pain-point-content .btn-primary');
if (painPointBtn) painPointBtn.classList.add('shimmer');

// =====================================================
// METHOD SECTION – Left Swipe + Parallax
// =====================================================
gsap.from('.method-side-img', {
    scrollTrigger: { trigger: '.method-section', start: 'top 78%' },
    autoAlpha: 0, x: -80, duration: 1, ease: 'power3.out'
});
gsap.from('.method-subtitle', {
    scrollTrigger: { trigger: '.method-section', start: 'top 75%' },
    autoAlpha: 0, y: 15, duration: 0.6, ease: 'power2.out'
});
gsap.from('.method-title-large', {
    scrollTrigger: { trigger: '.method-section', start: 'top 72%' },
    autoAlpha: 0, y: 30, duration: 0.8, ease: 'power3.out'
});
gsap.from('.method-formula-bar', {
    scrollTrigger: { trigger: '.method-section', start: 'top 68%' },
    autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: 0.7, ease: 'power2.out'
});
gsap.from('.method-step-row', {
    scrollTrigger: { trigger: '.method-steps-list', start: 'top 82%' },
    autoAlpha: 0, x: 30, duration: 0.5, stagger: 0.15, ease: 'power2.out'
});
/* 
gsap.to('.method-side-img img', {
    scrollTrigger: { trigger: '.method-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    y: -50, ease: 'none'
});
*/

// =====================================================
// COMPARISON SECTION – Row Stagger
// =====================================================
gsap.from('.comparison-wrapper', {
    scrollTrigger: { trigger: '.comparison-wrapper', start: 'top 82%' },
    autoAlpha: 0, y: 50, scale: 0.97, duration: 1, ease: 'power3.out'
});
// Enhanced Stagger Reveal with Icon Pop
const compRows = document.querySelectorAll('.comp-cell.feature-col');
compRows.forEach((cell, i) => {
    const rowCells = [cell, cell.nextElementSibling, cell.nextElementSibling?.nextElementSibling, cell.nextElementSibling?.nextElementSibling?.nextElementSibling, cell.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling];

    gsap.from(rowCells, {
        scrollTrigger: { 
            trigger: cell, 
            start: 'top 92%', // Trigger slightly earlier
            toggleActions: 'play none none none' 
        },
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.08,
        delay: i * 0.03,
        ease: 'power2.out',
        clearProps: 'all' // Crucial for visibility after animation
    });

    // Icon pop animation
    rowCells.forEach(c => {
        if (!c) return;
        const icon = c.querySelector('i');
        if (icon) {
            gsap.from(icon, {
                scrollTrigger: { trigger: c, start: 'top 92%' },
                scale: 0,
                duration: 0.5,
                delay: i * 0.03 + 0.3,
                ease: 'back.out(2)',
                clearProps: 'all'
            });
        }
    });
});

// =====================================================
// INCLUSION SECTION – Split Reveal + Parallax
// =====================================================
gsap.from('.inclusion-content', {
    scrollTrigger: { trigger: '.inclusion-section', start: 'top 78%' },
    autoAlpha: 0, x: -60, duration: 0.9, ease: 'power3.out'
});
gsap.from('.inclusion-item', {
    scrollTrigger: { trigger: '.inclusion-list', start: 'top 82%' },
    autoAlpha: 0, x: -25, duration: 0.4, stagger: 0.09, ease: 'power2.out'
});
gsap.from('.inclusion-image', {
    scrollTrigger: { trigger: '.inclusion-section', start: 'top 78%' },
    autoAlpha: 0, x: 60, duration: 0.9, ease: 'power3.out'
});
/* 
gsap.to('.inclusion-image img', {
    scrollTrigger: { trigger: '.inclusion-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    y: -40, ease: 'none'
});
*/
// CTA button bounce-in
gsap.from('.inclusion-footer .btn-primary', {
    scrollTrigger: { trigger: '.inclusion-footer', start: 'top 88%' },
    autoAlpha: 0, scale: 0.8, duration: 0.7, ease: 'back.out(2)'
});

// =====================================================
// FOUNDERS SECTION
// =====================================================
gsap.from('.founders-title', {
    scrollTrigger: { trigger: '.founders-section', start: 'top 82%' },
    autoAlpha: 0, y: 50, duration: 0.9, ease: 'power3.out'
});
gsap.from('.founders-content p', {
    scrollTrigger: { trigger: '.founders-content', start: 'top 82%' },
    autoAlpha: 0, y: 25, duration: 0.6, stagger: 0.2, ease: 'power2.out'
});
gsap.from('.founders-image', {
    scrollTrigger: { trigger: '.founders-section', start: 'top 78%' },
    autoAlpha: 0, x: 80, duration: 1, ease: 'power3.out'
});
gsap.from('.philosophy-col', {
    scrollTrigger: { trigger: '.philosophy-grid', start: 'top 82%' },
    autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.2, ease: 'power3.out'
});
// Gap/Solution list items stagger
gsap.from('.gap-list li, .solution-list li', {
    scrollTrigger: { trigger: '.philosophy-grid', start: 'top 78%' },
    autoAlpha: 0, x: -20, duration: 0.4, stagger: 0.1, ease: 'power2.out'
});

// =====================================================
// TIMELINE SECTION – Line Draw + Card Reveals
// =====================================================
gsap.fromTo('.timeline-line',
    { scaleY: 0, transformOrigin: 'top center' },
    {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.timeline-right', start: 'top 70%', end: 'bottom 80%', scrub: true }
    }
);
gsap.from('.timeline-title-card', {
    scrollTrigger: { trigger: '.timeline-section', start: 'top 82%' },
    autoAlpha: 0, x: -50, duration: 0.9, ease: 'power3.out'
});
gsap.from('.timeline-step', {
    scrollTrigger: { trigger: '.timeline-steps', start: 'top 82%', toggleActions: 'play none none none' },
    autoAlpha: 0, x: 50, duration: 0.6, stagger: 0.25, ease: 'power3.out'
});
gsap.from('.timeline-marker', {
    scrollTrigger: { trigger: '.timeline-steps', start: 'top 82%', toggleActions: 'play none none none' },
    autoAlpha: 0, scale: 0, duration: 0.4, stagger: 0.25, delay: 0.2, ease: 'back.out(2)'
});

// =====================================================
// APP SECTION – Float + Slide
// =====================================================
gsap.from('.app-info', {
    scrollTrigger: { trigger: '.app-section', start: 'top 82%' },
    autoAlpha: 0, x: -60, duration: 0.9, ease: 'power3.out'
});
gsap.from('.app-feature-item', {
    scrollTrigger: { trigger: '.app-features', start: 'top 82%' },
    autoAlpha: 0, y: 30, duration: 0.5, stagger: 0.15, ease: 'power2.out',
    clearProps: 'all'
});
gsap.from('.app-mockup', {
    scrollTrigger: { trigger: '.app-section', start: 'top 82%' },
    autoAlpha: 0, scale: 0.8, y: 40, duration: 1, ease: 'back.out(1.5)'
});

// =====================================================
// TYPEFORM SECTION
// =====================================================
gsap.from('.typeform-wrapper', {
    scrollTrigger: { trigger: '.typeform-section', start: 'top 80%' },
    autoAlpha: 0, scale: 0.95, y: 40, duration: 1, ease: 'power3.out'
});

// =====================================================
// FAQ SECTION
// =====================================================
gsap.from('.faq-item', {
    scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
    autoAlpha: 0, y: 25, duration: 0.5, stagger: 0.1, ease: 'power2.out'
});

// =====================================================
// IMAGE LOADED STATE (remove shimmer)
// =====================================================
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
    }
});

// =====================================================
// FAQ Accordion
// =====================================================
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        const isActive = parent.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.faq-item i').forEach(icon => icon.classList.replace('fa-minus', 'fa-plus'));
        if (!isActive) {
            parent.classList.add('active');
            item.querySelector('i').classList.replace('fa-plus', 'fa-minus');
        }
    });
});

// =====================================================
// Countdown Timer
// =====================================================
function startTimer(duration, display) {
    let timer = duration;
    setInterval(() => {
        const minutes = String(parseInt(timer / 60, 10)).padStart(2, '0');
        const seconds = String(parseInt(timer % 60, 10)).padStart(2, '0');
        display.textContent = minutes + ':' + seconds;
        if (--timer < 0) timer = duration;
    }, 1000);
}

window.addEventListener('load', () => {
    const timerDisplay = document.querySelector('#timer');
    if (timerDisplay) {
        startTimer(30 * 60, timerDisplay);
        document.querySelector('#timer-box').style.display = 'block';
    }
});

// =====================================================
// Smooth CTA Scroll
// =====================================================
// =====================================================
// Smooth CTA Scroll
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 20; // Small offset for better framing
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// Sticky Footer Slide-Up on Scroll
// =====================================================
const stickyFooter = document.querySelector('.sticky-footer');
if (stickyFooter) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            stickyFooter.style.opacity = '1';
            stickyFooter.style.transform = 'translateY(0)';
        } else {
            stickyFooter.style.opacity = '0';
            stickyFooter.style.transform = 'translateY(100%)';
        }
    });
}

// =====================================================
// Testimonials Auto-Scroll Loop (Mobile Only)
// =====================================================
const transGrid = document.querySelector('.trans-grid');
if (transGrid && window.innerWidth < 768) {
    // Clone cards for infinite loop
    const originalCards = Array.from(transGrid.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove('reveal-right', 'reveal-up', 'reveal-left');
        clone.style.opacity = '1';
        clone.style.visibility = 'visible';
        transGrid.appendChild(clone);
    });

    let scrollSpeed = 1.0; 
    let isPaused = false;

    function scrollLoop() {
        if (!isPaused) {
            transGrid.scrollLeft += scrollSpeed;
            if (transGrid.scrollLeft >= transGrid.scrollWidth / 2) {
                transGrid.scrollLeft = 0;
            }
        }
        requestAnimationFrame(scrollLoop);
    }

    transGrid.addEventListener('mouseenter', () => isPaused = true);
    transGrid.addEventListener('mouseleave', () => isPaused = false);
    transGrid.addEventListener('touchstart', () => isPaused = true, { passive: true });
    transGrid.addEventListener('touchend', () => {
        setTimeout(() => isPaused = false, 1500);
    }, { passive: true });

    scrollLoop();
}

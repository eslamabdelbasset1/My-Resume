/*
 * --------------------------------------------------------------------------
 *  Eslam Abdelbasset Portfolio — Main JS v3.0
 * --------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------------
    // Dynamic Copyright Year
    // ------------------------------------------------------------------
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ------------------------------------------------------------------
    // Mobile Menu Toggle
    // ------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // ------------------------------------------------------------------
    // Navbar Scroll Effect
    // ------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ------------------------------------------------------------------
    // Active Nav Link on Scroll
    // ------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    const activateLink = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', activateLink, { passive: true });

    // ------------------------------------------------------------------
    // Intersection Observer — Fade In Animations
    // ------------------------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay based on position among siblings
                const siblings = entry.target.parentElement
                    ? [...entry.target.parentElement.querySelectorAll('.fade-in-up')]
                    : [];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.08}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '-40px 0px',
        threshold: 0.08
    });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // ------------------------------------------------------------------
    // Smooth scroll for logo (back to top)
    // ------------------------------------------------------------------
    document.querySelectorAll('a[href="#hero"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

});

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

    // ------------------------------------------------------------------
    // Hero Image Interactive Tilt
    // ------------------------------------------------------------------
    const heroWrap = document.querySelector('.hero-image-wrap');
    const heroFrame = document.querySelector('.hero-image-frame');
    const heroPhoto = document.querySelector('.hero-photo');
    const heroBadges = document.querySelectorAll('.hero-image-badge');

    if (heroWrap && heroFrame) {
        heroWrap.addEventListener('mousemove', (e) => {
            const rect = heroWrap.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            // Tilt the main frame
            heroFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Subtle parallax for the photo inside
            if (heroPhoto) {
                heroPhoto.style.transform = `scale(1.1) translate(${(x - centerX) / 20}px, ${(y - centerY) / 20}px)`;
            }

            // More aggressive parallax for badges
            heroBadges.forEach(badge => {
                const depth = badge.classList.contains('hero-image-badge--left') ? 40 : 60;
                badge.style.transform = `translateZ(${depth}px) translate(${(x - centerX) / 15}px, ${(y - centerY) / 15}px)`;
            });
        });

        heroWrap.addEventListener('mouseleave', () => {
            heroFrame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            if (heroPhoto) heroPhoto.style.transform = `scale(1) translate(0, 0)`;
            
            heroBadges.forEach(badge => {
                badge.style.transform = `translateZ(0px) translate(0, 0)`;
            });
        });
    }

});

/*
* --------------------------------------------------------------------------
*  Anti-Gravity Portfolio - Main JS
*  Vanilla JS, No Dependencies
* --------------------------------------------------------------------------
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // Set Dynamic Copyright Year
    // ----------------------------------------------------------------------
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ----------------------------------------------------------------------
    // Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon (optional, would require logic to switch icon name)
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------------------------
    // Intersection Observer for Fade In Animations
    // ----------------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));


    // ----------------------------------------------------------------------
    // Navbar Scroll Effect (Glassmorphism enhancer)
    // ----------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(15, 23, 42, 0.85)';
        }
    });

});

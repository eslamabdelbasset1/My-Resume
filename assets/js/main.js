/**
 * Portfolio Main JavaScript
 * Theme Toggle, Navigation, Animations, and Portfolio Filtering
 */
(function() {
  "use strict";

  // ==============================================
  // FORCE SCROLL TO HERO ON LOAD/REFRESH
  // ==============================================
  
  // Disable browser scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Immediate scroll to top (before anything renders)
  window.scrollTo(0, 0);

  // Remove URL hash on refresh (unless it's #hero)
  if (window.location.hash && window.location.hash !== '#hero') {
    history.replaceState(null, null, window.location.pathname);
  }

  // ==============================================
  // THEME TOGGLE FUNCTIONALITY
  // ==============================================
  
  const themeToggle = document.querySelector('.theme-toggle-btn');
  const body = document.body;
  
  // Check for saved theme preference or default to 'light' mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.classList.toggle('light-theme', currentTheme === 'light');
  updateThemeIcon();
  
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
  });
  
  function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
      icon.classList.remove('bi-sun');
      icon.classList.add('bi-moon');
    } else {
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-sun');
    }
  }

  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  // ==============================================
  // NAVBAR ACTIVE STATE
  // ==============================================

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  // ==============================================
  // BACK TO TOP BUTTON
  // ==============================================

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  // ==============================================
  // MOBILE NAVIGATION
  // ==============================================

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  // ==============================================
  // PAGE LOAD HANDLING
  // ==============================================

  /**
   * Handle scroll on page load
   * - If no hash or hash is #hero: scroll to top
   * - Otherwise: scroll to the hash section
   */
  window.addEventListener('load', () => {
    // Force scroll to hero section on page load/refresh
    setTimeout(() => {
      if (!window.location.hash || window.location.hash === '#hero') {
        // Scroll to top (hero section)
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });

        // Ensure hero nav link is active
        navbarlinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#hero') {
            link.classList.add('active');
          }
        });
      } else {
        // If there's a different hash, scroll to that section
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    }, 100);
  });

  // ==============================================
  // TYPED TEXT EFFECT
  // ==============================================

  /**
   * Hero typed text effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // ==============================================
  // ANIMATION ON SCROLL (AOS)
  // ==============================================

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  // ==============================================
  // PORTFOLIO ISOTOPE AND FILTER
  // ==============================================

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }
  });

  // ==============================================
  // LIGHTBOX AND SLIDER
  // ==============================================

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})();

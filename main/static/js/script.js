/* ==========================================================================
   Sai Krishna — Portfolio Website JavaScript
   Handles: mobile menu, smooth scroll, active nav link, scroll reveal
   animations, back-to-top button, and auto footer year.
   ========================================================================== */

(function () {
    'use strict';

    /* --------------------------------------------------------------------
       1. Mobile Navigation Toggle
       -------------------------------------------------------------------- */
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            var isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu when a link is clicked
        var navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* --------------------------------------------------------------------
       2. Navbar scroll effect (add background when scrolled)
       -------------------------------------------------------------------- */
    var navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // run once on load

    /* --------------------------------------------------------------------
       3. Active navigation link based on scroll position
       -------------------------------------------------------------------- */
    var sections = document.querySelectorAll('section[id]');
    var allNavLinks = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                allNavLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    /* --------------------------------------------------------------------
       4. Scroll Reveal Animations (using IntersectionObserver)
       -------------------------------------------------------------------- */
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: just show everything
        revealElements.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    /* --------------------------------------------------------------------
       5. Back to Top Button
       -------------------------------------------------------------------- */
    var backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------
       6. Auto current year in footer
       -------------------------------------------------------------------- */
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* --------------------------------------------------------------------
       7. Basic client-side form validation (enhancement)
       The real validation happens on the Django side; this just gives
       instant feedback before the page reloads.
       -------------------------------------------------------------------- */
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            var name = document.getElementById('id_name');
            var email = document.getElementById('id_email');
            var subject = document.getElementById('id_subject');
            var message = document.getElementById('id_message');
            var valid = true;

            // Clear previous errors
            var existingErrors = contactForm.querySelectorAll('.form-error');
            existingErrors.forEach(function (el) { el.remove(); });

            function showError(input, msg) {
                var span = document.createElement('span');
                span.className = 'form-error';
                span.textContent = msg;
                input.parentNode.appendChild(span);
                input.style.borderColor = 'var(--error-500)';
                valid = false;
            }

            function clearError(input) {
                input.style.borderColor = '';
            }

            if (name) {
                clearError(name);
                if (!name.value.trim()) showError(name, 'Name is required');
            }
            if (email) {
                clearError(email);
                if (!email.value.trim()) {
                    showError(email, 'Email is required');
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    showError(email, 'Please enter a valid email');
                }
            }
            if (subject) {
                clearError(subject);
                if (!subject.value.trim()) showError(subject, 'Subject is required');
            }
            if (message) {
                clearError(message);
                if (!message.value.trim()) {
                    showError(message, 'Message is required');
                } else if (message.value.trim().length < 10) {
                    showError(message, 'Message should be at least 10 characters');
                }
            }

            if (!valid) {
                e.preventDefault();
            }
        });
    }

})();

// ===================== DARK / LIGHT MODE =====================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️";
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDarkMode = document.body.classList.contains("dark-mode");

        if (isDarkMode) {
            themeIcon.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}
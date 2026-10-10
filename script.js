/*---------------------------------------
  CUSTOM JS - Navbar, scroll animations, active section
  (plain JS; smooth scrolling is handled by CSS scroll-behavior)
-----------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Navbar shrink + shadow after scrolling
    const onScroll = () => navbar.classList.toggle('navbar-scrolled', window.scrollY >= 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Close the mobile menu after picking a section
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
            }
        });
    });

    // Highlight the nav link of the section currently in view
    const sections = [...navLinks]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => sectionObserver.observe(s));

    // Fade cards in as they scroll into view (skipped for reduced-motion users)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    revealObserver.unobserve(el);
                    // drop the inline styles afterwards so the CSS hover lift works again
                    setTimeout(() => { el.style.transform = ''; el.style.transition = ''; el.style.opacity = ''; }, 700);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('.menu-thumb, .reviews-thumb, .about-thumb, .contact-info, .exp-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
            revealObserver.observe(el);
        });
    }

    // Keep the footer year current
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});

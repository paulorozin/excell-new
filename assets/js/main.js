/* ============================================================
   EXCELL Engenharia e Tecnologia — Main JavaScript
   ============================================================ */
(function () {
  'use strict';

  // 1. Highlight Active Nav Link
  function highlightActiveNav() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const cleanHref = href.replace(/^\.\.\//, '').replace(/^\//, '');
      const cleanPath = path.replace(/^\//, '');

      if (cleanPath.endsWith(cleanHref) || (cleanPath === '' && cleanHref === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // 2. Mobile Menu Toggle
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Scroll Reveal Animations (IntersectionObserver)
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .blog-card, .process-step, .contact-info-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // 4. Contact Form Handling
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;

      const originalText = btn.textContent;
      btn.textContent = 'Enviando mensagem...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Mensagem Enviada com Sucesso!';
        btn.style.backgroundColor = '#167A3C';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.backgroundColor = '';
        }, 4000);
      }, 1000);
    });
  }

  // Initialize all functions on DOMReady
  document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    initMobileNav();
    initScrollAnimations();
    initContactForm();
  });
})();

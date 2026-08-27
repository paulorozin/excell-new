/* ============================================================
   EXCELL Engenharia e Tecnologia — Main JavaScript
   ============================================================ */
(function () {
  'use strict';

  // 1. Highlight Active Nav Link
  function highlightActiveNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav > a');

    [...navLinks, ...mobileLinks].forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPage = href.split('#')[0].split('/').pop();
      if (targetPage === page || (page === '' && targetPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // 2. Mobile Menu Toggle & Off-Canvas Overlay
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (!hamburger || !mobileNav) return;

    // Create overlay if not present
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-nav-overlay';
      document.body.appendChild(overlay);
    }

    function toggleMenu(open) {
      const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', isOpen);
      overlay.classList.toggle('open', isOpen);
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu(false));

    // Mobile accordions for dropdown titles
    document.querySelectorAll('.mobile-dropdown-title').forEach(title => {
      title.addEventListener('click', () => {
        const items = title.nextElementSibling;
        if (items && items.classList.contains('mobile-dropdown-items')) {
          items.classList.toggle('open');
          const arrow = title.querySelector('span');
          if (arrow) arrow.textContent = items.classList.contains('open') ? '▴' : '▾';
        }
      });
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      if (link.classList.contains('mobile-dropdown-title')) return;
      link.addEventListener('click', () => toggleMenu(false));
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

  // 4. Contact Form Handling (Direct Dispatch via WhatsApp/Email without fake backend)
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = (document.getElementById('nome') || {}).value || '';
      const empresa = (document.getElementById('empresa') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const telefone = (document.getElementById('telefone') || {}).value || '';
      const assuntoSelect = document.getElementById('assunto');
      const assunto = assuntoSelect && assuntoSelect.options[assuntoSelect.selectedIndex] ? assuntoSelect.options[assuntoSelect.selectedIndex].text : '';
      const mensagem = (document.getElementById('mensagem') || {}).value || '';

      if (!nome || !email || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Abrindo atendimento via WhatsApp...';
        btn.disabled = true;

        const text = `Olá! Gostaria de uma avaliação técnica da EXCELL Engenharia.\n\n*Nome:* ${nome}\n*Empresa:* ${empresa || 'Não informada'}\n*E-mail:* ${email}\n*Telefone:* ${telefone}\n*Área:* ${assunto}\n*Mensagem:* ${mensagem}`;
        const whatsappUrl = `https://wa.me/554320181300?text=${encodeURIComponent(text)}`;

        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          btn.textContent = '✓ Redirecionado para o WhatsApp!';
          btn.style.backgroundColor = '#167A3C';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            form.reset();
          }, 3000);
        }, 600);
      }
    });
  }

  // 5. Blog Category Filter
  function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-grid .blog-card');

    if (!filterButtons.length || !blogCards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        blogCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (filter === 'all' || cardCat === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    initMobileNav();
    initScrollAnimations();
    initContactForm();
    initBlogFilters();
  });
})();

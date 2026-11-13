/* ============================================================
   EXCELL Engenharia e Tecnologia — Main JavaScript
   ============================================================ */
(function () {
  'use strict';

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

  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.setAttribute('aria-controls', 'mobile-nav');
    hamburger.setAttribute('aria-haspopup', 'true');

    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-nav-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.tabIndex = -1;
      document.body.appendChild(overlay);
    }

    const getFocusable = () => [...mobileNav.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter(el => el.getClientRects().length > 0 && el.getAttribute('aria-hidden') !== 'true');

    function toggleMenu(open, restoreFocus = true) {
      const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', isOpen);
      overlay.classList.toggle('open', isOpen);
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      overlay.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        const first = getFocusable()[0];
        if (first) first.focus();
      } else if (restoreFocus) {
        hamburger.focus();
      }
    }

    hamburger.addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu(false));

    mobileNav.querySelectorAll('.mobile-dropdown-title').forEach(title => {
      title.setAttribute('role', 'button');
      title.setAttribute('tabindex', '0');
      title.setAttribute('aria-expanded', 'false');

      function toggleAccordion() {
        const items = title.nextElementSibling;
        if (!items || !items.classList.contains('mobile-dropdown-items')) return;
        const isOpen = items.classList.toggle('open');
        title.setAttribute('aria-expanded', String(isOpen));
        const arrow = title.querySelector('span');
        if (arrow) arrow.textContent = isOpen ? '▴' : '▾';
      }

      title.addEventListener('click', toggleAccordion);
      title.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleAccordion();
        }
      });
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false, false));
    });

    document.addEventListener('keydown', event => {
      if (!mobileNav.classList.contains('open')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        toggleMenu(false);
        return;
      }

      if (event.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) {
          event.preventDefault();
          hamburger.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !mobileNav.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    mobileNav.setAttribute('aria-hidden', 'true');
  }

  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
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

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    let status = document.getElementById('contact-form-status');
    if (!status) {
      status = document.createElement('p');
      status.id = 'contact-form-status';
      status.className = 'form-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.hidden = true;
      form.appendChild(status);
    }

    form.addEventListener('submit', event => {
      event.preventDefault();

      const nomeInput = document.getElementById('nome');
      const empresaInput = document.getElementById('empresa');
      const emailInput = document.getElementById('email');
      const telefoneInput = document.getElementById('telefone');
      const assuntoSelect = document.getElementById('assunto');
      const mensagemInput = document.getElementById('mensagem');

      const nome = nomeInput ? nomeInput.value.trim() : '';
      const empresa = empresaInput ? empresaInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const telefone = telefoneInput ? telefoneInput.value.trim() : '';
      const assunto = assuntoSelect && assuntoSelect.value
        ? assuntoSelect.options[assuntoSelect.selectedIndex].text : '';
      const mensagem = mensagemInput ? mensagemInput.value.trim() : '';

      status.hidden = true;
      status.textContent = '';

      const required = [
        [nomeInput, nome], [emailInput, email], [telefoneInput, telefone],
        [assuntoSelect, assunto], [mensagemInput, mensagem]
      ];
      const missing = required.find(([, value]) => !value);
      if (missing) {
        status.textContent = 'Preencha os campos obrigatórios (*) para preparar a mensagem.';
        status.hidden = false;
        if (missing[0]) missing[0].focus();
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = 'Informe um endereço de e-mail válido.';
        status.hidden = false;
        if (emailInput) emailInput.focus();
        return;
      }

      const text = `Olá! Gostaria de uma avaliação técnica da EXCELL Engenharia.\n\n*Nome:* ${nome}\n*Empresa:* ${empresa || 'Não informada'}\n*E-mail:* ${email}\n*Telefone:* ${telefone}\n*Área:* ${assunto}\n*Mensagem:* ${mensagem}`;
      const whatsappUrl = `https://wa.me/554320181300?text=${encodeURIComponent(text)}`;
      const whatsappWindow = window.open(whatsappUrl, '_blank');

      if (!whatsappWindow) {
        status.textContent = 'O navegador bloqueou a abertura automática. Use o link abaixo para continuar; os dados preenchidos foram mantidos.';
        const link = document.createElement('a');
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Abrir mensagem no WhatsApp';
        link.className = 'btn-ghost';
        status.appendChild(document.createElement('br'));
        status.appendChild(link);
        status.hidden = false;
        return;
      }

      whatsappWindow.opener = null;
      status.textContent = 'A mensagem foi preparada no WhatsApp. Confira os dados e envie quando estiver pronto.';
      status.hidden = false;
    });
  }

  function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-grid .blog-card');
    if (!filterButtons.length || !blogCards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterButtons.forEach(button => {
          button.classList.remove('active');
          button.setAttribute('aria-pressed', 'false');
          button.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-selected', 'true');

        blogCards.forEach(card => {
          const matches = filter === 'all' || card.getAttribute('data-category') === filter;
          if (matches) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    initMobileNav();
    initScrollAnimations();
    initContactForm();
    initBlogFilters();
  });
})();

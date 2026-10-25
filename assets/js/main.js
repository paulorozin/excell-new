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
        ? assuntoSelect.options[assuntoSelect.selectedIndex].text
        : '';
      const mensagem = mensagemInput ? mensagemInput.value.trim() : '';

      if (!nome || !email || !telefone || !assunto || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios (*), incluindo a área de interesse.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Informe um endereço de e-mail válido.');
        if (emailInput) emailInput.focus();
        return;
      }

      const text = `Olá! Gostaria de uma avaliação técnica da EXCELL Engenharia.\n\n*Nome:* ${nome}\n*Empresa:* ${empresa || 'Não informada'}\n*E-mail:* ${email}\n*Telefone:* ${telefone}\n*Área:* ${assunto}\n*Mensagem:* ${mensagem}`;
      const whatsappUrl = `https://wa.me/554320181300?text=${encodeURIComponent(text)}`;

      // Abrir diretamente no evento de envio reduz o risco de bloqueio de pop-up.
      const whatsappWindow = window.open(whatsappUrl, '_blank');
      if (!whatsappWindow) {
        alert('O navegador bloqueou a abertura do WhatsApp. Permita pop-ups e tente novamente. Os dados foram mantidos no formulário.');
        return;
      }
      whatsappWindow.opener = null;

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Mensagem preparada para o WhatsApp';
        btn.disabled = true;
        // Mantém os dados no formulário para o caso de a nova aba não abrir.
        window.setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2500);
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
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-selected', 'true');

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

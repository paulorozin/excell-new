/* ============================================================
   EXCELL Engenharia e Tecnologia — Main JavaScript
   main.js · Version 1.0
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     1. Header & Navigation
  -------------------------------------------------------- */
  function initHeader() {
    const headerHTML = `
    <header id="site-header">
      <div class="container header-inner">
        <a href="/index.html" aria-label="EXCELL Engenharia">
          <img class="site-logo" src="/assets/images/logo.svg" alt="EXCELL Engenharia e Tecnologia" />
        </a>
        <nav class="site-nav" aria-label="Navegação principal">
          <a href="/index.html" class="nav-link">Home</a>
          <a href="/sobre.html" class="nav-link">A EXCELL</a>
          <a href="/telecomunicacoes.html" class="nav-link">Telecomunicações</a>
          <a href="/pericias.html" class="nav-link">Perícias</a>
          <a href="/assistente-tecnico.html" class="nav-link">Assistente Técnico</a>
          <a href="/laudos.html" class="nav-link">Laudos</a>
          <a href="/blog.html" class="nav-link">Blog</a>
          <a href="/contato.html" class="nav-cta">Fale com um Engenheiro</a>
        </nav>
        <button class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Menu mobile">
      <a href="/index.html">Home</a>
      <a href="/sobre.html">A EXCELL</a>
      <a href="/telecomunicacoes.html">Telecomunicações</a>
      <a href="/pericias.html">Perícias de Engenharia</a>
      <a href="/assistente-tecnico.html">Assistente Técnico</a>
      <a href="/laudos.html">Laudos Técnicos</a>
      <a href="/blog.html">Blog</a>
      <a href="/contato.html" class="mobile-cta">Fale com um Engenheiro</a>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Highlight active page
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && path.endsWith(href.replace(/^\//, ''))) {
        link.classList.add('active');
      }
      if (path === '/' && href === '/index.html') link.classList.add('active');
    });

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------
     2. Footer
  -------------------------------------------------------- */
  function initFooter() {
    const footerHTML = `
    <footer id="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img class="site-logo" src="/assets/images/logo-white.svg" alt="EXCELL Engenharia e Tecnologia" />
            <p>Engenharia de telecomunicações, perícias judiciais e laudos técnicos com rigor metodológico e responsabilidade técnica.</p>
            <div class="social-links">
              <a href="https://www.instagram.com/excell_engenharia" target="_blank" rel="noopener" class="social-link" aria-label="Instagram EXCELL">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://wa.me/554320181300" target="_blank" rel="noopener" class="social-link" aria-label="WhatsApp EXCELL">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Serviços</h5>
            <a href="/telecomunicacoes.html">Telecomunicações</a>
            <a href="/pericias.html">Perícias de Engenharia</a>
            <a href="/assistente-tecnico.html">Assistente Técnico</a>
            <a href="/laudos.html">Laudos Técnicos</a>
          </div>
          <div class="footer-col">
            <h5>Empresa</h5>
            <a href="/sobre.html">A EXCELL</a>
            <a href="/blog.html">Blog</a>
            <a href="/contato.html">Contato</a>
          </div>
          <div class="footer-col">
            <h5>Contato</h5>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 9.79a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
              <span>(43) 2018-1300</span>
            </div>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>contato@excellengenharia.com.br</span>
            </div>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Londrina, PR — Brasil</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} EXCELL Engenharia e Tecnologia. Todos os direitos reservados.</span>
          <span>CNPJ: [PLACEHOLDER]</span>
        </div>
      </div>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  /* --------------------------------------------------------
     3. Scroll animations (IntersectionObserver)
  -------------------------------------------------------- */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe animatable elements
    document.querySelectorAll('.service-card, .blog-card, .mission-card, .method-step, .feature-item, .stat-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------
     4. Blog filter functionality
  -------------------------------------------------------- */
  function initBlogFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        blogCards.forEach(card => {
          if (filter === 'all' || card.dataset.cat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------
     5. Contact form
  -------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        btn.textContent = '✓ Mensagem enviada!';
        btn.style.background = '#167A3C';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
        }, 4000);
      }, 1200);
    });
  }

  /* --------------------------------------------------------
     6. Init all
  -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initFooter();
    initScrollAnimations();
    initBlogFilter();
    initContactForm();
  });

})();

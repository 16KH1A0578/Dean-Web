/* Roluxa — interactivity */
(function () {
  'use strict';

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ============================================================
  // Welcome language picker — shows once per visitor
  // ============================================================
  (function setupLangModal() {
    const LANG_KEY = 'roluxa_lang_chosen';
    const modal = document.getElementById('langModal');
    if (!modal) return;

    // If user has already chosen a language, never show again
    let alreadyChosen = false;
    try { alreadyChosen = !!localStorage.getItem(LANG_KEY); } catch (e) { /* private mode */ }
    if (alreadyChosen) return;

    // Show modal
    modal.hidden = false;
    document.body.classList.add('lang-modal-open');

    // Helper to dismiss
    const dismiss = (chosen) => {
      try { localStorage.setItem(LANG_KEY, chosen || 'en'); } catch (e) { /* ignore */ }
      modal.hidden = true;
      document.body.classList.remove('lang-modal-open');
    };

    // Language button clicks — save choice then let the link navigate
    modal.querySelectorAll('.lang-modal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        try { localStorage.setItem(LANG_KEY, btn.dataset.lang); } catch (e) {}
        // Allow default <a> navigation to happen
      });
    });

    // Close (X) button — saves "en" as default and stays on page
    const closeBtn = document.getElementById('langModalClose');
    if (closeBtn) closeBtn.addEventListener('click', () => dismiss('en'));

    // Click backdrop to dismiss
    const backdrop = document.getElementById('langModalBackdrop');
    if (backdrop) backdrop.addEventListener('click', () => dismiss('en'));

    // ESC key to dismiss
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) dismiss('en');
    });
  })();

  // Language switcher dropdown
  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    const btn = langSwitch.querySelector('.lang-current');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langSwitch.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', () => {
      langSwitch.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Mobile nav
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('navList');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header shadow on scroll
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.section, .service-card, .area-card, .testimonial, .process-list li, .trust-item');
  revealEls.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // Contact form: Formspree-style submit with status
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', async (e) => {
      // If the action URL still has the placeholder, prevent submit and instruct user
      if (form.action.includes('YOUR_FORMSPREE_ID')) {
        e.preventDefault();
        if (statusEl) {
          statusEl.className = 'form-status error';
          statusEl.textContent = 'Form not yet connected. Please email modula3@hotmail.com or call +44 7980 296602.';
        }
        return;
      }
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      try {
        statusEl.className = 'form-status';
        statusEl.textContent = 'Sending…';
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          statusEl.className = 'form-status success';
          statusEl.textContent = 'Thank you — your enquiry has been received. We\'ll be in touch within one working day.';
        } else {
          const json = await res.json().catch(() => ({}));
          statusEl.className = 'form-status error';
          statusEl.textContent = (json.errors && json.errors[0] && json.errors[0].message) || 'Sorry, something went wrong. Please email us directly.';
        }
      } catch (err) {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Network error. Please try again or email modula3@hotmail.com.';
      }
    });
  }
})();

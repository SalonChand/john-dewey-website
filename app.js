document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initDarkMode();
  initNavigation();
  initScrollEffects();
  initCounters();
  initFAQ();
  initBackToTop();
  initNewsTicker();
  initSmoothReveal();
  initGalleryFilter();
  initLightbox();
  initContactForm();
});

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  const hide = () => preloader.classList.add('hidden');
  window.addEventListener('load', () => setTimeout(hide, 1100));
  setTimeout(hide, 2600);
}

function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;
  if (localStorage.getItem('jd-darkmode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('jd-darkmode', document.body.classList.contains('dark-mode'));
  });
}

function initNavigation() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const overlay = document.getElementById('navOverlay');
  if (!toggle || !menu) return;

  const preventTouch = (e) => {
    if (!menu.contains(e.target)) {
      e.preventDefault();
    }
  };

  const lockScroll = () => {
    document.addEventListener('touchmove', preventTouch, { passive: false });
  };

  const unlockScroll = () => {
    document.removeEventListener('touchmove', preventTouch, { passive: false });
  };

  const close = () => {
    if (!menu.classList.contains('active')) return;
    toggle.classList.remove('active');
    menu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    unlockScroll();
  };

  const open = () => {
    toggle.classList.add('active');
    menu.classList.add('active');
    if (overlay) overlay.classList.add('active');
    lockScroll();
    menu.scrollTop = 0;
  };

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('active')) close();
    else open();
  });

  if (overlay) overlay.addEventListener('click', close);

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) close();
    });
  });
}

function initScrollEffects() {
  const header = document.getElementById('header');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children').forEach(el => {
    observer.observe(el);
  });

  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function initCounters() {
  const counters = document.querySelectorAll('.counter-animated');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      animateCounter(el, target, 1600);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(element, end, duration) {
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(eased * end) + '+';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;
  questions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        const a = faq.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();
}

function initNewsTicker() {
  const ticker = document.querySelector('.news-ticker-content');
  if (!ticker) return;
  ticker.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ticker.innerHTML;
}

function initSmoothReveal() {
  document.querySelectorAll('.programs-grid, .feature-grid, .testimonials-grid, .stats-grid, .subjects-grid, .co-curricular-grid, .mv-grid')
    .forEach(grid => grid.classList.add('stagger-children'));
}

function initGalleryFilter() {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('.filter-btn');
    const items = group.querySelectorAll('[data-category]');
    if (!buttons.length || !items.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        items.forEach(item => {
          const show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const content = lightbox.querySelector('.lightbox-content');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-grid .gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      if (content) content.src = img.src;
      if (caption) caption.textContent = img.alt || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (status) {
      status.textContent = 'Thank you. Your message has been recorded and we will reply shortly.';
      status.style.display = 'block';
    }
    form.reset();
  });
}

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const targetId = anchor.getAttribute('href');
  if (!targetId || targetId === '#') return;
  const target = document.querySelector(targetId);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

function jdRead(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
}

function jdEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

function hydrateContent() {
  hydrateScrapbook();
  hydrateGallery();
  hydrateTestimonials();
  hydrateNotices();
}

function hydrateScrapbook() {
  var grid = document.querySelector('.scrapbook-grid');
  if (!grid) return;
  var data = jdRead('jd-content-scrapbook');
  if (!data.length) return;
  grid.innerHTML = data.map(function (s) {
    var cta;
    if (s.html) {
      cta = '<a href="project.html?id=' + encodeURIComponent(s.id) + '" class="btn btn-outline btn-sm" style="margin-top:1rem;">View Webpage</a>';
    } else if (s.link) {
      cta = '<a href="' + jdEsc(s.link) + '" class="btn btn-outline btn-sm" target="_blank" rel="noopener" style="margin-top:1rem;">View Live Demo</a>';
    } else {
      cta = '<a href="events.html" class="read-more">See more</a>';
    }
    return '<article class="scrapbook-card fade-in visible" data-category="' + jdEsc(s.cat) + '">' +
      '<div class="scrapbook-card-image"><img src="' + jdEsc(s.img) + '" alt="' + jdEsc(s.title) + '" loading="lazy"><div class="scrapbook-card-date">' + jdEsc(s.label) + '</div></div>' +
      '<div class="scrapbook-card-body"><div class="scrapbook-meta">' + jdEsc(s.by) + ' &middot; ' + jdEsc(s.date) + '</div>' +
      '<h3>' + jdEsc(s.title) + '</h3><p>' + jdEsc(s.desc) + '</p>' + cta + '</div></article>';
  }).join('');
  initGalleryFilter();
}

function hydrateGallery() {
  var grid = document.querySelector('.gallery-grid');
  if (!grid) return;
  var data = jdRead('jd-content-gallery');
  if (!data.length) return;
  grid.innerHTML = data.map(function (g) {
    return '<div class="gallery-item fade-in visible" data-category="' + jdEsc(g.cat) + '"><img src="' + jdEsc(g.img) + '" alt="' + jdEsc(g.cap) + '" loading="lazy"><div class="gallery-overlay"><h4>' + jdEsc(g.cap) + '</h4></div></div>';
  }).join('');
  initGalleryFilter();
  initLightbox();
}

function hydrateTestimonials() {
  var grid = document.querySelector('.testimonials-grid');
  if (!grid) return;
  var data = jdRead('jd-content-testimonials');
  if (!data.length) return;
  grid.innerHTML = data.map(function (t) {
    return '<div class="testimonial-card fade-in visible"><p>' + jdEsc(t.quote) + '</p>' +
      '<div class="testimonial-author"><div class="testimonial-avatar">' + jdEsc(t.initials) + '</div>' +
      '<div class="testimonial-author-info"><h5>' + jdEsc(t.name) + '</h5><span>' + jdEsc(t.role) + '</span></div></div></div>';
  }).join('');
}

function hydrateNotices() {
  var panel = document.querySelector('.notice-panel');
  if (!panel) return;
  var data = jdRead('jd-content-notices');
  if (!data.length) return;
  var header = panel.querySelector('.notice-panel-header');
  var headerHtml = header ? header.outerHTML : '';
  panel.innerHTML = headerHtml + data.map(function (n) {
    return '<div class="notice-item"><div class="notice-date">' + jdEsc(n.date) + '</div><div class="notice-text">' + jdEsc(n.text) + '</div></div>';
  }).join('');
}

hydrateContent();

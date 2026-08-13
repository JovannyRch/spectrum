(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-list');

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 30);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      body.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.carousel-dot')];
  let active = 0;
  let timer;
  const showSlide = (index) => {
    if (!slides.length) return;
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === active);
      slide.setAttribute('aria-hidden', String(i !== active));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === active);
      dot.setAttribute('aria-current', String(i === active));
    });
  };
  const restart = () => {
    clearInterval(timer);
    if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => showSlide(active + 1), 6500);
    }
  };
  document.querySelector('.carousel-control.prev')?.addEventListener('click', () => { showSlide(active - 1); restart(); });
  document.querySelector('.carousel-control.next')?.addEventListener('click', () => { showSlide(active + 1); restart(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); restart(); }));
  showSlide(0);
  restart();

  const modal = document.querySelector('.video-modal');
  const frame = modal?.querySelector('.video-frame');
  const closeButton = modal?.querySelector('.modal-close');
  const closeModal = () => {
    if (!modal || !frame) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    frame.replaceChildren();
    body.classList.remove('modal-open');
  };
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-vimeo], [data-youtube]');
    if (!trigger || !modal || !frame) return;
    event.preventDefault();
    const vimeoId = trigger.dataset.vimeo;
    const youtubeId = trigger.dataset.youtube;
    if (vimeoId && !/^\d+$/.test(vimeoId)) return;
    if (youtubeId && !/^[\w-]{11}$/.test(youtubeId)) return;
    if (!vimeoId && !youtubeId) return;
    const iframe = document.createElement('iframe');
    iframe.src = vimeoId
      ? `https://player.vimeo.com/video/${vimeoId}?app_id=122963&autoplay=1&title=0&byline=0&portrait=0`
      : `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
    iframe.title = trigger.dataset.title || 'Spectrum Films video';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    frame.append(iframe);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    closeButton?.focus();
  });
  closeButton?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      body.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
    if (slides.length && event.key === 'ArrowLeft') { showSlide(active - 1); restart(); }
    if (slides.length && event.key === 'ArrowRight') { showSlide(active + 1); restart(); }
  });
})();

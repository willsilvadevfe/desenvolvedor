// =========================================================
// SATTVA STUDIO — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- AOS ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: estado ao rolar ---------- */
  const header = document.getElementById('siteHeader');
  const toggleHeader = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });

  /* ---------- Menu hamburguer (mobile) ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');

  const closeNav = () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openNav = () => {
    hamburger.classList.add('active');
    nav.classList.add('active');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  hamburger.addEventListener('click', () => {
    nav.classList.contains('active') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });


});
/* FLHL — Sidebar + Theme JS */
(function () {
  'use strict';

  var nav = document.getElementById('mainNav');
  var overlay = document.getElementById('navOverlay');
  var ham = document.getElementById('hamburgerBtn');
  var closeBtn = document.getElementById('navCloseBtn');
  var themeBtns = document.querySelectorAll('.theme-btn, .theme-btn-mobile');

  function openNav() {
    if (!nav || !overlay) return;
    nav.classList.add('open');
    overlay.classList.add('open');
    if (overlay) overlay.removeAttribute('aria-hidden');
    if (ham) ham.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!nav || !overlay) return;
    nav.classList.remove('open');
    overlay.classList.remove('open');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
    if (ham) ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (ham) ham.focus();
  }

  function toggleNav() {
    nav.classList.contains('open') ? closeNav() : openNav();
  }

  function toggleTheme() {
    var t = document.documentElement.getAttribute('data-theme');
    var n = t === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('theme', n);
  }

  if (ham) ham.addEventListener('click', toggleNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);

  for (var i = 0; i < themeBtns.length; i++) {
    themeBtns[i].addEventListener('click', function (e) {
      e.stopPropagation();
      toggleTheme();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) closeNav();
  });

  if (nav) {
    nav.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        var focusable = nav.querySelectorAll('a, button, [tabindex]');
        if (focusable.length === 0) return;
        var fi = Array.prototype.indexOf.call(focusable, document.activeElement);
        if (e.shiftKey && fi === 0) {
          e.preventDefault();
          focusable[focusable.length - 1].focus();
        } else if (!e.shiftKey && fi === focusable.length - 1) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    });
  }
})();

/* Cumbre Andina — interacciones mínimas */
(function () {
  'use strict';

  // -----------------------------------------------------------------------
  // 1) Año dinámico en el footer
  // -----------------------------------------------------------------------
  var anio = document.getElementById('anio');
  if (anio) { anio.textContent = String(new Date().getFullYear()); }

  // -----------------------------------------------------------------------
  // 2) Menú móvil
  // -----------------------------------------------------------------------
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu-movil');

  function cerrarMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.hidden = true;
  }
  function abrirMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    // forzar reflow para que la transición funcione si la agregamos
    requestAnimationFrame(function () { menu.classList.add('is-open'); });
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var abierto = toggle.getAttribute('aria-expanded') === 'true';
      if (abierto) cerrarMenu(); else abrirMenu();
    });
    // cerrar al elegir un enlace
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', cerrarMenu);
    });
    // cerrar al pasar a viewport ancho
    var mq = window.matchMedia('(min-width: 981px)');
    var onChange = function () { if (mq.matches) cerrarMenu(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
  }

  // -----------------------------------------------------------------------
  // 3) Scroll-spy en la navegación de escritorio
  // -----------------------------------------------------------------------
  var enlacesNav = Array.from(document.querySelectorAll('.nav__links a'));
  if (enlacesNav.length) {
    var secciones = enlacesNav
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          enlacesNav.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    secciones.forEach(function (sec) { spyObserver.observe(sec); });
  }

  // -----------------------------------------------------------------------
  // 4) Revelado al hacer scroll (clases .reveal)
  // -----------------------------------------------------------------------
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revelables = document.querySelectorAll(
    '.rutas .seccion__head, .ruta, .filosofia__foto, .filosofia__texto, .cifras__grid, .cita__inner'
  );
  revelables.forEach(function (el) { el.classList.add('reveal'); });

  if (prefersReducedMotion) {
    revelables.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revelables.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revelables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // -----------------------------------------------------------------------
  // 5) Conteo animado de cifras
  // -----------------------------------------------------------------------
  var contadores = document.querySelectorAll('.cifras__grid strong[data-count]');
  if (contadores.length && 'IntersectionObserver' in window) {
    var contObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var destino = parseInt(el.getAttribute('data-count'), 10) || 0;

        if (prefersReducedMotion) {
          el.textContent = formatear(destino);
          obs.unobserve(el);
          return;
        }

        var inicio = performance.now();
        var duracion = 1400;
        function paso(t) {
          var p = Math.min(1, (t - inicio) / duracion);
          // ease-out cúbico
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = formatear(Math.round(destino * e));
          if (p < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });

    contadores.forEach(function (el) { contObserver.observe(el); });
  }

  function formatear(n) {
    // separador de miles con espacio fino (estilo editorial europeo)
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
})();

/* Animação de fundo do topo: injeta o SVG atrás do conteúdo, liga a neuroplasticidade
   (mouse sobre os neurônios ou toque neles) e pausa a animação fora da tela */
(function () {
  var stage = document.querySelector('.hero .ab-stage');
  if (!stage) return;
  var hero = stage.parentNode;
  var mq = window.matchMedia ? window.matchMedia('(max-width: 900px)') : null;
  var hit = null;

  function overNeurons(e) {
    if (!hit) return false;
    if (e.target.closest && e.target.closest('a,button,input,select,textarea,label,.mission')) return false;
    var r = hit.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  }

  fetch(stage.getAttribute('data-src'))
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (txt) {
      stage.innerHTML = txt.replace(/^\s*<\?xml[^>]*>\s*/, '');
      var svg = stage.querySelector('svg');
      if (!svg) return;
      function fit() {
        if (mq && mq.matches) { svg.setAttribute('viewBox', '290 0 480 900'); svg.setAttribute('preserveAspectRatio', 'xMidYMin slice'); }
        else { svg.setAttribute('viewBox', '0 0 1280 720'); svg.setAttribute('preserveAspectRatio', 'xMidYMid slice'); }
      }
      fit();
      if (mq) { if (mq.addEventListener) mq.addEventListener('change', fit); else if (mq.addListener) mq.addListener(fit); }
      hit = svg.querySelector('.ab-hit');
      hero.addEventListener('mousemove', function (e) {
        var on = overNeurons(e);
        stage.classList.toggle('hover', on);
        hero.classList.toggle('ab-hot', on);
      });
      hero.addEventListener('mouseleave', function () { stage.classList.remove('hover'); hero.classList.remove('ab-hot'); });
      hero.addEventListener('click', function (e) { if (overNeurons(e)) stage.classList.toggle('pinned'); });
      requestAnimationFrame(function () { stage.classList.add('ready'); });
    })
    .catch(function () { /* sem o SVG, o topo fica exatamente como antes */ });

  var visible = true;
  function pause() { stage.classList.toggle('paused', !visible || document.hidden); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; pause(); }).observe(hero);
  }
  document.addEventListener('visibilitychange', pause);
})();

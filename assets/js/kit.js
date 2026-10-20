/* Gerado por build.mjs. Não editar aqui: editar src/client/kit.js. */
/* Quizzes comentados das áreas (kits). Lê as questões do JSON #kitData e troca a versão estática pela interativa.
   XP: acerto vale o "xp" do quiz (só na primeira tentativa); concluir vale 50; gabaritar dá medalha. */
(function () {
  "use strict";
  var P = window.PDR; if (!P) return;
  var S = P.S, esc = P.esc, L = "ABCD";
  var el = document.getElementById("kitData"); if (!el) return;
  var DATA; try { DATA = JSON.parse(el.textContent); } catch (e) { return; }
  if (!S.kq) S.kq = {};

  function st(id) { if (!S.kq[id]) S.kq[id] = { ans: {}, retry: false, done: false }; return S.kq[id]; }

  function render(z) {
    var box = document.querySelector('[data-kitquiz="' + z.id + '"]'); if (!box) return;
    var s = st(z.id), ok = 0, n = 0, N = z.qs.length;
    var html = z.qs.map(function (q, i) {
      var a = s.ans[i]; if (a !== undefined) { n++; if (a === q.a) ok++; }
      var opts = q.o.map(function (o, j) {
        var cls = ""; if (a !== undefined) { if (j === q.a) cls = "right"; else if (j === a) cls = "wrong"; }
        return '<button type="button" data-i="' + i + '" data-o="' + j + '" class="' + cls + '"' + (a !== undefined ? " disabled" : "") + "><b>" + L[j] + "</b> " + esc(o) + "</button>";
      }).join("");
      var ex = a !== undefined ? '<p class="expl"><b>' + (a === q.a ? "Isso aí. " : "Resposta certa: " + L[q.a] + ". ") + "</b>" + esc(q.e) + ' <span class="src">Fonte: ' + esc(q.f) + ".</span></p>" : "";
      return '<div class="q" id="' + z.id + "-" + (i + 1) + '"><span class="num">Questão ' + (i + 1) + " de " + N + " · " + esc(q.tema) + "</span><h4>" + esc(q.q) + '</h4><div class="opts">' + opts + "</div>" + ex + "</div>";
    }).join("");
    if (n === N) {
      var perfect = ok === N;
      html += '<div class="quiz-end"><div style="flex:1;min-width:200px"><h3>' + ok + " de " + N + " acertos</h3><p>" +
        (perfect ? "Gabaritou! Medalha " + esc(z.badge) + " conquistada." : "Releia os comentários e tente de novo. O XP de cada acerto vale só na primeira tentativa.") +
        '</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-ghost btn-sm on-dark" href="#pdf">Baixar o resumo em PDF</a><button class="btn btn-sun btn-sm" type="button" data-retry="' + z.id + '">Refazer</button></div></div>';
    }
    box.innerHTML = html;
    var chip = document.querySelector('[data-score="' + z.id + '"]');
    if (chip) chip.textContent = n ? ok + " de " + N + " certas" : N + " questões";
  }

  function answer(z, i, j) {
    var s = st(z.id); if (s.ans[i] !== undefined) return;
    s.ans[i] = j; P.save();
    if (j === z.qs[i].a && !s.retry) P.award(z.xp, "Resposta certa");
    if (Object.keys(s.ans).length === z.qs.length) {
      var ok = z.qs.filter(function (q, k) { return s.ans[k] === q.a; }).length;
      if (!s.done) { s.done = true; P.award(50, "Quiz concluído: " + z.titulo); }
      if (ok === z.qs.length) P.badge(z.id, z.badge);
    }
    P.changed(); render(z);
  }

  DATA.quizzes.forEach(function (z) {
    var box = document.querySelector('[data-kitquiz="' + z.id + '"]'); if (!box) return;
    box.addEventListener("click", function (e) {
      var r = e.target.closest("[data-retry]");
      if (r) { var s = st(z.id); s.ans = {}; s.retry = true; P.save(); render(z); box.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      var b = e.target.closest("button[data-i]"); if (!b) return;
      answer(z, +b.getAttribute("data-i"), +b.getAttribute("data-o"));
    });
    render(z);
  });
})();

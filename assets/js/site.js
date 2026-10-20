/* Comum a todas as páginas: XP guardado no navegador, avisos (toasts) e formulários. */
(function () {
  "use strict";
  var KEY = "pdr-site-v1";
  var LEVELS = [{ n: "Calouro", min: 0 }, { n: "Monitor", min: 300 }, { n: "Interno", min: 800 }, { n: "Residente", min: 1500 }, { n: "Especialista", min: 3000 }];
  var BADGES = { founder: "Aluno fundador", zoom: "Do corpo à molécula", explorer: "Explorador do néfron", adh: "Mestre do ADH", quiz: "Néfron desvendado", "rim-anatomia": "Anatomista do rim", "rim-histologia": "Olho de microscópio", "rim-vasos": "Caminho do sangue", "rim-origem": "Do embrião ao rim", "cardio-medio": "Coração no ritmo", "cardio-superior": "Mestre do débito cardíaco", "resp-medio": "Fôlego de estudante", "resp-superior": "Mestre da hematose", "renal-medio": "Primeiro néfron", "renal-superior": "Filtro afinado" };
  var DEF = { xp: 0, badges: [], level: "medio", waitlist: false, newsletter: false, stSeen: [], read: {}, seen: [], quiz: {}, quizRetry: false, kq: {}, materiais: [], adhTouched: false, adhMin: false, adhMax: false, adhMol: false, lessonDone: false, nudged: false };
  var SITE = window.SITE || { preview: true, forms: {}, urls: {} };

  function load() {
    var s = JSON.parse(JSON.stringify(DEF));
    try { var r = localStorage.getItem(KEY); if (r) Object.assign(s, JSON.parse(r)); } catch (e) {}
    return s;
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lvlOf(xp) { var i = 0; LEVELS.forEach(function (l, k) { if (xp >= l.min) i = k; }); return i; }
  var listeners = [];

  function toast(amt, msg, action) {
    var box = $("toasts"); if (!box) return;
    var t = document.createElement("div"); t.className = "toast";
    t.innerHTML = (amt ? '<span class="amt">+' + amt + " XP</span>" : "") + "<span>" + esc(msg) + "</span>";
    if (action) { var a = document.createElement("a"); a.href = action.href; a.textContent = action.label; a.style.cssText = "color:var(--sun);font-weight:700;white-space:nowrap"; t.appendChild(a); }
    box.appendChild(t); while (box.children.length > 3) box.removeChild(box.firstChild);
    setTimeout(function () { t.style.transition = "opacity .4s"; t.style.opacity = "0"; setTimeout(function () { t.remove(); }, 400); }, action ? 6500 : 3200);
  }
  function renderPill() {
    var i = lvlOf(S.xp);
    if ($("pillLvl")) $("pillLvl").textContent = LEVELS[i].n;
    if ($("pillXp")) $("pillXp").textContent = S.xp.toLocaleString("pt-BR") + " XP";
  }
  function changed() { save(); renderPill(); listeners.forEach(function (f) { try { f(S); } catch (e) {} }); }
  function award(amt, msg) {
    var before = lvlOf(S.xp); S.xp += amt; changed(); toast(amt, msg);
    var after = lvlOf(S.xp); if (after > before) setTimeout(function () { toast(0, "Novo nível: " + LEVELS[after].n + "!"); }, 500);
    if (!S.nudged && !S.waitlist) { S.nudged = true; save(); setTimeout(function () { toast(0, "Seu XP fica guardado neste navegador.", { label: "Lista de espera", href: SITE.urls.lista }); }, 900); }
  }
  function badge(id, name) {
    if (S.badges.indexOf(id) >= 0) return;
    S.badges.push(id); S.xp += 40; changed();
    setTimeout(function () { toast(40, "Medalha: " + (name || BADGES[id] || id)); }, 350);
  }

  window.PDR = { S: S, save: save, changed: changed, award: award, badge: badge, toast: toast, esc: esc, onChange: function (f) { listeners.push(f); }, site: SITE };

  /* Pílula de XP no cabeçalho */
  renderPill();
  var pill = $("xpPill");
  if (pill) pill.addEventListener("click", function () {
    var i = lvlOf(S.xp), nx = LEVELS[i + 1];
    toast(0, "Nível " + LEVELS[i].n + ", " + S.xp + " XP" + (nx ? ". Faltam " + (nx.min - S.xp) + " XP para " + nx.n + "." : ".") + " O progresso fica guardado neste navegador.");
  });

  /* Formulários: lista de espera e newsletter */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  document.querySelectorAll("form[data-form]").forEach(function (f) {
    var kind = f.getAttribute("data-form");
    var box = f.parentElement, ok = box.querySelector("[data-ok]"), err = f.querySelector("[data-err]");
    var endpoint = (SITE.forms || {})[kind === "lista" ? "listaDeEspera" : kind === "material" ? "materiais" : "newsletter"] || "";
    var matIn = f.querySelector("input[name=material]"), mat = matIn ? matIn.value : "";
    // Site publicado sem ferramenta de e-mail ligada: não finge que enviou; mostra o aviso "em breve" (e, no PDF, o download direto).
    var soon = box.querySelector("[data-soon]");
    if (!endpoint && !SITE.preview && soon) { f.hidden = true; soon.hidden = false; return; }
    if (kind === "lista" && S.waitlist) { f.hidden = true; ok.hidden = false; }
    if (kind === "material" && (S.materiais || []).indexOf(mat) >= 0) { f.hidden = true; ok.hidden = false; }
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(f), msg = "";
      if (fd.get("site")) return; // armadilha para robôs
      var nome = fd.get("nome"), email = String(fd.get("email") || "").trim(), nivel = fd.get("nivel");
      if (nome !== null && !String(nome).trim()) msg = "Escreva o seu nome.";
      else if (!validEmail(email)) msg = "Confira o e-mail: parece incompleto.";
      else if (nivel !== null && !nivel) msg = "Escolha o seu nível de estudo.";
      else if (!fd.get("consentimento")) msg = "Para continuar, marque a caixa de aceite da política de privacidade.";
      if (msg) { err.textContent = msg; err.hidden = false; return; }
      err.hidden = true;
      var btn = f.querySelector("button[type=submit]"); btn.disabled = true; var label = btn.textContent; btn.textContent = "Enviando…";
      function done() {
        if (kind === "lista") { S.waitlist = true; if (fd.get("newsletter")) S.newsletter = true; changed(); badge("founder"); }
        else if (kind === "material") { S.materiais = (S.materiais || []).concat([mat]); if (fd.get("newsletter")) S.newsletter = true; changed(); }
        else { S.newsletter = true; changed(); }
        f.hidden = true; ok.hidden = false;
        var note = ok.querySelector("[data-preview-note]"); if (note) note.hidden = !!endpoint;
      }
      if (!endpoint) { setTimeout(done, 400); return; }
      fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
        .catch(function () { err.textContent = "Não foi possível enviar agora. Confira a conexão e tente de novo."; err.hidden = false; btn.disabled = false; btn.textContent = label; });
    });
  });
})();

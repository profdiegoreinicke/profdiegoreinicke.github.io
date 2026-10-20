/* Gerado por build.mjs. Não editar aqui: editar src/client/nefron.js. */
(function(){"use strict";
var SEGS=[{"id":"glom","short":"Glomérulo","name":"Glomérulo e cápsula de Bowman","stat":"≈ 125","unit":"mL/min de filtração (TFG), cerca de 180 L/dia","rows":[["Função","Filtrar o plasma. Cerca de 20% do plasma que chega ao rim é filtrado."],["Passa","Água, Na⁺, K⁺, Cl⁻, glicose, aminoácidos, ureia."],["Fica","Células do sangue e proteínas grandes, como a albumina."],["Barreira","Endotélio fenestrado, membrana basal e podócitos."],["Clínica","Proteína na urina (proteinúria) indica lesão dessa barreira."]]},{"id":"tcp","short":"TCP","name":"Túbulo contorcido proximal","stat":"≈ 65%","unit":"do Na⁺ e da água filtrados são reabsorvidos aqui","rows":[["Reabsorve","Quase 100% da glicose e dos aminoácidos, cerca de 80% do HCO₃⁻."],["Transportadores","SGLT2 (Na⁺-glicose), NHE3 (Na⁺/H⁺), aquaporina-1; Na⁺/K⁺-ATPase na membrana basolateral."],["Líquido","Sai isosmótico ao plasma (≈ 300 mOsm/kg)."],["Secreta","Ácidos e bases orgânicos, incluindo vários fármacos."],["Fármacos","Inibidores de SGLT2 (glicosúria); acetazolamida (anidrase carbônica)."]]},{"id":"desc","short":"Descendente","name":"Ramo descendente fino da alça de Henle","stat":"≈ 15%","unit":"da água filtrada sai neste segmento","rows":[["Permeável","À água, pela aquaporina-1. Pouco permeável a solutos."],["O que acontece","A água sai para o interstício medular hiperosmótico e o líquido tubular se concentra."],["Na curva","Nos néfrons justamedulares o líquido chega perto de 1200 mOsm/kg."],["Por que importa","É metade do sistema contracorrente que permite urina concentrada."]]},{"id":"asc","short":"Ascendente","name":"Ramo ascendente da alça de Henle","stat":"≈ 25%","unit":"do Na⁺ filtrado é reabsorvido no segmento espesso","rows":[["Impermeável","À água. Por isso é chamado de segmento diluidor."],["Transportador","NKCC2 (Na⁺-K⁺-2Cl⁻) na porção espessa."],["Líquido","Sai hipo-osmótico (≈ 100 mOsm/kg) e o NaCl reabsorvido monta o gradiente medular."],["Também","Reabsorve Ca²⁺ e Mg²⁺ pela via paracelular."],["Fármaco","Furosemida, o diurético de alça, bloqueia o NKCC2."]]},{"id":"tcd","short":"TCD","name":"Túbulo contorcido distal","stat":"≈ 5%","unit":"do Na⁺ filtrado é reabsorvido aqui","rows":[["Transportador","NCC (Na⁺-Cl⁻). Segmento impermeável à água: continua diluindo."],["Cálcio","Reabsorção de Ca²⁺ regulada pelo PTH."],["Mácula densa","No início do segmento (ponto amarelo), sente o NaCl e ajusta a TFG e a liberação de renina."],["Fármaco","Tiazídicos bloqueiam o NCC e reduzem a perda urinária de cálcio."]]},{"id":"dc","short":"Ducto coletor","name":"Ducto coletor","stat":"≈ 3%","unit":"do Na⁺ ajustado aqui, e o volume final da urina","rows":[["Células principais","ENaC reabsorve Na⁺ e ROMK secreta K⁺, sob ação da aldosterona."],["ADH","Insere aquaporina-2 (receptor V2) e permite urina concentrada."],["Intercaladas","Tipo A secretam H⁺; tipo B secretam HCO₃⁻."],["Fármacos","Espironolactona (antagonista da aldosterona) e amilorida (ENaC) poupam potássio."],["Resultado","Dos 180 L filtrados, saem cerca de 1 a 2 L de urina por dia."]]}];
var QUIZ=[{"q":"Qual segmento reabsorve cerca de dois terços do sódio e da água filtrados?","o":["Túbulo contorcido proximal","Ramo ascendente espesso","Túbulo contorcido distal","Ducto coletor"],"a":0,"e":"O túbulo proximal reabsorve cerca de 65% do Na⁺ e da água, de forma isosmótica, além de quase toda a glicose e os aminoácidos."},{"q":"A furosemida aumenta a diurese porque bloqueia qual transportador?","o":["SGLT2 no túbulo proximal","NCC no túbulo distal","NKCC2 no ramo ascendente espesso","ENaC no ducto coletor"],"a":2,"e":"A furosemida inibe o NKCC2 do ramo ascendente espesso, que reabsorve cerca de 25% do Na⁺ filtrado. Por isso é o diurético mais potente."},{"q":"Por que o ramo ascendente espesso é chamado de segmento diluidor?","o":["Porque secreta água no lúmen","Porque reabsorve NaCl e é impermeável à água","Porque tem muita aquaporina-2","Porque filtra o plasma de novo"],"a":1,"e":"Ele retira NaCl sem deixar a água acompanhar. O líquido sai hipo-osmótico, perto de 100 mOsm/kg."},{"q":"Sem a ação do ADH, como fica a urina?","o":["Concentrada e em pouco volume","Isosmótica e em volume normal","Diluída e em grande volume","Sem alteração"],"a":2,"e":"Sem aquaporina-2 no ducto coletor, a água não é reabsorvida: a urina fica perto de 50 mOsm/kg e o volume pode passar de 10 L por dia."},{"q":"Qual é a taxa de filtração glomerular aproximada de um adulto saudável?","o":["12 mL/min","125 mL/min","1.200 mL/min","12 L/min"],"a":1,"e":"Cerca de 125 mL/min, o que dá aproximadamente 180 L de filtrado por dia."}];
/* Néfron interativo: segmentos, simulador de ADH e quiz. Recebe do build: SEGS e QUIZ. */
var P = window.PDR, S = P.S, esc = P.esc;
function $(id) { return document.getElementById(id); }
function fmt(n, d) { return n.toLocaleString("pt-BR", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }

var curSeg = "glom";
function segById(id) { return SEGS.filter(function (s) { return s.id === id; })[0]; }
function renderSegList() { $("segList").innerHTML = SEGS.map(function (s) { return '<button type="button" data-s="' + s.id + '" class="' + (S.seen.indexOf(s.id) >= 0 ? "seen " : "") + (curSeg === s.id ? "on" : "") + '">' + esc(s.short) + "</button>"; }).join(""); }
function selectSeg(id, silent) {
  curSeg = id;
  document.querySelectorAll("#nephron .seg").forEach(function (g) { g.classList.toggle("on", g.getAttribute("data-seg") === id); });
  var s = segById(id);
  var html = '<p class="eyebrow">Segmento ' + (SEGS.indexOf(s) + 1) + " de 6</p><h3>" + esc(s.name) + '</h3><div class="stat"><b>' + s.stat + "</b><span>" + s.unit + "</span></div><dl>";
  s.rows.forEach(function (r) { html += "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; });
  $("segPanel").innerHTML = html + "</dl>";
  if (!silent && S.seen.indexOf(id) < 0) {
    S.seen.push(id); P.award(10, "Segmento explorado: " + s.short);
    if (S.seen.length === 6) { P.badge("explorer"); P.award(30, "Néfron completo!"); }
  }
  renderSegList();
}
$("segList").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) selectSeg(b.getAttribute("data-s")); });
document.querySelectorAll("#nephron .seg").forEach(function (g) {
  g.addEventListener("click", function () { selectSeg(g.getAttribute("data-seg")); });
  g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectSeg(g.getAttribute("data-seg")); } });
});

var flowing = false;
$("flowBtn").onclick = function () {
  if (flowing) return; flowing = true;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches, p = $("particle");
  selectSeg("glom");
  var steps = ["tcp", "desc", "asc", "tcd", "dc"].map(function (id) { return { id: id, path: document.querySelector('#nephron .seg[data-seg="' + id + '"] .hit') }; }), i = 0;
  function next() {
    if (i >= steps.length) { flowing = false; p.setAttribute("cx", -20); p.setAttribute("cy", -20); return; }
    var st = steps[i++]; selectSeg(st.id); var L = st.path.getTotalLength();
    if (reduce) { var pt = st.path.getPointAtLength(L); p.setAttribute("cx", pt.x); p.setAttribute("cy", pt.y); setTimeout(next, 1400); return; }
    var dur = Math.max(1400, L * 9), t0 = null;
    function frame(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / dur); var q = st.path.getPointAtLength(L * k); p.setAttribute("cx", q.x); p.setAttribute("cy", q.y); if (k < 1) requestAnimationFrame(frame); else setTimeout(next, 350); }
    requestAnimationFrame(frame);
  }
  setTimeout(next, reduce ? 1200 : 900);
};

// Modelo didático: osmolalidade de 50 a 1200 mOsm/kg conforme o ADH; volume = carga de 600 mOsm/dia ÷ osmolalidade.
function updADH(fromUser) {
  var v = +$("adh").value, p = v / 100, uosm = 50 * Math.pow(24, p), vol = 600 / uosm;
  $("adhPct").textContent = v + "%"; $("uosm").textContent = fmt(Math.round(uosm / 5) * 5); $("uvol").textContent = fmt(vol, vol < 10 ? 1 : 0);
  var st;
  if (v <= 6) st = "Sem ADH: padrão do diabetes insípido, urina muito diluída";
  else if (uosm < 270) st = "Urina diluída (hipo-osmótica ao plasma)";
  else if (uosm <= 310) st = "Urina isosmótica ao plasma";
  else if (v >= 94) st = "ADH máximo: desidratação intensa ou SIADH";
  else st = "Urina concentrada (hiperosmótica ao plasma)";
  $("adhState").textContent = st;
  var liq = $("liq"); liq.style.height = Math.max(4, Math.min(100, vol / 12 * 100)) + "%"; liq.style.setProperty("--mix", Math.round(p * 85) + "%");
  if (fromUser) {
    if (!S.adhTouched) { S.adhTouched = true; P.award(10, "Simulador de ADH testado"); }
    if (v <= 3) S.adhMin = true; if (v >= 97) S.adhMax = true; P.save();
    if (S.adhMin && S.adhMax) P.badge("adh");
  }
}
$("adh").addEventListener("input", function () { updADH(true); });

function renderQuiz() {
  var ok = 0, ans = 0;
  var html = QUIZ.map(function (q, i) {
    var a = S.quiz[i]; if (a !== undefined) { ans++; if (a === q.a) ok++; }
    var opts = q.o.map(function (o, j) { var cls = ""; if (a !== undefined) { if (j === q.a) cls = "right"; else if (j === a) cls = "wrong"; } return '<button type="button" data-q="' + i + '" data-o="' + j + '" class="' + cls + '"' + (a !== undefined ? " disabled" : "") + ">" + esc(o) + "</button>"; }).join("");
    var ex = a !== undefined ? '<p class="expl"><b>' + (a === q.a ? "Isso aí. " : "Quase. ") + "</b>" + esc(q.e) + "</p>" : "";
    return '<div class="q"><span class="num">Questão ' + (i + 1) + " de " + QUIZ.length + "</span><h4>" + esc(q.q) + '</h4><div class="opts">' + opts + "</div>" + ex + "</div>";
  }).join("");
  if (ans === QUIZ.length) html += '<div class="quiz-end"><div style="flex:1;min-width:200px"><h3>' + ok + " de " + QUIZ.length + " acertos</h3><p>" + (ok === QUIZ.length ? "Medalha Néfron desvendado conquistada." : "Revise os segmentos e tente de novo. O XP de cada questão vale só na primeira tentativa.") + '</p></div><button class="btn btn-sun btn-sm" type="button" id="retry">Refazer quiz</button></div>';
  $("quiz").innerHTML = html; $("quizScore").textContent = ok + " de " + QUIZ.length;
  var r = $("retry"); if (r) r.onclick = function () { S.quiz = {}; S.quizRetry = true; P.save(); renderQuiz(); };
}
$("quiz").addEventListener("click", function (e) {
  var b = e.target.closest("button[data-q]"); if (!b) return;
  var i = +b.getAttribute("data-q"), j = +b.getAttribute("data-o"); if (S.quiz[i] !== undefined) return;
  S.quiz[i] = j; P.save();
  if (j === QUIZ[i].a && !S.quizRetry) P.award(30, "Resposta certa");
  if (Object.keys(S.quiz).length === QUIZ.length) {
    var ok = QUIZ.filter(function (q, k) { return S.quiz[k] === q.a; }).length;
    if (ok === QUIZ.length) P.badge("quiz");
    if (!S.lessonDone) { S.lessonDone = true; P.award(50, "Néfron interativo concluído"); }
  }
  renderQuiz();
});

selectSeg("glom", true);
updADH(false);
renderQuiz();

})();

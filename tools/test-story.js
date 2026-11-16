// Walks the story thousands of times with random choices and checks it never breaks.
const O = require('../js/script.js'); require('../js/story/meta.js'); for (const n of [1, 2, 3, 4, 5]) require('../js/story/ch' + n + '.js');
const fs = require('fs'), chars = fs.readFileSync(__dirname + '/../js/chars.js', 'utf8');
const prog = O.compile(O.story.join('\n')), P = prog.P, L = prog.labels, errs = new Set();
const IDS = ['K', 'E', 'R', 'V'], SLOTS = ['ll', 'l', 'cl', 'c', 'cr', 'r', 'rr'];
const EX = [...chars.match(/const EX = \{([\s\S]*?)\n  \};/)[1].matchAll(/(\w+): \{/g)].map(m => m[1]);
const POSES = [...chars.match(/const POSE = \{([\s\S]*?)\n  \};/)[1].matchAll(/^\s+(\w+): (?:\{|Object)/gm)].map(m => m[1]);
const CMDS = 'act fx dance hold hug prop bg cast enter exit pose x face move near kiss apart cam outfit music sfx fade flash shake wait title card cg note photo hide set if go end stop'.split(' ');
const res = t => (typeof t === 'string' ? L[t] : t);
P.forEach((ins, i) => {
  if (ins.op === 'say') { if (ins.expr && !EX.includes(ins.expr)) errs.add('bad expr ' + ins.expr + ': ' + ins.text); if (ins.text.length > 190) errs.add('long line: ' + ins.text.slice(0, 40)); }
  if (ins.op === 'go' && res(ins.to) === undefined) errs.add('bad go ' + ins.to);
  if (ins.op === 'choice') ins.opts.forEach(o => { if ((o.label ? L[o.label] : o.to) == null) errs.add('bad choice target ' + o.text); if (o.text.split(' ').length > 8) errs.add('long choice: ' + o.text); });
  if (ins.op === 'cmd') { const a = ins.args; if (!CMDS.includes(ins.name)) errs.add('unknown cmd ' + ins.name);
    if (['cast', 'enter'].includes(ins.name)) a.forEach(s => { const p = s.split(':'); if (!IDS.includes(p[0])) errs.add('bad id ' + s); if (p[1] && !SLOTS.includes(p[1])) errs.add('bad slot ' + s); if (p[2] && !POSES.includes(p[2])) errs.add('bad pose ' + s); if (p[3] && !EX.includes(p[3])) errs.add('bad expr ' + s); });
    if (ins.name === 'pose' && !POSES.includes(a[1])) errs.add('bad pose ' + a[1]);
    if (ins.name === 'x') for (let k = 0; k < a.length; k += 2) { if (!IDS.includes(a[k]) || !EX.includes(a[k + 1])) errs.add('bad x ' + a.join(' ')); }
    if (ins.name === 'cg' && !O.GALLERY[a[0]]) errs.add('bad cg ' + a[0]); if (ins.name === 'end' && !O.ENDINGS[a[0]]) errs.add('bad end ' + a[0]);
    if (['go'].includes(ins.name) && L[a[0]] === undefined) errs.add('bad @go ' + a[0]); if (ins.name === 'if' && L[a[a.length - 1]] === undefined) errs.add('bad @if ' + a.join(' ')); }
});
function play(pick) {
  const V = {}; let pc = L.ch1, ch = 0, lines = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], part1 = null, cgs = new Set(), on = new Set(), steps = 0;
  while (steps++ < 20000) {
    const ins = P[pc]; if (!ins) return { err: 'ran off end' };
    if (ins.cond && !O.test(V, ins.cond)) { pc++; continue; }
    if (ins.op === 'go') { pc = res(ins.to); continue; }
    if (ins.op === 'say') { lines[ch]++; if (IDS.includes(ins.who) && ins.expr && !on.has(ins.who)) errs.add('expr on off-stage ' + ins.who + ': ' + ins.text.slice(0, 40)); pc++; continue; }
    if (ins.op === 'choice') { const os = ins.opts.filter(o => O.test(V, o.cond)); if (!os.length) return { err: 'no options at ' + pc }; const o = pick(os, V); O.applyFx(V, o.fx); pc = o.label ? L[o.label] : o.to; continue; }
    const a = ins.args;
    switch (ins.name) {
      case 'title': ch = +a[0]; break; case 'bg': on.clear(); break;
      case 'cast': on.clear(); a.forEach(s => on.add(s.split(':')[0])); break; case 'enter': a.forEach(s => on.add(s.split(':')[0])); break; case 'exit': a.forEach(s => on.delete(s)); break;
      case 'fx': case 'pose': case 'face': case 'move': case 'prop': if (!on.has(a[0])) errs.add(ins.name + ' on off-stage ' + a[0] + ' @' + pc); break;
      case 'near': case 'kiss': case 'hold': case 'hug': case 'dance': if (!on.has(a[0]) || !on.has(a[1])) errs.add(ins.name + ' off-stage ' + a.join(' ') + ' @' + pc); break;
      case 'x': for (let k = 0; k < a.length; k += 2) if (!on.has(a[k])) errs.add('x on off-stage ' + a[k] + ' @' + pc); break;
      case 'cg': cgs.add(a[0]); break;
      case 'set': O.applyFx(V, ins.raw.split(/\s+/).map(t => { const m = t.match(/^(\w+)(\+|-|=)(.+)$/); return { k: m[1], op: m[2], v: isNaN(+m[3]) ? m[3] : +m[3] }; })); break;
      case 'if': if (O.test(V, a.slice(0, -1).join(' '))) { pc = L[a[a.length - 1]]; continue; } break;
      case 'go': pc = L[a[0]]; continue;
      case 'end': if (O.ENDINGS[a[0]].next) { part1 = a[0]; pc = L[O.ENDINGS[a[0]].next]; continue; } return { end: a[0], part1, lines, cgs, V };
      case 'stop': return { err: 'hit stop without ending' };
    }
    pc++;
  }
  return { err: 'loop' };
}
const ends = {}, allCg = new Set(), tot = Array(11).fill(0), mn = Array(11).fill(9e9), mx = Array(11).fill(0); let N = 6000, okN = 0;
const ACT = [...chars.match(/const ACTS = \{([\s\S]*?)\n  \};/)[1].matchAll(/(\w+): \[/g)].map(m => m[1]);
P.forEach(ins => { if (ins.op === 'cmd' && ins.name === 'act') for (let k = 0; k < ins.args.length; k += 2) if (!ACT.includes(ins.args[k + 1])) errs.add('bad act ' + ins.args.join(' ')); });
const prefer = w => (os, V) => os.find(o => o.text.includes(w)) || os.find(o => o.fx.some(f => f.k === 'a' + w[0] && f.op === '+')) || os[0];
const strategies = [null, os => os[0], os => os[os.length - 1]];
for (let i = 0; i < N; i++) {
  const st = strategies[i < 3 ? i : 0], r = play(st || (os => os[Math.floor(Math.random() * os.length)]));
  if (r.err) { errs.add(r.err); continue; } okN++; ends[r.part1 + ' > ' + r.end] = (ends[r.part1 + ' > ' + r.end] || 0) + 1; r.cgs.forEach(c => allCg.add(c));
  r.lines.forEach((n, k) => { tot[k] += n; mn[k] = Math.min(mn[k], n); mx[k] = Math.max(mx[k], n); });
  if (i < 3) console.log('strategy', i, '->', r.end, 'cl', r.V.cl, 'ds', r.V.ds, 'ry', r.V.ry);
}
console.log('instructions:', P.length, '| runs ok:', okN + '/' + N);
console.log('endings reached:', ends);
console.log('gallery never unlocked:', Object.keys(O.GALLERY).filter(k => !allCg.has(k)));
for (let k = 1; k <= 5; k++) console.log('chapter', k, 'lines avg', Math.round(tot[k] / okN), 'min', mn[k], 'max', mx[k]);
console.log(errs.size ? 'ERRORS:\n' + [...errs].join('\n') : 'no errors');
process.exit(errs.size ? 1 : 0);

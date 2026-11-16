// Only You, Khadeja — story script compiler (runs in browser and in Node for tests)
(function (root) {
  const O = (root.OYK = root.OYK || {});
  O.story = O.story || [];
  function parseFx(s) { return (s || '').trim().split(/\s+/).filter(Boolean).map(t => { const m = t.match(/^([A-Za-z_]\w*)(\+|-|=)(.+)$/); if (!m) throw new Error('bad effect: ' + t); return { k: m[1], op: m[2], v: isNaN(+m[3]) ? m[3] : +m[3] }; }); }
  function cond(t) { const m = t.match(/^\{([^}]*)\}\s*(.*)$/); return m ? [m[1], m[2]] : [null, t]; }
  function parseLine(t) {
    let c; [c, t] = cond(t); let ins;
    if (t.startsWith('::')) ins = { op: 'label', name: t.slice(2).trim() };
    else if (t[0] === '@') { const p = t.slice(1).split(/\s+/); ins = { op: 'cmd', name: p[0], args: p.slice(1), raw: t.slice(1 + p[0].length).trim() }; }
    else if (t.startsWith('- ')) ins = { op: 'say', who: '', text: t.slice(2) };
    else { const m = t.match(/^([A-Za-z?][\w ?']{0,14}?)(\*)?(?:\[(\w+)\])?(\*)?:\s*(.+)$/); if (!m) throw new Error('cannot parse line: ' + t); ins = { op: 'say', who: m[1], think: !!(m[2] || m[4]), expr: m[3] || null, text: m[5] }; }
    if (c) ins.cond = c; return ins;
  }
  function parseOpt(t) { let c; [c, t] = cond(t.slice(1).trim()); const p = t.split('|').map(x => x.trim()); const o = { text: p[0], fx: parseFx(p[1]), to: null }; if (p[2]) o.label = p[2].replace(/^->\s*/, ''); if (c) o.cond = c; return o; }
  O.compile = function (src) {
    const L = src.split('\n').map(l => ({ ind: l.match(/^ */)[0].length, t: l.trim() })).filter(l => l.t && !l.t.startsWith('//'));
    const P = [], labels = {}; let i = 0;
    function block(ind) {
      while (i < L.length && L[i].ind >= ind) {
        const l = L[i];
        if (l.t[0] === '>') {
          const ch = { op: 'choice', opts: [] }, ends = []; P.push(ch);
          while (i < L.length && L[i].ind === l.ind && L[i].t[0] === '>') {
            const o = parseOpt(L[i].t); i++;
            if (i < L.length && L[i].ind > l.ind) { o.to = P.length; block(L[i].ind); const g = { op: 'go', to: o.label || -1 }; P.push(g); if (!o.label) ends.push(g); o.label = null; }
            ch.opts.push(o);
          }
          ends.forEach(g => (g.to = P.length)); ch.opts.forEach(o => { if (o.to === null && !o.label) o.to = P.length; });
        } else { const ins = parseLine(l.t); if (ins.op === 'label') labels[ins.name] = P.length; else P.push(ins); i++; }
      }
    }
    block(0); P.push({ op: 'cmd', name: 'stop', args: [] });
    return { P, labels };
  };
  O.makeVars = function (init) { return Object.assign({}, init || {}); };
  const cache = {};
  O.test = function (V, c) { if (!c) return true; const f = cache[c] || (cache[c] = new Function('V', 'with(V){return !!(' + c + ')}')); return f(new Proxy(V, { has: (t, k) => typeof k === 'string' && k !== 'V', get: (t, k) => (k in t ? t[k] : 0) })); };
  O.applyFx = function (V, fx) { (fx || []).forEach(f => { if (f.op === '=') V[f.k] = f.v; else V[f.k] = (V[f.k] || 0) + (f.op === '+' ? f.v : -f.v); }); };
  if (typeof module !== 'undefined') module.exports = O;
})(typeof window !== 'undefined' ? window : globalThis);

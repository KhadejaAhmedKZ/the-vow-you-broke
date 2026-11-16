// Only You, Khadeja — low-poly character builder v2 (sculpted heads, painted faces, props)
(function () {
  const T = THREE;
  const O = (window.OYK = window.OYK || {});

  function M(color, o) { return new T.MeshPhongMaterial(Object.assign({ color, flatShading: true, shininess: 6, specular: 0x0c0c0c }, o || {})); }
  function mesh(geo, m, p, x, y, z) { const o = new T.Mesh(geo, m); o.position.set(x || 0, y || 0, z || 0); o.castShadow = o.receiveShadow = true; if (p) p.add(o); return o; }
  function box(w, h, d, m, p, x, y, z) { return mesh(new T.BoxGeometry(w, h, d), m, p, x, y, z); }
  function cyl(rt, rb, h, s, m, p, x, y, z) { return mesh(new T.CylinderGeometry(rt, rb, h, s), m, p, x, y, z); }
  function ico(r, m, p, x, y, z, d) { return mesh(new T.IcosahedronGeometry(r, d || 0), m, p, x, y, z); }
  function grp(p, x, y, z) { const g = new T.Group(); g.position.set(x || 0, y || 0, z || 0); if (p) p.add(g); return g; }
  function ctex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.magFilter = T.NearestFilter; return t; }
  let seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  O.u = { M, mesh, box, cyl, grp, ctex, rnd, ico, reseed: s => (seed = s) };
  // a hair lock / tuft that hangs from its top point
  function lock(rt, rb, h, m, p, x, y, z, rx, rz, seg) { const g = new T.CylinderGeometry(rt, rb, h, seg || 5); g.translate(0, -h / 2, 0); const o = mesh(g, m, p, x, y, z); o.rotation.set(rx || 0, 0, rz || 0); return o; }

  // ---------- character definitions ----------
  const DEF = {
    K: { name: 'Khadeja', h: 1.66, fem: 1, R: .121, skin: '#edc4a0', skinD: '#c98f6c', hair: '#15111a', brow: '#1b1519', eye: '#4d2e17', lip: '#b8475b', lip2: '#c95c6c', jaw: .46, chin: .95, cheek: .05, ew: 38, eh: 16.5, et: .13, bw: 36, bth: 5, bt0: .06, bh: 20, mw: 34, lu: 5, ll: 6, blush: .28, sh: .152, arm: .038, lash: 1, shadow: '#a0566a' },
    E: { name: 'Ellis', h: 1.87, R: .114, skin: '#e3c6b0', skinD: '#ab8672', hair: '#0e0e15', brow: '#0a0a10', eye: '#7f93b8', lip: '#a87068', lip2: '#b47c72', jaw: .28, chin: .87, cheek: .07, jawW: .06, browR: .05, ew: 34, eh: 11, et: .05, bw: 42, bth: 8, bt0: .14, bh: 14, mw: 37, lu: 2.8, ll: 4.2, stub: 0, sh: .24, arm: .059 },
    R: { name: 'Rayan', h: 1.82, R: .114, skin: '#cf9a6a', skinD: '#9c6d44', hair: '#7a5230', brow: '#5a3a1e', eye: '#6f8a3a', lip: '#a8664e', lip2: '#b4735a', jaw: .26, chin: .87, cheek: .07, jawW: .05, browR: .03, ew: 35, eh: 12.5, et: .08, bw: 40, bth: 7.5, bt0: .04, bh: 16, mw: 41, lu: 3, ll: 5, stub: .18, sh: .232, arm: .058 },
    V: { name: 'Lady Vesper', h: 1.72, fem: 1, R: .118, skin: '#f0dccf', skinD: '#c4a595', hair: '#e6e3ec', brow: '#b9b4c2', eye: '#a3283a', lip: '#8a1f30', lip2: '#9a2a3c', jaw: .4, chin: .94, cheek: .07, ew: 36, eh: 13, et: .16, bw: 36, bth: 4.5, bt0: .1, bh: 21, mw: 33, lu: 4, ll: 5, blush: .05, sh: .158, arm: .038, lash: 1, shadow: '#6a4a6a' }
  };
  O.DEF = DEF;

  const EX = {
    neutral: { bt: 0, br: 0, eo: 1, m: 'n' }, smile: { bt: -.05, br: 1, eo: .88, m: 'smile' }, soft: { bt: -.1, br: 0, eo: .68, m: 'soft' },
    laugh: { bt: -.1, br: 3, eo: .22, m: 'big' }, smirk: { bt: .1, br: 2, eo: .8, m: 'smirk' }, shy: { bt: -.2, br: 0, eo: .72, m: 'soft', bl: 1, py: 3 },
    sad: { bt: -.36, br: -1, eo: .72, m: 'frown', py: 2 }, worried: { bt: -.3, br: 2, eo: 1.05, m: 'flat' }, angry: { bt: .42, br: -3, eo: .85, m: 'frown' },
    cold: { bt: .14, br: -2, eo: 1.22, m: 'soft', ps: .62 }, surprised: { bt: -.1, br: 6, eo: 1.3, m: 'o' }, hurt: { bt: -.42, br: 1, eo: .9, m: 'flat', py: 2 },
    think: { bt: .05, br: 1, eo: .85, m: 'flat', px: 4, py: -2 }, closed: { bt: -.1, br: 0, eo: 0, m: 'soft' }, serious: { bt: .22, br: -1, eo: .9, m: 'flat' },
    jealous: { bt: .3, br: -2, eo: .78, m: 'flat', px: 5 }, love: { bt: -.14, br: 1, eo: .6, m: 'smile', bl: .8 }, cry: { bt: -.45, br: 0, eo: .5, m: 'frown', tear: 1, py: 2 },
    proud: { bt: 0, br: 2, eo: .8, m: 'smile' }, fear: { bt: -.34, br: 5, eo: 1.3, m: 'o', ps: .7 }, tease: { bt: .12, br: 3, eo: .82, m: 'smirk' }
  };
  const MOUTH = { n: { c: .6, o: 0, w: 1 }, smile: { c: 4, o: 0, w: 1.1 }, soft: { c: 2.4, o: 0, w: 1 }, big: { c: 6, o: .7, w: 1.16 }, smirk: { c: 2.6, o: 0, w: 1.02, a: 1 }, frown: { c: -3, o: 0, w: .94 }, o: { c: 0, o: .6, w: .66 }, flat: { c: 0, o: 0, w: .92 } };

  function rgba(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
  function blob(g, x, y, r, col, a, sy) { g.save(); g.translate(x, y); g.scale(1, sy || 1); const gr = g.createRadialGradient(0, 0, 0, 0, 0, r); gr.addColorStop(0, rgba(col, a)); gr.addColorStop(1, rgba(col, 0)); g.fillStyle = gr; g.fillRect(-r, -r, r * 2, r * 2); g.restore(); }

  function paintFace(g, d, exName, blink, talk, gaze) {
    const e = EX[exName] || EX.neutral, W = 256;
    g.setTransform(2, 0, 0, 2, 0, 0); g.globalAlpha = 1;
    g.fillStyle = d.skin; g.fillRect(0, 0, W, W);
    let gr = g.createLinearGradient(0, 0, W, 0); gr.addColorStop(0, d.skinD); gr.addColorStop(.3, rgba(d.skinD, 0)); gr.addColorStop(.7, rgba(d.skinD, 0)); gr.addColorStop(1, d.skinD);
    g.fillStyle = gr; g.fillRect(0, 0, W, W);
    gr = g.createLinearGradient(0, 150, 0, 256); gr.addColorStop(0, rgba(d.skinD, 0)); gr.addColorStop(1, rgba(d.skinD, .8)); g.fillStyle = gr; g.fillRect(0, 150, W, 106);
    blob(g, 128, 78, 70, '#fff0dc', .24); blob(g, 128, 140, 16, '#fff0dc', .22, 2.2); blob(g, 128, 226, 22, '#fff0dc', .14);
    for (const s of [-1, 1]) { blob(g, 128 + s * 60, 146, 22, '#fff0dc', d.fem ? .16 : .12); blob(g, 128 + s * 66, 182, 34, d.skinD, d.fem ? .22 : .5, 1.3); blob(g, 128 + s * 45, 122, 30, d.fem ? d.shadow : d.skinD, d.fem ? .3 : .42, .7); }
    blob(g, 128, 178, 14, d.skinD, .4, .5); blob(g, 128, 210, 20, d.skinD, .35, .4);
    if (!d.fem) { g.fillStyle = rgba(d.skinD, .3); for (const s of [-1, 1]) { g.beginPath(); g.moveTo(128 + s * 80, 140); g.lineTo(128 + s * 46, 198); g.lineTo(128 + s * 62, 224); g.lineTo(128 + s * 94, 190); g.fill(); } g.fillStyle = rgba(d.skinD, .28); g.fillRect(70, 104, 116, 10); }
    if (d.old) { g.strokeStyle = rgba(d.skinD, .75); g.lineWidth = 1.5; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(128 + s * 22, 166); g.quadraticCurveTo(128 + s * 34, 180, 128 + s * 30, 198); g.stroke(); g.beginPath(); g.moveTo(128 + s * 62, 126); g.lineTo(128 + s * 72, 122); g.stroke(); } g.beginPath(); g.moveTo(104, 82); g.quadraticCurveTo(128, 78, 152, 82); g.stroke(); }
    if (d.stub) { g.fillStyle = rgba(d.hair, d.stub * .34); g.beginPath(); g.moveTo(20, 150); g.quadraticCurveTo(60, 176, 96, 172); g.lineTo(160, 172); g.quadraticCurveTo(196, 176, 236, 150); g.lineTo(236, 256); g.lineTo(20, 256); g.fill(); g.fillStyle = rgba(d.hair, d.stub * .5); for (let i = 0; i < 220; i++) g.fillRect(24 + (i * 53) % 208, 168 + (i * 97) % 86, 1, 1.6); blob(g, 128, 206, 26, d.skin, .5, .4); }
    if (d.beard) { g.fillStyle = d.beard; g.beginPath(); g.moveTo(14, 138); g.quadraticCurveTo(60, 180, 98, 170); g.quadraticCurveTo(128, 162, 158, 170); g.quadraticCurveTo(196, 180, 242, 138); g.lineTo(242, 256); g.lineTo(14, 256); g.fill(); g.fillStyle = 'rgba(0,0,0,.16)'; for (let i = 0; i < 60; i++) g.fillRect(24 + (i * 37) % 208, 180 + (i * 53) % 72, 1.5, 7); g.fillStyle = 'rgba(255,255,255,.14)'; for (let i = 0; i < 50; i++) g.fillRect(28 + (i * 61) % 200, 184 + (i * 29) % 68, 1.2, 6); }
    const bl = (d.blush || 0) + (e.bl || 0) * .55; if (bl) for (const s of [-1, 1]) blob(g, 128 + s * 54, 156, 30, '#e2606e', .5 * bl);
    // nose
    g.strokeStyle = rgba(d.skinD, .85); g.lineWidth = 2; g.beginPath(); g.moveTo(118, 112); g.quadraticCurveTo(114, 136, 116, 152); g.stroke();
    g.strokeStyle = rgba(d.skinD, .6); g.lineWidth = 1.5; for (const s of [-1, 1]) { g.beginPath(); g.arc(128 + s * 12, 160, 6, s > 0 ? -1 : 2.1, s > 0 ? 1 : 4.1); g.stroke(); }
    g.fillStyle = 'rgba(70,35,25,.6)'; g.beginPath(); g.ellipse(120, 163, 3.6, 1.9, .3, 0, 7); g.ellipse(136, 163, 3.6, 1.9, -.3, 0, 7); g.fill();
    lips(g, d, e, talk);
    if (d.beard) { g.fillStyle = d.beard; g.beginPath(); g.moveTo(94, 186); g.quadraticCurveTo(128, 164, 162, 186); g.quadraticCurveTo(128, 180, 94, 186); g.fill(); }
    for (const s of [-1, 1]) { eye(g, 128 + s * 45, 124, s, d, e, blink, gaze || 0); brow(g, 128 + s * 46, 124 - d.bh - e.br, s, d, e); }
    if (e.tear) { g.fillStyle = 'rgba(190,225,255,.85)'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(128 + s * 52, 142, 2.6, 7, 0, 0, 7); g.fill(); } }
    g.fillStyle = d.hair; g.fillRect(0, 0, W, 34); if (!d.fem) { g.fillRect(0, 34, 16, 92); g.fillRect(240, 34, 16, 92); }
  }
  function eye(g, cx, cy, s, d, e, blink, gaze) {
    const ew = d.ew, eh = d.eh * (blink ? 0 : e.eo), lid = '#1a0f0c';
    g.save(); g.translate(cx, cy); g.rotate(-s * d.et);
    if (eh < 2.2) {
      g.strokeStyle = lid; g.lineWidth = d.lash ? 4 : 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(-ew / 2, 0); g.quadraticCurveTo(0, 5, ew / 2, 0); g.stroke();
      if (d.lash) { g.lineWidth = 2; for (let i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(i * 9 + s * 3, 3); g.lineTo(i * 11 + s * 5, 8); g.stroke(); } }
      g.restore(); return;
    }
    g.beginPath(); g.moveTo(-ew / 2, 1); g.quadraticCurveTo(0, -eh * 1.55, ew / 2, 0); g.quadraticCurveTo(0, eh * 1.05, -ew / 2, 1); g.closePath();
    g.save(); g.clip(); g.fillStyle = '#f6f0e8'; g.fillRect(-ew, -30, ew * 2, 60);
    const r = d.eh * .8, px = (e.px || 0) + gaze * 5, py = (e.py || 0) - 1;
    g.fillStyle = '#120a08'; g.beginPath(); g.arc(px, py, r + 1.3, 0, 7); g.fill();
    const ig = g.createRadialGradient(px, py + r * .3, r * .1, px, py, r); ig.addColorStop(0, '#ffd9a0'); ig.addColorStop(.35, d.eye); ig.addColorStop(1, '#1a0e08'); g.fillStyle = d.eye; g.beginPath(); g.arc(px, py, r, 0, 7); g.fill(); g.globalAlpha = .55; g.fillStyle = ig; g.fill(); g.globalAlpha = 1;
    g.fillStyle = '#0a0606'; g.beginPath(); g.arc(px, py, r * .46 * (e.ps || 1), 0, 7); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(px - r * .38, py - r * .42, r * .26, 0, 7); g.fill(); g.beginPath(); g.arc(px + r * .36, py + r * .34, r * .11, 0, 7); g.fill();
    g.fillStyle = 'rgba(40,20,20,.3)'; g.fillRect(-ew, -30, ew * 2, 30 - eh * .45);
    g.restore();
    g.strokeStyle = lid; g.lineWidth = d.lash ? 4.4 : 3; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-ew / 2, 1); g.quadraticCurveTo(0, -eh * 1.55, ew / 2, 0); g.stroke();
    if (d.lash) { g.lineWidth = 2.6; g.beginPath(); g.moveTo(s * ew / 2 - s * 4, -2); g.lineTo(s * (ew / 2 + 7), -7); g.stroke(); g.lineWidth = 1.6; for (let i = 0; i < 3; i++) { const u = s * (ew * .1 + i * ew * .13); g.beginPath(); g.moveTo(u, -eh * 1.0 + i * 1.5); g.lineTo(u + s * 2.5, -eh * 1.0 - 5 + i * 1.5); g.stroke(); } }
    g.strokeStyle = 'rgba(80,40,30,.5)'; g.lineWidth = 1.3; g.beginPath(); g.moveTo(-ew / 2 + 3, 2); g.quadraticCurveTo(0, eh * 1.05, ew / 2 - 2, 1); g.stroke();
    g.strokeStyle = rgba(d.skinD, .95); g.lineWidth = 1.5; g.beginPath(); g.moveTo(-ew / 2 + 2, -eh * .9 - 3); g.quadraticCurveTo(0, -eh * 1.6 - 5, ew / 2 - 2, -eh * .8 - 3); g.stroke();
    g.restore();
  }
  function brow(g, cx, cy, s, d, e) {
    const bw = d.bw, th = d.bth, k = d.bt0 + e.bt, ar = d.fem ? 4 : 2.5;
    const P = [[-bw / 2, th / 2], [-bw / 2 + 2, -th / 2], [bw * .18, -th / 2 - ar], [bw / 2, 1], [bw * .12, th / 2 - ar * .7]];
    g.fillStyle = d.brow; g.beginPath(); P.forEach((p, i) => { const x = cx + s * p[0], y = cy + p[1] - k * p[0]; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.fill();
    g.strokeStyle = rgba(d.brow, .7); g.lineWidth = 1; for (let i = 0; i < 9; i++) { const u = -bw / 2 + 2 + i * (bw - 6) / 8, y0 = cy + th / 2 - k * u - (u > 0 ? ar * .6 : 0); g.beginPath(); g.moveTo(cx + s * u, y0); g.lineTo(cx + s * (u + 3), y0 - th - 1.5); g.stroke(); }
  }
  function lips(g, d, e, talk) {
    const mt = MOUTH[e.m] || MOUTH.n; let c = mt.c, o = Math.max(mt.o, talk || 0), w = d.mw * mt.w, as = mt.a || 0;
    const y = 192, x = 128, lx = x - w / 2, rx = x + w / 2, ly = y - c + as * 1.5, ry = y - c - as * 3.5, cy = y + c * .5, lu = d.lu, ll = d.ll;
    const oy = o > .05 ? o * 20 + c : 0;
    if (o > .05) {
      g.fillStyle = '#3a1418'; g.beginPath(); g.moveTo(lx, ly); g.quadraticCurveTo(x, cy - 2, rx, ry); g.quadraticCurveTo(x, cy + oy + 6, lx, ly); g.fill();
      g.fillStyle = '#f5efe6'; g.beginPath(); g.moveTo(lx + 5, ly + 1); g.quadraticCurveTo(x, cy, rx - 5, ry + 1); g.quadraticCurveTo(x, cy + o * 8 + 3, lx + 5, ly + 1); g.fill();
    }
    g.fillStyle = d.lip; g.beginPath(); g.moveTo(lx, ly); g.quadraticCurveTo(x - w * .24, cy - lu * 1.5, x - w * .08, cy - lu); g.lineTo(x, cy - lu * .65); g.lineTo(x + w * .08, cy - lu);
    g.quadraticCurveTo(x + w * .24, cy - lu * 1.5, rx, ry); g.quadraticCurveTo(x, cy + 1.5, lx, ly); g.fill();
    g.fillStyle = d.lip2; g.beginPath(); g.moveTo(lx + 3, ly + (oy ? 2 : 0)); g.quadraticCurveTo(x, cy + oy + 1, rx - 3, ry + (oy ? 2 : 0)); g.quadraticCurveTo(x, cy + oy + ll * 2.2, lx + 3, ly + (oy ? 2 : 0)); g.fill();
    if (d.fem) { g.fillStyle = 'rgba(255,255,255,.3)'; g.beginPath(); g.ellipse(x, cy + oy + ll * .75, 6, 1.6, 0, 0, 7); g.fill(); }
    g.strokeStyle = 'rgba(60,20,24,.85)'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(lx, ly); g.quadraticCurveTo(x, cy + 1.5, rx, ry); g.stroke();
    for (const s of [-1, 1]) blob(g, x + s * (w / 2 + 2), (s < 0 ? ly : ry), 5, d.skinD, .5);
  }

  // ---------- head + hair geometry ----------
  const gs = (v, c, w) => Math.exp(-Math.pow((v - c) / w, 2));
  function deform(d, p, k) {
    let x = p.x, y = p.y, z = p.z;
    if (y < 0) { const t = Math.min(1, -y), j = 1 - d.jaw * Math.pow(t, 1.5); x *= j; z *= z > 0 ? 1 - .06 * t : 1 - .3 * t; }
    if (z > 0) { x *= 1 + (d.cheek || 0) * gs(y, -.08, .22) * Math.min(1, Math.abs(x) / .6); z *= .9; }
    if (d.jawW && Math.abs(x) > .3) x *= 1 + d.jawW * gs(y, -.52, .18);
    if (z > .45 && k === 1) {
      z += (d.browR || 0) * gs(y, .2, .09) - .05 * gs(y, .05, .09) * gs(Math.abs(x), .34, .15) + .09 * gs(y, -.8, .13) * gs(x, 0, .3) + .03 * gs(y, -.5, .1) * gs(x, 0, .28) + .04 * gs(y, -.05, .2) * gs(x, 0, .12);
    }
    if (y < -.55 && z > 0) z += .06 * Math.min(1, (-y - .55) * 3);
    y = Math.max(y, -d.chin);
    p.set(x * .82 * k, y * 1.12 * k, z * .96 * k);
  }
  function headGeo(d) {
    const g = new T.SphereGeometry(1, 20, 16), P = g.attributes.position, U = g.attributes.uv, v = new T.Vector3();
    for (let i = 0; i < P.count; i++) {
      v.fromBufferAttribute(P, i); const zz = v.z; deform(d, v, 1); P.setXYZ(i, v.x, v.y, v.z);
      if (zz < -.12) U.setXY(i, .045, .2); else U.setXY(i, Math.min(.99, Math.max(.01, v.x / 1.64 + .5)), v.y / 2.24 + .5);
    }
    g.computeVertexNormals(); return g;
  }
  function capGeo(d, keep, k) {
    const src = new T.SphereGeometry(1, 18, 12).toNonIndexed(), P = src.attributes.position, out = [], a = new T.Vector3(), b = new T.Vector3(), c = new T.Vector3();
    for (let i = 0; i < P.count; i += 3) {
      a.fromBufferAttribute(P, i); b.fromBufferAttribute(P, i + 1); c.fromBufferAttribute(P, i + 2);
      const cx = (a.x + b.x + c.x) / 3, cy = (a.y + b.y + c.y) / 3, cz = (a.z + b.z + c.z) / 3;
      if (!keep(cx, cy, cz)) continue;
      for (const v of [a, b, c]) { deform(d, v, k); out.push(v.x, v.y, v.z - .02); }
    }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(out, 3)); g.computeVertexNormals(); return g;
  }
  function noseGeo() {
    const A = [0, .34, -.06], L = [-.14, -.2, -.02], R = [.14, -.2, -.02], P = [0, -.13, .24], B = [0, -.26, .05];
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute([].concat(A, L, P, A, P, R, L, B, P, B, R, P), 3)); g.computeVertexNormals(); return g;
  }
  function tint(hex, f) { const c = new T.Color(hex); c.multiplyScalar(f); return c; }
  function checkTex() { return ctex(64, 64, g => { g.fillStyle = '#f2ede4'; g.fillRect(0, 0, 64, 64); g.fillStyle = '#a3262c'; for (let y = 0; y < 64; y += 8) for (let x = 0; x < 64; x += 8) if ((x + y) % 16 === 0) g.fillRect(x, y, 5, 5); g.strokeStyle = 'rgba(163,38,44,.5)'; for (let i = 0; i < 64; i += 8) { g.beginPath(); g.moveTo(i + 2.5, 0); g.lineTo(i + 2.5, 64); g.moveTo(0, i + 2.5); g.lineTo(64, i + 2.5); g.stroke(); } }); }

  function buildHair(c, head) {
    const d = c.d, id = c.id, o = c.o, hm = M(d.hair, { shininess: 34, specular: 0x2a2a3a, side: T.DoubleSide }), hm2 = M(tint(d.hair, id === 'K' ? 1.35 : id === 'V' ? .9 : 1.5).getHex(), { shininess: 30, specular: 0x2a2a3a });
    const face = (x, y, z) => z > .36 && y < .56;
    if (id === 'K') {
      mesh(capGeo(d, (x, y, z) => !(z > .36 && y < .5) || (Math.abs(x) > .68 && y > -.15), 1.09), hm, head);
      if (o.up) { const b = ico(.42, hm, head, 0, .75, -.75, 1); b.scale.set(1, .85, .9); ico(.26, hm2, head, 0, .95, -.85, 0); const dg = box(.05, .6, .03, M(0xcfd3dc, { shininess: 90 }), head, .25, .95, -.7); dg.rotation.z = -.9; box(.16, .05, .04, M(0xcfd3dc, { shininess: 90 }), head, .42, 1.1, -.7).rotation.z = -.9; for (const s of [-1, 1]) lock(.09, .04, 1.3, hm, head, s * .82, .3, .25, -.06, s * .02); }
      else if (o.braid) { for (let i = 0; i < 7; i++) ico(.2 - i * .012, i % 2 ? hm2 : hm, head, Math.sin(i) * .04, .1 - i * .34, -.82 - i * .02); for (const s of [-1, 1]) lock(.12, .05, 1.1, hm, head, s * .82, .35, .15, -.05, s * .03); }
      else { for (let i = -3; i <= 3; i++) lock(.3, .13, 3.25 - Math.abs(i) * .16, i % 2 ? hm2 : hm, head, i * .24, .3, -.64 + Math.abs(i) * .05, .07, -i * .025, 5); for (const s of [-1, 1]) { lock(.2, .09, 2.45, hm, head, s * .82, .4, .0, -.05, s * .03); lock(.15, .06, 2.0, hm2, head, s * .8, .25, .3, -.1, s * .02); } }
      for (let i = 0; i < 9; i++) { const t = (i - 4) / 4; lock(.15, .05, .46 - Math.abs(t) * .04 + (i % 2) * .05, i % 3 ? hm : hm2, head, t * .62, .74 - t * t * .1, .8 - t * t * .24, -.2, -t * .28, 4).rotation.y = t * .5; }
    } else if (id === 'E') {
      mesh(capGeo(d, (x, y, z) => !face(x, y, z) && y > -.4, 1.07), hm, head);
      for (let r = 0; r < 3; r++) for (let i = 0; i < 5; i++) { const t = (i - 2) / 2, k = lock(.2 - r * .02, .05, .9 - r * .1, (i + r) % 2 ? hm2 : hm, head, t * .5 + .06, .86 + r * .06 - Math.abs(t) * .12, .6 - r * .42, -1.9 + r * .12, -t * .3 - .12, 4); k.scale.z = .6; }
      for (const [x, l, rz] of [[-.34, .62, .18], [-.12, .5, .05], [.42, .44, -.3]]) lock(.1, .03, l, hm, head, x, .82, .84, -.12, rz, 4);
    } else if (id === 'R') {
      mesh(capGeo(d, (x, y, z) => !face(x, y, z) && y > -.3, 1.06), hm, head);
      O.u.reseed(41);
      for (let i = 0; i < 36; i++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * .68, y = 1.02 - r * r * .55, m = ico(.19 + rnd() * .11, i % 3 ? hm : hm2, head, Math.cos(a) * r * .8, y, Math.sin(a) * r * .8 + .1); m.rotation.set(rnd() * 3, rnd() * 3, 0); }
      for (let i = 0; i < 7; i++) { const t = (i - 3) / 3; ico(.18, i % 2 ? hm : hm2, head, t * .56, .72 + rnd() * .1, .78 - t * t * .17).rotation.set(rnd() * 3, rnd() * 3, 0); }
    } else {
      mesh(capGeo(d, (x, y, z) => !(z > .36 && y < .55), 1.08), hm, head);
      const b = ico(.5, hm, head, 0, .95, -.5, 1); b.scale.set(1, .8, 1); ico(.3, hm2, head, 0, 1.3, -.55, 0);
      for (const s of [-1, 1]) lock(.1, .04, 1.2, hm2, head, s * .84, .3, .2, -.05, s * .03);
      const tg = M(0xd9d2c8, { shininess: 90 }); for (let i = -2; i <= 2; i++) mesh(new T.ConeGeometry(.05, .26 - Math.abs(i) * .05, 4), tg, head, i * .16, 1.02 - Math.abs(i) * .04, .52 - Math.abs(i) * .06);
    }
  }

  // ---------- clothing textures ----------
  function weave(g, a) { for (let i = 0; i < 1800; i++) { g.fillStyle = i % 2 ? `rgba(255,255,255,${a * .5})` : `rgba(0,0,0,${a * .7})`; g.fillRect((i * 73) % 256, (i * 131) % 256, .8, 1 + (i % 3)); } g.strokeStyle = `rgba(0,0,0,${a * 2.2})`; g.lineWidth = 3; for (let i = 0; i < 9; i++) { const x = 20 + (i * 67) % 216; g.beginPath(); g.moveTo(x, 90 + (i * 31) % 60); g.quadraticCurveTo(x + 6, 170, x - 4, 250); g.stroke(); } }
  function shade(g) { const gr = g.createLinearGradient(0, 0, 256, 0); gr.addColorStop(0, 'rgba(0,0,0,.3)'); gr.addColorStop(.35, 'rgba(0,0,0,0)'); gr.addColorStop(.65, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.3)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); const g2 = g.createLinearGradient(0, 150, 0, 256); g2.addColorStop(0, 'rgba(0,0,0,0)'); g2.addColorStop(1, 'rgba(0,0,0,.18)'); g.fillStyle = g2; g.fillRect(0, 150, 256, 106); }
  const TOP = {
    coat(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256); weave(g, .05);
      g.fillStyle = o.c2; g.fillRect(96, 0, 64, 20); g.fillRect(0, 196, 256, 12);
      g.strokeStyle = 'rgba(0,0,0,.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(112, 20); g.lineTo(150, 256); g.stroke();
      g.fillStyle = o.c2; for (let y = 44; y < 190; y += 30) for (const x of [108, 148]) { g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }
      g.strokeStyle = o.c2; g.lineWidth = 2; for (const s of [-1, 1]) { g.strokeRect(128 + s * 78 - 16, 30, 32, 10); g.beginPath(); g.moveTo(128 + s * 30, 20); g.lineTo(128 + s * 60, 60); g.stroke(); }
      if (o.tie) { g.fillStyle = o.tie; g.beginPath(); g.moveTo(120, 18); g.lineTo(138, 20); g.lineTo(146, 110); g.lineTo(132, 124); g.lineTo(122, 108); g.fill(); }
      g.fillStyle = '#c9a85a'; g.fillRect(118, 194, 20, 16);
      if (o.torn) { g.strokeStyle = 'rgba(40,20,20,.8)'; g.lineWidth = 3; for (const [x, y, w] of [[60, 90, 40], [170, 140, 30], [90, 170, 50], [180, 60, 26]]) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * .4, y + 9); g.lineTo(x + w, y + 3); g.stroke(); } g.fillStyle = 'rgba(120,20,30,.5)'; g.beginPath(); g.ellipse(176, 150, 22, 30, .3, 0, 7); g.fill(); }
      shade(g);
    },
    armor(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256);
      g.fillStyle = 'rgba(255,255,255,.05)'; for (let y = 30; y < 256; y += 38) g.fillRect(0, y, 256, 16);
      g.strokeStyle = o.glow; g.lineWidth = 2.5; g.shadowColor = o.glow; g.shadowBlur = 8;
      g.beginPath(); g.moveTo(128, 0); g.lineTo(128, 256); for (let y = 46; y < 256; y += 38) { g.moveTo(40, y - 8); g.lineTo(128, y + 8); g.lineTo(216, y - 8); } g.moveTo(92, 0); g.lineTo(128, 40); g.lineTo(164, 0); g.stroke();
      g.beginPath(); g.moveTo(128, 70); g.lineTo(144, 96); g.lineTo(128, 122); g.lineTo(112, 96); g.closePath(); g.stroke(); g.shadowBlur = 0; shade(g);
    },
    tunic(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256); weave(g, .06);
      g.fillStyle = o.c2; g.fillRect(0, 0, 84, 256); g.fillRect(172, 0, 84, 256); g.fillStyle = d.skin; g.beginPath(); g.moveTo(112, 0); g.lineTo(144, 0); g.lineTo(128, 40); g.fill();
      g.strokeStyle = '#1a1210'; g.lineWidth = 2; for (let y = 44; y < 120; y += 14) { g.beginPath(); g.moveTo(120, y); g.lineTo(136, y + 10); g.moveTo(136, y); g.lineTo(120, y + 10); g.stroke(); }
      g.fillStyle = '#2a1a10'; g.fillRect(0, 196, 256, 14); g.fillStyle = '#c9a85a'; g.fillRect(120, 194, 16, 18); shade(g);
    },
    shirt(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256); weave(g, .05);
      g.fillStyle = d.skin; g.beginPath(); g.moveTo(104, 0); g.lineTo(152, 0); g.lineTo(128, 96); g.fill();
      if (o.chain) { g.strokeStyle = '#d8b25a'; g.lineWidth = 2; g.beginPath(); g.moveTo(112, 20); g.quadraticCurveTo(128, 70, 144, 20); g.stroke(); }
      g.fillStyle = o.c2; g.beginPath(); g.moveTo(96, 0); g.lineTo(128, 96); g.lineTo(104, 70); g.lineTo(84, 20); g.fill(); g.beginPath(); g.moveTo(160, 0); g.lineTo(128, 96); g.lineTo(152, 70); g.lineTo(172, 20); g.fill();
      g.strokeStyle = 'rgba(0,0,0,.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(128, 96); g.lineTo(128, 256); g.moveTo(121, 100); g.lineTo(121, 256); g.stroke();
      g.fillStyle = o.btn || '#d9c9a0'; for (let y = 116; y < 250; y += 30) { g.beginPath(); g.arc(125, y, 2.6, 0, 7); g.fill(); }
      g.strokeStyle = 'rgba(0,0,0,.25)'; g.strokeRect(150, 120, 30, 30); shade(g);
    },
    vest(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256); weave(g, .06);
      g.fillStyle = o.sh; g.beginPath(); g.moveTo(84, 0); g.lineTo(172, 0); g.lineTo(128, 178); g.fill(); g.fillRect(0, 0, 60, 256); g.fillRect(196, 0, 60, 256);
      g.fillStyle = o.c; g.fillRect(40, 60, 22, 196); g.fillRect(194, 60, 22, 196);
      g.fillStyle = '#fff'; g.beginPath(); g.moveTo(104, 0); g.lineTo(128, 34); g.lineTo(114, 46); g.lineTo(92, 6); g.fill(); g.beginPath(); g.moveTo(152, 0); g.lineTo(128, 34); g.lineTo(142, 46); g.lineTo(164, 6); g.fill();
      g.fillStyle = o.tie; g.beginPath(); g.moveTo(120, 30); g.lineTo(136, 30); g.lineTo(134, 46); g.lineTo(140, 150); g.lineTo(128, 172); g.lineTo(116, 150); g.lineTo(122, 46); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 1; for (let y = 54; y < 160; y += 9) { g.beginPath(); g.moveTo(119, y); g.lineTo(137, y + 7); g.stroke(); }
      g.fillStyle = '#c9a85a'; for (let y = 190; y < 250; y += 22) { g.beginPath(); g.arc(128, y, 3, 0, 7); g.fill(); }
      g.strokeStyle = 'rgba(0,0,0,.45)'; g.lineWidth = 2; g.beginPath(); g.moveTo(84, 0); g.lineTo(128, 178); g.lineTo(172, 0); g.moveTo(128, 178); g.lineTo(128, 256); g.stroke(); g.strokeRect(80, 200, 26, 3); g.strokeRect(150, 200, 26, 3); shade(g);
    },
    bomber(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256); weave(g, .07);
      g.fillStyle = o.tee; g.fillRect(104, 0, 48, 256);
      g.fillStyle = d.skin; g.beginPath(); g.moveTo(110, 0); g.lineTo(146, 0); g.quadraticCurveTo(128, 46, 110, 0); g.fill();
      g.strokeStyle = '#cfd3d6'; g.lineWidth = 2; g.beginPath(); g.moveTo(114, 14); g.quadraticCurveTo(128, 64, 142, 14); g.stroke();
      g.fillStyle = o.c2; g.fillRect(80, 0, 24, 30); g.fillRect(152, 0, 24, 30); g.fillRect(0, 232, 104, 24); g.fillRect(152, 232, 104, 24); g.strokeStyle = 'rgba(0,0,0,.3)'; g.lineWidth = 1; for (let x = 0; x < 256; x += 6) { g.beginPath(); g.moveTo(x, 232); g.lineTo(x, 256); g.stroke(); }
      g.strokeStyle = '#b9b9b9'; g.lineWidth = 2; g.beginPath(); g.moveTo(104, 0); g.lineTo(104, 256); g.moveTo(152, 0); g.lineTo(152, 256); g.stroke(); g.strokeStyle = 'rgba(0,0,0,.35)'; g.strokeRect(58, 150, 34, 3); g.strokeRect(164, 150, 34, 3);
      g.strokeStyle = '#3a2416'; g.lineWidth = 12; g.beginPath(); g.moveTo(176, 0); g.lineTo(70, 256); g.stroke(); shade(g);
    },
    gown(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256); weave(g, .045);
      if (o.inner) { g.fillStyle = o.inner; g.fillRect(100, 0, 56, 256); }
      if (o.plain) { g.fillStyle = d.skin; g.beginPath(); g.moveTo(100, 0); g.lineTo(156, 0); g.quadraticCurveTo(128, 56, 100, 0); g.fill(); shade(g); return; }
      if (o.high) { g.fillStyle = o.t; g.fillRect(100, 0, 56, 14); g.beginPath(); g.arc(128, 30, 6, 0, 7); g.fill(); } else { g.fillStyle = d.skin; g.beginPath(); g.moveTo(102, 0); g.lineTo(154, 0); g.quadraticCurveTo(128, 50, 102, 0); g.fill(); }
      g.strokeStyle = o.t; g.lineWidth = o.high ? 0.01 : 6; g.beginPath(); g.moveTo(98, 0); g.quadraticCurveTo(128, 60, 158, 0); g.stroke();
      g.lineWidth = 1.5; for (let i = 0; i < 9; i++) { const a = .5 + i * .27; g.beginPath(); g.arc(128, 8, 40 + (i % 2) * 5, a, a + .12); g.stroke(); }
      if (o.inner) { g.lineWidth = 7; g.beginPath(); g.moveTo(100, 20); g.lineTo(100, 256); g.moveTo(156, 20); g.lineTo(156, 256); g.stroke(); }
      g.fillStyle = o.t; for (let y = 56; y < 196; y += 20) { g.beginPath(); g.moveTo(128, y); g.lineTo(134, y + 8); g.lineTo(128, y + 16); g.lineTo(122, y + 8); g.fill(); for (const s of [-1, 1]) { g.beginPath(); g.arc(128 + s * 12, y + 8, 1.8, 0, 7); g.fill(); } }
      if (o.neck) { g.strokeStyle = '#e5c56e'; g.lineWidth = 2; g.beginPath(); g.moveTo(110, 8); g.quadraticCurveTo(128, 44, 146, 8); g.stroke(); g.fillStyle = '#e5c56e'; g.fillRect(125, 27, 6, 6); }
      shade(g);
    },
    kandura(g, o, d) {
      g.fillStyle = o.c; g.fillRect(0, 0, 256, 256); weave(g, .03);
      g.fillStyle = '#fff'; g.fillRect(104, 0, 48, 18); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(128, 18); g.lineTo(128, 150); g.stroke();
      g.strokeRect(104, 0, 48, 18); g.fillStyle = 'rgba(0,0,0,.2)'; for (let y = 34; y < 140; y += 26) { g.beginPath(); g.arc(128, y, 2, 0, 7); g.fill(); } g.strokeStyle = 'rgba(0,0,0,.18)'; g.strokeRect(150, 96, 26, 30); shade(g);
    }
  };
  function skirtTex(o) {
    return ctex(256, 512, (g) => {
      g.scale(2, 2); g.fillStyle = o.c; g.fillRect(0, 0, 128, 256); for (let i = 0; i < 500; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.06)'; g.fillRect((i * 37) % 128, (i * 91) % 256, 1, 12); }
      g.strokeStyle = 'rgba(0,0,0,.13)'; g.lineWidth = 2.5; for (let i = 0; i < 10; i++) { const x = 6 + i * 12.5; g.beginPath(); g.moveTo(x, 20); g.quadraticCurveTo(x + 3, 140, x - 2, 256); g.stroke(); }
      if (o.inner) { g.fillStyle = o.inner; g.fillRect(50, 0, 28, 256); g.fillStyle = o.t; g.fillRect(48, 0, 4, 256); g.fillRect(76, 0, 4, 256); }
      if (o.t) { g.fillStyle = o.t; g.fillRect(0, 236, 128, 8); for (let x = 2; x < 128; x += 10) { g.beginPath(); g.moveTo(x, 232); g.lineTo(x + 4, 224); g.lineTo(x + 8, 232); g.fill(); g.beginPath(); g.arc(x + 4, 218, 1.4, 0, 7); g.fill(); } if (!o.inner) for (let y = 10; y < 216; y += 20) { g.beginPath(); g.moveTo(64, y); g.lineTo(68, y + 8); g.lineTo(64, y + 16); g.lineTo(60, y + 8); g.fill(); } }
      const gr = g.createLinearGradient(0, 0, 128, 0); gr.addColorStop(0, 'rgba(0,0,0,.32)'); gr.addColorStop(.4, 'rgba(0,0,0,0)'); gr.addColorStop(.6, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.32)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 256);
    });
  }
  const OUTFIT = {
    K: {
      blue: { top: 'gown', c: '#27407a', t: '#cfd3dc', high: 1, legs: 'skirt' },
      battle: { top: 'coat', c: '#e9e1d0', c2: '#c9a85a', torn: 1, sleeve: 'long', legs: 'pants', pc: '#17171c', shoe: '#17130f', tail: 1, sword: 1 },
      night: { top: 'gown', c: '#f1ece2', plain: 1, legs: 'skirt' },
      emerald: { top: 'gown', c: '#17604e', t: '#cfd3dc', neck: 1, legs: 'skirt', up: 1 },
      riding: { top: 'tunic', c: '#7a2233', c2: '#3a2416', sleeve: 'long', sc: '#3a2416', legs: 'pants', pc: '#17171c', shoe: '#2a1c12', braid: 1, sword: 1 },
      officer: { top: 'coat', c: '#27407a', c2: '#cfd3dc', sleeve: 'long', legs: 'pants', pc: '#1b2030', shoe: '#17130f', tail: 1, sword: 1, armor: 1, pl: '#8a94a8' },
      ecoat: { top: 'coat', c: '#33363f', c2: '#9aa0aa', sleeve: 'long', legs: 'pants', pc: '#17171c', shoe: '#17130f', tail: 1, torn: 1 }
    },
    E: {
      coat: { top: 'coat', c: '#3a3d46', c2: '#9aa0aa', sleeve: 'long', legs: 'pants', pc: '#1d1e24', shoe: '#0c0c10', tail: 1, gloves: 0x111114, sword: 1 },
      armor: { top: 'armor', c: '#15151b', glow: '#b9c4e6', sleeve: 'long', sc: '#1b1b22', legs: 'pants', pc: '#15151b', shoe: '#0c0c10', armor: 1, pl: '#22222a', sword: 1 },
      formal: { top: 'coat', c: '#111116', c2: '#c9ced8', sleeve: 'long', legs: 'pants', pc: '#111116', shoe: '#0c0c10', tail: 1, gloves: 0x111114 },
      shirt: { top: 'shirt', c: '#17171c', c2: '#24242b', btn: '#555555', sleeve: 'roll', legs: 'pants', pc: '#17171c', shoe: '#0c0c10' }
    },
    R: {
      cream: { top: 'coat', c: '#efe6d2', c2: '#c9a85a', tie: '#d9b25a', sleeve: 'long', legs: 'pants', pc: '#2b3040', shoe: '#3a2416', tail: 1 },
      train: { top: 'shirt', c: '#e9e1cf', c2: '#f7f1e3', btn: '#8a7a5a', sleeve: 'roll', legs: 'pants', pc: '#3b3027', shoe: '#3a2416' }
    },
    V: { white: { top: 'gown', c: '#f3f0ec', t: '#d9d2c8', legs: 'skirt', gloves: 0xf4efe6, stone: 1, high: 1 } }
  };

  const SIT = { lg: -1.5, kn: 1.5, dy: 1 };
  const POSE = {
    stand: { aLo: .07, aRo: .07, aLx: .03, aRx: -.02, eL: -.12, eR: -.16 },
    cup: { aRx: -.55, aRt: .35, eR: -1.75, aLo: .07, eL: -.1 },
    reach: { aRx: -1.05, eR: -.35, aLo: .07, tx: .06 },
    offer: { aRx: -.75, eR: -.9, aLx: -.75, eL: -.9, aRt: .2, aLt: .2 },
    give: { aRx: -.85, eR: -.75, aRt: .15, aLo: .07, eL: -.12, tx: .04 },
    cross: { aLx: -.32, aRx: -.3, aLt: 1.15, aRt: 1.2, eL: -1.7, eR: -1.55, aLo: .05, aRo: .05 },
    pocket: { aLo: .12, aRo: .12, eL: -.45, eR: -.45, aLx: .14, aRx: .14, aLt: .3, aRt: .3 },
    hip: { aRo: .5, aRx: .25, eR: -1.5, aRt: -.9, aLo: .07, eL: -.12, hz: .06 },
    shy: { aLx: -.28, aRx: -.28, aLt: .75, aRt: .75, eL: -.85, eR: -.85, hx: .2, hz: .08 },
    think: { aRx: -.45, aRt: .6, eR: -2.25, aLx: -.3, aLt: 1.1, eL: -1.6, hz: -.06 },
    cover: { aRx: -.5, aRt: .55, eR: -2.35, aLo: .07, eL: -.2, hx: .05 },
    touch: { aRx: -1.2, aRt: .15, eR: -.75, tx: .08, aLo: .07 },
    hold: { aRx: -.6, eR: -1.0, aRt: .35, tx: .05, aLo: .07 },
    handR: { aRx: -.55, eR: -.7, aRt: .1, aLo: .07, eL: -.12 },
    handL: { aLx: -.55, eL: -.7, aLt: .1, aRo: .07, eR: -.12 },
    lean: { tx: .15, aLo: .07, aRo: .07, hx: -.06 },
    embrace: { aLx: -1.0, aRx: -1.0, aLt: .35, aRt: .35, eL: -.6, eR: -.6, tx: .1 },
    hug: { aLx: -.95, aRx: -.95, aLt: .7, aRt: .7, eL: -1.0, eR: -1.0, tx: .12, hx: .12, hl: .12 },
    fist: { eL: -.55, eR: -.55, aLo: .12, aRo: .12, tx: .05, hx: .08 },
    down: { hx: .32, aLo: .06, aRo: .06, tx: .05 },
    shoot: { aRx: -1.25, aRt: .5, eR: -1.9, aLx: -1.2, aLt: .5, eL: -1.85, hx: .05 },
    read: { aRx: -.5, aRt: .3, eR: -1.5, aLx: -.5, aLt: .3, eL: -1.5, hx: .22 },
    point: { aRx: -1.35, eR: -.1, aLo: .07, tx: .04 },
    wave: { aRo: 2.5, eR: -.5, aLo: .07, eL: -.12 },
    pour: { aRx: -.7, eR: -.55, aRt: .1, aLx: -.45, eL: -1.3, aLt: .4, tx: .1, hx: .12 },
    back: { aLo: .07, aRo: .07, hx: .1 },
    guard: { aRx: -.95, eR: -.55, aRt: .1, aLo: .12, eL: -.3, tx: .06 },
    strike: { aRx: -2.2, eR: -.3, aLx: -.5, eL: -.6, tx: .14 },
    kneel: { dy: 1, lg: -.3, kn: 1.6, aLo: .08, aRo: .08, tx: .05 },
    fall: { dy: 1, lg: -.3, kn: 1.6, tx: .38, hx: .4, aLx: -.4, aRx: -.4, eL: -.5, eR: -.5 },
    kneelreach: { dy: 1, lg: -.3, kn: 1.6, aRx: -1.1, eR: -.5, aLx: -.9, eL: -.6, tx: .12 },
    chest: { aRx: -.5, aRt: .7, eR: -2.0, aLx: -.5, aLt: .7, eL: -2.0, hx: .1 },
    bow: { tx: .3, hx: .35, aLo: .06, aRo: .06 },
    sit: Object.assign({ aLx: -.38, aRx: -.38, eL: -1.0, eR: -1.0, aLt: .25, aRt: .25 }, SIT),
    sitcup: Object.assign({ aRx: -.6, aRt: .35, eR: -1.8, aLx: -.38, eL: -1.0, aLt: .25 }, SIT),
    sitlean: Object.assign({ tx: .2, aLx: -.5, aRx: -.5, eL: -1.1, eR: -1.1, aLt: .3, aRt: .3, hx: -.1 }, SIT),
    sitreach: Object.assign({ tx: .12, aRx: -1.0, eR: -.5, aLx: -.38, eL: -1.0, aLt: .25 }, SIT),
    sitclose: Object.assign({ ln: .2, hl: .22, aLx: -.38, aRx: -.38, eL: -1.0, eR: -1.0, aLt: .3, aRt: .3 }, SIT),
    sitread: Object.assign({ aRx: -.55, aRt: .3, eR: -1.5, aLx: -.55, aLt: .3, eL: -1.5, hx: .25 }, SIT),
    sitdown: Object.assign({ hx: .34, tx: .12, aLx: -.45, aRx: -.45, eL: -1.0, eR: -1.0, aLt: .4, aRt: .4 }, SIT),
    drive: Object.assign({ aLx: -1.05, aRx: -1.05, eL: -.4, eR: -.4, aLt: .2, aRt: .2 }, SIT)
  };
  const Sn = u => Math.sin(Math.PI * u);
  const ACTS = {
    nod: [.7, u => ({ hx: Math.sin(u * 6.28) * .16 })], shake: [.9, u => ({ hy: Math.sin(u * 12.56) * .24 * (1 - u) })],
    flinch: [.6, u => ({ tx: -.16 * Sn(u), hx: -.1 * Sn(u), aLx: -.3 * Sn(u), aRx: -.3 * Sn(u), _x: -.14 * Sn(u) })],
    laugh: [1.3, u => ({ hx: -.12 * Sn(u) + Math.sin(u * 40) * .03, tx: -.05 * Sn(u), _y: Math.abs(Math.sin(u * 25)) * .012 })],
    sigh: [1.5, u => ({ tx: .08 * Sn(u), hx: .16 * Sn(u), aLo: -.03 * Sn(u) })], bowhead: [1.4, u => ({ hx: .36 * Sn(u), tx: .12 * Sn(u) })],
    stepback: [.9, u => ({ _x: -.3 * Sn(u), tx: -.06 * Sn(u) })], stepin: [.9, u => ({ _x: .22 * Sn(u), tx: .06 * Sn(u) })],
    shove: [.55, u => ({ aLx: -1.3 * Sn(u), aRx: -1.3 * Sn(u), eL: .5 * Sn(u), eR: .5 * Sn(u), tx: .16 * Sn(u), _x: .08 * Sn(u) })],
    wipe: [1.1, u => ({ aRx: -.6 * Sn(u), eR: -1.7 * Sn(u), aRt: .6 * Sn(u), hy: -.2 * Sn(u) })],
    slash: [.6, u => ({ aRx: -2.3 * Math.cos(u * 1.57) * Sn(Math.min(1, u * 1.3)), eR: -.4 * Sn(u), tx: .26 * Sn(u), _ry: -.6 * Sn(u), _x: .12 * Sn(u) })],
    spin: [1.5, u => ({ _ry: u * 6.283, aLo: .5 * Sn(u), aRo: .5 * Sn(u) })], turnaway: [1.6, u => ({ _ry: 1.7 * Sn(u), hx: .1 * Sn(u) })],
    tremble: [1.6, u => ({ aRx: Math.sin(u * 90) * .05, aLx: Math.sin(u * 80) * .05, hx: Math.sin(u * 70) * .025, tx: Math.sin(u * 60) * .015 })],
    reach: [1.3, u => ({ aRx: -1.15 * Sn(u), eR: -.45 * Sn(u), tx: .08 * Sn(u) })], pullback: [.5, u => ({ aRx: .3 * Sn(u), eR: -.6 * Sn(u), _x: -.06 * Sn(u) })],
    stumble: [.9, u => ({ tx: .3 * Sn(u), _y: -.08 * Sn(u), hx: .2 * Sn(u) })], tilt: [1.1, u => ({ hz: .18 * Sn(u) })], lookaway: [1.6, u => ({ hy: -.5 * Sn(u), hx: .08 * Sn(u) })],
    shrug: [.8, u => ({ aLo: .22 * Sn(u), aRo: .22 * Sn(u), eL: -.5 * Sn(u), eR: -.5 * Sn(u), hz: .08 * Sn(u) })], gasp: [.7, u => ({ tx: -.1 * Sn(u), hx: -.14 * Sn(u), _y: .02 * Sn(u), aLx: -.2 * Sn(u), aRx: -.2 * Sn(u) })],
    talk1: [1.2, u => ({ aRx: -.34 * Sn(u), eR: -.75 * Sn(u), aRt: .2 * Sn(u) })], talk2: [1.2, u => ({ aLx: -.3 * Sn(u), eL: -.7 * Sn(u), hz: .06 * Sn(u) })], shift: [2.2, u => ({ tz: .05 * Sn(u), hz: -.05 * Sn(u) })],
    clench: [1.2, u => ({ eL: -.5 * Sn(u), eR: -.5 * Sn(u), aLo: .08 * Sn(u), aRo: .08 * Sn(u), tx: .04 * Sn(u) })], lean: [1.4, u => ({ tx: .16 * Sn(u), hx: -.08 * Sn(u), _x: .06 * Sn(u) })]
  };
  O.ACTS = ACTS;
  const JOINTS = ['tx', 'tz', 'hx', 'hy', 'hz', 'aLx', 'aLo', 'aLt', 'eL', 'aRx', 'aRo', 'aRt', 'eR', 'lg', 'kn', 'dy', 'ln', 'hl'];

  // ---------- props held in the right hand ----------
  function makeProp(n) {
    const g = new T.Group(), gold = M(0xd9b25a, { shininess: 70, specular: 0x8a6a2a }), B = (c) => new T.MeshBasicMaterial({ color: c });
    if (n === 'cup') { cyl(.03, .022, .065, 8, M(0xf4efe6, { shininess: 40 }), g, 0, .03, .02); cyl(.026, .026, .004, 8, M(0x5a341c), g, 0, .06, .02); }
    else if (n === 'box') { box(.11, .07, .11, M(0x15151a, { shininess: 30 }), g, 0, .035, .02); box(.115, .012, .03, gold, g, 0, .072, .02); box(.03, .012, .115, gold, g, 0, .072, .02); ico(.018, gold, g, 0, .085, .02); }
    else if (n === 'flowers') { const w = mesh(new T.ConeGeometry(.07, .2, 6, 1, true), M(0xefe6d4, { side: T.DoubleSide }), g, 0, .05, .02); w.rotation.x = Math.PI; for (let i = 0; i < 7; i++) ico(.03, M(i % 3 ? 0xffffff : 0xf0c3c9), g, Math.cos(i) * .04, .17 + (i % 2) * .02, .02 + Math.sin(i) * .04); for (let i = 0; i < 4; i++) ico(.022, M(0x3a6a3a), g, Math.cos(i * 1.6) * .06, .14, .02 + Math.sin(i * 1.6) * .06); }
    else if (n === 'camera') { box(.13, .085, .06, M(0x1b1b1f, { shininess: 30 }), g, 0, .05, .03); const l = cyl(.03, .034, .05, 10, M(0x2a2a30, { shininess: 60 }), g, 0, .05, .08); l.rotation.x = Math.PI / 2; box(.04, .02, .03, M(0x2a2a30), g, -.03, .1, .03); }
    else if (n === 'book') { box(.15, .2, .034, M(0x3a2618), g, 0, .1, .03); box(.14, .19, .026, M(0xe6dcc0), g, .006, .1, .03); box(.152, .202, .008, M(0x2a1a10), g, 0, .1, .05); box(.06, .02, .002, gold, g, 0, .15, .055); }
    else if (n === 'key') { cyl(.012, .012, .004, 8, gold, g, 0, .04, .03).rotation.x = Math.PI / 2; box(.008, .05, .004, gold, g, 0, .07, .03); box(.016, .008, .004, gold, g, .008, .088, .03); }
    else if (n === 'phone') { box(.07, .14, .01, M(0x15151a, { shininess: 60 }), g, 0, .08, .03); box(.062, .125, .002, B(0xbfd6ff), g, 0, .08, .0365); }
    else if (n === 'card' || n === 'photo' || n === 'letter' || n === 'paper') { const w = n === 'letter' ? .16 : n === 'paper' ? .15 : .11, h = n === 'paper' ? .2 : n === 'photo' ? .09 : .075; box(w, h, .004, M(n === 'photo' ? 0xf6f1e6 : 0xfbf3df), g, 0, .03 + h / 2, .03); if (n === 'photo') box(w - .02, h - .03, .002, B(0x2a1c18), g, 0, .04 + h / 2, .033); if (n === 'letter') box(.03, .03, .002, B(0x8e1f26), g, 0, .03 + h / 2, .033); }
    else if (n === 'bottle') { box(.05, .07, .028, new T.MeshPhongMaterial({ color: 0xe8c878, shininess: 100, transparent: true, opacity: .88, flatShading: true }), g, 0, .045, .03); box(.02, .02, .02, gold, g, 0, .09, .03); ico(.014, gold, g, 0, .108, .03); }
    else if (n === 'dallah') { cyl(.04, .07, .09, 8, gold, g, 0, .045, .03); cyl(.03, .04, .07, 8, gold, g, 0, .125, .03); mesh(new T.ConeGeometry(.04, .08, 8), gold, g, 0, .2, .03); const sp = box(.018, .026, .1, gold, g, 0, .15, .1); sp.rotation.x = -.5; }
    else if (n === 'bangle') { mesh(new T.TorusGeometry(.032, .005, 5, 12), M(0xd8dde2, { shininess: 90 }), g, 0, .05, .03); ico(.008, B(0x3f7ad8), g, 0, .082, .03); }
    else if (n === 'sword') { box(.032, .86, .008, M(0xdfe4ea, { shininess: 100, specular: 0xffffff }), g, 0, .5, .03); box(.14, .022, .03, M(0xcfd3dc, { shininess: 90 }), g, 0, .07, .03); box(.026, .12, .026, M(0x3a2416), g, 0, .0, .03); }
    else if (n === 'blade') { box(.03, .34, .008, M(0xf0e8e0, { shininess: 100, specular: 0xffffff }), g, 0, .24, .03); box(.1, .02, .03, new T.MeshBasicMaterial({ color: 0xd0202c }), g, 0, .07, .03); box(.024, .1, .024, M(0xe6e3ec), g, 0, .01, .03); }
    else if (n === 'ring') { mesh(new T.TorusGeometry(.018, .005, 5, 12), gold, g, 0, .05, .03); }
    else if (n === 'bluecup') { cyl(.034, .026, .07, 8, M(0x3f6fb8, { shininess: 50 }), g, 0, .035, .02); const h = mesh(new T.TorusGeometry(.022, .005, 4, 8, 3.2), M(0xdfe4ea, { shininess: 100 }), g, .04, .035, .02); h.rotation.z = -1.6; }
    else if (n === 'cloth') { box(.09, .012, .09, M(0xf4efe6), g, 0, .05, .03); }
    else if (n === 'sign') { box(.34, .1, .012, gold, g, 0, .08, .03); box(.3, .06, .004, M(0x8a6a2a), g, 0, .08, .038); }
    return g;
  }

  function build(id, outfitName) {
    const d = DEF[id], o = (OUTFIT[id] || {})[outfitName] || Object.values(OUTFIT[id])[0];
    const c = { id, d, o, g: new T.Group(), expr: 'neutral', pose: 'stand', pt: {}, pc: {}, talkOn: false, blinkT: 2 + Math.random() * 3, phase: Math.random() * 6, lookY: 0, lookYc: 0, gaze: 0, walk: 0, side: 1, prop: null };
    JOINTS.forEach(j => (c.pt[j] = c.pc[j] = 0));
    const s = d.h / 1.8, body = grp(c.g); body.scale.setScalar(s); c.s = s;
    let skin = M(d.skin, { shininess: 12, specular: 0x221a14 }); const hips = (c.hips = grp(body, 0, .94, 0)), torso = (c.torso = grp(hips));
    const satin = d.fem ? { shininess: 28, specular: 0x33303a } : {};
    // torso
    const tt = ctex(512, 512, g => { g.scale(2, 2); TOP[o.top](g, o, d); }); tt.magFilter = T.LinearFilter;
    const tm = M(0xffffff, Object.assign({ map: tt }, satin));
    const prof = d.fem ? [[.118, 0], [.098, .13], [.102, .23], [.134, .35], [.142, .44], [.138, .485], [.085, .535], [.05, .56]] : (o.narrow ? [[.178, 0], [.182, .2], [.2, .34], [.222, .43], [.23, .49], [.13, .54], [.085, .565]] : [[.168, 0], [.166, .14], [.186, .3], [.222, .42], [.234, .49], [.13, .54], [.085, .565]]);
    const lathe = mesh(new T.LatheGeometry(prof.map(p => new T.Vector2(p[0], p[1])), 12), tm, torso); lathe.rotation.y = Math.PI; lathe.scale.z = d.fem ? .7 : .62;
    const cm = M(o.sh || o.c2 || o.c, satin);
    if (o.top === 'shirt' || o.top === 'vest') for (const sd of [-1, 1]) { const cl = box(.075, .045, .02, o.top === 'vest' ? M(0xffffff) : cm, torso, sd * .052, .565, .06); cl.rotation.set(-.5, sd * -.5, sd * .5); }
    if (o.top === 'vest') box(.03, .03, .02, M(o.tie), torso, 0, .545, .075);
    if (o.top === 'bomber') { const t = mesh(new T.TorusGeometry(.085, .022, 5, 12), M(o.c2), torso, 0, .555, -.005); t.rotation.x = Math.PI / 2; t.scale.y = .8; }
    if (o.top === 'kandura') { cyl(.066, .072, .04, 10, M(0xffffff), torso, 0, .57, 0); cyl(.006, .006, .16, 4, M(0xe9e4d8), torso, .012, .47, .145); }
    if (o.top === 'gown' && o.neck) { const n = mesh(new T.TorusGeometry(.062, .004, 4, 16), M(0xe5c56e, { shininess: 80 }), torso, 0, .535, .03); n.rotation.x = 1.25; ico(.011, M(0xe5c56e, { shininess: 80 }), torso, 0, .5, .094); }
    if (o.jacket) { const jm = M(o.c); for (const sd of [-1, 1]) { const l = box(.075, .3, .018, jm, torso, sd * .105, .33, .135); l.rotation.z = sd * .14; l.rotation.x = -.1; } }
    if (d.fem && o.top === 'gown') { const b = cyl(.106, .104, .03, 12, M(new T.Color(o.t).getHex(), { shininess: 70, specular: 0x554422 }), torso, 0, .15, 0); b.scale.z = .76; }
    cyl(d.fem ? .04 : .06, d.fem ? .048 : .072, .1, 8, skin, torso, 0, .585, 0);
    // head
    const hp = (c.headP = grp(torso, 0, .6, .008)), head = (c.head = grp(hp, 0, d.R * .98, .012)); head.scale.setScalar(d.R);
    c.fc = document.createElement('canvas'); c.fc.width = c.fc.height = 512; c.fg = c.fc.getContext('2d');
    c.ft = new T.CanvasTexture(c.fc); c.ft.magFilter = T.LinearFilter; c.ft.minFilter = T.LinearFilter; c.ft.generateMipmaps = false;
    mesh(headGeo(d), M(0xffffff, { map: c.ft, shininess: 10, specular: 0x1a1410, flatShading: false }), head);
    mesh(noseGeo(), M(tint(d.skin, .96).getHex(), { shininess: 10 }), head, 0, -.2, .81).scale.set(d.fem ? .6 : .95, d.fem ? .72 : 1.02, d.fem ? .6 : 1.0);
    for (const sd of [-1, 1]) { const e = ico(.16, M(d.skinD), head, sd * .8, -.04, -.04); e.scale.set(.4, 1, .7); }
    buildHair(c, head);
    if (d.fem && !d.cover) { const gm = M(0xe5c56e, { shininess: 80, specular: 0x886622 }); for (const sd of [-1, 1]) { mesh(new T.OctahedronGeometry(.06), gm, head, sd * .8, -.34, .06); ico(.035, gm, head, sd * .8, -.46, .06); } }
    // arms
    const sc = o.sc || o.c, sm = M(sc, satin), ar = d.arm; c.sh = {}; c.el = {}; c.hand = {};
    for (const sd of ['L', 'R']) {
      const sx = sd === 'L' ? 1 : -1, sh = grp(torso, sx * d.sh, .452, 0); sh.rotation.order = 'ZXY'; c.sh[sd] = sh;
      const long = !o.sleeve || o.sleeve === 'long';
      const dl = ico(ar * 1.0, sm, sh, 0, -.01, 0, 1); dl.scale.y = 1.1;
      cyl(ar * 1.06, ar * .9, .29, 8, sm, sh, 0, -.145, 0);
      const el = grp(sh, 0, -.29, 0); c.el[sd] = el; ico(ar * .9, sm, el, 0, 0, 0, 0);
      const fm = long ? sm : (o.scar && sd === 'L' ? M(0xe3b3a6) : skin);
      if (d.fem && long) { cyl(ar * .88, ar * 1.22, .25, 8, sm, el, 0, -.125, 0); cyl(ar * 1.24, ar * 1.26, .018, 8, M(new T.Color(o.t || o.c).getHex(), { shininess: 70 }), el, 0, -.245, 0); }
      else cyl(ar * .88, ar * .68, .25, 8, fm, el, 0, -.125, 0);
      if (o.scar && sd === 'L') for (let i = 0; i < 5; i++) box(.028, .04, .012, M(i % 2 ? 0xf0d2c8 : 0xc98f84), el, (i % 2 ? 1 : -1) * ar * .3, -.04 - i * .045, ar * .6);
      if (!long) cyl(ar * 1.08, ar * 1.04, .05, 8, sm, el, 0, -.015, 0);
      if (long && !d.fem && !o.narrow) cyl(ar * .78, ar * .76, .035, 8, M(o.sh || tint(sc, 1.25).getHex()), el, 0, -.245, 0);
      const hs = d.fem ? .8 : 1, hand = grp(el, 0, -.265, 0); c.hand[sd] = hand; const skinB = skin; if (o.gloves !== undefined) skin = M(o.gloves, { shininess: 20 });
      box(.068 * hs, .075 * hs, .027 * hs, skin, hand, 0, -.038 * hs, 0);
      for (let i = 0; i < 4; i++) { const f = box(.0152 * hs, .058 * hs * [.92, 1.04, 1, .82][i], .017 * hs, skin, hand, (-.0258 + i * .0172) * hs * sx, -.1 * hs, .006); f.rotation.x = -.28 - i * .04; }
      const th = box(.018 * hs, .05 * hs, .02 * hs, skin, hand, sx * -.043 * hs, -.05 * hs, .013); th.rotation.z = sx * -.6;
      skin = skinB; if (o.armor) { const pa = ico(ar * 1.6, M(new T.Color(o.pl).getHex(), { shininess: 60, specular: 0x666677 }), sh, sx * .02, .03, 0, 0); pa.scale.set(1.1, .7, 1.1); cyl(ar * 1.0, ar * .9, .12, 6, M(new T.Color(o.pl).getHex(), { shininess: 60, specular: 0x666677 }), el, 0, -.16, 0); }
      if (o.beads && sd === 'R') { const bd = grp(el, 0, -.235, 0); for (let i = 0; i < 10; i++) ico(.011, M(0x9a1f28, { shininess: 60 }), bd, Math.cos(i * .628) * ar * .78, 0, Math.sin(i * .628) * ar * .78); box(.04, .035, .004, M(0xb5665a), hand, 0, -.04, .016); }
      if (o.watch && sd === 'L') { mesh(new T.TorusGeometry(ar * .76, .012, 4, 10), M(0x3a2416), el, 0, -.24, 0).rotation.x = Math.PI / 2; box(.03, .03, .012, M(0xd8b25a, { shininess: 80 }), el, 0, -.24, ar * .74); }
      if (id === 'K' && sd === 'L') mesh(new T.TorusGeometry(ar * 1.3, .007, 4, 12), M(0xe5c56e, { shininess: 80 }), el, 0, -.215, 0).rotation.x = Math.PI / 2;
      if (o.ring && sd === 'R') { box(.018, .012, .02, M(0xd9b25a, { shininess: 80 }), hand, .009, -.085, .014); ico(.008, new T.MeshBasicMaterial({ color: 0xc4202c }), hand, .009, -.085, .026); }
      if (sd === 'R') { c.propG = grp(hand, 0, -.075 * hs, .03); if (o.cane) { c.caneG = grp(hand, 0, -.07, .02); cyl(.012, .013, .86, 6, M(0x4a2f1c, { shininess: 30 }), c.caneG, 0, -.38, 0); cyl(.016, .016, .1, 6, M(0x8a6a2a, { shininess: 60 }), c.caneG, 0, .04, 0).rotation.x = Math.PI / 2; } }
    }
    if (o.tail) { const tm2 = M(o.c, satin); const bk = box(.34, .5, .025, tm2, hips, 0, -.2, -.105); bk.rotation.x = .06; for (const sx of [-1, 1]) { const sp = box(.03, .48, .2, tm2, hips, sx * .168, -.2, -.01); sp.rotation.z = sx * -.05; const fr = box(.13, .46, .02, tm2, hips, sx * .1, -.2, .1); fr.rotation.x = -.06; } }
    if (o.sword) { const sg = grp(hips, .19, .02, -.02); sg.rotation.set(.5, 0, .12); box(.035, .78, .018, M(0x1a1410, { shininess: 30 }), sg, 0, -.36, 0); box(.12, .02, .03, M(0xcfd3dc, { shininess: 90 }), sg, 0, .04, 0); box(.026, .13, .026, M(0x3a2416), sg, 0, .11, 0); c.scab = sg; }
    if (o.stone) { ico(.022, new T.MeshBasicMaterial({ color: 0xd0202c }), torso, 0, .5, .105); }
    if (tm.map && o.glow) { tm.emissive = new T.Color(0x555566); tm.emissiveMap = tm.map; }
    // legs
    c.legs = [];
    if (o.legs === 'pants') {
      const pm = M(o.pc), shm = M(o.shoe, { shininess: 40, specular: 0x333333 });
      cyl(.172, .16, .16, 12, pm, hips, 0, .02, 0).scale.z = .68;
      if (!o.jacket) { const bl = cyl(.172, .172, .034, 12, M(0x1c140e, { shininess: 30 }), hips, 0, .085, 0); bl.scale.z = .69; box(.04, .03, .012, M(0xc9a85a, { shininess: 80 }), hips, 0, .085, .12); }
      for (const sx of [1, -1]) {
        const hp2 = grp(hips, sx * .092, 0, 0), kn = grp(hp2, 0, -.44, 0);
        cyl(.092, .07, .46, 8, pm, hp2, 0, -.22, 0); ico(.068, pm, kn, 0, 0, 0); cyl(.068, .052, .42, 8, pm, kn, 0, -.21, 0);
        box(.094, .05, .2, shm, kn, 0, -.45, .03); box(.09, .04, .09, shm, kn, 0, -.455, .15).rotation.x = .25; box(.098, .016, .27, M(0x0f0d0c), kn, 0, -.482, .05); c.legs.push({ hp: hp2, kn, sx });
      }
    } else {
      const st = skirtTex(o); st.magFilter = T.LinearFilter; const km = M(0xffffff, Object.assign({ map: st }, satin)), hp2 = grp(hips), kn = grp(hp2, 0, -.44, 0);
      const r0 = d.fem ? .13 : .178, r1 = d.fem ? .2 : .19, r2 = d.fem ? .285 : .215;
      const a = cyl(r0, r1, .47, 12, km, hp2, 0, -.215, 0); a.scale.z = .76; a.rotation.y = Math.PI;
      const b = cyl(r1, r2, .48, 12, km, kn, 0, -.23, 0); b.scale.z = .76; b.rotation.y = Math.PI;
      for (const sx of [1, -1]) box(.07, .045, .17, M(d.fem ? 0xd9b866 : 0x4a3524, { shininess: 40 }), kn, sx * .07, -.47, .12);
      c.legs.push({ hp: hp2, kn, sx: 0 });
    }
    if (o.cam) { c.camG = grp(torso, .17, .08, .13); c.camG.add(makeProp('camera')); c.camG.children[0].position.set(0, -.05, -.03); }
    const sh = mesh(new T.CircleGeometry(.3, 14), new T.MeshBasicMaterial({ color: 0, transparent: true, opacity: .22, depthWrite: false }), c.g, 0, .012, 0); sh.rotation.x = -Math.PI / 2; sh.castShadow = sh.receiveShadow = false; c.shadow = sh;
    c.setExpr = function (n) { if (EX[n]) c.expr = n; c.dirty = true; };
    c.setPose = function (n) { const p = POSE[n] || POSE.stand; c.pose = POSE[n] ? n : 'stand'; JOINTS.forEach(j => (c.pt[j] = p[j] || 0)); if (c.pose === 'cup' || c.pose === 'sitcup') { if (!c.prop) c.setProp('cup', true); } else if (c.autoProp) c.setProp(null); };
    c.setProp = function (n, auto) { while (c.propG.children.length) c.propG.remove(c.propG.children[0]); c.prop = null; c.autoProp = false; if (c.camG) c.camG.visible = n !== 'camera'; if (n && n !== 'none') { const p = makeProp(n); p.scale.setScalar(1 / s); c.propG.add(p); c.prop = n; c.autoProp = !!auto; } };
    c.fx = {}; c.setFx = function (n, on) { if (c.fx[n]) { c.fx[n].parent.remove(c.fx[n]); delete c.fx[n]; } if (!on) return; const g = new T.Group(); c.fx[n] = g;
      if (n === 'shadow') { const bm = new T.MeshBasicMaterial({ color: 0x06060c, transparent: true, opacity: .72, depthWrite: false }); g.userData.t = []; for (let i = 0; i < 9; i++) { const a = (i / 8 - .5) * 2.4, l = lock(.05, .004, .6 + (i % 3) * .3, bm, g, Math.sin(a) * .2, .42, -.14, 0, 0, 4); l.rotation.set(Math.PI + .55, 0, 0); l.userData.a = a; l.castShadow = false; g.userData.t.push(l); } O.sx.glow(0x6a5a9a, 1.4, g, 0, .5, -.25, .3); torso.add(g); }
      else if (n === 'mark') { const m = mesh(new T.TorusGeometry(d.arm * .85, .008, 4, 12), new T.MeshBasicMaterial({ color: 0xff5a6a }), g, 0, -.2, 0); m.rotation.x = Math.PI / 2; m.castShadow = false; O.sx.glow(0xff4a5a, .28, g, 0, -.2, 0, .9); c.el.L.add(g); }
      else if (n === 'aura') { g.userData.s = O.sx.glow(0x9fc4ff, 1.5, g, 0, .35, 0, .45); torso.add(g); } };
    c.snap = function () { JOINTS.forEach(j => (c.pc[j] = c.pt[j])); };
    c.rootRy = 0; c.rootX = 0; c.idleT = 3 + Math.random() * 4; c.act = function (n) { const a = ACTS[n]; if (a) c._act = { f: a[1], d: a[0], t: 0 }; };
    c.headPos = function (v) { return c.head.getWorldPosition(v || new T.Vector3()); };
    c.update = function (dt, t) {
      const k = Math.min(1, dt * 5.5); JOINTS.forEach(j => (c.pc[j] += (c.pt[j] - c.pc[j]) * k));
      c.lookYc += (c.lookY - c.lookYc) * Math.min(1, dt * 4);
      let add = null; if (c._act) { c._act.t += dt; const u = c._act.t / c._act.d; if (u >= 1) c._act = null; else add = c._act.f(u); }
      else if (c.idle !== false) { c.idleT -= dt; if (c.idleT < 0) { c.idleT = 3.5 + Math.random() * 5; if (c.pose === 'stand' || c.pose === 'sit') c.act(c.talkOn ? (Math.random() < .5 ? 'talk1' : 'talk2') : ['tilt', 'shift', 'lookaway', 'nod'][Math.floor(Math.random() * 4)]); } }
      if (c.talkOn && !c._wasTalk && !c._act && c.pose === 'stand' && Math.random() < .5) c.act(Math.random() < .5 ? 'talk1' : 'talk2'); c._wasTalk = c.talkOn;
      const p = add ? Object.assign({}, c.pc) : c.pc; if (add) for (const j in add) if (j[0] !== '_') p[j] = (p[j] || 0) + add[j]; c.rootRy = add && add._ry || 0; c.rootX = add && add._x || 0;
      const br = Math.sin(t * 1.5 + c.phase), w = c.walk, ws = Math.sin(t * 9 + c.phase) * w;
      hips.position.y = .94 - p.dy * .44 + Math.abs(ws) * .02 + (add && add._y || 0);
      torso.rotation.set(p.tx + br * .006, 0, p.tz - p.ln * c.side + Math.sin(t * .6 + c.phase) * .012);
      torso.scale.y = 1 + br * .006;
      hp.rotation.set(p.hx + Math.sin(t * .9 + c.phase) * .015 + (c.talkOn ? Math.sin(t * 7) * .012 : 0), p.hy + c.lookYc, p.hz - p.hl * c.side);
      c.sh.L.rotation.set(p.aLx + ws * .35, -p.aLt, p.aLo + br * .008); c.sh.R.rotation.set(p.aRx - ws * .35, p.aRt, -p.aRo - br * .008);
      c.el.L.rotation.x = p.eL; c.el.R.rotation.x = p.eR;
      c.legs.forEach(l => { l.hp.rotation.x = p.lg + (l.sx ? l.sx * ws * .5 : ws * .12); l.hp.rotation.z = l.sx * .03 * (1 - p.dy); l.kn.rotation.x = p.kn + (l.sx ? Math.max(0, -l.sx * ws) * .5 : 0); });
      c.shadow.scale.setScalar(1 + p.dy * .3);
      if (c.fx.shadow) c.fx.shadow.userData.t.forEach((l, i) => { l.rotation.z = -l.userData.a * .75 + Math.sin(t * (2 + i % 3) + i) * .22; l.rotation.x = Math.PI + .55 + Math.sin(t * 1.7 + i) * .15; l.scale.y = 1 + Math.sin(t * 3.1 + i * 1.7) * .3; }); if (c.fx.aura) c.fx.aura.userData.s.scale.setScalar(1.4 + Math.sin(t * 4) * .2);
      const up = -(p.aRx + p.eR + p.tx); c.propG.rotation.x = up;
      if (c.caneG) { c.caneG.rotation.x = up; c.caneG.visible = p.dy < .5 && p.aRx > -.45 && !c.prop; }
      c.blinkT -= dt; let bl = false; if (c.blinkT < .12) { bl = true; if (c.blinkT < 0) { c.blinkT = 2.2 + Math.random() * 3.5; c.dirty = true; } }
      const tk = c.talkOn ? (Math.floor(t * 9) % 3) * .22 : 0, gz = Math.round(c.gaze * 2) / 2;
      if (c.dirty || bl !== c._bl || tk !== c._tk || gz !== c._gz) { paintFace(c.fg, d, c.expr, bl, tk, gz); c.ft.needsUpdate = true; c._bl = bl; c._tk = tk; c._gz = gz; c.dirty = false; }
    };
    c.setExpr('neutral'); c.setPose('stand'); c.snap();
    return c;
  }
  O.buildChar = build; O.OUTFIT = OUTFIT; O.POSE = POSE; O.EX = EX; O.makeProp = makeProp;
})();

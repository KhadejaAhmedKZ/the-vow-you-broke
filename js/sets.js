// Only You, Khadeja — low-poly locations
(function () {
  const T = THREE, O = window.OYK, { M, mesh, box, cyl, grp, ctex } = O.u;
  let sd = 11; const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
  function rep(t, x, y) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(x, y); return t; }
  function basic(o) { return new T.MeshBasicMaterial(o); }
  function plane(w, h, m, p, x, y, z, rx) { const o = mesh(new T.PlaneGeometry(w, h), m, p, x, y, z); if (rx !== undefined) o.rotation.x = rx; return o; }
  const glowT = ctex(64, 64, g => { const r = g.createRadialGradient(32, 32, 0, 32, 32, 32); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.25, 'rgba(255,255,255,.55)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, 64, 64); });
  glowT.magFilter = T.LinearFilter;
  function glow(color, size, p, x, y, z, op) { const s = new T.Sprite(new T.SpriteMaterial({ map: glowT, color, blending: T.AdditiveBlending, transparent: true, opacity: op || 1, depthWrite: false, fog: false })); s.scale.set(size, size, 1); s.position.set(x, y, z); p.add(s); return s; }
  function light(color, int, dist, p, x, y, z) { const l = new T.PointLight(color, int, dist, 1.6); l.position.set(x, y, z); p.add(l); return l; }
  const gold = () => M(0xd9b25a, { shininess: 70, specular: 0x8a6a2a });

  // ----- textures -----
  const TX = {
    planks: () => rep(ctex(128, 128, g => { g.fillStyle = '#7a5236'; g.fillRect(0, 0, 128, 128); for (let i = 0; i < 4; i++) { g.fillStyle = ['#84593a', '#6f4a30', '#7d5538', '#684428'][i]; g.fillRect(0, i * 32, 128, 30); g.fillStyle = 'rgba(0,0,0,.25)'; for (let k = 0; k < 14; k++) g.fillRect(rnd() * 128, i * 32 + rnd() * 30, 10 + rnd() * 20, 1); } }), 6, 4),
    tile: () => rep(ctex(128, 128, g => { g.fillStyle = '#d9c3a0'; g.fillRect(0, 0, 128, 128); g.strokeStyle = '#b89c74'; g.lineWidth = 3; g.strokeRect(0, 0, 64, 64); g.strokeRect(64, 64, 64, 64); g.strokeRect(64, 0, 64, 64); g.strokeRect(0, 64, 64, 64); for (const [x, y] of [[32, 32], [96, 96]]) { g.fillStyle = '#2f6f86'; g.save(); g.translate(x, y); for (let i = 0; i < 2; i++) { g.rotate(Math.PI / 4); g.fillRect(-13, -13, 26, 26); } g.fillStyle = '#e5cf9a'; g.fillRect(-5, -5, 10, 10); g.restore(); } }), 7, 5),
    marble: () => ctex(256, 128, g => { g.fillStyle = '#ece7df'; g.fillRect(0, 0, 256, 128); g.strokeStyle = 'rgba(120,110,105,.45)'; for (let i = 0; i < 14; i++) { g.lineWidth = .6 + rnd() * 1.6; g.beginPath(); let x = rnd() * 256, y = 0; g.moveTo(x, y); while (y < 128) { x += rnd() * 40 - 16; y += 10 + rnd() * 18; g.lineTo(x, y); } g.stroke(); } }),
    shelf: (dark) => ctex(512, 256, g => {
      g.fillStyle = dark ? '#24150e' : '#3d2415'; g.fillRect(0, 0, 512, 256);
      for (let c = 0; c < 4; c++) { const x0 = c * 128; g.fillStyle = dark ? '#1a0f0a' : '#2a180e'; g.fillRect(x0 + 6, 6, 116, 244); g.fillStyle = dark ? '#3a2416' : '#5a3620'; g.fillRect(x0, 0, 6, 256); g.fillRect(x0 + 122, 0, 6, 256);
        if (c % 2 === 0 || true) for (let r = 0; r < 5; r++) { const y = 18 + r * 48; g.fillStyle = dark ? '#3a2416' : '#6a4226'; g.fillRect(x0 + 6, y + 38, 116, 5); g.fillStyle = 'rgba(255,200,120,.10)'; g.fillRect(x0 + 6, y, 116, 38);
          for (let b = 0; b < 4; b++) { const bx = x0 + 14 + b * 27, h = 20 + ((r + b + c) % 3) * 4; g.fillStyle = ['#e2c98f', '#d9b66a', '#f0e2b6', '#c79a4a'][(b + r + c) % 4]; g.fillRect(bx, y + 38 - h, 17, h); g.fillStyle = '#8a6a2a'; g.fillRect(bx + 5, y + 38 - h - 6, 7, 6); g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(bx + 2, y + 40 - h, 3, h - 5); g.fillStyle = 'rgba(90,50,10,.5)'; g.fillRect(bx + 4, y + 30 - h / 2, 9, 6); } } }
      g.fillStyle = dark ? '#3a2416' : '#6a4226'; g.fillRect(0, 0, 512, 8); g.fillStyle = '#b58f45'; g.fillRect(0, 8, 512, 2);
    }),
    carpet: () => ctex(256, 160, g => { g.fillStyle = '#7a1f28'; g.fillRect(0, 0, 256, 160); g.strokeStyle = '#d9b66a'; g.lineWidth = 4; g.strokeRect(8, 8, 240, 144); g.strokeStyle = '#1c2748'; g.lineWidth = 6; g.strokeRect(18, 18, 220, 124); g.fillStyle = '#d9b66a'; g.save(); g.translate(128, 80); for (let i = 0; i < 4; i++) { g.rotate(Math.PI / 4); g.fillRect(-26, -26, 52, 52); } g.fillStyle = '#1c2748'; g.fillRect(-14, -14, 28, 28); g.restore(); for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#e8d7b0' : '#1c2748'; g.fillRect(34 + i * 22, 26, 10, 10); g.fillRect(34 + i * 22, 124, 10, 10); } }),
    sadu: () => ctex(128, 64, g => { const c = ['#8e1f26', '#15151a', '#f0e8d8', '#8e1f26', '#c9762c', '#15151a', '#8e1f26', '#f0e8d8']; for (let i = 0; i < 8; i++) { g.fillStyle = c[i]; g.fillRect(0, i * 8, 128, 8); } g.fillStyle = '#f0e8d8'; for (let x = 0; x < 128; x += 12) { g.beginPath(); g.moveTo(x, 16); g.lineTo(x + 6, 9); g.lineTo(x + 12, 16); g.fill(); g.beginPath(); g.moveTo(x, 48); g.lineTo(x + 6, 55); g.lineTo(x + 12, 48); g.fill(); } }),
    bldg: (lit) => ctex(64, 128, g => { g.fillStyle = '#10152c'; g.fillRect(0, 0, 64, 128); for (let y = 4; y < 124; y += 7) for (let x = 4; x < 60; x += 7) { const on = rnd() < lit; g.fillStyle = on ? (rnd() < .5 ? '#ffd58a' : '#bfe0ff') : '#1b2140'; g.fillRect(x, y, 4, 4); } }),
    wall: (night) => ctex(512, 256, g => {
      g.fillStyle = '#d8bf98'; g.fillRect(0, 0, 512, 256); for (let i = 0; i < 500; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,.06)' : 'rgba(90,60,30,.07)'; g.fillRect(rnd() * 512, rnd() * 256, 6 + rnd() * 16, 2); }
      g.fillStyle = '#c4a678'; g.fillRect(0, 0, 512, 16); g.fillStyle = '#b08e5e'; for (let x = 0; x < 512; x += 24) g.fillRect(x, 0, 12, 10);
      for (let i = 0; i < 3; i++) { const cx = 96 + i * 160, w = 46; const arch = (k, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(cx - w * k, 256); g.lineTo(cx - w * k, 130); g.quadraticCurveTo(cx - w * k, 76 - k * 6, cx, 58 - k * 12); g.quadraticCurveTo(cx + w * k, 76 - k * 6, cx + w * k, 130); g.lineTo(cx + w * k, 256); g.fill(); };
        arch(1.22, '#e9d6b4'); arch(1, i === 1 ? '#4a2d18' : (night ? '#3a2a1a' : '#2a2018'));
        if (i === 1) { g.strokeStyle = '#2a180c'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, 70); g.lineTo(cx, 256); g.stroke(); g.fillStyle = '#d9b25a'; for (let y = 120; y < 250; y += 26) for (const s of [-1, 1]) { g.beginPath(); g.arc(cx + s * 20, y, 3, 0, 7); g.fill(); } }
        else { const gr = g.createLinearGradient(0, 80, 0, 256); gr.addColorStop(0, night ? 'rgba(255,190,100,.85)' : 'rgba(255,220,160,.25)'); gr.addColorStop(1, 'rgba(255,170,80,.1)'); g.fillStyle = gr; g.beginPath(); g.moveTo(cx - 40, 256); g.lineTo(cx - 40, 130); g.quadraticCurveTo(cx - 40, 80, cx, 62); g.quadraticCurveTo(cx + 40, 80, cx + 40, 130); g.lineTo(cx + 40, 256); g.fill(); g.strokeStyle = '#4a2d18'; g.lineWidth = 2; for (let k = -36; k <= 36; k += 9) { g.beginPath(); g.moveTo(cx + k, 70); g.lineTo(cx + k, 256); g.stroke(); } for (let y = 80; y < 256; y += 9) { g.beginPath(); g.moveTo(cx - 40, y); g.lineTo(cx + 40, y); g.stroke(); } } }
    }),
    front: (night) => ctex(1024, 256, g => {
      g.fillStyle = '#1a1c2c'; g.fillRect(0, 0, 1024, 256);
      const names = [['عود', 'OUD HOUSE', '#f4d99a'], ['ذهب', 'GOLD SOUK', '#ffe7ae'], ['BOUTIQUE', 'أزياء', '#f6c9c9'], ['قهوة', 'COFFEE', '#ffd9a0']];
      for (let i = 0; i < 4; i++) { const x = i * 256; g.fillStyle = '#2a2530'; g.fillRect(x + 6, 0, 244, 256); g.fillStyle = '#c9a85a'; g.fillRect(x + 6, 58, 244, 4);
        const gr = g.createLinearGradient(0, 66, 0, 256); gr.addColorStop(0, names[i][2]); gr.addColorStop(1, '#c98a4a'); g.fillStyle = gr; g.fillRect(x + 22, 70, 212, 186);
        g.fillStyle = 'rgba(60,30,20,.75)'; for (let k = 0; k < 3; k++) { const mx = x + 62 + k * 66; if (i === 2) { g.beginPath(); g.arc(mx, 112, 9, 0, 7); g.fill(); g.beginPath(); g.moveTo(mx - 16, 126); g.lineTo(mx + 16, 126); g.lineTo(mx + 24, 250); g.lineTo(mx - 24, 250); g.fill(); } else { g.fillRect(mx - 22, 200, 44, 56); g.fillRect(mx - 10, 168 - k * 8, 20, 32 + k * 8); g.fillRect(mx - 4, 158 - k * 8, 8, 10); } }
        g.fillStyle = '#17131c'; g.fillRect(x + 122, 70, 6, 186); g.fillRect(x + 22, 150, 212, 3);
        g.fillStyle = names[i][2]; g.textAlign = 'center'; g.font = 'bold 30px Georgia, serif'; g.fillText(names[i][0], x + 128, 34); g.font = '13px Georgia, serif'; g.fillText(names[i][1], x + 128, 52); }
    }),
    road: () => rep(ctex(64, 128, g => { g.fillStyle = '#15161d'; g.fillRect(0, 0, 64, 128); g.fillStyle = '#d8d2b0'; g.fillRect(30, 10, 4, 50); g.fillStyle = '#3a3a44'; g.fillRect(2, 0, 2, 128); g.fillRect(60, 0, 2, 128); }), 1, 12),
    sign: (a, b) => ctex(256, 96, g => { g.fillStyle = '#1c2748'; g.fillRect(0, 0, 256, 96); g.strokeStyle = '#d9b66a'; g.lineWidth = 4; g.strokeRect(5, 5, 246, 86); g.fillStyle = '#f1e6cf'; g.textAlign = 'center'; g.font = 'bold 40px Georgia, serif'; g.fillText(a, 128, 46); g.font = '18px Georgia, serif'; g.fillStyle = '#d9b66a'; g.fillText(b, 128, 76); }),
    stripe: () => rep(ctex(64, 16, g => { for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? '#f1e6cf' : '#8c5560'; g.fillRect(i * 16, 0, 16, 16); } }), 4, 1),
    tent: () => rep(ctex(64, 64, g => { g.fillStyle = '#1a1614'; g.fillRect(0, 0, 64, 64); g.fillStyle = '#e8dfcf'; g.fillRect(0, 20, 64, 6); g.fillRect(0, 44, 64, 3); g.fillStyle = '#8e1f26'; g.fillRect(0, 30, 64, 3); }), 3, 1)
  };

  // ----- props -----
  function palm(p, x, z, h, lights) {
    const g = grp(p, x, 0, z), tm = M(0x6a4a30), fm = M(0x2f5a34, { side: T.DoubleSide });
    for (let i = 0; i < 6; i++) { const s = cyl(.13 - i * .008, .16 - i * .008, h / 6 + .02, 6, tm, g, Math.sin(i * .5) * .06, h / 12 + i * h / 6, 0); if (lights && i < 5) for (let k = 0; k < 4; k++) glow(0xffd28a, .22, g, Math.cos(k * 1.57 + i) * .16, s.position.y + (k - 2) * .05, Math.sin(k * 1.57 + i) * .16, .9); }
    for (let i = 0; i < 9; i++) { const f = grp(g, 0, h, 0); f.rotation.y = i * .7; const a = box(.2, .03, 1.2, fm, f, 0, .12, .6); a.rotation.x = .28; const b = box(.16, .03, 1.0, fm, f, 0, -.18, 1.55); b.rotation.x = .8; }
    return g;
  }
  function dallah(p, x, y, z, s) { const g = grp(p, x, y, z), gm = gold(); g.scale.setScalar(s || 1); cyl(.045, .08, .1, 8, gm, g, 0, .05, 0); cyl(.035, .045, .08, 8, gm, g, 0, .14, 0); cyl(.05, .035, .04, 8, gm, g, 0, .2, 0); mesh(new T.ConeGeometry(.045, .09, 8), gm, g, 0, .265, 0); const sp = box(.02, .03, .12, gm, g, 0, .19, .08); sp.rotation.x = -.5; const h = mesh(new T.TorusGeometry(.055, .009, 4, 8, 3.4), gm, g, 0, .14, -.07); h.rotation.y = Math.PI / 2; h.rotation.z = 1.7; return g; }
  function cup(p, x, y, z, col) { cyl(.028, .02, .045, 6, M(col || 0xf4efe6), p, x, y + .022, z); }
  function table(p, x, z, r, h, col) { const g = grp(p, x, 0, z), m = M(col || 0x3a2416); cyl(r, r, .04, 10, m, g, 0, h, 0); cyl(.04, .05, h, 6, m, g, 0, h / 2, 0); cyl(r * .5, r * .55, .03, 8, m, g, 0, .015, 0); return g; }
  function lantern(p, x, y, z, s, on) { const g = grp(p, x, y, z), m = M(0x8a6a2a, { shininess: 50 }); g.scale.setScalar(s || 1); box(.16, .03, .16, m, g, 0, 0, 0); box(.12, .22, .12, basic({ color: on === false ? 0x554422 : 0xffc56a }), g, 0, .13, 0); for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) box(.015, .22, .015, m, g, a * .065, .13, b * .065); mesh(new T.ConeGeometry(.12, .1, 4), m, g, 0, .29, 0).rotation.y = .78; if (on !== false) glow(0xffb45a, .9, g, 0, .14, 0, .7); return g; }
  function cushion(p, x, y, z, w, tex) { const m = M(0xffffff, { map: tex }); const c = box(w, .16, .5, m, p, x, y, z); return c; }
  function skyline(p, z, lit, col, n) { const t = TX.bldg(lit); t.magFilter = T.NearestFilter; const m = basic({ map: t, color: col, fog: false }); for (let i = 0; i < (n || 22); i++) { const w = 3 + rnd() * 5, h = 6 + rnd() * rnd() * 34; box(w, h, 3, m, p, -75 + i * (150 / (n || 22)) + rnd() * 3, h / 2 - 1, z - rnd() * 10); } const sp = cyl(.2, 2.6, 62, 4, basic({ map: t, color: col, fog: false }), p, 14, 30, z - 6); glow(0xfff0c0, 4, p, 14, 61, z - 6, lit > .3 ? 1 : .3); }
  function falcon(p, x, z) { const g = grp(p, x, 0, z); cyl(.025, .03, 1.05, 5, M(0x4a2f1c), g, 0, .52, 0); cyl(.11, .11, .05, 8, M(0x6f7a4a), g, 0, 1.07, 0); const b = grp(g, 0, 1.1, 0), fm = M(0x6b6258), fl = M(0xe6dcc8); const body = mesh(new T.IcosahedronGeometry(.1, 0), fm, b, 0, .16, 0); body.scale.set(.85, 1.6, .9); mesh(new T.IcosahedronGeometry(.06, 0), fl, b, 0, .15, .05).scale.set(.9, 1.7, .6); mesh(new T.IcosahedronGeometry(.055, 0), fm, b, 0, .34, .02); const bk = mesh(new T.ConeGeometry(.018, .05, 4), M(0xd9b25a), b, 0, .33, .075); bk.rotation.x = 2; for (const s of [-1, 1]) { box(.02, .24, .12, M(0x4f483f), b, s * .085, .14, -.02).rotation.x = .15; box(.012, .012, .012, basic({ color: 0x110b08 }), b, s * .03, .355, .062); } box(.07, .16, .02, M(0x4f483f), b, 0, -.02, -.07).rotation.x = .3; return b; }
  function suv(p, x, z, ry) { const g = grp(p, x, 0, z); g.rotation.y = ry || 0; const w = M(0xe9e6df, { shininess: 30 }), dk = M(0x14161c, { shininess: 60 }); box(1.9, .7, 4.4, w, g, 0, .85, 0); box(1.76, .66, 2.7, w, g, 0, 1.5, -.35); box(1.8, .44, 2.3, dk, g, 0, 1.52, -.35); box(1.5, .44, 2.74, dk, g, 0, 1.52, -.35); box(1.7, .05, 2.2, M(0x33363c), g, 0, 1.9, -.35); box(1.94, .16, 4.5, M(0x2a2c30), g, 0, .5, 0); for (const a of [-1, 1]) for (const b of [-1.4, 1.4]) { const wh = cyl(.4, .4, .28, 10, M(0x15151a), g, a * .92, .4, b); wh.rotation.z = Math.PI / 2; } for (const a of [-1, 1]) { box(.3, .16, .04, basic({ color: 0xfff2c8 }), g, a * .62, .95, 2.21); } return g; }

  // ----- environment presets -----
  const ENV = {
    sunset: { sky: ['#27306e', '#c7607a', '#ffb56a', '#ffd9a0'], fog: [0xe59a80, 22, 170], hemi: [0xffd2b0, 0x7a5568, .72], sun: [0xffa25e, 1.05, -4, 2.4, 3.5], fill: [0xffd0b0, .42] },
    night: { sky: ['#050816', '#0d1436', '#1c2356', '#3a3068'], fog: [0x0e1330, 16, 150], hemi: [0x93a4e8, 0x231d38, .62], sun: [0x9fb4ff, .42, -3, 5, 3], fill: [0xffd6b0, .5], stars: 1 },
    day: { sky: ['#3f8fd8', '#86c0ee', '#cfe6f4', '#f6ead0'], fog: [0xd8e6f0, 30, 220], hemi: [0xffffff, 0xc8a47c, .82], sun: [0xfff0d0, .95, 3, 6, 4], fill: [0xffffff, .3] },
    shop: { sky: ['#1a0f0a', '#1a0f0a', '#1a0f0a', '#1a0f0a'], fog: [0x1a0f0a, 12, 40], hemi: [0xffdcae, 0x4a2c18, .72], sun: [0xffd09a, .5, 1, 4, 5], fill: [0xffe2c0, .46] },
    dark: { sky: ['#06070f', '#06070f', '#06070f', '#06070f'], fog: [0x06070f, 6, 26], hemi: [0x7f96e8, 0x1a1420, .62], sun: [0x8fa6ff, .5, 4, 3, 2], fill: [0xc8d2ff, .34] },
    warm: { sky: ['#2a1a12', '#2a1a12', '#2a1a12', '#2a1a12'], fog: [0x2a1a12, 14, 44], hemi: [0xffe2c0, 0x5a3a24, .8], sun: [0xffd9b0, .6, 2, 5, 4], fill: [0xffe6cc, .45] },
    attic: { sky: ['#070912', '#070912', '#070912', '#070912'], fog: [0x0a0c16, 5, 22], hemi: [0x7f96e8, 0x14101a, .5], sun: [0x9fb4ff, .95, 3, 5, -2], fill: [0xc8d2ff, .32] },
    fire: { sky: ['#1a0804', '#1a0804', '#1a0804', '#1a0804'], fog: [0x2a0f06, 2.5, 13], hemi: [0xff9a50, 0x2a0a04, .6], sun: [0xff7a30, .8, -2, 2, 2], fill: [0xff9a60, .3] }
  };
  O.ENV = ENV;

  const SETS = {};
  SETS.cafe = function (time) {
    sd = 5; const g = grp(), night = time === 'night', tick = [];
    plane(16, 9, M(0xffffff, { map: TX.planks() }), g, 0, 0, .5, -Math.PI / 2);
    const rm = M(0x2a2228), gl = new T.MeshPhongMaterial({ color: 0x9fd0e0, transparent: true, opacity: .16 });
    for (let x = -8; x <= 8; x += 1.6) box(.07, 1.05, .07, rm, g, x, .52, -2.6); box(16, .07, .1, M(0x8a6a2a, { shininess: 50 }), g, 0, 1.06, -2.6); box(16, .9, .02, gl, g, 0, .5, -2.6);
    const wm = new T.MeshPhongMaterial({ color: night ? 0x0c1838 : 0x5a5378, shininess: 90, specular: night ? 0x334488 : 0xffb080, flatShading: true });
    const wg = new T.PlaneGeometry(400, 160, 40, 16); const water = mesh(wg, wm, g, 0, -.7, -84); water.rotation.x = -Math.PI / 2;
    const wp = wg.attributes.position; tick.push(t => { for (let i = 0; i < wp.count; i++) wp.setZ(i, Math.sin(wp.getX(i) * .25 + t * 1.2) * .1 + Math.cos(wp.getY(i) * .4 + t) * .08); wp.needsUpdate = true; wg.computeVertexNormals(); });
    skyline(g, -150, night ? .55 : .16, night ? 0xffffff : 0x8a5a78);
    const sx = night ? -22 : 9, sy = night ? 40 : 7;
    glow(night ? 0xdfe6ff : 0xffe2a0, night ? 9 : 16, g, sx, sy, -160, 1); glow(night ? 0x8fa0ff : 0xff9a5a, night ? 30 : 60, g, sx, sy, -160, .5);
    const st = plane(night ? 3 : 7, 150, basic({ color: night ? 0xaab8ff : 0xffb070, transparent: true, opacity: .34, blending: T.AdditiveBlending, depthWrite: false, fog: false }), g, sx * .55, -.62, -80, -Math.PI / 2);
    tick.push(t => (st.material.opacity = .28 + Math.sin(t * 2.3) * .06));
    if (night) for (let i = 0; i < 14; i++) plane(.5, 26, basic({ color: i % 2 ? 0xffd58a : 0x9fd0ff, transparent: true, opacity: .22, blending: T.AdditiveBlending, depthWrite: false, fog: false }), g, -60 + i * 9 + rnd() * 4, -.6, -128, -Math.PI / 2);
    // dhow
    const dh = grp(g, -11, -.5, -30), dm = M(0x4a2f1c); const hull = box(7, 1, 1.8, dm, dh, 0, .4, 0); box(1.6, .5, 1.6, dm, dh, -3, 1.1, 0); cyl(.07, .09, 6, 5, dm, dh, .5, 3.4, 0);
    const sail = mesh(new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute([.6, 6.2, 0, -3.2, 1.4, 0, 3.8, 1.2, 0], 3)), M(0xf1e6cf, { side: T.DoubleSide }), dh); sail.geometry.computeVertexNormals();
    if (night) glow(0xffc56a, 1.6, dh, -3, 1.6, .9, .9);
    tick.push(t => { dh.position.y = -.5 + Math.sin(t * .8) * .06; dh.rotation.z = Math.sin(t * .6) * .015; dh.position.x = -11 + Math.sin(t * .05) * 3; });
    // kiosk
    const ks = grp(g, -6.1, 0, -1.2); box(2.6, 1.05, 1.2, M(0x1c2748), ks, 0, .52, 0); box(2.7, .06, 1.3, M(0xffffff, { map: TX.marble() }), ks, 0, 1.08, 0); box(2.6, 2.6, .1, M(0x2a2530), ks, 0, 1.3, -.7);
    const aw = box(2.9, .06, 1.6, M(0xffffff, { map: TX.stripe() }), ks, 0, 2.5, .1); aw.rotation.x = .22; plane(1.7, .62, basic({ map: TX.sign('مرسى', 'MARSA CAFÉ') }), ks, 0, 1.95, -.64);
    dallah(ks, -.7, 1.11, 0, 1.6); for (let i = 0; i < 4; i++) cup(ks, .1 + i * .22, 1.11, .1); box(.4, .5, .4, M(0x8a8f96, { shininess: 60 }), ks, .9, 1.36, -.2);
    // tables
    for (const [x, z] of [[0, -.75], [-3.1, -1.5], [3.3, -1.3], [5.4, .4]]) { const tb = table(g, x, z, .42, .72); cup(tb, -.14, .74, .1); cup(tb, .16, .74, -.05); lantern(tb, 0, .74, -.12, .7); }
    palm(g, -3.9, -2.2, 4.2, night); palm(g, 6.4, -2.1, 4.8, night); palm(g, 8.5, .6, 4);
    // string lights
    for (let k = 0; k < 2; k++) for (let i = 0; i <= 22; i++) { const u = i / 22, x = -8 + u * 16, y = 3.5 - Math.sin(u * Math.PI) * .55 + k * .25, z = -2.5 + k * 2.2; glow(0xffd08a, night ? .5 : .34, g, x, y, z, night ? 1 : .75); }
    for (const x of [-8, 8]) cyl(.05, .06, 3.9, 5, rm, g, x, 1.95, -2.5);
    if (night) { light(0xffb870, 1.1, 12, g, 0, 3, 1.2); light(0xffb870, .6, 9, g, -4, 2.4, -1); }
    return { g, cam: { p: [0, 1.55, 6.2], l: [0, 1.25, 0] }, seat: 'chair', tick };
  };

  SETS.villa = function (time) {
    sd = 9; const g = grp(), night = time === 'night', tick = [];
    plane(15, 10, M(0xffffff, { map: TX.tile() }), g, 0, 0, .6, -Math.PI / 2);
    const wt = TX.wall(night), wmat = M(night ? 0x6c6f96 : time === 'sunset' ? 0xf0cfb0 : 0xffffff, { map: wt, emissive: night ? 0x2a1c0c : 0, emissiveMap: night ? wt : null });
    plane(14, 5.4, wmat, g, 0, 2.7, -3.4);
    for (const s of [-1, 1]) { const w = plane(8, 5.4, wmat, g, s * 7, 2.7, .4); w.rotation.y = -s * Math.PI / 2; }
    box(14.4, .3, .5, M(0xc4a678), g, 0, 5.5, -3.4);
    // wind tower
    const wtw = grp(g, 4.4, 0, -5.6), tm = M(0xcbb089); box(2.2, 9.5, 2.2, tm, wtw, 0, 4.75, 0); for (let i = -1; i <= 1; i++) box(.34, 2.2, .1, M(0x2a2018), wtw, i * .6, 8, 1.11); box(2.5, .25, 2.5, M(0xb89a70), wtw, 0, 9.6, 0); box(2.4, .2, 2.4, M(0xb89a70), wtw, 0, 6.6, 0);
    // fountain
    const f = grp(g, 3.1, 0, -1.5), sm = M(0xe5d8c0); cyl(.95, 1.05, .42, 8, sm, f, 0, .21, 0); cyl(.82, .82, .05, 8, new T.MeshPhongMaterial({ color: 0x3f9ab8, shininess: 100, transparent: true, opacity: .85 }), f, 0, .42, 0); cyl(.12, .16, .9, 6, sm, f, 0, .6, 0); cyl(.4, .14, .14, 8, sm, f, 0, 1.08, 0);
    const jets = []; for (let i = 0; i < 10; i++) jets.push(glow(0xcfefff, .16, f, 0, 1.2, 0, .8));
    tick.push(t => jets.forEach((j, i) => { const u = (t * .9 + i / 10) % 1, a = i * 2.4; j.position.set(Math.cos(a) * u * .5, 1.15 + u * .5 - u * u * 1.2, Math.sin(a) * u * .5); }));
    // majlis bench
    const sdu = TX.sadu(), bm = M(0xffffff, { map: sdu }); box(3.6, .34, .8, M(0x7a1f28), g, -3.6, .17, -2.85); box(3.6, .5, .2, bm, g, -3.6, .62, -3.2); for (let i = 0; i < 3; i++) box(.55, .34, .22, M(i % 2 ? 0x1c2748 : 0xd9b66a), g, -4.7 + i * 1.1, .52, -2.95).rotation.x = -.3;
    const lt = table(g, -3.5, -1.8, .45, .34, 0x4a2f1c); dallah(lt, 0, .36, 0, 1.5); cup(lt, .22, .36, .1); cup(lt, -.2, .36, .14); box(.3, .03, .2, gold(), lt, .05, .37, -.22);
    plane(3.2, 2, M(0xffffff, { map: TX.carpet() }), g, -3.5, .012, -1.7, -Math.PI / 2);
    // plants
    palm(g, 5.9, -2.6, 3.6, night); palm(g, -6.2, -1, 3.2, night);
    const bg = M(0xc8457a), lf = M(0x3a6a3a); for (let i = 0; i < 26; i++) mesh(new T.IcosahedronGeometry(.22 + rnd() * .2, 0), i % 3 ? bg : lf, g, -6.6 + rnd() * 3.6, 4.2 + rnd() * 1.3 - Math.abs(i % 5) * .1, -3.2 + rnd() * .3);
    for (const x of [-1.9, 1.3]) { cyl(.24, .18, .4, 8, M(0xa8623c), g, x, .2, -3); for (let i = 0; i < 5; i++) mesh(new T.IcosahedronGeometry(.2, 0), i % 2 ? bg : lf, g, x + rnd() * .3 - .15, .55 + rnd() * .3, -3); }
    for (const [x, z] of [[-1.3, -3.1], [.9, -3.1], [-6.4, 1], [6.4, 1.2]]) lantern(g, x, 0, z, 1.5, night || time === 'sunset');
    for (let i = 0; i <= 16; i++) { const u = i / 16; glow(0xffd08a, night ? .5 : .3, g, -6.8 + u * 13.6, 4.5 - Math.sin(u * Math.PI) * .7, -1.2, night ? 1 : .6); }
    if (night) { light(0xffb060, 1.2, 11, g, 0, 2.6, 1.5); light(0xffb060, .8, 8, g, -3.4, 1.5, -1.8); }
    return { g, cam: { p: [0, 1.6, 6.4], l: [0, 1.35, 0] }, seat: 'chair', tick };
  };

  SETS.shop = function (time) {
    sd = 3; const g = grp(), dark = time === 'dark' || time === 'fire', tick = [];
    plane(13, 9, M(dark ? 0x3a2a22 : 0x6a4a34, { map: TX.planks() }), g, 0, 0, .5, -Math.PI / 2);
    plane(5.4, 3.4, M(0xffffff, { map: TX.carpet() }), g, 0, .012, .2, -Math.PI / 2);
    const st = TX.shelf(dark), smat = M(dark ? 0x8a8aa0 : 0xffffff, { map: st, emissive: dark ? 0 : 0x2a1a0a, emissiveMap: dark ? null : st });
    plane(12, 4, smat, g, 0, 2, -2.6); for (const s of [-1, 1]) { const w = plane(8, 4, smat, g, s * 6, 2, .5); w.rotation.y = -s * Math.PI / 2; }
    box(12.2, .3, 8, M(0x24150e), g, 0, 4.15, .6);
    // counter
    const cx = -3.2; box(3.4, .95, .8, M(0x3d2415), g, cx, .47, -1.5); box(3.3, .7, .02, M(0x5a3620), g, cx, .5, -1.09); for (let i = 0; i < 4; i++) box(.02, .7, .03, gold(), g, cx - 1.5 + i, .5, -1.08);
    box(3.6, .07, .95, M(0xffffff, { map: TX.marble(), shininess: 60 }), g, cx, .98, -1.5);
    const bm = [0xe2c98f, 0xd9b66a, 0xf0e2b6]; for (let i = 0; i < 6; i++) { const b = grp(g, cx - 1.3 + i * .3, 1.02, -1.55 + (i % 2) * .16); box(.1, .14, .06, new T.MeshPhongMaterial({ color: bm[i % 3], shininess: 90, transparent: true, opacity: .88 }), b, 0, .07, 0); box(.04, .04, .04, gold(), b, 0, .16, 0); }
    // mabkhara (incense burner) + smoke
    const mk = grp(g, cx + 1.2, 1.02, -1.45); cyl(.05, .09, .1, 4, gold(), mk, 0, .05, 0); cyl(.1, .05, .1, 4, gold(), mk, 0, .15, 0); for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) box(.014, .12, .014, gold(), mk, a * .06, .26, b * .06); glow(0xff7a30, .2, mk, 0, .2, 0, dark ? 0 : .9);
    const smoke = []; for (let i = 0; i < 7; i++) { const s = glow(0xcfc8c0, .3, mk, 0, .3, 0, .2); s.material.blending = T.NormalBlending; smoke.push(s); }
    tick.push(t => smoke.forEach((s, i) => { const u = (t * .16 + i / 7) % 1; s.position.set(Math.sin(u * 6 + i) * .1 * u, .25 + u * 1.5, 0); s.material.opacity = (dark ? .0 : .22) * (1 - u); s.scale.setScalar(.2 + u * .5); }));
    // display table + big bottle
    const dt = table(g, 3.3, -1.3, .5, .85, 0x3d2415); const bb = grp(dt, 0, .88, 0); mesh(new T.OctahedronGeometry(.16), new T.MeshPhongMaterial({ color: 0xe8c878, shininess: 100, transparent: true, opacity: .85, flatShading: true }), bb, 0, .2, 0); cyl(.03, .03, .08, 6, gold(), bb, 0, .4, 0); mesh(new T.OctahedronGeometry(.05), gold(), bb, 0, .48, 0);
    tick.push(t => (bb.rotation.y = t * .3));
    // door arch (right-back)
    box(1.3, 2.6, .08, M(dark ? 0x10131f : 0x2a180e), g, 5.2, 1.3, -2.52); if (!dark) glow(0xffd9a0, 2.4, g, 5.2, 1.5, -2.4, .25);
    // lamps
    for (const x of [-3.2, 0, 3.2]) { cyl(.008, .008, 1, 4, M(0x8a6a2a), g, x, 3.55, -.6); mesh(new T.ConeGeometry(.22, .26, 6, 1, true), M(0xb58f45, { side: T.DoubleSide, shininess: 60 }), g, x, 3, -.6); if (!dark) { glow(0xffc070, 1.3, g, x, 2.92, -.6, .9); light(0xffc080, .7, 7, g, x, 2.8, -.3); } }
    if (time === 'dark') { light(0x8fa6ff, .9, 9, g, 4.5, 2, 1); glow(0xffc070, .7, g, 0, 2.92, -.6, .5); light(0xffc080, .5, 5, g, 0, 2.6, 0); }
    if (time === 'fire') { const fl = light(0xff6a20, 2.2, 11, g, -2.5, 1.2, -1.6), f2 = light(0xff9a40, 1.2, 9, g, 2, .6, -2); const fg = []; for (let i = 0; i < 16; i++) fg.push(glow(i % 2 ? 0xff7a20 : 0xffc040, 1.2, g, -5 + rnd() * 10, .4 + rnd() * 2.4, -2.3 + rnd() * .4, .7)); tick.push(t => { fl.intensity = 2 + Math.sin(t * 13) * .5 + Math.sin(t * 7.3) * .4; f2.intensity = 1.1 + Math.sin(t * 9) * .4; fg.forEach((s, i) => { s.scale.setScalar(.9 + Math.sin(t * (6 + i) + i) * .45); s.position.y += .006; if (s.position.y > 3.2) s.position.y = .3; }); }); }
    return { g, cam: { p: [0, 1.55, 5.6], l: [0, 1.3, 0] }, seat: 'chair', tick, env: time === 'dark' ? 'dark' : time === 'fire' ? 'fire' : 'shop' };
  };

  SETS.mall = function () {
    sd = 21; const g = grp(), tick = [];
    plane(22, 10, new T.MeshPhongMaterial({ color: 0x1c1d28, shininess: 120, specular: 0x555577 }), g, 0, 0, .6, -Math.PI / 2);
    const ft = TX.front(); ft.magFilter = T.LinearFilter; plane(20, 5, basic({ map: ft }), g, 0, 2.5, -3.6);
    const rf = plane(20, 5, basic({ map: ft, transparent: true, opacity: .3, blending: T.AdditiveBlending, depthWrite: false }), g, 0, .014, -1.1, Math.PI / 2); rf.scale.y = 1;
    box(20.4, 3, 1, M(0x232532), g, 0, 6.5, -4); box(20.4, .16, 1.3, gold(), g, 0, 5.05, -3.7);
    for (let i = 0; i < 9; i++) { box(.9, .7, .06, basic({ color: rnd() < .6 ? 0xffd58a : 0x2a2c3c }), g, -8.5 + i * 2.1, 6.4, -3.48); }
    palm(g, -4.6, -2.3, 4.4, true); palm(g, 4.8, -2.3, 4.6, true); palm(g, -9.5, -1.5, 4, true); palm(g, 9.5, -1.4, 4.2, true);
    for (const x of [-7, 7]) { cyl(.05, .07, 3.6, 6, M(0x15151a), g, x, 1.8, -1.9); glow(0xffe2b0, 1.6, g, x, 3.7, -1.9, 1); light(0xffd9a0, .7, 9, g, x, 3.4, -1.4); }
    const bn = grp(g, 2.6, 0, -2.5); box(1.7, .07, .45, M(0x5a3620), bn, 0, .45, 0); box(1.7, .4, .06, M(0x5a3620), bn, 0, .75, -.2); for (const s of [-1, 1]) box(.07, .45, .4, M(0x15151a), bn, s * .75, .22, 0);
    for (let k = 0; k < 2; k++) for (let i = 0; i <= 26; i++) { const u = i / 26; glow(k ? 0xffd08a : 0xffe6c0, .42, g, -10 + u * 20, 4.6 - Math.sin(u * Math.PI * 3) * .25, -1.6 + k * 2.4, 1); }
    skyline(g, -90, .5, 0xffffff, 14);
    light(0xffc890, 1.25, 13, g, 0, 2.6, 1.6); light(0xffd9a0, .8, 10, g, 0, 2.2, -2.6);
    for (let i = 0; i < 8; i++) plane(.5, 3.4, basic({ color: i % 2 ? 0xffd08a : 0xffb0b0, transparent: true, opacity: .13, blending: T.AdditiveBlending, depthWrite: false }), g, -8 + i * 2.3, .016, 1.2, -Math.PI / 2);
    return { g, cam: { p: [0, 1.55, 6.4], l: [0, 1.35, 0] }, seat: 'chair', tick, env: 'night' };
  };

  SETS.car = function () {
    sd = 33; const g = grp(), tick = [], im = M(0x1b1a20), le = M(0x6a4632), dk = M(0x0f0f14);
    const road = plane(9, 240, basic({ map: TX.road() }), g, 0, -.02, -110, -Math.PI / 2); tick.push((t, dt) => (road.material.map.offset.y -= dt * 2.2));
    skyline(g, -120, .55, 0xffffff, 18);
    const lamps = []; for (let i = 0; i < 10; i++) { const l = glow(0xffc47a, 2.6, g, i % 2 ? 4.5 : -4.5, 4.4, -i * 12, .95); lamps.push(l); }
    const sweep = light(0xffb870, .9, 6, g, 0, 2.2, 0);
    tick.push((t, dt) => { lamps.forEach(l => { l.position.z -= dt * 16; if (l.position.z < -120) l.position.z += 120; }); const u = (t * 1.3) % 1; sweep.position.set(Math.sin(t * .65) > 0 ? 1.6 : -1.6, 2, 1.5 - u * 3.5); sweep.intensity = .25 + Math.sin(u * Math.PI) * .9; });
    for (const x of [-.4, .4]) { box(.52, .78, .14, le, g, x, .82, -.3); box(.26, .2, .1, le, g, x, 1.33, -.32); box(.5, .12, .5, le, g, x, .4, -.05); }
    box(1.5, .62, .14, le, g, 0, .78, -1.15); box(1.7, .06, 2.5, im, g, 0, 1.6, -.45);
    for (const s of [-1, 1]) { box(.08, .74, 2.4, im, g, s * .86, .56, -.4); box(.08, .68, .1, im, g, s * .86, 1.27, -.3); box(.09, .7, .12, im, g, s * .84, 1.27, -1.5).rotation.x = -.3; const ap = box(.07, .78, .08, im, g, s * .8, 1.28, .38); ap.rotation.x = .5; ap.rotation.z = s * .1; }
    box(1.72, .3, .46, dk, g, 0, .6, .62); box(1.72, .05, .5, im, g, 0, .76, .6); box(.36, .12, .05, basic({ color: 0x3a6a8a }), g, 0, .68, .38);
    const sw = mesh(new T.TorusGeometry(.17, .018, 5, 14), dk, g, .4, .9, .36); sw.rotation.x = -.5; box(.2, .06, .03, im, g, 0, 1.47, .25);
    light(0x6f9ad8, .5, 3, g, 0, 1, .5); light(0xffc890, .85, 4, g, 0, 1.5, 1.2);
    return { g, cam: { p: [0, 1.22, 2.1], l: [0, 1.14, 0] }, seat: null, car: 1, tick, env: 'night' };
  };

  SETS.desert = function (time) {
    sd = 17; const g = grp(), night = time !== 'sunset', tick = [];
    const dg = new T.PlaneGeometry(260, 260, 56, 56), dp = dg.attributes.position;
    for (let i = 0; i < dp.count; i++) { const x = dp.getX(i), y = dp.getY(i), r = Math.hypot(x, y), k = Math.min(1, Math.max(0, (r - 7) / 16)); dp.setZ(i, k * (Math.sin(x * .09 + 1) * 3.2 + Math.cos(y * .07) * 3.4 + Math.sin((x + y) * .16) * 1.6 + 2.4)); }
    dg.computeVertexNormals(); mesh(dg, M(night ? 0xb08a60 : 0xd9a066), g, 0, 0, 0).rotation.x = -Math.PI / 2;
    plane(5.6, 3.6, M(0xffffff, { map: TX.carpet() }), g, 0, .02, -.1, -Math.PI / 2);
    const sdu = TX.sadu(); for (const [x, z, r] of [[-2.1, -1.5, .3], [2.1, -1.5, -.3], [-2.75, .2, 1.3], [2.75, .2, -1.3]]) { const c = cushion(g, x, .1, z, 1.3, sdu); c.rotation.y = r; const b = box(1.3, .34, .16, M(0xffffff, { map: sdu }), g, x - Math.sin(r) * .3, .3, z - Math.cos(r) * .3); b.rotation.y = r; }
    // fire
    const fr = grp(g, 0, 0, -1.75); for (let i = 0; i < 8; i++) mesh(new T.IcosahedronGeometry(.11, 0), M(0x5a5048), fr, Math.cos(i * .785) * .42, .06, Math.sin(i * .785) * .42);
    for (let i = 0; i < 3; i++) { const l = cyl(.05, .05, .7, 5, M(0x3a2416), fr, 0, .12, 0); l.rotation.z = Math.PI / 2 - .25; l.rotation.y = i * 1.05; }
    const fl = []; for (let i = 0; i < 4; i++) fl.push(mesh(new T.ConeGeometry(.16 - i * .025, .5 + i * .12, 5), basic({ color: [0xff5a1a, 0xff8a20, 0xffb030, 0xffe070][i], transparent: true, opacity: .9 }), fr, (i - 1.5) * .07, .35 + i * .04, (i % 2) * .08));
    const fg = glow(0xff8a30, 3.2, fr, 0, .5, 0, .7), fL = light(0xff8a3a, 2.2, 14, fr, 0, .8, .3), sp = []; for (let i = 0; i < 12; i++) sp.push(glow(0xffb040, .07, fr, 0, 0, 0, 1));
    tick.push(t => { fl.forEach((f, i) => { f.scale.set(1 + Math.sin(t * (9 + i * 2) + i) * .18, 1 + Math.sin(t * (12 + i * 3)) * .25, 1); f.rotation.y = t * 2 + i; }); fL.intensity = 2 + Math.sin(t * 11) * .35 + Math.sin(t * 6.3) * .3; fg.scale.setScalar(3 + Math.sin(t * 8) * .3); sp.forEach((s, i) => { const u = (t * .4 + i / 12) % 1; s.position.set(Math.sin(i * 3 + u * 4) * .3 * u, .5 + u * 2.6, Math.cos(i * 5 + u * 3) * .3 * u); s.material.opacity = 1 - u; }); });
    const lt = table(g, 1.75, .35, .34, .26, 0x4a2f1c); dallah(lt, 0, .28, 0, 1.4); cup(lt, .18, .28, .1); cup(lt, -.16, .28, .14); cup(lt, .05, .28, -.2);
    // tent
    const tn = grp(g, -6.5, 0, -5.5); tn.rotation.y = .5; const tmat = M(0xffffff, { map: TX.tent(), side: T.DoubleSide }); const r1 = plane(6, 2.6, tmat, tn, 0, 2.2, .9); r1.rotation.x = -1.05; const r2 = plane(6, 2.6, tmat, tn, 0, 2.2, -.9); r2.rotation.x = 1.05; plane(6, 1.7, tmat, tn, 0, .85, -2.0); for (const x of [-2.9, 0, 2.9]) cyl(.05, .05, 2.9, 5, M(0x4a2f1c), tn, x, 1.45, 0); lantern(tn, 0, 1.9, 0, 1.6); light(0xffb060, .8, 7, tn, 0, 1.6, .5); plane(5, 3, M(0xffffff, { map: TX.carpet() }), tn, 0, .03, 0, -Math.PI / 2);
    suv(g, 6.6, -5.2, -.5); falcon(g, 3.1, -1.5);
    for (const [x, z] of [[-3.3, -.9], [3.4, 1.2], [-1.2, -2.6]]) lantern(g, x, 0, z, 1.4);
    if (night) { glow(0xf2f4ff, 8, g, -40, 52, -150, 1); glow(0x8fa0ff, 34, g, -40, 52, -150, .35); } else { glow(0xffe2a0, 18, g, 30, 9, -170, 1); glow(0xff9a5a, 70, g, 30, 9, -170, .5); }
    return { g, cam: { p: [0, 1.5, 6.3], l: [0, 1.0, 0] }, seat: 'cushion', tick };
  };
  O.SETS = SETS; O.sx = { rep, basic, plane, glow, light, gold, TX, palm, dallah, cup, table, lantern, cushion, skyline, falcon, suv };
})();

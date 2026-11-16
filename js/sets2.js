// The Vow You Broke — fantasy locations
(function () {
  const T = THREE, O = window.OYK, { M, mesh, box, cyl, grp, ctex, ico } = O.u, X = O.sx, { rep, basic, plane, glow, light, gold, TX, table, lantern } = X, SETS = O.SETS;
  let sd = 5; const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
  Object.assign(O.ENV, {
    eclipse: { sky: ['#0a0206', '#3a0a10', '#8a1a14', '#d0502a'], fog: [0x3a0e10, 8, 90], hemi: [0xff8a70, 0x200810, .6], sun: [0xff5a40, .9, -3, 4, -4], fill: [0xffb0a0, .4], rim: [0xff4030, 1.0] },
    morning: { sky: ['#bfe0f4', '#dff0f8', '#f8f4e4', '#f8f4e4'], fog: [0xf4f0e0, 14, 60], hemi: [0xffffff, 0xd8c8a8, .9], sun: [0xfff0d0, .9, 4, 5, 2], fill: [0xffffff, .35], rim: [0xfff0c0, .5] },
    rainy: { sky: ['#5a6474', '#7a8494', '#9aa4b0', '#aab2bc'], fog: [0x8a94a0, 12, 70], hemi: [0xc8d4e4, 0x4a5058, .8], sun: [0xc8d4e8, .5, 2, 6, 3], fill: [0xdfe6f0, .4], rim: [0xbfd0e8, .5] },
    ball: { sky: ['#0a1024', '#0a1024', '#0a1024', '#0a1024'], fog: [0x1a1420, 16, 60], hemi: [0xffe2b0, 0x4a3420, .6], sun: [0xffd9a0, .45, 2, 6, 4], fill: [0xffe6c8, .38], rim: [0xffc870, .7] },
    glass: { sky: ['#060a1c', '#101a3c', '#2a3460', '#3a4470'], fog: [0x101a34, 12, 70], hemi: [0x9fb4f0, 0x1a2030, .65], sun: [0xaec0ff, .6, -3, 5, 2], fill: [0xdfe6ff, .4], stars: 1, rim: [0xffc070, .6] },
    vault: { sky: ['#04080c', '#04080c', '#04080c', '#04080c'], fog: [0x061014, 6, 34], hemi: [0x6fd0d8, 0x0a1418, .5], sun: [0x7fe0e8, .5, 1, 6, 2], fill: [0xbff0f4, .35], rim: [0x6fe0f0, .8] },
    wood: { sky: ['#120c0a', '#120c0a', '#120c0a', '#120c0a'], fog: [0x140e0c, 8, 36], hemi: [0xc8b8a8, 0x1a120e, .55], sun: [0xd8c8b8, .5, -2, 5, 3], fill: [0xe8dccc, .4], rim: [0x9fb0d0, .5] },
    dusk: { sky: ['#1a2040', '#4a3a60', '#b06a60', '#e0a070'], fog: [0x6a5a70, 14, 90], hemi: [0xd8b8c8, 0x3a3040, .7], sun: [0xffa070, .7, -4, 3, 2], fill: [0xffd0b8, .4], rim: [0xffb070, .7] },
    heart: { sky: ['#0c0204', '#0c0204', '#0c0204', '#0c0204'], fog: [0x1a0406, 8, 50], hemi: [0xff7a70, 0x200608, .55], sun: [0xff5040, .7, 0, 6, 3], fill: [0xffb0a8, .4], rim: [0xff2030, 1.1] },
    dawn: { sky: ['#6a8ac0', '#c8b0c8', '#ffd0a8', '#ffe8c8'], fog: [0xf0d8c8, 18, 120], hemi: [0xffe8d8, 0x8a9a70, .85], sun: [0xffd8a8, .9, 5, 3, 3], fill: [0xfff0e0, .35], rim: [0xffc890, .7] }
  });
  const marble = (c) => M(c || 0xffffff, { map: rep(TX.marble(), 4, 6), shininess: 50 });
  function column(g, x, z, h, m, broken) { const c = grp(g, x, 0, z); cyl(.3, .34, h, 10, m, c, 0, h / 2, 0); box(.9, .2, .9, m, c, 0, .1, 0); if (!broken) box(.9, .2, .9, m, c, 0, h, 0); else c.rotation.z = broken; return c; }
  function rain(g, tick, n, area) { const m = basic({ color: 0xcfe0f0, transparent: true, opacity: .35, depthWrite: false }), dr = []; for (let i = 0; i < n; i++) { const p = plane(.012, .5, m, g, (rnd() - .5) * area, rnd() * 6, -4 + rnd() * 7); p.userData.noCast = 1; dr.push(p); } tick.push((t, dt) => dr.forEach(p => { p.position.y -= dt * 9; if (p.position.y < 0) p.position.y += 6; })); }
  function snow(g, tick, n) { const fl = []; for (let i = 0; i < n; i++) fl.push(glow(0xffffff, .07, g, (rnd() - .5) * 16, rnd() * 7, -7 + rnd() * 5, .8)); tick.push((t, dt) => fl.forEach((f, i) => { f.position.y -= dt * .5; f.position.x += Math.sin(t + i) * dt * .2; if (f.position.y < 0) f.position.y += 7; })); }
  function wallWin(g, x, y, z, w, h, col, frame) { plane(w, h, basic({ color: col }), g, x, y, z); const fm = M(frame || 0x3a2a20); box(w + .2, .1, .12, fm, g, x, y + h / 2, z + .03); box(w + .2, .1, .12, fm, g, x, y - h / 2, z + .03); for (const s of [-1, 0, 1]) box(.08, h, .1, fm, g, x + s * w / 2, y, z + .03); box(w, .06, .08, fm, g, x, y, z + .03); }
  function curtain(g, tick, x, y, z, w, h, col) { const c = box(w, h, .05, M(col, { side: T.DoubleSide }), g, x, y, z); tick.push(t => { c.rotation.z = Math.sin(t * .9 + x) * .025; c.scale.x = 1 + Math.sin(t * 1.3 + x) * .04; }); return c; }
  function room(g, w, d, h, floor, wall, ceil) { plane(w, d, floor, g, 0, 0, d / 2 - 3.2, -Math.PI / 2); plane(w, h, wall, g, 0, h / 2, -3.2); for (const s of [-1, 1]) { const p = plane(d, h, wall, g, s * w / 2, h / 2, d / 2 - 3.2); p.rotation.y = -s * Math.PI / 2; } if (ceil) box(w, .2, d, ceil, g, 0, h + .1, d / 2 - 3.2); }
  const woodTex = () => rep(TX.planks(), 5, 4);

  SETS.observatory = function () {
    sd = 3; const g = grp(), tick = [], mb = marble(0xd8c8c8);
    mesh(new T.CircleGeometry(8, 28), mb, g, 0, 0, 0).rotation.x = -Math.PI / 2;
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28, x = Math.sin(a) * 7, z = Math.cos(a) * 7 - 1; if (z > 2.5) continue; const br = i % 4 === 1; const c = column(g, x, z, br ? 2.2 : 6.5, mb, 0); if (!br && i % 2 === 0) { const ar = box(3.4, .3, .5, mb, g, Math.sin(a + .26) * 7, 6.6, Math.cos(a + .26) * 7 - 1); ar.rotation.y = a + .26; } }
    const fp = cyl(.3, .33, 4.2, 10, mb, g, -2.6, .34, -.9); fp.rotation.set(0, .5, Math.PI / 2); cyl(.3, .32, 1.4, 10, mb, g, 3.2, .3, -1.6).rotation.set(.4, 0, Math.PI / 2);
    const sh = new T.MeshPhongMaterial({ color: 0xbfd8ff, shininess: 120, specular: 0xffffff, transparent: true, opacity: .55, flatShading: true }); for (let i = 0; i < 70; i++) { const s = mesh(new T.TetrahedronGeometry(.05 + rnd() * .12), sh, g, (rnd() - .5) * 9, .02, -3 + rnd() * 5.5); s.scale.y = .15; s.rotation.y = rnd() * 6; }
    const t = TX.bldg(.5), cm = basic({ map: t, color: 0xff8a60, fog: false }); for (let i = 0; i < 26; i++) { const w = 3 + rnd() * 5, h = 4 + rnd() * rnd() * 22; box(w, h, 3, cm, g, -80 + i * 6.2 + rnd() * 3, h / 2 - 16, -70 - rnd() * 20); }
    const fires = []; for (let i = 0; i < 16; i++) fires.push(glow(i % 2 ? 0xff6a20 : 0xffa030, 9 + rnd() * 9, g, -70 + rnd() * 140, -12 + rnd() * 12, -68, .55)); tick.push(t => fires.forEach((f, i) => f.scale.setScalar(10 + Math.sin(t * (2 + i % 3) + i) * 3)));
    glow(0xff3020, 46, g, 6, 34, -150, .8); glow(0xff8050, 24, g, 6, 34, -150, .9); mesh(new T.CircleGeometry(7.2, 24), basic({ color: 0x050002, fog: false }), g, 6, 34, -149);
    const em = []; for (let i = 0; i < 30; i++) em.push(glow(0xff9040, .06, g, 0, 0, 0, .9)); tick.push(t => em.forEach((e, i) => { const u = (t * .12 + i / 30) % 1; e.position.set(-6 + (i * 37 % 120) / 10 + Math.sin(t + i) * .3, u * 6, -4 + (i * 53 % 60) / 10); }));
    light(0xff5030, 1.2, 16, g, 0, 3, 2);
    return { g, cam: { p: [0, 1.6, 6.4], l: [0, 1.3, 0] }, seat: 'chair', tick, env: 'eclipse' };
  };

  SETS.bedroom = function () {
    sd = 8; const g = grp(), tick = [], wl = M(0xe9e2d2), wd = M(0x6a4a34);
    room(g, 11, 9, 4, M(0xffffff, { map: woodTex() }), wl, M(0xf4efe4));
    wallWin(g, -2.6, 2.2, -3.18, 2.2, 2.6, 0xdff2d8, 0xf4efe4); wallWin(g, 2.8, 2.2, -3.18, 2.2, 2.6, 0xdff2d8, 0xf4efe4);
    for (const x of [-2.6, 2.8]) { for (let i = 0; i < 8; i++) ico(.14, M(i % 2 ? 0xffffff : 0x5a8a4a), g, x - .8 + rnd() * 1.6, 1.2 + rnd() * .5, -3.12); for (const s of [-1, 1]) curtain(g, tick, x + s * 1.25, 2.3, -3.0, .6, 3, 0xa9c9a4); glow(0xfff4d0, 4, g, x, 2.2, -2.9, .35); }
    const bed = grp(g, -3.4, 0, -1.6); box(2.2, .5, 3, wd, bed, 0, .25, 0); box(2.1, .22, 2.9, M(0xf8f4ec), bed, 0, .6, 0); box(2.1, .1, 1.8, M(0xb9d2b4), bed, 0, .74, .5); for (const s of [-1, 1]) box(.8, .16, .5, M(0xffffff), bed, s * .5, .78, -1.1); box(2.3, 1.5, .12, wd, bed, 0, .95, -1.5);
    const bt = table(g, -1.8, -2.5, .34, .62, 0x6a4a34); box(.26, .01, .18, M(0xfbf3df), bt, 0, .645, 0); box(.26, .012, .03, gold(), bt, 0, .65, -.06); cyl(.05, .04, .16, 8, M(0x8fb4d8, { shininess: 80 }), bt, .2, .72, -.1);
    plane(4.6, 3, M(0xffffff, { map: TX.carpet() }), g, .6, .012, 0, -Math.PI / 2); box(1.4, 2.4, .5, wd, g, 4.6, 1.2, -2.8); box(.9, 1.5, .04, M(0xcfe0e8, { shininess: 100 }), g, 2.2, 1.4, -3.15).visible = false;
    return { g, cam: { p: [0, 1.5, 5.6], l: [0, 1.25, 0] }, seat: 'chair', tick, env: 'morning', indoor: 1 };
  };

  SETS.drawing = function (time) {
    sd = 14; const g = grp(), tick = [], sum = time === 'summer', wl = M(sum ? 0xe6dcc4 : 0xc9cfd6), wd = M(0x4a3020);
    room(g, 12, 9, 4.2, M(0xffffff, { map: woodTex() }), wl, M(0xefe8da));
    box(1.5, 3, .12, wd, g, 0, 1.5, -3.14); box(1.3, 2.8, .06, M(0x5a3a26), g, 0, 1.45, -3.08); ico(.05, gold(), g, .5, 1.35, -3.02); box(1.8, .16, .2, wd, g, 0, 3.05, -3.1);
    for (const x of [-3.6, 3.6]) { wallWin(g, x, 2.3, -3.18, 2, 2.6, sum ? 0xcfe6d8 : 0x8a96a6, 0x4a3020); for (const s of [-1, 1]) curtain(g, tick, x + s * 1.15, 2.3, -3.02, .5, 3, sum ? 0xb9c9a4 : 0x5a6a80); }
    const rm = basic({ color: 0xdfe8f4, transparent: true, opacity: .5, depthWrite: false }), dr = []; for (let i = 0; i < 40; i++) { const p = plane(.012, .22, rm, g, (i % 2 ? -3.6 : 3.6) + (rnd() - .5) * 1.9, 1 + rnd() * 2.6, -3.16); dr.push(p); } tick.push((t, dt) => dr.forEach(p => { p.position.y -= dt * (sum ? 1.2 : 2.4); if (p.position.y < 1) p.position.y += 2.6; }));
    const dk = grp(g, -3.6, 0, -1.2); box(1.7, .08, .8, wd, dk, 0, .78, 0); for (const a of [-1, 1]) box(.5, .78, .7, wd, dk, a * .58, .39, 0); for (let i = 0; i < 5; i++) { const l = box(.22, .012, .14, M(0xfbf3df), dk, -.5 + i * .22, .83 + i * .004, (i % 2) * .12 - .1); l.rotation.y = i * .4; } cyl(.03, .03, .1, 6, M(0x15151a), dk, .6, .87, -.2); lantern(dk, .6, .82, .15, .8, sum ? false : true);
    box(2.6, .5, .9, M(0x6a2a34), g, 3.6, .3, -1.6); box(2.6, .7, .2, M(0x6a2a34), g, 3.6, .8, -2.0); box(1.6, 3, .4, wd, g, 5.3, 1.5, -1.6);
    plane(5, 3.2, M(0xffffff, { map: TX.carpet() }), g, 0, .012, .2, -Math.PI / 2);
    if (sum) { const v = grp(g, 2.2, 0, -2.6); cyl(.12, .09, .3, 8, M(0xcfe0e8, { shininess: 90 }), v, 0, .95, 0); table(v, 0, 0, .3, .8, 0x4a3020); }
    light(0xffe0b0, sum ? .5 : .8, 9, g, -3, 2, 0);
    return { g, cam: { p: [0, 1.55, 6], l: [0, 1.3, 0] }, seat: 'chair', tick, env: sum ? 'morning' : 'rainy', indoor: 1 };
  };

  SETS.ballroom = function () {
    sd = 31; const g = grp(), tick = [], gm = gold(), wl = M(0x3a2c34);
    plane(18, 14, new T.MeshPhongMaterial({ color: 0x6a4a2a, shininess: 130, specular: 0xffd9a0 }), g, 0, 0, -1, -Math.PI / 2);
    plane(18, 9, wl, g, 0, 4.5, -7.5); for (const s of [-1, 1]) { const p = plane(14, 9, wl, g, s * 9, 4.5, -1); p.rotation.y = -s * Math.PI / 2; }
    for (let i = -3; i <= 3; i++) { column(g, i * 2.8, -7, 8, M(0xa89878)); box(2.5, .5, 1.2, gm, g, i * 2.8 + 1.4, 3.6, -7); for (let k = 0; k < 5; k++) cyl(.03, .03, .6, 5, gm, g, i * 2.8 + .4 + k * .5, 4.1, -6.5); box(2.5, .06, .08, gm, g, i * 2.8 + 1.4, 4.4, -6.5); plane(1.6, 2.2, basic({ color: 0xffd9a0 }), g, i * 2.8 + 1.4, 5.8, -7.4); }
    plane(18, 14, basic({ color: 0x0c1430 }), g, 0, 9, -1, Math.PI / 2); for (let i = -4; i <= 4; i++) box(.08, .08, 14, gm, g, i * 2, 8.9, -1);
    snow(g, tick, 60);
    const cd = []; for (let i = 0; i < 46; i++) { const c = grp(g, (rnd() - .5) * 16, 3 + rnd() * 4, -6.5 + rnd() * 7); cyl(.025, .025, .18, 5, M(0xf4ead8), c, 0, 0, 0); glow(0xffc860, .5, c, 0, .14, 0, 1); cd.push(c); c.userData.y = c.position.y; } tick.push(t => cd.forEach((c, i) => (c.position.y = c.userData.y + Math.sin(t * .7 + i) * .15)));
    const dn = []; for (let i = 0; i < 7; i++) { const p = grp(g, 0, 0, 0), cA = [0x8a2a3a, 0x2a4a7a, 0xc9a85a, 0x5a3a6a, 0xefe6d2, 0x2a5a4a, 0x7a3a2a][i]; const w = grp(p, .22, 0, 0), mn = grp(p, -.22, 0, 0); cyl(.1, .42, 1.05, 10, M(cA, { shininess: 30 }), w, 0, .52, 0); cyl(.11, .1, .42, 8, M(cA), w, 0, 1.26, 0); ico(.11, M(0xe0b890), w, 0, 1.6, 0, 1); ico(.12, M(0x2a1a14), w, 0, 1.66, -.03, 1); cyl(.13, .12, .9, 8, M(0x17171c), mn, 0, .45, 0); cyl(.2, .15, .55, 8, M(0x1d1d24), mn, 0, 1.2, 0); ico(.115, M(0xd8a880), mn, 0, 1.64, 0, 1); ico(.118, M(0x1a1410), mn, 0, 1.7, -.03, 1); dn.push(p); }
    tick.push(t => dn.forEach((p, i) => { const a = t * .25 + i * .9, r = 3 + (i % 3) * 1.1; p.position.set(Math.sin(a) * r * 1.6, 0, -4.4 + Math.cos(a) * 1.3); p.rotation.y = t * .8 + i; }));
    light(0xffd090, .7, 16, g, 0, 4, 2); light(0xffc070, .4, 14, g, -5, 3, -3); light(0xffc070, .4, 14, g, 5, 3, -3);
    return { g, cam: { p: [0, 1.6, 6.6], l: [0, 1.4, 0] }, seat: 'chair', tick, env: 'ball', indoor: 1 };
  };

  SETS.conservatory = function () {
    sd = 44; const g = grp(), tick = [], ir = M(0x2a3a34, { shininess: 40 }), gl = new T.MeshPhongMaterial({ color: 0x9fc8e0, transparent: true, opacity: .14, shininess: 120, specular: 0xffffff });
    plane(9, 14, M(0xffffff, { map: X.TX.tile() }), g, 0, 0, -1, -Math.PI / 2);
    for (let z = -7; z <= 3; z += 2.5) { for (const s of [-1, 1]) cyl(.05, .05, 3.4, 6, ir, g, s * 3.6, 1.7, z); const ar = mesh(new T.TorusGeometry(3.6, .05, 5, 18, Math.PI), ir, g, 0, 3.4, z); }
    for (const s of [-1, 1]) { const p = plane(12, 3.4, gl, g, s * 3.6, 1.7, -2); p.rotation.y = -s * Math.PI / 2; box(.06, .06, 12, ir, g, s * 3.6, 1.7, -2); }
    plane(7.2, 5, gl, g, 0, 2.5, -7.5); box(1.4, 2.6, .1, M(0x3a2a20), g, 0, 1.3, -7.4); glow(0xffc870, 5, g, 0, 1.6, -7.2, .5); light(0xffc070, .9, 9, g, 0, 1.8, -5.5);
    for (const [x, z] of [[-2.6, -1.4], [2.7, -1.8], [-2.7, -4.6], [2.6, -5], [-2.8, 1.6], [2.8, 1.4]]) { cyl(.32, .26, .5, 8, M(0xb9a68a), g, x, .25, z); cyl(.06, .08, 1.3, 6, M(0x5a4030), g, x, 1.1, z); for (let i = 0; i < 9; i++) ico(.3 + rnd() * .15, M(i % 4 ? 0x2f6a3a : 0x3a7a44), g, x + (rnd() - .5) * .7, 1.9 + rnd() * .7, z + (rnd() - .5) * .7); for (let i = 0; i < 7; i++) ico(.07, M(0xf0902a, { shininess: 40 }), g, x + (rnd() - .5) * .9, 1.7 + rnd() * .9, z + (rnd() - .5) * .9, 1); }
    for (const s of [-1, 1]) { box(.5, .3, 9, M(0x8a7a64), g, s * 3.2, .15, -2); for (let i = 0; i < 40; i++) ico(.07 + rnd() * .05, M(i % 3 ? 0xffffff : 0x4a8a4a), g, s * 3.2 + (rnd() - .5) * .3, .36 + rnd() * .12, -6.4 + rnd() * 8.8); }
    snow(g, tick, 30); glow(0xdfe6ff, 7, g, -30, 40, -150, 1);
    return { g, cam: { p: [0, 1.55, 6], l: [0, 1.35, 0] }, seat: 'chair', tick, env: 'glass' };
  };

  SETS.archive = function () {
    sd = 52; const g = grp(), tick = [], st = M(0x26323a), wd = M(0x2a2018);
    mesh(new T.CircleGeometry(9, 28), M(0x1c262c, { shininess: 40 }), g, 0, 0, -1).rotation.x = -Math.PI / 2;
    const seal = mesh(new T.RingGeometry(1.2, 1.5, 28), basic({ color: 0x5fe0e8, transparent: true, opacity: .7 }), g, 0, .02, .1); seal.rotation.x = -Math.PI / 2; const s2 = mesh(new T.RingGeometry(.5, .58, 6), basic({ color: 0x5fe0e8, transparent: true, opacity: .7 }), g, 0, .022, .1); s2.rotation.x = -Math.PI / 2; tick.push(t => { s2.rotation.z = t * .4; seal.material.opacity = .5 + Math.sin(t * 2) * .2; });
    const cr = []; for (let r = 0; r < 2; r++) for (let i = 0; i < 13; i++) { const a = (i / 12 - .5) * 2.9, R = 6.4 + r * 1.6, x = Math.sin(a) * R, z = -Math.cos(a) * R + 1.8, sh = grp(g, x, r * 2.6 - (r ? .2 : 0), z); sh.rotation.y = -a; box(1.5, 3, .5, wd, sh, 0, 1.5, 0); for (let k = 0; k < 3; k++) { box(1.4, .05, .5, M(0x3a2c20), sh, 0, .5 + k * .9, .02); const cg = grp(sh, -.35 + ((i + k) % 3) * .35, .78 + k * .9, .2); const col = [0x5fe0e8, 0xb07af0, 0xe8d05f][(i + k + r) % 3]; const c = mesh(new T.OctahedronGeometry(.11), basic({ color: col }), cg); glow(col, .5, cg, 0, 0, 0, .7); for (const [a2, b2] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) box(.012, .34, .012, gold(), cg, a2 * .13, 0, b2 * .13); box(.3, .014, .3, gold(), cg, 0, .17, 0); box(.3, .014, .3, gold(), cg, 0, -.17, 0); cr.push(c); } }
    tick.push(t => cr.forEach((c, i) => (c.rotation.y = t * .6 + i)));
    box(18, .4, 1.2, st, g, 0, 2.5, -5.2); for (let i = 0; i < 9; i++) box(.9, .16, .5, st, g, -5.4 + i * .3, .1 + i * .28, 2 - i * .5).rotation.y = .4;
    const pd = grp(g, 0, 0, -1.6); cyl(.3, .4, .9, 8, st, pd, 0, .45, 0); const big = mesh(new T.OctahedronGeometry(.26), basic({ color: 0x9ff4f8 }), pd, 0, 1.35, 0); const bg = glow(0x5fe0e8, 2.4, pd, 0, 1.35, 0, .8); const bl = light(0x5fe0e8, 1.3, 10, pd, 0, 1.5, .5); tick.push(t => { big.rotation.y = t; big.position.y = 1.35 + Math.sin(t * 1.4) * .06; });
    O.archiveLamp = { big, bg, bl };
    return { g, cam: { p: [0, 1.6, 6.2], l: [0, 1.3, 0] }, seat: 'chair', tick, env: 'vault', indoor: 1 };
  };

  SETS.residence = function (time) {
    sd = 66; const g = grp(), tick = [], keep = time === 'keep', wd = M(0x2c1c14), pn = M(0x3a2a20, { map: woodTex() });
    room(g, 12, 9, 4.2, M(0x4a3626, { map: woodTex() }), pn, M(0x1c120c));
    for (let i = -5; i <= 5; i += 2) box(.14, 4.2, .1, wd, g, i, 2.1, -3.14);
    if (!keep) { const fp = grp(g, 0, 0, -3); box(2.6, 2, .5, M(0x5a5a60), fp, 0, 1, 0); box(1.5, 1.2, .3, M(0x0a0808), fp, 0, .6, .12); box(3, .16, .7, M(0x6a6a70), fp, 0, 2.05, .05); for (let i = 0; i < 3; i++) cyl(.07, .07, .9, 6, M(0x1a1410), fp, -.3 + i * .3, .12, .3).rotation.z = 1.5; for (const x of [-4, 4]) curtain(g, tick, x, 2.2, -3.05, 2.2, 3.6, 0x4a1a22); box(2.4, .5, .9, M(0x2a2a34), g, -3.8, .3, -1.4); box(2.4, .7, .2, M(0x2a2a34), g, -3.8, .8, -1.8); }
    else { for (const x of [-3.4, 0, 3.4]) { box(2.6, 3.2, .4, wd, g, x, 1.6, -2.95); for (let k = 0; k < 4; k++) box(2.4, .05, .4, M(0x4a3626), g, x, .5 + k * .75, -2.9); } const it = (x, y, f) => { const o = grp(g, x, y, -2.78); f(o); return o; };
      it(-3.9, 1.3, o => { box(.03, .7, .01, M(0x8a8f96, { shininess: 80 }), o, 0, .2, 0).rotation.z = 1.3; box(.03, .3, .012, M(0x3a2416), o, .3, .1, 0).rotation.z = 1.3; }); it(-2.9, 2.03, o => box(.1, .34, .01, M(0x8e1f26), o, 0, .17, 0)); it(0, 1.28, o => o.add(O.makeProp('bluecup')));
      it(.7, 2.03, o => box(.2, .26, .03, M(0x3a2618), o, 0, .13, 0)); it(3.2, 1.28, o => { ico(.08, M(0xf0c3c9), o, 0, .08, 0); cyl(.05, .04, .1, 6, M(0xcfe0e8), o, 0, .0, 0); }); it(3.9, .53, o => box(.26, .04, .2, M(0x27407a), o, 0, .02, 0)); it(-.8, .53, o => box(.3, .2, .2, M(0x5a3620), o, 0, .1, 0));
      glow(0xffd9a0, 2.6, g, 0, 1.6, -2.5, .25); light(0xffd9a0, .9, 7, g, 0, 2, -1.4); }
    plane(5, 3.2, M(0x8a8a9a, { map: TX.carpet() }), g, 0, .012, .2, -Math.PI / 2); light(0x9fb0d8, .6, 9, g, 3, 2.4, 1);
    return { g, cam: { p: [0, 1.55, 6], l: [0, 1.3, 0] }, seat: 'chair', tick, env: 'wood', indoor: 1 };
  };

  SETS.pavilion = function (time) {
    sd = 71; const g = grp(), tick = [], dusk = time === 'dusk', sm = M(dusk ? 0xb8a8a8 : 0x9aa2a8);
    plane(60, 60, M(dusk ? 0x4a5a44 : 0x5a6a58), g, 0, -.3, -10, -Math.PI / 2);
    box(6.5, .3, 5, sm, g, 0, -.15, -.6); box(7.3, .16, 5.8, sm, g, 0, -.3, -.6); for (const a of [-1, 1]) for (const b of [-1, 1]) column(g, a * 2.8, -.6 + b * 2, 3.6, sm);
    const rf = mesh(new T.ConeGeometry(5.4, 1.6, 4), M(0x3a4a50), g, 0, 4.6, -.6); rf.rotation.y = Math.PI / 4; box(7, .25, 5.6, sm, g, 0, 3.75, -.6); box(2.2, .5, .6, sm, g, 0, .25, -2.2);
    const wm = new T.MeshPhongMaterial({ color: dusk ? 0x3a3a5a : 0x4a5a68, shininess: 110, specular: 0xaab8c8, flatShading: true }), wg = new T.PlaneGeometry(40, 22, 30, 16), wtr = mesh(wg, wm, g, 0, -.28, -16); wtr.rotation.x = -Math.PI / 2; const wp = wg.attributes.position; tick.push(t => { for (let i = 0; i < wp.count; i++) wp.setZ(i, Math.sin(wp.getX(i) * 1.3 + t * 3) * .03 + Math.cos(wp.getY(i) * 1.7 + t * 2.2) * .03); wp.needsUpdate = true; wg.computeVertexNormals(); });
    for (let i = 0; i < 9; i++) { const x = -18 + i * 4.4 + rnd() * 2, z = -26 - rnd() * 6; cyl(.3, .4, 4, 6, M(0x3a3028), g, x, 2, z); for (let k = 0; k < 6; k++) ico(1.4 + rnd(), M(dusk ? 0x3a4a44 : 0x4a6a54), g, x + (rnd() - .5) * 2.4, 4.4 + rnd() * 2, z + (rnd() - .5) * 2); }
    if (!dusk) rain(g, tick, 160, 16); else { for (const a of [-1, 1]) { const l = lantern(g, a * 2.4, 2.9, 1.2, 1.4); tick.push(t => { l.rotation.z = Math.sin(t * 2 + a) * .08; }); } light(0xffb060, 1.3, 10, g, 0, 2.6, 1.4); }
    return { g, cam: { p: [0, 1.55, 6.2], l: [0, 1.3, 0] }, seat: 'chair', tick, env: dusk ? 'dusk' : 'rainy' };
  };

  SETS.hall = function () {
    sd = 83; const g = grp(), tick = [], wd = M(0x6a4a30);
    room(g, 14, 10, 5, M(0xb08a5a, { map: woodTex() }), M(0xd8ccb4), M(0x4a3626));
    for (let i = -2; i <= 2; i++) { wallWin(g, i * 2.7, 3, -3.18, 1.5, 3, 0xfff0c8, 0x4a3626); const b = plane(1.5, 7, basic({ color: 0xffe8b0, transparent: true, opacity: .1, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide }), g, i * 2.7, 1.6, -.6); b.rotation.x = -1.05; }
    const rk = grp(g, -5.6, 0, -2.6); box(.1, 2, 2.4, wd, rk, 0, 1, 0); for (let i = 0; i < 5; i++) { box(.03, 1.5, .02, M(0xcfd3dc, { shininess: 90 }), rk, .1, 1.1, -.9 + i * .45); box(.03, .1, .16, wd, rk, .1, .34, -.9 + i * .45); }
    box(2, .08, .9, wd, g, 4.6, .8, -2.2); for (const a of [-1, 1]) box(.1, .8, .8, wd, g, 4.6 + a * .9, .4, -2.2);
    for (const x of [-3.4, 3.2]) { const d = grp(g, x, 0, -2.5); cyl(.05, .07, 1.5, 6, wd, d, 0, .75, 0); cyl(.22, .2, .6, 8, M(0xb9a070), d, 0, 1.3, 0); ico(.16, M(0xb9a070), d, 0, 1.75, 0, 1); box(.9, .08, .08, wd, d, 0, 1.45, 0); }
    return { g, cam: { p: [0, 1.6, 6.4], l: [0, 1.35, 0] }, seat: 'chair', tick, env: 'morning', indoor: 1 };
  };

  SETS.chamber = function (time) {
    sd = 97; const g = grp(), tick = [], brk = time === 'break', st = M(0x2a1c20), k = brk ? 3 : 1;
    mesh(new T.RingGeometry(3.4, 11, 28), M(0x241418), g, 0, 0, -3).rotation.x = -Math.PI / 2; mesh(new T.CircleGeometry(3.4, 24), basic({ color: 0x050102 }), g, 0, -.05, -6).rotation.x = -Math.PI / 2; plane(8, 6, M(0x241418), g, 0, 0, 1.2, -Math.PI / 2);
    for (let i = 0; i < 9; i++) { const a = (i / 8 - .5) * 3, x = Math.sin(a) * 10, z = -Math.cos(a) * 10 - 2; column(g, x, z, 11, st); }
    const hg = grp(g, 0, 5, -6), hm = new T.MeshPhongMaterial({ color: 0x8a1018, emissive: 0x5a0408, shininess: 60, flatShading: true }); const core = ico(1.5, hm, hg, 0, 0, 0, 1); const rings = []; for (let i = 0; i < 4; i++) { const r = mesh(new T.TorusGeometry(2 + i * .45, .09, 6, 20), gold(), hg); r.rotation.set(i * .8, i * .5, 0); rings.push(r); } for (let i = 0; i < 8; i++) { const c = cyl(.5, .5, .18, 10, M(0x6a5a40, { shininess: 60 }), hg, Math.cos(i * .785) * 2.7, Math.sin(i * .785) * 2.7, .3); c.rotation.x = Math.PI / 2; rings.push(c); }
    const hl = light(0xff2030, 2, 22, hg, 0, 0, 2), hgw = glow(0xff2030, 9, hg, 0, 0, 0, .6);
    const th = [], tm = basic({ color: 0xff3040, transparent: true, opacity: .7 }); for (let i = 0; i < 90; i++) { const a = rnd() * 6.28, R = 4 + rnd() * 9, x = Math.cos(a) * R, z = -6 + Math.sin(a) * R * .6, len = Math.hypot(x, 7, z + 6), t = cyl(.012, .012, len, 3, tm, g, x / 2, 8.5, (z - 6) / 2); t.lookAt(0, 5, -6); t.rotateX(Math.PI / 2); t.userData.noCast = 1; th.push(t); }
    tick.push(t => { const b = 1 + Math.sin(t * 2.2 * k) * .06 * k; core.scale.setScalar(b); hl.intensity = 1.6 + Math.sin(t * 2.2 * k) * .7; hgw.scale.setScalar(9 * b); rings.forEach((r, i) => { r.rotation.z = t * (.2 + i * .07) * k * (i % 2 ? 1 : -1); }); th.forEach((x, i) => { x.material.opacity = .5 + Math.sin(t * 3 + i) * .2; if (brk) x.position.x += Math.sin(t * 9 + i) * .02; }); if (brk) g.position.x = Math.sin(t * 31) * .02; });
    const al = grp(g, 2.6, 0, -1.4); cyl(.3, .4, 1, 8, st, al, 0, .5, 0); box(.7, .06, .4, M(0x8a1018), al, 0, 1.03, 0);
    if (brk) { const dst = []; for (let i = 0; i < 30; i++) dst.push(glow(0xd8b0a0, .1, g, 0, 0, 0, .6)); tick.push(t => dst.forEach((d, i) => { const u = (t * .3 + i / 30) % 1; d.position.set(-6 + (i * 41 % 120) / 10, 7 - u * 7, -5 + (i * 29 % 70) / 10); })); }
    return { g, cam: { p: [0, 1.6, 6.6], l: [0, 1.6, 0] }, seat: 'chair', tick, env: 'heart', indoor: 1 };
  };

  SETS.garden = function (time) {
    sd = 109; const g = grp(), tick = [], gate = time === 'gate';
    plane(60, 40, M(gate ? 0xb8a888 : 0x6a8a58), g, 0, 0, -8, -Math.PI / 2);
    if (!gate) {
      plane(7, 5, M(0xffffff, { map: X.TX.tile() }), g, 0, .01, -.4, -Math.PI / 2);
      const f = grp(g, 1.2, 0, -.9), sm = M(0xe5d8c0); cyl(1.2, 1.3, .5, 10, sm, f, 0, .25, 0); cyl(1.05, 1.05, .05, 10, new T.MeshPhongMaterial({ color: 0x5fb0c8, shininess: 100, transparent: true, opacity: .85 }), f, 0, .5, 0); cyl(.14, .18, 1, 6, sm, f, 0, .7, 0); cyl(.5, .16, .16, 8, sm, f, 0, 1.25, 0); const jets = []; for (let i = 0; i < 10; i++) jets.push(glow(0xdff4ff, .16, f, 0, 1.3, 0, .8)); tick.push(t => jets.forEach((j, i) => { const u = (t * .9 + i / 10) % 1, a = i * 2.4; j.position.set(Math.cos(a) * u * .6, 1.35 + u * .5 - u * u * 1.3, Math.sin(a) * u * .6); }));
      for (let i = -4; i <= 4; i++) { box(2, 1.3, .9, M(0x3a6a3a), g, i * 2.1, .65, -4.4); for (let k = 0; k < 6; k++) ico(.12, M(k % 2 ? 0xffffff : 0xf0c3c9), g, i * 2.1 + (rnd() - .5) * 1.8, 1.1 + rnd() * .3, -3.9); }
      for (let i = 0; i < 60; i++) { const p = mesh(new T.CircleGeometry(.05, 5), M(i % 2 ? 0xffffff : 0xf0c3c9, { side: T.DoubleSide }), g, (rnd() - .5) * 8, .02, -3 + rnd() * 5); p.rotation.x = -Math.PI / 2; }
      box(30, 9, 1, M(0xd8ccb8), g, 0, 4.5, -12); for (let i = -5; i <= 5; i++) plane(1, 2, basic({ color: 0x6a7a90 }), g, i * 2.6, 5, -11.45); box(4, 3, 3, M(0x8a8078), g, -9, 1, -9).rotation.z = .3;
    } else {
      const wl = M(0xc8b8a0); for (const s of [-1, 1]) { box(8, 8, 2, wl, g, s * 6.4, 4, -5); cyl(1.6, 1.8, 10, 8, wl, g, s * 2.9, 5, -5); mesh(new T.ConeGeometry(1.9, 2, 8), M(0x4a5a70), g, s * 2.9, 11, -5); } box(4.4, 2.4, 2, wl, g, 0, 7.4, -5); plane(4, 60, M(0xa89878), g, 0, .012, -30, -Math.PI / 2); plane(4, 9, M(0xa89878), g, 0, .012, -1, -Math.PI / 2);
      const h = grp(g, 1.9, 0, -.6), hm = M(0x5a3a26), dk = M(0x1c120c); h.rotation.y = -.5; const bd = cyl(.34, .36, 1.5, 8, hm, h, 0, 1.15, 0); bd.rotation.x = Math.PI / 2; for (const a of [-1, 1]) for (const b of [-.55, .55]) { cyl(.085, .06, 1, 6, hm, h, a * .2, .5, b); box(.1, .1, .14, dk, h, a * .2, .05, b + .02); } const nk = cyl(.17, .24, .8, 6, hm, h, 0, 1.6, .85); nk.rotation.x = .8; const hd = box(.22, .26, .56, hm, h, 0, 1.95, 1.25); hd.rotation.x = .5; for (const a of [-1, 1]) mesh(new T.ConeGeometry(.04, .12, 4), hm, h, a * .08, 2.14, 1.08); box(.06, .6, .7, dk, h, 0, 1.75, .7).rotation.x = .8; const tl = cyl(.05, .02, .8, 5, dk, h, 0, 1.0, -.85); tl.rotation.x = -.4; box(.5, .1, .6, M(0x2a1a10), h, 0, 1.53, -.05); box(.6, .5, .3, M(0x3a2618), h, 0, 1.3, -.5); const fl = O.makeProp('flowers'); fl.position.set(.3, 1.45, -.3); fl.scale.setScalar(1.5); h.add(fl); tick.push(t => (hd.rotation.x = .5 + Math.sin(t * .8) * .05));
    }
    glow(0xffe8c0, 16, g, 30, 10, -160, 1); glow(0xffb080, 60, g, 30, 10, -160, .4);
    return { g, cam: { p: [0, 1.55, 6.2], l: [0, 1.3, 0] }, seat: 'chair', tick, env: 'dawn' };
  };
})();

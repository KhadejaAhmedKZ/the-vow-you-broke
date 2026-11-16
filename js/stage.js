// Only You, Khadeja — stage v2: scene, cast, staging, shadows, camera, render loop
(function () {
  const T = THREE, O = window.OYK, { M, box, grp, ctex } = O.u;
  const SLOT = { ll: -1.9, l: -1.15, cl: -.55, c: 0, cr: .55, r: 1.15, rr: 1.9 };
  const RIM = { sunset: [0xffb070, .75], night: [0x8fa6ff, .6], day: [0xffffff, .35], shop: [0xffc070, .5], dark: [0x8fa6ff, .75], fire: [0xff7030, .9], warm: [0xffc080, .5], attic: [0x9fb4ff, .8] };
  const S = (O.stage = { chars: {}, state: { bg: null, time: null, cast: [], outfits: {}, cam: ['wide'], kiss: null } });
  let renderer, scene, camera, hemi, sun, fill, rim, sky, stars, set = null, shot = ['wide'], cut = true, speaker = null, lastOther = null, t0 = performance.now() / 1000, tt = 0, push = 0;
  const camP = new T.Vector3(), camL = new T.Vector3(), dP = new T.Vector3(), dL = new T.Vector3(), v1 = new T.Vector3(), v2 = new T.Vector3(); let fovC = 36, dF = 36;

  S.init = function (canvas) {
    renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    scene = new T.Scene(); camera = new T.PerspectiveCamera(36, 1, .1, 600);
    hemi = new T.HemisphereLight(0xffffff, 0x444444, .7); scene.add(hemi);
    sun = new T.DirectionalLight(0xffffff, 1); sun.castShadow = true; const sc = sun.shadow.camera; sc.left = -8; sc.right = 8; sc.top = 8; sc.bottom = -4; sc.near = 1; sc.far = 50;
    const small = Math.min(window.innerWidth, window.innerHeight) < 600; sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048); sun.shadow.bias = -.0008; sun.shadow.normalBias = .035; scene.add(sun); scene.add(sun.target);
    fill = new T.DirectionalLight(0xffffff, .4); scene.add(fill); scene.add(fill.target);
    rim = new T.DirectionalLight(0xffffff, .5); rim.position.set(-3, 3.5, -6); scene.add(rim); scene.add(rim.target); rim.target.position.set(0, 1.2, 0);
    sky = new T.Mesh(new T.SphereGeometry(320, 16, 12), new T.MeshBasicMaterial({ side: T.BackSide, fog: false, depthWrite: false })); scene.add(sky);
    const sp = []; for (let i = 0; i < 700; i++) { const a = Math.random() * 6.283, e = Math.random() * 1.3 + .08; sp.push(Math.cos(a) * Math.cos(e) * 300, Math.sin(e) * 300, Math.sin(a) * Math.cos(e) * 300); }
    const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.Float32BufferAttribute(sp, 3));
    stars = new T.Points(sg, new T.PointsMaterial({ color: 0xffffff, size: 1.7, sizeAttenuation: false, fog: false, transparent: true, opacity: .9 })); scene.add(stars);
    window.addEventListener('resize', resize); resize(); requestAnimationFrame(loop);
  };
  function resize() {
    const w = window.innerWidth, h = window.innerHeight, pr = Math.min(window.devicePixelRatio || 1, 2, 1100 / Math.max(w, h) * 1.4);
    renderer.setPixelRatio(Math.max(.75, pr)); renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); cut = true;
  }

  S.setScene = function (bg, time) {
    if (set) { scene.remove(set.g); set.g.traverse(o => { if (o.geometry) o.geometry.dispose(); }); }
    S.state.bg = bg; S.state.time = time || 'night'; S.state.kiss = null;
    set = (O.SETS[bg] || O.SETS.cafe)(S.state.time); scene.add(set.g);
    set.g.traverse(o => { if (o.isMesh) { const m = o.material; o.castShadow = !(m.transparent || m.isMeshBasicMaterial || o.userData.noCast); o.receiveShadow = !m.isMeshBasicMaterial; } });
    const en = set.env || S.state.time, e = O.ENV[en] || O.ENV.night;
    if (sky.material.map) sky.material.map.dispose();
    sky.material.map = ctex(4, 256, g => { const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, e.sky[0]); gr.addColorStop(.3, e.sky[1]); gr.addColorStop(.46, e.sky[2]); gr.addColorStop(.52, e.sky[3]); gr.addColorStop(1, e.sky[3]); g.fillStyle = gr; g.fillRect(0, 0, 4, 256); });
    sky.material.map.magFilter = T.LinearFilter; sky.material.needsUpdate = true;
    scene.fog = new T.Fog(e.fog[0], e.fog[1], e.fog[2]); renderer.setClearColor(e.fog[0]);
    hemi.color.set(e.hemi[0]); hemi.groundColor.set(e.hemi[1]); hemi.intensity = e.hemi[2];
    v1.set(e.sun[2], e.sun[3], e.sun[4]).normalize().multiplyScalar(16); if (v1.y < 5) v1.y = 5; sun.color.set(e.sun[0]); sun.intensity = e.sun[1]; sun.position.copy(v1); sun.target.position.set(0, 0, 0);
    fill.color.set(e.fill[0]); fill.intensity = e.fill[1]; stars.visible = !!e.stars && !set.indoor;
    const rm = e.rim || RIM[en] || RIM.night; rim.color.set(rm[0]); rim.intensity = rm[1];
    Object.values(S.chars).forEach(r => { r.x = r.tx; r.c.g.position.x = r.tx; applySeat(r); });
    cut = true;
  };

  function ensure(id) {
    const of = S.state.outfits[id]; let r = S.chars[id];
    if (r && r.outfit === of) return r;
    if (r) scene.remove(r.c.g);
    const c = O.buildChar(id, of); r = S.chars[id] = { id, c, outfit: of, x: 0, tx: 0, z: 0, tz: 0, ry: 0, face: null, on: false, prop: null };
    const ch = (r.chair = grp(c.g)), wm = M(0x3a2416), s = c.s; box(.44 * s, .05, .44 * s, wm, ch, 0, .405 * s, -.02); box(.44 * s, .5 * s, .04, wm, ch, 0, .7 * s, -.24 * s); for (const a of [-1, 1]) for (const b of [-1, 1]) box(.04, .4 * s, .04, wm, ch, a * .19 * s, .2 * s, b * .19 * s - .02);
    const cu = (r.cush = grp(c.g)); box(.66, .13, .62, M(0x8e1f26), cu, 0, .065, -.05); box(.5, .135, .46, M(0xd9b66a), cu, 0, .066, -.05);
    ch.visible = cu.visible = false; c.g.visible = false; scene.add(c.g); return r;
  }
  function applySeat(r) {
    const c = r.c, sit = c.pt.dy > 0 && !/kneel|fall/.test(c.pose);
    if (sit && set && set.seat === 'cushion') { c.pt.kn = 2.5; c.pt.lg = -1.42; c.pt.dy = 1.68; }
    r.chair.visible = sit && set && set.seat === 'chair'; r.cush.visible = sit && set && set.seat === 'cushion';
  }
  function place(r, slot, snap) {
    r.slot = slot; let x = SLOT[slot] !== undefined ? SLOT[slot] : parseFloat(slot) || 0;
    if (set && set.car) x = x < 0 ? -.4 : .4;
    r.tx = x; r.tz = 0; if (snap) { r.x = x; r.z = 0; }
  }
  // list: [{id,slot,pose,expr,face,prop}]; replace: remove others; snap: no walking
  S.cast = function (list, replace, snap) {
    S.state.kiss = null;
    if (replace) Object.values(S.chars).forEach(r => { if (!list.find(l => l.id === r.id)) { r.on = false; r.leaving = false; r.c.g.visible = false; } });
    list.forEach(l => {
      const r = ensure(l.id), was = r.on && !r.leaving, fresh = !was || snap; r.on = true; r.leaving = false; r.c.g.visible = true; r.face = l.face || null;
      place(r, l.slot || r.slot || 'c', fresh);
      if (!was && !snap && !replace && !(set && set.car)) { r.x = (r.tx >= 0 ? 1 : -1) * 3.3; }
      if (l.pose || fresh) { r.c.setPose(l.pose || 'stand'); applySeat(r); }
      if (l.expr || fresh) r.c.setExpr(l.expr || 'neutral');
      if (l.prop !== undefined || fresh) { r.prop = l.prop || null; if (r.prop || !r.c.autoProp) r.c.setProp(r.prop); }
      if (l.fx !== undefined || fresh) { ['shadow', 'mark', 'aura'].forEach(n => r.c.setFx(n, (l.fx || []).includes(n))); r.fx = (l.fx || []).slice(); }
      if (fresh) { r.c.snap(); r.ry = null; }
    });
    sync();
  };
  S.exit = function (id) { const r = S.chars[id]; if (r && r.on) { if (set && set.car) { r.on = false; r.c.g.visible = false; } else { r.leaving = true; r.tx = (r.x >= 0 ? 1 : -1) * 3.6; r.tz = 0; if (r.c.pt.dy > 0) { r.c.setPose('stand'); applySeat(r); } } } if (S.state.kiss && S.state.kiss.includes(id)) S.state.kiss = null; sync(); };
  S.outfit = function (id, name) { const was = S.chars[id]; S.state.outfits[id] = name; if (was && was.on && !was.leaving) { const o = { id, slot: was.slot, pose: was.c.pose, expr: was.c.expr, face: was.face, prop: was.prop, fx: was.fx }; was.on = false; S.cast([o], false, true); } };
  S.pose = function (id, p) { const r = S.chars[id]; if (r) { r.c.setPose(p); applySeat(r); sync(); } };
  S.expr = function (id, e) { const r = S.chars[id]; if (r) { r.c.setExpr(e); sync(); } };
  S.prop = function (id, p) { const r = S.chars[id]; if (r) { r.prop = p && p !== 'none' ? p : null; r.c.setProp(r.prop); sync(); } };
  S.fx = function (id, n, on) { const r = S.chars[id]; if (r) { r.fx = (r.fx || []).filter(x => x !== n); if (on) r.fx.push(n); r.c.setFx(n, on); sync(); } };
  S.act = function (id, n) { const r = S.chars[id]; if (r && r.on) r.c.act(n); };
  S.face = function (id, t) { const r = S.chars[id]; if (r) { r.face = t === 'auto' ? null : t; sync(); } };
  S.move = function (id, slot) { const r = S.chars[id]; if (r) { S.state.kiss = null; place(r, slot); sync(); } };
  S.cam = function (arr) { shot = arr.slice(); S.state.cam = shot; cut = true; push = 0; };
  // mode: near | kiss | hug | hold
  S.near = function (a, b, dist, mode) {
    const A = S.chars[a], B = S.chars[b]; if (!A || !B || !A.on || !B.on) return; mode = mode || (dist < .4 ? 'kiss' : 'near');
    const mid = (A.tx + B.tx) / 2, sgn = A.tx <= B.tx ? -1 : 1; A.tx = mid + sgn * dist / 2; B.tx = mid - sgn * dist / 2; A.tz = .02; B.tz = -.02;
    S.state.kiss = [a, b, dist, mode]; A.face = b; B.face = a;
    const tall = A.c.d.h > B.c.d.h ? A : B, sm = tall === A ? B : A;
    if (mode === 'kiss') for (const r of [tall, sm]) { const p = r.c.pt, t = r === tall; p.hx = t ? .2 : -.2; p.hz = t ? .1 : -.1; p.tx = Math.max(p.tx, .1); p.aLx = p.aRx = t ? -.5 : -.3; p.eL = p.eR = t ? -.75 : -1.0; p.aLt = p.aRt = t ? .35 : .7; }
    else if (mode === 'hug') for (const r of [tall, sm]) { const p = r.c.pt, t = r === tall; p.aLx = p.aRx = t ? -.4 : -.25; p.eL = p.eR = t ? -1.55 : -.7; p.aLt = p.aRt = t ? .95 : .6; p.tx = Math.max(p.tx, t ? .12 : .05); p.hx = t ? .22 : .08; p.hl = t ? 0 : .14; }
    else if (mode === 'dance') { S.state.dmid = mid; for (const [r, h] of [[A, 'R'], [B, 'L']]) { const p = r.c.pt; p['a' + h + 'x'] = -.9; p['e' + h] = -.5; const o = h === 'R' ? 'L' : 'R'; p['a' + o + 'x'] = -.7; p['e' + o] = -1.1; p['a' + o + 't'] = .6; } }
    else if (mode === 'hold') { const L = A.tx <= B.tx ? A : B, R = L === A ? B : A; for (const [r, h] of [[L, 'R'], [R, 'L']]) { const p = r.c.pt; p['a' + h + 'x'] = -.62; p['e' + h] = -.5; p['a' + h + 't'] = .0; } }
  };
  S.speak = function (id) { Object.values(S.chars).forEach(r => (r.c.talkOn = r.id === id)); if (id) { speaker = id; if (id !== 'K') lastOther = id; } };
  function sync() { S.state.cast = Object.values(S.chars).filter(r => r.on && !r.leaving).map(r => ({ id: r.id, slot: r.slot, pose: r.c.pose, expr: r.c.expr, face: r.face, prop: r.prop || undefined, fx: r.fx && r.fx.length ? r.fx : undefined })); }
  S.snapshot = function () { sync(); return JSON.parse(JSON.stringify(S.state)); };
  S.restore = function (st) {
    S.state.outfits = Object.assign({}, st.outfits); S.setScene(st.bg, st.time); S.cast(st.cast || [], true, true);
    if (st.kiss) { S.near(st.kiss[0], st.kiss[1], st.kiss[2], st.kiss[3]); Object.values(S.chars).forEach(r => { r.x = r.tx; r.z = r.tz; r.c.snap(); }); }
    S.cam(st.cam || ['wide']); speaker = null;
  };
  S.clear = function () { Object.values(S.chars).forEach(r => { r.on = false; r.leaving = false; r.c.g.visible = false; }); S.state.kiss = null; sync(); };
  S.isOn = id => !!(S.chars[id] && S.chars[id].on && !S.chars[id].leaving);

  function target(r) {
    if (r.face && S.chars[r.face] && S.chars[r.face].on) return S.chars[r.face];
    const on = Object.values(S.chars).filter(o => o.on && !o.leaving && o !== r); if (!on.length) return null;
    if (r.id === 'K') { const sp = S.chars[speaker !== 'K' ? speaker : lastOther] || S.chars[lastOther]; if (sp && sp.on && !sp.leaving && sp !== r) return sp; }
    else if (S.isOn('K')) return S.chars.K;
    return on.sort((a, b) => Math.abs(a.x - r.x) - Math.abs(b.x - r.x))[0];
  }
  function head(id, v) { const r = S.chars[id]; if (!r || !r.on || r.leaving) return null; return r.c.headPos(v); }
  function onIds() { return Object.values(S.chars).filter(r => r.on && !r.leaving).map(r => r.id); }

  function calcShot() {
    let type = shot[0], a = shot[1], b = shot[2]; const ids = onIds(), asp = camera.aspect, port = asp < 1;
    if (!ids.length || !set) type = 'wide';
    if ((type === 'close' || type === 'ots') && !head(a)) type = ids.length ? 'group' : 'wide';
    if ((type === 'two' || type === 'kiss' || type === 'tight' || type === 'orbit') && (!head(a) || !head(b))) type = ids.length ? 'group' : 'wide';
    let f = 36, pf = 1, shift = .2;
    if (type === 'wide' || type === 'low' || type === 'high') {
      dP.fromArray(set.cam.p); dL.fromArray(set.cam.l); f = 40; pf = 1.05; shift = .1;
      if (type === 'low') { dP.set(1.4, .55, 4.4); dL.set(0, 1.5, 0); }
      if (type === 'high') { dP.set(-1.5, 3.8, 7.6); dL.set(0, .9, -.5); shift = 0; }
      if (set.car) { f = 34; pf = .5; shift = 0; dP.fromArray(set.cam.p); dL.fromArray(set.cam.l); }
    } else if (type === 'group' || type === 'two' || type === 'tight') {
      const list = type === 'group' ? ids : [a, b]; let x0 = 9, x1 = -9, y = 0;
      list.forEach(i => { head(i, v1); x0 = Math.min(x0, v1.x); x1 = Math.max(x1, v1.x); y += v1.y / list.length; });
      const sep = x1 - x0; dL.set((x0 + x1) / 2, y - .06, 0); dP.set(dL.x + (type === 'group' ? 0 : .25), y + .04, (type === 'tight' ? 1.25 : 1.75) + sep * 1.15); f = type === 'tight' ? 30 : 34; pf = .95; if (set.car) dP.z = Math.min(dP.z, 2.1);
    } else if (type === 'close') {
      const r = S.chars[a]; head(a, v1); dL.copy(v1); dL.y -= .01; dP.set(v1.x + Math.sin(r.ry || 0) * .6, v1.y + .03, v1.z + 1.05); f = 27; pf = .2; shift = .26;
    } else if (type === 'ots') {
      const k = b && head(b) ? b : (a === 'K' ? (lastOther && head(lastOther) ? lastOther : ids.find(i => i !== 'K')) : 'K');
      head(a, v1); if (!k || !head(k, v2)) { dL.copy(v1); dP.set(v1.x, v1.y, 1.3); } else { const dx = Math.sign(v1.x - v2.x) || 1; dL.copy(v1); dL.x -= dx * .12; dP.set(v2.x - dx * .42, v2.y + .1, v2.z + .62); } f = 30; pf = .25; shift = .22;
    } else if (type === 'orbit') {
      head(a, v1); head(b, v2); dL.set((v1.x + v2.x) / 2, (v1.y + v2.y) / 2, (v1.z + v2.z) / 2); const an = Math.sin(tt * .22) * .9; dP.set(dL.x + Math.sin(an) * 2.3, dL.y + .1, dL.z + Math.cos(an) * 2.3); f = 30; pf = .4; shift = .22;
    } else if (type === 'kiss') {
      head(a, v1); head(b, v2); dL.set((v1.x + v2.x) / 2, (v1.y + v2.y) / 2, 0); dP.set(dL.x + .1, dL.y + .03, set.car ? 1.7 : 1.9); f = 26; pf = .3; shift = .24;
    }
    v1.subVectors(dP, dL); if (port) v1.multiplyScalar(1 + (1 - asp) * 1.05 * pf);
    v1.multiplyScalar(1 + .06 * Math.exp(-push * .45));
    const dist = v1.length(); dP.addVectors(dL, v1);
    if (port) { f = Math.min(62, f * 1.25); shift += .2; }
    const sh = dist * Math.tan(f * Math.PI / 360) * shift; dL.y -= sh; dP.y -= sh * .35; dF = f;
  }

  function loop() {
    requestAnimationFrame(loop);
    const now = performance.now() / 1000, dt = Math.min(.2, now - t0); t0 = now; tt += dt; push += dt;
    if (!set) return;
    set.tick.forEach(f => f(tt, dt));
    Object.values(S.chars).forEach(r => {
      if (!r.on) return; const c = r.c;
      const dx = r.tx - r.x, sp = (S.state.kiss && S.state.kiss.includes(r.id) ? .9 : 1.9) * dt, far = Math.abs(dx) > .03;
      r.x += Math.abs(dx) <= sp ? dx : Math.sign(dx) * sp; r.z += (r.tz - r.z) * Math.min(1, dt * 4); c.g.position.set(r.x + c.rootX * (c.side || 1), 0, r.z);
      c.walk += ((far && Math.abs(dx) > .25 && !(c.pt.dy > 0 && !/kneel|fall/.test(c.pose)) ? 1 : 0) - c.walk) * Math.min(1, dt * 8);
      if (r.leaving && !far) { r.on = false; r.leaving = false; c.g.visible = false; return; }
      let ry = 0, look = 0, gz = 0; const kz = S.state.kiss && S.state.kiss.includes(r.id), md = kz && S.state.kiss[3];
      if (r.leaving || (far && c.walk > .5 && !kz)) { ry = Math.sign(dx) * 1.35; }
      else if (r.face === 'cam') ry = 0; else if (r.face === 'away') { ry = (r.x >= 0 ? 1 : -1) * 2.5; }
      else { const t = target(r); if (t) { const d = Math.sign(t.tx - r.tx) || 1; c.side = d; ry = d * (md === 'hug' ? .98 : md === 'kiss' ? (set.car ? .75 : 1.02) : kz ? .9 : set.car ? .3 : .74); look = d * (kz ? .05 : .2); gz = d * (kz ? .3 : .8); } }
      if (md === 'dance') { const K = S.state.kiss, o = S.chars[K[0] === r.id ? K[1] : K[0]], sg = K[0] === r.id ? 1 : -1, a = tt * .7, mid = S.state.dmid; r.x = r.tx = mid + Math.cos(a) * .27 * sg; r.z = r.tz = Math.sin(a) * .27 * sg; c.g.position.set(r.x, Math.abs(Math.sin(tt * 2.8)) * .012, r.z); ry = Math.atan2(-Math.cos(a) * sg, -Math.sin(a) * sg); r.ry = ry; look = 0; gz = 0; c.walk = .25; }
      if (r.ry === null) r.ry = ry; r.ry += (ry - r.ry) * Math.min(1, dt * 5); c.g.rotation.y = r.ry + c.rootRy * (c.side || 1); c.lookY = look; c.gaze = gz;
      c.update(dt, tt);
    });
    calcShot();
    if (shot[0] === 'orbit') { camP.copy(dP); camL.copy(dL); }
    if (cut) { camP.copy(dP); camL.copy(dL); fovC = dF; cut = false; } else { const kc = Math.min(1, dt * 2.6); camP.lerp(dP, kc); camL.lerp(dL, kc); fovC += (dF - fovC) * kc; }
    camera.position.copy(camP); camera.position.x += Math.sin(tt * .23) * .035; camera.position.y += Math.sin(tt * .31) * .015;
    if (camera.fov !== fovC) { camera.fov = fovC; camera.updateProjectionMatrix(); }
    camera.lookAt(camL); fill.position.copy(camera.position); fill.position.y += .6; fill.target.position.copy(camL);
    sky.position.copy(camera.position); stars.position.copy(camera.position);
    renderer.render(scene, camera);
  }
})();

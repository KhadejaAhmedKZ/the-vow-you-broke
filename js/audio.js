// Only You, Khadeja — generated music + sound (Web Audio; no audio files)
(function () {
  const O = window.OYK, A = (O.audio = { music: .6, sfx: .7, mood: null });
  let ctx, master, mGain, sGain, pad = [], padGain, timer, next = 0, step = 0, cur = null, noiseBuf;
  const hz = n => 440 * Math.pow(2, (n - 69) / 12);
  const MOODS = {
    warm: { root: 50, scale: [0, 1, 4, 5, 7, 8, 10, 12], drone: [38, 45, 50], tempo: .42, dens: .62, bright: 2200, vol: 1 },
    soft: { root: 57, scale: [0, 2, 3, 7, 8, 12, 14], drone: [45, 52, 60], tempo: .58, dens: .5, bright: 1700, vol: .9 },
    night: { root: 53, scale: [0, 2, 4, 7, 9, 11, 12, 16], drone: [41, 48, 57], tempo: .52, dens: .45, bright: 1500, vol: .85 },
    desert: { root: 50, scale: [0, 1, 4, 5, 7, 8, 11, 12], drone: [38, 50], tempo: .36, dens: .7, bright: 2400, vol: 1, drum: 1 },
    tense: { root: 46, scale: [0, 1, 3, 6, 7, 8], drone: [34, 35, 46], tempo: .8, dens: .32, bright: 900, vol: .9, pulse: 1 },
    sad: { root: 52, scale: [0, 2, 3, 5, 7, 8, 12], drone: [40, 47, 55], tempo: .7, dens: .42, bright: 1300, vol: .85 }
  };
  A.start = function () {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    ctx = new AC(); master = ctx.createGain(); master.connect(ctx.destination);
    mGain = ctx.createGain(); sGain = ctx.createGain(); mGain.connect(master); sGain.connect(master); A.setVol();
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    timer = setInterval(tick, 120); if (A.mood) { const m = A.mood; A.mood = null; A.setMood(m); }
  };
  A.setVol = function () { if (!ctx) return; mGain.gain.value = A.music * .5; sGain.gain.value = A.sfx * .6; };
  function pluck(f, t, v, bright) {
    const n = Math.floor(ctx.sampleRate * 1.6), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0), p = Math.max(2, Math.round(ctx.sampleRate / f));
    for (let i = 0; i < p; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / p * .3);
    for (let i = p; i < n; i++) d[i] = (d[i - p] + d[i - p + 1]) * .497;
    const s = ctx.createBufferSource(); s.buffer = b; const g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = bright;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + 1.5); s.connect(lp); lp.connect(g); g.connect(mGain); s.start(t);
  }
  function thump(t, v, dest) { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(95, t); o.frequency.exponentialRampToValueAtTime(42, t + .18); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + .3); o.connect(g); g.connect(dest || mGain); o.start(t); o.stop(t + .32); }
  A.setMood = function (m) {
    if (m === 'none') m = null; if (m === A.mood) return; A.mood = m; if (!ctx) return; const t = ctx.currentTime;
    if (padGain) { const og = padGain, op = pad; og.gain.cancelScheduledValues(t); og.gain.setValueAtTime(og.gain.value, t); og.gain.linearRampToValueAtTime(0, t + 1.6); setTimeout(() => op.forEach(o => { try { o.stop(); } catch (e) { } }), 1900); }
    pad = []; padGain = null; cur = m ? MOODS[m] : null; if (!cur) return;
    padGain = ctx.createGain(); padGain.gain.setValueAtTime(0, t); padGain.gain.linearRampToValueAtTime(.085 * cur.vol, t + 2.2);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cur.bright * .45; lp.connect(padGain); padGain.connect(mGain);
    cur.drone.forEach((n, i) => { for (const dt of [-4, 5]) { const o = ctx.createOscillator(); o.type = i ? 'triangle' : 'sawtooth'; o.frequency.value = hz(n); o.detune.value = dt; const g = ctx.createGain(); g.gain.value = i ? .5 : .22; o.connect(g); g.connect(lp); o.start(); pad.push(o); } });
    next = t + .6; step = 0; A.last = 3;
  };
  function tick() {
    if (!ctx || !cur) return;
    while (next < ctx.currentTime + .4) {
      const c = cur, r = Math.random();
      if (r < c.dens) { A.last = Math.max(0, Math.min(c.scale.length - 1, A.last + Math.round((Math.random() - .5) * 4))); pluck(hz(c.root + c.scale[A.last] + (Math.random() < .2 ? 12 : 0)), next, .2 * c.vol, c.bright); if (Math.random() < .22) pluck(hz(c.root + c.scale[Math.max(0, A.last - 2)]), next + c.tempo / 2, .12, c.bright); }
      if (step % 8 === 0) pluck(hz(c.root - 12), next, .22, c.bright * .6);
      if (c.drum && (step % 8 === 0 || step % 8 === 3 || step % 8 === 6)) thump(next, step % 8 ? .12 : .22);
      if (c.pulse && step % 4 < 2) thump(next + (step % 4) * .0, step % 4 ? .1 : .2);
      next += c.tempo; step++;
    }
  }
  A.play = function (n) {
    if (!ctx || A.sfx <= 0) return; const t = ctx.currentTime; const tone = (f, d, v, type, at) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(v, t + (at || 0)); g.gain.exponentialRampToValueAtTime(.001, t + (at || 0) + d); o.connect(g); g.connect(sGain); o.start(t + (at || 0)); o.stop(t + (at || 0) + d + .02); };
    if (n === 'click') tone(880, .06, .12, 'triangle');
    else if (n === 'choice') { tone(660, .12, .14, 'triangle'); tone(990, .16, .1, 'triangle', .07); }
    else if (n === 'chime') { [784, 988, 1175, 1568].forEach((f, i) => tone(f, .7, .1, 'sine', i * .09)); }
    else if (n === 'heart') { thump(t, .5, sGain); thump(t + .28, .35, sGain); }
    else if (n === 'phone') { tone(1320, .1, .1, 'sine'); tone(1760, .14, .1, 'sine', .12); }
    else if (n === 'sting') { tone(110, 1.2, .25, 'sawtooth'); tone(116.5, 1.2, .2, 'sawtooth'); }
    else if (n === 'door' || n === 'whoosh') { const s = ctx.createBufferSource(); s.buffer = noiseBuf; const g = ctx.createGain(), f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.setValueAtTime(n === 'door' ? 200 : 500, t); f.frequency.exponentialRampToValueAtTime(n === 'door' ? 80 : 2400, t + .4); g.gain.setValueAtTime(.3, t); g.gain.exponentialRampToValueAtTime(.001, t + .45); s.connect(f); f.connect(g); g.connect(sGain); s.start(t); s.stop(t + .5); }
  };
})();

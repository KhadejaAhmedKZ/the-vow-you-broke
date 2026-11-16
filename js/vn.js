// Only You, Khadeja — visual novel runtime, menus, saves
(function () {
  const O = window.OYK, S = O.stage, A = O.audio, $ = id => document.getElementById(id);
  const PROFILE = new URLSearchParams(location.search).get('profile'), KEY = 'vow_save_v1' + (PROFILE ? '_' + PROFILE.replace(/\W/g, '') : ''), NAMES = { K: 'Khadeja', E: 'Ellis', R: 'Rayan', V: 'Lady Vesper', '?': '???' };
  const NUM = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  let D = loadData(), prog, V = {}, pc = 0, hist = [], chapter = 0, lineN = 0, music = null, autocam = true;
  let running = false, typing = null, waiting = null, auto = false, skip = false, autoT = null, fullText = '', modalOpen = false;

  function loadData() { let d = {}; try { d = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { } d.slots = d.slots || {}; d.chapters = d.chapters || {}; d.gallery = d.gallery || {}; d.endings = d.endings || {}; d.set = Object.assign({ speed: 45, instant: false, music: .6, sfx: .7 }, d.set || {}); return d; }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) { toast('Could not save on this device'); } }
  function toast(t) { const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2200); }
  const on = id => S.isOn(id);
  const res = to => (typeof to === 'string' ? prog.labels[to] : to);
  const clone = o => JSON.parse(JSON.stringify(o));

  // ---------- running the script ----------
  function run() {
    for (let guard = 0; guard < 5000; guard++) {
      const ins = prog.P[pc]; if (!ins) return toTitle();
      if (ins.cond && !O.test(V, ins.cond)) { pc++; continue; }
      if (ins.op === 'go') { pc = res(ins.to); continue; }
      if (ins.op === 'say') return showSay(ins);
      if (ins.op === 'choice') return showChoice(ins);
      if (cmd(ins) === 'block') return; pc++;
    }
  }
  function resume() { if (!running) return; pc++; run(); }
  function spec(s) { const p = s.split(':'); const o = { id: p[0], slot: p[1] || undefined, pose: p[2] || undefined, expr: p[3] || undefined, face: p[4] || undefined }; if (p[5]) o.prop = p[5]; return o; }
  function block(ms, clickable) { let done = false; const go = () => { if (done) return; done = true; waiting = null; clearTimeout(t); resume(); }; const t = setTimeout(go, skip ? 60 : ms); waiting = clickable ? go : () => { }; return 'block'; }
  function cmd(ins) {
    const a = ins.args;
    switch (ins.name) {
      case 'bg': S.clear(); S.setScene(a[0], a[1]); autocam = true; S.cam(['wide']); hideProp(); break;
      case 'cast': S.cast(a.map(spec), true); break;
      case 'enter': S.cast(a.map(spec), false); break;
      case 'exit': a.forEach(S.exit); break;
      case 'pose': S.pose(a[0], a[1]); break;
      case 'x': for (let i = 0; i < a.length; i += 2) S.expr(a[i], a[i + 1]); break;
      case 'face': S.face(a[0], a[1]); break;
      case 'move': S.move(a[0], a[1]); break;
      case 'near': S.near(a[0], a[1], .56, 'near'); autocam = false; S.cam(['two', a[0], a[1]]); break;
      case 'hold': S.near(a[0], a[1], .58, 'hold'); autocam = false; S.cam(['two', a[0], a[1]]); break;
      case 'hug': S.near(a[0], a[1], .31, 'hug'); autocam = false; S.cam(['kiss', a[0], a[1]]); break;
      case 'prop': S.prop(a[0], a[1]); break;
      case 'act': for (let i = 0; i < a.length; i += 2) S.act(a[i], a[i + 1]); break;
      case 'fx': S.fx(a[0], a[1], a[2] !== 'off'); break;
      case 'dance': S.near(a[0], a[1], .54, 'dance'); autocam = false; S.cam(['orbit', a[0], a[1]]); break;
      case 'kiss': S.near(a[0], a[1], .37, 'kiss'); S.expr(a[0], 'closed'); S.expr(a[1], 'closed'); autocam = false; S.cam(['kiss', a[0], a[1]]); break;
      case 'apart': S.cast(S.snapshot().cast, false); autocam = true; break;
      case 'cam': if (a[0] === 'auto') autocam = true; else { autocam = false; S.cam(a); } break;
      case 'outfit': S.outfit(a[0], a[1]); break;
      case 'music': music = a[0]; A.setMood(a[0]); break;
      case 'sfx': A.play(a[0]); break;
      case 'fade': $('fade').classList.add('on'); A.play('whoosh'); return block(560);
      case 'flash': $('flash').classList.remove('on'); void $('flash').offsetWidth; $('flash').classList.add('on'); clearTimeout(cmd.ft); cmd.ft = setTimeout(() => $('flash').classList.remove('on'), 950); break;
      case 'shake': $('stage').classList.remove('shake'); void $('stage').offsetWidth; $('stage').classList.add('shake'); setTimeout(() => $('stage').classList.remove('shake'), 500); break;
      case 'wait': return block(+a[0] || 600);
      case 'title': chapter = +a[0]; D.chapters[chapter] = { V: clone(V) }; persist(); hideDlg(); $('fade').classList.add('on'); $('cardA').textContent = 'Chapter ' + NUM[chapter]; $('cardB').textContent = a.slice(1).join(' '); $('card').classList.remove('hidden'); A.play('chime'); pc++; autosave(); pc--; return block(3000, true);
      case 'card': hideDlg(); $('fade').classList.add('on'); $('cardA').textContent = ''; $('cardB').textContent = ins.raw; $('card').classList.remove('hidden'); return block(2400, true);
      case 'cg': if (!D.gallery[a[0]]) { D.gallery[a[0]] = S.snapshot(); persist(); toast('New scene in Gallery'); A.play('chime'); } break;
      case 'note': showProp('<div class="note">' + ins.raw.split('//')[0].trim() + (ins.raw.includes('//') ? '<small>' + ins.raw.split('//')[1].trim() + '</small>' : '') + '</div>'); break;
      case 'photo': showPhoto(a[0], ins.raw.slice(a[0].length).trim()); break;
      case 'hide': hideProp(); break;
      case 'set': O.applyFx(V, ins.raw.split(/\s+/).map(t => { const m = t.match(/^(\w+)(\+|-|=)(.+)$/); return { k: m[1], op: m[2], v: isNaN(+m[3]) ? m[3] : +m[3] }; })); break;
      case 'if': if (O.test(V, a.slice(0, -1).join(' '))) { pc = res(a[a.length - 1]); pc--; } break;
      case 'go': pc = res(a[0]) - 1; break;
      case 'end': return ending(a[0]);
      case 'stop': toTitle(); return 'block';
      default: console.warn('unknown command', ins.name);
    }
  }
  function clearFade() { $('fade').classList.remove('on'); $('card').classList.add('hidden'); }
  function hideDlg() { $('dlg').classList.add('hidden'); S.speak(null); }
  function director(ins) {
    if (!autocam || S.state.kiss) return; const w = ins.who, n = lineN % 6;
    if (!on(w)) return;
    const others = S.state.cast.map(c => c.id).filter(i => i !== w);
    if (w === 'K') { if (ins.think || !others.length || (n !== 0 && n !== 3)) S.cam(['close', 'K']); else S.cam(['two', 'K', S.chars.K.face && on(S.chars.K.face) ? S.chars.K.face : others[others.length - 1]]); }
    else if ((n === 2 || n === 5) && on('K')) S.cam(['ots', w, 'K']); else if (n === 3 && on('K')) S.cam(['two', w, 'K']); else S.cam(['close', w]);
  }
  function showSay(ins) {
    clearFade(); $('choices').innerHTML = '';
    const w = ins.who; if (ins.expr && on(w)) { S.expr(w, ins.expr); const am = { laugh: 'laugh', surprised: 'gasp', sad: 'sigh', hurt: 'flinch', angry: 'clench', shy: 'lookaway', cry: 'bowhead', fear: 'gasp', think: 'tilt', jealous: 'clench', tease: 'tilt', cold: 'lean' }[ins.expr]; if (am && !S.state.kiss) S.act(w, am); }
    S.speak(on(w) && !ins.think ? w : null); if (on(w)) S.speak.last = w;
    director(ins); lineN++;
    const dlg = $('dlg'), tx = $('text'); dlg.classList.remove('hidden', 'done'); $('hud').classList.remove('hidden');
    $('name').textContent = w ? (NAMES[w] || w) : ''; tx.className = ins.think ? 'think' : w ? '' : 'nar';
    fullText = ins.think ? '(' + ins.text + ')' : ins.text; hist.push({ w: w ? (NAMES[w] || w) : '', t: fullText }); if (hist.length > 120) hist.shift();
    if (lineN % 6 === 0) autosave();
    waiting = () => { waiting = null; pc++; run(); };
    clearInterval(typing); typing = null; clearTimeout(autoT);
    if (skip || D.set.instant) { tx.textContent = fullText; finishType(); }
    else { let i = 0; tx.textContent = ''; const per = Math.max(1, Math.round(D.set.speed / 30)); typing = setInterval(() => { i += per; tx.textContent = fullText.slice(0, i); if (i >= fullText.length) finishType(); }, 1000 / 30); }
  }
  function finishType() { clearInterval(typing); typing = null; $('text').textContent = fullText; $('dlg').classList.add('done'); S.speak(null); clearTimeout(autoT); if (skip) autoT = setTimeout(advance, 45); else if (auto) autoT = setTimeout(advance, 1300 + fullText.length * 48); }
  function advance() { if (!running || modalOpen) return; if (typing) return finishType(); if (waiting) { A.play('click'); waiting(); } }
  function showChoice(ins) {
    clearFade(); setSkip(false); clearTimeout(autoT); S.speak(null); waiting = null; autosave();
    const box = $('choices'); box.innerHTML = ''; $('dlg').classList.remove('done');
    ins.opts.filter(o => O.test(V, o.cond)).forEach(o => { const b = document.createElement('button'); b.textContent = o.text; b.onclick = e => { e.stopPropagation(); A.play('choice'); box.innerHTML = ''; O.applyFx(V, o.fx); hist.push({ w: '', t: '› ' + o.text, c: 1 }); pc = o.label ? res(o.label) : o.to; run(); }; box.appendChild(b); });
  }
  function showProp(html) { const p = $('prop'); p.innerHTML = html; p.classList.remove('hidden'); }
  function hideProp() { $('prop').classList.add('hidden'); $('prop').innerHTML = ''; }
  function showPhoto(id, cap) {
    showProp('<div class="photo"><canvas width="360" height="260"></canvas><small>' + cap + '</small></div>'); const g = $('prop').querySelector('canvas').getContext('2d');
    const fig = (x, y, s, col) => { g.fillStyle = col; g.beginPath(); g.arc(x, y - 78 * s, 11 * s, 0, 7); g.fill(); g.fillRect(x - 15 * s, y - 66 * s, 30 * s, 42 * s); g.fillRect(x - 13 * s, y - 26 * s, 11 * s, 26 * s); g.fillRect(x + 2 * s, y - 26 * s, 11 * s, 26 * s); };
    g.fillStyle = '#0b0d18'; g.fillRect(0, 0, 360, 260);
    if (id === 'rescue') {
      g.fillStyle = '#1a1420'; g.fillRect(40, 20, 280, 200); let gr = g.createRadialGradient(180, 150, 10, 180, 150, 150); gr.addColorStop(0, '#ffd070'); gr.addColorStop(.4, '#ff7a20'); gr.addColorStop(1, 'rgba(120,20,0,0)'); g.fillStyle = gr; g.fillRect(40, 20, 280, 220);
      g.fillStyle = '#12090a'; g.fillRect(40, 20, 90, 200); g.fillRect(232, 20, 88, 200); g.fillRect(0, 220, 360, 40);
      fig(182, 226, 1.25, '#0a0607'); g.fillStyle = '#0a0607'; g.fillRect(148, 150, 76, 14); g.beginPath(); g.arc(146, 150, 10, 0, 7); g.fill(); g.fillRect(136, 150, 9, 44); g.fillRect(214, 156, 12, 34); g.fillStyle = '#f4ead8'; g.fillRect(196, 136, 8, 22);
    } else if (id === 'door') {
      g.fillStyle = '#141826'; g.fillRect(0, 0, 360, 260); g.fillStyle = '#1e2334'; for (let y = 0; y < 220; y += 16) g.fillRect(0, y, 360, 1); g.fillStyle = '#0d0f18'; g.fillRect(0, 222, 360, 38);
      g.fillStyle = '#2a1a10'; g.fillRect(60, 70, 70, 152); let gr = g.createLinearGradient(110, 0, 150, 0); gr.addColorStop(0, '#ffb050'); gr.addColorStop(1, 'rgba(255,120,30,0)'); g.fillStyle = gr; g.fillRect(118, 74, 40, 148);
      fig(236, 228, 1.2, '#07080d'); g.fillStyle = '#c4202c'; g.fillRect(214, 168, 7, 5); g.fillStyle = '#ffd9a0'; g.fillRect(300, 30, 6, 6);
    } else if (id === 'stairs') {
      g.fillStyle = '#10121c'; g.fillRect(0, 0, 360, 260); g.fillStyle = '#ff8a30'; g.globalAlpha = .18; g.fillRect(0, 0, 150, 260); g.globalAlpha = 1; g.fillStyle = '#1c2030'; for (let i = 0; i < 9; i++) g.fillRect(90 + i * 26, 40 + i * 22, 60, 8); g.fillStyle = '#0a0b12'; g.fillRect(0, 232, 360, 28);
      g.fillStyle = '#8a8f9c'; g.beginPath(); g.arc(214, 96, 13, 0, 7); g.fill(); g.fillRect(194, 108, 42, 96); g.fillStyle = '#6a6f7c'; g.fillRect(180, 120, 16, 50); g.fillStyle = '#3a2416'; g.fillRect(168, 150, 34, 22); g.fillStyle = '#e02030'; g.beginPath(); g.arc(186, 172, 3.2, 0, 7); g.fill(); g.fillStyle = 'rgba(255,60,70,.35)'; g.beginPath(); g.arc(186, 172, 8, 0, 7); g.fill();
    } else {
      g.fillStyle = '#16121a'; g.fillRect(0, 0, 360, 260); g.fillStyle = '#ff8a30'; g.globalAlpha = .25; g.fillRect(0, 170, 360, 90); g.globalAlpha = 1; g.fillStyle = '#2a2230'; g.fillRect(110, 40, 140, 150); g.fillStyle = '#3d3348'; g.fillRect(122, 52, 116, 126);
      g.fillStyle = '#08060a'; g.beginPath(); g.arc(180, 96, 17, 0, 7); g.fill(); g.fillRect(156, 110, 48, 68); g.fillRect(150, 92, 14, 74);
    }
    for (let i = 0; i < 1400; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * .07})`; g.fillRect(Math.random() * 360, Math.random() * 260, 1.5, 1.5); }
  }

  // ---------- saves ----------
  function anchorOf(i) { const ins = prog.P[i]; return !ins ? null : ins.op === 'say' ? ins.text : ins.op === 'choice' ? 'choice:' + ins.opts[0].text : null; }
  function locate(s) {
    let a = s.anchor; if (!a) { const last = (s.hist || []).filter(h => !h.c).slice(-1)[0]; a = last ? last.t.replace(/^\((.*)\)$/, '$1') : null; }
    if (a && anchorOf(s.pc) === a) return s.pc; let best = -1;
    if (a) prog.P.forEach((ins, i) => { if (anchorOf(i) === a && (best < 0 || Math.abs(i - s.pc) < Math.abs(best - s.pc))) best = i; });
    return best;
  }
  function snap() { const last = hist.filter(h => !h.c).slice(-1)[0]; return { ver: 2, anchor: anchorOf(pc), pc, V: clone(V), stage: S.snapshot(), music, chapter, autocam, lineN, hist: hist.slice(-50), time: Date.now(), desc: (chapter ? 'Chapter ' + chapter : 'Start') + (last ? ' — ' + (last.w ? last.w + ': ' : '') + last.t : '') }; }
  function autosave() { D.slots.auto = snap(); persist(); }
  function loadSlot(k) {
    const s = D.slots[k]; if (!s) return; closeModal(); begin();
    V = clone(s.V); hist = clone(s.hist || []); chapter = s.chapter; lineN = s.lineN || 0; music = s.music; A.setMood(music || 'none');
    const at = locate(s); $('fade').classList.add('on');
    if (at < 0) { pc = prog.labels['ch' + (chapter || 1)]; setTimeout(() => { toast('Older save: starting from Chapter ' + (chapter || 1)); run(); }, 350); return; }
    pc = at; setTimeout(() => { S.restore(s.stage); autocam = s.autocam !== false; run(); }, 350);
  }
  function begin() { A.start(); running = true; setSkip(false); auto = false; syncHud(); $('title').classList.add('hidden'); $('ending').classList.add('hidden'); $('choices').innerHTML = ''; hideProp(); $('card').classList.add('hidden'); }
  function startAt(label, vars) { begin(); V = clone(vars || {}); hist = []; lineN = 0; chapter = 0; pc = prog.labels[label]; $('fade').classList.add('on'); hideDlg(); setTimeout(run, 400); }
  function toTitle() {
    running = false; waiting = null; clearInterval(typing); typing = null; clearTimeout(autoT); hideDlg(); hideProp(); $('hud').classList.add('hidden'); $('choices').innerHTML = ''; $('card').classList.add('hidden'); $('ending').classList.add('hidden');
    S.restore({ bg: 'observatory', time: 'night', outfits: { K: 'battle', E: 'armor' }, cast: [{ id: 'K', slot: window.innerWidth < 600 ? 'cl' : 'c', pose: 'guard', expr: 'serious', face: 'cam', prop: 'sword' }, { id: 'E', slot: window.innerWidth < 600 ? 'cr' : 'rr', pose: 'kneel', expr: 'hurt', fx: ['shadow'] }], cam: window.innerWidth < 600 ? ['group'] : ['two', 'K', 'E'] });
    A.setMood('tense'); $('fade').classList.remove('on'); $('title').classList.remove('hidden');
    document.querySelector('[data-t=continue]').disabled = !D.slots.auto; document.querySelector('[data-t=load]').disabled = !Object.keys(D.slots).length; document.querySelector('[data-t=chapters]').disabled = !Object.keys(D.chapters).length;
  }
  function ending(id) {
    const e = O.ENDINGS[id] || { title: id, text: '' }; D.endings[id] = 1; persist(); hideDlg(); $('hud').classList.add('hidden'); waiting = null;
    $('etitle').textContent = e.title; $('etext').textContent = e.text; $('ethread').textContent = e.next ? (id === 'dark' ? '' : O.THREAD || '') : '';
    document.querySelector('.elab').textContent = e.next ? 'End of Part One' : 'Ending'; $('econt').classList.toggle('hidden', !e.next); $('econt').onclick = () => { $('ending').classList.add('hidden'); $('hud').classList.remove('hidden'); pc = prog.labels[e.next]; $('fade').classList.add('on'); A.play('click'); setTimeout(run, 300); }; $('ending').classList.remove('hidden'); $('fade').classList.remove('on'); A.play('chime'); return 'block';
  }

  // ---------- modals ----------
  function openModal(title, html) { modalOpen = true; $('mtitle').textContent = title; $('mbody').innerHTML = html; $('modal').classList.remove('hidden'); $('mbody').scrollTop = 0; }
  function closeModal() { modalOpen = false; $('modal').classList.add('hidden'); }
  function confirmBox(title, text, yes, fn) { openModal(title, `<p>${text}</p><div class="row"><button class="btn danger" id="cy">${yes}</button><button class="btn ghost" id="cn">Cancel</button></div>`); $('cy').onclick = () => { closeModal(); fn(); }; $('cn').onclick = closeModal; }
  const fmt = t => new Date(t).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  function slotsModal(mode) {
    const keys = mode === 'save' ? ['1', '2', '3'] : ['auto', '1', '2', '3'];
    openModal(mode === 'save' ? 'Save' : 'Load', keys.map(k => { const s = D.slots[k]; return `<div class="row"><div class="slot grow"><b>${k === 'auto' ? 'Autosave' : 'Slot ' + k}</b><small>${s ? fmt(s.time) + ' · ' + s.desc.replace(/</g, '&lt;') : 'Empty'}</small></div>${mode === 'save' ? `<button class="btn" data-s="${k}">Save</button>` : `<button class="btn" data-l="${k}" ${s ? '' : 'disabled'}>Load</button>`}${s && k !== 'auto' ? `<button class="btn ghost" data-d="${k}">Delete</button>` : ''}</div>`; }).join(''));
    $('mbody').querySelectorAll('[data-s]').forEach(b => (b.onclick = () => { const k = b.dataset.s, doit = () => { D.slots[k] = snap(); persist(); toast('Saved to slot ' + k); A.play('chime'); slotsModal('save'); }; D.slots[k] ? confirmBox('Replace save?', 'Slot ' + k + ' already has a save. Replace it?', 'Replace', doit) : doit(); }));
    $('mbody').querySelectorAll('[data-l]').forEach(b => (b.onclick = () => loadSlot(b.dataset.l)));
    $('mbody').querySelectorAll('[data-d]').forEach(b => (b.onclick = () => confirmBox('Delete save?', 'Delete slot ' + b.dataset.d + '? This cannot be undone.', 'Delete', () => { delete D.slots[b.dataset.d]; persist(); slotsModal(mode); })));
  }
  function chaptersModal() {
    openModal('Chapters', '<p>Replay from the start of a chapter you have reached. Your earlier choices are kept.</p><div class="grid">' + O.CHAPTERS.map((n, i) => `<button class="tile ${D.chapters[i + 1] ? '' : 'lock'}" data-c="${i + 1}" ${D.chapters[i + 1] ? '' : 'disabled'}><small>Chapter ${NUM[i + 1]}</small>${D.chapters[i + 1] ? n : 'Locked'}</button>`).join('') + '</div>');
    $('mbody').querySelectorAll('[data-c]').forEach(b => (b.onclick = () => { closeModal(); startAt('ch' + b.dataset.c, D.chapters[b.dataset.c].V); }));
  }
  function galleryModal() {
    const g = Object.keys(O.GALLERY), e = Object.keys(O.ENDINGS);
    openModal('Gallery', `<p>${g.filter(k => D.gallery[k]).length} of ${g.length} scenes found.</p><div class="grid">` + g.map(k => D.gallery[k] ? `<button class="tile" data-g="${k}"><small>${O.GALLERY[k][1]}</small>${O.GALLERY[k][0]}</button>` : '<div class="tile lock"><small>Locked</small>? ? ?</div>').join('') + `</div><h3 class="sec">Endings — ${e.filter(k => D.endings[k]).length} of ${e.length}</h3><div class="grid">` + e.map(k => `<div class="tile ${D.endings[k] ? '' : 'lock'}"><small>Ending</small>${D.endings[k] ? O.ENDINGS[k].title : '? ? ?'}</div>`).join('') + '</div>');
    $('mbody').querySelectorAll('[data-g]').forEach(b => (b.onclick = () => { closeModal(); $('title').classList.add('hidden'); S.restore(D.gallery[b.dataset.g]); $('gcap').textContent = O.GALLERY[b.dataset.g][0]; $('gview').classList.remove('hidden'); }));
  }
  function settingsModal() {
    const s = D.set;
    openModal('Settings', `<label class="set">Text speed<input type="range" id="s1" min="15" max="120" value="${s.speed}"></label><label class="chk"><input type="checkbox" id="s2" ${s.instant ? 'checked' : ''}>Show text instantly</label><label class="set">Music volume<input type="range" id="s3" min="0" max="100" value="${s.music * 100}"></label><label class="set">Sound volume<input type="range" id="s4" min="0" max="100" value="${s.sfx * 100}"></label><div class="row"><button class="btn ghost" id="s5">Mute all</button><button class="btn ghost" id="s7">Content note</button></div><h3 class="sec">Progress</h3><button class="btn danger" id="s6">Delete all progress</button><p style="margin-top:14px;font-size:13px;color:#6a6478">Music and sounds are generated live in your browser. Characters and places are real-time 3D.</p>`);
    const up = () => { s.speed = +$('s1').value; s.instant = $('s2').checked; s.music = $('s3').value / 100; s.sfx = $('s4').value / 100; A.music = s.music; A.sfx = s.sfx; A.setVol(); persist(); };
    ['s1', 's2', 's3', 's4'].forEach(i => ($(i).oninput = up)); $('s5').onclick = () => { $('s3').value = 0; $('s4').value = 0; up(); };
    $('s7').onclick = () => noteModal(null);
    $('s6').onclick = () => confirmBox('Delete all progress?', 'This removes every save, unlocked chapter, gallery scene and ending. It cannot be undone.', 'Delete everything', () => { const st = D.set; localStorage.removeItem(KEY); D = loadData(); D.set = st; persist(); toast('Progress deleted'); toTitle(); });
  }
  function noteModal(fn) {
    openModal('Before you begin', `<p><b>Content note.</b> A dark fantasy romance with death, a controlling marriage bond, jealousy, and one kiss that is taken without asking. The story treats that as a wrong he has to answer for.</p><p>All characters are adults. Every other kiss is your choice, and choosing distance never ends your story.</p><div class="row">${fn ? '<button class="btn rose" id="nb">Begin</button>' : ''}<button class="btn ghost" id="nc">${fn ? 'Back' : 'Close'}</button></div>`);
    if (fn) $('nb').onclick = () => { closeModal(); fn(); }; $('nc').onclick = closeModal;
  }
  function historyModal() { openModal('History', hist.map(h => h.c ? `<div class="hl ch">${h.t}</div>` : `<div class="hl">${h.w ? '<b>' + h.w + '</b> — ' : ''}${h.t.replace(/</g, '&lt;')}</div>`).join('') || '<p>Nothing yet.</p>'); $('mbody').scrollTop = 1e6; }
  function menuModal() {
    openModal('Menu', '<div class="tbtnsM">' + [['save', 'Save'], ['load', 'Load'], ['log', 'History'], ['settings', 'Settings'], ['title', 'Back to Title']].map(x => `<div class="row"><button class="btn grow" data-m="${x[0]}">${x[1]}</button></div>`).join('') + '</div>');
    $('mbody').querySelectorAll('[data-m]').forEach(b => (b.onclick = () => { const m = b.dataset.m; if (m === 'save') slotsModal('save'); else if (m === 'load') slotsModal('load'); else if (m === 'log') historyModal(); else if (m === 'settings') settingsModal(); else confirmBox('Back to title?', 'Your story is autosaved. You can use Continue to come back.', 'Go to title', () => { autosave(); toTitle(); }); }));
  }
  function setSkip(v) { skip = v; syncHud(); if (v && !typing && waiting && $('dlg').classList.contains('done')) advance(); }
  function syncHud() { document.querySelector('[data-a=auto]').classList.toggle('on', auto); document.querySelector('[data-a=skip]').classList.toggle('on', skip); }

  // ---------- wiring ----------
  function boot() {
    if (!window.THREE) { $('boot').textContent = 'Could not load the 3D library. Please check your internet connection and reload.'; return; }
    try { prog = O.compile(O.story.join('\n')); S.init($('stage')); } catch (e) { $('boot').textContent = 'Could not start: ' + e.message; console.error(e); return; }
    A.music = D.set.music; A.sfx = D.set.sfx;
    $('boot').classList.add('hidden'); toTitle();
    $('title').addEventListener('click', e => {
      const t = e.target.dataset.t; if (!t) return; A.start(); A.setMood('tense'); A.play('click');
      if (t === 'new') { const go = () => noteModal(() => startAt('ch1', {})); D.slots.auto ? confirmBox('Start a new story?', 'Your autosave will be replaced. Saves in slots 1–3 are kept.', 'Start new', go) : go(); }
      else if (t === 'continue') loadSlot('auto'); else if (t === 'load') slotsModal('load'); else if (t === 'chapters') chaptersModal(); else if (t === 'gallery') galleryModal(); else settingsModal();
    });
    $('hud').addEventListener('click', e => {
      const a = e.target.dataset.a; if (!a) return; e.stopPropagation(); A.play('click');
      if (a === 'log') historyModal(); else if (a === 'menu') menuModal(); else if (a === 'save') slotsModal('save');
      else if (a === 'auto') { auto = !auto; skip = false; syncHud(); if (auto && !typing && waiting) autoT = setTimeout(advance, 900); else clearTimeout(autoT); }
      else setSkip(!skip);
    });
    $('dlg').addEventListener('click', advance); $('stage').addEventListener('click', () => { if (skip) setSkip(false); else advance(); }); $('card').addEventListener('click', advance); $('prop').addEventListener('click', advance);
    $('mclose').onclick = closeModal; $('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
    $('gback').onclick = () => { $('gview').classList.add('hidden'); toTitle(); galleryModal(); };
    $('ebtn').onclick = toTitle;
    document.addEventListener('keydown', e => { if (modalOpen) { if (e.key === 'Escape') closeModal(); return; } if (!running) return; if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); advance(); } else if (e.key === 'Escape') menuModal(); });
    O.vn = { toTitle, loadSlot, snap, get D() { return D; }, get V() { return V; }, get pc() { return pc; }, startAt, advance, state: () => ({ pc, running, lineN, chapter, text: fullText, choices: [...$('choices').children].map(b => b.textContent) }) };
  }
  boot();
})();

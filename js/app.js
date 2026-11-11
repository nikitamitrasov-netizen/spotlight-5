/* =====================================================================
   SPOTLIGHT 5 — mind map engine
   ===================================================================== */
(function () {
  'use strict';

  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const attr = esc;
  const icon = (name) => '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  const FORCE_STILL = /[?&]still=1/.test(window.location.search);
  const prefersReduced = () => FORCE_STILL || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const STORE = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* noop */ }
    }
  };

  /* ------------------------------ state ------------------------------ */
  const state = {
    focusId: null,
    panelLeafId: null,
    panelOpen: false,
    cardsOpen: false,
    progress: new Set(STORE.get('sp5.progress', [])),
    cam: { x: 0, y: 0, s: 1, fx: 0, fy: 0, fs: 1, tx: 0, ty: 0, ts: 1, t0: null, dur: 0 },
    searchItems: [],
    searchIndex: -1,
    suppressClick: false,
    booted: false
  };

  const NODES = new Map();
  let ROOT = null;
  let MODULES = [];
  let TOTAL_LEAVES = 0;
  let raf = null;
  let toastTimer = null;

  const stage = $('#stage');
  const world = $('#world');
  const nodesLayer = $('#nodes');
  const linksSvg = $('#links');
  const panel = $('#panel');
  const panelHead = $('#panelHead');
  const panelBody = $('#panelBody');
  const panelFoot = $('#panelFoot');
  const scrim = $('#scrim');
  const crumbs = $('#crumbs');
  const dock = $('#dock');
  const searchInput = $('#searchInput');
  const searchBox = $('#search');
  const searchResults = $('#searchResults');
  const mapHintText = $('#mapHintText');

  const SVGNS = 'http://www.w3.org/2000/svg';

  /* --------------------------- colors --------------------------- */
  function rgb(hex) {
    let h = String(hex).replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function applyColor(el, hex) {
    const [r, g, b] = rgb(hex);
    el.style.setProperty('--mc', hex);
    [['08', .08], ['10', .10], ['12', .12], ['14', .14], ['16', .16], ['18', .18],
     ['22', .22], ['25', .25], ['30', .30], ['35', .35], ['40', .40], ['45', .45],
     ['55', .55], ['60', .60]].forEach(([k, a]) => {
      el.style.setProperty('--mc-' + k, 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')');
    });
  }

  /* --------------------------- build tree --------------------------- */
  function addNode(cfg) {
    const n = Object.assign({
      id: '', type: 'leaf', title: '', ru: '', icon: '', color: '#8fa2ff',
      parent: null, children: [], moduleNode: null, branchNode: null, data: null,
      el: null, link: null, w: 0, h: 0,
      x: 0, y: 0, s: .55, o: 0,
      tx: 0, ty: 0, ts: 1, to: 0,
      fx: 0, fy: 0, fs: .55, fo: 0,
      t0: null, dur: 0, delay: 0, visible: false, isRoot: false
    }, cfg);
    NODES.set(n.id, n);
    return n;
  }

  function applyExtras() {
    const extras = window.SPOTLIGHT_EXTRAS;
    if (!extras) return;
    (window.SPOTLIGHT.modules || []).forEach(md => {
      (md.branches || []).forEach(bd => {
        (bd.leaves || []).forEach(lf => {
          const ex = extras[md.title + '|' + lf.title];
          if (!ex) return;
          const blocks = (lf.blocks || []).slice();
          const firstIsLead = blocks[0] && blocks[0].type === 'lead';
          if (ex.why) blocks.splice(firstIsLead ? 1 : 0, 0, { type: 'why', text: ex.why });
          if (ex.mistake) blocks.push({ type: 'mistake', wrong: ex.mistake.wrong, right: ex.mistake.right, note: ex.mistake.note || '' });
          if (ex.tasks && ex.tasks.length) {
            const hasRule = blocks.some(b => b.type === 'rule');
            const hasNote = blocks.some(b => b.type === 'note');
            const intro = ex.taskIntro || (hasRule
              ? 'Сделай задание письменно, а потом проверь по ответу. Если ошибся — вернись к правилу выше.'
              : hasNote
                ? 'Ответь своими словами, а потом сравни с вариантом. Главное — не подглядывать сразу.'
                : 'Сначала попробуй вспомнить слово или фразу, а потом открой ответ. Так запоминается лучше.');
            blocks.push({
              type: 'task',
              title: ex.taskTitle || 'Проверь себя',
              intro: intro,
              items: ex.tasks
            });
          }
          lf.blocks = blocks;
        });
      });
    });
  }

  function buildTree() {
    ROOT = addNode({
      id: 'root', type: 'root', title: 'Spotlight 5', ru: 'Английский язык · 5 класс',
      isRoot: true, color: '#8fa2ff'
    });

    (window.SPOTLIGHT.modules || []).forEach((md, mi) => {
      const modId = 'm' + mi;
      const mod = addNode({
        id: modId, type: 'module', title: md.title, ru: md.ru, icon: md.icon,
        color: md.color, data: md, parent: ROOT,
        badge: md.badge || String(mi), kind: md.kind || 'module',
        label: md.kind === 'start' ? 'Старт' : (md.kind === 'exam' ? 'Повторение' : 'Модуль ' + (md.badge || mi))
      });
      ROOT.children.push(mod);
      MODULES.push(mod);

      (md.branches || []).forEach((bd, bi) => {
        const br = addNode({
          id: modId + 'b' + bi, type: 'branch', title: bd.title, ru: bd.ru,
          icon: bd.icon, color: md.color, data: bd, parent: mod,
          moduleNode: mod, badge: ''
        });
        mod.children.push(br);

        (bd.leaves || []).forEach((lf, li) => {
          const leaf = addNode({
            id: modId + 'b' + bi + 'l' + li, type: 'leaf', title: lf.title, ru: lf.ru,
            color: md.color, data: lf, parent: br, moduleNode: mod, branchNode: br
          });
          br.children.push(leaf);
          const counts = countWords(lf);
          leaf.wordsCount = counts.words;
          leaf.phrasesCount = counts.phrases;
          TOTAL_LEAVES++;
        });
        br.count = br.children.length;
      });
      mod.count = mod.children.reduce((s, b) => s + b.children.length, 0);
    });
  }

  function countWords(leaf) {
    let words = 0, phrases = 0;
    (leaf.blocks || []).forEach(b => {
      if (b.type === 'words') words += (b.items || []).length;
      if (b.type === 'phrase') phrases += (b.items || []).length;
    });
    return { words: words, phrases: phrases };
  }

  /* --------------------------- mount DOM --------------------------- */
  function mountAll() {
    mountRoot(ROOT);
    NODES.forEach(n => { if (n !== ROOT) mountNode(n); });
    NODES.forEach(n => { if (n.parent) mountLink(n); });
    // root stays above links but below the rest? append first so it sits behind
    nodesLayer.insertBefore(ROOT.el, nodesLayer.firstChild);
    updateRootMeta();
  }

  function mountRoot(n) {
    const el = document.createElement('div');
    el.className = 'node';
    el.dataset.type = 'root';
    el.dataset.id = n.id;
    el.style.visibility = 'hidden';
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Центр карты: Spotlight 5, английский язык, 5 класс');
    el.innerHTML =
      '<div class="root-ring"></div><div class="root-orbit o1"></div><div class="root-orbit o2"></div>' +
      '<div class="root-card">' +
        '<div class="root-kicker">Английский язык · 5 класс</div>' +
        '<div class="root-word">SPOTLIGHT</div>' +
        '<div class="root-five">5</div>' +
        '<div class="root-meta" id="rootMeta">12 разделов · 0 тем</div>' +
      '</div>';
    nodesLayer.appendChild(el);
    n.el = el;
    n.w = 300; n.h = 300;
  }

  function updateRootMeta() {
    const meta = $('#rootMeta');
    if (meta) meta.innerHTML = '<b>' + MODULES.length + '</b> разделов · <b>' + TOTAL_LEAVES + '</b> тем';
  }

  function mountNode(n) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'node';
    el.dataset.type = n.type;
    el.dataset.id = n.id;
    el.tabIndex = -1;
    el.style.pointerEvents = 'none';
    el.style.visibility = 'hidden';
    applyColor(el, n.color);

    if (n.type === 'module') {
      el.innerHTML =
        '<span class="node-card">' +
          '<span class="node-icon">' + n.icon + '</span>' +
          '<span class="node-copy">' +
            '<span class="node-title">' + esc(n.title) + '</span>' +
            '<span class="node-ru">' + esc(n.ru) + '</span>' +
          '</span>' +
          '<span class="node-count">' + n.count + '</span>' +
          '<span class="node-progress" style="--p:0%"></span>' +
        '</span>';
      el.setAttribute('aria-label', n.label + ': ' + n.title + ' — ' + n.ru + ', тем: ' + n.count);
    } else if (n.type === 'branch') {
      const preview = n.children.length ? n.children[0].title : '';
      el.innerHTML =
        '<span class="node-card">' +
          '<span class="node-icon">' + (n.icon || '•') + '</span>' +
          '<span class="node-copy">' +
            '<span class="node-title">' + esc(n.title) + '</span>' +
            '<span class="node-ru">' + esc(n.ru) + '</span>' +
            '<span class="node-leaves">' + esc(preview) + '</span>' +
          '</span>' +
          '<span class="node-count">' + n.count + '</span>' +
        '</span>';
      el.setAttribute('aria-label', n.title + ' — ' + n.ru + ', тем: ' + n.count);
    } else {
      el.innerHTML =
        '<span class="node-card">' +
          '<span class="node-dot"></span>' +
          '<span class="node-title">' + esc(n.title) + '</span>' +
          '<span class="node-tick">' + icon('check') + '</span>' +
        '</span>';
      el.setAttribute('aria-label', n.title + ' — ' + n.ru);
      if (state.progress.has(n.id)) el.classList.add('is-studied');
    }

    nodesLayer.appendChild(el);
    n.el = el;
    n.w = el.offsetWidth || 200;
    n.h = el.offsetHeight || 46;

    el.addEventListener('click', (e) => {
      if (state.suppressClick) return;
      e.stopPropagation();
      onNodeClick(n);
    });
    el.addEventListener('pointerenter', () => setLinkActive(n, true));
    el.addEventListener('pointerleave', () => setLinkActive(n, false));
  }

  function setLinkActive(n, on) {
    if (!n.link) return;
    n.link.classList.toggle('is-active', on);
  }

  function mountLink(child) {
    const parent = child.parent;
    const g = document.createElementNS(SVGNS, 'g');
    g.setAttribute('class', 'link');
    const halo = document.createElementNS(SVGNS, 'path');
    halo.setAttribute('class', 'link-halo');
    halo.setAttribute('stroke', child.color);
    const core = document.createElementNS(SVGNS, 'path');
    core.setAttribute('class', 'link-core');
    core.setAttribute('stroke', child.color);
    g.appendChild(halo);
    g.appendChild(core);
    linksSvg.appendChild(g);
    child.link = g;
    child.linkHalo = halo;
    child.linkCore = core;
    g.style.opacity = '0';
    updateLink(child);
  }

  function updateLink(n) {
    if (!n.link || !n.parent) return;
    const p = n.parent, c = n;
    const dx = c.x - p.x, dy = c.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    const mx = (p.x + c.x) / 2, my = (p.y + c.y) / 2;
    const bow = Math.min(110, len * 0.085);
    const cx = mx - (dy / len) * bow;
    const cy = my + (dx / len) * bow;
    const d = 'M ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) +
      ' Q ' + cx.toFixed(1) + ' ' + cy.toFixed(1) +
      ' ' + c.x.toFixed(1) + ' ' + c.y.toFixed(1);
    n.linkHalo.setAttribute('d', d);
    n.linkCore.setAttribute('d', d);
  }

  /* --------------------------- layout --------------------------- */
  function overviewRadii() {
    const vw = stage.clientWidth || window.innerWidth;
    const vh = stage.clientHeight || window.innerHeight;
    const ry = clamp(vh * 0.37, 245, 385);
    let rx = clamp(vw * 0.40, 400, 660);
    rx = Math.max(rx, ry * 1.28);
    return { rx: rx, ry: ry };
  }

  function ellipseRing(n, rx, ry) {
    const steps = 1440;
    const pts = [{ x: 0, y: -ry, acc: 0 }];
    let total = 0;
    let prevX = 0, prevY = -ry;
    for (let i = 1; i <= steps; i++) {
      const t = -Math.PI / 2 + (i / steps) * Math.PI * 2;
      const x = Math.cos(t) * rx, y = Math.sin(t) * ry;
      total += Math.hypot(x - prevX, y - prevY);
      pts.push({ x: x, y: y, acc: total });
      prevX = x; prevY = y;
    }
    const out = [];
    let j = 1;
    for (let k = 0; k < n; k++) {
      const target = (total * k) / n;
      while (j < pts.length - 1 && pts[j].acc < target) j++;
      const a = pts[j - 1], b = pts[j];
      const span = b.acc - a.acc || 1;
      const f = (target - a.acc) / span;
      out.push({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f });
    }
    return out;
  }

  function computeLayout(focus) {
    const result = new Map();
    result.set(focus.id, { x: 0, y: 0, s: focus.type === 'root' ? 1 : 1.14 });
    const kids = focus.children;
    if (!kids.length) return result;

    const mobile = window.innerWidth < 820;
    if (mobile && focus.type !== 'root') {
      const gap = focus.type === 'module' ? 86 : 76;
      const total = (kids.length - 1) * gap;
      const topY = -total / 2 - 66;
      result.set(focus.id, { x: 0, y: topY, s: 1.06 });
      kids.forEach((c, i) => result.set(c.id, { x: 0, y: -total / 2 + i * gap, s: 1 }));
      return result;
    }

    if (focus.type === 'root') {
      const r = overviewRadii();
      const pts = ellipseRing(kids.length, r.rx, r.ry);
      kids.forEach((c, i) => result.set(c.id, { x: pts[i].x, y: pts[i].y, s: 1 }));
    } else {
      const R = focus.type === 'module' ? 300 : 280;
      const n = kids.length;
      if (n === 1) {
        result.set(kids[0].id, { x: 0, y: -R, s: 1 });
      } else {
        for (let i = 0; i < n; i++) {
          const a = -Math.PI / 2 + (i * Math.PI * 2) / n;
          result.set(kids[i].id, { x: Math.cos(a) * R, y: Math.sin(a) * R, s: 1 });
        }
      }
    }
    return result;
  }

  /* --------------------------- animation --------------------------- */
  function applyNode(n) {
    n.el.style.transform = 'translate3d(' + n.x.toFixed(2) + 'px,' + n.y.toFixed(2) + 'px,0) translate(-50%,-50%) scale(' + n.s.toFixed(4) + ')';
    n.el.style.opacity = n.o.toFixed(3);
  }

  function tweenNode(n, now, dur, delay) {
    n.fx = n.x; n.fy = n.y; n.fs = n.s; n.fo = n.o;
    n.t0 = now + (delay || 0);
    n.dur = Math.max(1, dur);
    n.delay = delay || 0;
    if (dur <= 0) {
      n.x = n.tx; n.y = n.ty; n.s = n.ts; n.o = n.to;
      applyNode(n);
      n.el.style.visibility = n.to > 0 ? 'visible' : 'hidden';
      n.t0 = null;
    }
    startLoop();
  }

  function applyCam() {
    const c = state.cam;
    world.style.transform = 'translate3d(' + c.x.toFixed(2) + 'px,' + c.y.toFixed(2) + 'px,0) scale(' + c.s.toFixed(4) + ')';
  }

  function tweenCam(target, dur) {
    const c = state.cam;
    if (dur <= 0 || prefersReduced()) {
      c.x = target.x; c.y = target.y; c.s = target.s;
      c.t0 = null;
      applyCam();
      return;
    }
    c.fx = c.x; c.fy = c.y; c.fs = c.s;
    c.tx = target.x; c.ty = target.y; c.ts = target.s;
    c.t0 = performance.now();
    c.dur = dur;
    startLoop();
  }

  function setCam(x, y, s) {
    const c = state.cam;
    c.x = x; c.y = y; c.s = s;
    c.t0 = null;
    applyCam();
  }

  function startLoop() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function tick(now) {
    let alive = false;

    NODES.forEach(n => {
      if (n.t0 != null) {
        if (now < n.t0) { alive = true; return; }
        const p = Math.min(1, (now - n.t0) / n.dur);
        const e = easeOut(p);
        n.x = n.fx + (n.tx - n.fx) * e;
        n.y = n.fy + (n.ty - n.fy) * e;
        n.s = n.fs + (n.ts - n.fs) * e;
        n.o = n.fo + (n.to - n.fo) * e;
        applyNode(n);
        if (p < 1) {
          alive = true;
        } else {
          n.t0 = null;
          if (n.to === 0) n.el.style.visibility = 'hidden';
        }
      }
      if (n.link && n.parent) {
        updateLink(n);
        n.link.style.opacity = (Math.min(n.o, n.parent.o)).toFixed(3);
      }
    });

    const c = state.cam;
    if (c.t0 != null) {
      const p = Math.min(1, (now - c.t0) / c.dur);
      const e = easeInOut(p);
      c.x = c.fx + (c.tx - c.fx) * e;
      c.y = c.fy + (c.ty - c.fy) * e;
      c.s = c.fs + (c.ts - c.fs) * e;
      applyCam();
      if (p < 1) alive = true; else c.t0 = null;
    }

    raf = alive ? requestAnimationFrame(tick) : null;
  }

  /* --------------------------- fit camera --------------------------- */
  function fitCamera(dur) {
    const vis = [];
    NODES.forEach(n => { if (n.visible) vis.push(n); });
    if (!vis.length) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    vis.forEach(n => {
      const w = n.w * n.ts, h = n.h * n.ts;
      minX = Math.min(minX, n.tx - w / 2); maxX = Math.max(maxX, n.tx + w / 2);
      minY = Math.min(minY, n.ty - h / 2); maxY = Math.max(maxY, n.ty + h / 2);
    });

    const vw = window.innerWidth, vh = window.innerHeight;
    const mobile = vw < 820;
    const panelW = state.panelOpen && vw > 820 ? 492 : 0;
    const availW = Math.max(160, vw - panelW - (mobile ? 40 : 150));
    const availH = Math.max(160, vh - (mobile ? 170 : 205));
    let s = Math.min(availW / (maxX - minX), availH / (maxY - minY));
    s = clamp(s, mobile ? (state.panelOpen ? .55 : .5) : .42, 1.3);

    const screenX = (vw - panelW) / 2;
    const screenY = (vh + (mobile ? 44 : 70)) / 2;
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const target = { x: screenX - cx * s, y: screenY - cy * s, s: s };
    tweenCam(target, dur == null ? 800 : dur);
  }

  function zoomAt(px, py, factor) {
    const c = state.cam;
    const s0 = c.s;
    const s1 = clamp(s0 * factor, .3, 2.4);
    if (Math.abs(s1 - s0) < .0001) return;
    const x1 = px - (px - c.x) * (s1 / s0);
    const y1 = py - (py - c.y) * (s1 / s0);
    setCam(x1, y1, s1);
  }

  function zoomCenter(factor) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const panelW = state.panelOpen && vw > 820 ? 492 : 0;
    zoomAt((vw - panelW) / 2, vh / 2, factor);
  }

  /* --------------------------- focus --------------------------- */
  function applyFocus(id, opts) {
    opts = opts || {};
    const focus = id ? NODES.get(id) : ROOT;
    if (!focus) return;

    const layout = computeLayout(focus);
    const vis = new Set(layout.keys());
    const now = performance.now();
    const reduced = prefersReduced();

    state.focusId = id || null;
    $$('.link.is-active', linksSvg).forEach(g => g.classList.remove('is-active'));

    NODES.forEach(n => {
      const isVis = vis.has(n.id);
      const p = isVis ? layout.get(n.id) : null;

      n.el.style.pointerEvents = isVis && n.type !== 'root' ? 'auto' : 'none';
      if (n.type !== 'root') {
        n.el.tabIndex = isVis ? 0 : -1;
        n.el.setAttribute('aria-hidden', isVis ? 'false' : 'true');
      }

      if (isVis) {
        n.el.style.visibility = 'visible';
        if (!n.visible) {
          n.x = 0; n.y = 0; n.s = n.type === 'root' ? .9 : .5; n.o = 0;
          applyNode(n);
        }
        n.tx = p.x; n.ty = p.y; n.ts = p.s; n.to = 1;
        n.visible = true;
        let delay = 0;
        if (n.id !== focus.id) {
          const idx = focus.children.indexOf(n);
          delay = reduced ? 0 : 70 + Math.max(0, idx) * 44;
        }
        tweenNode(n, now, reduced ? 0 : 720, delay);
      } else {
        if (n.visible) {
          n.tx = 0; n.ty = 0; n.ts = .3; n.to = 0;
          tweenNode(n, now, reduced ? 0 : 380, 0);
        }
        n.visible = false;
      }
      n.el.classList.toggle('is-center', n.id === focus.id && n.type !== 'root');
    });

    updateDeco(focus);
    updateMobileHome();

    if (!opts.keepPanel) closePanel({ silent: true });
    updateCrumbs();
    updateDock();
    updateHint();
    requestAnimationFrame(() => fitCamera(reduced ? 0 : 850));
    startLoop();
  }

  function updateDeco(focus) {
    const deco = $('#deco');
    if (!deco) return;
    if (focus.type !== 'root') {
      deco.style.opacity = '0';
      return;
    }
    const r = overviewRadii();
    const o1 = $('#orbit1'), o2 = $('#orbit2');
    if (o1) { o1.setAttribute('rx', r.rx); o1.setAttribute('ry', r.ry); }
    if (o2) { o2.setAttribute('rx', r.rx * .58); o2.setAttribute('ry', r.ry * .58); }
    deco.style.opacity = '1';
  }

  function onNodeClick(n) {
    if (n.type === 'module') {
      if (state.focusId === n.id) { goUp(); } else { applyFocus(n.id); }
    } else if (n.type === 'branch') {
      if (state.focusId === n.id) { goUp(); } else { applyFocus(n.id); }
    } else if (n.type === 'leaf') {
      openLeaf(n.id);
    }
  }

  function goUp() {
    if (!state.focusId) return;
    const n = NODES.get(state.focusId);
    if (n && n.type === 'branch') applyFocus(n.parent.id);
    else applyFocus(null);
  }

  /* =====================================================================
     UI: crumbs, dock, hint
     ===================================================================== */
  function tint(hex, a) {
    const c = rgb(hex);
    return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')';
  }

  function updateCrumbs() {
    if (!state.focusId) {
      crumbs.classList.remove('is-visible');
      crumbs.innerHTML = '';
      return;
    }
    const n = NODES.get(state.focusId);
    const mod = n.type === 'module' ? n : n.moduleNode;
    const parts = [];
    parts.push('<button class="crumb" type="button" data-crumb="root">' + icon('grid') + '<span>Вся карта</span></button>');
    if (n.type === 'branch') {
      parts.push('<span class="crumb-sep">›</span>');
      parts.push('<button class="crumb" type="button" data-crumb="' + mod.id + '" style="--mc:' + mod.color + '"><span class="dot"></span><span>' + esc(mod.title) + '</span></button>');
      parts.push('<span class="crumb-sep">›</span>');
      parts.push('<span class="crumb is-current" style="--mc:' + mod.color + '"><span>' + esc(n.title) + '</span></span>');
    } else {
      parts.push('<span class="crumb-sep">›</span>');
      parts.push('<span class="crumb is-current" style="--mc:' + mod.color + '"><span class="dot"></span><span>' + esc(mod.title) + '</span></span>');
    }
    crumbs.innerHTML = parts.join('');
    crumbs.classList.add('is-visible');
  }

  function buildMobileHome() {
    const grid = $('#mhGrid');
    if (!grid) return;
    const sub = $('.mh-sub');
    if (sub) sub.innerHTML = '<b>' + MODULES.length + '</b> разделов · <b>' + TOTAL_LEAVES + '</b> тем';
    grid.innerHTML = '';
    MODULES.forEach(m => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mh-card';
      b.dataset.mh = m.id;
      applyColor(b, m.color);
      b.innerHTML =
        '<span class="mh-num">' + esc(m.badge) + '</span>' +
        '<span class="mh-icon">' + m.icon + '</span>' +
        '<span class="mh-title">' + esc(m.title) + '</span>' +
        '<span class="mh-ru">' + esc(m.ru) + '</span>' +
        '<span class="mh-meta">' + m.count + ' тем</span>' +
        '<i class="mh-bar"></i>';
      grid.appendChild(b);
    });
  }

  function updateMobileHome() {
    const show = window.innerWidth < 820 && !state.focusId;
    document.body.classList.toggle('is-mobile-home', show);
  }

  function buildDock() {
    dock.innerHTML = '';
    const home = document.createElement('button');
    home.type = 'button';
    home.className = 'dock-home';
    home.dataset.dock = 'root';
    home.title = 'Вся карта';
    home.setAttribute('aria-label', 'Вся карта');
    home.innerHTML = icon('grid');
    dock.appendChild(home);

    const sep = document.createElement('span');
    sep.className = 'dock-sep';
    dock.appendChild(sep);

    MODULES.forEach(m => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dock-item';
      b.dataset.dock = m.id;
      b.title = m.label + ': ' + m.title + ' — ' + m.ru;
      b.setAttribute('aria-label', b.title);
      b.innerHTML = '<span>' + esc(m.badge) + '</span>';
      applyColor(b, m.color);
      dock.appendChild(b);
    });
  }

  function updateDock() {
    let active = null;
    if (state.focusId) {
      const n = NODES.get(state.focusId);
      active = n.type === 'module' ? n.id : n.moduleNode.id;
    }
    $$('.dock-item', dock).forEach(b => b.classList.toggle('is-active', b.dataset.dock === active));
    const home = $('.dock-home', dock);
    if (home) home.classList.toggle('is-active', !state.focusId);
  }

  function updateHint() {
    if (!mapHintText) return;
    let text = 'Нажмите на раздел, чтобы раскрыть темы';
    if (state.focusId) {
      const n = NODES.get(state.focusId);
      text = n.type === 'module'
        ? 'Выберите раздел: лексика, грамматика, речь, культура'
        : 'Нажмите на тему, чтобы открыть материал';
    }
    mapHintText.textContent = text;
  }

  /* =====================================================================
     Panel
     ===================================================================== */
  function moduleLeaves(mod) {
    const out = [];
    mod.children.forEach(br => br.children.forEach(lf => out.push(lf)));
    return out;
  }

  function openLeaf(id, opts) {
    opts = opts || {};
    const leaf = NODES.get(id);
    if (!leaf) return;
    const br = leaf.parent;
    if (state.focusId !== br.id) applyFocus(br.id, { keepPanel: true });

    state.panelOpen = true;
    state.panelLeafId = id;
    renderPanel(leaf);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    if (window.innerWidth <= 820) scrim.classList.add('is-visible');

    NODES.forEach(n => n.el.classList.remove('is-active'));
    leaf.el.classList.add('is-active');
    fitCamera(640);
    startLoop();

    if (opts.highlight) setTimeout(() => highlightWord(opts.highlight), 420);
  }

  function closePanel(opts) {
    opts = opts || {};
    if (!state.panelOpen) return;
    state.panelOpen = false;
    state.panelLeafId = null;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    scrim.classList.remove('is-visible');
    NODES.forEach(n => n.el.classList.remove('is-active'));
    if (!opts.silent) fitCamera(620);
  }

  function renderPanel(leaf) {
    const mod = leaf.moduleNode;
    const br = leaf.branchNode;
    const done = state.progress.has(leaf.id);
    const hasText = (leaf.data.blocks || []).some(b => b.type === 'text');
    panel.style.setProperty('--mc', mod.color);
    panel.style.setProperty('--mc-08', tint(mod.color, .08));
    panel.style.setProperty('--mc-12', tint(mod.color, .12));
    panel.style.setProperty('--mc-18', tint(mod.color, .18));
    panel.style.setProperty('--mc-35', tint(mod.color, .35));
    panel.style.setProperty('--mc-45', tint(mod.color, .45));
    panel.style.setProperty('--mc-55', tint(mod.color, .55));

    panelHead.innerHTML =
      '<div class="panel-crumb" style="--mc:' + mod.color + '"><span class="dot"></span>' + esc(mod.label) + ' · ' + esc(mod.title) + '</div>' +
      '<h2 class="panel-title" id="panelTitle">' + esc(leaf.title) + '</h2>' +
      '<p class="panel-ru">' + esc(leaf.ru) + '</p>' +
      '<div class="panel-meta">' +
        '<span class="panel-chip" style="--mc:' + mod.color + '"><span class="dot"></span>' + esc(br.title) + '</span>' +
        (leaf.data.level ? '<span class="panel-chip">' + esc(leaf.data.level) + '</span>' : '') +
        (leaf.data.words ? '<span class="panel-chip">' + leaf.data.words + ' слов</span>' : '') +
        (leaf.wordsCount ? '<span class="panel-chip">' + leaf.wordsCount + ' слов</span>' : '') +
        (leaf.phrasesCount ? '<span class="panel-chip">' + leaf.phrasesCount + ' фраз</span>' : '') +
        (hasText ? '<span class="panel-chip">текст + задания</span>' : '<span class="panel-chip">задания</span>') +
        '<span class="panel-chip ' + (done ? 'is-good' : '') + '" data-study-chip>' + (done ? 'Изучено' : 'Не изучено') + '</span>' +
      '</div>' +
      '<button class="icon-btn panel-close" type="button" data-close-panel aria-label="Закрыть тему">' + icon('x') + '</button>';

    panelBody.innerHTML = renderBlocks(leaf.data.blocks || [], mod);
    panelBody.scrollTop = 0;
    renderPanelFoot(leaf);
  }

  function renderBlocks(blocks, mod) {
    return blocks.map(b => {
      if (!b || !b.type) return '';
      if (b.type === 'lead') return '<p class="lead">' + b.text + '</p>';

      if (b.type === 'words') {
        const items = (b.items || []).map(it =>
          '<div class="word" data-say="' + attr(it[0]) + '" role="button" tabindex="0" aria-label="' + attr(it[0] + ' — ' + it[1]) + '">' +
            '<span class="word-en">' + esc(it[0]) + '</span>' +
            '<span class="word-ru">' + esc(it[1]) + '</span>' +
            '<button class="say" type="button" tabindex="-1" aria-label="Прослушать">' + icon('volume') + '</button>' +
          '</div>').join('');
        return '<section class="block">' +
          (b.title ? '<h3 class="block-title">' + esc(b.title) + '</h3>' : '') +
          '<div class="word-grid">' + items + '</div>' +
          (b.note ? '<div class="tip" style="margin-top:10px"><span class="tip-ico">💡</span><div>' + b.note + '</div></div>' : '') +
          '</section>';
      }

      if (b.type === 'phrase') {
        const items = (b.items || []).map(it =>
          '<div class="phrase" data-say="' + attr(it[0]) + '">' +
            '<button class="phrase-play" type="button" tabindex="-1" aria-label="Прослушать">' + icon('volume') + '</button>' +
            '<div class="phrase-copy"><span class="phrase-en">' + esc(it[0]) + '</span><span class="phrase-ru">' + esc(it[1]) + '</span></div>' +
          '</div>').join('');
        return '<section class="block">' +
          (b.title ? '<h3 class="block-title">' + esc(b.title) + '</h3>' : '') +
          '<div class="phrase-list">' + items + '</div></section>';
      }

      if (b.type === 'rule') {
        const rules = (b.items || []).map(r => {
          const ex = (r.examples || []).map(e =>
            '<div class="example">' +
              '<div class="example-en" data-say="' + attr(e[0]) + '">' + icon('volume') + '<span>' + esc(e[0]) + '</span></div>' +
              '<div class="example-ru">' + esc(e[1]) + '</div>' +
            '</div>').join('');
          return '<div class="rule">' +
            '<div class="rule-title">' + r.title + '</div>' +
            '<div class="rule-text">' + r.text + '</div>' +
            (ex ? '<div class="examples">' + ex + '</div>' : '') +
            '</div>';
        }).join('');
        return '<section class="block">' +
          (b.title ? '<h3 class="block-title">' + esc(b.title) + '</h3>' : '') +
          rules + '</section>';
      }

      if (b.type === 'table') {
        const head = (b.head || []).map(h => '<th>' + h + '</th>').join('');
        const rows = (b.rows || []).map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('');
        return '<section class="block">' +
          (b.title ? '<h3 class="block-title">' + esc(b.title) + '</h3>' : '') +
          '<div class="table-wrap"><table><thead><tr>' + head + '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
          (b.note ? '<div class="tip" style="margin-top:10px"><span class="tip-ico">💡</span><div>' + b.note + '</div></div>' : '') +
          '</section>';
      }

      if (b.type === 'note') {
        const text = Array.isArray(b.text) ? b.text : (b.text ? [b.text] : []);
        const ps = text.map(p => '<p>' + p + '</p>').join('');
        const ul = b.bullets && b.bullets.length
          ? '<ul>' + b.bullets.map(li => '<li>' + li + '</li>').join('') + '</ul>' : '';
        return '<section class="block">' +
          (b.title ? '<h3 class="block-title">' + esc(b.title) + '</h3>' : '') +
          '<div class="note">' + ps + ul + '</div></section>';
      }

      if (b.type === 'tip') {
        return '<div class="block"><div class="tip"><span class="tip-ico">' + (b.icon || '💡') + '</span><div>' + b.text + '</div></div></div>';
      }

      if (b.type === 'why') {
        return '<div class="why"><span class="why-ico">💡</span><div><b>Зачем это нужно</b>' + b.text + '</div></div>';
      }

      if (b.type === 'mistake') {
        return '<div class="mistake">' +
          '<div class="mistake-head">⚠️ Так не говорят</div>' +
          '<div class="mistake-row bad"><span class="mark">✗</span><code>' + esc(b.wrong) + '</code></div>' +
          '<div class="mistake-row good"><span class="mark">✓</span><code>' + esc(b.right) + '</code></div>' +
          (b.note ? '<div class="mistake-note">' + b.note + '</div>' : '') +
          '</div>';
      }

      if (b.type === 'task') {
        const items = (b.items || []).map((it, i) =>
          '<div class="task-item">' +
            '<div class="task-q"><span class="task-num">' + (i + 1) + '</span><div>' + it.q + '</div></div>' +
            '<button class="task-reveal" type="button" data-reveal aria-expanded="false">Показать ответ</button>' +
            '<div class="task-answer" hidden><span class="lbl">Ответ</span>' + it.a + '</div>' +
          '</div>').join('');
        return '<section class="block task-block">' +
          (b.title ? '<h3 class="block-title">' + esc(b.title) + '</h3>' : '') +
          (b.intro ? '<p class="task-intro">' + b.intro + '</p>' : '') +
          '<div class="task-list">' + items + '</div></section>';
      }

      if (b.type === 'choice') {
        const items = (b.items || []).map((it, qi) => {
          const opts = (it.options || []).map((o, oi) =>
            '<button class="choice-opt" type="button" data-opt="' + oi + '">' + o + '</button>').join('');
          return '<div class="choice-item" data-correct="' + (it.correct || 0) + '">' +
            '<div class="choice-q"><span class="num">' + (qi + 1) + '.</span>' + it.q + '</div>' +
            '<div class="choice-options">' + opts + '</div>' +
            '<div class="choice-explain" hidden>' + (it.explain || '') + '</div>' +
          '</div>';
        }).join('');
        return '<section class="block">' +
          (b.title ? '<h3 class="block-title">' + esc(b.title) + '</h3>' : '') +
          (b.intro ? '<p class="task-intro">' + b.intro + '</p>' : '') +
          items + '</section>';
      }

      if (b.type === 'text') {
        const ps = (b.paragraphs || []).map(p => '<p>' + p + '</p>').join('');
        const gloss = (b.glossary || []).map(g =>
          '<button class="gloss" type="button" data-say="' + attr(g[0]) + '"><b>' + esc(g[0]) + '</b><span>' + esc(g[1]) + '</span>' + icon('volume') + '</button>').join('');
        return '<section class="block reading">' +
          '<div class="reading-kicker">Reading</div>' +
          (b.title ? '<h3>' + esc(b.title) + '</h3>' : '') +
          '<div class="reading-tools"><button class="read-aloud" type="button" data-read-aloud>' + icon('volume') + '<span>Прослушать текст</span></button></div>' +
          ps +
          (gloss ? '<div class="glossary">' + gloss + '</div>' : '') +
          '</section>';
      }

      if (b.type === 'project') {
        const ideas = (b.ideas || []).map(i => '<li>' + i + '</li>').join('');
        return '<div class="project"><span class="project-ico">✍️</span><div>' +
          '<b>' + esc(b.title || 'Мини-проект') + '</b>' +
          '<p>' + b.text + '</p>' +
          (ideas ? '<ul>' + ideas + '</ul>' : '') +
          '</div></div>';
      }
      return '';
    }).join('');
  }

  function studyLabel(done) {
    if (done) return 'Изучено';
    return window.innerWidth < 560 ? 'Отметить' : 'Отметить как изученное';
  }

  function renderPanelFoot(leaf) {
    const mod = leaf.moduleNode;
    const list = moduleLeaves(mod);
    const idx = list.indexOf(leaf);
    const done = state.progress.has(leaf.id);
    panelFoot.innerHTML =
      '<button class="study-btn ' + (done ? 'is-done' : '') + '" type="button" data-study>' +
        icon('check') + '<span>' + studyLabel(done) + '</span>' +
      '</button>' +
      '<button class="foot-btn" type="button" data-cards title="Карточки слов" aria-label="Карточки слов">' + icon('cards') + '</button>' +
      '<button class="foot-btn" type="button" data-test title="Тест по модулю" aria-label="Тест по модулю">' + icon('target') + '</button>' +
      '<span class="foot-count">' + (idx + 1) + ' / ' + list.length + '</span>' +
      '<button class="foot-btn" type="button" data-prev title="Предыдущая тема" aria-label="Предыдущая тема"' + (idx === 0 ? ' disabled' : '') + '>' + icon('arrow-left') + '</button>' +
      '<button class="foot-btn" type="button" data-next title="Следующая тема" aria-label="Следующая тема"' + (idx === list.length - 1 ? ' disabled' : '') + '>' + icon('arrow-right') + '</button>';
  }

  function refreshStudyUI(leaf) {
    const done = state.progress.has(leaf.id);
    leaf.el.classList.toggle('is-studied', done);
    const btn = $('[data-study]', panelFoot);
    if (btn) {
      btn.classList.toggle('is-done', done);
      btn.innerHTML = icon('check') + '<span>' + studyLabel(done) + '</span>';
    }
    const chip = $('[data-study-chip]', panelHead);
    if (chip) {
      chip.classList.toggle('is-good', done);
      chip.textContent = done ? 'Изучено' : 'Не изучено';
    }
  }

  function toggleStudied(leaf) {
    if (!leaf) return;
    if (state.progress.has(leaf.id)) state.progress.delete(leaf.id);
    else state.progress.add(leaf.id);
    STORE.set('sp5.progress', Array.from(state.progress));
    refreshStudyUI(leaf);
    updateProgress();
  }

  function highlightWord(word) {
    const list = $$('.word, .gloss', panelBody).filter(el => el.dataset.say === word);
    const el = list[0];
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.classList.add('is-hit');
    setTimeout(() => el.classList.remove('is-hit'), 1900);
  }

  /* =====================================================================
     Progress
     ===================================================================== */
  function updateProgress() {
    let done = 0;
    NODES.forEach(n => {
      if (n.type === 'leaf' && state.progress.has(n.id)) done++;
    });
    const pct = TOTAL_LEAVES ? Math.round((done / TOTAL_LEAVES) * 100) : 0;
    const arc = $('#ringArc');
    if (arc) arc.style.strokeDashoffset = String(97.4 * (1 - pct / 100));
    const label = $('#progressPct');
    if (label) label.textContent = pct + '%';
    const mhProgress = $('#mhProgress');
    if (mhProgress) mhProgress.style.width = pct + '%';

    MODULES.forEach(m => {
      const leaves = moduleLeaves(m);
      const d = leaves.filter(l => state.progress.has(l.id)).length;
      const p = leaves.length ? Math.round((d / leaves.length) * 100) : 0;
      const bar = $('.node-progress', m.el);
      if (bar) bar.style.setProperty('--p', p + '%');
      const mhBar = $('.mh-card[data-mh="' + m.id + '"] .mh-bar');
      if (mhBar) mhBar.style.width = p + '%';
      m.el.setAttribute('aria-label', m.label + ': ' + m.title + ' — ' + m.ru + ', изучено ' + d + ' из ' + leaves.length);
    });
    state.progressDone = done;
  }

  /* =====================================================================
     Speech
     ===================================================================== */
  let voices = [];
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    voices = window.speechSynthesis.getVoices() || [];
  }
  function initSpeech() {
    if (!('speechSynthesis' in window)) return;
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  function speak(text) {
    if (!text) return;
    if (!('speechSynthesis' in window)) {
      toast('Озвучка не поддерживается этим браузером');
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-GB';
      u.rate = .9;
      u.pitch = 1;
      const v = voices.find(x => /en-GB/i.test(x.lang)) || voices.find(x => /^en/i.test(x.lang));
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (e) { /* noop */ }
  }

  /* =====================================================================
     Flashcards
     ===================================================================== */
  function moduleWords(mod) {
    const seen = new Set();
    const out = [];
    moduleLeaves(mod).forEach(leaf => {
      (leaf.data.blocks || []).forEach(b => {
        if (b.type === 'words') {
          (b.items || []).forEach(it => {
            const key = it[0].toLowerCase();
            if (!seen.has(key)) { seen.add(key); out.push(it); }
          });
        } else if (b.type === 'text' && b.glossary) {
          b.glossary.forEach(it => {
            const key = it[0].toLowerCase();
            if (!seen.has(key)) { seen.add(key); out.push(it); }
          });
        }
      });
    });
    return out;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function readMistakes() {
    const list = STORE.get('sp5.mistakes', []);
    return Array.isArray(list) ? list : [];
  }

  function saveMistakes(list) {
    STORE.set('sp5.mistakes', list.slice(-160));
  }

  function addMistake(en, ru, mod) {
    if (!en) return;
    const list = readMistakes();
    const key = String(en).toLowerCase();
    const found = list.find(x => x && x.en && x.en.toLowerCase() === key && x.mod === mod);
    if (found) {
      found.ru = ru || found.ru;
      found.n = (found.n || 1) + 1;
    } else {
      list.push({ en: en, ru: ru || '', mod: mod || '', n: 1 });
    }
    saveMistakes(list);
  }

  function removeMistake(en, mod) {
    const key = String(en || '').toLowerCase();
    saveMistakes(readMistakes().filter(x => !(x && x.en && x.en.toLowerCase() === key && x.mod === mod)));
  }

  function openCards(modId) {
    const mod = NODES.get(modId);
    if (!mod) return;
    const words = moduleWords(mod);
    if (!words.length) { toast('В этом модуле нет карточек со словами'); return; }
    const bad = new Set(readMistakes().filter(x => x && x.mod === mod.title).map(x => String(x.en).toLowerCase()));
    const hard = shuffle(words.filter(w => bad.has(String(w[0]).toLowerCase())));
    const rest = shuffle(words.filter(w => !bad.has(String(w[0]).toLowerCase())));
    state.cards = { list: hard.concat(rest), i: 0, known: 0, flipped: false, mod: mod };
    state.cardsOpen = true;
    const content = $('#cardsContent');
    content.style.setProperty('--mc', mod.color);
    content.style.setProperty('--mc-14', tint(mod.color, .14));
    content.style.setProperty('--mc-18', tint(mod.color, .18));
    content.style.setProperty('--mc-30', tint(mod.color, .3));
    content.style.setProperty('--mc-35', tint(mod.color, .35));
    content.style.setProperty('--mc-45', tint(mod.color, .45));
    $('#cardsModal').hidden = false;
    renderCardsShell();
  }

  function renderCardsShell() {
    const s = state.cards;
    const content = $('#cardsContent');
    content.innerHTML =
      '<div class="cards-head">' +
        '<div><p class="eyebrow">Карточки · ' + esc(s.mod.label) + '</p><h2 id="cardsTitle">' + esc(s.mod.title) + '</h2></div>' +
        '<button class="icon-btn" type="button" data-close-cards aria-label="Закрыть">' + icon('x') + '</button>' +
      '</div>' +
      '<div class="cards-stage"><div class="flash" id="flashCard" tabindex="0" role="button" aria-label="Перевернуть карточку"><div class="flash-inner">' +
        '<div class="flash-face front"><span class="flash-word" id="flashWord"></span>' +
          '<button class="flash-speak" type="button" data-card-say aria-label="Прослушать">' + icon('volume') + '</button>' +
          '<span class="flash-hint">нажмите, чтобы перевернуть</span></div>' +
        '<div class="flash-face back"><span class="flash-ru" id="flashRu"></span><span class="flash-hint" id="flashHint"></span></div>' +
      '</div></div></div>' +
      '<div class="cards-controls">' +
        '<button class="again" type="button" data-card="again">Не знаю</button>' +
        '<span class="cards-count" id="cardsCount"></span>' +
        '<button class="know" type="button" data-card="know">Знаю</button>' +
      '</div>' +
      '<div class="cards-bar"><i id="cardsBar"></i></div>';
    fillCard();
  }

  function fillCard() {
    const s = state.cards;
    if (!s) return;
    const item = s.list[s.i];
    const flash = $('#flashCard');
    if (!flash) return;
    flash.classList.remove('is-flipped');
    s.flipped = false;
    $('#flashWord').textContent = item[0];
    $('#flashRu').textContent = item[1];
    $('#flashHint').textContent = item[0];
    $('#cardsCount').textContent = (s.i + 1) + ' / ' + s.list.length;
    $('#cardsBar').style.width = Math.round((s.i / s.list.length) * 100) + '%';
  }

  function flipCard() {
    if (!state.cards) return;
    const flash = $('#flashCard');
    if (!flash) return;
    state.cards.flipped = !state.cards.flipped;
    flash.classList.toggle('is-flipped', state.cards.flipped);
  }

  function advanceCard(known) {
    const s = state.cards;
    if (!s) return;
    const item = s.list[s.i];
    if (item) {
      if (known) removeMistake(item[0], s.mod.title);
      else addMistake(item[0], item[1], s.mod.title);
    }
    if (known) s.known++;
    s.i++;
    if (s.i >= s.list.length) { renderCardsDone(); return; }
    fillCard();
  }

  function renderCardsDone() {
    const s = state.cards;
    const content = $('#cardsContent');
    const all = s.known === s.list.length;
    content.innerHTML =
      '<div class="cards-head"><div><p class="eyebrow">Карточки · ' + esc(s.mod.label) + '</p><h2>' + esc(s.mod.title) + '</h2></div>' +
      '<button class="icon-btn" type="button" data-close-cards aria-label="Закрыть">' + icon('x') + '</button></div>' +
      '<div class="cards-done">' +
        '<div class="big">' + (all ? '🏆' : '✨') + '</div>' +
        '<h2>' + (all ? 'Все слова знаете!' : 'Хороший старт!') + '</h2>' +
        '<p>Знаю ' + s.known + ' из ' + s.list.length + ' слов. Повторите те, что вызвали сложности.</p>' +
        '<button type="button" data-restart>Пройти ещё раз</button>' +
      '</div>';
  }

  function restartCards() {
    if (!state.cards) return;
    state.cards.list = shuffle(state.cards.list);
    state.cards.i = 0;
    state.cards.known = 0;
    renderCardsShell();
  }

  function closeCards() {
    state.cardsOpen = false;
    state.cards = null;
    $('#cardsModal').hidden = true;
  }

  /* =====================================================================
     Search
     ===================================================================== */
  let INDEX = [];

  function buildSearchIndex() {
    INDEX = [];
    const seen = new Set();
    MODULES.forEach(m => {
      INDEX.push({ kind: 'module', id: m.id, title: m.title, sub: m.ru, mark: m.icon, color: m.color });
      m.children.forEach(br => {
        INDEX.push({ kind: 'branch', id: br.id, title: br.title, sub: br.ru, ctx: m.title, mark: br.icon || '•', color: m.color });
        br.children.forEach(lf => {
          INDEX.push({ kind: 'leaf', id: lf.id, title: lf.title, sub: lf.ru, ctx: m.title, mark: '•', color: m.color, leaf: lf });
          (lf.data.blocks || []).forEach(b => {
            if (b.type === 'text' && b.glossary) {
              b.glossary.forEach(it => {
                const key = 'text|' + it[0].toLowerCase();
                if (seen.has(key)) return;
                seen.add(key);
                INDEX.push({
                  kind: 'word', id: lf.id, title: it[0], sub: it[1],
                  mark: 'Aa', color: m.color, leaf: lf, word: it[0]
                });
              });
              return;
            }
            if (b.type !== 'words' && b.type !== 'phrase') return;
            (b.items || []).forEach(it => {
              const key = b.type + '|' + it[0].toLowerCase();
              if (seen.has(key)) return;
              seen.add(key);
              INDEX.push({
                kind: b.type === 'phrase' ? 'phrase' : 'word',
                id: lf.id, title: it[0], sub: it[1],
                mark: b.type === 'phrase' ? '“”' : 'Aa',
                color: m.color, leaf: lf, word: it[0]
              });
            });
          });
        });
      });
    });
  }

  function markText(text, q) {
    const lower = text.toLowerCase();
    const i = lower.indexOf(q);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }

  function runSearch(raw) {
    const q = String(raw || '').trim().toLowerCase();
    if (!q) { hideSearch(); return; }
    const mods = [], topics = [], words = [], phrases = [];
    INDEX.forEach(item => {
      const t = (item.title || '').toLowerCase();
      const s = (item.sub || '').toLowerCase();
      if (item.kind === 'module') {
        if (t.includes(q) || s.includes(q)) mods.push(item);
      } else if (item.kind === 'branch' || item.kind === 'leaf') {
        if (t.includes(q) || s.includes(q)) topics.push(item);
      } else if (item.kind === 'word' && q.length >= 2) {
        if (t.includes(q) || s.includes(q)) words.push(item);
      } else if (item.kind === 'phrase' && q.length >= 2) {
        if (t.includes(q) || s.includes(q)) phrases.push(item);
      }
    });
    const rank = arr => arr.sort((a, b) => {
      const ia = (a.title || '').toLowerCase().indexOf(q);
      const ib = (b.title || '').toLowerCase().indexOf(q);
      return (ia === 0 ? -1 : 0) - (ib === 0 ? -1 : 0) || ia - ib;
    });
    rank(mods); rank(topics); rank(words); rank(phrases);
    const groups = [];
    if (mods.length) groups.push({ label: 'Модули', items: mods.slice(0, 4) });
    if (topics.length) groups.push({ label: 'Темы', items: topics.slice(0, 6) });
    if (words.length) groups.push({ label: 'Слова', items: words.slice(0, 6) });
    if (phrases.length) groups.push({ label: 'Фразы', items: phrases.slice(0, 4) });

    if (!groups.length) {
      searchResults.innerHTML = '<div class="search-empty">Ничего не нашлось. Попробуйте <b>Present</b>, <b>школа</b> или <b>food</b>.</div>';
    } else {
      searchResults.innerHTML = groups.map(g =>
        '<div class="search-group">' + g.label + '</div>' + g.items.map(item => {
          const kindLabel = item.kind === 'module' ? 'модуль' : item.kind === 'branch' ? 'раздел' : item.kind === 'leaf' ? 'тема' : item.kind === 'phrase' ? 'фраза' : 'слово';
          let sub = (item.kind === 'word' || item.kind === 'phrase') ? item.leaf.title : item.sub;
          if ((item.kind === 'branch' || item.kind === 'leaf') && item.ctx) sub = item.sub + ' · ' + item.ctx;
          return '<button class="search-item" type="button" role="option" data-kind="' + item.kind + '" data-id="' + item.id + '"' +
            (item.word ? ' data-word="' + attr(item.word) + '"' : '') +
            ' style="--mc:' + item.color + ';--mc-14:' + tint(item.color, .14) + '">' +
            '<span class="si-mark">' + esc(item.mark) + '</span>' +
            '<span class="si-copy"><span class="si-title">' + markText(item.title, q) + '</span><span class="si-sub">' + markText(sub, q) + '</span></span>' +
            '<span class="si-kind">' + kindLabel + '</span>' +
          '</button>';
        }).join('')
      ).join('');
    }
    searchResults.hidden = false;
    searchInput.setAttribute('aria-expanded', 'true');
    state.searchItems = $$('.search-item', searchResults);
    state.searchIndex = -1;
  }

  function hideSearch() {
    searchResults.hidden = true;
    searchInput.setAttribute('aria-expanded', 'false');
    state.searchIndex = -1;
    state.searchItems = [];
  }

  function selectSearch(delta) {
    if (!state.searchItems.length) return;
    state.searchIndex += delta;
    if (state.searchIndex < 0) state.searchIndex = state.searchItems.length - 1;
    if (state.searchIndex >= state.searchItems.length) state.searchIndex = 0;
    state.searchItems.forEach((el, i) => el.classList.toggle('is-selected', i === state.searchIndex));
    const el = state.searchItems[state.searchIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  function activateSearch() {
    const el = state.searchItems[state.searchIndex] || state.searchItems[0];
    if (el) pickSearch(el);
  }

  function pickSearch(el) {
    const kind = el.dataset.kind;
    const id = el.dataset.id;
    const word = el.dataset.word;
    hideSearch();
    searchInput.value = '';
    searchBox.classList.remove('has-value');
    searchInput.blur();
    if (kind === 'module' || kind === 'branch') applyFocus(id);
    else if (kind === 'leaf') openLeaf(id);
    else if (kind === 'word') openLeaf(id, { highlight: word });
    else if (kind === 'phrase') openLeaf(id);
  }

  /* =====================================================================
     Toast, theme, help
     ===================================================================== */
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    STORE.set('sp5.theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f3f1ea' : '#05070f');
  }

  function initTheme() {
    const saved = STORE.get('sp5.theme', null);
    if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
  }

  function openHelp() { $('#helpModal').hidden = false; }
  function closeHelp() { $('#helpModal').hidden = true; }

  /* =====================================================================
     Events
     ===================================================================== */
  function bindEvents() {
    const brand = $('#brandHome');
    if (brand) brand.addEventListener('click', e => { e.preventDefault(); applyFocus(null); });

    $('#themeBtn').addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    $('#helpBtn').addEventListener('click', openHelp);
    $('#progressBtn').addEventListener('click', () => {
      if (window.SP5UI && window.SP5UI.openDashboard) { window.SP5UI.openDashboard(); return; }
      const done = state.progressDone || 0;
      toast('Изучено ' + done + ' из ' + TOTAL_LEAVES + ' тем · ' + Math.round((done / TOTAL_LEAVES) * 100) + '%');
    });

    $('#zoomIn').addEventListener('click', () => zoomCenter(1.18));
    $('#zoomOut').addEventListener('click', () => zoomCenter(1 / 1.18));
    $('#zoomFit').addEventListener('click', () => fitCamera(550));
    $('#zoomHome').addEventListener('click', () => applyFocus(null));

    dock.addEventListener('click', e => {
      const b = e.target.closest('[data-dock]');
      if (!b) return;
      if (b.dataset.dock === 'root') applyFocus(null);
      else applyFocus(b.dataset.dock);
    });

    const mhGrid = $('#mhGrid');
    if (mhGrid) {
      mhGrid.addEventListener('click', e => {
        const b = e.target.closest('[data-mh]');
        if (b) applyFocus(b.dataset.mh);
      });
    }

    crumbs.addEventListener('click', e => {
      const b = e.target.closest('[data-crumb]');
      if (!b) return;
      if (b.dataset.crumb === 'root') applyFocus(null);
      else applyFocus(b.dataset.crumb);
    });

    panel.addEventListener('click', e => {
      if (e.target.closest('[data-close-panel]')) { closePanel(); return; }
      const study = e.target.closest('[data-study]');
      if (study) {
        const lf = NODES.get(state.panelLeafId);
        if (lf) toggleStudied(lf);
        return;
      }
      if (e.target.closest('[data-cards]')) {
        const lf = NODES.get(state.panelLeafId);
        if (lf) openCards(lf.moduleNode.id);
        return;
      }
      if (e.target.closest('[data-test]')) {
        const lf = NODES.get(state.panelLeafId);
        if (lf && window.SP5UI && SP5UI.openTest) SP5UI.openTest(lf.moduleNode.id);
        return;
      }
      if (e.target.closest('[data-read-aloud]')) {
        const sec = e.target.closest('.reading');
        const ps = sec ? $$('p', sec).map(p => p.textContent).join(' ') : '';
        if (ps) speak(ps);
        return;
      }
      const prev = e.target.closest('[data-prev]');
      if (prev) {
        const lf = NODES.get(state.panelLeafId);
        if (lf) {
          const list = moduleLeaves(lf.moduleNode);
          const i = list.indexOf(lf);
          if (i > 0) openLeaf(list[i - 1].id);
        }
        return;
      }
      const next = e.target.closest('[data-next]');
      if (next) {
        const lf = NODES.get(state.panelLeafId);
        if (lf) {
          const list = moduleLeaves(lf.moduleNode);
          const i = list.indexOf(lf);
          if (i < list.length - 1) openLeaf(list[i + 1].id);
        }
        return;
      }

      const reveal = e.target.closest('[data-reveal]');
      if (reveal) {
        const item = reveal.closest('.task-item');
        const answer = item && item.querySelector('.task-answer');
        if (answer) {
          const show = answer.hidden;
          answer.hidden = !show;
          reveal.textContent = show ? 'Скрыть ответ' : 'Показать ответ';
          reveal.setAttribute('aria-expanded', show ? 'true' : 'false');
          reveal.classList.toggle('is-open', show);
        }
        return;
      }

      const opt = e.target.closest('.choice-opt');
      if (opt) {
        const item = opt.closest('.choice-item');
        if (!item || item.classList.contains('is-answered')) return;
        item.classList.add('is-answered');
        const correct = parseInt(item.dataset.correct, 10) || 0;
        const chosen = parseInt(opt.dataset.opt, 10);
        const opts = item.querySelectorAll('.choice-opt');
        opts.forEach((b, i) => {
          b.disabled = true;
          if (i === correct) b.classList.add('is-correct');
        });
        const ok = chosen === correct;
        if (!ok) opt.classList.add('is-wrong');
        const verdict = document.createElement('div');
        verdict.className = 'choice-verdict ' + (ok ? 'ok' : 'no');
        verdict.textContent = ok ? 'Правильно!' : 'Не совсем. Правильный вариант подсвечен.';
        const exp = item.querySelector('.choice-explain');
        item.insertBefore(verdict, exp);
        if (exp) exp.hidden = false;
        return;
      }

      const say = e.target.closest('[data-say]');
      if (say) speak(say.getAttribute('data-say'));
    });

    panelBody.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const word = e.target.closest('.word');
      if (word) { e.preventDefault(); speak(word.dataset.say); }
    });

    scrim.addEventListener('click', () => closePanel());

    const cardsModal = $('#cardsModal');
    cardsModal.addEventListener('click', e => {
      if (e.target === cardsModal) { closeCards(); return; }
      if (e.target.closest('[data-close-cards]')) { closeCards(); return; }
      if (e.target.closest('[data-restart]')) { restartCards(); return; }
      if (e.target.closest('[data-card-say]')) {
        e.stopPropagation();
        if (state.cards) speak(state.cards.list[state.cards.i][0]);
        return;
      }
      if (e.target.closest('#flashCard')) { flipCard(); return; }
      const act = e.target.closest('[data-card]');
      if (act) { advanceCard(act.dataset.card === 'know'); return; }
    });

    const helpModal = $('#helpModal');
    helpModal.addEventListener('click', e => {
      if (e.target === helpModal || e.target.closest('[data-close-modal]')) closeHelp();
    });

    searchInput.addEventListener('input', () => {
      searchBox.classList.toggle('has-value', searchInput.value.length > 0);
      runSearch(searchInput.value);
    });
    searchInput.addEventListener('focus', () => {
      if (state.panelOpen) closePanel();
      if (searchInput.value.trim()) runSearch(searchInput.value);
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (searchResults.hidden) runSearch(searchInput.value); selectSearch(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); selectSearch(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); activateSearch(); }
      else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); hideSearch(); searchInput.blur(); }
    });
    searchResults.addEventListener('click', e => {
      const el = e.target.closest('.search-item');
      if (el) pickSearch(el);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.search')) hideSearch();
    });

    document.addEventListener('keydown', e => {
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable);
      if (e.key === 'Escape') {
        if (state.cardsOpen) { closeCards(); return; }
        if (!$('#helpModal').hidden) { closeHelp(); return; }
        if (!searchResults.hidden) { hideSearch(); searchInput.blur(); return; }
        if (state.panelOpen) { closePanel(); return; }
        if (state.focusId) { goUp(); return; }
        return;
      }
      if (typing) return;
      if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault(); zoomCenter(1.15);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault(); zoomCenter(1 / 1.15);
      } else if (e.key === '?' ) {
        e.preventDefault(); openHelp();
      }
    });

    document.addEventListener('keydown', e => {
      if (!state.cardsOpen) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); advanceCard(true); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); advanceCard(false); }
    });

    bindMapGestures();
  }

  function bindMapGestures() {
    const pointers = new Map();
    let drag = null;
    let pinch = null;

    stage.addEventListener('pointerdown', e => {
      if (e.button !== undefined && e.button !== 0) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        drag = { x: e.clientX, y: e.clientY, cx: state.cam.x, cy: state.cam.y, moved: false };
        state.cam.t0 = null;
      } else if (pointers.size === 2) {
        const p = Array.from(pointers.values());
        pinch = {
          d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1,
          s: state.cam.s,
          cx: (p[0].x + p[1].x) / 2,
          cy: (p[0].y + p[1].y) / 2,
          camx: state.cam.x,
          camy: state.cam.y
        };
        drag = null;
      }
    });

    window.addEventListener('pointermove', e => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size >= 2 && pinch) {
        const p = Array.from(pointers.values());
        const d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1;
        const s = clamp(pinch.s * (d / pinch.d), .3, 2.4);
        const cx = (p[0].x + p[1].x) / 2;
        const cy = (p[0].y + p[1].y) / 2;
        const x = cx - (pinch.cx - pinch.camx) * (s / pinch.s);
        const y = cy - (pinch.cy - pinch.camy) * (s / pinch.s);
        setCam(x, y, s);
        state.suppressClick = true;
      } else if (drag) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) > 4) {
          drag.moved = true;
          stage.classList.add('is-dragging');
        }
        if (drag.moved) {
          setCam(drag.cx + dx, drag.cy + dy, state.cam.s);
          state.suppressClick = true;
        }
      }
    });

    const release = e => {
      pointers.delete(e.pointerId);
      if (pointers.size === 0) {
        stage.classList.remove('is-dragging');
        drag = null;
        pinch = null;
        if (state.suppressClick) {
          setTimeout(() => { state.suppressClick = false; }, 0);
        }
      } else if (pointers.size === 1) {
        const p = Array.from(pointers.values())[0];
        drag = { x: p.x, y: p.y, cx: state.cam.x, cy: state.cam.y, moved: false };
        pinch = null;
      }
    };
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);

    stage.addEventListener('wheel', e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0014));
    }, { passive: false });

    stage.addEventListener('dblclick', e => {
      if (e.target.closest('.node')) return;
      fitCamera(550);
    });

    stage.addEventListener('click', e => {
      if (state.suppressClick) return;
      if (state.panelOpen && !e.target.closest('.node')) closePanel();
    });

    let rt = null;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        updateSearchPlaceholder();
        NODES.forEach(n => { n.w = n.el.offsetWidth || n.w; n.h = n.el.offsetHeight || n.h; });
        applyFocus(state.focusId, { keepPanel: true });
        if (state.panelOpen) fitCamera(400);
      }, 160);
    });
  }

  /* =====================================================================
     Boot
     ===================================================================== */
  function updateSearchPlaceholder() {
    if (searchInput) searchInput.placeholder = window.innerWidth < 560 ? 'Поиск…' : 'Найти модуль, тему или слово…';
  }

  function boot() {
    initTheme();
    updateSearchPlaceholder();
    initSpeech();
    applyExtras();
    buildTree();
    mountAll();
    buildDock();
    buildMobileHome();
    buildSearchIndex();
    bindEvents();

    NODES.forEach(n => {
      n.x = 0; n.y = 0; n.s = n.type === 'root' ? .9 : .5; n.o = 0;
      applyNode(n);
    });
    state.cam.x = window.innerWidth / 2;
    state.cam.y = window.innerHeight / 2;
    state.cam.s = .88;
    applyCam();

    updateProgress();
    updateHint();
    applyFocus(null);
    state.booted = true;

    const params = new URLSearchParams(window.location.search);
    if (params.get('theme') === 'light' || params.get('theme') === 'dark') applyTheme(params.get('theme'));
    const startFocus = params.get('focus');
    const startLeaf = params.get('leaf');
    const startCards = params.get('cards');
    if (startFocus && NODES.has(startFocus)) applyFocus(startFocus);
    if (startLeaf && NODES.has(startLeaf)) openLeaf(startLeaf, { highlight: params.get('word') || '' });
    if (startCards && NODES.has(startCards)) setTimeout(() => openCards(startCards), 120);
    const startQuery = params.get('q');
    if (startQuery) {
      searchInput.value = startQuery;
      searchBox.classList.add('has-value');
      runSearch(startQuery);
    }

  }

  boot();

  window.SP5 = {
    state: state,
    NODES: NODES,
    MODULES: MODULES,
    ROOT: ROOT,
    TOTAL_LEAVES: TOTAL_LEAVES,
    openLeaf: openLeaf,
    openCards: openCards,
    closePanel: closePanel,
    applyFocus: applyFocus,
    moduleLeaves: moduleLeaves,
    moduleWords: moduleWords,
    speak: speak,
    toast: toast,
    updateProgress: updateProgress,
    readMistakes: readMistakes,
    addMistake: addMistake,
    removeMistake: removeMistake,
    icon: icon,
    esc: esc
  };
  document.dispatchEvent(new CustomEvent('sp5:ready'));
})();


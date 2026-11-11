/* Spotlight 5 — reading library, dashboard, tests, PWA and small UX tools */
(function () {
  'use strict';

  const SP5 = window.SP5;
  if (!SP5) return;

  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const esc = SP5.esc;
  const icon = SP5.icon;

  const state = {
    readLevel: 'all',
    readQuery: '',
    test: null,
    welcomeTimer: null
  };
  let deferredPrompt = null;

  /* ---------------------------------------------------------------- utils */
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function tests() {
    const list = readJSON('sp5.tests', []);
    return Array.isArray(list) ? list : [];
  }
  function studentName() {
    return String(readJSON('sp5.student', '') || '').trim();
  }
  function dateLabel(iso) {
    try {
      return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    } catch (e) { return ''; }
  }
  function modByTitle(title) {
    return SP5.MODULES.find(m => m.title === title);
  }
  function bestTest(mod) {
    return tests()
      .filter(t => t && t.module === mod.title)
      .sort((a, b) => (b.score / b.total) - (a.score / a.total) || new Date(b.date) - new Date(a.date))[0] || null;
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function allVocab() {
    const map = new Map();
    SP5.MODULES.forEach(mod => {
      SP5.moduleWords(mod).forEach(w => {
        if (w && w[0] && w[1]) map.set(String(w[0]).toLowerCase(), w);
      });
    });
    return Array.from(map.values());
  }

  /* -------------------------------------------------------------- modals */
  function makeModal(id, html, cls) {
    let m = document.getElementById(id);
    if (m) return m;
    m = document.createElement('div');
    m.className = 'modal sp5-modal ' + (cls || '');
    m.id = id;
    m.hidden = true;
    m.innerHTML = html;
    document.body.appendChild(m);
    m.addEventListener('click', e => {
      if (e.target === m) closeModal(m);
      if (e.target.closest('[data-close-modal]')) closeModal(m);
    });
    return m;
  }
  function openModal(m) {
    if (!m) return;
    m.hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeModal(m) {
    if (!m) return;
    m.hidden = true;
    if (!document.querySelector('.modal:not([hidden])')) document.body.classList.remove('modal-open');
  }
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = $$('.sp5-modal:not([hidden])').pop();
    if (open) { e.preventDefault(); closeModal(open); }
    cleanupSpeaking();
  });

  function closeAllSp5() {
    $$('.sp5-modal:not([hidden])').forEach(m => { m.hidden = true; });
    document.body.classList.remove('modal-open');
  }

  /* ------------------------------------------------------- reading library */
  function readingLeaves() {
    const out = [];
    SP5.MODULES.forEach(mod => {
      (mod.children || []).forEach(br => {
        (br.children || []).forEach(lf => {
          const text = (lf.data.blocks || []).find(b => b.type === 'text' && b.paragraphs);
          if (text) {
            out.push({
              mod: mod,
              leaf: lf,
              text: text,
              level: lf.data.level || 'A1',
              words: lf.data.words || String(text.paragraphs.join(' ')).split(/\s+/).filter(Boolean).length
            });
          }
        });
      });
    });
    return out;
  }

  const readingModal = makeModal('readingModal',
    '<div class="modal-box sp5-box" role="dialog" aria-modal="true" aria-labelledby="readingTitle">' +
      '<div class="sp5-head">' +
        '<div><p class="eyebrow">Reading room · 5 класс</p><h2 id="readingTitle">Тексты для чтения</h2>' +
        '<p>12 текстов по модулям: A1–A2, с глоссарием, вопросами и письменными заданиями.</p></div>' +
        '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button>' +
      '</div>' +
      '<div class="sp5-body" id="readingBody"></div>' +
    '</div>'
  );

  function openReading() {
    renderReading();
    openModal(readingModal);
  }

  function renderReading() {
    const body = $('#readingBody');
    if (!body) return;
    const list = readingLeaves();
    const levels = ['all', 'A1', 'A1+', 'A2'];
    const levelNames = { all: 'Все', 'A1': 'A1', 'A1+': 'A1+', 'A2': 'A2' };
    const query = state.readQuery.toLowerCase();
    const filtered = list.filter(x => {
      const okLevel = state.readLevel === 'all' || x.level === state.readLevel;
      const okQuery = !query || (x.text.title + ' ' + x.leaf.ru + ' ' + x.mod.title + ' ' + x.mod.label).toLowerCase().includes(query);
      return okLevel && okQuery;
    });
    body.innerHTML =
      '<div class="read-filters">' +
        levels.map(l => '<button class="read-filter ' + (state.readLevel === l ? 'is-active' : '') + '" type="button" data-read-level="' + l + '">' + levelNames[l] + '</button>').join('') +
        '<input class="read-search" id="readSearch" type="search" placeholder="Найти текст или модуль…" value="' + esc(state.readQuery) + '" autocomplete="off">' +
      '</div>' +
      (filtered.length
        ? '<div class="read-grid">' + filtered.map(x => {
            return '<button class="read-card" type="button" data-open-reading="' + x.leaf.id + '" style="--mc:' + x.mod.color + '">' +
              '<span class="rc-top"><span class="rc-mod">' + esc(x.mod.label) + ' · ' + esc(x.mod.title) + '</span>' +
              '<span class="rc-level">' + esc(x.level) + '</span></span>' +
              '<h3>' + esc(x.text.title || x.leaf.title) + '</h3>' +
              '<span class="rc-ru">' + esc(x.leaf.ru) + '</span>' +
              '<span class="rc-meta"><span>' + x.words + ' слов · 5 класс</span><span class="rc-go">Читать ' + icon('arrow-right') + '</span></span>' +
            '</button>';
          }).join('') + '</div>'
        : '<div class="dash-empty">Ничего не нашлось. Попробуйте «школа», «семья» или сбросьте фильтр уровня.</div>') +
      '<p class="sp5-muted" style="margin-top:13px">В каждом тексте есть кнопка «Прослушать текст», глоссарий и задания. Уровень указан по учебной шкале CEFR: A1 — база, A1+ — уверенный пятый класс, A2 — тексты для сильных учеников.</p>';

    const input = $('#readSearch', body);
    if (input) {
      input.addEventListener('input', e => {
        state.readQuery = e.target.value;
        const pos = e.target.selectionStart;
        renderReading();
        const next = $('#readSearch');
        if (next) { next.focus(); try { next.setSelectionRange(pos, pos); } catch (err) {} }
      });
    }
    $$('[data-read-level]', body).forEach(b => {
      b.addEventListener('click', () => { state.readLevel = b.dataset.readLevel; renderReading(); });
    });
    $$('[data-open-reading]', body).forEach(b => {
      b.addEventListener('click', () => {
        closeModal(readingModal);
        SP5.openLeaf(b.dataset.openReading);
      });
    });
  }

  /* ------------------------------------------------------------- dashboard */
  const dashModal = makeModal('dashModal',
    '<div class="modal-box sp5-box print-me" role="dialog" aria-modal="true" aria-labelledby="dashTitle">' +
      '<div class="sp5-head">' +
        '<div><p class="eyebrow">Ваш прогресс</p><h2 id="dashTitle">Результаты и настройки</h2>' +
        '<p>Локально в браузере: изученные темы, тесты, ошибки и материалы для учителя.</p></div>' +
        '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button>' +
      '</div>' +
      '<div class="sp5-body" id="dashBody"></div>' +
    '</div>'
  );

  function openDashboard() {
    renderDashboard();
    openModal(dashModal);
  }

  function renderDashboard() {
    const body = $('#dashBody');
    if (!body) return;
    const done = SP5.state.progress.size;
    const total = SP5.TOTAL_LEAVES || 1;
    const pct = Math.round((done / total) * 100);
    const allTests = tests();
    const avg = allTests.length
      ? Math.round(allTests.reduce((s, t) => s + (t.score / t.total) * 100, 0) / allTests.length)
      : 0;
    const mistakes = SP5.readMistakes();
    const student = studentName();
    const textSize = document.documentElement.dataset.textSize || 'normal';
    const contrast = document.documentElement.dataset.contrast || 'normal';

    const rows = SP5.MODULES.map(mod => {
      const leaves = SP5.moduleLeaves(mod);
      const md = leaves.filter(l => SP5.state.progress.has(l.id)).length;
      const mp = leaves.length ? Math.round((md / leaves.length) * 100) : 0;
      const bt = bestTest(mod);
      return '<div class="dash-row" style="--mc:' + mod.color + '">' +
        '<span class="dr-name">' + esc(mod.label) + ' · ' + esc(mod.title) + '</span>' +
        '<span class="dr-bar"><i style="width:' + mp + '%"></i></span>' +
        '<span class="dr-num">' + md + '/' + leaves.length + '</span>' +
        '<span class="dr-test">' + (bt ? 'тест ' + bt.score + '/' + bt.total : '—') + '</span>' +
      '</div>';
    }).join('');

    const recent = allTests.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);
    const testBlock = recent.length
      ? '<div class="test-list">' + recent.map(t =>
          '<div class="test-line"><span><b>' + esc(t.module) + '</b> · ' + dateLabel(t.date) + '</span>' +
          '<span class="tl-score">' + t.score + ' / ' + t.total + '</span></div>'
        ).join('') + '</div>'
      : '<div class="dash-empty">Тестов пока нет. Откройте любую тему и нажмите кнопку-мишень внизу — или выберите «Пройти тест» ниже.</div>';

    const mistakeBlock = mistakes.length
      ? '<div class="mistake-chips">' + mistakes.slice(-18).map(m =>
          '<button class="mistake-chip" type="button" data-repeat-mod="' + esc(m.mod) + '" title="Повторить слова модуля"><b>' + esc(m.en) + '</b> · ' + esc(m.ru) + '</button>'
        ).join('') + '</div>'
      : '<div class="dash-empty">Ошибок нет. Это хороший знак — но тесты стоит пройти, чтобы проверить себя.</div>';

    body.innerHTML =
      '<div class="dash-stats">' +
        '<div class="dash-stat" style="--mc:var(--accent)"><b>' + pct + '%</b><span>изучено тем</span></div>' +
        '<div class="dash-stat" style="--mc:var(--good)"><b>' + allTests.length + '</b><span>тестов пройдено</span></div>' +
        '<div class="dash-stat" style="--mc:#ffd166"><b>' + (allTests.length ? avg + '%' : '—') + '</b><span>средний результат</span></div>' +
        '<div class="dash-stat" style="--mc:#ff8fa3"><b>' + mistakes.length + '</b><span>слов в ошибках</span></div>' +
      '</div>' +
      '<div class="dash-section"><h3>По модулям</h3><span class="sp5-muted">' + done + ' из ' + total + ' тем</span></div>' +
      '<div class="dash-rows">' + rows + '</div>' +
      '<div class="dash-section"><h3>Последние тесты</h3></div>' + testBlock +
      '<div class="dash-section"><h3>Слова, где были ошибки</h3></div>' + mistakeBlock +
      '<div class="dash-section"><h3>Настройки</h3></div>' +
      '<div class="dash-settings">' +
        '<input class="dash-input" id="studentName" type="text" maxlength="40" placeholder="Имя ученика или класс" value="' + esc(student) + '">' +
        '<span class="seg"><button type="button" data-size="normal" class="' + (textSize === 'normal' ? 'is-active' : '') + '">Обычный</button><button type="button" data-size="lg" class="' + (textSize === 'lg' ? 'is-active' : '') + '">Крупный</button></span>' +
        '<span class="seg"><button type="button" data-contrast="normal" class="' + (contrast === 'normal' ? 'is-active' : '') + '">Обычный фон</button><button type="button" data-contrast="high" class="' + (contrast === 'high' ? 'is-active' : '') + '">Контраст</button></span>' +
      '</div>' +
      '<div class="sp5-actions">' +
        '<button class="sp5-btn primary" type="button" data-open-dash-test>' + icon('target') + 'Пройти тест</button>' +
        '<button class="sp5-btn" type="button" data-speaking>' + icon('mic') + 'Говорение</button>' +
        '<button class="sp5-btn" type="button" data-export>' + icon('download') + 'Экспорт CSV</button>' +
        '<button class="sp5-btn" type="button" data-print>' + icon('print') + 'Печать отчёта</button>' +
        '<button class="sp5-btn" type="button" data-copy>' + icon('book') + 'Скопировать ссылку</button>' +
        (deferredPrompt ? '<button class="sp5-btn" type="button" data-install>' + icon('download') + 'Установить приложение</button>' : '') +
        '<button class="sp5-btn danger" type="button" data-reset>Сбросить прогресс</button>' +
      '</div>' +
      '<p class="dash-note">Данные хранятся только в этом браузере: сервер не получает ни имена, ни результаты. CSV можно открыть в Excel и передать учителю. ' +
      'Ссылка для телефона: <b>' + esc(location.href) + '</b></p>';

    const nameInput = $('#studentName', body);
    if (nameInput) {
      nameInput.addEventListener('change', () => {
        writeJSON('sp5.student', nameInput.value.trim());
        SP5.toast('Имя сохранено');
      });
    }

    $$('[data-size]', body).forEach(b => b.addEventListener('click', () => {
      document.documentElement.dataset.textSize = b.dataset.size;
      writeJSON('sp5.textSize', b.dataset.size);
      renderDashboard();
    }));
    $$('[data-contrast]', body).forEach(b => b.addEventListener('click', () => {
      document.documentElement.dataset.contrast = b.dataset.contrast;
      writeJSON('sp5.contrast', b.dataset.contrast);
      renderDashboard();
    }));
    $$('[data-repeat-mod]', body).forEach(b => b.addEventListener('click', () => {
      const mod = modByTitle(b.dataset.repeatMod);
      if (!mod) return;
      closeModal(dashModal);
      SP5.openCards(mod.id);
    }));
    const testBtn = $('[data-open-dash-test]', body);
    if (testBtn) testBtn.addEventListener('click', () => {
      closeModal(dashModal);
      openDashboardTestPicker();
    });
    const speakBtn = $('[data-speaking]', body);
    if (speakBtn) speakBtn.addEventListener('click', () => {
      closeModal(dashModal);
      openSpeakingPicker();
    });
    const exportBtn = $('[data-export]', body);
    if (exportBtn) exportBtn.addEventListener('click', exportCSV);
    const printBtn = $('[data-print]', body);
    if (printBtn) printBtn.addEventListener('click', printDashboard);
    const copyBtn = $('[data-copy]', body);
    if (copyBtn) copyBtn.addEventListener('click', copyLink);
    const installBtn = $('[data-install]', body);
    if (installBtn) installBtn.addEventListener('click', installApp);
    const resetBtn = $('[data-reset]', body);
    if (resetBtn) resetBtn.addEventListener('click', resetProgress);
  }

  function openDashboardTestPicker() {
    // Small native picker: use a prompt-free panel with module buttons.
    const m = makeModal('pickTestModal',
      '<div class="modal-box sp5-box" role="dialog" aria-modal="true" aria-labelledby="pickTestTitle">' +
        '<div class="sp5-head"><div><p class="eyebrow">Проверка знаний</p><h2 id="pickTestTitle">Выберите модуль для теста</h2>' +
        '<p>10 вопросов: понимание текста и лексика модуля. Результат сохранится в прогрессе.</p></div>' +
        '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button></div>' +
        '<div class="sp5-body" id="pickTestBody"></div></div>'
    );
    const body = $('#pickTestBody', m);
    body.innerHTML = '<div class="read-grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">' +
      SP5.MODULES.map(mod => '<button class="read-card" type="button" data-pick-test="' + mod.id + '" style="--mc:' + mod.color + ';min-height:96px">' +
        '<span class="rc-mod">' + esc(mod.label) + '</span><h3>' + esc(mod.title) + '</h3>' +
        '<span class="rc-meta"><span>' + SP5.moduleLeaves(mod).length + ' тем</span><span class="rc-go">Тест ' + icon('arrow-right') + '</span></span>' +
      '</button>').join('') + '</div>';
    $$('[data-pick-test]', body).forEach(b => b.addEventListener('click', () => {
      closeModal(m);
      openTest(b.dataset.pickTest);
    }));
    openModal(m);
  }

  /* ------------------------------------------------------------------ tests */
  function readingQuestions(mod) {
    const out = [];
    (mod.children || []).forEach(br => (br.children || []).forEach(lf => {
      (lf.data.blocks || []).forEach(b => {
        if (b.type === 'choice') {
          (b.items || []).forEach(it => out.push({
            kind: 'reading',
            q: it.q,
            options: (it.options || []).slice(),
            correct: it.correct || 0,
            explain: it.explain || ''
          }));
        }
      });
    }));
    return out;
  }

  function buildTest(mod) {
    const rq = shuffle(readingQuestions(mod)).slice(0, 4);
    const words = shuffle(SP5.moduleWords(mod).filter(w => w && w[0] && w[1]));
    const pool = allVocab();
    const picked = [];
    const used = new Set();
    const need = Math.max(6, 10 - rq.length);
    words.forEach(w => {
      if (picked.length >= need || used.has(String(w[0]).toLowerCase())) return;
      used.add(String(w[0]).toLowerCase());
      const localPool = words.filter(x =>
        x && x[1] && x[0].toLowerCase() !== String(w[0]).toLowerCase() && x[1] !== w[1]
      );
      const source = localPool.length >= 2 ? localPool : pool.filter(x =>
        x && x[1] && x[0].toLowerCase() !== String(w[0]).toLowerCase() && x[1] !== w[1]
      );
      const distract = shuffle(source).slice(0, 2);
      const opts = shuffle(Array.from(new Set([w[1]].concat(distract.map(x => x[1])))));
      picked.push({
        kind: 'vocab',
        q: 'Как переводится <b>' + esc(w[0]) + '</b>?',
        options: opts,
        correct: opts.indexOf(w[1]),
        explain: '<b>' + esc(w[0]) + '</b> — ' + esc(w[1]),
        word: w
      });
    });
    return shuffle(rq.concat(picked));
  }

  const testModal = makeModal('testModal',
    '<div class="modal-box" style="width:min(590px,100%)" role="dialog" aria-modal="true" aria-labelledby="testTitle">' +
      '<div id="testBody"></div>' +
    '</div>'
  );

  function openTest(modId) {
    const mod = SP5.NODES.get(modId);
    if (!mod) return;
    const qs = buildTest(mod);
    if (!qs.length) { SP5.toast('Для этого модуля пока нет вопросов'); return; }
    state.test = { mod: mod, qs: qs, i: 0, score: 0, answered: false, wrong: 0 };
    closeAllSp5();
    renderTest();
    openModal(testModal);
  }

  function renderTest() {
    const s = state.test;
    if (!s) return;
    const body = $('#testBody');
    const q = s.qs[s.i];
    const pct = Math.round((s.i / s.qs.length) * 100);
    body.innerHTML =
      '<div class="sp5-head"><div><p class="eyebrow">Тест · ' + esc(s.mod.label) + '</p>' +
      '<h2 id="testTitle">' + esc(s.mod.title) + '</h2>' +
      '<p>Вопрос ' + (s.i + 1) + ' из ' + s.qs.length + ' · лексика и понимание текста</p></div>' +
      '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button></div>' +
      '<div class="sp5-body">' +
        '<div class="test-progress"><i style="width:' + pct + '%"></i></div>' +
        '<div class="test-q">' + q.q + '</div>' +
        '<div class="test-options" id="testOptions">' +
          q.options.map((o, i) => '<button class="test-opt" type="button" data-opt="' + i + '">' + esc(o) + '</button>').join('') +
        '</div>' +
        '<div id="testExplain"></div>' +
        '<div class="test-foot"><span class="test-count">' + (s.i + 1) + ' / ' + s.qs.length + '</span>' +
        '<button class="sp5-btn primary" type="button" data-next-q disabled>Далее ' + icon('arrow-right') + '</button></div>' +
      '</div>';
    $('#testOptions', body).addEventListener('click', e => {
      const opt = e.target.closest('[data-opt]');
      if (!opt || s.answered) return;
      answerTest(parseInt(opt.dataset.opt, 10));
    });
    const next = $('[data-next-q]', body);
    next.addEventListener('click', nextTest);
  }

  function answerTest(chosen) {
    const s = state.test;
    if (!s || s.answered) return;
    const q = s.qs[s.i];
    s.answered = true;
    const opts = $$('#testOptions [data-opt]');
    opts.forEach((b, i) => {
      b.disabled = true;
      if (i === q.correct) b.classList.add('is-correct');
    });
    const ok = chosen === q.correct;
    if (!ok) {
      opts[chosen].classList.add('is-wrong');
      s.wrong++;
      if (q.kind === 'vocab' && q.word) SP5.addMistake(q.word[0], q.word[1], s.mod.title);
    } else {
      s.score++;
    }
    const ex = $('#testExplain');
    ex.innerHTML = '<div class="test-explain"><b>' + (ok ? 'Верно!' : 'Пока неверно.') + '</b> ' +
      (q.explain || ('Правильный ответ: ' + esc(q.options[q.correct]))) + '</div>';
    const next = $('[data-next-q]');
    if (next) { next.disabled = false; next.focus(); }
  }

  function nextTest() {
    const s = state.test;
    if (!s || !s.answered) return;
    if (s.i >= s.qs.length - 1) { finishTest(); return; }
    s.i++;
    s.answered = false;
    renderTest();
  }

  function finishTest() {
    const s = state.test;
    if (!s) return;
    const list = tests();
    list.push({ module: s.mod.title, score: s.score, total: s.qs.length, date: new Date().toISOString() });
    writeJSON('sp5.tests', list.slice(-80));
    const pct = Math.round((s.score / s.qs.length) * 100);
    if (pct >= 80) setTimeout(boom, 160);
    const body = $('#testBody');
    body.innerHTML =
      '<div class="sp5-head"><div><p class="eyebrow">Тест завершён</p><h2 id="testTitle">' + esc(s.mod.title) + '</h2></div>' +
      '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button></div>' +
      '<div class="sp5-body"><div class="test-done">' +
        '<div class="big">' + (pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : '📚') + '</div>' +
        '<h3>' + (pct >= 80 ? 'Отличный результат!' : pct >= 60 ? 'Хорошая работа' : 'Есть что повторить') + '</h3>' +
        '<p>Правильно <span class="score">' + s.score + ' из ' + s.qs.length + '</span> (' + pct + '%). ' +
        (s.wrong ? 'Ошибочные слова сохранены — они появятся первыми в карточках.' : 'Ошибок нет — можно идти дальше.') + '</p>' +
        '<div class="sp5-actions">' +
          '<button class="sp5-btn primary" type="button" data-restart-test>Пройти ещё раз</button>' +
          '<button class="sp5-btn" type="button" data-open-dash>Открыть результаты</button>' +
          '<button class="sp5-btn" type="button" data-close-modal>Закрыть</button>' +
        '</div>' +
      '</div></div>';
    body.querySelector('[data-restart-test]').addEventListener('click', () => {
      closeModal(testModal);
      openTest(s.mod.id);
    });
    body.querySelector('[data-open-dash]').addEventListener('click', () => {
      closeModal(testModal);
      openDashboard();
    });
  }

  /* -------------------------------------------------------------- speaking */
  let speakingModal = null;
  let speakState = null;

  function openSpeakingPicker() {
    const m = makeModal('pickSpeakModal',
      '<div class="modal-box sp5-box" role="dialog" aria-modal="true" aria-labelledby="pickSpeakTitle">' +
        '<div class="sp5-head"><div><p class="eyebrow">Говорение</p><h2 id="pickSpeakTitle">Выберите модуль для практики</h2>' +
        '<p>4 фразы: послушайте образец, запишите себя и сравните интонацию.</p></div>' +
        '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button></div>' +
        '<div class="sp5-body" id="pickSpeakBody"></div></div>'
    );
    const body = $('#pickSpeakBody', m);
    body.innerHTML = '<div class="read-grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">' +
      SP5.MODULES.map(mod => '<button class="read-card" type="button" data-pick-speak="' + mod.id + '" style="--mc:' + mod.color + ';min-height:96px">' +
        '<span class="rc-mod">' + esc(mod.label) + '</span><h3>' + esc(mod.title) + '</h3>' +
        '<span class="rc-meta"><span>' + esc(mod.title) + '</span><span class="rc-go">Говорить ' + icon('arrow-right') + '</span></span>' +
      '</button>').join('') + '</div>';
    $$('[data-pick-speak]', body).forEach(b => b.addEventListener('click', () => {
      closeModal(m);
      openSpeaking(b.dataset.pickSpeak);
    }));
    openModal(m);
  }

  function ensureSpeakingModal() {
    if (speakingModal) return;
    speakingModal = makeModal('speakingModal',
      '<div class="modal-box" style="width:min(560px,100%)" role="dialog" aria-modal="true" aria-labelledby="speakTitle">' +
        '<div id="speakingBody"></div></div>'
    );
    speakingModal.addEventListener('click', e => {
      if (e.target === speakingModal || e.target.closest('[data-close-modal]')) cleanupSpeaking();
    });
  }

  function openSpeaking(modId) {
    const mod = SP5.NODES.get(modId);
    if (!mod) return;
    const phrases = [];
    (mod.children || []).forEach(br => (br.children || []).forEach(lf => {
      (lf.data.blocks || []).forEach(b => {
        if (b.type === 'phrase') (b.items || []).forEach(it => phrases.push({ en: it[0], ru: it[1] }));
      });
    }));
    if (!phrases.length) { SP5.toast('В этом модуле пока нет фраз для говорения'); return; }
    cleanupSpeaking();
    speakState = { mod: mod, items: shuffle(phrases).slice(0, 4), i: 0, rec: null, stream: null, chunks: [], url: null };
    ensureSpeakingModal();
    renderSpeaking();
    openModal(speakingModal);
  }

  function renderSpeaking() {
    const s = speakState;
    if (!s) return;
    const item = s.items[s.i];
    const body = $('#speakingBody');
    body.innerHTML =
      '<div class="sp5-head"><div><p class="eyebrow">Говорение · ' + esc(s.mod.label) + '</p>' +
      '<h2 id="speakTitle">' + esc(s.mod.title) + '</h2>' +
      '<p>Фраза ' + (s.i + 1) + ' из ' + s.items.length + ' · слушайте, повторяйте, записывайте</p></div>' +
      '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button></div>' +
      '<div class="sp5-body"><div class="speak-card">' +
        '<div class="speak-phrase">' + esc(item.en) + '</div>' +
        '<div class="speak-ru">' + esc(item.ru) + '</div>' +
        '<div class="sp5-actions">' +
          '<button class="sp5-btn primary" type="button" data-say-phrase>' + icon('volume') + 'Образец</button>' +
          '<button class="sp5-btn" type="button" data-record>' + icon('mic') + 'Записать</button>' +
          '<button class="sp5-btn" type="button" data-next-speak>Следующая ' + icon('arrow-right') + '</button>' +
        '</div>' +
        '<p class="speak-status" id="speakStatus">Микрофон не включён. Запись остаётся в браузере и никуда не отправляется.</p>' +
        '<audio class="speak-audio" id="speakAudio" controls hidden></audio>' +
      '</div>' +
      '<p class="sp5-muted" style="margin-top:12px">Сравните с образцом: окончания слов, ударение, паузы. Не бойтесь ошибиться — запись нужна только вам.</p></div>';

    $('[data-say-phrase]', body).addEventListener('click', () => SP5.speak(item.en));
    $('[data-record]', body).addEventListener('click', toggleRecording);
    $('[data-next-speak]', body).addEventListener('click', nextSpeaking);
  }

  async function toggleRecording() {
    const s = speakState;
    if (!s) return;
    const status = $('#speakStatus');
    const btn = $('[data-record]');
    if (s.rec && s.rec.state === 'recording') { s.rec.stop(); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      if (status) status.textContent = 'Этот браузер не поддерживает запись. Можно просто повторять вслух за образцом.';
      return;
    }
    try {
      s.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      s.chunks = [];
      s.rec = new MediaRecorder(s.stream);
      s.rec.ondataavailable = e => { if (e.data && e.data.size) s.chunks.push(e.data); };
      s.rec.onstop = () => {
        if (!s.rec) return;
        const blob = new Blob(s.chunks, { type: s.rec.mimeType || 'audio/webm' });
        if (s.url) URL.revokeObjectURL(s.url);
        s.url = URL.createObjectURL(blob);
        if (s.stream) { s.stream.getTracks().forEach(t => t.stop()); s.stream = null; }
        const audio = $('#speakAudio');
        if (audio) { audio.src = s.url; audio.hidden = false; }
        if (status) status.textContent = 'Запись готова. Послушайте себя и сравните с образцом.';
        if (btn) btn.innerHTML = icon('mic') + 'Записать ещё';
      };
      s.rec.start();
      if (status) status.textContent = 'Идёт запись… Нажмите «Стоп», когда закончите.';
      if (btn) btn.innerHTML = '<span class="rec-dot"></span>Стоп';
    } catch (e) {
      if (status) status.textContent = 'Микрофон недоступен. Разрешите доступ в браузере или просто повторяйте вслух.';
    }
  }

  function nextSpeaking() {
    const s = speakState;
    if (!s) return;
    cleanupMedia();
    if (s.i >= s.items.length - 1) {
      $('#speakingBody').innerHTML =
        '<div class="sp5-head"><div><p class="eyebrow">Говорение завершено</p><h2>Хорошая работа!</h2></div>' +
        '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button></div>' +
        '<div class="sp5-body"><div class="test-done"><div class="big">🎤</div>' +
        '<h3>Вы проговорили 4 фразы</h3><p>Повторите запись через день — так речь становится увереннее.</p>' +
        '<div class="sp5-actions"><button class="sp5-btn primary" type="button" data-repeat-speak>Ещё раз</button>' +
        '<button class="sp5-btn" type="button" data-close-modal>Закрыть</button></div></div></div>';
      const rep = $('[data-repeat-speak]');
      if (rep) rep.addEventListener('click', () => { s.i = 0; renderSpeaking(); });
      return;
    }
    s.i++;
    s.url = null;
    s.rec = null;
    renderSpeaking();
  }

  function cleanupMedia() {
    const s = speakState;
    if (!s) return;
    if (s.rec && s.rec.state === 'recording') { try { s.rec.stop(); } catch (e) {} }
    if (s.stream) { s.stream.getTracks().forEach(t => t.stop()); s.stream = null; }
    if (s.url) { URL.revokeObjectURL(s.url); s.url = null; }
    s.rec = null;
  }

  function cleanupSpeaking() {
    cleanupMedia();
    speakState = null;
  }

  /* ------------------------------------------------------------------ CSV */
  function csvCell(v) {
    const s = String(v == null ? '' : v);
    return '"' + s.replace(/"/g, '""') + '"';
  }

  function exportCSV() {
    const rows = [
      ['Ученик', studentName() || ''],
      ['Дата выгрузки', new Date().toLocaleString('ru-RU')],
      [],
      ['Раздел', 'Тема', 'Изучено', 'Тест', 'Балл', 'Всего', 'Дата']
    ];
    SP5.MODULES.forEach(mod => {
      SP5.moduleLeaves(mod).forEach(lf => {
        rows.push([mod.title, lf.title, SP5.state.progress.has(lf.id) ? 'да' : 'нет', '', '', '', '']);
      });
    });
    tests()
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(t => rows.push([t.module, '— итоговый тест —', '', 'тест', t.score, t.total, dateLabel(t.date)]));
    const csv = '\ufeff' + rows.map(r => r.map(csvCell).join(';')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'spotlight5-progress.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 600);
    SP5.toast('CSV скачан — откройте его в Excel');
  }

  function resetProgress() {
    if (!confirm('Сбросить весь прогресс, тесты и ошибки? Это действие нельзя отменить.')) return;
    ['sp5.progress', 'sp5.tests', 'sp5.mistakes'].forEach(k => localStorage.removeItem(k));
    SP5.state.progress.clear();
    SP5.updateProgress();
    renderDashboard();
    SP5.toast('Прогресс сброшен');
  }

  function printDashboard() {
    dashModal.classList.add('print-me');
    document.body.classList.add('printing');
    setTimeout(() => { window.print(); }, 80);
    setTimeout(() => {
      document.body.classList.remove('printing');
      dashModal.classList.remove('print-me');
    }, 1200);
  }

  function copyLink() {
    const url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => SP5.toast('Ссылка скопирована'), () => SP5.toast(url));
    } else {
      SP5.toast(url);
    }
  }

  /* --------------------------------------------------------------- PWA */
  function installApp() {
    if (!deferredPrompt) { SP5.toast('Установка недоступна в этом браузере'); return; }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; renderDashboard(); });
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const modal = $('#dashModal');
    if (modal && !modal.hidden) renderDashboard();
  });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; });

  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    if (!/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  /* ----------------------------------------------------------- confetti */
  function boom() {
    let layer = $('#sp5Confetti');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'sp5Confetti';
      document.body.appendChild(layer);
    }
    const colors = ['#8fa2ff', '#43d9a3', '#ffd166', '#ff6b8a', '#b388ff', '#4cc9f0'];
    for (let i = 0; i < 46; i++) {
      const c = document.createElement('i');
      c.className = 'confetto';
      c.style.left = (Math.random() * 100) + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.setProperty('--dx', (Math.random() * 180 - 90) + 'px');
      c.style.setProperty('--rot', (Math.random() * 720 + 180) + 'deg');
      c.style.animationDelay = (Math.random() * .35) + 's';
      c.style.animationDuration = (1.9 + Math.random() * 1.2) + 's';
      layer.appendChild(c);
    }
    setTimeout(() => { layer.innerHTML = ''; }, 4200);
  }

  /* ---------------------------------------------------------- onboarding */
  const welcomeModal = makeModal('welcomeModal',
    '<div class="modal-box welcome-box" role="dialog" aria-modal="true" aria-labelledby="welcomeTitle">' +
      '<div class="sp5-head"><div><p class="eyebrow">Spotlight 5 · старт</p><h2 id="welcomeTitle">Карта, которая показывает связи</h2>' +
      '<p>Три шага — и вы уже учитесь, а не просто листаете список тем.</p></div>' +
      '<button class="icon-btn" type="button" data-close-modal aria-label="Закрыть">' + icon('x') + '</button></div>' +
      '<div class="sp5-body">' +
        '<div class="welcome-steps">' +
          '<div class="welcome-step"><b>01</b><div><strong>Выберите раздел</strong>Нажмите на ветку вокруг центра — карта плавно перестроится.</div></div>' +
          '<div class="welcome-step"><b>02</b><div><strong>Откройте текст</strong>Кнопка «Тексты» на главном экране или книга внизу слева собирает 12 текстов с заданиями.</div></div>' +
          '<div class="welcome-step"><b>03</b><div><strong>Проверьте себя</strong>Кнопка-мишень внизу темы запускает тест, а кольцо прогресса или «Прогресс» на главном экране открывает результаты.</div></div>' +
        '</div>' +
        '<div class="sp5-actions"><button class="sp5-btn primary" type="button" data-close-modal>Начать</button>' +
        '<button class="sp5-btn" type="button" data-open-help>Как пользоваться</button></div>' +
        '<p class="sp5-muted" style="margin-top:12px">Это окно больше не появится. Настройки и экспорт — в прогресс-кольце вверху.</p>' +
      '</div></div>'
  );

  function showWelcome() {
    if (/[?&]still=1/.test(location.search)) return;
    if (readJSON('sp5.welcome', false)) return;
    if (document.querySelector('.sp5-modal:not([hidden])')) return;
    openModal(welcomeModal);
    writeJSON('sp5.welcome', true);
  }
  const helpBtn = $('[data-open-help]', welcomeModal);
  if (helpBtn) helpBtn.addEventListener('click', () => { closeModal(welcomeModal); const h = $('#helpBtn'); if (h) h.click(); });

  /* -------------------------------------------------------- top/dock tools */
  function addTools() {
    const top = document.querySelector('.top-actions');
    if (top) {
      const b = document.createElement('button');
      b.className = 'icon-btn top-reading';
      b.id = 'readingTopBtn';
      b.type = 'button';
      b.title = 'Тексты для чтения';
      b.setAttribute('aria-label', 'Тексты для чтения');
      b.innerHTML = icon('book');
      b.addEventListener('click', openReading);
      top.insertBefore(b, top.firstChild);
    }
    const dock = document.querySelector('.dock');
    if (dock) {
      const b = document.createElement('button');
      b.className = 'dock-home';
      b.id = 'readingDockBtn';
      b.type = 'button';
      b.title = 'Тексты для чтения';
      b.setAttribute('aria-label', 'Тексты для чтения');
      b.innerHTML = icon('book');
      b.addEventListener('click', e => { e.stopPropagation(); openReading(); });
      dock.insertBefore(b, dock.firstChild);
      const sep = document.createElement('span');
      sep.className = 'dock-sep';
      dock.insertBefore(sep, b.nextSibling);
    }
    const mh = document.querySelector('.mobile-home');
    if (mh && !$('#mhTools')) {
      const tools = document.createElement('div');
      tools.className = 'mh-tools';
      tools.id = 'mhTools';
      tools.innerHTML =
        '<button type="button" data-mh-reading><span>' + icon('book') + '</span><b>Тексты</b><i>12 текстов</i></button>' +
        '<button type="button" data-mh-dash><span>' + icon('chart') + '</span><b>Прогресс</b><i>тесты и настройки</i></button>';
      const hero = mh.querySelector('.mh-hero');
      if (hero && hero.nextSibling) mh.insertBefore(tools, hero.nextSibling);
      else mh.insertBefore(tools, mh.firstChild);
      $('[data-mh-reading]', tools).addEventListener('click', openReading);
      $('[data-mh-dash]', tools).addEventListener('click', openDashboard);
    }
  }

  /* --------------------------------------------------------------- init */
  function applyPrefs() {
    const size = readJSON('sp5.textSize', 'normal');
    const contrast = readJSON('sp5.contrast', 'normal');
    document.documentElement.dataset.textSize = size === 'lg' ? 'lg' : 'normal';
    document.documentElement.dataset.contrast = contrast === 'high' ? 'high' : 'normal';
  }

  if (/[?&]still=1/.test(location.search)) document.documentElement.dataset.still = '1';
  applyPrefs();
  addTools();
  registerSW();
  setTimeout(showWelcome, 1100);

  const params = new URLSearchParams(location.search);
  if (params.get('debug') === '1') {
    const pre = document.createElement('pre');
    pre.id = 'sp5Debug';
    pre.style.cssText = 'position:fixed;z-index:999;left:0;top:0;max-width:100vw;max-height:100vh;overflow:auto;background:#000;color:#0f0;font:10px monospace;padding:8px;margin:0';
    pre.textContent = 'TOTAL=' + SP5.TOTAL_LEAVES + '\n' + JSON.stringify(SP5.MODULES.map(m => ({
      t: m.title, ch: m.children.length,
      br: m.children.map(b => [b.title, b.children.length]),
      lv: SP5.moduleLeaves(m).length
    })), null, 1);
    document.body.appendChild(pre);
  }
  setTimeout(() => {
    if (params.get('reading') === '1') openReading();
    if (params.get('dash') === '1') openDashboard();
    if (params.get('test')) openTest(params.get('test'));
    if (params.get('welcome') === '1') openModal(welcomeModal);
  }, 450);

  window.SP5UI = {
    openReading: openReading,
    openDashboard: openDashboard,
    openTest: openTest,
    openWelcome: () => { writeJSON('sp5.welcome', false); openModal(welcomeModal); }
  };
})();

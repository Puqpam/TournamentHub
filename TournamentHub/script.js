/* ==========================================================
   TournamentHub — script.js
   Данные ниже — тестовые. Когда друг сделает бэкенд,
   заменишь массивы на fetch('/api/...') (см. комментарии).
   ========================================================== */

/* ---------- 1. ДАННЫЕ (потом приедут с сервера) ---------- */
const GAMES = [
  { id: 'cs2',    icon: '🔫', name: 'CS2',               color: '#ffd23f', mode: 'team',  online: true,  offline: true },
  { id: 'dota2',  icon: '🛡️', name: 'Dota 2',            color: '#ff2e93', mode: 'team',  online: true,  offline: true },
  { id: 'chess',  icon: '♞',  name: 'Chess',             color: '#19e3ff', mode: 'solo',  online: true,  offline: true },
  { id: 'mafia',  icon: '🎭', name: 'Mafia',             color: '#ff2e93', mode: 'party', online: false, offline: true },
  { id: 'bunker', icon: '☢️', name: 'Bunker',            color: '#55ff9a', mode: 'party', online: true,  offline: true },
  { id: 'pubg',   icon: '🪂', name: 'PUBG',              color: '#ffd23f', mode: 'team',  online: true,  offline: true },
  { id: 'mlbb',   icon: '⚔️', name: 'Mobile Legends',    color: '#19e3ff', mode: 'team',  online: true,  offline: true },
  { id: 'cards',  icon: '🃏', name: 'Cards',             color: '#55ff9a', mode: 'party', online: false, offline: true },
];

// date: ГГГГ-ММ-ДД
const TOURNAMENTS = [
  { id: 1, game: 'cs2',    name: 'Ala-Too Cup',        date: '2026-10-24', format: 'offline', city: 'Бишкек',  prize: 100000, slots: 16, taken: 11 },
  { id: 2, game: 'dota2',  name: 'Tian Shan Open',     date: '2026-10-18', format: 'online',  city: 'Online',  prize: 60000,  slots: 32, taken: 27 },
  { id: 3, game: 'chess',  name: 'Blitz Night',        date: '2026-10-15', format: 'online',  city: 'Online',  prize: 15000,  slots: 64, taken: 40 },
  { id: 4, game: 'mafia',  name: 'Mafia Club Weekend', date: '2026-10-17', format: 'offline', city: 'Ош',      prize: 8000,   slots: 20, taken: 14 },
  { id: 5, game: 'bunker', name: 'Bunker Survival',    date: '2026-10-22', format: 'online',  city: 'Online',  prize: 5000,   slots: 30, taken: 9  },
  { id: 6, game: 'pubg',   name: 'Chaldovar Squads',   date: '2026-11-02', format: 'online',  city: 'Online',  prize: 40000,  slots: 25, taken: 18 },
  { id: 7, game: 'mlbb',   name: 'Issyk-Kul Legends',  date: '2026-11-08', format: 'offline', city: 'Чолпон-Ата', prize: 50000, slots: 16, taken: 6 },
  { id: 8, game: 'cards',  name: 'Kyrgyz Cards Masters', date: '2026-11-14', format: 'offline', city: 'Бишкек', prize: 12000, slots: 48, taken: 30 },
];

const MATCHES = [
  { time: '19:00', date: '2026-10-09', game: 'cs2',   a: 'Nomad Five',   b: 'Tian Shan',     live: true },
  { time: '20:30', date: '2026-10-09', game: 'dota2', a: 'Osh Kings',    b: 'Manas Esports', live: false },
  { time: '18:00', date: '2026-10-10', game: 'mlbb',  a: 'Ala-Too',      b: 'Issyk Wolves',  live: false },
  { time: '21:00', date: '2026-10-10', game: 'chess', a: 'Aibek T.',     b: 'Nurlan S.',     live: false },
  { time: '17:00', date: '2026-10-11', game: 'pubg',  a: 'Squad Alpha',  b: 'Squad Omega',   live: false },
];

const NEWS = [
  { date: '2026-10-08', title: 'Открыта регистрация на Ala-Too Cup',  text: 'Призовой фонд — 100 000 сом. Финал пройдёт офлайн в Бишкеке, групповой этап — онлайн.' },
  { date: '2026-10-05', title: 'В «Мафию» теперь играем по рейтингу', text: 'Каждая игра даёт очки. Лучшие игроки сезона получат места в финале.' },
  { date: '2026-10-01', title: 'Новая игра: Mobile Legends',          text: 'Первый турнир по MLBB пройдёт на Иссык-Куле. Ищи команду и регистрируйся.' },
];

const TEAMS = ['Navi KG', 'Ala-Too', 'Issyk Wolves', 'Bishkek Storm', 'Osh Kings', 'Tian Shan', 'Manas Esports', 'Nomad Five'];

/* ---------- 2. ПЕРЕВОДЫ ---------- */
const I18N = {
  ru: {
    nav_games: 'Игры', nav_tournaments: 'Турниры', nav_bracket: 'Сетка', nav_schedule: 'Расписание', nav_news: 'Новости',
    register: 'Регистрация',
    hero_coin: '1 ИГРОК — ВСТАВЬТЕ МОНЕТУ',
    hero_text: 'Турниры по киберспорту и настольным играм. Онлайн и офлайн. Собирай команду, регистрируйся и становись чемпионом.',
    hero_cta1: '▶ Смотреть турниры',
    stat_players: 'игроков', stat_tournaments: 'турниров', stat_games: 'игр', stat_prize: 'призовой фонд',
    games_title: 'Выбери игру', tournaments_title: 'Ближайшие турниры',
    filter_all: 'Все', online: 'Онлайн', offline: 'Офлайн',
    slots: 'Места', join: 'Участвовать', prize: 'Приз',
    mode_team: 'Командная игра', mode_solo: 'Один на один', mode_party: 'Компания',
    game_online_offline: 'онлайн и офлайн', game_offline_only: 'только офлайн',
    bracket_title: 'Турнирная сетка', bracket_hint: 'Нажми на команду, чтобы выбрать победителя матча.',
    bracket_reset: 'Сбросить', round1: '1/4 финала', round2: 'Полуфинал', round3: 'Финал', champion: 'Чемпион',
    schedule_title: 'Расписание матчей', live: 'LIVE', today: 'Сегодня',
    news_title: 'Новости',
    footer_text: 'Демо-версия. Все данные — тестовые.',
    form_title: 'Регистрация на турнир',
    f_tournament: 'Турнир', f_nick: 'Ник', f_team: 'Команда (если есть)', f_contact: 'Telegram или телефон',
    f_submit: 'Отправить заявку',
    err_fill: 'Заполни ник и контакт: минимум 2 и 5 символов.',
    ok: 'Заявка принята! Мы свяжемся с тобой.',
    empty: 'Турниров по этим фильтрам пока нет.',
  },
  en: {
    nav_games: 'Games', nav_tournaments: 'Tournaments', nav_bracket: 'Bracket', nav_schedule: 'Schedule', nav_news: 'News',
    register: 'Sign up',
    hero_coin: '1 PLAYER — INSERT COIN',
    hero_text: 'Esports and board game tournaments. Online and offline. Build a team, sign up and become a champion.',
    hero_cta1: '▶ Browse tournaments',
    stat_players: 'players', stat_tournaments: 'tournaments', stat_games: 'games', stat_prize: 'prize pool',
    games_title: 'Pick a game', tournaments_title: 'Upcoming tournaments',
    filter_all: 'All', online: 'Online', offline: 'Offline',
    slots: 'Slots', join: 'Join', prize: 'Prize',
    mode_team: 'Team game', mode_solo: 'One on one', mode_party: 'Party game',
    game_online_offline: 'online and offline', game_offline_only: 'offline only',
    bracket_title: 'Tournament bracket', bracket_hint: 'Click a team to pick the match winner.',
    bracket_reset: 'Reset', round1: 'Quarterfinals', round2: 'Semifinals', round3: 'Final', champion: 'Champion',
    schedule_title: 'Match schedule', live: 'LIVE', today: 'Today',
    news_title: 'News',
    footer_text: 'Demo version. All data is placeholder.',
    form_title: 'Tournament registration',
    f_tournament: 'Tournament', f_nick: 'Nickname', f_team: 'Team (optional)', f_contact: 'Telegram or phone',
    f_submit: 'Send application',
    err_fill: 'Enter a nickname (2+ chars) and a contact (5+ chars).',
    ok: 'Application received! We will contact you.',
    empty: 'No tournaments match these filters yet.',
  },
  ky: {
    nav_games: 'Оюндар', nav_tournaments: 'Турнирлер', nav_bracket: 'Торчо', nav_schedule: 'Жадыбал', nav_news: 'Жаңылыктар',
    register: 'Катталуу',
    hero_coin: '1 ОЮНЧУ — ТЫЙЫН САЛЫҢЫЗ',
    hero_text: 'Киберспорт жана стол оюндары боюнча турнирлер. Онлайн жана оффлайн. Команда чогулт, катталып, чемпион бол.',
    hero_cta1: '▶ Турнирлерди көрүү',
    stat_players: 'оюнчу', stat_tournaments: 'турнир', stat_games: 'оюн', stat_prize: 'байге фонду',
    games_title: 'Оюнду танда', tournaments_title: 'Жакынкы турнирлер',
    filter_all: 'Баары', online: 'Онлайн', offline: 'Оффлайн',
    slots: 'Орун', join: 'Катышуу', prize: 'Байге',
    mode_team: 'Командалык оюн', mode_solo: 'Бирден бирге', mode_party: 'Компаниялык оюн',
    game_online_offline: 'онлайн жана оффлайн', game_offline_only: 'оффлайн гана',
    bracket_title: 'Турнир торчосу', bracket_hint: 'Жеңүүчүнү тандоо үчүн команданы басыңыз.',
    bracket_reset: 'Тазалоо', round1: '1/4 финал', round2: 'Жарым финал', round3: 'Финал', champion: 'Чемпион',
    schedule_title: 'Беттештер жадыбалы', live: 'LIVE', today: 'Бүгүн',
    news_title: 'Жаңылыктар',
    footer_text: 'Демо версия. Бардык маалымат — сынамык.',
    form_title: 'Турнирге катталуу',
    f_tournament: 'Турнир', f_nick: 'Ник', f_team: 'Команда (бар болсо)', f_contact: 'Telegram же телефон',
    f_submit: 'Арыз жөнөтүү',
    err_fill: 'Ник (2+ белги) жана байланыш (5+ белги) жазыңыз.',
    ok: 'Арыз кабыл алынды! Биз сиз менен байланышабыз.',
    empty: 'Бул чыпкалар боюнча турнир азырынча жок.',
  },
};

/* ---------- 3. СОСТОЯНИЕ ---------- */
const state = {
  lang: localStorage.getItem('th_lang') || 'ru',
  theme: localStorage.getItem('th_theme') || 'dark',
  game: 'all',
  format: 'all',
  bracket: { r1: [null, null, null, null], r2: [null, null], r3: [null] },
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const t = key => (I18N[state.lang] && I18N[state.lang][key]) || I18N.ru[key] || key;
const fmtDate = iso => iso.split('-').reverse().join('.');
const fmtMoney = n => n.toLocaleString('ru-RU') + ' KGS';

/* ---------- 4. ТЕМА И ЯЗЫК ---------- */
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  localStorage.setItem('th_theme', state.theme);
}

function applyLang() {
  document.documentElement.lang = state.lang;
  localStorage.setItem('th_lang', state.lang);
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('.lang button').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
  renderAll();
}

/* ---------- 5. ОТРИСОВКА ---------- */
function renderGames() {
  $('#gamesGrid').innerHTML = GAMES.map(g => `
    <button class="game reveal" style="--c:${g.color}" data-game="${g.id}">
      <span class="game-icon">${g.icon}</span>
      <span class="game-name">${g.name}</span>
      <span class="game-meta">${t('mode_' + g.mode)} · ${g.online ? t('game_online_offline') : t('game_offline_only')}</span>
    </button>`).join('');
}

function renderChips() {
  const gameChips = [{ id: 'all', name: t('filter_all') }, ...GAMES];
  $('#gameChips').innerHTML = gameChips.map(g =>
    `<button class="chip ${state.game === g.id ? 'active' : ''}" data-chip-game="${g.id}">${g.name}</button>`).join('');
  const formats = [['all', t('filter_all')], ['online', t('online')], ['offline', t('offline')]];
  $('#formatChips').innerHTML = formats.map(([id, label]) =>
    `<button class="chip ${state.format === id ? 'active' : ''}" data-chip-format="${id}">${label}</button>`).join('');
}

function renderTournaments() {
  const list = TOURNAMENTS
    .filter(x => state.game === 'all' || x.game === state.game)
    .filter(x => state.format === 'all' || x.format === state.format)
    .sort((a, b) => a.date.localeCompare(b.date));

  $('#tournamentList').innerHTML = list.length ? list.map(x => {
    const g = GAMES.find(g => g.id === x.game);
    const pct = Math.round(x.taken / x.slots * 100);
    return `
      <article class="card reveal">
        <div class="card-top">
          <span class="game-name" style="--c:${g.color}">${g.icon} ${g.name}</span>
          <span class="badge ${x.format}">${t(x.format)}</span>
        </div>
        <h3>${x.name}</h3>
        <div class="card-info">
          <span>📅 ${fmtDate(x.date)} · 📍 ${x.city}</span>
          <span>${t('prize')}: <span class="prize">${fmtMoney(x.prize)}</span></span>
          <span>${t('slots')}: ${x.taken}/${x.slots}</span>
        </div>
        <div class="slots"><i style="width:${pct}%"></i></div>
        <button class="btn btn-small" data-open-form data-tid="${x.id}">${t('join')}</button>
      </article>`;
  }).join('') : `<p class="empty">${t('empty')}</p>`;
}

function renderSchedule() {
  $('#scheduleList').innerHTML = MATCHES.map(m => {
    const g = GAMES.find(g => g.id === m.game);
    return `
      <div class="match-row reveal">
        <time>${fmtDate(m.date)}<br>${m.time}</time>
        <div><div class="vs">${m.a}<em>VS</em>${m.b}</div><div class="gm">${g.icon} ${g.name}</div></div>
        ${m.live ? `<span class="live">${t('live')}</span>` : ''}
      </div>`;
  }).join('');
}

function renderNews() {
  $('#newsList').innerHTML = NEWS.map(n => `
    <article class="post reveal">
      <time>${fmtDate(n.date)}</time>
      <h3>${n.title}</h3>
      <p>${n.text}</p>
    </article>`).join('');
}

/* ---------- 6. ТУРНИРНАЯ СЕТКА (клик = выбрать победителя) ---------- */
function bracketPairs() {
  const b = state.bracket;
  return {
    r1: [0, 1, 2, 3].map(i => [TEAMS[i * 2], TEAMS[i * 2 + 1]]),
    r2: [0, 1].map(j => [b.r1[j * 2], b.r1[j * 2 + 1]]),
    r3: [[b.r2[0], b.r2[1]]],
  };
}

function renderBracket() {
  const pairs = bracketPairs();
  const titles = { r1: t('round1'), r2: t('round2'), r3: t('round3') };
  $('#bracketBox').innerHTML = ['r1', 'r2', 'r3'].map(r => `
    <div class="round">
      <div class="round-title">${titles[r]}</div>
      ${pairs[r].map((pair, i) => `
        <div class="match">
          ${pair.map(team => `
            <button class="slot ${team && state.bracket[r][i] === team ? 'win' : ''}"
                    data-round="${r}" data-i="${i}" data-team="${team || ''}" ${team ? '' : 'disabled'}>
              <span>${team || '—'}</span>
            </button>`).join('')}
        </div>`).join('')}
    </div>`).join('') + '';
  const champ = state.bracket.r3[0];
  $('#bracketBox').insertAdjacentHTML('afterend', '');
  let el = $('#champion');
  if (!el) { el = document.createElement('div'); el.id = 'champion'; el.className = 'champion'; $('.bracket-wrap').after(el); }
  el.textContent = champ ? `🏆 ${t('champion')}: ${champ}` : '';
}

function pickWinner(round, i, team) {
  const b = state.bracket;
  b[round][i] = team;
  // если победитель изменился — убираем его из следующих раундов
  b.r2 = b.r2.map((w, j) => (w && ![b.r1[j * 2], b.r1[j * 2 + 1]].includes(w)) ? null : w);
  if (b.r3[0] && ![b.r2[0], b.r2[1]].includes(b.r3[0])) b.r3[0] = null;
  renderBracket();
}

/* ---------- 7. ФОРМА РЕГИСТРАЦИИ ---------- */
function openForm(tid) {
  $('#fTournament').innerHTML = TOURNAMENTS.map(x =>
    `<option value="${x.id}" ${String(x.id) === String(tid) ? 'selected' : ''}>${x.name} — ${GAMES.find(g => g.id === x.game).name}</option>`).join('');
  $('#formError').textContent = '';
  $('#modal').hidden = false;
  setTimeout(() => $('#regForm [name=nick]').focus(), 50);
}
const closeForm = () => { $('#modal').hidden = true; };

function showToast(text) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3200);
}

$('#regForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const data = Object.fromEntries(new FormData(f));
  const bad = data.nick.trim().length < 2 || data.contact.trim().length < 5;
  f.nick.classList.toggle('invalid', data.nick.trim().length < 2);
  f.contact.classList.toggle('invalid', data.contact.trim().length < 5);
  if (bad) { $('#formError').textContent = t('err_fill'); return; }

  /* TODO для бэкенда: вместо localStorage отправить на сервер:
     fetch('/api/registrations', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
     }) */
  const saved = JSON.parse(localStorage.getItem('th_registrations') || '[]');
  saved.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem('th_registrations', JSON.stringify(saved));

  f.reset();
  closeForm();
  showToast(t('ok'));
});

/* ---------- 8. БЕГУЩАЯ СТРОКА ---------- */
function renderTicker() {
  const items = MATCHES.map(m => {
    const g = GAMES.find(g => g.id === m.game);
    return `<span>${m.live ? '● LIVE ' : ''}${g.name}: ${m.a} vs ${m.b} — ${m.time}</span>`;
  }).join('');
  $('#ticker').innerHTML = items + items; // дважды, чтобы лента была бесконечной
}

/* ---------- 9. АНИМАЦИИ: появление и счётчики ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); revealObserver.unobserve(en.target); } });
}, { threshold: .12 });

function observeReveals() { $$('.reveal:not(.visible)').forEach(el => revealObserver.observe(el)); }

function runCounters() {
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, suffix = el.dataset.suffix || '', start = performance.now(), dur = 1600;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('ru-RU') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  });
}

/* ---------- 10. ОБЩАЯ ОТРИСОВКА И СОБЫТИЯ ---------- */
function renderAll() {
  renderGames(); renderChips(); renderTournaments(); renderBracket();
  renderSchedule(); renderNews(); renderTicker();
  observeReveals();
}

document.addEventListener('click', e => {
  const open = e.target.closest('[data-open-form]');
  if (open) return openForm(open.dataset.tid);

  const lang = e.target.closest('[data-lang]');
  if (lang) { state.lang = lang.dataset.lang; return applyLang(); }

  const gameCard = e.target.closest('[data-game]');
  if (gameCard) {
    state.game = gameCard.dataset.game;
    renderChips(); renderTournaments(); observeReveals();
    return $('#tournaments').scrollIntoView();
  }
  const cg = e.target.closest('[data-chip-game]');
  if (cg) { state.game = cg.dataset.chipGame; renderChips(); renderTournaments(); observeReveals(); return; }
  const cf = e.target.closest('[data-chip-format]');
  if (cf) { state.format = cf.dataset.chipFormat; renderChips(); renderTournaments(); observeReveals(); return; }

  const slot = e.target.closest('.slot');
  if (slot && slot.dataset.team) return pickWinner(slot.dataset.round, +slot.dataset.i, slot.dataset.team);

  if (e.target.closest('#nav a')) $('#nav').classList.remove('open');
  if (e.target === $('#modal')) closeForm();
});

$('#modalClose').addEventListener('click', closeForm);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeForm(); });
$('#burger').addEventListener('click', () => $('#nav').classList.toggle('open'));
$('#themeBtn').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); });
$('#bracketReset').addEventListener('click', () => {
  state.bracket = { r1: [null, null, null, null], r2: [null, null], r3: [null] };
  renderBracket();
});

/* ---------- СТАРТ ---------- */
applyTheme();
applyLang();
runCounters();

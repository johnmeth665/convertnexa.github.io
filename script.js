/* ============================================================
   BtoC Converter — main.js
   Billion ↔ Crore ↔ Million ↔ Lakh converter logic,
   bulk converter, history, voice input, theme, scroll FX
   ============================================================ */

// ===== UNIT VALUES (in ones) =====
const UNITS = {
  thousand: 1e3,
  lakh:     1e5,
  million:  1e6,
  crore:    1e7,
  billion:  1e9,
  trillion: 1e12
};

const UNIT_LABELS = {
  thousand: 'Thousand',
  lakh:     'Lakh',
  million:  'Million',
  crore:    'Crore',
  billion:  'Billion',
  trillion: 'Trillion'
};

// ===== STATE =====
let history     = [];
let currentMode = 'simple';
let lastResult  = null;

// ===== FORMAT NUMBER =====
function formatNumber(n) {
  if (Math.abs(n) >= 1e12) return (n / 1e12).toFixed(4) + 'T';
  if (Math.abs(n) >= 1e9)  return (n / 1e9).toFixed(4);
  if (n === Math.floor(n)) return n.toLocaleString('en-IN');
  return parseFloat(n.toFixed(6)).toString();
}

// ===== CALCULATE =====
function calculate() {
  const val       = parseFloat(document.getElementById('inputVal').value);
  const from      = document.getElementById('fromUnit').value;
  const to        = document.getElementById('toUnit').value;
  const resultEl  = document.getElementById('resultVal');
  const labelEl   = document.getElementById('resultLabel');
  const fmtEl     = document.getElementById('resultFormatted');

  if (isNaN(val)) {
    resultEl.textContent = '—';
    labelEl.textContent  = 'Enter a value above to convert';
    fmtEl.textContent    = '';
    return;
  }

  const raw    = val * UNITS[from];
  const result = raw / UNITS[to];
  lastResult   = { val, from, to, result };

  // Animate result swap
  resultEl.style.transform = 'scale(0.85)';
  resultEl.style.opacity   = '0.5';
  setTimeout(() => {
    resultEl.textContent     = formatNumber(result);
    resultEl.style.transform = 'scale(1)';
    resultEl.style.opacity   = '1';
  }, 120);

  labelEl.textContent = `${formatNumber(val)} ${UNIT_LABELS[from]} = ${formatNumber(result)} ${UNIT_LABELS[to]}`;
  fmtEl.textContent   = `Raw: ${raw.toLocaleString('en-IN')}`;

  addHistory(val, from, result, to);

  if (currentMode === 'advanced') showAllConversions(raw);
}

// ===== ALL CONVERSIONS (advanced mode) =====
function showAllConversions(raw) {
  const list = document.getElementById('allConvList');
  list.innerHTML = Object.entries(UNITS).map(([key, val]) => {
    const res = raw / val;
    return `<div style="display:flex;justify-content:space-between;padding:8px 12px;
      background:var(--bg);border-radius:8px;border:1px solid var(--border);font-size:0.85rem">
      <span style="color:var(--text2)">${UNIT_LABELS[key]}</span>
      <span style="font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--accent)">
        ${parseFloat(res.toFixed(6)).toLocaleString()}
      </span>
    </div>`;
  }).join('');
}

// ===== SET MODE =====
function setMode(mode) {
  currentMode = mode;
  document.getElementById('modeSimple').classList.toggle('active', mode === 'simple');
  document.getElementById('modeAdvanced').classList.toggle('active', mode === 'advanced');
  const allConv = document.getElementById('allConversions');
  allConv.style.display = mode === 'advanced' ? 'block' : 'none';
  if (mode === 'advanced') {
    const val  = parseFloat(document.getElementById('inputVal').value);
    const from = document.getElementById('fromUnit').value;
    if (!isNaN(val)) showAllConversions(val * UNITS[from]);
  }
}

// ===== SWAP UNITS =====
function swapUnits() {
  const from = document.getElementById('fromUnit');
  const to   = document.getElementById('toUnit');
  const tmp  = from.value;
  from.value = to.value;
  to.value   = tmp;
  calculate();
}

// ===== PRESETS =====
function setPreset(val) {
  document.getElementById('inputVal').value    = val;
  document.getElementById('fromUnit').value    = 'billion';
  document.getElementById('toUnit').value      = 'crore';
  calculate();
}

// ===== COPY RESULT =====
function copyResult() {
  if (!lastResult) { showToast('⚠️ Nothing to copy yet'); return; }
  const text = `${lastResult.val} ${UNIT_LABELS[lastResult.from]} = ${formatNumber(lastResult.result)} ${UNIT_LABELS[lastResult.to]}`;
  navigator.clipboard.writeText(text).then(() => showToast('✅ Copied to clipboard!'));
}

// ===== SHARE RESULT =====
function shareResult() {
  if (!lastResult) { showToast('⚠️ Convert something first'); return; }
  const text = `${lastResult.val} ${UNIT_LABELS[lastResult.from]} = ${formatNumber(lastResult.result)} ${UNIT_LABELS[lastResult.to]} | via BtoC Converter`;
  if (navigator.share) {
    navigator.share({ title: 'Conversion Result', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => showToast('🔗 Link copied!'));
  }
}

// ===== RESET =====
function resetConverter() {
  document.getElementById('inputVal').value   = '';
  document.getElementById('fromUnit').value   = 'billion';
  document.getElementById('toUnit').value     = 'crore';
  document.getElementById('resultVal').textContent    = '—';
  document.getElementById('resultLabel').textContent  = 'Enter a value above to convert';
  document.getElementById('resultFormatted').textContent = '';
  lastResult = null;
  showToast('↺ Converter reset');
}

// ===== VOICE INPUT =====
function startVoice() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('🎤 Voice not supported in this browser'); return;
  }
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new Rec();
  const btn = document.getElementById('voiceBtn');

  rec.lang = 'en-IN';
  rec.interimResults = false;
  btn.textContent = '🔴 Listening...';
  btn.classList.add('recording');

  rec.onresult = (e) => {
    const raw = e.results[0][0].transcript;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(num)) {
      document.getElementById('inputVal').value = num;
      calculate();
      showToast(`🎤 Heard: ${raw}`);
    } else {
      showToast('🎤 Could not detect number');
    }
    btn.textContent = '🎤 Voice';
    btn.classList.remove('recording');
  };
  rec.onerror = () => {
    btn.textContent = '🎤 Voice';
    btn.classList.remove('recording');
    showToast('🎤 Voice error');
  };
  rec.onend = () => {
    btn.textContent = '🎤 Voice';
    btn.classList.remove('recording');
  };
  rec.start();
}

// ===== HISTORY =====
function addHistory(from, fromUnit, to, toUnit) {
  if (isNaN(from)) return;
  history.unshift({ from, fromUnit, to, toUnit, time: new Date() });
  if (history.length > 20) history.pop();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (history.length === 0) {
    list.innerHTML = `<div class="empty-hist">
      <div class="empty-hist-icon">📜</div>
      <div>No conversions yet</div>
      <div style="font-size:0.8rem;margin-top:4px;color:var(--text3)">Use the converter above to see history</div>
    </div>`;
    return;
  }
  list.innerHTML = history.slice(0, 12).map((h, i) => `
    <div class="history-item" style="animation-delay:${i * 0.04}s">
      <div>
        <span class="hist-from">${h.from} ${UNIT_LABELS[h.fromUnit]}</span>
        <span class="hist-arrow"> → </span>
        <span class="hist-to">${formatNumber(h.to)} ${UNIT_LABELS[h.toUnit]}</span>
      </div>
      <span class="hist-time">${h.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  `).join('');
}

function clearHistory() {
  history = [];
  renderHistory();
  showToast('🗑️ History cleared');
}

// ===== BULK CONVERTER =====
function bulkConvert() {
  const lines  = document.getElementById('bulkInput').value.split('\n').filter(l => l.trim());
  const from   = document.getElementById('bulkFrom').value;
  const to     = document.getElementById('bulkTo').value;
  const results = lines.map(line => {
    const n = parseFloat(line.trim());
    if (isNaN(n)) return `${line.trim()} → invalid`;
    const res = (n * UNITS[from]) / UNITS[to];
    return `${n} ${UNIT_LABELS[from]} = ${formatNumber(res)} ${UNIT_LABELS[to]}`;
  });
  document.getElementById('bulkResults').textContent = results.join('\n') || 'Enter numbers above...';
}

function copyBulk() {
  const text = document.getElementById('bulkResults').textContent;
  if (!text || text === 'Results will appear here...') { showToast('⚠️ Nothing to copy'); return; }
  navigator.clipboard.writeText(text).then(() => showToast('✅ Bulk results copied!'));
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ===== FAQ ACCORDION =====
function toggleFaq(el) {
  const item    = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('themeToggle');
let dark = false;

themeBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  themeBtn.textContent = dark ? '☀️' : '🌙';
});

// Auto dark mode on load
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  dark = true;
  document.documentElement.setAttribute('data-theme', 'dark');
  themeBtn.textContent = '☀️';
}

// ===== SCROLL: NAV + PROGRESS BAR + ACTIVE LINKS =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 40);

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = (window.scrollY / scrollable) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = a.getAttribute('href');
    const sec    = document.querySelector(target);
    if (sec) {
      const rect = sec.getBoundingClientRect();
      a.classList.toggle('active', rect.top <= 100 && rect.bottom >= 100);
    }
  });
});

// ===== HAMBURGER / MOBILE MENU =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
});
document.getElementById('mobileClose').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.remove('open');
});
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SCALE BARS ANIMATION =====
const scaleBars = [
  { id: 'sb1', h: 12  },
  { id: 'sb2', h: 30  },
  { id: 'sb3', h: 50  },
  { id: 'sb4', h: 70  },
  { id: 'sb5', h: 95  },
  { id: 'sb6', h: 115 }
];

const scaleObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    scaleBars.forEach((bar, i) => {
      setTimeout(() => {
        const el = document.getElementById(bar.id);
        if (el) el.style.height = bar.h + 'px';
      }, i * 150);
    });
  }
}, { threshold: 0.3 });

const scaleEl = document.getElementById('scaleVisual');
if (scaleEl) scaleObs.observe(scaleEl);

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  setPreset(1);
  renderHistory();
});

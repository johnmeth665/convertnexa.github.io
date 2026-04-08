// ===== CONFIG & SDK =====
const defaultConfig = {
  hero_title: 'Billion to Crore\nConverter',
  hero_subtitle: 'Convert large numbers between international and Indian numbering systems — instantly, accurately, beautifully.',
  about_title: 'About Me',
  about_desc: 'Hi, I\'m John Meth — a dedicated financial analyst...',
};

// SDK INIT
window.elementSdk.init({
  defaultConfig,
  onConfigChange: async (config) => {
    document.getElementById('heroTitle').innerHTML = config.hero_title.replace(/\n/,'<br>');
  }
});

// ===== CONVERSION ENGINE =====
const FACTORS = { billion:1e9, million:1e6, crore:1e7, lakh:1e5 };

function convert(val, from, to) {
  return val * FACTORS[from] / FACTORS[to];
}

function formatNum(n) {
  if(n===0) return '0';
  if(Math.abs(n)>=1e6) return n.toLocaleString('en-US',{maximumFractionDigits:2});
  return n.toLocaleString('en-US',{maximumFractionDigits:6});
}

// DOM
const inputEl = document.getElementById('inputVal');
const fromEl = document.getElementById('fromUnit');
const toEl = document.getElementById('toUnit');
const resultText = document.getElementById('resultText');

function doConvert() {
  const val = Number(inputEl.value);
  if(isNaN(val)) return;

  const result = convert(val, fromEl.value, toEl.value);
  resultText.textContent = formatNum(result);
}

// Events
inputEl.addEventListener('input', doConvert);
fromEl.addEventListener('change', doConvert);
toEl.addEventListener('change', doConvert);

// Dark Mode
document.getElementById('darkToggle').addEventListener('click', ()=>{
  document.documentElement.classList.toggle('dark-mode');
});

// Init Icons
lucide.createIcons();

<!doctype html>
<html lang="en" class="h-full" style="scroll-behavior:smooth">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Billion to Crore Converter</title>
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <script src="https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js"></script>
  <script src="/_sdk/element_sdk.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&amp;family=DM+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <script>
tailwind.config={theme:{extend:{fontFamily:{heading:['Space Mono','monospace'],body:['DM Sans','sans-serif']},colors:{brand:{50:'#fef3f2',100:'#fde8e6',200:'#fbd5d0',400:'#f97066',500:'#f04438',600:'#d92d20',700:'#b42318',900:'#55160c'},surface:'#fffbfa',dark:'#3e1c17'}}}}
</script>
  <style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow-x:hidden}
body{font-family:'DM Sans',sans-serif;background:#fffbfa;color:#3e1c17}

/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse-ring{0%{transform:scale(.8);opacity:1}100%{transform:scale(1.4);opacity:0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes gridFlow{0%{background-position:0 0}100%{background-position:40px 40px}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes flowShift{0%{transform:translateX(-100%)}50%{transform:translateX(100%)}100%{transform:translateX(-100%)}}
@keyframes numberFloat{0%{opacity:.3;transform:translateY(0) translateX(-20px)}25%{opacity:.6}50%{opacity:.4;transform:translateY(-30px) translateX(20px)}75%{opacity:.5}100%{opacity:.2;transform:translateY(-60px) translateX(-40px)}}

.fade-up{animation:fadeUp .6s ease both}
.slide-in{animation:slideIn .5s ease both}
.float-anim{animation:float 3s ease-in-out infinite}
.count-anim{animation:countUp .3s ease both}

.floating-number{
  position:absolute;
  font-size:48px;
  font-weight:bold;
  opacity:.15;
  pointer-events:none;
  font-family:'Space Mono',monospace;
  color:#f04438;
  animation:numberFloat 6s linear infinite;
}

/* Glassmorphism */
.glass{background:rgba(255,255,255,.72);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.3)}
.glass-dark{background:rgba(15,23,42,.8);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1)}

/* Number grid bg */
.num-grid{
  background-image:linear-gradient(rgba(240,68,56,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(240,68,56,.05) 1px,transparent 1px);
  background-size:40px 40px;
  animation:gridFlow 4s linear infinite;
  position:relative;
  overflow:hidden
}
.num-grid::before{
  content:'';
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:linear-gradient(90deg,transparent,rgba(240,68,56,.02),transparent);
  animation:flowShift 8s ease-in-out infinite;
  pointer-events:none;
  z-index:0;
}
.num-grid > *{position:relative;z-index:1}

/* Custom scrollbar */
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}

/* Dark mode */
.dark-mode body,.dark-mode{background:#3e1c17!important;color:#fef3f2}
.dark-mode .glass{background:rgba(62,28,23,.8);border-color:rgba(255,255,255,.08)}
.dark-mode .section-card{background:rgba(62,28,23,.6)!important;border-color:rgba(255,255,255,.06)!important}
.dark-mode .nav-bar{background:rgba(62,28,23,.9)!important;border-color:rgba(255,255,255,.06)!important}
.dark-mode .text-brand-900{color:#fef3f2!important}
.dark-mode .text-gray-600,.dark-mode .text-gray-500,.dark-mode .text-gray-700{color:#d4a5a0!important}
.dark-mode .bg-white{background:rgba(62,28,23,.6)!important}
.dark-mode .bg-surface,.dark-mode .bg-gray-50{background:#3e1c17!important}
.dark-mode input,.dark-mode select,.dark-mode textarea{background:rgba(62,28,23,.8)!important;color:#fef3f2!important;border-color:rgba(255,255,255,.1)!important}
.dark-mode .comparison-cell{background:rgba(62,28,23,.5)!important}

.result-flash{animation:shimmer 1s ease}
.nav-bar{transition:all .3s ease}
.nav-link{position:relative}
.nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:linear-gradient(90deg,#f04438,#f97066);transition:width .3s ease}
.nav-link.active::after,.nav-link:hover::after{width:100%}

.section-card{background:white;border:1px solid rgba(0,0,0,.06);border-radius:16px;transition:transform .3s ease,box-shadow .3s ease}
.section-card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.08)}

.preset-btn{transition:all .2s ease}
.preset-btn:hover{transform:scale(1.05)}
.preset-btn:active{transform:scale(.95)}

.faq-answer{max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease}
.faq-answer.open{max-height:500px;padding-top:12px}
.faq-chevron{transition:transform .3s ease}
.faq-chevron.open{transform:rotate(180deg)}

.step-line{position:relative}
.step-line::before{content:'';position:absolute;left:20px;top:48px;bottom:0;width:2px;background:linear-gradient(to bottom,#f04438,#fde8e6)}

/* Animated counter */
.counter-digit{display:inline-block;transition:all .3s ease}

.history-item{animation:slideIn .3s ease both}

.copy-toast{position:fixed;top:20px;right:20px;z-index:9999;transform:translateY(-100px);opacity:0;transition:all .4s ease}
.copy-toast.show{transform:translateY(0);opacity:1}

.comparison-cell{transition:all .3s ease}
.comparison-cell:hover{transform:scale(1.02);box-shadow:0 4px 20px rgba(59,130,246,.15)}
</style>
  <script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"Billion to Crore Converter","description":"Convert billions to crores, millions to lakhs instantly with real-time calculations","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
  <script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many crores is 1 billion?","acceptedAnswer":{"@type":"Answer","text":"1 billion equals 100 crores. The conversion formula is: Crores = Billions × 100."}},{"@type":"Question","name":"What is the difference between billion and crore?","acceptedAnswer":{"@type":"Answer","text":"Billion is part of the international numbering system (1 billion = 1,000,000,000), while crore is part of the Indian numbering system (1 crore = 10,000,000). 1 billion = 100 crores."}},{"@type":"Question","name":"How to convert crore to billion?","acceptedAnswer":{"@type":"Answer","text":"To convert crores to billions, divide the number of crores by 100. For example, 500 crores = 5 billion."}}]}
</script>
  <style>body { box-sizing: border-box; }</style>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
 </head>
 <body class="h-full">
  <div id="app" class="w-full h-full overflow-auto num-grid">
   <!-- Floating background numbers -->
   <div id="floatingNumbers" class="absolute inset-0 pointer-events-none"></div><!-- Toast -->
   <div id="copyToast" class="copy-toast glass px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
    <i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i> <span class="text-sm font-medium">Copied to clipboard!</span>
   </div><!-- Navigation -->
   <nav class="nav-bar glass sticky top-0 z-50 border-b border-white/20">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
     <a href="#hero" class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
       <span class="text-white font-heading text-[10px] font-bold">CN</span>
      </div><span class="font-heading font-bold text-sm text-brand-900">ConvertNexa</span> </a>
     <div class="hidden md:flex items-center gap-6">
      <a href="#hero" class="nav-link text-sm font-medium text-gray-600 hover:text-brand-600">Converter</a> <a href="#how" class="nav-link text-sm font-medium text-gray-600 hover:text-brand-600">How It Works</a> <a href="#guide" class="nav-link text-sm font-medium text-gray-600 hover:text-brand-600">Guide</a> <a href="#compare" class="nav-link text-sm font-medium text-gray-600 hover:text-brand-600">Compare</a> <a href="#faq" class="nav-link text-sm font-medium text-gray-600 hover:text-brand-600">FAQ</a>
     </div>
     <div class="flex items-center gap-3">
      <button id="darkToggle" class="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-colors" aria-label="Toggle dark mode"> <i data-lucide="moon" class="w-4 h-4 text-brand-600" id="darkIcon"></i> </button> <button id="mobileMenu" class="md:hidden w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center" aria-label="Menu"> <i data-lucide="menu" class="w-4 h-4 text-brand-600"></i> </button>
     </div>
    </div>
   </nav><!-- Hero / Converter -->
   <section id="hero" class="py-12 md:py-20 px-4">
    <div class="max-w-4xl mx-auto text-center mb-10">
     <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-4">
      <i data-lucide="zap" class="w-3 h-3"></i> Instant &amp; Accurate
     </div>
     <h1 id="heroTitle" class="font-heading text-3xl md:text-5xl font-bold text-brand-900 mb-4 leading-tight">Billion to Crore<br>
       Converter</h1>
     <p id="heroSubtitle" class="text-gray-500 text-base md:text-lg max-w-xl mx-auto">Convert large numbers between international and Indian numbering systems — instantly, accurately, beautifully.</p>
    </div><!-- Main Converter Card -->
    <div class="max-w-2xl mx-auto section-card p-6 md:p-8">
     <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
       <i data-lucide="calculator" class="w-5 h-5 text-white"></i>
      </div>
      <div>
       <h2 class="font-heading font-bold text-brand-900 text-sm">Smart Converter</h2>
       <p class="text-xs text-gray-400">Real-time conversion</p>
      </div>
     </div><!-- Input Row -->
     <div class="flex flex-col md:flex-row gap-3 mb-4">
      <div class="flex-1">
       <label for="inputVal" class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Enter Value</label> <input id="inputVal" type="text" inputmode="decimal" placeholder="e.g. 1.5" class="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg font-heading font-bold text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all" autocomplete="off">
      </div>
      <div class="w-full md:w-40">
       <label for="fromUnit" class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">From</label> <select id="fromUnit" class="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white appearance-none cursor-pointer"> <option value="billion">Billion</option> <option value="million">Million</option> <option value="crore">Crore</option> <option value="lakh">Lakh</option> </select>
      </div>
     </div><!-- Swap Button -->
     <div class="flex justify-center my-3">
      <button id="swapBtn" class="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-all hover:rotate-180 duration-300" aria-label="Swap units"> <i data-lucide="arrow-up-down" class="w-4 h-4 text-brand-600"></i> </button>
     </div><!-- Output Row -->
     <div class="flex flex-col md:flex-row gap-3 mb-5">
      <div class="flex-1">
       <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Result</label>
       <div id="resultDisplay" class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100 text-lg font-heading font-bold text-brand-700 min-h-[50px] flex items-center">
        <span id="resultText">—</span>
       </div>
      </div>
      <div class="w-full md:w-40">
       <label for="toUnit" class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">To</label> <select id="toUnit" class="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white appearance-none cursor-pointer"> <option value="crore" selected>Crore</option> <option value="lakh">Lakh</option> <option value="billion">Billion</option> <option value="million">Million</option> </select>
      </div>
     </div><!-- Formula display -->
     <div id="formulaBar" class="px-4 py-2 rounded-lg bg-gray-50 text-xs font-mono text-gray-500 mb-5 hidden">
      <span id="formulaText"></span>
     </div><!-- Action Buttons -->
     <div class="flex flex-wrap gap-2 mb-5">
      <button onclick="copyResult()" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"> <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy </button> <button onclick="resetConverter()" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"> <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset </button> <button id="voiceBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"> <i data-lucide="mic" class="w-3.5 h-3.5"></i> Voice </button>
     </div><!-- Presets -->
     <div class="flex flex-wrap gap-2">
      <span class="text-xs text-gray-400 mr-1 self-center">Quick:</span> <button class="preset-btn px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-bold hover:bg-brand-100" onclick="setPreset(1)">1B</button> <button class="preset-btn px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-bold hover:bg-brand-100" onclick="setPreset(10)">10B</button> <button class="preset-btn px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-bold hover:bg-brand-100" onclick="setPreset(100)">100B</button> <button class="preset-btn px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-bold hover:bg-brand-100" onclick="setPreset(0.5)">0.5B</button> <button class="preset-btn px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-bold hover:bg-brand-100" onclick="setPreset(7.5)">7.5B</button>
     </div>
    </div>
   </section><!-- Calculation History -->
   <section class="py-8 px-4">
    <div class="max-w-2xl mx-auto">
     <div id="historyPanel" class="hidden">
      <div class="flex items-center justify-between mb-4">
       <h3 class="font-heading font-bold text-brand-900 text-sm flex items-center gap-2"><i data-lucide="clock" class="w-4 h-4 text-brand-500"></i> Recent Conversions</h3><button onclick="clearHistory()" class="text-xs text-gray-400 hover:text-red-500 transition-colors">Clear all</button>
      </div>
      <div id="historyList" class="space-y-2"></div>
     </div>
    </div>
   </section><!-- Bulk Converter -->
   <section class="py-10 px-4">
    <div class="max-w-2xl mx-auto section-card p-6">
     <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
       <i data-lucide="layers" class="w-5 h-5 text-white"></i>
      </div>
      <div>
       <h2 class="font-heading font-bold text-brand-900 text-sm">Bulk Converter</h2>
       <p class="text-xs text-gray-400">Convert multiple values at once</p>
      </div>
     </div><label for="bulkInput" class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Enter values (one per line)</label> <textarea id="bulkInput" rows="4" placeholder="1
5.5
10
100" class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-400 mb-3 resize-none"></textarea>
     <div class="flex gap-2 mb-4">
      <select id="bulkFrom" class="px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold bg-white"> <option value="billion">Billion</option><option value="million">Million</option><option value="crore">Crore</option><option value="lakh">Lakh</option> </select> <span class="self-center text-gray-400">→</span> <select id="bulkTo" class="px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold bg-white"> <option value="crore" selected>Crore</option><option value="lakh">Lakh</option><option value="billion">Billion</option><option value="million">Million</option> </select> <button onclick="bulkConvert()" class="ml-auto px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors">Convert All</button>
     </div>
     <div id="bulkResults" class="hidden space-y-1.5"></div>
    </div>
   </section><!-- Introduction -->
   <section class="py-12 px-4">
    <div class="max-w-4xl mx-auto">
     <div class="section-card p-8">
      <div class="flex items-center gap-3 mb-6">
       <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
        <i data-lucide="book-open" class="w-5 h-5 text-white"></i>
       </div>
       <h2 class="font-heading font-bold text-brand-900 text-lg">Understanding Large Numbers</h2>
      </div>
      <div class="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-4">
       <p>Working with large numbers is a daily reality for finance professionals, economists, data analysts, and anyone tracking global markets. The challenge lies in the fact that different regions of the world use fundamentally different numbering systems to represent these values.</p>
       <p>The <strong>international numbering system</strong> groups digits in sets of three — thousands, millions, billions, trillions. A billion represents 1,000,000,000 (10<sup>9</sup>). This system is standard across North America, Europe, and most of the world.</p>
       <p>The <strong>Indian numbering system</strong>, on the other hand, groups the first three digits and then subsequent pairs — thousands, lakhs (1,00,000), crores (1,00,00,000). This system is deeply embedded in financial reporting, media, and everyday conversation across South Asia.</p>
       <p>This is where <strong><a href="https://thesmartkeyrealty.com/billion-to-crore-conversion/" target="_blank" rel="noopener noreferrer" class="text-brand-600 hover:text-brand-700 underline">billion to crore conversion</a></strong> becomes essential. Whether you're reading an international financial report stating a company is valued at 2.5 billion dollars, or an Indian market report expressing the same value as 250 crores, understanding the relationship between these systems is crucial for accurate interpretation.</p>
       <p>The core relationship is straightforward: <strong>1 Billion = 100 Crores</strong>. This means 1 billion contains ten thousand lakhs, or equivalently, one hundred crore. Our converter tool handles all the complexity instantly, supporting conversions between billions, millions, crores, and lakhs in any direction.</p>
      </div><!-- Visual: Number System Comparison -->
      <div class="mt-8 p-5 rounded-xl bg-gradient-to-br from-brand-50 to-blue-50 border border-brand-100">
       <h3 class="font-heading text-xs font-bold text-brand-700 mb-4 uppercase tracking-wider">Number Scale Visualization</h3>
       <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="text-center p-3 rounded-lg bg-white/60">
         <div class="font-heading text-2xl font-bold text-brand-600 counter" data-target="1000">
          0
         </div>
         <div class="text-[10px] text-gray-500 mt-1">
          1 Thousand
         </div>
         <div class="text-[9px] font-mono text-gray-400">
          1,000
         </div>
        </div>
        <div class="text-center p-3 rounded-lg bg-white/60">
         <div class="font-heading text-2xl font-bold text-brand-600 counter" data-target="100000">
          0
         </div>
         <div class="text-[10px] text-gray-500 mt-1">
          1 Lakh
         </div>
         <div class="text-[9px] font-mono text-gray-400">
          1,00,000
         </div>
        </div>
        <div class="text-center p-3 rounded-lg bg-white/60">
         <div class="font-heading text-2xl font-bold text-brand-600 counter" data-target="10000000">
          0
         </div>
         <div class="text-[10px] text-gray-500 mt-1">
          1 Crore
         </div>
         <div class="text-[9px] font-mono text-gray-400">
          1,00,00,000
         </div>
        </div>
        <div class="text-center p-3 rounded-lg bg-white/60">
         <div class="font-heading text-2xl font-bold text-brand-600 counter" data-target="1000000000">
          0
         </div>
         <div class="text-[10px] text-gray-500 mt-1">
          1 Billion
         </div>
         <div class="text-[9px] font-mono text-gray-400">
          1,000,000,000
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section><!-- How It Works -->
   <section id="how" class="py-12 px-4">
    <div class="max-w-4xl mx-auto">
     <div class="text-center mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-3">
       <i data-lucide="lightbulb" class="w-3 h-3"></i> Simple Process
      </div>
      <h2 class="font-heading font-bold text-brand-900 text-2xl md:text-3xl">How Conversion Works</h2>
     </div>
     <div class="space-y-0">
      <!-- Step 1 -->
      <div class="step-line relative pl-14 pb-10 observe-fade">
       <div class="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-heading font-bold text-sm z-10">
        1
       </div>
       <div class="section-card p-5">
        <h3 class="font-heading font-bold text-brand-900 text-sm mb-2">Identify Your Value</h3>
        <p class="text-gray-500 text-sm">Start with the number you want to convert. For example: <span class="font-mono font-bold text-brand-600">2.5 Billion</span></p>
       </div>
      </div><!-- Step 2 -->
      <div class="step-line relative pl-14 pb-10 observe-fade">
       <div class="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-heading font-bold text-sm z-10">
        2
       </div>
       <div class="section-card p-5">
        <h3 class="font-heading font-bold text-brand-900 text-sm mb-2">Apply the Formula</h3>
        <p class="text-gray-500 text-sm mb-3">Use the conversion multiplier based on your source and target units.</p>
        <div class="p-4 rounded-lg bg-brand-50 border border-brand-100">
         <div class="font-mono text-sm text-brand-700 space-y-1">
          <div><span class="text-gray-400">Billion → Crore:</span> <strong>× 100</strong>
          </div>
          <div><span class="text-gray-400">Billion → Lakh:</span> <strong>× 10,000</strong>
          </div>
          <div><span class="text-gray-400">Million → Lakh:</span> <strong>× 10</strong>
          </div>
          <div><span class="text-gray-400">Million → Crore:</span> <strong>× 0.1</strong>
          </div>
         </div>
        </div>
       </div>
      </div><!-- Step 3 -->
      <div class="relative pl-14 pb-4 observe-fade">
       <div class="absolute left-0 top-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-heading font-bold text-sm z-10">
        ✓
       </div>
       <div class="section-card p-5 border-green-100">
        <h3 class="font-heading font-bold text-brand-900 text-sm mb-2">Get Your Result</h3>
        <p class="text-gray-500 text-sm">Example: <span class="font-mono">2.5 × 100 = </span><span class="font-mono font-bold text-green-600">250 Crore</span></p>
       </div>
      </div>
     </div>
    </div>
   </section><!-- Guide: Global vs Indian -->
   <section id="guide" class="py-12 px-4">
    <div class="max-w-4xl mx-auto section-card p-8">
     <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
       <i data-lucide="globe" class="w-5 h-5 text-white"></i>
      </div>
      <h2 class="font-heading font-bold text-brand-900 text-lg">Global vs Indian Number Systems</h2>
     </div>
     <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="p-5 rounded-xl bg-brand-50 border border-brand-100">
       <h3 class="font-heading text-xs font-bold text-brand-700 mb-3 uppercase tracking-wider">International System</h3>
       <div class="space-y-2 text-sm text-gray-600">
        <div class="flex justify-between"><span>Thousand</span><span class="font-mono font-bold">1,000</span>
        </div>
        <div class="flex justify-between"><span>Million</span><span class="font-mono font-bold">1,000,000</span>
        </div>
        <div class="flex justify-between"><span>Billion</span><span class="font-mono font-bold">1,000,000,000</span>
        </div>
        <div class="flex justify-between"><span>Trillion</span><span class="font-mono font-bold">1,000,000,000,000</span>
        </div>
       </div>
       <p class="text-[10px] text-gray-400 mt-3">Groups of 3 digits: thousand → million → billion</p>
      </div>
      <div class="p-5 rounded-xl bg-orange-50 border border-orange-100">
       <h3 class="font-heading text-xs font-bold text-orange-700 mb-3 uppercase tracking-wider">Indian System</h3>
       <div class="space-y-2 text-sm text-gray-600">
        <div class="flex justify-between"><span>Hazaar (Thousand)</span><span class="font-mono font-bold">1,000</span>
        </div>
        <div class="flex justify-between"><span>Lakh</span><span class="font-mono font-bold">1,00,000</span>
        </div>
        <div class="flex justify-between"><span>Crore</span><span class="font-mono font-bold">1,00,00,000</span>
        </div>
        <div class="flex justify-between"><span>Arab</span><span class="font-mono font-bold">1,00,00,00,000</span>
        </div>
       </div>
       <p class="text-[10px] text-gray-400 mt-3">First 3, then groups of 2: thousand → lakh → crore</p>
      </div>
     </div><!-- Visual infographic: digit grouping -->
     <div class="p-5 rounded-xl bg-gray-50 border border-gray-100">
      <h3 class="font-heading text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">How 1 Billion Looks in Both Systems</h3>
      <div class="space-y-3">
       <div>
        <span class="text-[10px] text-gray-400 uppercase tracking-wider">International</span>
        <div class="font-mono text-lg font-bold text-brand-600 tracking-wider">
         <span class="bg-brand-100 px-1 rounded">1</span>,<span class="bg-blue-100 px-1 rounded">000</span>,<span class="bg-blue-100 px-1 rounded">000</span>,<span class="bg-blue-100 px-1 rounded">000</span>
        </div>
       </div>
       <div>
        <span class="text-[10px] text-gray-400 uppercase tracking-wider">Indian</span>
        <div class="font-mono text-lg font-bold text-orange-600 tracking-wider">
         <span class="bg-orange-100 px-1 rounded">1</span>,<span class="bg-orange-100 px-1 rounded">00</span>,<span class="bg-orange-100 px-1 rounded">00</span>,<span class="bg-orange-100 px-1 rounded">00</span>,<span class="bg-amber-100 px-1 rounded">000</span>
        </div>
       </div>
      </div>
      <p class="text-xs text-gray-400 mt-3">Notice how Indian grouping uses pairs after the first thousand</p>
     </div>
     <div class="mt-6 text-sm text-gray-600 leading-relaxed">
      <p>The Indian numbering system has deep historical roots, originating from the ancient Vedic mathematics tradition. While both systems share the same base-10 structure, their grouping conventions differ. Understanding this is vital when reading financial reports, as a company's "$2.3B valuation" translates to "₹23,000 crore" (at ₹100/$ for simplicity).</p>
     </div>
    </div>
   </section><!-- Use Cases -->
   <section class="py-12 px-4">
    <div class="max-w-4xl mx-auto">
     <div class="text-center mb-8">
      <h2 class="font-heading font-bold text-brand-900 text-2xl">Who Uses This?</h2>
      <p class="text-gray-400 text-sm mt-2">Real-world applications across industries</p>
     </div>
     <div class="grid md:grid-cols-3 gap-4">
      <div class="section-card p-5 text-center observe-fade">
       <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="trending-up" class="w-6 h-6 text-green-600"></i>
       </div>
       <h3 class="font-heading font-bold text-brand-900 text-sm mb-1">Finance &amp; Banking</h3>
       <p class="text-xs text-gray-500">Converting FDI figures, GDP reports, and investment values between global and Indian formats.</p>
      </div>
      <div class="section-card p-5 text-center observe-fade">
       <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="bar-chart-3" class="w-6 h-6 text-purple-600"></i>
       </div>
       <h3 class="font-heading font-bold text-brand-900 text-sm mb-1">Stock Market</h3>
       <p class="text-xs text-gray-500">Translating market cap figures from international sources for Indian market analysis and vice versa.</p>
      </div>
      <div class="section-card p-5 text-center observe-fade">
       <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="briefcase" class="w-6 h-6 text-blue-600"></i>
       </div>
       <h3 class="font-heading font-bold text-brand-900 text-sm mb-1">Business Reports</h3>
       <p class="text-xs text-gray-500">Converting revenue figures for cross-border reports and international stakeholder presentations.</p>
      </div>
      <div class="section-card p-5 text-center observe-fade">
       <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="graduation-cap" class="w-6 h-6 text-amber-600"></i>
       </div>
       <h3 class="font-heading font-bold text-brand-900 text-sm mb-1">Education</h3>
       <p class="text-xs text-gray-500">Helping students understand large number conversions for mathematics and commerce studies.</p>
      </div>
      <div class="section-card p-5 text-center observe-fade">
       <div class="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="database" class="w-6 h-6 text-rose-600"></i>
       </div>
       <h3 class="font-heading font-bold text-brand-900 text-sm mb-1">Data Analysis</h3>
       <p class="text-xs text-gray-500">Converting population statistics, data volumes, and large dataset numbers between formats.</p>
      </div>
      <div class="section-card p-5 text-center observe-fade">
       <div class="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="newspaper" class="w-6 h-6 text-teal-600"></i>
       </div>
       <h3 class="font-heading font-bold text-brand-900 text-sm mb-1">Journalism</h3>
       <p class="text-xs text-gray-500">Accurately converting figures in international news stories for regional audiences.</p>
      </div>
     </div>
    </div>
   </section><!-- Comparison Table -->
   <section id="compare" class="py-12 px-4">
    <div class="max-w-4xl mx-auto">
     <div class="text-center mb-8">
      <h2 class="font-heading font-bold text-brand-900 text-2xl">Quick Comparison</h2>
      <p class="text-gray-400 text-sm mt-2">See how values translate across numbering systems</p>
     </div>
     <div class="overflow-x-auto">
      <table class="w-full">
       <thead>
        <tr>
         <th class="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Value</th>
         <th class="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-brand-500 font-semibold">Billion</th>
         <th class="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-purple-500 font-semibold">Million</th>
         <th class="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-orange-500 font-semibold">Crore</th>
         <th class="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-teal-500 font-semibold">Lakh</th>
        </tr>
       </thead>
       <tbody id="compTable"></tbody>
      </table>
     </div>
    </div>
   </section><!-- FAQ -->
   <section id="faq" class="py-12 px-4">
    <div class="max-w-3xl mx-auto">
     <div class="text-center mb-8">
      <h2 class="font-heading font-bold text-brand-900 text-2xl">Frequently Asked Questions</h2>
     </div>
     <div id="faqList" class="space-y-3"></div>
    </div>
   </section><!-- About Me Section -->
   <section class="py-12 px-4">
    <div class="max-w-4xl mx-auto section-card p-8">
     <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
       <i data-lucide="user" class="w-5 h-5 text-white"></i>
      </div>
      <h2 id="aboutTitle" class="font-heading font-bold text-brand-900 text-lg">About Me</h2>
     </div>
     <div class="grid md:grid-cols-3 gap-8 items-center">
      <div class="md:col-span-2">
       <p id="aboutDesc" class="text-gray-600 text-sm leading-relaxed mb-4">Hi, I'm John Meth — a dedicated financial analyst and number systems specialist with over a decade of experience helping businesses and professionals bridge the gap between international and Indian financial systems. I created BillionCroreNum to simplify complex number conversions and empower people to work confidently across different numbering systems.</p>
       <p class="text-gray-600 text-sm leading-relaxed mb-4">My passion lies in making financial literacy accessible to everyone, whether you're a seasoned investor analyzing global markets or a student learning about number systems. Through this tool and my work, I aim to eliminate confusion around large number conversions and help you make informed decisions with clarity and confidence.</p>
       <div class="flex gap-3 mt-6">
        <a href="https://www.instagram.com/john.meth02/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"> <i data-lucide="Instagram" class="w-4 h-4"></i> Instagram </a> <a href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"> <i data-lucide="mail" class="w-4 h-4"></i> Contact </a>
       </div>
      </div>
      <div class="md:col-span-1 flex justify-center">
       <div class="w-48 h-48 rounded-2xl overflow-hidden border-4 border-brand-200 shadow-lg">
        <img src="https://pin.it/3mstJk85p;h=400&amp;fit=crop" alt="John Meth" loading="lazy" class="w-full h-full object-cover" onerror="console.error('Image failed to load:', this.src); this.style.background='linear-gradient(135deg, #f97066, #fbd5d0)'; this.alt='John Meth Profile';">
       </div>
      </div>
     </div>
    </div>
   </section><!-- Footer -->
   <footer class="py-8 px-4 border-t border-gray-100">
    <div class="max-w-4xl mx-auto text-center">
     <div class="flex items-center justify-center gap-2 mb-3">
      <div class="w-6 h-6 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
       <span class="text-white font-heading text-[8px] font-bold">CN</span>
      </div><span class="font-heading font-bold text-xs text-brand-900">ConvertNexa.com</span>
     </div>
     <p class="text-xs text-gray-400">Free, fast, and accurate number system converter. No data collected. No ads.</p>
    </div>
   </footer>
  </div>
  <script>
// ===== CONFIG & SDK =====
const defaultConfig = {
  hero_title: 'Billion to Crore\nConverter',
  hero_subtitle: 'Convert large numbers between international and Indian numbering systems — instantly, accurately, beautifully.',
  about_title: 'About Me',
  about_desc: 'Hi, I\'m John Meth — a dedicated financial analyst and number systems specialist with over a decade of experience helping businesses and professionals bridge the gap between international and Indian financial systems.',
  background_color: '#fffbfa',
  surface_color: '#ffffff',
  text_color: '#3e1c17',
  primary_action_color: '#f04438',
  secondary_action_color: '#f97066',
  font_family: 'DM Sans',
  font_size: 14
};

window.elementSdk.init({
  defaultConfig,
  onConfigChange: async (config) => {
    const c = key => config[key] || defaultConfig[key];
    document.getElementById('heroTitle').innerHTML = (c('hero_title')).replace(/\n/,'<br>');
    document.getElementById('heroSubtitle').textContent = c('hero_subtitle');
    document.getElementById('aboutTitle').textContent = c('about_title');
    document.getElementById('aboutDesc').textContent = c('about_desc');

    const bg = c('background_color');
    const surface = c('surface_color');
    const text = c('text_color');
    const primary = c('primary_action_color');
    const secondary = c('secondary_action_color');
    const font = c('font_family');
    const size = c('font_size');

    document.body.style.background = bg;
    document.body.style.color = text;
    document.body.style.fontFamily = `${font}, 'DM Sans', sans-serif`;
    document.body.style.fontSize = size + 'px';

    document.querySelectorAll('.section-card').forEach(el => el.style.background = surface);
    document.querySelectorAll('.text-brand-900').forEach(el => el.style.color = text);
    document.querySelectorAll('.bg-brand-600').forEach(el => { el.style.background = primary; });
    document.querySelectorAll('.text-brand-600').forEach(el => el.style.color = primary);
    document.querySelectorAll('.text-brand-500').forEach(el => el.style.color = secondary);
  },
  mapToCapabilities: (config) => ({
    recolorables: [
      { get:()=>config.background_color||defaultConfig.background_color, set:v=>{config.background_color=v;window.elementSdk.setConfig({background_color:v})} },
      { get:()=>config.surface_color||defaultConfig.surface_color, set:v=>{config.surface_color=v;window.elementSdk.setConfig({surface_color:v})} },
      { get:()=>config.text_color||defaultConfig.text_color, set:v=>{config.text_color=v;window.elementSdk.setConfig({text_color:v})} },
      { get:()=>config.primary_action_color||defaultConfig.primary_action_color, set:v=>{config.primary_action_color=v;window.elementSdk.setConfig({primary_action_color:v})} },
      { get:()=>config.secondary_action_color||defaultConfig.secondary_action_color, set:v=>{config.secondary_action_color=v;window.elementSdk.setConfig({secondary_action_color:v})} },
    ],
    borderables: [],
    fontEditable: { get:()=>config.font_family||defaultConfig.font_family, set:v=>{config.font_family=v;window.elementSdk.setConfig({font_family:v})} },
    fontSizeable: { get:()=>config.font_size||defaultConfig.font_size, set:v=>{config.font_size=v;window.elementSdk.setConfig({font_size:v})} },
  }),
  mapToEditPanelValues: (config) => new Map([
    ['hero_title', config.hero_title || defaultConfig.hero_title],
    ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
    ['about_title', config.about_title || defaultConfig.about_title],
    ['about_desc', config.about_desc || defaultConfig.about_desc],
  ])
});

// ===== CONVERSION ENGINE =====
const FACTORS = { billion:1e9, million:1e6, crore:1e7, lakh:1e5 };
function convert(val, from, to) { return val * FACTORS[from] / FACTORS[to]; }
function formatNum(n) {
  if(n===0) return '0';
  if(Math.abs(n)>=1e6) return n.toLocaleString('en-US',{maximumFractionDigits:2});
  if(Math.abs(n)<0.001) return n.toExponential(4);
  return n.toLocaleString('en-US',{maximumFractionDigits:6});
}

const history = [];
const inputEl = document.getElementById('inputVal');
const fromEl = document.getElementById('fromUnit');
const toEl = document.getElementById('toUnit');
const resultText = document.getElementById('resultText');
const resultDisplay = document.getElementById('resultDisplay');
const formulaBar = document.getElementById('formulaBar');
const formulaText = document.getElementById('formulaText');

function doConvert() {
  const raw = inputEl.value.replace(/,/g,'').trim();
  if(!raw || isNaN(Number(raw))) { resultText.textContent='—'; formulaBar.classList.add('hidden'); return; }
  const val = Number(raw);
  const from = fromEl.value, to = toEl.value;
  const result = convert(val, from, to);
  resultText.textContent = formatNum(result) + ' ' + to.charAt(0).toUpperCase()+to.slice(1);
  resultDisplay.classList.add('result-flash');
  setTimeout(()=>resultDisplay.classList.remove('result-flash'),500);

  const factor = FACTORS[from]/FACTORS[to];
  formulaText.textContent = `${val} ${from} × ${factor} = ${formatNum(result)} ${to}`;
  formulaBar.classList.remove('hidden');

  addHistory(val, from, result, to);
}

inputEl.addEventListener('input', doConvert);
fromEl.addEventListener('change', doConvert);
toEl.addEventListener('change', doConvert);

document.getElementById('swapBtn').addEventListener('click', () => {
  const f=fromEl.value, t=toEl.value;
  fromEl.value=t; toEl.value=f;
  doConvert();
});

function setPreset(v) { inputEl.value=v; fromEl.value='billion'; toEl.value='crore'; doConvert(); }
function resetConverter() { inputEl.value=''; resultText.textContent='—'; formulaBar.classList.add('hidden'); }

function copyResult() {
  const t = resultText.textContent;
  if(t==='—') return;
  navigator.clipboard.writeText(t).then(()=>{
    const toast=document.getElementById('copyToast');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),2000);
  });
}

// ===== HISTORY =====
function addHistory(val, from, result, to) {
  history.unshift({val,from,result,to,time:new Date()});
  if(history.length>10) history.pop();
  renderHistory();
}
function renderHistory() {
  const panel = document.getElementById('historyPanel');
  const list = document.getElementById('historyList');
  if(!history.length){panel.classList.add('hidden');return;}
  panel.classList.remove('hidden');
  list.innerHTML = history.map((h,i)=>`
    <div class="history-item flex items-center justify-between px-4 py-2.5 rounded-lg bg-white border border-gray-100 text-xs" style="animation-delay:${i*50}ms">
      <span class="font-mono text-gray-600">${formatNum(h.val)} ${h.from}</span>
      <i data-lucide="arrow-right" class="w-3 h-3 text-gray-300"></i>
      <span class="font-mono font-bold text-brand-600">${formatNum(h.result)} ${h.to}</span>
    </div>
  `).join('');
  lucide.createIcons();
}
function clearHistory() { history.length=0; renderHistory(); }

// ===== BULK CONVERT =====
function bulkConvert() {
  const lines = document.getElementById('bulkInput').value.split('\n').filter(l=>l.trim());
  const from=document.getElementById('bulkFrom').value, to=document.getElementById('bulkTo').value;
  const container = document.getElementById('bulkResults');
  if(!lines.length){container.classList.add('hidden');return;}
  container.classList.remove('hidden');
  container.innerHTML = lines.map((line,i)=>{
    const n=Number(line.replace(/,/g,'').trim());
    if(isNaN(n)) return `<div class="px-3 py-2 rounded-lg bg-red-50 text-red-500 text-xs font-mono">Invalid: ${line}</div>`;
    const r=convert(n,from,to);
    return `<div class="flex justify-between px-3 py-2 rounded-lg bg-gray-50 text-xs slide-in" style="animation-delay:${i*60}ms">
      <span class="font-mono text-gray-600">${formatNum(n)} ${from}</span>
      <span class="font-mono font-bold text-brand-600">${formatNum(r)} ${to}</span>
    </div>`;
  }).join('');
}

// ===== VOICE INPUT =====
document.getElementById('voiceBtn').addEventListener('click', ()=>{
  if(!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
    const btn=document.getElementById('voiceBtn');
    btn.innerHTML='<i data-lucide="mic-off" class="w-3.5 h-3.5"></i> Not supported';
    lucide.createIcons();
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang='en-US'; rec.continuous=false;
  const btn=document.getElementById('voiceBtn');
  btn.classList.add('bg-red-100','text-red-600');
  btn.classList.remove('bg-gray-100','text-gray-600');
  rec.onresult=e=>{
    const t=e.results[0][0].transcript;
    const nums=t.match(/[\d.]+/);
    if(nums) { inputEl.value=nums[0]; doConvert(); }
    btn.classList.remove('bg-red-100','text-red-600');
    btn.classList.add('bg-gray-100','text-gray-600');
  };
  rec.onerror=()=>{
    btn.classList.remove('bg-red-100','text-red-600');
    btn.classList.add('bg-gray-100','text-gray-600');
  };
  rec.start();
});

// ===== DARK MODE =====
document.getElementById('darkToggle').addEventListener('click', ()=>{
  document.documentElement.classList.toggle('dark-mode');
  const isDark = document.documentElement.classList.contains('dark-mode');
  document.getElementById('darkIcon').setAttribute('data-lucide', isDark?'sun':'moon');
  lucide.createIcons();
});

// ===== COMPARISON TABLE =====
(function(){
  const vals=[0.001,0.01,0.1,0.5,1,2.5,5,10,50,100];
  const tbody=document.getElementById('compTable');
  tbody.innerHTML=vals.map((b,i)=>{
    const m=b*1000, c=b*100, l=b*10000;
    return `<tr class="border-t border-gray-50">
      <td class="px-4 py-3 text-xs text-gray-400">#${i+1}</td>
      <td class="text-right px-4 py-3 font-mono text-sm font-bold text-brand-600">${formatNum(b)}</td>
      <td class="text-right px-4 py-3 font-mono text-sm text-purple-600">${formatNum(m)}</td>
      <td class="text-right px-4 py-3 font-mono text-sm text-orange-600">${formatNum(c)}</td>
      <td class="text-right px-4 py-3 font-mono text-sm text-teal-600">${formatNum(l)}</td>
    </tr>`;
  }).join('');
})();

// ===== FAQ =====
const faqs=[
  {q:'How many crores is 1 billion?',a:'1 billion equals 100 crores. The conversion formula is: Crores = Billions × 100. So 1 billion (1,000,000,000) divided by 1 crore (10,000,000) = 100.'},
  {q:'What is the difference between billion and crore?',a:'Billion is part of the international numbering system (1 billion = 1,000,000,000), while crore is part of the Indian numbering system (1 crore = 10,000,000). They represent different scales of grouping the same base-10 numbers.'},
  {q:'How to convert crore to billion?',a:'Divide the number of crores by 100. For example, 500 crores ÷ 100 = 5 billion. The formula is: Billions = Crores ÷ 100.'},
  {q:'How many lakhs make 1 billion?',a:'1 billion = 10,000 lakhs. Since 1 lakh = 100,000, we get 1,000,000,000 ÷ 100,000 = 10,000 lakhs.'},
  {q:'Why does India use crores instead of billions?',a:'The Indian numbering system has historical roots in Vedic mathematics and has been used for thousands of years. It groups numbers differently — first three digits, then pairs — which reflects cultural counting traditions. Both systems are mathematically equivalent.'},
  {q:'Is this tool accurate for financial calculations?',a:'Yes, the converter uses precise mathematical formulas with no rounding errors for standard conversions. However, for currency conversions, you would also need to apply exchange rates, which this tool does not cover.'},
];

(function(){
  const list=document.getElementById('faqList');
  list.innerHTML=faqs.map((f,i)=>`
    <div class="section-card overflow-hidden">
      <button class="w-full text-left px-5 py-4 flex items-center justify-between" onclick="toggleFaq(${i})" aria-expanded="false">
        <span class="font-semibold text-sm text-brand-900 pr-4">${f.q}</span>
        <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 faq-chevron flex-shrink-0" id="faqChev${i}"></i>
      </button>
      <div class="faq-answer px-5 pb-4" id="faqA${i}">
        <p class="text-sm text-gray-500 leading-relaxed">${f.a}</p>
      </div>
    </div>
  `).join('');
})();

function toggleFaq(i){
  const ans=document.getElementById('faqA'+i);
  const chev=document.getElementById('faqChev'+i);
  const isOpen=ans.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-answer').forEach(a=>a.classList.remove('open'));
  document.querySelectorAll('.faq-chevron').forEach(c=>c.classList.remove('open'));
  if(!isOpen){ ans.classList.add('open'); chev.classList.add('open'); }
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('fade-up');observer.unobserve(e.target);}
  });
},{threshold:0.1});
document.querySelectorAll('.observe-fade').forEach(el=>observer.observe(el));

// ===== ANIMATED COUNTERS =====
const counterObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target;
      const target=parseInt(el.dataset.target);
      let current=0;
      const step=Math.max(1,Math.floor(target/40));
      const timer=setInterval(()=>{
        current+=step;
        if(current>=target){current=target;clearInterval(timer);}
        el.textContent=current.toLocaleString('en-US');
      },30);
      counterObs.unobserve(el);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.counter').forEach(el=>counterObs.observe(el));

// ===== NAV HIGHLIGHT =====
const sections=['hero','how','guide','compare','faq'];
const navLinks=document.querySelectorAll('.nav-link');
const navObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('active'));
      const link=document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if(link) link.classList.add('active');
    }
  });
},{threshold:0.3});
sections.forEach(id=>{const el=document.getElementById(id);if(el)navObs.observe(el);});

// Init icons
lucide.createIcons();

// ===== FLOATING NUMBERS BACKGROUND =====
(function(){
  const container=document.getElementById('floatingNumbers');
  const numbers=['1B','100CR','7.5B','250L','1M','50B','99CR','5B','1000L','2.3B','₹500','$1B','100M','₹1Cr','2B'];
  const positions=[];
  
  for(let i=0;i<12;i++){
    const num=numbers[Math.floor(Math.random()*numbers.length)];
    const left=Math.random()*100;
    const top=Math.random()*100;
    const delay=Math.random()*6;
    const duration=5+Math.random()*4;
    
    const el=document.createElement('div');
    el.className='floating-number';
    el.textContent=num;
    el.style.left=left+'%';
    el.style.top=top+'%';
    el.style.animationDelay=delay+'s';
    el.style.animationDuration=duration+'s';
    container.appendChild(el);
  }
})();
</script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9e8fbad32097b0ba',t:'MTc3NTYzNTEzNy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>

/* ============================================
   SHARMA & CO. — AI Supply Chain Intelligence
   Core Engine v2.0
   ============================================ */

// ============ CONFIGURATION ============
const CONFIG = {
  YAHOO_BASE: 'https://query1.finance.yahoo.com/v8/finance/chart/',
  REFRESH_INTERVAL: 5 * 60 * 1000,
  CACHE_DURATION: 2 * 60 * 1000,
  STORAGE_KEY: 'sharma_custom_tickers',
};

// ============ LAYER DEFINITIONS ============
const LAYERS = {
  materials: {
    name: 'Raw Materials & Commodities',
    tag: 'Layer 1 · Foundation',
    icon: '⛏️',
    color: '#f59e0b',
    slug: 'materials',
    upstream: 'Global mining & extraction',
    downstream: 'Semiconductor fabs, battery makers',
    description: 'The atoms that become AI — rare earths, silicon, copper, lithium. When these move, everything upstream follows.',
    tickers: [
      { symbol: 'MP', name: 'MP Materials', sector: 'Rare Earths' },
      { symbol: 'ALB', name: 'Albemarle Corp', sector: 'Lithium' },
      { symbol: 'FCX', name: 'Freeport-McMoRan', sector: 'Copper' },
      { symbol: 'GOLD', name: 'Barrick Gold', sector: 'Gold/Mining' },
      { symbol: 'SQM', name: 'Sociedad Quimica', sector: 'Lithium' },
      { symbol: 'TECK', name: 'Teck Resources', sector: 'Diversified Mining' },
      { symbol: 'RIO', name: 'Rio Tinto', sector: 'Diversified Mining' },
      { symbol: 'BHP', name: 'BHP Group', sector: 'Diversified Mining' },
    ],
  },
  energy: {
    name: 'Energy & Power Infrastructure',
    tag: 'Layer 2 · Power',
    icon: '⚡',
    color: '#ef4444',
    slug: 'energy',
    upstream: 'Fuel sources, grid operators',
    downstream: 'Data centers, semiconductor fabs',
    description: 'AI runs on watts. Every GPU cluster demands megawatts of continuous power — this layer tracks who supplies it.',
    tickers: [
      { symbol: 'VST', name: 'Vistra Corp', sector: 'Power Generation' },
      { symbol: 'CEG', name: 'Constellation Energy', sector: 'Nuclear/Clean' },
      { symbol: 'CCJ', name: 'Cameco Corp', sector: 'Uranium' },
      { symbol: 'NEE', name: 'NextEra Energy', sector: 'Renewables' },
      { symbol: 'NRG', name: 'NRG Energy', sector: 'Power Generation' },
      { symbol: 'TLN', name: 'Talen Energy', sector: 'Power Generation' },
      { symbol: 'SMR', name: 'NuScale Power', sector: 'Small Modular Nuclear' },
      { symbol: 'LEU', name: 'Centrus Energy', sector: 'Uranium Enrichment' },
    ],
  },
  semicap: {
    name: 'Semiconductor Equipment',
    tag: 'Layer 3 · Toolmakers',
    icon: '🔬',
    color: '#3b82f6',
    slug: 'semicap',
    upstream: 'Raw materials, precision optics',
    downstream: 'Chip foundries (TSMC, Samsung)',
    description: 'The machines that make the machines. Without ASML\'s EUV lithography, advanced AI chips don\'t exist. Period.',
    tickers: [
      { symbol: 'ASML', name: 'ASML Holding', sector: 'Lithography' },
      { symbol: 'AMAT', name: 'Applied Materials', sector: 'Deposition/Etch' },
      { symbol: 'LRCX', name: 'Lam Research', sector: 'Etch/Deposition' },
      { symbol: 'KLAC', name: 'KLA Corp', sector: 'Inspection' },
      { symbol: 'TSM', name: 'TSMC', sector: 'Foundry' },
      { symbol: 'ENTG', name: 'Entegris', sector: 'Materials' },
      { symbol: 'ONTO', name: 'Onto Innovation', sector: 'Process Control' },
      { symbol: 'ACLS', name: 'Axcelis Technologies', sector: 'Ion Implant' },
    ],
  },
  chips: {
    name: 'Chip Designers (Supporting Cast)',
    tag: 'Layer 4 · Silicon',
    icon: '🧩',
    color: '#8b5cf6',
    slug: 'chips',
    upstream: 'Foundries, EDA tools',
    downstream: 'Data center builders, OEMs',
    description: 'Beyond the usual suspects — the chip designers powering AI\'s nervous system, from networking silicon to power management.',
    tickers: [
      { symbol: 'AVGO', name: 'Broadcom', sector: 'Networking/Custom' },
      { symbol: 'MRVL', name: 'Marvell Technology', sector: 'Data Infrastructure' },
      { symbol: 'ARM', name: 'Arm Holdings', sector: 'Architecture IP' },
      { symbol: 'AMD', name: 'AMD', sector: 'GPUs/CPUs' },
      { symbol: 'SNPS', name: 'Synopsys', sector: 'EDA Tools' },
      { symbol: 'CDNS', name: 'Cadence Design', sector: 'EDA Tools' },
      { symbol: 'MCHP', name: 'Microchip Technology', sector: 'Microcontrollers' },
      { symbol: 'WOLF', name: 'Wolfspeed', sector: 'Silicon Carbide' },
    ],
  },
  network: {
    name: 'Networking & Interconnect',
    tag: 'Layer 5 · Fabric',
    icon: '🔗',
    color: '#06b6d4',
    slug: 'network',
    upstream: 'Chip designers, fiber makers',
    downstream: 'Data center operators, cloud providers',
    description: 'GPUs are useless in isolation. This layer stitches them into supercomputers — networking, fiber optics, switches.',
    tickers: [
      { symbol: 'ANET', name: 'Arista Networks', sector: 'Switches/Routing' },
      { symbol: 'CIEN', name: 'Ciena Corp', sector: 'Fiber Optics' },
      { symbol: 'GLW', name: 'Corning Inc', sector: 'Fiber Cable' },
      { symbol: 'INFN', name: 'Infinera', sector: 'Optical Transport' },
      { symbol: 'CSCO', name: 'Cisco Systems', sector: 'Networking' },
      { symbol: 'FFIV', name: 'F5 Inc', sector: 'App Delivery' },
      { symbol: 'JNPR', name: 'Juniper Networks', sector: 'Networking' },
      { symbol: 'LITE', name: 'Lumentum', sector: 'Photonics' },
    ],
  },
  datacenter: {
    name: 'Data Center REITs & Builders',
    tag: 'Layer 6 · Physical',
    icon: '🏗️',
    color: '#10b981',
    slug: 'datacenter',
    upstream: 'Energy, cooling, networking',
    downstream: 'Cloud providers, AI labs',
    description: 'The actual buildings where AI lives. REITs, construction firms, and the cooling/power systems inside them.',
    tickers: [
      { symbol: 'EQIX', name: 'Equinix', sector: 'Data Center REIT' },
      { symbol: 'DLR', name: 'Digital Realty', sector: 'Data Center REIT' },
      { symbol: 'VRT', name: 'Vertiv Holdings', sector: 'Thermal/Power' },
      { symbol: 'ETN', name: 'Eaton Corp', sector: 'Power Management' },
      { symbol: 'J', name: 'Jacobs Solutions', sector: 'Engineering' },
      { symbol: 'EMR', name: 'Emerson Electric', sector: 'Automation' },
      { symbol: 'POWL', name: 'Powell Industries', sector: 'Electrical Equipment' },
      { symbol: 'GEV', name: 'GE Vernova', sector: 'Power Equipment' },
    ],
  },
  cloud: {
    name: 'Cloud & Compute Infrastructure',
    tag: 'Layer 7 · Abstraction',
    icon: '☁️',
    color: '#6366f1',
    slug: 'cloud',
    upstream: 'Data centers, networking',
    downstream: 'AI labs, enterprises, developers',
    description: 'Where hardware becomes API. The cloud layer turns racks of GPUs into on-demand AI compute for the world.',
    tickers: [
      { symbol: 'AMZN', name: 'Amazon (AWS)', sector: 'Cloud Hyperscaler' },
      { symbol: 'MSFT', name: 'Microsoft (Azure)', sector: 'Cloud Hyperscaler' },
      { symbol: 'GOOG', name: 'Alphabet (GCP)', sector: 'Cloud Hyperscaler' },
      { symbol: 'ORCL', name: 'Oracle Cloud', sector: 'Cloud/Enterprise' },
      { symbol: 'CRWV', name: 'CoreWeave', sector: 'GPU Cloud' },
      { symbol: 'NET', name: 'Cloudflare', sector: 'Edge Computing' },
      { symbol: 'DDOG', name: 'Datadog', sector: 'Observability' },
      { symbol: 'SNOW', name: 'Snowflake', sector: 'Data Cloud' },
    ],
  },
  cooling: {
    name: 'Cooling & Water',
    tag: 'Layer 8 · Thermal',
    icon: '💧',
    color: '#0ea5e9',
    slug: 'cooling',
    upstream: 'Water utilities, chemical suppliers',
    downstream: 'Data center operators',
    description: 'The hidden constraint. AI data centers consume millions of gallons of water. This layer tracks the thermal envelope.',
    tickers: [
      { symbol: 'XYL', name: 'Xylem Inc', sector: 'Water Technology' },
      { symbol: 'PNR', name: 'Pentair', sector: 'Water Treatment' },
      { symbol: 'WTS', name: 'Watts Water', sector: 'Flow Control' },
      { symbol: 'FELE', name: 'Franklin Electric', sector: 'Pumping' },
      { symbol: 'BMI', name: 'Badger Meter', sector: 'Flow Measurement' },
      { symbol: 'AWK', name: 'American Water Works', sector: 'Water Utility' },
      { symbol: 'CWT', name: 'California Water', sector: 'Water Utility' },
      { symbol: 'AQUA', name: 'Evoqua Water', sector: 'Water Treatment' },
    ],
  },
};

const LAYER_ORDER = ['materials', 'energy', 'semicap', 'chips', 'network', 'datacenter', 'cloud', 'cooling'];

// ========================================================
// CUSTOM TICKER STORAGE (localStorage)
// ========================================================
const CustomTickers = {
  _getAll() {
    try {
      const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  },
  _saveAll(data) {
    try { localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data)); }
    catch (e) { console.warn('localStorage save failed:', e); }
  },
  get(layerKey) {
    return this._getAll()[layerKey] || [];
  },
  add(layerKey, symbol, name, sector) {
    const all = this._getAll();
    if (!all[layerKey]) all[layerKey] = [];
    const symUp = symbol.toUpperCase().trim();
    const builtIn = LAYERS[layerKey]?.tickers || [];
    if (builtIn.some(t => t.symbol === symUp)) return { error: 'Already in default watchlist' };
    if (all[layerKey].some(t => t.symbol === symUp)) return { error: 'Already added' };
    all[layerKey].push({ symbol: symUp, name: name || symUp, sector: sector || 'Custom', custom: true });
    this._saveAll(all);
    return { success: true };
  },
  remove(layerKey, symbol) {
    const all = this._getAll();
    if (!all[layerKey]) return;
    all[layerKey] = all[layerKey].filter(t => t.symbol !== symbol);
    this._saveAll(all);
  },
  getMerged(layerKey) {
    return [...(LAYERS[layerKey]?.tickers || []), ...this.get(layerKey)];
  },
  getAllFlat() {
    const all = this._getAll();
    const result = [];
    for (const key of LAYER_ORDER) {
      (all[key] || []).forEach(t => result.push({ ...t, layer: key }));
    }
    return result;
  },
  exportJSON() { return JSON.stringify(this._getAll(), null, 2); },
  importJSON(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (typeof data !== 'object') return { error: 'Invalid format' };
      this._saveAll(data);
      return { success: true };
    } catch { return { error: 'Invalid JSON' }; }
  },
  clearAll() { this._saveAll({}); }
};

// ============ DATA CACHE ============
const dataCache = new Map();

// ============ MOCK DATA GENERATOR ============
function generateMockQuote(symbol) {
  const seed = symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rng = (s) => { s = Math.sin(s) * 10000; return s - Math.floor(s); };
  const basePrice = 20 + rng(seed) * 480;
  const change = (rng(seed + 1) - 0.45) * basePrice * 0.06;
  return {
    symbol,
    price: basePrice,
    change,
    changePercent: (change / basePrice) * 100,
    marketCap: basePrice * (1e6 + rng(seed + 2) * 5e8),
    volume: Math.floor(1e5 + rng(seed + 3) * 1e7),
    sparkline: Array.from({ length: 20 }, (_, i) => basePrice + (rng(seed + i + 10) - 0.5) * basePrice * 0.08),
  };
}

// ============ YAHOO FINANCE FETCHER ============
async function fetchYahooQuotes(symbols) {
  const cacheKey = symbols.join(',');
  const cached = dataCache.get(cacheKey);
  if (cached && Date.now() - cached.time < CONFIG.CACHE_DURATION) return cached.data;
  try {
    const proxy = 'https://corsproxy.io/?';
    const results = await Promise.allSettled(
      symbols.map(async (sym) => {
        try {
          const resp = await fetch(`${proxy}${CONFIG.YAHOO_BASE}${sym}?range=1mo&interval=1d`, { signal: AbortSignal.timeout(5000) });
          if (!resp.ok) throw new Error('HTTP ' + resp.status);
          const data = await resp.json();
          const result = data.chart.result[0];
          const meta = result.meta;
          const closes = result.indicators.quote[0].close.filter(v => v != null);
          const prev = meta.chartPreviousClose || closes[closes.length - 2] || meta.regularMarketPrice;
          const price = meta.regularMarketPrice;
          const change = price - prev;
          return { symbol: sym, price, change, changePercent: (change / prev) * 100, marketCap: meta.marketCap || 0, volume: meta.regularMarketVolume || 0, sparkline: closes.slice(-20) };
        } catch { return generateMockQuote(sym); }
      })
    );
    const data = results.map(r => r.status === 'fulfilled' ? r.value : generateMockQuote('???'));
    dataCache.set(cacheKey, { time: Date.now(), data });
    return data;
  } catch (err) {
    console.warn('Fetch failed:', err);
    return symbols.map(generateMockQuote);
  }
}

// ============ FORMATTING ============
function formatPrice(n) {
  if (n == null) return '—';
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatChange(n) {
  if (n == null) return '—';
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}
function formatMarketCap(n) {
  if (!n) return '—';
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(1) + 'T';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  return '$' + n.toLocaleString();
}

// ============ SPARKLINE ============
function drawSparkline(canvas, data, color) {
  if (!canvas || !data || data.length < 2) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = 80, h = canvas.height = 24;
  ctx.clearRect(0, 0, w, h);
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  ctx.strokeStyle = color || '#00c896';
  ctx.lineWidth = 1.2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, (color || '#00c896') + '20');
  grad.addColorStop(1, (color || '#00c896') + '00');
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
}

// ============ TABLE RENDERER ============
function renderStockTable(containerId, quotes, layer, mergedTickers) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tickers = mergedTickers || LAYERS[layer]?.tickers || [];
  let html = `<table class="data-table"><thead><tr>
    <th>Ticker</th><th>Company</th><th>Sector</th>
    <th style="text-align:right">Price</th><th style="text-align:right">Change</th>
    <th style="text-align:right">Mkt Cap</th><th>30D</th><th style="width:36px"></th>
  </tr></thead><tbody>`;

  quotes.forEach((q, i) => {
    const info = tickers[i] || {};
    const cls = q.change >= 0 ? 'up' : 'down';
    const isCustom = info.custom === true;
    const badge = isCustom ? `<span style="display:inline-block;background:var(--accent-blue-dim);color:var(--accent-blue);font-family:'IBM Plex Mono',monospace;font-size:0.55rem;padding:1px 5px;border-radius:2px;margin-left:6px;vertical-align:middle;text-transform:uppercase">Custom</span>` : '';
    const del = isCustom ? `<button onclick="removeCustomTicker('${layer}','${q.symbol}')" title="Remove" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;padding:2px 6px;border-radius:3px;transition:all 150ms;line-height:1" onmouseover="this.style.color='var(--accent-red)';this.style.background='var(--accent-red-dim)'" onmouseout="this.style.color='var(--text-muted)';this.style.background='none'">×</button>` : '';
    html += `<tr${isCustom ? ' style="background:rgba(59,130,246,0.03)"' : ''}>
      <td class="ticker">${q.symbol}${badge}</td>
      <td class="company-name">${info.name || q.symbol}</td>
      <td style="color:var(--text-muted);font-size:0.75rem">${info.sector || ''}</td>
      <td class="price">${formatPrice(q.price)}</td>
      <td class="change ${cls}">${formatChange(q.changePercent)}</td>
      <td class="mcap">${formatMarketCap(q.marketCap)}</td>
      <td class="sparkline-cell"><canvas id="spark-${q.symbol}" width="80" height="24"></canvas></td>
      <td>${del}</td></tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
  requestAnimationFrame(() => {
    quotes.forEach(q => {
      const canvas = document.getElementById(`spark-${q.symbol}`);
      drawSparkline(canvas, q.sparkline, q.change >= 0 ? '#00c896' : '#ff4d6a');
    });
  });
}

// ============ ADD TICKER FORM ============
function renderAddTickerForm(containerId, layerKey) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const customCount = CustomTickers.get(layerKey).length;
  container.innerHTML = `
    <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">
      <div style="flex:1;min-width:100px">
        <label style="display:block;font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Ticker *</label>
        <input type="text" id="add-ticker-symbol" placeholder="e.g. NVDA" maxlength="10"
          style="width:100%;padding:8px 12px;background:var(--bg-input);border:1px solid var(--border-primary);border-radius:var(--radius-sm);color:var(--text-primary);font-family:'JetBrains Mono',monospace;font-size:0.82rem;text-transform:uppercase;outline:none;transition:border-color 150ms"
          onfocus="this.style.borderColor='var(--accent-green)'" onblur="this.style.borderColor='var(--border-primary)'">
      </div>
      <div style="flex:2;min-width:150px">
        <label style="display:block;font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Company Name</label>
        <input type="text" id="add-ticker-name" placeholder="e.g. NVIDIA Corp"
          style="width:100%;padding:8px 12px;background:var(--bg-input);border:1px solid var(--border-primary);border-radius:var(--radius-sm);color:var(--text-primary);font-family:'IBM Plex Sans',sans-serif;font-size:0.82rem;outline:none;transition:border-color 150ms"
          onfocus="this.style.borderColor='var(--accent-green)'" onblur="this.style.borderColor='var(--border-primary)'">
      </div>
      <div style="flex:1;min-width:120px">
        <label style="display:block;font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Sector</label>
        <input type="text" id="add-ticker-sector" placeholder="e.g. GPUs"
          style="width:100%;padding:8px 12px;background:var(--bg-input);border:1px solid var(--border-primary);border-radius:var(--radius-sm);color:var(--text-primary);font-family:'IBM Plex Sans',sans-serif;font-size:0.82rem;outline:none;transition:border-color 150ms"
          onfocus="this.style.borderColor='var(--accent-green)'" onblur="this.style.borderColor='var(--border-primary)'">
      </div>
      <button onclick="handleAddTicker('${layerKey}')"
        style="padding:8px 20px;background:var(--accent-green);color:#0a0e17;border:none;border-radius:var(--radius-sm);font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:600;cursor:pointer;letter-spacing:0.5px;transition:all 150ms;white-space:nowrap"
        onmouseover="this.style.background='#33d4aa'" onmouseout="this.style.background='var(--accent-green)'">+ ADD TICKER</button>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
      <div id="add-ticker-msg" style="font-family:'IBM Plex Mono',monospace;font-size:0.72rem;min-height:20px"></div>
      ${customCount > 0 ? `<span style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--text-muted)">${customCount} custom ticker${customCount > 1 ? 's' : ''} in this layer</span>` : ''}
    </div>`;
  const symInput = document.getElementById('add-ticker-symbol');
  if (symInput) symInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAddTicker(layerKey); });
}

// ============ HANDLERS ============
window.handleAddTicker = function(layerKey) {
  const symEl = document.getElementById('add-ticker-symbol');
  const nameEl = document.getElementById('add-ticker-name');
  const sectorEl = document.getElementById('add-ticker-sector');
  const msgEl = document.getElementById('add-ticker-msg');
  const symbol = (symEl?.value || '').trim().toUpperCase();
  const name = (nameEl?.value || '').trim();
  const sector = (sectorEl?.value || '').trim();
  if (!symbol) { if (msgEl) { msgEl.textContent = '⚠ Enter a ticker symbol'; msgEl.style.color = 'var(--accent-amber)'; } return; }
  if (!/^[A-Z0-9.\-]{1,10}$/.test(symbol)) { if (msgEl) { msgEl.textContent = '⚠ Invalid ticker format'; msgEl.style.color = 'var(--accent-amber)'; } return; }
  const result = CustomTickers.add(layerKey, symbol, name || symbol, sector || 'Custom');
  if (result.error) { if (msgEl) { msgEl.textContent = '⚠ ' + result.error; msgEl.style.color = 'var(--accent-amber)'; } return; }
  if (symEl) symEl.value = '';
  if (nameEl) nameEl.value = '';
  if (sectorEl) sectorEl.value = '';
  if (msgEl) { msgEl.textContent = '✓ Added ' + symbol + ' — refreshing...'; msgEl.style.color = 'var(--accent-green)'; }
  loadSubpage(layerKey);
  setTimeout(() => { if (msgEl) msgEl.textContent = ''; }, 3000);
};

window.removeCustomTicker = function(layerKey, symbol) {
  CustomTickers.remove(layerKey, symbol);
  loadSubpage(layerKey);
};

// ============ TOP MOVERS ============
function renderTopMovers(containerId, allQuotes) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const sorted = [...allQuotes].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 12);
  let html = '';
  sorted.forEach(q => {
    const cls = q.change >= 0 ? 'up' : 'down';
    const arrow = q.change >= 0 ? '▲' : '▼';
    html += `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(28,41,64,0.4)">
      <span class="ticker" style="min-width:60px">${q.symbol}</span>
      <span style="color:var(--text-secondary);font-size:0.78rem;flex:1;padding:0 12px">${formatPrice(q.price)}</span>
      <span class="change ${cls}" style="font-family:'JetBrains Mono',monospace;font-size:0.78rem">${arrow} ${formatChange(q.changePercent)}</span>
    </div>`;
  });
  container.innerHTML = html;
}

// ============ CLOCK ============
function updateClock() {
  const el = document.getElementById('topbar-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }) + ' EST';
}
function startClock() { updateClock(); setInterval(updateClock, 1000); }

// ============ SUMMARY PAGE LOADER ============
async function loadSummaryDashboard() {
  const tableEl = document.getElementById('top-movers');
  if (tableEl) tableEl.innerHTML = '<div class="skeleton" style="height:200px;width:100%"></div>';
  const repTickers = LAYER_ORDER.map(key => CustomTickers.getMerged(key)[0].symbol);
  const quotes = await fetchYahooQuotes(repTickers);
  LAYER_ORDER.forEach((key, i) => {
    const node = document.getElementById(`node-${key}`);
    if (!node) return;
    const q = quotes[i];
    const dotEl = node.querySelector('.status-dot');
    const textEl = node.querySelector('.status-text');
    if (q && dotEl && textEl) {
      const cls = q.changePercent > 1 ? 'green' : q.changePercent < -1 ? 'red' : 'amber';
      dotEl.className = 'status-dot ' + cls;
      textEl.className = 'status-text ' + (cls === 'green' ? 'up' : cls === 'red' ? 'down' : 'mixed');
      textEl.textContent = formatChange(q.changePercent);
    }
  });
  const allSymbols = LAYER_ORDER.flatMap(key => CustomTickers.getMerged(key).map(t => t.symbol));
  const allQuotes = await fetchYahooQuotes(allSymbols);
  renderTopMovers('top-movers', allQuotes);
  let layerIdx = 0;
  for (const key of LAYER_ORDER) {
    const merged = CustomTickers.getMerged(key);
    const layerQuotes = allQuotes.slice(layerIdx, layerIdx + merged.length);
    layerIdx += merged.length;
    const avg = layerQuotes.reduce((s, q) => s + q.changePercent, 0) / layerQuotes.length;
    const statEl = document.getElementById(`stat-${key}`);
    if (statEl) {
      statEl.querySelector('.stat-value').textContent = formatChange(avg);
      statEl.querySelector('.stat-value').className = 'stat-value change ' + (avg >= 0 ? 'up' : 'down');
    }
  }
  const customCount = CustomTickers.getAllFlat().length;
  const badge = document.getElementById('custom-count-badge');
  if (badge) badge.textContent = customCount > 0 ? `${customCount} custom ticker${customCount > 1 ? 's' : ''} tracked across all layers` : '';
  const tsEl = document.getElementById('last-updated');
  if (tsEl) tsEl.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
}

// ============ SUBPAGE LOADER ============
async function loadSubpage(layerKey) {
  const layer = LAYERS[layerKey];
  if (!layer) return;
  const merged = CustomTickers.getMerged(layerKey);
  const symbols = merged.map(t => t.symbol);
  const quotes = await fetchYahooQuotes(symbols);
  renderStockTable('layer-table', quotes, layerKey, merged);
  renderAddTickerForm('add-ticker-container', layerKey);
  const avg = quotes.reduce((s, q) => s + q.changePercent, 0) / quotes.length;
  const totalMcap = quotes.reduce((s, q) => s + (q.marketCap || 0), 0);
  const topG = [...quotes].sort((a, b) => b.changePercent - a.changePercent)[0];
  const topL = [...quotes].sort((a, b) => a.changePercent - b.changePercent)[0];
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('stat-avg-change', formatChange(avg));
  set('stat-total-mcap', formatMarketCap(totalMcap));
  set('stat-top-gainer', `${topG.symbol} ${formatChange(topG.changePercent)}`);
  set('stat-top-loser', `${topL.symbol} ${formatChange(topL.changePercent)}`);
  const avgEl = document.getElementById('stat-avg-change');
  if (avgEl) avgEl.style.color = avg >= 0 ? 'var(--accent-green)' : 'var(--accent-red)';
  const gEl = document.getElementById('stat-top-gainer');
  if (gEl) gEl.style.color = 'var(--accent-green)';
  const lEl = document.getElementById('stat-top-loser');
  if (lEl) lEl.style.color = 'var(--accent-red)';
  const tsEl = document.getElementById('last-updated');
  if (tsEl) tsEl.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
}

// ============ EXPORTS ============
window.LAYERS = LAYERS;
window.LAYER_ORDER = LAYER_ORDER;
window.CustomTickers = CustomTickers;
window.loadSummaryDashboard = loadSummaryDashboard;
window.loadSubpage = loadSubpage;
window.startClock = startClock;
window.formatPrice = formatPrice;
window.formatChange = formatChange;
window.formatMarketCap = formatMarketCap;
window.renderAddTickerForm = renderAddTickerForm;

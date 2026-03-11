/* ============================================
   SHARMA & CO. — AI Supply Chain Intelligence
   Core Engine v3.0 — Live Data Only
   ============================================ */

const CONFIG = {
  YAHOO_BASE: 'https://query1.finance.yahoo.com/v8/finance/chart/',
  REFRESH_INTERVAL: 60 * 1000, // 60 seconds — as fresh as possible
  CACHE_DURATION: 30 * 1000,   // 30 second cache to avoid hammering on rapid nav
  STORAGE_KEY: 'sharma_custom_tickers',
};

// ============ LAYER DEFINITIONS ============
const LAYERS = {
  materials: {
    name: 'Raw Materials & Commodities', tag: 'Layer 1 · Foundation', icon: '⛏️', color: '#f59e0b', slug: 'materials',
    upstream: 'Global mining operations, geological surveys, extraction permits',
    downstream: 'Semiconductor fabs, battery manufacturers, electronics supply chain',
    description: 'The atoms that become AI — rare earths, silicon, copper, lithium. When these move, everything upstream follows. China controls ~60% of rare earth processing, making this layer a geopolitical chokepoint.',
    insight: 'Watch for: Export restrictions from China on gallium/germanium, lithium supply contracts with EV crossover, copper futures as a leading indicator for data center construction starts.',
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
    name: 'Energy & Power Infrastructure', tag: 'Layer 2 · Power', icon: '⚡', color: '#ef4444', slug: 'energy',
    upstream: 'Fuel extraction, grid operators, regulatory bodies',
    downstream: 'Data center operators, semiconductor fabs',
    description: 'AI is insanely power-hungry. A single large GPU cluster can draw 50+ MW of continuous power. This layer tracks the utilities, nuclear renaissance, and renewable buildouts feeding AI\'s appetite.',
    insight: 'Watch for: Nuclear plant restart announcements, Power Purchase Agreements (PPAs) between utilities and hyperscalers, grid interconnection queue backlogs, and uranium spot price movements.',
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
    name: 'Semiconductor Equipment', tag: 'Layer 3 · Toolmakers', icon: '🔬', color: '#3b82f6', slug: 'semicap',
    upstream: 'Precision optics, rare gases, specialty chemicals, raw silicon',
    downstream: 'Chip designers (NVIDIA, AMD), foundries (TSMC, Samsung)',
    description: 'The machines that make the machines. ASML\'s EUV lithography tools cost $350M+ each and take months to install. Without this layer, advanced AI chips simply cannot be manufactured.',
    insight: 'Watch for: ASML order book vs deliveries, TSMC fab utilization rates, export control updates (especially US-China), and leading-edge node transition timelines (3nm → 2nm).',
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
    name: 'Chip Designers (Supporting Cast)', tag: 'Layer 4 · Silicon', icon: '🧩', color: '#8b5cf6', slug: 'chips',
    upstream: 'Foundries (TSMC), EDA tools (Synopsys, Cadence), IP licensors',
    downstream: 'Data center builders, system integrators, OEMs',
    description: 'Beyond NVIDIA — the chip designers powering AI\'s nervous system. Broadcom\'s custom ASICs, Arm\'s architecture, Marvell\'s data infrastructure silicon, and the EDA tools that make it all possible.',
    insight: 'Watch for: Custom ASIC wins (Google TPU, Amazon Trainium), Arm royalty revenue growth, AMD data center GPU market share gains, and EDA tool demand as a leading indicator.',
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
    name: 'Networking & Interconnect', tag: 'Layer 5 · Fabric', icon: '🔗', color: '#06b6d4', slug: 'network',
    upstream: 'Chip designers, fiber optic manufacturers, photonics labs',
    downstream: 'Data center operators, cloud providers, AI training clusters',
    description: 'A GPU in isolation is useless. This layer stitches thousands of GPUs into unified supercomputers — high-speed switches, fiber optics, and the networking silicon that keeps data flowing.',
    insight: 'Watch for: 800G Ethernet adoption timelines, InfiniBand vs Ethernet debate for AI clusters, submarine cable announcements, and Arista\'s hyperscaler customer concentration.',
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
    name: 'Data Center REITs & Builders', tag: 'Layer 6 · Physical', icon: '🏗️', color: '#10b981', slug: 'datacenter',
    upstream: 'Energy providers, cooling systems, networking equipment, construction',
    downstream: 'Cloud providers, AI labs, enterprise IT',
    description: 'The actual buildings where AI lives. Data center REITs, power distribution, thermal management, and the construction pipeline. Every new AI model needs more physical space and power.',
    insight: 'Watch for: Hyperscaler CapEx guidance updates, new campus announcements, Vertiv/Eaton order backlogs, and power density trends (kW per rack is skyrocketing).',
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
    name: 'Cloud & Compute Infrastructure', tag: 'Layer 7 · Abstraction', icon: '☁️', color: '#6366f1', slug: 'cloud',
    upstream: 'Data centers, networking, chip supply',
    downstream: 'AI labs, SaaS companies, enterprises, developers',
    description: 'Where hardware becomes API. The cloud layer turns racks of GPUs into on-demand AI compute. Hyperscalers dominate, but GPU-cloud upstarts like CoreWeave are carving out the pure-play AI niche.',
    insight: 'Watch for: GPU cloud spot pricing trends, hyperscaler CapEx-to-revenue ratios, CoreWeave growth trajectory, and whether enterprise AI workload growth justifies the buildout.',
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
    name: 'Cooling & Water', tag: 'Layer 8 · Thermal', icon: '💧', color: '#0ea5e9', slug: 'cooling',
    upstream: 'Water utilities, chemical treatment suppliers, HVAC manufacturers',
    downstream: 'Data center operators, facilities management',
    description: 'The hidden constraint nobody talks about. AI data centers consume millions of gallons of water for cooling. As power density climbs, liquid cooling is replacing air cooling — creating a new investment thesis.',
    insight: 'Watch for: Liquid cooling adoption rates in new builds, water rights disputes near data center clusters, PUE trends, and municipal pushback on data center water consumption.',
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

// ============ MASTER TICKER LOOKUP (symbol → full name) ============
function buildTickerLookup() {
  const map = {};
  for (const key of LAYER_ORDER) {
    for (const t of LAYERS[key].tickers) map[t.symbol] = t.name;
    for (const t of CustomTickers.get(key)) map[t.symbol] = t.name;
  }
  return map;
}

// ========================================================
// CUSTOM TICKER STORAGE (localStorage)
// ========================================================
const CustomTickers = {
  _getAll() { try { return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || {}; } catch { return {}; } },
  _saveAll(d) { try { localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(d)); } catch(e) { console.warn('localStorage:', e); } },
  get(k) { return this._getAll()[k] || []; },
  add(k, symbol, name, sector) {
    const all = this._getAll(); if (!all[k]) all[k] = [];
    const s = symbol.toUpperCase().trim();
    if ((LAYERS[k]?.tickers||[]).some(t=>t.symbol===s)) return {error:'Already in default watchlist'};
    if (all[k].some(t=>t.symbol===s)) return {error:'Already added'};
    all[k].push({symbol:s, name:name||s, sector:sector||'Custom', custom:true});
    this._saveAll(all); return {success:true};
  },
  remove(k, sym) { const all=this._getAll(); if(!all[k])return; all[k]=all[k].filter(t=>t.symbol!==sym); this._saveAll(all); },
  getMerged(k) { return [...(LAYERS[k]?.tickers||[]), ...this.get(k)]; },
  getAllFlat() { const all=this._getAll(),r=[]; for(const k of LAYER_ORDER)(all[k]||[]).forEach(t=>r.push({...t,layer:k})); return r; },
  exportJSON() { return JSON.stringify(this._getAll(), null, 2); },
  importJSON(s) { try { const d=JSON.parse(s); if(typeof d!=='object')return{error:'Invalid'}; this._saveAll(d); return{success:true}; } catch{return{error:'Bad JSON'};} },
  clearAll() { this._saveAll({}); }
};

// ============ DATA CACHE ============
const dataCache = new Map();

// ============ YAHOO FINANCE FETCHER — NO FALLBACK ============
async function fetchYahooQuotes(symbols) {
  const cacheKey = symbols.join(',');
  const cached = dataCache.get(cacheKey);
  if (cached && Date.now() - cached.time < CONFIG.CACHE_DURATION) return cached.data;

  const proxy = 'https://corsproxy.io/?';
  const results = await Promise.allSettled(
    symbols.map(async (sym) => {
      const resp = await fetch(`${proxy}${CONFIG.YAHOO_BASE}${sym}?range=1mo&interval=1d`, { signal: AbortSignal.timeout(8000) });
      if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${sym}`);
      const json = await resp.json();
      if (!json.chart?.result?.[0]) throw new Error(`No data for ${sym}`);
      const result = json.chart.result[0];
      const meta = result.meta;
      const closes = result.indicators.quote[0].close.filter(v => v != null);
      const prev = meta.chartPreviousClose || closes[closes.length - 2] || meta.regularMarketPrice;
      const price = meta.regularMarketPrice;
      const change = price - prev;
      return {
        symbol: sym, price, change,
        changePercent: prev ? (change / prev) * 100 : 0,
        marketCap: meta.marketCap || 0,
        volume: meta.regularMarketVolume || 0,
        sparkline: closes.slice(-20),
        error: false,
      };
    })
  );

  const data = results.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    console.error(`Failed to fetch ${symbols[i]}:`, r.reason);
    return { symbol: symbols[i], price: null, change: 0, changePercent: 0, marketCap: 0, volume: 0, sparkline: [], error: true };
  });

  dataCache.set(cacheKey, { time: Date.now(), data });
  return data;
}

// ============ FORMATTING ============
function formatPrice(n) { return n == null ? '—' : '$' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}); }
function formatChange(n) { return n == null ? '—' : (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; }
function formatMarketCap(n) {
  if (!n) return '—';
  if (n >= 1e12) return '$'+(n/1e12).toFixed(1)+'T';
  if (n >= 1e9) return '$'+(n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return '$'+(n/1e6).toFixed(1)+'M';
  return '$'+n.toLocaleString();
}

// ============ SPARKLINE ============
function drawSparkline(canvas, data, color) {
  if (!canvas || !data || data.length < 2) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = 80, h = canvas.height = 24;
  ctx.clearRect(0, 0, w, h);
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  ctx.strokeStyle = color || '#00c896'; ctx.lineWidth = 1.2; ctx.lineJoin = 'round'; ctx.beginPath();
  data.forEach((v, i) => { const x=(i/(data.length-1))*w, y=h-((v-min)/range)*(h-4)-2; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
  ctx.stroke();
  const grad = ctx.createLinearGradient(0,0,0,h);
  grad.addColorStop(0,(color||'#00c896')+'20'); grad.addColorStop(1,(color||'#00c896')+'00');
  ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
}

// ============ TICKER STRIP BUILDER (with tooltips) ============
function buildTickerStrip(containerId, layerKeys) {
  const strip = document.getElementById(containerId);
  if (!strip) return;
  strip.innerHTML = '';
  const lookup = buildTickerLookup();
  const symbols = [];
  for (const k of layerKeys) {
    const merged = CustomTickers.getMerged(k);
    merged.slice(0, 3).forEach(t => symbols.push(t.symbol));
  }
  // Duplicate 3x for seamless loop
  const all = [...symbols, ...symbols, ...symbols];
  all.forEach(sym => {
    const item = document.createElement('span');
    item.className = 'ticker-item';
    item.title = lookup[sym] || sym; // TOOLTIP with full name
    item.innerHTML = `<span class="t-symbol">${sym}</span> <span class="t-price" id="ts-${sym}">…</span>`;
    strip.appendChild(item);
  });
}

// ============ TICKER STRIP DATA UPDATER ============
async function updateTickerStrip(layerKeys) {
  const symbols = [];
  for (const k of layerKeys) {
    CustomTickers.getMerged(k).slice(0, 3).forEach(t => { if (!symbols.includes(t.symbol)) symbols.push(t.symbol); });
  }
  const quotes = await fetchYahooQuotes(symbols);
  quotes.forEach(q => {
    const els = document.querySelectorAll(`#ts-${CSS.escape(q.symbol)}`);
    els.forEach(el => {
      if (q.error) { el.textContent = 'ERR'; el.style.color = 'var(--accent-red)'; }
      else {
        const cls = q.change >= 0 ? 'up' : 'down';
        el.innerHTML = `${formatPrice(q.price)} <span class="change ${cls}">${formatChange(q.changePercent)}</span>`;
      }
    });
  });
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
    const isCustom = info.custom === true;
    const badge = isCustom ? `<span style="display:inline-block;background:var(--accent-blue-dim);color:var(--accent-blue);font-family:'IBM Plex Mono',monospace;font-size:0.55rem;padding:1px 5px;border-radius:2px;margin-left:6px;vertical-align:middle;text-transform:uppercase">Custom</span>` : '';
    const del = isCustom ? `<button onclick="removeCustomTicker('${layer}','${q.symbol}')" title="Remove" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;padding:2px 6px;border-radius:3px;transition:all 150ms;line-height:1" onmouseover="this.style.color='var(--accent-red)';this.style.background='var(--accent-red-dim)'" onmouseout="this.style.color='var(--text-muted)';this.style.background='none'">×</button>` : '';

    if (q.error) {
      html += `<tr style="opacity:0.5"><td class="ticker">${q.symbol}${badge}</td><td class="company-name">${info.name||q.symbol}</td><td colspan="4" style="color:var(--accent-red);font-family:'IBM Plex Mono',monospace;font-size:0.75rem">Failed to fetch — check ticker symbol</td><td></td><td>${del}</td></tr>`;
    } else {
      const cls = q.change >= 0 ? 'up' : 'down';
      html += `<tr${isCustom?' style="background:rgba(59,130,246,0.03)"':''}>
        <td class="ticker">${q.symbol}${badge}</td>
        <td class="company-name">${info.name||q.symbol}</td>
        <td style="color:var(--text-muted);font-size:0.75rem">${info.sector||''}</td>
        <td class="price">${formatPrice(q.price)}</td>
        <td class="change ${cls}">${formatChange(q.changePercent)}</td>
        <td class="mcap">${formatMarketCap(q.marketCap)}</td>
        <td class="sparkline-cell"><canvas id="spark-${q.symbol}" width="80" height="24"></canvas></td>
        <td>${del}</td></tr>`;
    }
  });
  html += '</tbody></table>';
  container.innerHTML = html;
  requestAnimationFrame(() => {
    quotes.filter(q=>!q.error).forEach(q => {
      const canvas = document.getElementById(`spark-${q.symbol}`);
      drawSparkline(canvas, q.sparkline, q.change >= 0 ? '#00c896' : '#ff4d6a');
    });
  });
}

// ============ TRADINGVIEW WIDGET EMBED ============
function renderTradingViewChart(containerId, symbols, layerColor) {
  const container = document.getElementById(containerId);
  if (!container) return;
  // Build symbol list for TradingView
  const tvSymbols = symbols.slice(0, 6).map(s => `"NASDAQ:${s}|1D"`).join(',');
  container.innerHTML = `
    <div class="tradingview-widget-container" style="height:500px;width:100%">
      <div id="tv-chart-${containerId}" style="height:100%;width:100%"></div>
    </div>`;
  
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    autosize: true,
    symbol: symbols[0] ? `NASDAQ:${symbols[0]}` : 'NASDAQ:AAPL',
    interval: 'D',
    timezone: 'America/New_York',
    theme: 'dark',
    style: '1',
    locale: 'en',
    backgroundColor: '#0a0e17',
    gridColor: '#1c2940',
    allow_symbol_change: true,
    watchlist: symbols.slice(0, 12).map(s => `NASDAQ:${s}`),
    details: true,
    hotlist: false,
    calendar: false,
    studies: ['RSI@tv-basicstudies', 'MASimple@tv-basicstudies'],
    support_host: 'https://www.tradingview.com',
  });
  container.querySelector('.tradingview-widget-container').appendChild(script);
}

// ============ TRADINGVIEW TICKER TAPE (for top of page) ============
function renderTradingViewTicker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const allSymbols = LAYER_ORDER.flatMap(k => CustomTickers.getMerged(k).slice(0, 2).map(t => t.symbol));
  const tvSymbols = allSymbols.map(s => ({ proName: `NASDAQ:${s}`, title: s }));

  container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols: tvSymbols,
    showSymbolLogo: false,
    isTransparent: true,
    displayMode: 'adaptive',
    colorTheme: 'dark',
    locale: 'en',
  });
  container.appendChild(script);
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
        <input type="text" id="add-ticker-symbol" placeholder="e.g. NVDA" maxlength="10" style="width:100%;padding:8px 12px;background:var(--bg-input);border:1px solid var(--border-primary);border-radius:var(--radius-sm);color:var(--text-primary);font-family:'JetBrains Mono',monospace;font-size:0.82rem;text-transform:uppercase;outline:none;transition:border-color 150ms" onfocus="this.style.borderColor='var(--accent-green)'" onblur="this.style.borderColor='var(--border-primary)'">
      </div>
      <div style="flex:2;min-width:150px">
        <label style="display:block;font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Company Name</label>
        <input type="text" id="add-ticker-name" placeholder="e.g. NVIDIA Corp" style="width:100%;padding:8px 12px;background:var(--bg-input);border:1px solid var(--border-primary);border-radius:var(--radius-sm);color:var(--text-primary);font-family:'IBM Plex Sans',sans-serif;font-size:0.82rem;outline:none;transition:border-color 150ms" onfocus="this.style.borderColor='var(--accent-green)'" onblur="this.style.borderColor='var(--border-primary)'">
      </div>
      <div style="flex:1;min-width:120px">
        <label style="display:block;font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Sector</label>
        <input type="text" id="add-ticker-sector" placeholder="e.g. GPUs" style="width:100%;padding:8px 12px;background:var(--bg-input);border:1px solid var(--border-primary);border-radius:var(--radius-sm);color:var(--text-primary);font-family:'IBM Plex Sans',sans-serif;font-size:0.82rem;outline:none;transition:border-color 150ms" onfocus="this.style.borderColor='var(--accent-green)'" onblur="this.style.borderColor='var(--border-primary)'">
      </div>
      <button onclick="handleAddTicker('${layerKey}')" style="padding:8px 20px;background:var(--accent-green);color:#0a0e17;border:none;border-radius:var(--radius-sm);font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:600;cursor:pointer;letter-spacing:0.5px;transition:all 150ms;white-space:nowrap" onmouseover="this.style.background='#33d4aa'" onmouseout="this.style.background='var(--accent-green)'">+ ADD TICKER</button>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
      <div id="add-ticker-msg" style="font-family:'IBM Plex Mono',monospace;font-size:0.72rem;min-height:20px"></div>
      ${customCount > 0 ? `<span style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--text-muted)">${customCount} custom ticker${customCount>1?'s':''} in this layer</span>` : ''}
    </div>`;
  const inp = document.getElementById('add-ticker-symbol');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleAddTicker(layerKey); });
}

// ============ HANDLERS ============
window.handleAddTicker = function(layerKey) {
  const symEl=document.getElementById('add-ticker-symbol'), nameEl=document.getElementById('add-ticker-name'),
    sectorEl=document.getElementById('add-ticker-sector'), msgEl=document.getElementById('add-ticker-msg');
  const symbol=(symEl?.value||'').trim().toUpperCase(), name=(nameEl?.value||'').trim(), sector=(sectorEl?.value||'').trim();
  if(!symbol){if(msgEl){msgEl.textContent='⚠ Enter a ticker symbol';msgEl.style.color='var(--accent-amber)';}return;}
  if(!/^[A-Z0-9.\-]{1,10}$/.test(symbol)){if(msgEl){msgEl.textContent='⚠ Invalid ticker format';msgEl.style.color='var(--accent-amber)';}return;}
  const result=CustomTickers.add(layerKey,symbol,name||symbol,sector||'Custom');
  if(result.error){if(msgEl){msgEl.textContent='⚠ '+result.error;msgEl.style.color='var(--accent-amber)';}return;}
  if(symEl)symEl.value='';if(nameEl)nameEl.value='';if(sectorEl)sectorEl.value='';
  if(msgEl){msgEl.textContent='✓ Added '+symbol+' — fetching live data...';msgEl.style.color='var(--accent-green)';}
  loadSubpage(layerKey);
  setTimeout(()=>{if(msgEl)msgEl.textContent='';},3000);
};
window.removeCustomTicker = function(k,s) { CustomTickers.remove(k,s); loadSubpage(k); };

// ============ TOP MOVERS (with tooltips) ============
function renderTopMovers(containerId, allQuotes) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const lookup = buildTickerLookup();
  const valid = allQuotes.filter(q => !q.error);
  const sorted = [...valid].sort((a,b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 12);
  let html = '';
  sorted.forEach(q => {
    const cls = q.change >= 0 ? 'up' : 'down';
    const arrow = q.change >= 0 ? '▲' : '▼';
    const fullName = lookup[q.symbol] || q.symbol;
    html += `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(28,41,64,0.4)" title="${fullName}">
      <span class="ticker" style="min-width:60px;cursor:default" title="${fullName}">${q.symbol}</span>
      <span style="color:var(--text-muted);font-size:0.7rem;flex:1;padding:0 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fullName}</span>
      <span style="color:var(--text-secondary);font-size:0.78rem;padding:0 8px;white-space:nowrap">${formatPrice(q.price)}</span>
      <span class="change ${cls}" style="font-family:'JetBrains Mono',monospace;font-size:0.78rem;white-space:nowrap">${arrow} ${formatChange(q.changePercent)}</span>
    </div>`;
  });
  container.innerHTML = html || '<div style="color:var(--text-muted);padding:20px;text-align:center">Loading live data...</div>';
}

// ============ CLOCK ============
function updateClock() {
  const el = document.getElementById('topbar-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})+' EST';
}
function startClock() { updateClock(); setInterval(updateClock, 1000); }

// ============ SUMMARY DASHBOARD ============
async function loadSummaryDashboard() {
  const tableEl = document.getElementById('top-movers');
  if (tableEl && !tableEl.querySelector('.data-table')) tableEl.innerHTML = '<div class="skeleton" style="height:200px;width:100%"></div>';

  const allSymbols = LAYER_ORDER.flatMap(k => CustomTickers.getMerged(k).map(t => t.symbol));
  const allQuotes = await fetchYahooQuotes(allSymbols);

  // Pipeline node status
  let idx = 0;
  for (const key of LAYER_ORDER) {
    const merged = CustomTickers.getMerged(key);
    const layerQuotes = allQuotes.slice(idx, idx + merged.length);
    idx += merged.length;
    const validQ = layerQuotes.filter(q => !q.error);
    const avg = validQ.length ? validQ.reduce((s,q) => s + q.changePercent, 0) / validQ.length : 0;
    
    const node = document.getElementById(`node-${key}`);
    if (node) {
      const dotEl = node.querySelector('.status-dot'), textEl = node.querySelector('.status-text');
      if (dotEl && textEl) {
        const cls = avg > 1 ? 'green' : avg < -1 ? 'red' : 'amber';
        dotEl.className = 'status-dot ' + cls;
        textEl.className = 'status-text ' + (cls==='green'?'up':cls==='red'?'down':'mixed');
        textEl.textContent = formatChange(avg);
      }
    }
    const statEl = document.getElementById(`stat-${key}`);
    if (statEl) {
      statEl.querySelector('.stat-value').textContent = formatChange(avg);
      statEl.querySelector('.stat-value').className = 'stat-value change ' + (avg >= 0 ? 'up' : 'down');
    }
  }

  renderTopMovers('top-movers', allQuotes);
  updateTickerStrip(LAYER_ORDER);

  const customCount = CustomTickers.getAllFlat().length;
  const badge = document.getElementById('custom-count-badge');
  if (badge) badge.textContent = customCount > 0 ? `${customCount} custom ticker${customCount>1?'s':''} tracked across all layers` : '';

  const tsEl = document.getElementById('last-updated');
  if (tsEl) tsEl.textContent = 'Updated: ' + new Date().toLocaleTimeString() + ' · refreshes every 60s';
}

// ============ SUBPAGE LOADER ============
async function loadSubpage(layerKey) {
  const layer = LAYERS[layerKey];
  if (!layer) return;
  const merged = CustomTickers.getMerged(layerKey);
  const quotes = await fetchYahooQuotes(merged.map(t => t.symbol));
  renderStockTable('layer-table', quotes, layerKey, merged);
  renderAddTickerForm('add-ticker-container', layerKey);

  const valid = quotes.filter(q => !q.error);
  const avg = valid.length ? valid.reduce((s,q) => s+q.changePercent,0)/valid.length : 0;
  const totalMcap = valid.reduce((s,q) => s+(q.marketCap||0),0);
  const topG = valid.length ? [...valid].sort((a,b)=>b.changePercent-a.changePercent)[0] : null;
  const topL = valid.length ? [...valid].sort((a,b)=>a.changePercent-b.changePercent)[0] : null;
  const set = (id,v) => { const el=document.getElementById(id); if(el)el.textContent=v; };
  set('stat-avg-change', formatChange(avg));
  set('stat-total-mcap', formatMarketCap(totalMcap));
  set('stat-top-gainer', topG ? `${topG.symbol} ${formatChange(topG.changePercent)}` : '—');
  set('stat-top-loser', topL ? `${topL.symbol} ${formatChange(topL.changePercent)}` : '—');

  const avgEl=document.getElementById('stat-avg-change');
  if(avgEl)avgEl.style.color=avg>=0?'var(--accent-green)':'var(--accent-red)';
  const gEl=document.getElementById('stat-top-gainer');if(gEl)gEl.style.color='var(--accent-green)';
  const lEl=document.getElementById('stat-top-loser');if(lEl)lEl.style.color='var(--accent-red)';

  // TradingView chart
  renderTradingViewChart('tv-chart-container', merged.map(t=>t.symbol), layer.color);

  updateTickerStrip([layerKey]);

  const tsEl=document.getElementById('last-updated');
  if(tsEl)tsEl.textContent='Updated: '+new Date().toLocaleTimeString()+' · refreshes every 60s';
}

// ============ EXPORTS ============
window.LAYERS=LAYERS; window.LAYER_ORDER=LAYER_ORDER; window.CustomTickers=CustomTickers;
window.loadSummaryDashboard=loadSummaryDashboard; window.loadSubpage=loadSubpage;
window.startClock=startClock; window.formatPrice=formatPrice; window.formatChange=formatChange;
window.formatMarketCap=formatMarketCap; window.renderAddTickerForm=renderAddTickerForm;
window.buildTickerStrip=buildTickerStrip; window.updateTickerStrip=updateTickerStrip;
window.renderTradingViewTicker=renderTradingViewTicker; window.renderTradingViewChart=renderTradingViewChart;
window.buildTickerLookup=buildTickerLookup;

/* ══════════════════════════════════════════════
   NEON//WEATHER — weather.js
   Endpoint: GET /meteo/{city}
   DTO: { city, temperature, wind, description }
   ══════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════

const API_BASE = '/meteo'; // corrisponde a @RequestMapping("/meteo")

// ═══════════════════════════════════════════════════════════
//  CONDITION MAP
//  mappa la stringa "description" del DTO alla scena visiva
// ═══════════════════════════════════════════════════════════

const CONDITION_MAP = {

    // ── INGLESE (OpenWeatherMap default) ──────────────────
    // sereno
    'sunny'                        : 'sunny',
    'clear'                        : 'sunny',
    'clear sky'                    : 'sunny',
    'fair'                         : 'sunny',
    // nuvoloso
    'few clouds'                   : 'cloudy',
    'scattered clouds'             : 'cloudy',
    'broken clouds'                : 'cloudy',
    'partly cloudy'                : 'cloudy',
    'overcast clouds'              : 'cloudy',
    'overcast'                     : 'cloudy',
    'cloudy'                       : 'cloudy',
    // pioggia
    'light rain'                   : 'rain',
    'moderate rain'                : 'rain',
    'rain'                         : 'rain',
    'heavy intensity rain'         : 'storm',
    'heavy rain'                   : 'storm',
    'very heavy rain'              : 'storm',
    'extreme rain'                 : 'storm',
    'freezing rain'                : 'rain',
    'light intensity shower rain'  : 'rain',
    'shower rain'                  : 'rain',
    'heavy intensity shower rain'  : 'storm',
    // drizzle
    'light intensity drizzle'      : 'drizzle',
    'drizzle'                      : 'drizzle',
    'heavy intensity drizzle'      : 'drizzle',
    'light intensity drizzle rain' : 'drizzle',
    'drizzle rain'                 : 'drizzle',
    'shower drizzle'               : 'drizzle',
    // temporale
    'thunderstorm'                          : 'storm',
    'thunderstorm with light rain'          : 'storm',
    'thunderstorm with rain'                : 'storm',
    'thunderstorm with heavy rain'          : 'storm',
    'light thunderstorm'                    : 'storm',
    'heavy thunderstorm'                    : 'storm',
    'ragged thunderstorm'                   : 'storm',
    'thunderstorm with light drizzle'       : 'storm',
    'thunderstorm with drizzle'             : 'storm',
    'thunderstorm with heavy drizzle'       : 'storm',
    // neve
    'snow'                         : 'snow',
    'light snow'                   : 'snow',
    'heavy snow'                   : 'snow',
    'blizzard'                     : 'snow',
    'sleet'                        : 'snow',
    'light shower sleet'           : 'snow',
    'shower sleet'                 : 'snow',
    'light rain and snow'          : 'snow',
    'rain and snow'                : 'snow',
    'light shower snow'            : 'snow',
    'shower snow'                  : 'snow',
    'heavy shower snow'            : 'snow',
    // nebbia
    'mist'                         : 'fog',
    'fog'                          : 'fog',
    'haze'                         : 'fog',
    'smoke'                        : 'fog',
    'dust'                         : 'fog',
    'sand'                         : 'fog',
    'ash'                          : 'fog',
    'squall'                       : 'fog',
    // notte
    'night'                        : 'night',
    'clear sky night'              : 'night',

    // ── ITALIANO (OpenWeatherMap con lang=it) ─────────────
    // sereno
    'cielo sereno'                 : 'sunny',
    'sereno'                       : 'sunny',
    // nuvole
    'poche nuvole'                 : 'cloudy',
    'nubi sparse'                  : 'cloudy',
    'nuvole sparse'                : 'cloudy',
    'cielo coperto'                : 'cloudy',
    'nuvoloso'                     : 'cloudy',
    'parzialmente nuvoloso'        : 'cloudy',
    // pioggia
    'pioggia leggera'              : 'rain',
    'pioggia moderata'             : 'rain',
    'pioggia'                      : 'rain',
    'pioggia intensa'              : 'storm',
    'pioggia molto intensa'        : 'storm',
    'pioggia estrema'              : 'storm',
    'pioggia gelata'               : 'rain',
    'pioggia leggera con rovesci'  : 'rain',
    'rovesci di pioggia'           : 'rain',
    'rovesci di pioggia intensa'   : 'storm',
    'rovescio di pioggia'          : 'rain',
    // pioggerella
    'pioggerella leggera'          : 'drizzle',
    'pioggerella'                  : 'drizzle',
    'pioggerella intensa'          : 'drizzle',
    'pioggerella e pioggia leggera': 'drizzle',
    'pioggerella e pioggia'        : 'drizzle',
    'rovescio di pioggerella'      : 'drizzle',
    // temporale
    'temporale'                         : 'storm',
    'temporale con pioggia leggera'     : 'storm',
    'temporale con pioggia'             : 'storm',
    'temporale con pioggia intensa'     : 'storm',
    'temporale leggero'                 : 'storm',
    'temporale intenso'                 : 'storm',
    'temporale violento'                : 'storm',
    'temporale con pioggerella leggera' : 'storm',
    'temporale con pioggerella'         : 'storm',
    'temporale con pioggerella intensa' : 'storm',
    // neve
    'neve'                         : 'snow',
    'neve leggera'                 : 'snow',
    'neve intensa'                 : 'snow',
    'bufera di neve'               : 'snow',
    'nevischio'                    : 'snow',
    'nevischio leggero'            : 'snow',
    'pioggia e neve'               : 'snow',
    'pioggia e neve leggera'       : 'snow',
    'rovescio di neve leggera'     : 'snow',
    'rovescio di neve'             : 'snow',
    'rovescio di neve intensa'     : 'snow',
    // nebbia / foschia
    'foschia'                      : 'fog',
    'nebbia'                       : 'fog',
    'caligine'                     : 'fog',
    'fumo'                         : 'fog',
    'polvere'                      : 'fog',
    'sabbia'                       : 'fog',
    'cenere vulcanica'             : 'fog',
    'gragnola'                     : 'fog',
    'tornado'                      : 'storm',
};

// ═══════════════════════════════════════════════════════════
//  PALETTE PER SCENA
// ═══════════════════════════════════════════════════════════

const PALETTES = {
    rain:   { sky1:'#03040a', sky2:'#060d1a', neon1:'#00b4d8', neon2:'#ff2d78', fog:'rgba(0,100,160,0.04)' },
    drizzle:{ sky1:'#03060c', sky2:'#080f18', neon1:'#00c8e8', neon2:'#ff2d78', fog:'rgba(0,80,130,0.04)' },
    storm:  { sky1:'#080010', sky2:'#0d001a', neon1:'#a855f7', neon2:'#ff2d78', fog:'rgba(80,0,120,0.06)' },
    snow:   { sky1:'#04090f', sky2:'#0a1525', neon1:'#a8d8ff', neon2:'#00fff7', fog:'rgba(100,160,220,0.05)' },
    sunny:  { sky1:'#0a0500', sky2:'#1a0d00', neon1:'#ffe600', neon2:'#ff6b00', fog:'rgba(255,180,0,0.03)' },
    cloudy: { sky1:'#05060a', sky2:'#0a0d14', neon1:'#7a8aaa', neon2:'#00fff7', fog:'rgba(80,100,140,0.04)' },
    fog:    { sky1:'#060708', sky2:'#0c0e12', neon1:'#88aaaa', neon2:'#aabbcc', fog:'rgba(120,150,160,0.07)' },
    night:  { sky1:'#02020a', sky2:'#05051a', neon1:'#00fff7', neon2:'#ff2d78', fog:'rgba(0,30,60,0.03)' },
};

// HUD neon colors per scene
const HUD_COLORS = {
    rain:   { c1:'#00b4d8', c2:'#ff2d78' },
    drizzle:{ c1:'#00c8e8', c2:'#ff2d78' },
    storm:  { c1:'#a855f7', c2:'#ff2d78' },
    snow:   { c1:'#a8d8ff', c2:'#00fff7' },
    sunny:  { c1:'#ffe600', c2:'#ff6b00' },
    cloudy: { c1:'#7a8aaa', c2:'#00fff7' },
    fog:    { c1:'#88aaaa', c2:'#aabbcc' },
    night:  { c1:'#00fff7', c2:'#ff2d78' },
};

// ═══════════════════════════════════════════════════════════
//  CANVAS ENGINE
// ═══════════════════════════════════════════════════════════

const canvas = document.getElementById('bg');
const ctx    = canvas.getContext('2d');
let W, H;

function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildCity();
}
window.addEventListener('resize', resize);

// ── Palette lerp ──────────────────────────────────────────

let palette       = { ...PALETTES.night };
let targetPalette = { ...PALETTES.night };
let paletteLerp   = 1;

function hexToRgb(hex) {
    const m = hex.match(/\w\w/g);
    return m ? m.map(x => parseInt(x, 16)) : [0, 0, 0];
}

function lerpColor(a, b, t) {
    const [r1, g1, b1] = hexToRgb(a);
    const [r2, g2, b2] = hexToRgb(b);
    return '#' + [r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t]
        .map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0'))
        .join('');
}

// ── Skyline ───────────────────────────────────────────────

let buildings = [];

function buildCity() {
    buildings = [];
    const count = Math.floor(W / 38) + 8;
    for (let i = 0; i < count; i++) {
        const w  = 28 + Math.random() * 80;
        const h  = H * 0.12 + Math.random() * H * 0.38;
        const x  = (i / (count - 1)) * W - 20 + (Math.random() - 0.5) * 30;
        buildings.push({
            x, w, h,
            windows:   buildWindows(x, w, h),
            antennae:  Math.random() > 0.6,
            antennaH:  10 + Math.random() * 30,
        });
    }
}

function buildWindows(bx, bw, bh) {
    const ws   = [];
    const cols = Math.floor(bw / 14);
    const rows = Math.floor(bh / 16);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            ws.push({
                x: bx + 4 + c * 14,
                y: H - bh + 4 + r * 16,
                on:           Math.random() > 0.35,
                flicker:      Math.random() > 0.85,
                flickerSpeed: 0.02 + Math.random() * 0.08,
                t:            Math.random() * Math.PI * 2,
            });
        }
    }
    return ws;
}

function drawCity() {
    const col = palette.neon1;
    buildings.forEach(b => {
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.fillRect(b.x, H - b.h, b.w, b.h);

        ctx.strokeStyle = col + '22';
        ctx.lineWidth   = 0.5;
        ctx.strokeRect(b.x, H - b.h, b.w, b.h);

        if (b.antennae) {
            ctx.strokeStyle = palette.neon2 + '99';
            ctx.lineWidth   = 1;
            ctx.beginPath();
            ctx.moveTo(b.x + b.w / 2, H - b.h);
            ctx.lineTo(b.x + b.w / 2, H - b.h - b.antennaH);
            ctx.stroke();
            const blink = Math.sin(Date.now() * 0.002 + b.x) > 0.5;
            if (blink) {
                ctx.fillStyle   = palette.neon2;
                ctx.shadowColor = palette.neon2;
                ctx.shadowBlur  = 8;
                ctx.beginPath();
                ctx.arc(b.x + b.w / 2, H - b.h - b.antennaH, 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        b.windows.forEach(w => {
            if (!w.on) return;
            if (w.flicker) { w.t += w.flickerSpeed; if (Math.sin(w.t) < -0.3) return; }
            ctx.fillStyle   = palette.neon1 + '55';
            ctx.shadowColor = palette.neon1;
            ctx.shadowBlur  = 4;
            ctx.fillRect(w.x, w.y, 6, 8);
            ctx.shadowBlur = 0;
        });
    });
}

function drawReflection() {
    const grad = ctx.createLinearGradient(0, H * 0.72, 0, H);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, palette.neon1 + '08');
    ctx.fillStyle = grad;
    ctx.fillRect(0, H * 0.72, W, H * 0.28);

    for (let i = 0; i < 6; i++) {
        const y     = H * 0.78 + i * H * 0.036;
        const alpha = (i / 6) * 0.12;
        ctx.strokeStyle  = palette.neon1;
        ctx.globalAlpha  = alpha;
        ctx.lineWidth    = 0.5;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

// ── Rain ─────────────────────────────────────────────────

let rainDrops = [];

function initRain(count = 200) {
    rainDrops = [];
    for (let i = 0; i < count; i++) rainDrops.push(newDrop(true));
}

function newDrop(init = false) {
    return {
        x: Math.random() * W,
        y: init ? Math.random() * H : -10,
        len:   8 + Math.random() * 20,
        speed: 12 + Math.random() * 14,
        alpha: 0.15 + Math.random() * 0.4,
        w:     0.5 + Math.random() * 0.8,
    };
}

function drawRain() {
    ctx.save();
    rainDrops.forEach(d => {
        ctx.strokeStyle = palette.neon1;
        ctx.globalAlpha = d.alpha;
        ctx.lineWidth   = d.w;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.15, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        d.x += d.speed * 0.12;
        if (d.y > H + 20 || d.x > W + 20) Object.assign(d, newDrop());
        if (d.y > H - 80 && d.y < H - 60) {
            ctx.globalAlpha = d.alpha * 0.4;
            ctx.strokeStyle = palette.neon1;
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.arc(d.x, H - 70, 2 + Math.random() * 3, 0, Math.PI * 2);
            ctx.stroke();
        }
    });
    ctx.restore();
}

// ── Snow ─────────────────────────────────────────────────

let flakes = [];

function initSnow(count = 140) {
    flakes = [];
    for (let i = 0; i < count; i++) flakes.push(newFlake(true));
}

function newFlake(init = false) {
    return {
        x: Math.random() * W,
        y: init ? Math.random() * H : -6,
        r:     1 + Math.random() * 3,
        speed: 0.4 + Math.random() * 1.4,
        drift: (Math.random() - 0.5) * 0.5,
        alpha: 0.3 + Math.random() * 0.7,
        t:     Math.random() * Math.PI * 2,
    };
}

function drawSnow() {
    ctx.save();
    flakes.forEach(f => {
        f.t += 0.015;
        f.x += Math.sin(f.t) * 0.5 + f.drift;
        f.y += f.speed;
        if (f.y > H + 10) Object.assign(f, newFlake());
        ctx.fillStyle   = palette.neon1;
        ctx.shadowColor = palette.neon1;
        ctx.shadowBlur  = 6;
        ctx.globalAlpha = f.alpha;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
    });
    ctx.restore();
}

// ── Lightning ────────────────────────────────────────────

let nextFlash = 200, flashTimer = 0, flashActive = false, flashAlpha = 0;

function updateLightning() {
    flashTimer++;
    if (flashTimer > nextFlash) {
        flashActive = true;
        flashAlpha  = 1;
        nextFlash   = 120 + Math.random() * 350;
        flashTimer  = 0;
    }
    if (flashActive) {
        flashAlpha -= 0.08;
        if (flashAlpha <= 0) { flashAlpha = 0; flashActive = false; }
        ctx.fillStyle = `rgba(180,140,255,${flashAlpha * 0.25})`;
        ctx.fillRect(0, 0, W, H);
        if (flashAlpha > 0.5) drawBolt(W * 0.3 + Math.random() * W * 0.4, 0, palette.neon1, flashAlpha);
    }
}

function drawBolt(x, y, color, alpha) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha * 0.8;
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = color;
    ctx.shadowBlur  = 20;
    ctx.beginPath(); ctx.moveTo(x, y);
    let cx = x, cy = y;
    while (cy < H * 0.7) {
        cx += (Math.random() - 0.5) * 60;
        cy += 30 + Math.random() * 40;
        ctx.lineTo(cx, cy);
    }
    ctx.stroke(); ctx.restore();
}

// ── Stars ────────────────────────────────────────────────

let stars = [];

function initStars(count = 120) {
    stars = [];
    for (let i = 0; i < count; i++) stars.push({
        x:     Math.random() * W,
        y:     Math.random() * H * 0.65,
        r:     0.3 + Math.random() * 1.2,
        alpha: Math.random(),
        speed: 0.003 + Math.random() * 0.012,
        dir:   Math.random() > 0.5 ? 1 : -1,
    });
}

function drawStars() {
    ctx.save();
    stars.forEach(s => {
        s.alpha += s.speed * s.dir;
        if (s.alpha > 1 || s.alpha < 0.05) s.dir *= -1;
        ctx.fillStyle   = palette.neon1;
        ctx.globalAlpha = s.alpha * 0.5;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
}

// ── Fog ──────────────────────────────────────────────────

let fogLayers = [];

function initFog(count = 6) {
    fogLayers = [];
    for (let i = 0; i < count; i++) fogLayers.push({
        x:     Math.random() * W,
        y:     H * 0.3 + i * H * 0.1 + (Math.random() - 0.5) * 20,
        w:     W * 0.6 + Math.random() * W * 0.8,
        speed: 0.2 + Math.random() * 0.4,
        alpha: 0.03 + Math.random() * 0.07,
    });
}

function drawFog() {
    ctx.save();
    fogLayers.forEach(f => {
        f.x = (f.x + f.speed) % (W + f.w);
        const g = ctx.createRadialGradient(f.x - f.w / 2, f.y, 0, f.x - f.w / 2, f.y, f.w * 0.5);
        g.addColorStop(0, palette.neon1 + '18');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle   = g;
        ctx.globalAlpha = f.alpha;
        ctx.fillRect(0, f.y - 80, W, 160);
    });
    ctx.restore();
}

// ── Sun / haze ───────────────────────────────────────────

let heatT = 0;

function drawSun() {
    heatT += 0.01;
    const cx = W * 0.5, cy = H * 0.22;
    for (let i = 4; i > 0; i--) {
        const r = 40 + i * 35 + Math.sin(heatT + i) * 0.5;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, palette.neon1 + '22'); g.addColorStop(1, 'transparent');
        ctx.fillStyle   = g;
        ctx.globalAlpha = 0.15 / i;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle   = palette.neon1;
    ctx.shadowColor = palette.neon1;
    ctx.shadowBlur  = 40;
    ctx.beginPath(); ctx.arc(cx, cy, 18 + Math.sin(heatT) * 2, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    for (let i = 0; i < 16; i++) {
        const a  = heatT * 0.3 + i * (Math.PI * 2 / 16);
        const r1 = 22, r2 = 38 + Math.sin(heatT * 2 + i) * 6;
        ctx.strokeStyle = palette.neon1;
        ctx.globalAlpha = 0.25 + Math.sin(heatT + i) * 0.1;
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

// ── Moon ─────────────────────────────────────────────────

let moonT = 0;

function drawMoon() {
    moonT += 0.005;
    const cx = W * 0.75, cy = H * 0.18;
    ctx.save();
    const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, 60);
    halo.addColorStop(0, palette.neon1 + '30'); halo.addColorStop(1, 'transparent');
    ctx.fillStyle   = halo;
    ctx.globalAlpha = 0.5 + Math.sin(moonT) * 0.1;
    ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
    ctx.shadowColor = palette.neon1; ctx.shadowBlur = 20;
    ctx.fillStyle   = palette.neon1 + 'cc';
    ctx.globalAlpha = 0.8;
    ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle   = 'rgba(0,0,0,.6)';
    ctx.globalAlpha = 0.6;
    ctx.beginPath(); ctx.arc(cx + 8, cy, 17, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
}

// ── Holo particles ───────────────────────────────────────

let holoParticles = [];

function initHolo(count = 40) {
    holoParticles = [];
    for (let i = 0; i < count; i++) holoParticles.push({
        x: Math.random() * W,
        y: H * 0.4 + Math.random() * H * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.5,
        size:    1 + Math.random() * 2.5,
        alpha:   0,
        life:    0,
        maxLife: 120 + Math.random() * 200,
    });
}

function drawHolo() {
    ctx.save();
    holoParticles.forEach(p => {
        p.life++; p.x += p.vx; p.y += p.vy;
        const prog = p.life / p.maxLife;
        p.alpha = (prog < 0.2 ? prog / 0.2 : prog > 0.8 ? (1 - prog) / 0.2 : 1) * 0.4;
        if (p.life > p.maxLife) {
            p.x = Math.random() * W; p.y = H * 0.5 + Math.random() * H * 0.45;
            p.life = 0; p.vy = -0.2 - Math.random() * 0.5;
        }
        ctx.fillStyle   = palette.neon2;
        ctx.shadowColor = palette.neon2; ctx.shadowBlur = 6;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
    });
    ctx.restore();
}

// ═══════════════════════════════════════════════════════════
//  SCENE MANAGER
// ═══════════════════════════════════════════════════════════

let currentScene = 'night';

function setScene(key) {
    currentScene  = key;
    targetPalette = { ...PALETTES[key] || PALETTES.night };
    paletteLerp   = 0;

    if (key === 'rain')              initRain(200);
    else if (key === 'drizzle')      initRain(80);
    else if (key === 'storm')        initRain(260);
    else if (key === 'snow')         initSnow(140);
    else if (key === 'fog')          initFog(8);
    else if (key === 'night')        initStars(120);
    else if (key === 'sunny')      { initHolo(40); }
    else if (key === 'cloudy')       initFog(4);
}

// ═══════════════════════════════════════════════════════════
//  MAIN RENDER LOOP
// ═══════════════════════════════════════════════════════════

function draw() {
    // Lerp palette
    if (paletteLerp < 1) {
        paletteLerp = Math.min(1, paletteLerp + 0.008);
        const t = paletteLerp;
        palette = {
            sky1:  lerpColor(palette.sky1,  targetPalette.sky1,  t),
            sky2:  lerpColor(palette.sky2,  targetPalette.sky2,  t),
            neon1: lerpColor(palette.neon1, targetPalette.neon1, t),
            neon2: lerpColor(palette.neon2, targetPalette.neon2, t),
            fog:   targetPalette.fog,
        };
    } else {
        palette = { ...targetPalette };
    }

    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, palette.sky1);
    sky.addColorStop(1, palette.sky2);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Background elements by scene
    if (currentScene === 'night')  drawStars();
    if (currentScene === 'sunny')  drawSun();
    if (currentScene === 'cloudy' || currentScene === 'fog') drawFog();
    if (currentScene === 'night')  drawMoon();

    drawCity();
    drawReflection();

    // Weather FX
    if (currentScene === 'rain' || currentScene === 'drizzle') drawRain();
    if (currentScene === 'storm') { drawRain(); updateLightning(); }
    if (currentScene === 'snow')  drawSnow();
    if (currentScene === 'fog')   drawFog();
    if (currentScene === 'sunny') drawHolo();

    // Horizon glow
    const hg = ctx.createLinearGradient(0, H * 0.55, 0, H * 0.75);
    hg.addColorStop(0, 'transparent');
    hg.addColorStop(1, palette.neon1 + '06');
    ctx.fillStyle = hg;
    ctx.fillRect(0, H * 0.55, W, H * 0.2);

    requestAnimationFrame(draw);
}

// ═══════════════════════════════════════════════════════════
//  HUD — CLOCK
// ═══════════════════════════════════════════════════════════

function tickClock() {
    const n = new Date();
    const pad = v => String(v).padStart(2, '0');
    document.getElementById('hud-clock').textContent =
        `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
}

const DAYS   = ['DOM','LUN','MAR','MER','GIO','VEN','SAB'];
const MONTHS = ['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];

(function initDate() {
    const n = new Date();
    document.getElementById('hud-date').textContent =
        `${DAYS[n.getDay()]} ${String(n.getDate()).padStart(2,'0')} ${MONTHS[n.getMonth()]} ${n.getFullYear()}`;
})();

setInterval(tickClock, 1000);
tickClock();

// ═══════════════════════════════════════════════════════════
//  HUD — UPDATE NEON CSS VARS
// ═══════════════════════════════════════════════════════════

function updateHudColors(sceneKey) {
    const h = HUD_COLORS[sceneKey] || HUD_COLORS.night;
    document.documentElement.style.setProperty('--neon1', h.c1);
    document.documentElement.style.setProperty('--neon2', h.c2);
}

// ═══════════════════════════════════════════════════════════
//  HUD — POPULATE DATA
//  Mappa WeatherDTO: { city, temperature, wind, description }
// ═══════════════════════════════════════════════════════════

function showWeather(dto) {
    // Risolvi scena dalla description del DTO
    const descKey  = (dto.description || '').toLowerCase().trim();
    const sceneKey = CONDITION_MAP[descKey] || 'night';

    setScene(sceneKey);
    updateHudColors(sceneKey);

    // Centro
    document.getElementById('city-big').textContent =
        (dto.city || '---').toUpperCase();
    document.getElementById('temp-big').innerHTML =
        `${Math.round(dto.temperature ?? '--')}<sup>°C</sup>`;
    document.getElementById('condition-big').textContent =
        (dto.description || '').toUpperCase() || 'UNKNOWN';

    // Stat blocks — usa i campi reali del DTO
    document.getElementById('sv-temp').textContent  = Math.round(dto.temperature ?? '--');
    document.getElementById('sv-wind').textContent  = Math.round(dto.wind ?? 0);
    document.getElementById('sv-desc').textContent  = (dto.description || '---').toUpperCase();
    document.getElementById('sv-status').textContent = 'ONLINE';

    // Animazione staggered
    ['sb-temp', 'sb-wind', 'sb-desc', 'sb-status'].forEach((id, i) => {
        const el = document.getElementById(id);
        el.classList.remove('show');
        setTimeout(() => el.classList.add('show'), 300 + i * 120);
    });

    const cd = document.getElementById('center-display');
    cd.classList.remove('show');
    setTimeout(() => cd.classList.add('show'), 100);
}

// ═══════════════════════════════════════════════════════════
//  API CALL  →  GET /meteo/{city}
// ═══════════════════════════════════════════════════════════

async function fetchWeather(city) {
    document.getElementById('error-line').textContent = '';
    document.getElementById('sv-status').textContent  = 'FETCHING...';

    // Nascondi stat blocks durante il caricamento
    ['sb-temp', 'sb-wind', 'sb-desc', 'sb-status'].forEach(id =>
        document.getElementById(id).classList.remove('show')
    );

    try {
        // Endpoint: GET /meteo/{city}  (come da @GetMapping("/{city}"))
        const response = await fetch(`${API_BASE}/${encodeURIComponent(city)}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} — ${response.statusText}`);
        }

        const dto = await response.json();
        // dto atteso: { city, temperature, wind, description }
        showWeather(dto);

    } catch (err) {
        document.getElementById('error-line').textContent =
            `ERR: ${err.message}`;
        document.getElementById('sv-status').textContent = 'ERROR';
    }
}

// ═══════════════════════════════════════════════════════════
//  EVENTS
// ═══════════════════════════════════════════════════════════

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) fetchWeather(city);
});

document.getElementById('city-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const city = e.target.value.trim();
        if (city) fetchWeather(city);
    }
});

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════

resize();
setScene('night');
initStars(120);
draw();
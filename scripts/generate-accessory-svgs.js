const fs = require('fs');
const path = require('path');

const accDir = path.join(__dirname, '..', 'public', 'images', 'accessories');
if (!fs.existsSync(accDir)) fs.mkdirSync(accDir, { recursive: true });

const accessories = [
  {
    filename: 'boot-inlet.svg',
    title: 'Compressor Inlet Boot',
    sku: 'SL-410-001',
    accent: '#e21b30',
    icon: `
      <!-- Silicone Boot Illustration -->
      <defs>
        <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2a2a2a"/>
          <stop offset="50%" stop-color="#141414"/>
          <stop offset="100%" stop-color="#050505"/>
        </linearGradient>
        <linearGradient id="redLiner" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff3b4e"/>
          <stop offset="100%" stop-color="#b30015"/>
        </linearGradient>
        <linearGradient id="clampMet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f0f0f0"/>
          <stop offset="50%" stop-color="#999999"/>
          <stop offset="100%" stop-color="#444444"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- Outer Boot Shape -->
      <path d="M 90,85 C 90,70 120,60 150,60 C 180,60 210,70 210,85 L 225,145 C 225,160 185,172 150,172 C 115,172 75,160 75,145 Z" fill="url(#bootGrad)" stroke="#444" stroke-width="2"/>
      <!-- Inner lip / Red multi-ply layer -->
      <ellipse cx="150" cy="85" rx="55" ry="16" fill="url(#redLiner)"/>
      <ellipse cx="150" cy="85" rx="46" ry="12" fill="#090a0d"/>
      <!-- Clamp ring -->
      <path d="M 80,128 C 80,118 115,110 150,110 C 185,110 220,118 220,128 L 220,136 C 220,146 185,154 150,154 C 115,154 80,146 80,136 Z" fill="url(#clampMet)" opacity="0.95"/>
      <!-- Clamp bolt -->
      <rect x="205" y="118" width="16" height="12" rx="2" fill="#cccccc" stroke="#666" stroke-width="1"/>
      <circle cx="213" cy="124" r="3" fill="#333"/>
      <!-- Reinforcing ribs -->
      <path d="M 82,105 C 100,113 130,117 150,117 C 170,117 200,113 218,105" fill="none" stroke="#2c2c2c" stroke-width="3"/>
    `
  },
  {
    filename: 'vband-clamp.svg',
    title: 'V-Band Clamp 3.5"',
    sku: 'SL-330-001',
    accent: '#0d6efd',
    icon: `
      <defs>
        <linearGradient id="chrome1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="25%" stop-color="#b0b5bc"/>
          <stop offset="50%" stop-color="#e8ecf1"/>
          <stop offset="75%" stop-color="#7a828e"/>
          <stop offset="100%" stop-color="#2a2e35"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- V-Band Circle Outer -->
      <circle cx="150" cy="115" r="62" fill="none" stroke="url(#chrome1)" stroke-width="14"/>
      <!-- Inner groove wedge -->
      <circle cx="150" cy="115" r="54" fill="none" stroke="#0e1014" stroke-width="3"/>
      <!-- T-bolt latch assembly -->
      <path d="M 195,85 L 235,65 L 242,78 L 202,98 Z" fill="url(#chrome1)" stroke="#555" stroke-width="1"/>
      <rect x="232" y="60" width="12" height="24" rx="3" fill="#d4d8de" stroke="#444"/>
      <!-- T-bolt thread rod -->
      <line x1="185" y1="92" x2="250" y2="58" stroke="#ffffff" stroke-width="4" stroke-dasharray="2,2"/>
      <circle cx="150" cy="115" r="46" fill="#0d0f12"/>
      <!-- Stainless steel badge -->
      <text x="150" y="119" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#8892a0" text-anchor="middle">304 STAINLESS</text>
    `
  },
  {
    filename: 'plenum-boots.svg',
    title: 'Spider to Intake Boots',
    sku: 'SL-420-001',
    accent: '#e21b30',
    icon: `
      <defs>
        <linearGradient id="bootDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#181a1e"/>
          <stop offset="50%" stop-color="#32363e"/>
          <stop offset="100%" stop-color="#121316"/>
        </linearGradient>
        <linearGradient id="ringSilv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#606670"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- Boot 1 (Left) -->
      <g transform="translate(-32, 0)">
        <rect x="100" y="70" width="55" height="90" rx="8" fill="url(#bootDark)" stroke="#444" stroke-width="1.5"/>
        <line x1="100" y1="88" x2="155" y2="88" stroke="url(#ringSilv)" stroke-width="8"/>
        <line x1="100" y1="142" x2="155" y2="142" stroke="url(#ringSilv)" stroke-width="8"/>
        <ellipse cx="127" cy="70" rx="27" ry="8" fill="#e21b30"/>
        <ellipse cx="127" cy="70" rx="21" ry="5" fill="#0b0d10"/>
      </g>
      <!-- Boot 2 (Right) -->
      <g transform="translate(38, 0)">
        <rect x="110" y="70" width="55" height="90" rx="8" fill="url(#bootDark)" stroke="#444" stroke-width="1.5"/>
        <line x1="110" y1="88" x2="165" y2="88" stroke="url(#ringSilv)" stroke-width="8"/>
        <line x1="110" y1="142" x2="165" y2="142" stroke="url(#ringSilv)" stroke-width="8"/>
        <ellipse cx="137" cy="70" rx="27" ry="8" fill="#e21b30"/>
        <ellipse cx="137" cy="70" rx="21" ry="5" fill="#0b0d10"/>
      </g>
      <!-- Pair label -->
      <text x="150" y="195" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ff4d5e" text-anchor="middle">5-PLY SILICONE PAIR</text>
    `
  },
  {
    filename: 'uppipe-kit.svg',
    title: 'Bellowed Up-Pipe Kit',
    sku: 'SL-510-001',
    accent: '#f59e0b',
    icon: `
      <defs>
        <linearGradient id="pipeMet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e8ecf1"/>
          <stop offset="50%" stop-color="#939ba7"/>
          <stop offset="100%" stop-color="#464c56"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- Left up-pipe with bellows -->
      <path d="M 95,170 L 105,120 L 125,75 L 140,75" fill="none" stroke="url(#pipeMet)" stroke-width="12" stroke-linecap="round"/>
      <!-- Right up-pipe with bellows -->
      <path d="M 205,170 L 195,120 L 175,75 L 160,75" fill="none" stroke="url(#pipeMet)" stroke-width="12" stroke-linecap="round"/>
      <!-- Collector Cast Iron -->
      <path d="M 130,60 L 170,60 L 165,85 L 135,85 Z" fill="#2d323b" stroke="#626a78" stroke-width="2"/>
      <ellipse cx="150" cy="60" rx="18" ry="7" fill="#0d0f12" stroke="#e21b30" stroke-width="1.5"/>
      <!-- Bellows flexible ribs on pipes -->
      <line x1="97" y1="135" x2="111" y2="135" stroke="#f59e0b" stroke-width="4"/>
      <line x1="99" y1="143" x2="113" y2="143" stroke="#f59e0b" stroke-width="4"/>
      <line x1="187" y1="135" x2="201" y2="135" stroke="#f59e0b" stroke-width="4"/>
      <line x1="185" y1="143" x2="199" y2="143" stroke="#f59e0b" stroke-width="4"/>
      <!-- Flanges -->
      <rect x="80" y="165" width="28" height="8" rx="2" fill="#586170"/>
      <rect x="192" y="165" width="28" height="8" rx="2" fill="#586170"/>
    `
  },
  {
    filename: 'manifold-kit.svg',
    title: 'Exhaust Manifold Kit',
    sku: 'SL-500-001',
    accent: '#64748b',
    icon: `
      <defs>
        <linearGradient id="ironGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#434a56"/>
          <stop offset="50%" stop-color="#242830"/>
          <stop offset="100%" stop-color="#121418"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- Heavy Cast Iron Manifold Log -->
      <path d="M 65,115 L 235,115 C 238,115 240,125 235,135 L 210,145 L 85,145 L 65,135 Z" fill="url(#ironGrad)" stroke="#5f6877" stroke-width="2"/>
      <!-- 4 Runner Ports -->
      <ellipse cx="85" cy="105" rx="14" ry="10" fill="#0c0e12" stroke="#5f6877" stroke-width="3"/>
      <ellipse cx="128" cy="105" rx="14" ry="10" fill="#0c0e12" stroke="#5f6877" stroke-width="3"/>
      <ellipse cx="172" cy="105" rx="14" ry="10" fill="#0c0e12" stroke="#5f6877" stroke-width="3"/>
      <ellipse cx="215" cy="105" rx="14" ry="10" fill="#0c0e12" stroke="#5f6877" stroke-width="3"/>
      <!-- Up-pipe exit port -->
      <path d="M 205,140 L 225,165 L 205,170 Z" fill="#2d323b" stroke="#5f6877" stroke-width="2"/>
      <text x="150" y="185" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#9ba5b5" text-anchor="middle">DUCTILE IRON CASTING</text>
    `
  },
  {
    filename: 'map-sensor.svg',
    title: 'MAP Pressure Sensor',
    sku: 'SL-600-010',
    accent: '#10b981',
    icon: `
      <defs>
        <linearGradient id="sensorPlas" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2a2e36"/>
          <stop offset="100%" stop-color="#0b0d10"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- Sensor Body -->
      <rect x="115" y="80" width="70" height="60" rx="8" fill="url(#sensorPlas)" stroke="#4e5666" stroke-width="2"/>
      <!-- Mounting Ears -->
      <circle cx="95" cy="110" r="14" fill="#1c2027" stroke="#4e5666" stroke-width="2"/>
      <circle cx="95" cy="110" r="6" fill="#0b0d10"/>
      <!-- Harness 3-pin plug connector -->
      <path d="M 130,55 L 170,55 L 165,80 L 135,80 Z" fill="#15171c" stroke="#10b981" stroke-width="2"/>
      <rect x="142" y="60" width="4" height="12" fill="#eab308"/>
      <rect x="148" y="60" width="4" height="12" fill="#eab308"/>
      <rect x="154" y="60" width="4" height="12" fill="#eab308"/>
      <!-- Vacuum nozzle -->
      <rect x="140" y="140" width="20" height="28" rx="3" fill="#2d333e" stroke="#606a7b" stroke-width="2"/>
      <ellipse cx="150" cy="168" rx="8" ry="4" fill="#000000"/>
      <circle cx="150" cy="110" r="12" fill="#10b981" opacity="0.2"/>
      <circle cx="150" cy="110" r="4" fill="#10b981"/>
    `
  },
  {
    filename: 'pedestal.svg',
    title: 'Turbo Pedestal w/ EBPV',
    sku: 'SL-340-001',
    accent: '#e21b30',
    icon: `
      <defs>
        <linearGradient id="pedMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4d5563"/>
          <stop offset="60%" stop-color="#282c34"/>
          <stop offset="100%" stop-color="#14171c"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- Pedestal Body Tower -->
      <path d="M 115,70 L 185,70 L 205,155 L 95,155 Z" fill="url(#pedMetal)" stroke="#606a7c" stroke-width="2"/>
      <!-- Top turbo mounting pad & oil feed holes -->
      <rect x="110" y="60" width="80" height="15" rx="3" fill="#677285"/>
      <ellipse cx="135" cy="67" rx="5" ry="3" fill="#0a0c0f"/>
      <ellipse cx="165" cy="67" rx="5" ry="3" fill="#0a0c0f"/>
      <!-- EBPV Actuator Cylinder on side -->
      <rect x="195" y="110" width="35" height="24" rx="4" fill="#303642" stroke="#e21b30" stroke-width="1.5"/>
      <line x1="185" y1="122" x2="200" y2="122" stroke="#d6dbe2" stroke-width="4"/>
      <!-- Base engine block mounting flange -->
      <rect x="85" y="152" width="130" height="16" rx="4" fill="#424a56" stroke="#606a7c" stroke-width="2"/>
      <circle cx="102" cy="160" r="4" fill="#0c0e12"/>
      <circle cx="198" cy="160" r="4" fill="#0c0e12"/>
    `
  },
  {
    filename: 'outlet-plate.svg',
    title: 'Outlet Plate w/ Butterfly',
    sku: 'SL-370-001',
    accent: '#f59e0b',
    icon: `
      <defs>
        <linearGradient id="housingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#555e6d"/>
          <stop offset="50%" stop-color="#323740"/>
          <stop offset="100%" stop-color="#181a1f"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111317" rx="12"/>
      <circle cx="150" cy="115" r="95" fill="#1b1e24" stroke="#2c3038" stroke-width="1.5"/>
      <!-- Round Exhaust Outlet Housing -->
      <circle cx="150" cy="115" r="60" fill="url(#housingGrad)" stroke="#677385" stroke-width="3"/>
      <!-- Internal Throttle Bore -->
      <circle cx="150" cy="115" r="42" fill="#0d0f12" stroke="#2a2e36" stroke-width="2"/>
      <!-- Butterfly Flapper Valve Shaft & Plate -->
      <ellipse cx="150" cy="115" rx="38" ry="12" fill="#4d5563" stroke="#e8ecf2" stroke-width="1.5" transform="rotate(-25 150 115)"/>
      <line x1="110" y1="135" x2="190" y2="95" stroke="#f59e0b" stroke-width="4"/>
      <!-- External Bellcrank lever -->
      <circle cx="190" cy="95" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
      <!-- Flange bolt holes -->
      <circle cx="150" cy="62" r="4.5" fill="#1a1c22" stroke="#8c97a8" stroke-width="1.5"/>
      <circle cx="203" cy="115" r="4.5" fill="#1a1c22" stroke="#8c97a8" stroke-width="1.5"/>
      <circle cx="150" cy="168" r="4.5" fill="#1a1c22" stroke="#8c97a8" stroke-width="1.5"/>
      <circle cx="97" cy="115" r="4.5" fill="#1a1c22" stroke="#8c97a8" stroke-width="1.5"/>
    `
  }
];

accessories.forEach(item => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 230" width="100%" height="100%">
    ${item.icon}
    <!-- Watermark / Brand Badge -->
    <text x="150" y="218" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#4e5868" letter-spacing="1.5" text-anchor="middle">SPOOLOGIC® GENUINE PART</text>
  </svg>`;
  
  const dest = path.join(accDir, item.filename);
  fs.writeFileSync(dest, svg.trim());
  console.log(`Generated SVG: ${item.filename}`);
});
console.log('All 8 accessories SVGs generated successfully.');

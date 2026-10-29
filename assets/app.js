/* =========================================================
   Komputer Utama — Demo_webtokocumputama
   ------------------------------------------------------------------
   KONFIGURASI CEPAT
   - Ganti WA_NUMBER dengan nomor WhatsApp toko (format 62xxx, tanpa +).
   - Ubah produk di array `PRODUCTS`, rakitan di `BUILDS`.
   - Semua data demo tersimpan di localStorage browser pengunjung.
   ========================================================= */
const WA_NUMBER = "6281234567890";

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const starsSvg = (n = 5) =>
  Array.from({ length: n }, () => `<svg class="ico"><use href="#i-star"/></svg>`).join("");

const store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  },
};

/* =========================================================
   ILUSTRASI SVG (tanpa file gambar eksternal)
   ========================================================= */
const fan = (x, y, color) => `
  <g transform="translate(${x} ${y})">
    <circle r="14" fill="#0a1627" stroke="${color}" stroke-opacity=".65"/>
    <circle r="9.5" fill="none" stroke="${color}" stroke-opacity=".22"/>
    <g fill="${color}" opacity=".9">
      <path d="M0 0V-9.5A9.5 9.5 0 0 1 8.2 -0.8Z"/>
      <path d="M0 0V-9.5A9.5 9.5 0 0 1 8.2 -0.8Z" transform="rotate(120)"/>
      <path d="M0 0V-9.5A9.5 9.5 0 0 1 8.2 -0.8Z" transform="rotate(240)"/>
    </g>
    <circle r="2.2" fill="#e0f2fe"/>
  </g>`;

const ART = {
  pc(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi PC rakitan" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pca-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#182a45"/><stop offset="1" stop-color="#0a1220"/></linearGradient>
        <linearGradient id="pcb-${uid}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#38bdf8"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="181" rx="84" ry="9" fill="#0b1220" opacity=".16"/>
      <rect x="94" y="22" width="112" height="152" rx="10" fill="url(#pca-${uid})" stroke="#29405e" stroke-width="1.5"/>
      <rect x="94" y="22" width="112" height="10" rx="5" fill="#20354f"/>
      <path d="M104 28h92" stroke="#35506f" stroke-width="2" stroke-linecap="round"/>
      <rect x="104" y="42" width="62" height="110" rx="7" fill="#0a1526" stroke="#2b4059"/>
      ${fan(135, 66, "#38bdf8")}
      ${fan(135, 100, "#60a5fa")}
      ${fan(135, 134, "#a78bfa")}
      <rect x="174" y="42" width="22" height="110" rx="6" fill="#0c1729" stroke="#22364f"/>
      <circle cx="185" cy="56" r="2.6" fill="#38bdf8"/>
      <circle cx="185" cy="67" r="2.6" fill="#8b5cf6"/>
      <path d="M181 132h8" stroke="#26405f" stroke-width="3" stroke-linecap="round"/>
      <rect x="104" y="160" width="92" height="6" rx="3" fill="#0b1425"/>
      <path d="M112 163h42" stroke="url(#pcb-${uid})" stroke-width="3" stroke-linecap="round"/>
      <circle cx="185" cy="163" r="3" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
    </svg>`;
  },
  gaming(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi PC gaming" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gma-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1b2136"/><stop offset="1" stop-color="#0a0f1c"/></linearGradient>
        <linearGradient id="gmb-${uid}" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f472b6"/><stop offset=".5" stop-color="#a78bfa"/><stop offset="1" stop-color="#38bdf8"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="181" rx="84" ry="9" fill="#0b1220" opacity=".16"/>
      <rect x="94" y="22" width="112" height="152" rx="10" fill="url(#gma-${uid})" stroke="#2b3453" stroke-width="1.5"/>
      <rect x="94" y="22" width="112" height="9" rx="4.5" fill="#252c45"/>
      <path d="M100 60h100M100 72h100" stroke="#2c3350" stroke-width="1"/>
      <rect x="104" y="42" width="64" height="112" rx="6" fill="#0b1020" stroke="#39406b"/>
      <rect x="110" y="88" width="52" height="22" rx="4" fill="#121a33" stroke="#3f4a80"/>
      <path d="M114 94h44" stroke="url(#gmb-${uid})" stroke-width="3" stroke-linecap="round"/>
      ${fan(136, 62, "#a78bfa")}
      ${fan(136, 128, "#38bdf8")}
      <rect x="176" y="42" width="22" height="112" rx="6" fill="#0a0f1e" stroke="#2b3453"/>
      <path d="M181 52h12M181 62h12M181 72h12" stroke="#f472b6" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <rect x="104" y="160" width="92" height="6" rx="3" fill="#0a0f1e"/>
      <path d="M112 163h60" stroke="url(#gmb-${uid})" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  },
  laptop(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi laptop" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lpa-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1a2c46"/><stop offset="1" stop-color="#0c1729"/></linearGradient>
        <linearGradient id="lps-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0d2338"/><stop offset="1" stop-color="#0a1830"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="172" rx="100" ry="8" fill="#0b1220" opacity=".14"/>
      <rect x="70" y="30" width="160" height="110" rx="9" fill="url(#lpa-${uid})" stroke="#2c4260" stroke-width="1.5"/>
      <rect x="78" y="38" width="144" height="94" rx="4" fill="url(#lps-${uid})"/>
      <circle cx="109" cy="66" r="13" fill="none" stroke="#38bdf8" stroke-width="2" opacity=".7"/>
      <path d="M109 55a11 11 0 0 1 9.5 16.5" stroke="#8b5cf6" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <rect x="131" y="55" width="62" height="5" rx="2.5" fill="#3b5474"/>
      <rect x="131" y="66" width="46" height="4" rx="2" fill="#27405f"/>
      <rect x="131" y="75" width="54" height="4" rx="2" fill="#27405f"/>
      <rect x="92" y="94" width="72" height="26" rx="4" fill="#122b45" stroke="#24405f"/>
      <path d="M99 108l8-8 7 7 9-11 8 12" stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="176" y="94" width="34" height="26" rx="4" fill="#122b45" stroke="#24405f"/>
      <path d="M182 104h22M182 110h14" stroke="#3b5474" stroke-width="2" stroke-linecap="round"/>
      <path d="M52 140h196l13 15a4 4 0 0 1-3 6H42a4 4 0 0 1-3-6z" fill="#15273c" stroke="#2c4260" stroke-width="1.2"/>
      <rect x="128" y="147" width="44" height="4" rx="2" fill="#2c4260"/>
    </svg>`;
  },
  laptopPro(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi laptop premium" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lqa-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#25324a"/><stop offset="1" stop-color="#0f1727"/></linearGradient>
        <linearGradient id="lqs-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#123a4d"/><stop offset=".6" stop-color="#0b2036"/><stop offset="1" stop-color="#1b1440"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="172" rx="100" ry="8" fill="#0b1220" opacity=".14"/>
      <rect x="68" y="28" width="164" height="112" rx="10" fill="url(#lqa-${uid})" stroke="#3a4c68" stroke-width="1.5"/>
      <rect x="76" y="36" width="148" height="96" rx="5" fill="url(#lqs-${uid})"/>
      <path d="M76 108c30-16 52-34 74-52 22-18 44-22 74-18v94H76z" fill="#0d2a45" opacity=".7"/>
      <circle cx="196" cy="62" r="15" fill="#f0abfc" opacity=".25"/>
      <circle cx="196" cy="62" r="7" fill="#f0abfc" opacity=".5"/>
      <rect x="92" y="56" width="58" height="5" rx="2.5" fill="#8fb3d9" opacity=".65"/>
      <rect x="92" y="67" width="38" height="4" rx="2" fill="#8fb3d9" opacity=".35"/>
      <rect x="92" y="100" width="46" height="16" rx="8" fill="#38bdf8" opacity=".28"/>
      <path d="M50 140h200l12 15a4 4 0 0 1-3 6H41a4 4 0 0 1-3-6z" fill="#1a2739" stroke="#3a4c68" stroke-width="1.2"/>
      <rect x="126" y="147" width="48" height="4" rx="2" fill="#3a4c68"/>
    </svg>`;
  },
  monitor(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi monitor" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mna-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#14233a"/><stop offset="1" stop-color="#0a1424"/></linearGradient>
        <linearGradient id="mns-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0e3a52"/><stop offset=".55" stop-color="#0b2038"/><stop offset="1" stop-color="#1c1a46"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="180" rx="94" ry="7" fill="#0b1220" opacity=".14"/>
      <rect x="48" y="32" width="204" height="120" rx="8" fill="url(#mna-${uid})" stroke="#2a405e" stroke-width="1.5"/>
      <rect x="56" y="40" width="188" height="104" rx="3" fill="url(#mns-${uid})"/>
      <path d="M56 118c34-8 56-30 84-42 26-11 58-8 104 6v62H56z" fill="#0c2c46" opacity=".75"/>
      <path d="M120 144c24-26 46-38 72-44 20-5 36-4 52 0v44z" fill="#0e3a56" opacity=".8"/>
      <rect x="72" y="56" width="64" height="5" rx="2.5" fill="#9dc3e6" opacity=".65"/>
      <rect x="72" y="67" width="42" height="4" rx="2" fill="#9dc3e6" opacity=".3"/>
      <circle cx="216" cy="66" r="10" fill="#38bdf8" opacity=".6"/>
      <path d="M141 152h18v18h-18z" fill="#15273e"/>
      <rect x="112" y="170" width="76" height="7" rx="3.5" fill="#15273e" stroke="#2a405e"/>
    </svg>`;
  },
  monitorCurved(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi monitor ultrawide melengkung" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mca-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1a1c38"/><stop offset="1" stop-color="#0a0f1f"/></linearGradient>
        <linearGradient id="mcs-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#241a4a"/><stop offset=".5" stop-color="#0c2440"/><stop offset="1" stop-color="#0a3a4c"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="180" rx="102" ry="7" fill="#0b1220" opacity=".14"/>
      <path d="M38 34h224c4 0 6 3 5 7l-8 104c-.4 3-3 5-6 5H47c-3 0-5.6-2-6-5L33 41c-1-4 1-7 5-7z" fill="url(#mca-${uid})" stroke="#31365c" stroke-width="1.5"/>
      <path d="M48 42h204l-7 92c-.3 2.6-2.6 4.5-5.2 4.5H60.2c-2.6 0-4.9-1.9-5.2-4.5z" fill="url(#mcs-${uid})"/>
      <path d="M48 112c40-10 70-32 102-38 34-6 68 4 102 20v40c0 2.6-2 4.5-5 4.5H53c-3 0-5-1.9-5-4.5z" fill="#0b233c" opacity=".8"/>
      <circle cx="212" cy="68" r="12" fill="#a78bfa" opacity=".55"/>
      <circle cx="212" cy="68" r="22" fill="#a78bfa" opacity=".18"/>
      <rect x="68" y="58" width="72" height="5" rx="2.5" fill="#a5c4e8" opacity=".65"/>
      <rect x="68" y="69" width="46" height="4" rx="2" fill="#a5c4e8" opacity=".3"/>
      <rect x="64" y="86" width="172" height="1" fill="#38bdf8" opacity=".25"/>
      <path d="M134 146h32v16h-32z" fill="#141a33"/>
      <rect x="104" y="162" width="92" height="8" rx="4" fill="#141a33" stroke="#31365c"/>
    </svg>`;
  },
  keyboard(uid) {
    const accent = (r, c) => {
      if (r === 1 && c === 0) return "#38bdf8";
      if (r === 1 && c === 9) return "#a78bfa";
      if (r === 2 && c === 3) return "#f472b6";
      if (r === 3 && c === 6) return "#34d399";
      return "#1b2c45";
    };
    let keys = "";
    const rows = [10, 10, 9, 7];
    rows.forEach((cols, r) => {
      for (let c = 0; c < cols; c++) {
        const x = 44 + c * 22 + (cols < 10 ? (10 - cols) * 11 : 0);
        const y = 76 + r * 17;
        keys += `<rect x="${x}" y="${y}" width="18" height="13" rx="2.6" fill="${accent(r, c)}" stroke="#2b405c" stroke-width=".6"/>`;
      }
      if (r === 3) {
        keys += `<rect x="120" y="127" width="62" height="13" rx="3" fill="#1b2c45" stroke="#2b405c" stroke-width=".6"/>`;
      }
    });
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi keyboard mekanik" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="kba-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1a2a42"/><stop offset="1" stop-color="#0b1523"/></linearGradient></defs>
      <ellipse cx="150" cy="172" rx="110" ry="8" fill="#0b1220" opacity=".14"/>
      <rect x="30" y="64" width="240" height="88" rx="11" fill="url(#kba-${uid})" stroke="#2a405c" stroke-width="1.5"/>
      <rect x="30" y="64" width="240" height="7" rx="3.5" fill="#243953"/>
      ${keys}
      <path d="M44 143h60" stroke="#38bdf8" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
      <circle cx="248" cy="144" r="2.4" fill="#34d399"/>
    </svg>`;
  },
  mouse(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi mouse gaming" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="msa-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#26344c"/><stop offset=".55" stop-color="#131e30"/><stop offset="1" stop-color="#0a1220"/></linearGradient>
        <linearGradient id="msb-${uid}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f472b6"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="182" rx="52" ry="8" fill="#0b1220" opacity=".14"/>
      <path d="M150 26c36 0 58 28 58 68 0 44-24 70-58 70s-58-26-58-70c0-40 22-68 58-68z" fill="url(#msa-${uid})" stroke="#38465f" stroke-width="1.5"/>
      <path d="M150 28v50" stroke="#38465f" stroke-width="1.4"/>
      <rect x="136" y="48" width="28" height="38" rx="14" fill="#0e1b2c" stroke="#405070"/>
      <circle cx="150" cy="70" r="5" fill="url(#msb-${uid})"/>
      <path d="M150 98c-18 0-30 12-30 28h60c0-16-12-28-30-28z" fill="url(#msb-${uid})" opacity=".22"/>
      <path d="M122 156c6 5 16 8 28 8s22-3 28-8" stroke="#f472b6" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
      <path d="M108 58c-4 12-5 24-4 34" stroke="#4a5a78" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    </svg>`;
  },
  headset(uid) {
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi headset gaming" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hsa-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#26344c"/><stop offset="1" stop-color="#0c1523"/></linearGradient>
        <linearGradient id="hsb-${uid}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fbbf24"/><stop offset="1" stop-color="#f97316"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="180" rx="76" ry="8" fill="#0b1220" opacity=".14"/>
      <path d="M82 122V104a68 68 0 0 1 136 0v18" fill="none" stroke="#2b3a54" stroke-width="15" stroke-linecap="round"/>
      <path d="M82 116V104a68 68 0 0 1 136 0v12" fill="none" stroke="#3d4f6d" stroke-width="6" stroke-linecap="round"/>
      <rect x="62" y="104" width="38" height="64" rx="16" fill="url(#hsa-${uid})" stroke="#3d4f6d" stroke-width="1.4"/>
      <rect x="70" y="114" width="22" height="44" rx="11" fill="#101c2e"/>
      <path d="M74 124a8 8 0 0 1 14 0" stroke="url(#hsb-${uid})" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <rect x="200" y="104" width="38" height="64" rx="16" fill="url(#hsa-${uid})" stroke="#3d4f6d" stroke-width="1.4"/>
      <rect x="208" y="114" width="22" height="44" rx="11" fill="#101c2e"/>
      <path d="M212 124a8 8 0 0 1 14 0" stroke="url(#hsb-${uid})" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M100 160c0 14 10 22 24 22h12" fill="none" stroke="#3d4f6d" stroke-width="4" stroke-linecap="round"/>
      <circle cx="140" cy="182" r="6" fill="#2b3a54" stroke="#4a5a78"/>
    </svg>`;
  },
  ssd(uid) {
    let pins = "";
    for (let i = 0; i < 16; i++) {
      pins += `<rect x="${236 + i * 3.2}" y="92" width="1.8" height="22" rx=".6" fill="#eab308" opacity=".85"/>`;
    }
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi SSD NVMe" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="ssa-${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1b3a30"/><stop offset="1" stop-color="#0c1d17"/></linearGradient></defs>
      <ellipse cx="150" cy="150" rx="96" ry="8" fill="#0b1220" opacity=".14"/>
      <g transform="rotate(-10 150 100)">
        <rect x="42" y="76" width="206" height="48" rx="4" fill="url(#ssa-${uid})" stroke="#2f5c4b" stroke-width="1.4"/>
        <rect x="52" y="86" width="48" height="28" rx="3" fill="#14261f" stroke="#3a6b58"/>
        <rect x="108" y="86" width="34" height="28" rx="3" fill="#14261f" stroke="#3a6b58"/>
        <rect x="150" y="86" width="34" height="28" rx="3" fill="#14261f" stroke="#3a6b58"/>
        <rect x="192" y="86" width="26" height="28" rx="3" fill="#14261f" stroke="#3a6b58"/>
        <rect x="52" y="90" width="30" height="4" rx="2" fill="#38bdf8" opacity=".7"/>
        <path d="M196 94h18M196 100h18M196 106h12" stroke="#34d399" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
        <circle cx="234" cy="106" r="3" fill="#0d1d17" stroke="#3a6b58"/>
        ${pins}
      </g>
      <path d="M74 142h152" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round" opacity=".3"/>
    </svg>`;
  },
  ram(uid) {
    const pins = (x, y) =>
      Array.from({ length: 20 }, (_, i) => `<rect x="${x + i * 8.6}" y="${y}" width="4.6" height="7" rx="1" fill="#eab308" opacity=".8"/>`).join("");
    const fins = (x, y) =>
      Array.from({ length: 12 }, (_, i) => `<path d="M${x + i * 13} ${y}v14" stroke="#2c4a6b" stroke-width="1.4"/>`).join("");
    return `<svg viewBox="0 0 300 200" role="img" aria-label="Ilustrasi memori RAM" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rma-${uid}" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#101f34"/><stop offset="1" stop-color="#0b1524"/></linearGradient>
        <linearGradient id="rmb-${uid}" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#38bdf8"/><stop offset=".5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#f472b6"/></linearGradient>
      </defs>
      <ellipse cx="150" cy="168" rx="106" ry="8" fill="#0b1220" opacity=".14"/>
      <g transform="rotate(-4 150 100)">
        <rect x="38" y="66" width="224" height="38" rx="4" fill="url(#rma-${uid})" stroke="#2c405c" stroke-width="1.2"/>
        <rect x="38" y="66" width="224" height="5" rx="2.5" fill="url(#rmb-${uid})"/>
        ${fins(52, 78)}
        <rect x="198" y="78" width="52" height="16" rx="2" fill="#0e1a2b" stroke="#2c405c"/>
        ${pins(44, 104)}
        <rect x="38" y="118" width="224" height="38" rx="4" fill="url(#rma-${uid})" stroke="#2c405c" stroke-width="1.2"/>
        <rect x="38" y="118" width="224" height="5" rx="2.5" fill="url(#rmb-${uid})" opacity=".8"/>
        ${fins(52, 130)}
        <rect x="198" y="130" width="52" height="16" rx="2" fill="#0e1a2b" stroke="#2c405c"/>
        ${pins(44, 156)}
      </g>
    </svg>`;
  },
};

/* =========================================================
   DATA PRODUK (demo)
   ========================================================= */
const PRODUCTS = [
  {
    id: "pc-hemat", name: "Rakit Hemat", cat: "pc", catLabel: "PC Rakitan",
    price: 4850000, old: 5300000, rating: 4.9, reviews: 128,
    spec: "Ryzen 5 5600G · 16GB · 512GB NVMe", art: "pc", tone: "blue",
    badge: { text: "Terlaris", kind: "" },
    desc: "Rakitan serbaguna untuk kerja, sekolah, dan gaming ringan. Sudah dirakit rapi, diinstal, dan lolos stress test sebelum diserahkan.",
    specs: ["AMD Ryzen 5 5600G (6 core / 12 thread)", "RAM 16GB DDR4 3200MHz dual channel", "SSD NVMe 512GB", "Radeon Vega 7 terintegrasi", "PSU 450W 80+ Bronze", "Garansi toko 1 tahun"],
  },
  {
    id: "pc-gaming", name: "Rakit Gaming Ryzen", cat: "pc", catLabel: "PC Rakitan",
    price: 9500000, old: 10200000, rating: 4.9, reviews: 86,
    spec: "Ryzen 5 7500F · RTX 4060 · 16GB DDR5", art: "gaming", tone: "violet",
    badge: { text: "Promo", kind: "promo" },
    desc: "Main game AAA di 1080p high setting dengan frame stabil. Platform AM5 jadi lebih mudah di-upgrade beberapa tahun ke depan.",
    specs: ["AMD Ryzen 5 7500F", "NVIDIA RTX 4060 8GB", "RAM 16GB DDR5 6000MHz", "SSD NVMe Gen4 1TB", "PSU 650W 80+ Bronze", "Casing airflow + 4 fan ARGB"],
  },
  {
    id: "laptop-rapi", name: "Laptop Rapi 14", cat: "laptop", catLabel: "Laptop",
    price: 7899000, rating: 4.8, reviews: 54,
    spec: "Ryzen 5 · 16GB · 512GB · OLED", art: "laptop", tone: "cyan",
    badge: { text: "Baru", kind: "new" },
    desc: "Laptop tipis dengan layar OLED yang nyaman untuk kerja dan desain ringan. Bobot di bawah 1,3 kg, mudah dibawa ke mana-mana.",
    specs: ["AMD Ryzen 5 8645HS", "Layar 14\" OLED 2.8K 90Hz", "RAM 16GB LPDDR5", "SSD NVMe 512GB", "Baterai 60Wh · USB-C PD", "Garansi resmi 2 tahun"],
  },
  {
    id: "laptop-pro", name: "Laptop Pro 15", cat: "laptop", catLabel: "Laptop",
    price: 12499000, rating: 4.8, reviews: 41,
    spec: "Core i7 · 16GB · 1TB · 2.8K", art: "laptopPro", tone: "blue",
    badge: { text: "Premium", kind: "premium" },
    desc: "Untuk profesional yang butuh tenaga ekstra: kompilasi kode, editing foto, dan multitasking berat tetap responsif.",
    specs: ["Intel Core i7-13620H", "Layar 15,6\" 2.8K 120Hz", "RAM 16GB DDR5 (upgradeable)", "SSD NVMe 1TB", "Keyboard backlit · fingerprint", "Garansi resmi 2 tahun"],
  },
  {
    id: "monitor-24", name: 'Monitor 24" IPS 100Hz', cat: "monitor", catLabel: "Monitor",
    price: 1299000, old: 1449000, rating: 4.7, reviews: 210,
    spec: "FHD · IPS · 100Hz · HDMI", art: "monitor", tone: "cyan",
    badge: null,
    desc: "Monitor harian yang tajam dan nyaman untuk mata. Refresh rate 100Hz membuat gerakan kursor dan scroll terasa lebih halus.",
    specs: ["24 inci FHD 1920×1080", "Panel IPS 100Hz", "HDMI + DisplayPort", "Low blue light & flicker-free", "VESA mount 100×100", "Garansi resmi 3 tahun"],
  },
  {
    id: "monitor-27", name: 'Monitor 27" QHD 165Hz', cat: "monitor", catLabel: "Monitor",
    price: 2899000, old: 3199000, rating: 4.8, reviews: 97,
    spec: "QHD · IPS · 165Hz · Adaptive Sync", art: "monitorCurved", tone: "violet",
    badge: { text: "Promo", kind: "promo" },
    desc: "Layar lebih lega untuk multitasking, gaming, dan editing. QHD memberi detail ekstra tanpa membuat teks terlalu kecil.",
    specs: ["27 inci QHD 2560×1440", "Panel IPS 165Hz", "Adaptive Sync / FreeSync", "HDMI 2.0 + DP 1.4", "Stand height & tilt adjustable", "Garansi resmi 3 tahun"],
  },
  {
    id: "acc-keyboard", name: "Keyboard Mekanik TKL", cat: "aksesoris", catLabel: "Aksesoris",
    price: 649000, rating: 4.8, reviews: 312,
    spec: "Hot-swap · Wireless · RGB", art: "keyboard", tone: "emerald",
    badge: { text: "Terlaris", kind: "" },
    desc: "Layout TKL yang ringkas dengan switch hot-swap — ganti switch tanpa solder. Bisa kabel atau wireless untuk meja yang lebih rapi.",
    specs: ["Layout TKL 87 tombol", "Hot-swap 5-pin", "Bluetooth 5.0 + 2.4GHz + USB-C", "Baterai 3000mAh", "Keycap PBT double-shot", "RGB per-key"],
  },
  {
    id: "acc-mouse", name: "Mouse Gaming Ringan", cat: "aksesoris", catLabel: "Aksesoris",
    price: 379000, rating: 4.7, reviews: 265,
    spec: "26.000 DPI · 65g · Wireless", art: "mouse", tone: "rose",
    badge: null,
    desc: "Ringan 65 gram dan sensor presisi untuk gaming maupun kerja. Baterai tahan lama dengan pengisian USB-C.",
    specs: ["Sensor 26.000 DPI", "Bobot 65 gram", "Wireless 2.4GHz", "Switch optik 80 juta klik", "Baterai 70 jam", "Kabel USB-C included"],
  },
  {
    id: "acc-headset", name: "Headset Gaming 7.1", cat: "aksesoris", catLabel: "Aksesoris",
    price: 899000, old: 1049000, rating: 4.6, reviews: 154,
    spec: "7.1 Surround · Mic detachable", art: "headset", tone: "amber",
    badge: { text: "Promo", kind: "promo" },
    desc: "Suara surround virtual untuk mendengar posisi lawan di game, plus mikrofon detachable untuk meeting online.",
    specs: ["Driver 50mm", "7.1 surround virtual", "Mic detachable + noise cancel", "Ear cushion memory foam", "Koneksi USB + 3.5mm", "Bobot 285 gram"],
  },
  {
    id: "ssd-1tb", name: "SSD NVMe Gen4 1TB", cat: "sparepart", catLabel: "Sparepart",
    price: 899000, rating: 4.9, reviews: 188,
    spec: "PCIe 4.0 · 5.000 MB/s", art: "ssd", tone: "emerald",
    badge: { text: "Terlaris", kind: "" },
    desc: "Upgrade paling terasa untuk laptop maupun PC lama. Boot dan buka aplikasi jauh lebih cepat, plus kapasitas lega 1TB.",
    specs: ["PCIe Gen4 x4 NVMe 1.4", "Kecepatan baca hingga 5.000 MB/s", "Tulis hingga 4.500 MB/s", "Form factor M.2 2280", "TBW 600TB", "Garansi resmi 5 tahun"],
  },
  {
    id: "ram-16", name: "RAM DDR4 16GB Kit", cat: "sparepart", catLabel: "Sparepart",
    price: 559000, rating: 4.8, reviews: 142,
    spec: "2×8GB · 3200MHz · CL16", art: "ram", tone: "blue",
    badge: null,
    desc: "Kit dual-channel untuk menambah responsivitas saat banyak tab dan aplikasi terbuka. Cocok untuk laptop maupun desktop yang kompatibel.",
    specs: ["Kapasitas 16GB (2×8GB)", "DDR4 3200MHz CL16", "Dual channel", "XMP 2.0", "Compatible Intel & AMD", "Garansi resmi seumur hidup"],
  },
];

/* =========================================================
   RENDER KATALOG
   ========================================================= */
const grid = $("#productGrid");
const emptyState = $("#emptyState");
const state = {
  filter: "all",
  search: "",
  cart: store.get("ku_cart", {}) || {},
  theme: store.get("ku_theme", null),
};

const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

function productCard(p) {
  const badge = p.badge
    ? `<span class="product__badge" data-kind="${p.badge.kind}">${p.badge.text}</span>`
    : "";
  return `
  <article class="product" data-product="${p.id}">
    <button class="product__media" type="button" data-tone="${p.tone}" data-open-product="${p.id}" aria-label="Lihat detail ${p.name}">
      ${badge}
      ${ART[p.art](p.id)}
    </button>
    <div class="product__body">
      <span class="product__cat">${p.catLabel}</span>
      <h3 class="product__title"><button type="button" data-open-product="${p.id}">${p.name}</button></h3>
      <p class="product__spec">${p.spec}</p>
      <div class="product__rating">
        <svg class="ico"><use href="#i-star"/></svg>
        <b>${p.rating.toFixed(1)}</b><span>(${p.reviews})</span>
      </div>
      <div class="product__foot">
        <div class="price">${rupiah(p.price)}${p.old ? `<s>${rupiah(p.old)}</s>` : ""}</div>
        <button class="add-btn" type="button" data-add="${p.id}" aria-label="Tambahkan ${p.name} ke keranjang">
          <svg class="ico"><use href="#i-plus"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  const q = state.search.trim().toLowerCase();
  const list = PRODUCTS.filter((p) => {
    const byCat = state.filter === "all" || p.cat === state.filter;
    const bySearch = !q || `${p.name} ${p.spec} ${p.catLabel}`.toLowerCase().includes(q);
    return byCat && bySearch;
  });
  grid.innerHTML = list.map(productCard).join("");
  emptyState.hidden = list.length > 0;
  grid.hidden = list.length === 0;
}

function syncFilterCounts() {
  $$(".chip").forEach((chip) => {
    const key = chip.dataset.filter;
    const count = key === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === key).length;
    const span = chip.querySelector("span");
    if (span) span.textContent = count;
  });
}

/* =========================================================
   KERANJANG
   ========================================================= */
const cartDrawer = $("#cartDrawer");
const cartItemsEl = $("#cartItems");
const cartEmpty = $("#cartEmpty");
const cartFoot = $("#cartFoot");
const cartCountEl = $("#cartCount");

function cartEntries() {
  return Object.entries(state.cart)
    .map(([id, qty]) => ({ product: findProduct(id), qty }))
    .filter((x) => x.product && x.qty > 0);
}
function cartTotal() {
  return cartEntries().reduce((sum, x) => sum + x.product.price * x.qty, 0);
}
function cartQty() {
  return cartEntries().reduce((sum, x) => sum + x.qty, 0);
}

function renderCart() {
  const entries = cartEntries();
  const totalQty = cartQty();

  cartCountEl.hidden = totalQty === 0;
  cartCountEl.textContent = totalQty > 99 ? "99+" : String(totalQty);
  $("#cartTitleCount").textContent = `(${totalQty})`;

  cartItemsEl.innerHTML = entries
    .map(({ product: p, qty }) => `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item__thumb" data-tone="${p.tone}">${ART[p.art](p.id + "-c")}</div>
        <div>
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__price">${rupiah(p.price)} / unit</div>
          <div class="cart-item__qty">
            <button type="button" data-cart-dec="${p.id}" aria-label="Kurangi jumlah ${p.name}"><svg class="ico"><use href="#i-minus"/></svg></button>
            <span aria-label="Jumlah">${qty}</span>
            <button type="button" data-cart-inc="${p.id}" aria-label="Tambah jumlah ${p.name}"><svg class="ico"><use href="#i-plus"/></svg></button>
          </div>
        </div>
        <div class="cart-item__right">
          <div class="cart-item__total">${rupiah(p.price * qty)}</div>
          <button class="cart-item__remove" type="button" data-cart-remove="${p.id}" aria-label="Hapus ${p.name}">
            <svg class="ico"><use href="#i-trash"/></svg>
          </button>
        </div>
      </div>`)
    .join("");

  cartItemsEl.hidden = entries.length === 0;
  cartEmpty.hidden = entries.length > 0;
  cartFoot.hidden = entries.length === 0;
  $("#cartTotal").textContent = rupiah(cartTotal());
  store.set("ku_cart", state.cart);
}

function addToCart(id, btn) {
  if (!findProduct(id)) return;
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
  const product = findProduct(id);
  toast(`${product.name} masuk keranjang`);
  if (btn) {
    btn.classList.add("is-added");
    const use = btn.querySelector("use");
    if (use) use.setAttribute("href", "#i-check");
    setTimeout(() => {
      btn.classList.remove("is-added");
      if (use) use.setAttribute("href", "#i-plus");
    }, 1400);
  }
}

function checkout() {
  const entries = cartEntries();
  if (!entries.length) return;
  const lines = entries.map((x) => `• ${x.product.name} ×${x.qty} — ${rupiah(x.product.price * x.qty)}`);
  const text = [
    "Halo Komputer Utama! Saya mau pesan:",
    ...lines,
    "",
    `Subtotal: ${rupiah(cartTotal())}`,
    "",
    "Mohon info ketersediaan stok dan ongkirnya. Terima kasih!",
  ].join("\n");
  window.open(waLink(text), "_blank", "noopener");
  toast("Membuka WhatsApp untuk konfirmasi…");
}

function openDrawer() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $("#cartOpen").setAttribute("aria-expanded", "true");
  setTimeout(() => $(".drawer__head .icon-btn")?.focus(), 120);
}
function closeDrawer() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  if (!$("#productModal").classList.contains("is-open")) document.body.classList.remove("no-scroll");
  $("#cartOpen").setAttribute("aria-expanded", "false");
}

/* =========================================================
   MODAL PRODUK
   ========================================================= */
const modal = $("#productModal");
const modalContent = $("#modalContent");
let lastFocused = null;

function openModal(id) {
  const p = findProduct(id);
  if (!p) return;
  lastFocused = document.activeElement;
  modalContent.innerHTML = `
    <div class="modal__media" data-tone="${p.tone}">${ART[p.art](p.id + "-m")}</div>
    <div class="modal__details">
      <span class="modal__cat">${p.catLabel}</span>
      <h2 id="modalTitle">${p.name}</h2>
      <div class="modal__rating">
        <svg class="ico"><use href="#i-star"/></svg>
        <b>${p.rating.toFixed(1)}</b> · ${p.reviews} ulasan · stok tersedia
      </div>
      <div class="modal__price">
        <strong>${rupiah(p.price)}</strong>
        ${p.old ? `<s>${rupiah(p.old)}</s>` : ""}
        ${p.badge ? `<span class="tag" style="margin-left:auto">${p.badge.text}</span>` : ""}
      </div>
      <p class="modal__desc">${p.desc}</p>
      <ul class="modal__specs">
        ${p.specs.map((s) => `<li><svg class="ico"><use href="#i-check"/></svg><span>${s}</span></li>`).join("")}
      </ul>
      <div class="modal__actions">
        <button class="btn btn--primary" type="button" data-add="${p.id}">
          <svg class="ico"><use href="#i-cart"/></svg> Tambah ke keranjang
        </button>
        <a class="btn btn--ghost js-wa" target="_blank" rel="noopener"
           data-wa-text="Halo Komputer Utama! Saya tertarik ${p.name} (${rupiah(p.price)}). Masih ada stok?"
           href="${waLink(`Halo Komputer Utama! Saya tertarik ${p.name} (${rupiah(p.price)}). Masih ada stok?`)}">
          <svg class="ico"><use href="#i-whatsapp"/></svg> Tanya stok
        </a>
      </div>
    </div>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  modal.querySelector(".modal__panel").scrollTop = 0;
  setTimeout(() => modal.querySelector(".modal__close")?.focus(), 120);
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (!cartDrawer.classList.contains("is-open")) document.body.classList.remove("no-scroll");
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

/* =========================================================
   TOAST
   ========================================================= */
function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<svg class="ico"><use href="#i-check"/></svg><span></span>`;
  el.querySelector("span").textContent = message;
  $("#toasts").appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    setTimeout(() => el.remove(), 260);
  }, 2300);
}

/* =========================================================
   FORM KONTAK (diteruskan ke WhatsApp)
   ========================================================= */
function initForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");

  const setError = (field, on) => {
    const wrap = field.closest(".field") || field.closest(".consent");
    if (wrap) wrap.classList.toggle("is-invalid", on);
  };

  form.addEventListener("input", (e) => {
    if (e.target.matches("input, select, textarea")) setError(e.target, false);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "form-status";
    const nama = form.nama.value.trim();
    const wa = form.wa.value.replace(/[\s-]/g, "");
    const kebutuhan = form.kebutuhan.value;
    const pesan = form.pesan.value.trim();
    const consent = form.consent.checked;

    const waValid = /^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(wa);
    const checks = [
      { el: form.nama, ok: nama.length >= 2, msg: "Nama minimal 2 karakter." },
      { el: form.wa, ok: waValid, msg: "Nomor WhatsApp belum valid (contoh: 081234567890)." },
      { el: form.kebutuhan, ok: Boolean(kebutuhan), msg: "Pilih kebutuhan terlebih dahulu." },
      { el: form.pesan, ok: pesan.length >= 10, msg: "Pesan minimal 10 karakter." },
      { el: form.consent, ok: consent, msg: "Centang persetujuan untuk melanjutkan." },
    ];
    checks.forEach((c) => setError(c.el, !c.ok));
    const failed = checks.find((c) => !c.ok);
    if (failed) {
      status.textContent = failed.msg;
      status.classList.add("is-error");
      return;
    }

    const text = [
      "Halo Komputer Utama!",
      `Nama: ${nama}`,
      `WhatsApp: ${wa}`,
      `Kebutuhan: ${kebutuhan}`,
      `Pesan: ${pesan}`,
    ].join("\n");
    window.open(waLink(text), "_blank", "noopener");
    status.textContent = "Berhasil! WhatsApp dibuka dengan pesan yang sudah disiapkan.";
    status.classList.add("is-ok");
    toast("Pesan siap dikirim lewat WhatsApp");
  });
}

/* =========================================================
   KALKULATOR RAKITAN
   ========================================================= */
const BUILDS = {
  kerja: {
    label: "Kerja & sekolah",
    icon: "i-laptop",
    tiers: [
      { name: "Rakit Hemat", price: 3600000, desc: "Cukup untuk Office, browsing, dan kelas online.", specs: ["Ryzen 3 3200G", "8GB RAM", "SSD 256GB", "PSU 380W"] },
      { name: "Rakit Produktif", price: 5400000, desc: "Mulus untuk banyak tab, Excel berat, dan meeting online.", specs: ["Ryzen 5 5600G", "16GB RAM", "SSD 512GB", "WiFi 6"] },
      { name: "Rakit Produktif Plus", price: 8200000, desc: "Multitasking ringan dan virtual meeting tanpa lemot.", specs: ["Ryzen 5 7600", "32GB RAM", "SSD 1TB", "PSU 550W"] },
      { name: "Workstation Ringan", price: 14500000, desc: "Untuk data besar, virtual machine, dan kerja berat harian.", specs: ["Core i7 / Ryzen 7", "32GB RAM", "SSD 1TB Gen4", "GPU entry"] },
    ],
  },
  gaming: {
    label: "Gaming",
    icon: "i-zap",
    tiers: [
      { name: "Gaming Starter", price: 6800000, desc: "E-sports 1080p high setting dengan FPS stabil.", specs: ["Ryzen 5 5600", "GTX 1650", "16GB RAM", "SSD 512GB"] },
      { name: "Gaming Mainstream", price: 9800000, desc: "Game AAA 1080p high, siap upgrade beberapa tahun.", specs: ["Ryzen 5 7500F", "RTX 4060", "16GB DDR5", "SSD 1TB"] },
      { name: "Gaming Tinggi", price: 15200000, desc: "1440p high setting untuk game modern dan VR.", specs: ["Ryzen 7 7800X3D", "RTX 4070", "32GB DDR5", "SSD 1TB Gen4"] },
      { name: "Gaming Enthusiast", price: 24800000, desc: "4K gaming dan rendering dengan headroom besar.", specs: ["Ryzen 7 / Core i7", "RTX 4070 Ti Super", "32GB DDR5", "AIO 360mm"] },
    ],
  },
  desain: {
    label: "Desain & editing",
    icon: "i-spark",
    tiers: [
      { name: "Desain Ringan", price: 7900000, desc: "Photoshop, Illustrator, dan Canva untuk desain sehari-hari.", specs: ["Ryzen 5 5600", "16GB RAM", "SSD 512GB", "Monitor ready"] },
      { name: "Desain Serius", price: 11800000, desc: "Editing foto resolusi besar dan video 1080p yang lancar.", specs: ["Ryzen 7 5700X", "RTX 4060", "32GB RAM", "SSD 1TB"] },
      { name: "Video 4K", price: 17800000, desc: "Timeline 4K dengan efek dan color grading yang lebih cepat.", specs: ["Ryzen 7 7700", "RTX 4070", "32GB DDR5", "SSD 2TB"] },
      { name: "Studio Kreatif", price: 25400000, desc: "Rendering 3D, motion graphics, dan multi-layer 4K.", specs: ["Ryzen 9 / Core i9", "RTX 4070 Ti", "64GB DDR5", "AIO 360mm"] },
    ],
  },
  streaming: {
    label: "Streaming",
    icon: "i-headset",
    tiers: [
      { name: "Streaming Ringan", price: 8900000, desc: "Streaming 720p sambil main game e-sports.", specs: ["Ryzen 5 5600", "RTX 3050", "16GB RAM", "Capture ready"] },
      { name: "Streaming Nyaman", price: 12800000, desc: "Stream 1080p60 sambil gaming tanpa frame drop.", specs: ["Ryzen 7 5700X", "RTX 4060", "32GB RAM", "SSD 1TB"] },
      { name: "Streaming Pro", price: 18200000, desc: "Multi-platform streaming, editing, dan gaming bareng.", specs: ["Ryzen 7 7700", "RTX 4070", "32GB DDR5", "SSD 2TB"] },
      { name: "Studio Stream", price: 24900000, desc: "Setup lengkap untuk produksi konten harian.", specs: ["Ryzen 9", "RTX 4070 Ti", "64GB DDR5", "AIO + capture card"] },
    ],
  },
};

function initBuilder() {
  const range = $("#budgetRange");
  const valueEl = $("#budgetValue");
  const usecaseBtns = $$("#usecaseGroup .usecase__btn");
  const btnContinue = $("#builderWa");
  let usecase = "kerja";

  const fillRange = () => {
    const pct = ((range.value - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--p", `${pct}%`);
  };

  const pickTier = (tiers, budget) => {
    let chosen = tiers[0];
    tiers.forEach((t) => { if (t.price <= budget) chosen = t; });
    return chosen;
  };

  const render = () => {
    const budget = Number(range.value);
    const data = BUILDS[usecase];
    const tier = pickTier(data.tiers, budget);
    valueEl.textContent = rupiah(budget);

    const badge = $("#resultBadge");
    badge.textContent = data.label;
    $("#resultIcon").innerHTML = `<svg class="ico"><use href="#${data.icon}"/></svg>`;
    $("#resultName").textContent = tier.name;
    $("#resultDesc").textContent = tier.desc;
    $("#resultSpecs").innerHTML = tier.specs.map((s) => `<span>${s}</span>`).join("");
    $("#resultPrice").textContent = rupiah(tier.price);

    const diff = budget - tier.price;
    let note = "Pas dengan budgetmu.";
    if (diff < 0) note = `Perlu tambahan ${rupiah(Math.abs(diff))} — atau pilih spek yang lebih hemat.`;
    else if (diff >= 1500000) note = `Sisa ${rupiah(diff)} bisa dialokasikan ke monitor atau aksesoris.`;
    $("#resultNote").textContent = note;

    const msg = `Halo Komputer Utama! Saya tertarik ${tier.name} (${data.label}), estimasi ${rupiah(tier.price)}. Spek: ${tier.specs.join(", ")}. Bisa dibantu?`;
    btnContinue.dataset.waText = msg;
    btnContinue.href = waLink(msg);
  };

  range.addEventListener("input", () => { fillRange(); render(); });
  usecaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      usecaseBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      usecase = btn.dataset.usecase;
      render();
    });
  });

  fillRange();
  render();
}

/* =========================================================
   TESTIMONI SLIDER
   ========================================================= */
function initSlider() {
  const slider = $("#testimonialSlider");
  const track = $("#testiTrack");
  const dotsWrap = $("#testiDots");
  const slides = $$(".testi", track);
  if (!slides.length) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Testimoni ${i + 1}`);
    dot.addEventListener("click", () => { go(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  const dots = $$("button", dotsWrap);

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => {
      d.classList.toggle("is-active", di === index);
      d.setAttribute("aria-selected", di === index ? "true" : "false");
    });
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }
  function restart() {
    clearInterval(timer);
    if (!reduced) timer = setInterval(next, 6500);
  }

  $("#nextTesti").addEventListener("click", () => { next(); restart(); });
  $("#prevTesti").addEventListener("click", () => { prev(); restart(); });
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", restart);
  slider.setAttribute("aria-roledescription", "carousel");
  track.setAttribute("aria-live", "polite");

  let startX = null;
  slider.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) { delta < 0 ? next() : prev(); restart(); }
    startX = null;
  }, { passive: true });

  go(0);
  restart();
}

/* =========================================================
   TEMA, HEADER, SCROLL, REVEAL
   ========================================================= */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  state.theme = theme;
  store.set("ku_theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f5f8fd" : "#070b16");
}

function initUI() {
  applyTheme(state.theme === "light" ? "light" : "dark");

  $("#themeToggle").addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
  });

  // Header & scroll progress
  const header = $("#siteHeader");
  const toTop = $("#toTop");
  const bar = $("#scrollBar");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    toTop.classList.toggle("is-visible", y > 620);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Mobile nav
  const navToggle = $("#navToggle");
  const closeNav = () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$("#mobileNav a").forEach((a) => a.addEventListener("click", closeNav));
  window.addEventListener("resize", () => { if (window.innerWidth > 1024) closeNav(); });

  // Esc global
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (modal.classList.contains("is-open")) closeModal();
    else if (cartDrawer.classList.contains("is-open")) closeDrawer();
    else closeNav();
  });

  // Nav link active state
  const sections = ["layanan", "produk", "rakitan", "promo", "kontak"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$(".nav__link").forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => navObserver.observe(s));
  }

  // Reveal on scroll
  const revealEls = $$("[data-reveal]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("reveal", "is-in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    revealEls.forEach((el) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", el.dataset.delay || 0);
      io.observe(el);
    });
  }

  // Animated counters
  const counters = $$("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString("id-ID") + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && !reduced) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => countObserver.observe(el));
  }

  // Footer year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

/* =========================================================
   INIT
   ========================================================= */
function refreshWa() {
  $$(".js-wa").forEach((a) => {
    const text = a.dataset.waText || "Halo Komputer Utama! Saya mau konsultasi.";
    a.href = waLink(text);
  });
}

function init() {
  initUI();
  renderProducts();
  syncFilterCounts();
  renderCart();
  initBuilder();
  initSlider();
  initForm();
  refreshWa();

  // Filters & search
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    state.filter = chip.dataset.filter;
    renderProducts();
  });
  $("#productSearch").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderProducts();
  });
  $("#resetSearch").addEventListener("click", () => {
    state.search = "";
    state.filter = "all";
    $("#productSearch").value = "";
    $$(".chip").forEach((c) => c.classList.toggle("is-active", c.dataset.filter === "all"));
    renderProducts();
  });

  // Cart open / close
  $("#cartOpen").addEventListener("click", openDrawer);
  $$("[data-cart-close]").forEach((el) => el.addEventListener("click", closeDrawer));
  $("#checkoutBtn").addEventListener("click", checkout);

  // Drawer quantity controls
  cartItemsEl.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-cart-inc]");
    const dec = e.target.closest("[data-cart-dec]");
    const rem = e.target.closest("[data-cart-remove]");
    if (inc) {
      state.cart[inc.dataset.cartInc] = (state.cart[inc.dataset.cartInc] || 0) + 1;
      renderCart();
    } else if (dec) {
      const id = dec.dataset.cartDec;
      state.cart[id] = (state.cart[id] || 0) - 1;
      if (state.cart[id] <= 0) delete state.cart[id];
      renderCart();
    } else if (rem) {
      delete state.cart[rem.dataset.cartRemove];
      renderCart();
      toast("Produk dihapus dari keranjang");
    }
  });

  // Modal
  $$("[data-modal-close]").forEach((el) => el.addEventListener("click", closeModal));

  // Delegated: open product / add to cart
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-product]");
    if (openBtn) {
      openModal(openBtn.dataset.openProduct);
      return;
    }
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addToCart(addBtn.dataset.add, addBtn);
    }
  });

  // Re-render WA links for dynamically inserted content
  const observer = new MutationObserver(refreshWa);
  observer.observe(modalContent, { childList: true, subtree: false });

  // Dynamic hostname note (tidak wajib)
  if (location.protocol === "file:") {
    console.info("Demo_webtokocumputama — mode file lokal aktif.");
  }
}

document.addEventListener("DOMContentLoaded", init);

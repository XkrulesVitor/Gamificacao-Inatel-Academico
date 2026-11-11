// Gera os ícones do PWA a partir de um SVG desenhado aqui mesmo.
// Uso: node scripts/gerar-icones.mjs
//
// Saídas:
//   public/icons/icon.svg            (fonte, 512x512, cantos arredondados)
//   public/icons/icon-192.png        (192x192, cantos arredondados, com transparência)
//   public/icons/icon-512.png        (512x512, cantos arredondados, com transparência)
//   public/icons/maskable-512.png    (512x512, fundo cheio, símbolo na zona segura de 80%)
//   public/icons/apple-touch-icon.png (180x180, fundo cheio, sem transparência)
//   src/app/favicon.ico              (ICO com PNGs de 16, 32 e 48 px)

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ICONS_DIR = path.join(ROOT, "public", "icons");
const FAVICON_PATH = path.join(ROOT, "src", "app", "favicon.ico");

const NAVY = "#1d3b5a";
const BLUE = "#0b63d6";
const GOLD = "#f5b301";
const GOLD_LIGHT = "#ffd34d";
const GOLD_DARK = "#c98a00";

// Estrela de 5 pontas (centro cx, cy) usada no bojo do troféu.
function star(cx, cy, outer, inner) {
  const pts = [];
  for (let k = 0; k < 10; k++) {
    const angle = -Math.PI / 2 + (k * Math.PI) / 5;
    const r = k % 2 === 0 ? outer : inner;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)} ${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

// Troféu desenhado em um espaço 512x512, centralizado em (256, 246) e escalado
// em torno do centro da arte (256, 256).
function trophy(scale) {
  return `
  <g transform="translate(256 256) scale(${scale}) translate(-256 -246)">
    <path d="M176 150 C120 150 116 236 186 244" fill="none" stroke="${GOLD}" stroke-width="22" stroke-linecap="round"/>
    <path d="M336 150 C392 150 396 236 326 244" fill="none" stroke="${GOLD}" stroke-width="22" stroke-linecap="round"/>
    <path d="M170 110 H342 V200 C342 262 302 300 256 300 C210 300 170 262 170 200 Z" fill="${GOLD}"/>
    <rect x="236" y="300" width="40" height="60" fill="${GOLD}"/>
    <rect x="186" y="358" width="140" height="38" rx="12" fill="${GOLD}"/>
    <rect x="152" y="96" width="208" height="28" rx="10" fill="${GOLD_LIGHT}"/>
    <path d="M186 196 H326" stroke="${GOLD_DARK}" stroke-width="10" stroke-linecap="round"/>
    <path d="${star(256, 226, 40, 16)}" fill="${NAVY}"/>
  </g>`;
}

function svgRounded() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${BLUE}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" ry="112" fill="url(#bg)"/>${trophy(0.92)}
</svg>
`;
}

// Fundo cheio (sem cantos transparentes), para maskable e apple-touch-icon.
function svgFullBleed(scale) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${BLUE}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>${trophy(scale)}
</svg>
`;
}

async function renderPng(svg, size, { flatten = false } = {}) {
  let img = sharp(Buffer.from(svg), { density: 288 }).resize(size, size);
  if (flatten) img = img.flatten({ background: NAVY });
  return img.png({ compressionLevel: 9 }).toBuffer();
}

// Monta um .ico com entradas PNG (suportado por navegadores modernos).
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + 16 * entries.length;
  entries.forEach((e, i) => {
    const base = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, base);
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, base + 1);
    dir.writeUInt8(0, base + 2);
    dir.writeUInt8(0, base + 3);
    dir.writeUInt16LE(1, base + 4);
    dir.writeUInt16LE(32, base + 6);
    dir.writeUInt32LE(e.data.length, base + 8);
    dir.writeUInt32LE(offset, base + 12);
    offset += e.data.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}

async function main() {
  await mkdir(ICONS_DIR, { recursive: true });

  const roundedSvg = svgRounded();
  await writeFile(path.join(ICONS_DIR, "icon.svg"), roundedSvg, "utf8");

  const outputs = [
    ["icon-192.png", await renderPng(roundedSvg, 192)],
    ["icon-512.png", await renderPng(roundedSvg, 512)],
    ["maskable-512.png", await renderPng(svgFullBleed(0.7), 512, { flatten: true })],
    ["apple-touch-icon.png", await renderPng(svgFullBleed(0.8), 180, { flatten: true })],
  ];
  for (const [name, buf] of outputs) {
    await writeFile(path.join(ICONS_DIR, name), buf);
    const meta = await sharp(buf).metadata();
    console.log(`${name}: ${meta.width}x${meta.height} (${meta.format}, alpha=${meta.hasAlpha ? "sim" : "nao"})`);
  }

  const icoEntries = [];
  for (const size of [16, 32, 48]) {
    icoEntries.push({ size, data: await renderPng(roundedSvg, size) });
  }
  await writeFile(FAVICON_PATH, buildIco(icoEntries));
  console.log(`favicon.ico: entradas ${icoEntries.map((e) => e.size).join(", ")} px`);
}

main().catch((err) => {
  console.error("Falha ao gerar ícones:", err);
  process.exit(1);
});

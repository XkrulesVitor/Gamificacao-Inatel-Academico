// Gera os ícones do PWA a partir de um SVG desenhado aqui mesmo: um A branco sobre azul.
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

const BLUE = "#1a63c4";

// "A" de Acadêmico desenhado como forma (não depende de fonte), em um espaço 512x512.
// Hastes paralelas com topo reto, barra horizontal e contraforma triangular (evenodd).
function letraA(scale) {
  return `
  <g transform="translate(256 256) scale(${scale}) translate(-256 -256)">
    <path fill-rule="evenodd" fill="#ffffff" d="M224 112 H288 L392 400 H326 L303 334 H209 L186 400 H120 Z M229 280 H283 L256 206 Z"/>
  </g>`;
}

function svgRounded() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" ry="112" fill="${BLUE}"/>${letraA(0.92)}
</svg>
`;
}

// Fundo cheio (sem cantos transparentes), para maskable e apple-touch-icon.
function svgFullBleed(scale) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BLUE}"/>${letraA(scale)}
</svg>
`;
}

async function renderPng(svg, size, { flatten = false } = {}) {
  let img = sharp(Buffer.from(svg), { density: 288 }).resize(size, size);
  if (flatten) img = img.flatten({ background: BLUE });
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

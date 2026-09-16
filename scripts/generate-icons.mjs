/**
 * Generates the PWA icons from code - no image dependency, no binary assets
 * committed that nobody can regenerate.
 *
 * Mark: solid LibLearn green field, white "L" stem, Liberian Gold foot.
 * The field is full-bleed so the same file works as a maskable icon: Android
 * can crop it to any shape without clipping the letterform, which sits inside
 * the inner 60%.
 */
import {deflateSync} from 'node:zlib';
import {writeFileSync} from 'node:fs';

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

const crc32 = (buf) => {
  let c = -1;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};

const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const GREEN = hex('#006e24');
const WHITE = hex('#ffffff');
const GOLD = hex('#f4b942');

function render(size) {
  // RGB scanlines, each prefixed with filter byte 0 (None).
  const raw = Buffer.alloc(size * (size * 3 + 1));
  const inBox = (v, lo, hi) => v >= lo * size && v < hi * size;

  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0;
    for (let x = 0; x < size; x++) {
      let rgb = GREEN;
      // Stem of the L.
      if (inBox(x, 0.36, 0.47) && inBox(y, 0.30, 0.72)) rgb = WHITE;
      // Foot of the L, in gold.
      if (inBox(x, 0.36, 0.66) && inBox(y, 0.63, 0.72)) rgb = GOLD;
      raw[p++] = rgb[0];
      raw[p++] = rgb[1];
      raw[p++] = rgb[2];
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // colour type: truecolour
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // adaptive filtering
  ihdr[12] = 0; // no interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, {level: 9})),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const size of [192, 512]) {
  const out = `public/icon-${size}.png`;
  writeFileSync(out, render(size));
  console.log(`wrote ${out}`);
}

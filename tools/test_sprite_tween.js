// node tools/test_sprite_tween.js
// Pass --preview to also write /tmp/sprite-tween-preview.png
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const { execFileSync } = require('child_process');
const T = require('./sprite-tween/tween.js');

let fails = 0;
function ok(cond, msg) {
  if (!cond) {
    console.error('FAIL: ' + msg);
    fails++;
  }
}

function eq(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function shift(src, w, h, dx, dy) {
  const out = T.blank(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (src[i + 3] < 128) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const j = (ny * w + nx) * 4;
      out[j] = src[i];
      out[j + 1] = src[i + 1];
      out[j + 2] = src[i + 2];
      out[j + 3] = 255;
    }
  }
  return out;
}

function rect(w, h, x, y, rw, rh, color) {
  const p = T.blank(w, h);
  T.paintRect(p, w, x, y, rw, rh, color);
  return p;
}

function colorsOf(rgba) {
  const s = new Set();
  for (let i = 0; i < rgba.length; i += 4) {
    if (rgba[i + 3] < 128) continue;
    s.add(rgba[i] | (rgba[i + 1] << 8) | (rgba[i + 2] << 16));
  }
  return s;
}

function countColor(rgba, color) {
  let n = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    if (rgba[i + 3] < 128) continue;
    const c = rgba[i] | (rgba[i + 1] << 8) | (rgba[i + 2] << 16);
    if (c === color) n++;
  }
  return n;
}

function opaque(rgba) {
  let n = 0;
  for (let i = 3; i < rgba.length; i += 4) if (rgba[i] >= 128) n++;
  return n;
}

const W = 16;
const H = 16;
const red = T.rgb(200, 40, 40);
const blue = T.rgb(40, 80, 200);

// Identical drawings stay put.
{
  const src = rect(W, H, 2, 2, 3, 3, red);
  ok(eq(T.frameAt(src, src, W, H, 0), src), 't=0 reproduces the start');
  ok(eq(T.frameAt(src, src, W, H, 1), src), 't=1 reproduces the end when nothing moved');
  const mids = T.inbetweens(src, src, W, H, 3, 'linear');
  ok(mids.length === 3, 'three in-betweens');
  mids.forEach(function (m, i) { ok(eq(m, src), 'identical frame ' + i); });
}

// A translated block slides. Centroid alignment keeps it from dissolving in the overlap.
{
  const src = rect(W, H, 1, 1, 3, 3, red);
  const dst = shift(src, W, H, 4, 1);
  ok(eq(T.frameAt(src, dst, W, H, 0), src), 'slide t=0 is the start');
  ok(eq(T.frameAt(src, dst, W, H, 1), dst), 'slide t=1 is the end');
  const mids = T.inbetweens(src, dst, W, H, 3, 'linear');
  // 4px and 1px over four steps: t = 1/4, 1/2, 3/4.
  ok(eq(mids[0], shift(src, W, H, 1, 0)), 'first step is (1, 0)');
  ok(eq(mids[1], shift(src, W, H, 2, 1)), 'second step is (2, 1)');
  ok(eq(mids[2], shift(src, W, H, 3, 1)), 'third step is (3, 1)');
  mids.forEach(function (m, i) { ok(opaque(m) === 9, 'slide keeps 9 pixels at ' + i); });
}

// Smoothstep lags behind linear on the first step of a long slide.
{
  const src = rect(W, H, 1, 2, 2, 2, red);
  const dst = shift(src, W, H, 8, 0);
  const linear = T.inbetweens(src, dst, W, H, 3, 'linear')[0];
  const smooth = T.inbetweens(src, dst, W, H, 3, 'smooth')[0];
  ok(eq(linear, shift(src, W, H, 2, 0)), 'linear first step moves 2px');
  ok(eq(smooth, shift(src, W, H, 1, 0)), 'smooth first step moves 1px');
}

// Colors travel. They do not blend into a third color, and they do not swap hues.
{
  const src = T.blank(W, H);
  const dst = T.blank(W, H);
  T.paintRect(src, W, 1, 4, 1, 1, red);
  T.paintRect(src, W, 8, 4, 1, 1, blue);
  T.paintRect(dst, W, 8, 4, 1, 1, red);
  T.paintRect(dst, W, 1, 4, 1, 1, blue);
  const mid = T.frameAt(src, dst, W, H, 0.5);
  const have = colorsOf(mid);
  ok(have.has(red) && have.has(blue), 'both colors survive the cross');
  ok(have.size === 2, 'no mixed color appears');
  ok(countColor(mid, red) === 1 && countColor(mid, blue) === 1, 'one pixel of each color');
  ok(opaque(mid) === 2, 'crossing pixels both land');
}

// Extra pixels of a new color appear across the gap and are all present at the end.
{
  const src = T.blank(W, H);
  const dst = rect(W, H, 2, 2, 4, 1, blue);
  ok(eq(T.frameAt(src, dst, W, H, 0), src), 'birth t=0 is empty');
  ok(eq(T.frameAt(src, dst, W, H, 1), dst), 'birth t=1 is the full bar');
  ok(countColor(T.frameAt(src, dst, W, H, 0.5), blue) === 2, 'half the new pixels are in at t=0.5');
}

// A locked middle drawing is kept, and the open frames rebuild around it.
{
  const src = rect(W, H, 0, 0, 1, 1, red);
  const dst = rect(W, H, 6, 0, 1, 1, red);
  const mids = T.inbetweens(src, dst, W, H, 3, 'linear');
  const frames = [src, mids[0], mids[1], mids[2], dst];
  const locked = [true, false, true, false, true];
  const pinned = rect(W, H, 0, 5, 1, 1, red);
  frames[2] = pinned;
  const kept = pinned.slice();
  T.retweenUnlocked(frames, locked, W, H, 'linear');
  ok(eq(frames[2], kept), 'pinned frame is not overwritten');
  ok(eq(frames[0], src) && eq(frames[4], dst), 'end keys stay');
  // Halfway from (0,0) to (0,5) is (0, 2.5) -> (0, 3). One open frame on that side, t=0.5.
  ok(eq(frames[1], rect(W, H, 0, 3, 1, 1, red)), 'open frame before the pin heads toward it');
  // From (0,5) to (6,0): one open frame, t=0.5 -> (3, 2.5) -> (3, 3).
  ok(eq(frames[3], rect(W, H, 3, 3, 1, 1, red)), 'open frame after the pin leaves it toward the end');
}

// The example arm moves up and the shirt stays.
{
  const ex = T.examplePoses();
  const sleeve = T.rgb(240, 196, 64);
  const shirt = T.rgb(72, 128, 176);
  ok(eq(T.frameAt(ex.start, ex.end, ex.w, ex.h, 0), ex.start), 'example start holds');
  ok(eq(T.frameAt(ex.start, ex.end, ex.w, ex.h, 1), ex.end), 'example end holds');
  const mids = T.inbetweens(ex.start, ex.end, ex.w, ex.h, 5, 'linear');
  let prevY = 99;
  mids.forEach(function (m, i) {
    ok(countColor(m, sleeve) === 10, 'sleeve keeps its pixels at ' + i);
    ok(countColor(m, shirt) === 36, 'shirt stays at ' + i);
    let y = 0;
    let n = 0;
    for (let p = 0; p < m.length; p += 4) {
      if (m[p + 3] < 128) continue;
      const c = m[p] | (m[p + 1] << 8) | (m[p + 2] << 16);
      if (c !== sleeve) continue;
      y += Math.floor((p / 4) / ex.w);
      n++;
    }
    const cy = y / n;
    ok(cy < prevY, 'sleeve rises at frame ' + i + ' (' + cy + ')');
    prevY = cy;
  });
  const allowed = colorsOf(ex.start);
  colorsOf(ex.end).forEach(function (c) { allowed.add(c); });
  mids.forEach(function (m, i) {
    colorsOf(m).forEach(function (c) {
      ok(allowed.has(c), 'no new color at example frame ' + i);
    });
  });
}

// Blocky exports (a 1× drawing saved at 4×) collapse back to the pixel grid.
{
  const small = T.blank(4, 4);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      T.paintRect(small, 4, x, y, 1, 1, ((x + y) & 1) ? red : blue);
    }
  }
  const big = T.blank(16, 16);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const si = (y * 4 + x) * 4;
      T.paintRect(big, 16, x * 4, y * 4, 4, 4, small[si] | (small[si + 1] << 8) | (small[si + 2] << 16));
    }
  }
  ok(T.detectScale(big, 16, 16) === 4, 'detects 4× blocks');
  ok(T.detectScale(small, 4, 4) === 1, 'a real 4×4 checker is left alone');
  const down = T.downscale(big, 16, 16, 4);
  ok(down.w === 4 && down.h === 4 && eq(down.rgba, small), 'downscale recovers the pixels');
}

// A large flat region still reproduces both ends (it takes the fast matcher).
{
  const w = 40;
  const h = 40;
  const src = T.blank(w, h);
  const dst = T.blank(w, h);
  for (let i = 0; i < w * h; i++) {
    if ((i * 17) % 10 > 6) continue;
    const x = i % w;
    const y = (i / w) | 0;
    const c = ((i * 13) % 5) * 40;
    T.paintRect(src, w, x, y, 1, 1, T.rgb(c, 80, 120));
    T.paintRect(dst, w, (x + 3) % w, y, 1, 1, T.rgb(c, 80, 120));
  }
  const t0 = Date.now();
  ok(eq(T.frameAt(src, dst, w, h, 0), src), 'large start holds');
  ok(eq(T.frameAt(src, dst, w, h, 1), dst), 'large end holds');
  ok(Date.now() - t0 < 3000, 'large match finishes promptly');
}

// Zip of frame files round-trips through Python's zipfile.
{
  const zip = T.zipStore([
    { name: 'frame_00.png', data: new Uint8Array([137, 80, 78, 71, 1, 2, 3, 4]) },
    { name: 'frame_01.png', data: new Uint8Array([9, 8, 7, 6, 5]) },
  ]);
  const file = path.join(os.tmpdir(), 'sprite-tween-test.zip');
  fs.writeFileSync(file, zip);
  const listed = execFileSync('python3', ['-c', [
    'import zipfile,sys',
    'z=zipfile.ZipFile(sys.argv[1])',
    'z.testzip()',
    'print(",".join(z.namelist()))',
    'print(z.read("frame_01.png").hex())',
  ].join('\n'), file], { encoding: 'utf8' });
  ok(listed.indexOf('frame_00.png,frame_01.png') !== -1, 'zip lists both frames');
  ok(listed.indexOf('0908070605') !== -1, 'zip stores the second frame');
  fs.unlinkSync(file);
}

if (process.argv.indexOf('--preview') !== -1) writePreview();

if (fails) {
  console.error(fails + ' failed');
  process.exit(1);
}
console.log('sprite tween ok');

function writePreview() {
  const rows = [];
  const ex = T.examplePoses();
  rows.push(strip([ex.start].concat(T.inbetweens(ex.start, ex.end, ex.w, ex.h, 5, 'linear'), [ex.end]), ex.w, ex.h));

  const block = rect(16, 16, 1, 1, 3, 3, red);
  const moved = shift(block, 16, 16, 4, 1);
  rows.push(strip([block].concat(T.inbetweens(block, moved, 16, 16, 3, 'linear'), [moved]), 16, 16));

  const sheet = stack(rows, 8);
  fs.writeFileSync('/tmp/sprite-tween-preview.png', png(sheet.rgba, sheet.w, sheet.h));
  console.log('wrote /tmp/sprite-tween-preview.png');
}

function strip(frames, w, h) {
  const gap = 2;
  const sw = frames.length * w + (frames.length - 1) * gap;
  const out = new Uint8Array(sw * h * 4);
  for (let i = 0; i < out.length; i += 4) {
    out[i] = 28;
    out[i + 1] = 27;
    out[i + 2] = 25;
    out[i + 3] = 255;
  }
  frames.forEach(function (f, n) {
    const ox = n * (w + gap);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y * w + x) * 4;
        if (f[si + 3] < 128) continue;
        const di = (y * sw + (ox + x)) * 4;
        out[di] = f[si];
        out[di + 1] = f[si + 1];
        out[di + 2] = f[si + 2];
        out[di + 3] = 255;
      }
    }
  });
  return { rgba: out, w: sw, h: h };
}

function stack(rows, scale) {
  const gap = 3;
  let w = 0;
  let h = 0;
  const scaled = rows.map(function (row) {
    const s = scaleNearest(row.rgba, row.w, row.h, scale);
    if (s.w > w) w = s.w;
    h += s.h + gap;
    return s;
  });
  h -= gap;
  const out = new Uint8Array(w * h * 4);
  for (let i = 0; i < out.length; i += 4) {
    out[i] = 18;
    out[i + 1] = 17;
    out[i + 2] = 16;
    out[i + 3] = 255;
  }
  let y0 = 0;
  scaled.forEach(function (s) {
    for (let y = 0; y < s.h; y++) {
      for (let x = 0; x < s.w; x++) {
        const si = (y * s.w + x) * 4;
        const di = ((y0 + y) * w + x) * 4;
        out[di] = s.rgba[si];
        out[di + 1] = s.rgba[si + 1];
        out[di + 2] = s.rgba[si + 2];
        out[di + 3] = 255;
      }
    }
    y0 += s.h + gap;
  });
  return { rgba: out, w: w, h: h };
}

function scaleNearest(rgba, w, h, scale) {
  const sw = w * scale;
  const sh = h * scale;
  const out = new Uint8Array(sw * sh * 4);
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const si = ((y / scale | 0) * w + (x / scale | 0)) * 4;
      const di = (y * sw + x) * 4;
      out[di] = rgba[si];
      out[di + 1] = rgba[si + 1];
      out[di + 2] = rgba[si + 2];
      out[di + 3] = rgba[si + 3];
    }
  }
  return { rgba: out, w: sw, h: sh };
}

function png(rgba, w, h) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    const row = y * (w * 4 + 1);
    raw[row] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + y * w * 4, w * 4).copy(raw, row + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32buf(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

function crc32buf(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c) >>> 0;
}

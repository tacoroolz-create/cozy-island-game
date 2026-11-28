// Sprite tween. Flash called this a shape tween: the in-between frames are
// filled by sliding each pixel toward a pixel of the same color. Positions are
// snapped back onto the grid, so no new colors appear.
//
// Matching is done in centroid-aligned space. A pose that only shifts then
// slides as a whole, and a pose that changes shape morphs from its own middle
// instead of dissolving where the two drawings overlap.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.SpriteTween = api;
})(typeof globalThis !== 'undefined' ? globalThis : null, function () {
  'use strict';

  // Full pair list is fine up to this many candidate pairs. Larger single-color
  // regions (a big flat fill) use a faster spatial sort instead.
  const PAIR_LIMIT = 700000;
  const SPIRAL = makeSpiral(1);

  function rgb(r, g, b) {
    return (r & 255) | ((g & 255) << 8) | ((b & 255) << 16);
  }

  function blank(w, h) {
    return new Uint8Array(w * h * 4);
  }

  function paintRect(rgba, w, x, y, rw, rh, color) {
    const h = (rgba.length / 4) / w;
    const x1 = Math.max(0, x);
    const y1 = Math.max(0, y);
    const x2 = Math.min(w, x + rw);
    const y2 = Math.min(h, y + rh);
    const r = color & 255;
    const g = (color >> 8) & 255;
    const b = (color >> 16) & 255;
    for (let yy = y1; yy < y2; yy++) {
      for (let xx = x1; xx < x2; xx++) {
        const i = (yy * w + xx) * 4;
        rgba[i] = r;
        rgba[i + 1] = g;
        rgba[i + 2] = b;
        rgba[i + 3] = 255;
      }
    }
  }

  function readPixels(rgba, w, h) {
    const out = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        if (rgba[i + 3] < 128) continue;
        out.push({
          x: x,
          y: y,
          color: rgba[i] | (rgba[i + 1] << 8) | (rgba[i + 2] << 16),
        });
      }
    }
    return out;
  }

  function centroid(pts) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < pts.length; i++) {
      x += pts[i].x;
      y += pts[i].y;
    }
    const n = pts.length || 1;
    return { x: x / n, y: y / n };
  }

  function dist2(p, q) {
    const dx = p.x - q.x;
    const dy = p.y - q.y;
    return dx * dx + dy * dy;
  }

  function nearest(p, list) {
    let best = list[0];
    let bestD = Infinity;
    for (let i = 0; i < list.length; i++) {
      const d = dist2(p, list[i]);
      if (d < bestD) {
        bestD = d;
        best = list[i];
      }
    }
    return best;
  }

  function assign(A, B) {
    const n = A.length;
    const m = B.length;
    const usedA = new Uint8Array(n);
    const usedB = new Uint8Array(m);
    const pairs = [];
    if (n === 0 || m === 0) return { pairs: pairs, usedA: usedA, usedB: usedB };
    const count = n < m ? n : m;
    if (n * m > PAIR_LIMIT) return sortMerge(A, B, usedA, usedB, count);

    const edges = new Array(n * m);
    let e = 0;
    for (let i = 0; i < n; i++) {
      const ax = A[i].x;
      const ay = A[i].y;
      for (let j = 0; j < m; j++) {
        const dx = ax - B[j].x;
        const dy = ay - B[j].y;
        edges[e++] = { d: dx * dx + dy * dy, i: i, j: j };
      }
    }
    edges.sort(function (p, q) {
      return p.d - q.d || p.i - q.i || p.j - q.j;
    });
    for (let k = 0; k < edges.length && pairs.length < count; k++) {
      const edge = edges[k];
      if (usedA[edge.i] || usedB[edge.j]) continue;
      usedA[edge.i] = 1;
      usedB[edge.j] = 1;
      pairs.push([edge.i, edge.j]);
    }
    return { pairs: pairs, usedA: usedA, usedB: usedB };
  }

  function sortMerge(A, B, usedA, usedB, count) {
    function order(pts) {
      const idx = pts.map(function (_, i) { return i; });
      idx.sort(function (i, j) {
        return pts[i].x - pts[j].x || pts[i].y - pts[j].y || i - j;
      });
      return idx;
    }
    const ao = order(A);
    const bo = order(B);
    const pairs = [];
    for (let k = 0; k < count; k++) {
      usedA[ao[k]] = 1;
      usedB[bo[k]] = 1;
      pairs.push([ao[k], bo[k]]);
    }
    return { pairs: pairs, usedA: usedA, usedB: usedB };
  }

  function matchColor(color, A, B, travels) {
    const ca = A.length ? centroid(A) : centroid(B);
    const cb = B.length ? centroid(B) : ca;
    const dx = cb.x - ca.x;
    const dy = cb.y - ca.y;
    const aligned = new Array(A.length);
    for (let i = 0; i < A.length; i++) {
      aligned[i] = { x: A[i].x + dx, y: A[i].y + dy };
    }
    const match = assign(aligned, B);
    const matchedA = [];
    const matchedB = [];
    for (let p = 0; p < match.pairs.length; p++) {
      const i = match.pairs[p][0];
      const j = match.pairs[p][1];
      travels.push({
        kind: 'move',
        color: color,
        x0: A[i].x,
        y0: A[i].y,
        x1: B[j].x,
        y1: B[j].y,
      });
      matchedA.push(A[i]);
      matchedB.push(B[j]);
    }

    const dead = [];
    for (let i = 0; i < A.length; i++) if (!match.usedA[i]) dead.push(A[i]);
    const born = [];
    for (let j = 0; j < B.length; j++) if (!match.usedB[j]) born.push(B[j]);

    // Outer pixels leave first. Inner holes fill first.
    dead.sort(function (p, q) { return dist2(q, ca) - dist2(p, ca); });
    born.sort(function (p, q) { return dist2(p, cb) - dist2(q, cb); });

    for (let i = 0; i < dead.length; i++) {
      const p = dead[i];
      const sink = matchedB.length ? nearest(p, matchedB) : p;
      travels.push({
        kind: 'die',
        color: color,
        x0: p.x,
        y0: p.y,
        x1: sink.x,
        y1: sink.y,
        until: (i + 1) / (dead.length + 1),
      });
    }
    for (let i = 0; i < born.length; i++) {
      const p = born[i];
      const src = matchedA.length ? nearest(p, matchedA) : p;
      travels.push({
        kind: 'born',
        color: color,
        x0: src.x,
        y0: src.y,
        x1: p.x,
        y1: p.y,
        from: (i + 1) / (born.length + 1),
      });
    }
  }

  function plan(srcPx, dstPx) {
    const groups = new Map();
    function group(color) {
      let g = groups.get(color);
      if (!g) {
        g = { a: [], b: [] };
        groups.set(color, g);
      }
      return g;
    }
    for (let i = 0; i < srcPx.length; i++) group(srcPx[i].color).a.push(srcPx[i]);
    for (let i = 0; i < dstPx.length; i++) group(dstPx[i].color).b.push(dstPx[i]);
    const travels = [];
    groups.forEach(function (g, color) {
      matchColor(color, g.a, g.b, travels);
    });
    return travels;
  }

  function sample(tr, t) {
    if (tr.kind === 'move') {
      return {
        x: tr.x0 + (tr.x1 - tr.x0) * t,
        y: tr.y0 + (tr.y1 - tr.y0) * t,
      };
    }
    if (tr.kind === 'die') {
      if (t >= tr.until) return null;
      const u = t / tr.until;
      return {
        x: tr.x0 + (tr.x1 - tr.x0) * u,
        y: tr.y0 + (tr.y1 - tr.y0) * u,
      };
    }
    if (t < tr.from) return null;
    const u = (t - tr.from) / (1 - tr.from);
    return {
      x: tr.x0 + (tr.x1 - tr.x0) * u,
      y: tr.y0 + (tr.y1 - tr.y0) * u,
    };
  }

  function makeSpiral(radius) {
    const cells = [];
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) cells.push([dx, dy]);
    }
    cells.sort(function (a, b) {
      const da = a[0] * a[0] + a[1] * a[1];
      const db = b[0] * b[0] + b[1] * b[1];
      return da - db || Math.abs(a[1]) - Math.abs(b[1]) || a[0] - b[0];
    });
    return cells;
  }

  function claim(taken, w, h, x, y) {
    for (let s = 0; s < SPIRAL.length; s++) {
      const nx = x + SPIRAL[s][0];
      const ny = y + SPIRAL[s][1];
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const i = ny * w + nx;
      if (taken[i]) continue;
      taken[i] = 1;
      return { x: nx, y: ny };
    }
    return null;
  }

  function renderPlan(travels, w, h, t) {
    const rgba = new Uint8Array(w * h * 4);
    const visible = [];
    for (let i = 0; i < travels.length; i++) {
      const p = sample(travels[i], t);
      if (!p) continue;
      const ix = Math.round(p.x);
      const iy = Math.round(p.y);
      visible.push({
        i: i,
        ix: ix,
        iy: iy,
        err: Math.abs(p.x - ix) + Math.abs(p.y - iy),
        kind: travels[i].kind,
        color: travels[i].color,
      });
    }
    visible.sort(function (a, b) {
      if (a.kind !== b.kind) return a.kind === 'move' ? -1 : 1;
      return a.err - b.err || a.i - b.i;
    });
    const taken = new Uint8Array(w * h);
    for (let v = 0; v < visible.length; v++) {
      const cell = claim(taken, w, h, visible[v].ix, visible[v].iy);
      if (!cell) continue;
      const i = (cell.y * w + cell.x) * 4;
      const c = visible[v].color;
      rgba[i] = c & 255;
      rgba[i + 1] = (c >> 8) & 255;
      rgba[i + 2] = (c >> 16) & 255;
      rgba[i + 3] = 255;
    }
    return rgba;
  }

  function easing(name) {
    if (name === 'smooth') return function (t) { return t * t * (3 - 2 * t); };
    return function (t) { return t; };
  }

  function frameAt(src, dst, w, h, t) {
    const travels = plan(readPixels(src, w, h), readPixels(dst, w, h));
    return renderPlan(travels, w, h, t);
  }

  // Frames strictly between the two keys. t = i / (count + 1).
  function inbetweens(src, dst, w, h, count, ease) {
    const out = [];
    if (count <= 0) return out;
    const travels = plan(readPixels(src, w, h), readPixels(dst, w, h));
    const ez = easing(ease);
    for (let i = 1; i <= count; i++) {
      out.push(renderPlan(travels, w, h, ez(i / (count + 1))));
    }
    return out;
  }

  // Rewrites every unlocked frame from the locked frames on either side.
  // `frames` entries are replaced. Locked buffers are left as they are.
  function retweenUnlocked(frames, locked, w, h, ease) {
    const ez = easing(ease);
    const locks = [];
    for (let i = 0; i < frames.length; i++) if (locked[i]) locks.push(i);
    for (let s = 0; s < locks.length - 1; s++) {
      const i = locks[s];
      const j = locks[s + 1];
      if (j <= i + 1) continue;
      const travels = plan(readPixels(frames[i], w, h), readPixels(frames[j], w, h));
      for (let k = i + 1; k < j; k++) {
        frames[k] = renderPlan(travels, w, h, ez((k - i) / (j - i)));
      }
    }
  }

  function detectScale(rgba, w, h) {
    const scales = [8, 4, 2];
    for (let s = 0; s < scales.length; s++) {
      const scale = scales[s];
      if (w % scale || h % scale) continue;
      if (w / scale < 2 || h / scale < 2) continue;
      if (isBlocky(rgba, w, h, scale)) return scale;
    }
    return 1;
  }

  function isBlocky(rgba, w, h, scale) {
    for (let y = 0; y < h; y += scale) {
      for (let x = 0; x < w; x += scale) {
        const i0 = (y * w + x) * 4;
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            const i = ((y + dy) * w + (x + dx)) * 4;
            if (rgba[i] !== rgba[i0] || rgba[i + 1] !== rgba[i0 + 1] ||
                rgba[i + 2] !== rgba[i0 + 2] || rgba[i + 3] !== rgba[i0 + 3]) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  function downscale(rgba, w, h, scale) {
    const sw = w / scale;
    const sh = h / scale;
    const out = new Uint8Array(sw * sh * 4);
    for (let y = 0; y < sh; y++) {
      for (let x = 0; x < sw; x++) {
        const si = ((y * scale) * w + (x * scale)) * 4;
        const di = (y * sw + x) * 4;
        out[di] = rgba[si];
        out[di + 1] = rgba[si + 1];
        out[di + 2] = rgba[si + 2];
        out[di + 3] = rgba[si + 3];
      }
    }
    return { rgba: out, w: sw, h: sh };
  }

  function examplePoses() {
    const w = 18;
    const h = 22;
    const skin = rgb(255, 214, 180);
    const hair = rgb(92, 60, 44);
    const shirt = rgb(72, 128, 176);
    const sleeve = rgb(240, 196, 64);
    const pants = rgb(48, 64, 112);
    const shoe = rgb(36, 28, 28);
    const eye = rgb(42, 32, 32);
    function base() {
      const p = blank(w, h);
      paintRect(p, w, 8, 4, 4, 4, skin);
      paintRect(p, w, 8, 2, 4, 2, hair);
      paintRect(p, w, 9, 5, 1, 1, eye);
      paintRect(p, w, 11, 5, 1, 1, eye);
      paintRect(p, w, 7, 8, 6, 6, shirt);
      paintRect(p, w, 8, 14, 2, 4, pants);
      paintRect(p, w, 11, 14, 2, 4, pants);
      paintRect(p, w, 8, 18, 2, 1, shoe);
      paintRect(p, w, 11, 18, 2, 1, shoe);
      return p;
    }
    const start = base();
    paintRect(start, w, 5, 9, 2, 5, sleeve);
    const end = base();
    paintRect(end, w, 5, 3, 2, 5, sleeve);
    return { w: w, h: h, start: start, end: end };
  }

  // Stored (uncompressed) zip. Enough to hand a folder of frames to Pixsplat.
  function zipStore(files) {
    const parts = [];
    const central = [];
    let offset = 0;
    const dosDate = ((2026 - 1980) << 9) | (11 << 5) | 28;
    const dosTime = (12 << 11);
    for (let f = 0; f < files.length; f++) {
      const name = utf8(files[f].name);
      const data = files[f].data;
      const crc = crc32(data);
      const local = new Uint8Array(30 + name.length);
      const view = new DataView(local.buffer);
      view.setUint32(0, 0x04034b50, true);
      view.setUint16(4, 20, true);
      view.setUint16(8, 0, true);
      view.setUint16(10, dosTime, true);
      view.setUint16(12, dosDate, true);
      view.setUint32(14, crc, true);
      view.setUint32(18, data.length, true);
      view.setUint32(22, data.length, true);
      view.setUint16(26, name.length, true);
      local.set(name, 30);
      parts.push(local, data);

      const cen = new Uint8Array(46 + name.length);
      const cv = new DataView(cen.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, dosTime, true);
      cv.setUint16(14, dosDate, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, data.length, true);
      cv.setUint32(24, data.length, true);
      cv.setUint16(28, name.length, true);
      cv.setUint32(42, offset, true);
      cen.set(name, 46);
      central.push(cen);
      offset += local.length + data.length;
    }
    let centralSize = 0;
    for (let i = 0; i < central.length; i++) centralSize += central[i].length;
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, offset, true);
    const out = new Uint8Array(offset + centralSize + 22);
    let p = 0;
    for (let i = 0; i < parts.length; i++) {
      out.set(parts[i], p);
      p += parts[i].length;
    }
    for (let i = 0; i < central.length; i++) {
      out.set(central[i], p);
      p += central[i].length;
    }
    out.set(eocd, p);
    return out;
  }

  function utf8(s) {
    const out = [];
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
      else out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return new Uint8Array(out);
  }

  let crcTable = null;
  function crc32(data) {
    if (!crcTable) {
      crcTable = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        crcTable[n] = c >>> 0;
      }
    }
    let c = 0xffffffff;
    for (let i = 0; i < data.length; i++) c = crcTable[(c ^ data[i]) & 255] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  return {
    rgb: rgb,
    blank: blank,
    paintRect: paintRect,
    inbetweens: inbetweens,
    retweenUnlocked: retweenUnlocked,
    frameAt: frameAt,
    detectScale: detectScale,
    downscale: downscale,
    examplePoses: examplePoses,
    zipStore: zipStore,
  };
});

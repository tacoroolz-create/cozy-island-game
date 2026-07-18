// ===== BITMAP PIXEL FONT =====
// Crisp on/off text for the canvas UI. p5's text() anti-aliases glyphs into the
// 320x192 buffer; the 4x nearest-neighbor upscale then turns those grey edge
// pixels into mud. This blits hard-pixel glyphs from assets/ui/pixelfont.png at
// 1:1 (integer-aligned, source-clipped), so text stays razor sharp.
//
// Atlas is generated from Silkscreen by scratchpad/genfont.py — rerun that if you
// change the source font, and paste the new PF_WIDTHS it prints below.
const PF_CELL_W = 8, PF_CELL_H = 10, PF_COLS = 16, PF_FIRST = 32, PF_LAST = 126;
// Symbol code points appended after ASCII, in genfont.py's SYMBOLS order.
const PF_SYMBOLS = [0x25B6, 0x25B2, 0x25BC, 0x25A0, 0x25A1, 0x2665, 0xB7];
// Per-glyph ink widths (atlas order: ASCII 32..126, then PF_SYMBOLS).
const PF_WIDTHS = [4,3,5,7,6,7,6,3,4,4,7,7,4,5,3,5,6,5,6,6,6,6,6,6,6,6,3,4,5,5,5,6,7,6,6,6,6,5,5,6,6,3,6,6,5,7,7,6,6,6,6,6,5,6,7,7,7,7,5,4,5,4,5,6,4,6,6,6,6,5,5,6,6,3,6,6,5,7,7,6,6,6,6,6,5,6,7,7,7,7,5,5,3,5,6,5,5,5,5,5,5,5];

const PF_ASCENT = 7;        // cap-top -> baseline rows within the 10px cell
let _pfOrigText = null;     // saved p5 text() (set when the global override installs)

function pfGlyphIndex(cp) {
    if (cp >= PF_FIRST && cp <= PF_LAST) return cp - PF_FIRST;
    const si = PF_SYMBOLS.indexOf(cp);
    if (si >= 0) return (PF_LAST - PF_FIRST + 1) + si;
    return '?'.charCodeAt(0) - PF_FIRST; // unknown glyph -> '?'
}

// Rendered width in canvas pixels (glyph inks + 1px gaps between them).
function pixelTextWidth(str, scale = 1) {
    str = String(str);
    if (!str.length) return 0;
    let w = 0;
    for (let i = 0; i < str.length; i++) w += PF_WIDTHS[pfGlyphIndex(str.charCodeAt(i))] + 1;
    return (w - 1) * scale;
}

// Draw crisp bitmap text at (x, y).
// opts: { align:'left'|'center'|'right', valign:'top'|'middle'|'bottom',
//         color:[r,g,b], alpha:0-255, scale:int }
function pixelText(str, x, y, opts = {}) {
    str = String(str);
    const atlas = (typeof SPRITES !== 'undefined') ? SPRITES['ui.pixelfont'] : null;
    const scale = opts.scale || 1;

    // Atlas not loaded yet: fall back to p5 text so nothing disappears mid-load.
    if (!atlas || !atlas.width) {
        push();
        textFont('Courier New');
        textSize(8 * scale);
        textAlign(opts.align === 'center' ? CENTER : opts.align === 'right' ? RIGHT : LEFT,
                  opts.valign === 'middle' ? CENTER : opts.valign === 'bottom' ? BOTTOM : TOP);
        const c = opts.color || [255, 255, 255];
        fill(c[0], c[1], c[2], opts.alpha == null ? 255 : opts.alpha);
        (_pfOrigText || text)(str, x, y);   // saved original: never re-enter the override
        pop();
        return;
    }

    const w = pixelTextWidth(str, scale);
    const h = PF_CELL_H * scale;
    let dx = x;
    if (opts.align === 'center') dx = x - w / 2;
    else if (opts.align === 'right') dx = x - w;
    let dy = y;
    if (opts.valign === 'middle') dy = y - h / 2;
    else if (opts.valign === 'bottom') dy = y - h;
    else if (opts.valign === 'baseline') dy = y - PF_ASCENT * scale;
    dx = Math.round(dx);
    dy = Math.round(dy);

    push();
    const c = opts.color || [255, 255, 255];
    tint(c[0], c[1], c[2], opts.alpha == null ? 255 : opts.alpha);
    let cursor = dx;
    for (let i = 0; i < str.length; i++) {
        const gi = pfGlyphIndex(str.charCodeAt(i));
        const gw = PF_WIDTHS[gi];
        const sx = (gi % PF_COLS) * PF_CELL_W;
        const sy = Math.floor(gi / PF_COLS) * PF_CELL_H;
        // Source-clipped to the glyph's ink width so proportional spacing never
        // bleeds a neighbor's cell. 1:1 (or integer) blit => no interpolation.
        image(atlas, cursor, dy, gw * scale, PF_CELL_H * scale, sx, sy, gw, PF_CELL_H);
        cursor += (gw + 1) * scale;
    }
    noTint();
    pop();
}

// ===== GLOBAL p5 text() OVERRIDE =====
// Route EVERY text() / textWidth() call in the game through the bitmap font, so
// no surface is left fuzzy without editing 130 call sites. We track the current
// textSize/textAlign (the game only ever sets 2-arg alignments, no textLeading/
// textStyle/textWrap) and read the fill colour straight off the canvas at draw
// time. One lever: tune scale/baseline/colour here and it applies game-wide.
const pfState = { size: 12, alignH: 'left', alignV: 'baseline', installed: false };
let _pfOrigTextAlign = null, _pfOrigTextSize = null;

// Bitmap font's natural cell is ~10px; map p5 point sizes to integer scales
// (only integer scaling stays crisp). 12 -> 1 keeps the dialogue box tight.
function pfScaleForSize(size) { return size <= 13 ? 1 : size <= 20 ? 2 : 3; }

// Current fill colour + alpha, parsed from the live canvas state.
function pfCurrentColor() {
    const s = (typeof drawingContext !== 'undefined' && drawingContext) ? drawingContext.fillStyle : null;
    if (typeof s !== 'string') return { rgb: [255, 255, 255], a: 255 };
    if (s[0] === '#') {
        let hex = s.slice(1);
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const n = parseInt(hex, 16);
        return { rgb: [(n >> 16) & 255, (n >> 8) & 255, n & 255], a: 255 };
    }
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (m) {
        const p = m[1].split(',').map(v => parseFloat(v));
        return { rgb: [p[0] || 0, p[1] || 0, p[2] || 0], a: p[3] === undefined ? 255 : Math.round(p[3] * 255) };
    }
    return { rgb: [255, 255, 255], a: 255 };
}

// Word-wrapped box text (the 4-arg text(str,x,y,w,h) form).
function pfDrawWrapped(str, x, y, boxW, scale, col) {
    const lineH = PF_CELL_H * scale + scale;
    const align = pfState.alignH;
    const ax = align === 'center' ? x + boxW / 2 : align === 'right' ? x + boxW : x;
    let ly = y;
    for (const para of str.split('\n')) {
        let line = '';
        for (const word of para.split(' ')) {
            const test = line ? line + ' ' + word : word;
            if (line && pixelTextWidth(test, scale) > boxW) {
                pixelText(line, ax, ly, { align, valign: 'top', color: col.rgb, alpha: col.a, scale });
                ly += lineH; line = word;
            } else { line = test; }
        }
        pixelText(line, ax, ly, { align, valign: 'top', color: col.rgb, alpha: col.a, scale });
        ly += lineH;
    }
}

function pfInstallOverride() {
    if (pfState.installed) return;
    pfState.installed = true;
    _pfOrigText = window.text;
    _pfOrigTextSize = window.textSize;
    _pfOrigTextAlign = window.textAlign;

    window.textSize = function (s) {
        if (s !== undefined) pfState.size = s;
        return _pfOrigTextSize.apply(this, arguments);
    };
    window.textAlign = function (h, v) {
        if (h !== undefined) pfState.alignH = h === CENTER ? 'center' : h === RIGHT ? 'right' : 'left';
        if (v !== undefined) pfState.alignV = v === CENTER ? 'middle' : v === TOP ? 'top' : v === BOTTOM ? 'bottom' : 'baseline';
        return _pfOrigTextAlign.apply(this, arguments);
    };
    window.textWidth = function (str) {
        return pixelTextWidth(String(str), pfScaleForSize(pfState.size));
    };
    window.text = function (str, x, y, w) {
        str = String(str);
        const scale = pfScaleForSize(pfState.size);
        const col = pfCurrentColor();
        if (w !== undefined && w !== null) { pfDrawWrapped(str, x, y, w, scale, col); return; }
        const lineH = PF_CELL_H * scale + scale;
        const lines = str.split('\n');
        for (let i = 0; i < lines.length; i++) {
            pixelText(lines[i], x, y + i * lineH,
                { align: pfState.alignH, valign: pfState.alignV, color: col.rgb, alpha: col.a, scale });
        }
    };
}

// p5 attaches its globals (text, CENTER, ...) when the global-mode instance
// starts, after this script parses. Poll until they exist, then install once.
(function pfBoot() {
    if (typeof window.text === 'function' && typeof CENTER !== 'undefined') pfInstallOverride();
    else setTimeout(pfBoot, 20);
})();

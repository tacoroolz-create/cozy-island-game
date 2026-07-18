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
        text(str, x, y);
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

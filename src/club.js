// ===== THE BLACK GODDESS (IOU economy, phase 3) =====
// The underground nightclub (see underWorldBldgs.rtf): a dark room with a
// blinking LED dance floor, a DJ booth flanked by speaker stacks, and a
// disco ball. Step up to the decks for a rhythm-game dance-off — the first
// win each day pays out IOUs. Still later: Marge the Miracle hosting, and
// neighbors on the floor after dark.

const CLUB_PRIZE_IOUS = 5;

// Persisted via save.js under `club`.
let clubState = { lastPrizeDay: 0 };

function clubSerialize() { return { lastPrizeDay: clubState.lastPrizeDay }; }
function clubLoad(data) {
    clubState = { lastPrizeDay: (data && data.lastPrizeDay) || 0 };
}

function clubPrizeAvailable() {
    return typeof world !== 'undefined' && world && world.day !== clubState.lastPrizeDay;
}

// Called from Minigame.end() when a prize-flagged game is won.
function awardClubPrize(amount) {
    clubState.lastPrizeDay = (typeof world !== 'undefined' && world) ? world.day : 0;
    if (inventory.addItem('iou', amount)) {
        notify('The crowd goes wild! Prize: ' + amount + ' IOUs!');
    } else {
        notify('The crowd goes wild! ...but your pockets are too full for the prize.');
    }
}

// --- Interior layout ---
// Called from Building.initInterior for ug_black_goddess (9 wide, 2 wall
// rows + 6 floor rows). Door is at (4,7).
function furnishBlackGoddess(b) {
    // Near-black club floor everywhere, LED dance floor in the middle.
    for (let x = 0; x < b.interiorW; x++) {
        for (let y = INTERIOR_WALL_HEIGHT; y < b.interiorH; y++) {
            b.interiorTiles[x][y] = { type: 'club_floor', variant: 0 };
        }
    }
    for (let x = 2; x <= 6; x++) {
        for (let y = 3; y <= 5; y++) {
            // variant staggers the blink phase so the floor ripples.
            b.interiorTiles[x][y] = { type: 'club_led', variant: (x * 2 + y * 3) % 6 };
        }
    }
    // DJ booth back-center, speaker stacks in the corners.
    for (let x = 3; x <= 5; x++) {
        b.interiorTiles[x][INTERIOR_WALL_HEIGHT] = { type: 'club_booth', variant: x - 3 }; // 0 left, 1 decks, 2 right
    }
    b.interiorTiles[0][INTERIOR_WALL_HEIGHT] = { type: 'club_speaker', variant: 0 };
    b.interiorTiles[8][INTERIOR_WALL_HEIGHT] = { type: 'club_speaker', variant: 1 };
}

function isSolidClubTile(tile) {
    return tile && (tile.type === 'club_booth' || tile.type === 'club_speaker');
}

// --- Drawing (called from drawInteriorTile for club_* types) ---
const CLUB_LED_COLORS = ['#FF3B6B', '#FFB13B', '#F7E64A', '#3BE86E', '#3BB8FF', '#B14AF7'];

function drawClubTile(tile, sx, sy, TS) {
    noStroke();
    if (tile.type === 'club_led') {
        // Blinking LED square: cycle the palette, staggered by variant.
        const c = color(CLUB_LED_COLORS[(tile.variant + Math.floor(frameCount / 18)) % CLUB_LED_COLORS.length]);
        fill(red(c) * 0.55, green(c) * 0.55, blue(c) * 0.55);  // lit but not blinding
        rect(sx, sy, TS, TS);
        fill(c);
        rect(sx + 1, sy + 1, TS - 2, TS - 2);
        fill(255, 255, 255, 40);
        rect(sx + 2, sy + 2, TS - 4, 3);                        // glossy top edge
        return;
    }
    // Everything else stands on the dark club floor.
    fill('#17121D');
    rect(sx, sy, TS, TS);
    fill('#221A2C');
    rect(sx, sy, TS, 1);

    if (tile.type === 'club_booth') {
        // Booth body with a neon trim line.
        fill('#2B2138'); rect(sx, sy + 3, TS, TS - 3);
        fill('#B14AF7'); rect(sx, sy + 3, TS, 1);
        if (tile.variant === 1) {
            // The decks: two spinning turntables and a mixer.
            const a = (frameCount / 10) % TWO_PI;
            fill('#0E0B12'); rect(sx + 1, sy - 2, TS - 2, 7);
            fill('#3A3A3A'); ellipse(sx + 4, sy + 1, 6, 6); ellipse(sx + 12, sy + 1, 6, 6);
            fill('#B14AF7');
            ellipse(sx + 4 + Math.cos(a) * 2, sy + 1 + Math.sin(a) * 2, 1.5, 1.5);
            ellipse(sx + 12 - Math.cos(a) * 2, sy + 1 - Math.sin(a) * 2, 1.5, 1.5);
            fill('#FF3B6B'); rect(sx + 7, sy, 2, 3);            // mixer fader
        } else {
            // Booth wings: rack of blinking status lights.
            for (let i = 0; i < 3; i++) {
                fill(((Math.floor(frameCount / 12) + i) % 3 === 0) ? '#3BE86E' : '#123A1F');
                rect(sx + 4 + i * 3, sy + 6, 2, 2);
            }
        }
    } else if (tile.type === 'club_speaker') {
        // Speaker stack, cone pulsing with the beat.
        const pulse = 1 + Math.sin(frameCount / 6) * 0.8;
        fill('#0E0B12'); rect(sx + 2, sy - 4, TS - 4, TS + 2);
        fill('#2B2138'); rect(sx + 3, sy - 3, TS - 6, TS);
        fill('#453357');
        ellipse(sx + TS / 2, sy + 1, 7 + pulse, 7 + pulse);
        ellipse(sx + TS / 2, sy + 9, 5 + pulse, 5 + pulse);
        fill('#17121D');
        ellipse(sx + TS / 2, sy + 1, 3, 3); ellipse(sx + TS / 2, sy + 9, 2, 2);
    }
}

// Disco ball and neon wall trim, drawn over the tiles (before the player).
function drawClubOverlay(b, offsetX, offsetY, TS) {
    const cx = offsetX + (b.interiorW * TS) / 2;
    // Neon strips along the wall rows.
    noStroke();
    fill('#FF3B6B'); rect(offsetX, offsetY + TS - 2, b.interiorW * TS, 1);
    fill('#3BB8FF'); rect(offsetX, offsetY + TS + 1, b.interiorW * TS, 1);
    // The disco ball, hanging over the floor.
    const by = offsetY + TS * 2 + 4;
    fill(255, 255, 255, 30); ellipse(cx, by, 16, 16);           // halo
    fill('#C9CFDB'); ellipse(cx, by, 10, 10);
    fill('#8A93A6');                                             // facets
    for (let i = 0; i < 4; i++) {
        const a = frameCount / 20 + i * HALF_PI;
        ellipse(cx + Math.cos(a) * 3, by + Math.sin(a) * 1.5, 2, 2);
    }
    fill('#5B5F6B'); rect(cx - 0.5, offsetY + TS * 2 - 4, 1, 8); // hanging wire
    // Wandering colored spotlights on the floor.
    for (let i = 0; i < 3; i++) {
        const a = frameCount / 40 + i * (TWO_PI / 3);
        const lx = cx + Math.cos(a) * TS * 2.5;
        const ly = offsetY + TS * 4.5 + Math.sin(a * 1.3) * TS;
        const c = color(CLUB_LED_COLORS[(i * 2) % CLUB_LED_COLORS.length]);
        fill(red(c), green(c), blue(c), 26);
        ellipse(lx, ly, TS * 2.2, TS * 1.4);
    }
}

// --- The dance-off ---
function tryUseClubBooth() {
    if (!insideBuilding || insideBuilding.type !== 'ug_black_goddess') return false;
    let dx = 0, dy = 0;
    if (player.facing === 'up') dy = -1;
    else if (player.facing === 'down') dy = 1;
    else if (player.facing === 'left') dx = -1;
    else dx = 1;
    const fx = player.x + dx, fy = player.y + dy;
    if (fx < 0 || fx >= insideBuilding.interiorW || fy < 0 || fy >= insideBuilding.interiorH) return false;
    const t = insideBuilding.interiorTiles[fx][fy];
    if (!t || (t.type !== 'club_booth' && t.type !== 'club_speaker')) return false;
    openClubMenu();
    return true;
}

function openClubMenu() {
    const prize = clubPrizeAvailable();
    openMagicMenu('The Black Goddess — IOUs in pocket: ' + inventory.countItem('iou'), [
        { text: 'Start a dance-off!' + (prize ? ' (first win today: ' + CLUB_PRIZE_IOUS + ' IOUs)' : ' (prize already claimed today)'),
          action: () => {
              closeDialogue();
              startMinigameVs(null, 'rhythm');                  // dance-off vs the decks
              if (prize) activeMinigame.prizeIOUs = CLUB_PRIZE_IOUS;
          } },
        { text: 'Just soak in the lights.', action: () => closeDialogue() }
    ]);
}

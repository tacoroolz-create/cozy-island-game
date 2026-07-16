// ===== DREAMERS ALMANAC =====
// The island encyclopedia: neighbors, special NPCs, items by category,
// holidays, and a season calendar. Lives in its own menu tab and reuses the
// crafting tab's keyboard navigation pattern (↑↓ select, ⏎/→ open, ← back).

const ALMANAC_SECTIONS = [
    { id: 'neighbors', name: 'Neighbors' },
    { id: 'npcs',      name: 'Special Characters' },
    { id: 'items',     name: 'Items' },
    { id: 'holidays',  name: 'Holidays' },
    { id: 'calendar',  name: 'Calendar' },
];

const ALMANAC_ITEM_CATS = [
    { id: 'tool',     name: 'Tools' },
    { id: 'material', name: 'Materials' },
    { id: 'gift',     name: 'Gifts & Food' },
    { id: 'block',    name: 'Furniture & Blocks' },
    { id: 'treasure', name: 'Treasure' },
];

// almNav.sec / almNav.cat are null until the player drills in.
let almNav = { sec: null, cat: null };
let almSelectedIndex = 0;

// ===== DISCOVERY =====
// Everything in the almanac stays masked as "???" until the player discovers
// it. Keys look like 'npc:3', 'item:seed', 'char:yogatron'. Holidays and a few
// special characters are derived from existing state, so they aren't stored.
let almanacDiscovered = {};
function almDiscover(key) { almanacDiscovered[key] = true; }
function almSeen(key) { return almanacDiscovered[key] === true; }

function almHiddenRow() { return { kind: 'row', title: '???', sub: '???', right: '', swatch: '#555' }; }

// An item counts as discovered once it's ever entered the inventory (recorded
// on addItem); the current-count fallback catches saves from before this shipped.
function almItemSeen(id) {
    if (almSeen('item:' + id)) return true;
    return (typeof inventory !== 'undefined' && inventory && inventory.countItem(id) > 0);
}
// The wild hog reveals once you've befriended or named it.
function almCharHogSeen(h) {
    h = h || almIslandEntities('hog');
    return !!(h && (h.named || h.friendship > 0));
}

// First day a holiday ever occurs, given the season-anchored schedule.
function almHolidayFirstDay(name) {
    const si = SEASONAL_HOLIDAYS.findIndex(h => h.name === name);
    if (si >= 0) return si * SEASON_LENGTH + 1; // day 1, 41, 81, 121
    const k = HOLIDAYS.findIndex(h => h.name === name);
    if (k < 0) return Infinity;
    // Non-seasonal slot k first lands in season floor(k/6), day-of-season (k%6+1)*6+1.
    return Math.floor(k / 6) * SEASON_LENGTH + ((k % 6) + 1) * HOLIDAY_INTERVAL + 1;
}
// You've "seen" a holiday once you've lived to (or past) its first occurrence.
function almHolidayDiscovered(name) {
    const today = (typeof world !== 'undefined' && world) ? world.day : 1;
    return today >= almHolidayFirstDay(name);
}

// Overall discovery progress across every collectible in the almanac.
function almPercentFilled() {
    let total = 0, found = 0;
    for (let i = 0; i < NPC_DEFS.length; i++) { total++; if (almSeen('npc:' + i)) found++; }
    // Special characters: you (always), Mubaba, the hog, Yogatron.
    total += 4; found += 1;
    if (typeof magicFlags !== 'undefined' && magicFlags.mubabaMet) found++;
    if (almCharHogSeen()) found++;
    if (almSeen('char:yogatron')) found++;
    for (const id in ITEMS) { total++; if (almItemSeen(id)) found++; }
    for (const h of [...SEASONAL_HOLIDAYS, ...HOLIDAYS]) { total++; if (almHolidayDiscovered(h.name)) found++; }
    return total ? Math.round(found / total * 100) : 0;
}

// The island's neighbor roster, regardless of which map is active (entity
// globals hold the *active* map's lists — see MAP_ENTITY_FIELDS in game.js).
function almIslandEntities(name) {
    if (typeof currentMapId === 'undefined' || currentMapId === 'island') {
        return name === 'npcs' ? npcs : hog;
    }
    const m = (typeof maps !== 'undefined') ? maps.island : null;
    const parked = (m && m.entities) ? m.entities[name] : null;
    return parked !== undefined && parked !== null ? parked : (name === 'npcs' ? [] : null);
}

// Flat list of rows for the current nav level.
// Row kinds: 'cat' (drill in), 'back', 'row' (info only).
function getAlmanacEntries() {
    const back = { kind: 'back', name: '‹ Back' };

    if (almNav.sec === null) {
        return ALMANAC_SECTIONS.map(s => ({ kind: 'cat', id: s.id, name: s.name }));
    }

    if (almNav.sec === 'items' && almNav.cat === null) {
        return [back, ...ALMANAC_ITEM_CATS.map(c => ({ kind: 'cat', id: c.id, name: c.name }))];
    }

    const entries = [back];

    if (almNav.sec === 'items') {
        for (const id in ITEMS) {
            const it = ITEMS[id];
            if (it.category !== almNav.cat) continue;
            if (!almItemSeen(id)) { entries.push(almHiddenRow()); continue; }
            const have = (typeof inventory !== 'undefined' && inventory) ? inventory.countItem(id) : 0;
            entries.push({ kind: 'row', title: it.name, sub: it.desc, right: have > 0 ? 'x' + have : '', swatch: it.color });
        }
    } else if (almNav.sec === 'neighbors') {
        const islanders = almIslandEntities('npcs');
        for (let i = 0; i < NPC_DEFS.length; i++) {
            if (!almSeen('npc:' + i)) { entries.push(almHiddenRow()); continue; }
            const def = NPC_DEFS[i];
            const rec = islanders.find(n => n.id === i);
            const status = rec ? (rec.isPresent ? 'here' : 'away') : '—';
            entries.push({ kind: 'row', title: def.name, sub: def.species, right: status, swatch: def.color });
        }
    } else if (almNav.sec === 'npcs') {
        entries.push({ kind: 'row', title: PLAYER_NAME, sub: "The island dreamer. That's you!", right: '', swatch: '#4FC3F7' });
        const mubabaMet = (typeof magicFlags !== 'undefined') && magicFlags.mubabaMet;
        entries.push(mubabaMet
            ? { kind: 'row', title: MUBABA_DEF.name, sub: 'Magic Merchant of the underground city.', right: '', swatch: MUBABA_DEF.color }
            : almHiddenRow());
        const islandHog = almIslandEntities('hog');
        entries.push(almCharHogSeen(islandHog)
            ? { kind: 'row', title: islandHog.named ? islandHog.name : 'Wild Hog', sub: 'A friendly wild hog who loves snacks.', right: '', swatch: '#BC8F6F' }
            : almHiddenRow());
        entries.push(almSeen('char:yogatron')
            ? { kind: 'row', title: 'Yogatron', sub: 'Fitness Robot. Visits on Ab Appreciation Day.', right: '', swatch: '#FF6F00' }
            : almHiddenRow());
    } else if (almNav.sec === 'holidays') {
        const next = almNextHolidayDays();
        for (const h of [...SEASONAL_HOLIDAYS, ...HOLIDAYS]) {
            if (!almHolidayDiscovered(h.name)) { entries.push(almHiddenRow()); continue; }
            entries.push({ kind: 'row', title: h.name, sub: h.desc,
                right: next[h.name] !== undefined ? 'Day ' + next[h.name] : '', swatch: '#FFB74D' });
        }
    } else if (almNav.sec === 'calendar') {
        // Calendar is drawn as a grid, not rows; only Back is navigable.
    }

    return entries;
}

// Next occurrence (absolute day, >= today) of each holiday, keyed by name.
function almNextHolidayDays() {
    const next = {};
    const today = (typeof world !== 'undefined' && world) ? world.day : 1;
    // A full year covers every seasonal opener; the extra HOLIDAYS span covers
    // the non-seasonal rotation that drifts past a single year.
    const horizon = SEASON_LENGTH * SEASONS.length + HOLIDAY_INTERVAL * HOLIDAYS.length;
    for (let d = today; d <= today + horizon; d++) {
        const hol = getHolidayForDay(d);
        if (hol && next[hol.name] === undefined) next[hol.name] = d;
    }
    return next;
}

function almBack() {
    if (almNav.cat !== null) { almNav.cat = null; almSelectedIndex = 0; return; }
    if (almNav.sec !== null) { almNav.sec = null; almSelectedIndex = 0; }
}

function almActivate(i) {
    const en = getAlmanacEntries()[i];
    if (!en) return;
    if (en.kind === 'back') { almBack(); return; }
    if (en.kind === 'cat') {
        if (almNav.sec === null) almNav.sec = en.id;
        else almNav.cat = en.id;
        almSelectedIndex = 0;
    }
}

// Truncate a string to fit maxW pixels at the current text size.
function almTrunc(s, maxW) {
    if (textWidth(s) <= maxW) return s;
    while (s.length > 1 && textWidth(s + '…') > maxW) s = s.slice(0, -1);
    return s + '…';
}

function drawAlmanacTab(x, y, w, h) {
    // Breadcrumb
    let crumb = 'Dreamers Almanac';
    if (almNav.sec !== null) {
        const sec = ALMANAC_SECTIONS.find(s => s.id === almNav.sec);
        crumb += ' › ' + (sec ? sec.name : almNav.sec);
        if (almNav.cat !== null) {
            const cat = ALMANAC_ITEM_CATS.find(c => c.id === almNav.cat);
            crumb += ' › ' + (cat ? cat.name : almNav.cat);
        }
    }
    fill(255, 255, 200);
    textAlign(LEFT, TOP);
    textSize(9);
    textFont('Courier New');
    text(almTrunc(crumb, w - 100), x, y);

    fill(120);
    textSize(7);
    text('↑↓ select  ⏎ open  ← back', x + w - 110, y + 2);

    if (almNav.sec === 'calendar') {
        drawAlmanacCalendar(x, y + 14, w, h - 14);
        return;
    }

    const entries = getAlmanacEntries();
    if (almSelectedIndex >= entries.length) almSelectedIndex = Math.max(0, entries.length - 1);

    const listY = y + 16;
    const listH = h - 16 - 11; // reserve a bottom strip for the discovery meter
    const hasInfoRows = entries.some(e => e.kind === 'row');
    const rowH = hasInfoRows ? 24 : 20;
    const maxRows = Math.floor(listH / rowH);

    // Scroll window keyed off the selection (same trick as the crafting tab).
    let startRow = 0;
    if (entries.length > maxRows) {
        startRow = Math.min(Math.max(0, almSelectedIndex - Math.floor(maxRows / 2)), entries.length - maxRows);
    }

    for (let vi = 0; vi < Math.min(maxRows, entries.length); vi++) {
        const i = startRow + vi;
        const en = entries[i];
        if (!en) break;
        const ry = listY + vi * rowH;
        const selected = i === almSelectedIndex;
        if (en.kind === 'row') {
            drawAlmanacRow(en, x, ry, w, rowH, selected);
        } else {
            drawNavRow(en, x, ry, w, rowH, selected); // shared with crafting.js
        }
    }

    // Scroll indicator when the list continues off-screen.
    if (entries.length > maxRows) {
        fill(150);
        textAlign(RIGHT, BOTTOM);
        textSize(7);
        text((almSelectedIndex + 1) + '/' + entries.length, x + w, y + h);
    }

    // Discovery meter, pinned to the bottom of every almanac view.
    fill('#FFD54F');
    textAlign(LEFT, BOTTOM);
    textSize(8);
    textFont('Courier New');
    text('Percent filled: ' + almPercentFilled() + '%', x, y + h);
}

// A two-line info row: title + right-aligned note, description underneath.
function drawAlmanacRow(en, x, ry, w, rowH, selected) {
    fill(selected ? 60 : 34, selected ? 60 : 28, selected ? 80 : 40, 210);
    noStroke();
    rect(x, ry, w, rowH - 2);
    fill(en.swatch || '#7E6BA8');
    rect(x, ry, 2, rowH - 2);
    if (selected) {
        stroke('#B6A6E0'); strokeWeight(1); noFill();
        rect(x, ry, w, rowH - 2); noStroke();
    }

    fill(235, 235, 245);
    textAlign(LEFT, TOP);
    textSize(9);
    textFont('Courier New');
    text(almTrunc(en.title, w - 60), x + 8, ry + 2);

    if (en.right) {
        fill(160);
        textAlign(RIGHT, TOP);
        textSize(7);
        text(en.right, x + w - 6, ry + 3);
    }

    fill(150);
    textAlign(LEFT, TOP);
    textSize(7);
    text(almTrunc(en.sub || '', w - 16), x + 8, ry + 13);
}

// The current season as a 8x5 day grid: today highlighted, holidays dotted.
function drawAlmanacCalendar(x, y, w, h) {
    const day = world.day;
    const dayOfSeason = ((day - 1) % SEASON_LENGTH) + 1;
    const seasonStart = day - dayOfSeason + 1;

    fill(220);
    textAlign(LEFT, TOP);
    textSize(8);
    textFont('Courier New');
    text(world.season + ' Season — Day ' + dayOfSeason + ' of ' + SEASON_LENGTH, x, y);

    const cols = 8, rows = 5;
    const gy = y + 12;
    const cw = Math.floor(w / cols);
    const ch = Math.floor((h - 34) / rows);
    for (let i = 0; i < SEASON_LENGTH; i++) {
        const cx = x + (i % cols) * cw;
        const cy = gy + Math.floor(i / cols) * ch;
        const d = seasonStart + i;
        const isToday = d === day;
        const hol = getHolidayForDay(d);

        fill(isToday ? 90 : 0, isToday ? 80 : 0, isToday ? 40 : 0, isToday ? 230 : 110);
        noStroke();
        rect(cx + 1, cy + 1, cw - 2, ch - 2);
        if (isToday) {
            stroke(255, 255, 160); strokeWeight(1); noFill();
            rect(cx + 1, cy + 1, cw - 2, ch - 2); noStroke();
        }

        fill(d < day ? 110 : 225);
        textAlign(LEFT, TOP);
        textSize(7);
        text(i + 1, cx + 4, cy + 3);
        if (hol) {
            fill('#FFB74D');
            textAlign(RIGHT, BOTTOM);
            text('●', cx + cw - 3, cy + ch - 2);
        }
    }

    // Footer: today's holiday, or the next one coming up.
    let footer = '';
    const todayHol = getHolidayForDay(day);
    if (todayHol) {
        footer = '● Today: ' + todayHol.name + '!';
    } else {
        for (let d = day + 1; d <= day + HOLIDAY_INTERVAL; d++) {
            const hol = getHolidayForDay(d);
            if (hol) {
                const label = almHolidayDiscovered(hol.name) ? hol.name : '???';
                footer = '● Next: ' + label + ' — Day ' + d + ' (' + (d - day) + 'd)';
                break;
            }
        }
    }
    fill('#FFB74D');
    textAlign(LEFT, BOTTOM);
    textSize(8);
    text(almTrunc(footer, w), x, y + h - 2);
}

// ===== KEYBOARD NAVIGATION =====
// Wraps keyPressed the same way crafting.js does, active only on our tab.
(function () {
    const orig = window.keyPressed;
    window.keyPressed = function () {
        if (typeof gameState !== 'undefined' && gameState === STATE.MENU &&
            typeof menuTab !== 'undefined' && menuTab === MENU_TABS.indexOf('Almanac')) {

            // Always let Escape / E close the menu, and Tab/Q/W switch tabs.
            if (keyCode === ESCAPE || keyCode === TAB || key === 'e' || key === 'E' ||
                key === 'q' || key === 'Q' || key === 'w' || key === 'W') {
                if (keyCode === ESCAPE || key === 'e' || key === 'E') { almNav = { sec: null, cat: null }; almSelectedIndex = 0; }
                return orig.apply(this, arguments);
            }

            const entries = getAlmanacEntries();
            if (keyCode === UP_ARROW && entries.length) {
                almSelectedIndex = (almSelectedIndex - 1 + entries.length) % entries.length;
                return false;
            } else if (keyCode === DOWN_ARROW && entries.length) {
                almSelectedIndex = (almSelectedIndex + 1) % entries.length;
                return false;
            } else if (keyCode === ENTER || keyCode === RETURN || keyCode === RIGHT_ARROW) {
                almActivate(almSelectedIndex);
                return false;
            } else if (keyCode === LEFT_ARROW || keyCode === BACKSPACE) {
                almBack();
                return false;
            }
            return false;
        }
        return orig.apply(this, arguments);
    };
})();

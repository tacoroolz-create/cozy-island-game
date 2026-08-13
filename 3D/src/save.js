// Cozy Island 3D — persistence
export const SAVE_VERSION = 3; // 3: height-field island, positions are world units
const KEY = 'cozy-island-3d-save';

export function saveGame(player, gameTime, hog) {
    try {
        localStorage.setItem(KEY, JSON.stringify({
            version: SAVE_VERSION,
            inventory: player.inventory,
            day: gameTime.day,
            minutes: gameTime.minutes,
            pos: { x: player.pos.x, z: player.pos.z },
            hogFriendship: hog ? hog.friendship : 0,
        }));
    } catch (e) {
        console.warn('Save failed:', e); // private browsing / quota
    }
}

export function loadGame(player, gameTime, hog) {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    try {
        const data = JSON.parse(raw);
        if (!data || data.version !== SAVE_VERSION) return false; // migration point
        player.inventory = data.inventory || {};
        gameTime.day = data.day ?? 1;
        gameTime.minutes = data.minutes ?? 8 * 60;
        // Season/holiday always recompute from the day so they stay deterministic.
        gameTime.season = gameTime.getSeasonForDay(gameTime.day);
        gameTime.holiday = gameTime.getHolidayForDay(gameTime.day);
        if (hog) hog.friendship = data.hogFriendship ?? 0;
        // placeAt refuses spots inside scenery, so a stale save can't wedge you.
        if (data.pos) player.placeAt(data.pos.x, data.pos.z);
        return true;
    } catch (e) {
        console.warn('Failed to load save:', e);
        return false;
    }
}

export function hasSave() { return !!localStorage.getItem(KEY); }
export function clearSave() { localStorage.removeItem(KEY); }

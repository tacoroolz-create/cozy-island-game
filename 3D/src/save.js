// Cozy Island 3D — persistence
import * as Farming from './farming.js';
export const SAVE_VERSION = 4; // 4: adds inventory/wallet, farm plots, neighbor friendships
const KEY = 'cozy-island-3d-save';

export function saveGame(player, gameTime, hog, neighbors = []) {
    try {
        localStorage.setItem(KEY, JSON.stringify({
            version: SAVE_VERSION,
            inventory: player.inventory.serialize(),
            day: gameTime.day,
            minutes: gameTime.minutes,
            pos: { x: player.pos.x, z: player.pos.z },
            hogFriendship: hog ? hog.friendship : 0,
            farm: Farming.serialize(),
            friendships: Object.fromEntries(neighbors.map(n => [n.name, n.friendship])),
        }));
    } catch (e) {
        console.warn('Save failed:', e); // private browsing / quota
    }
}

export function loadGame(player, gameTime, hog, neighbors = []) {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    try {
        const data = JSON.parse(raw);
        if (!data || data.version !== SAVE_VERSION) return false; // migration point
        if (data.inventory) player.inventory.deserialize(data.inventory);
        if (data.farm) Farming.deserialize(data.farm);
        if (data.friendships) {
            for (const n of neighbors) {
                if (data.friendships[n.name] !== undefined) n.friendship = data.friendships[n.name];
            }
        }
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

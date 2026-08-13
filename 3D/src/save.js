// Cozy Island 3D — persistence
export const SAVE_VERSION = 2;

export function saveGame(player, gameTime) {
    const data = {
        version: SAVE_VERSION,
        inventory: player.inventory,
        day: gameTime.day,
        minutes: gameTime.minutes,
        playerPos: { x: player.group.position.x, z: player.group.position.z },
    };
    localStorage.setItem('cozy-island-3d-save', JSON.stringify(data));
}

export function loadGame(player, gameTime) {
    const raw = localStorage.getItem('cozy-island-3d-save');
    if (!raw) return false;
    try {
        const data = JSON.parse(raw);
        if (!data) return false;
        if (data.version !== SAVE_VERSION) return false; // migration point for future versions
        player.inventory = data.inventory || {};
        gameTime.day = data.day ?? 1;
        gameTime.minutes = data.minutes ?? 6 * 60;
        // Season/holiday are always recomputed from the day so they stay deterministic.
        gameTime.season = gameTime.getSeasonForDay(gameTime.day);
        gameTime.holiday = gameTime.getHolidayForDay(gameTime.day);
        if (data.playerPos) {
            player.group.position.x = data.playerPos.x;
            player.group.position.z = data.playerPos.z;
        }
        return true;
    } catch (e) {
        console.warn('Failed to load save:', e);
        return false;
    }
}

export function hasSave() {
    return !!localStorage.getItem('cozy-island-3d-save');
}

export function clearSave() {
    localStorage.removeItem('cozy-island-3d-save');
}

// Cozy Island 3D — persistence
export const SAVE_VERSION = 1;

export function saveGame(player, gameTime) {
    const data = {
        version: SAVE_VERSION,
        inventory: player.inventory,
        day: gameTime.day,
        minutes: gameTime.minutes,
        season: gameTime.season,
        holiday: gameTime.holiday,
        playerPos: { x: player.group.position.x, z: player.group.position.z },
    };
    localStorage.setItem('cozy-island-3d-save', JSON.stringify(data));
}

export function loadGame(player, gameTime) {
    const raw = localStorage.getItem('cozy-island-3d-save');
    if (!raw) return false;
    try {
        const data = JSON.parse(raw);
        if (!data || data.version !== SAVE_VERSION) return false;
        player.inventory = data.inventory || {};
        gameTime.day = data.day ?? 1;
        gameTime.minutes = data.minutes ?? 6 * 60;
        gameTime.season = data.season ?? 'Sweet Valley';
        gameTime.holiday = data.holiday ?? '—';
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

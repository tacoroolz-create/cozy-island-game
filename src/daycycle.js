// ===== DAY/NIGHT CYCLE & CALENDAR =====
// Enhanced time system with seasons, holidays, festivals

const SEASONS = ['Sweet', 'Saucy', 'Cool', 'Yeesh'];
const SEASON_LENGTH = 40;
const DAY_LENGTH_MS = 30 * 60 * 1000; // 30 real minutes = 24 game hours

let newDayCallbacks = [];
let newSeasonCallbacks = [];

// Register callbacks for day/season changes
function registerNewDay(cb) { newDayCallbacks.push(cb); }
function registerNewSeason(cb) { newSeasonCallbacks.push(cb); }

function updateTime(dt) {
    if (!dt) return;
    const gameMinutesPerRealMin = (24 * 60) / CONFIG.DAY_LENGTH_MINUTES;
    world.timeMinutes += gameMinutesPerRealMin * (dt / 60000);
    if (world.timeMinutes >= 24 * 60) {
        world.timeMinutes = 0;
        world.day++;
        onNewDay();
    }
}

function onNewDay() {
    // Holiday on day 1 of each season
    const isHoliday = world.day === 1;
    // Festival every 6 days
    const isFestival = world.day > 1 && (world.day % 6) === 1;

    if (isHoliday) {
        notify('Holiday! ' + world.season + ' season begins!');
    }
    if (isFestival) {
        notify('Festival day!');
    }

    // Dispatch to registered callbacks
    for (const cb of newDayCallbacks) {
        try { cb(); } catch(e) {}
    }
}

function onNewSeason() {
    // Advance season
    const idx = SEASONS.indexOf(world.season);
    world.season = SEASONS[(idx + 1) % 4];
    if (world.season === 'Sweet') {
        // Year passed
    }
    notify('New season: ' + world.season + '!');

    for (const cb of newSeasonCallbacks) {
        try { cb(); } catch(e) {}
    }
}

function getDateString() {
    return 'Day ' + world.day + ' - ' + world.season + ' Season';
}

function getTimeString() {
    const hours = Math.floor(world.timeMinutes / 60);
    const minutes = Math.floor(world.timeMinutes % 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    return displayHours + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm;
}

// Enhanced lighting overlay with season tints
function drawEnhancedDayNightOverlay() {
    const hour = world.timeMinutes / 60;
    let darkness = 0;
    let r = 20, g = 20, b = 60;

    if (hour < 5) {
        darkness = 0.5;
    } else if (hour < 7) {
        darkness = map(hour, 5, 7, 0.5, 0);
        r = lerp(60, 20, map(hour, 5, 7, 0, 1));
        g = lerp(40, 20, map(hour, 5, 7, 0, 1));
        b = lerp(80, 60, map(hour, 5, 7, 0, 1));
    } else if (hour < 17) {
        darkness = 0;
    } else if (hour < 20) {
        darkness = map(hour, 17, 20, 0, 0.5);
        r = lerp(20, 80, map(hour, 17, 20, 0, 1));
        g = lerp(20, 30, map(hour, 17, 20, 0, 1));
        b = lerp(60, 40, map(hour, 17, 20, 0, 1));
    } else {
        darkness = 0.5;
    }

    // Season tints
    if (world.season === 'Cool') {
        r = Math.max(0, r - 10);
        b = Math.min(100, b + 10);
    } else if (world.season === 'Yeesh') {
        r = Math.max(0, r - 15);
        g = Math.max(0, g - 5);
        b = Math.min(100, b + 20);
        darkness = Math.max(darkness, 0.15); // slight cold tint even in day
    }

    if (darkness > 0) {
        noStroke();
        fill(r, g, b, darkness * 255);
        rect(0, 0, width, height);
    }
}
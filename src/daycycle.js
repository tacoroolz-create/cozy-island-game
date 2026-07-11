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

// The clock freezes at 2 AM until the player sleeps (sleeping sets it to 6 AM,
// which is past the freeze point, so the clamp only re-arms after midnight).
const LATE_NIGHT_FREEZE_MIN = 2 * 60;
function freezeAtLateNight(w, prevMinutes) {
    if (prevMinutes <= LATE_NIGHT_FREEZE_MIN && w.timeMinutes > LATE_NIGHT_FREEZE_MIN) {
        w.timeMinutes = LATE_NIGHT_FREEZE_MIN;
        // Fires exactly once: after clamping, prevMinutes === the freeze point.
        if (prevMinutes < LATE_NIGHT_FREEZE_MIN) {
            notify("It's really late. You should probably rest.", 4000);
        }
    }
}

// ===== NONSENSICAL ISLAND HOLIDAYS =====
// One unique community event every 6 days (day 1, 7, 13, 19 ...).
// Year = SEASON_LENGTH * 4 = 160 days, so 160 / 6 = ~27 events.
// Kept deterministic so players can learn the island calendar.
const HOLIDAY_INTERVAL = 6;
const HOLIDAYS = [
    { name: 'Backwards Hats Day',     desc: 'Everyone wears their hat backwards, even if they do not have a hat.' },
    { name: 'Compliment a Crab Day',  desc: 'Beach crabs receive one mandatory sincere compliment before noon.' },
    { name: 'Talk Like an Eagle Day', desc: 'All islanders must begin every sentence with a mighty "Kyaaaaa!"' },
    { name: 'Toast Toss Tournament',  desc: 'Beach targets appear and islanders throw stale toast for prizes.' },
    { name: 'Garden Day',             desc: 'A day for the player and neighbors to start gardens. Hoes have unlimited durability and everyone has dirt on their mind.' },
    { name: 'Snake Run Day',          desc: 'A holiday for snakes! They dart between trees, rocks, and buildings all day. Catch one for a small gift.' },
    { name: 'Spoon Appreciation Day', desc: 'All meals must be prepared, served, and eaten with only spoons.' },
    { name: 'Ab Appreciation Day',   desc: 'A flex-and-sip festival honoring every abdominal. Yogatron visits to hand out Protein Shakes.' },
    { name: 'Backflip Day',          desc: 'Interact with anyone or anything — neighbors, animals, even trees and stones — and they celebrate with a backflip.' },
    { name: "Hoggy's Birthday",       desc: 'The wild hog is guest of honor. Bring him a gift and every neighbor pitches in, too.' },
    { name: 'Clean Your Room Day',    desc: 'No going outside until you tidy up: move or put away one piece of furniture or decor.' },
    { name: 'Day of the Island God',  desc: 'The Island God rises on the east beach. Animal life doubles in its honor.' },
    { name: 'Dig a Hole Day',         desc: 'Pick a spot and dig it with a pickaxe. Year after year the hole grows deeper... toward somewhere new.' },
    { name: 'Reverse Burglary',       desc: 'People sneak into each other\'s homes and leave nice gifts.' },
    { name: 'Name the Island Day',    desc: 'Propose a name for the island (press P) and canvass the neighbors for votes. Majority rules!' },
    { name: 'Mandatory Nap Interlude', desc: 'Between noon and one, the island collectively naps wherever they stand.' },
    { name: 'Castle of Sticks Day',   desc: 'Gather 100 sticks and raise a twig tower — a second little home to decorate.' },
    { name: 'Lawn Mumble Day',        desc: 'Gardeners whisper encouraging words to the grass while mowing.' },
    { name: 'Pet Rock Adoption Fair', desc: 'Every rock is named and given a tiny paper collar.' },
    { name: 'Opposite Compliment Day', desc: 'Praise is delivered as insults that are clearly meant warmly.' },
    { name: 'Turtle Crossing Guard Day', desc: 'A wave of turtles crawls across the island. Stand near one to help it cross safely.' },
    { name: 'Door-Holding Olympics',  desc: 'Politeness is scored by how long someone holds a door open.' },
    { name: 'Fruit Apology Day',      desc: 'All disagreements are resolved by offering a fruit and bowing.' },
    { name: 'Humming in Unison Hour', desc: 'At mid-afternoon, the island hums the same three notes.' },
    { name: 'Cloud-Naming Congress',  desc: 'Residents vote on official names for every cloud in the sky.' },
    { name: 'Tied-Shoe Celebration',  desc: 'Anyone whose shoes are tied receives applause.' },
    { name: 'The Great Blink-Off',    desc: 'A staring contest where the first to blink wins a ceremonial ribbon.' },
    { name: 'Jellybean Council',      desc: 'A single jellybean is placed on a pedestal and consulted for advice.' },
    { name: 'Hat-Stacking Jubilee',   desc: 'The wearing of multiple hats is both encouraged and competitively scored.' }
];

// Day 1 of each season is still its own "season begins" holiday.
function isHolidayDay(day) {
    if (day === undefined) day = world ? world.day : 1;
    if (day === 1) return true; // first day of year / first season start
    return day > 1 && (day % HOLIDAY_INTERVAL) === 1;
}

function getHolidayIndex(day) {
    if (day === undefined) day = world ? world.day : 1;
    // Index 0 is reserved for day 1 (year/season start); every subsequent
    // HOLIDAY_INTERVAL day maps to the next entry in the HOLIDAYS list.
    if (day <= 1) return 0;
    return 1 + Math.floor((day - 2) / HOLIDAY_INTERVAL);
}

function getHolidayForDay(day) {
    if (day === undefined) day = world ? world.day : 1;
    if (!isHolidayDay(day)) return null;
    const idx = getHolidayIndex(day);
    const wrapped = idx % HOLIDAYS.length;
    return HOLIDAYS[wrapped] || null;
}

function getCurrentHoliday() {
    if (!world) return null;
    return getHolidayForDay(world.day);
}

function getHolidayName(day) {
    const h = getHolidayForDay(day);
    return h ? h.name : '';
}

function getHolidayDesc(day) {
    const h = getHolidayForDay(day);
    return h ? h.desc : '';
}

function onNewDay() {
    const day = world ? world.day : 1;
    const seasonIdx = Math.floor((day - 1) / SEASON_LENGTH);
    const isSeasonStart = (day > 1) && ((day - 1) % SEASON_LENGTH === 0);
    const isFestival = isHolidayDay(day);

    // Yesterday's tournament target comes down with the sunrise.
    if (typeof clearToastTargets === 'function') clearToastTargets();
    // Clean Your Room Day: reset yesterday's chore, lock the door if it's today.
    if (typeof onCleanRoomNewDay === 'function') onCleanRoomNewDay();

    if (isSeasonStart) {
        const nextSeason = SEASONS[seasonIdx % SEASONS.length];
        if (nextSeason !== world.season) {
            world.season = nextSeason;
        }
        onNewSeason();
    }

    if (isFestival) {
        const holiday = getHolidayForDay(day);
        if (holiday) {
            notify('Holiday! Today is ' + holiday.name + '!', 4000);
            if (holiday.name === 'Toast Toss Tournament' && typeof spawnToastTargets === 'function') {
                spawnToastTargets();
                if (typeof inventory !== 'undefined') {
                    inventory.addItem('stale_toast', 5);
                    notify('You received 5 Stale Toast for the tournament!', 3000);
                }
            }
            if (holiday.name === 'Garden Day' && typeof inventory !== 'undefined') {
                // Give the player a starter seed pack for the community planting day.
                inventory.addItem('seed', 3);
                notify('Garden Day seed pack: +3 seeds! Grab a hoe and join the fun.', 3500);
            }
            if (holiday.name === 'Ab Appreciation Day') {
                spawnYogatron();
            }
            if (holiday.name === 'Day of the Island God' && typeof spawnIslandGod === 'function') {
                spawnIslandGod();
            }
            if (holiday.name === 'Dig a Hole Day') {
                notify('Grab your pickaxe, face some open ground, and press Enter to dig!', 4500);
            }
            if (holiday.name === 'Name the Island Day') {
                notify('Press P to propose a new name for the island!', 4500);
            }
            if (holiday.name === 'Castle of Sticks Day') {
                notify('100 sticks = one twig tower. Equip sticks and click open ground to build!', 4500);
            }
            if (holiday.name === "Hoggy's Birthday") {
                notify("It's Hoggy's Birthday! Bring him a gift — the whole island's chipping in.", 4500);
            }
            if (holiday.name === 'Turtle Crossing Guard Day' && typeof spawnTurtleCrossing === 'function') {
                spawnTurtleCrossing();
            }
        }
    } else if (isSeasonStart) {
        notify('Holiday! ' + world.season + ' season begins!', 4000);
    }

    // Daily systems that hang off the calendar.
    if (typeof onNpcNewDay === 'function') onNpcNewDay();
    if (typeof onGardenNewDay === 'function') onGardenNewDay();

    // Dispatch to registered callbacks
    for (const cb of newDayCallbacks) {
        try { cb(); } catch(e) {}
    }
}

function onNewSeason() {
    // Notify and dispatch callbacks. The actual season value is updated before this is called.
    notify('New season: ' + world.season + '!');

    for (const cb of newSeasonCallbacks) {
        try { cb(); } catch(e) {}
    }
}

function getDateString() {
    const holiday = getCurrentHoliday();
    let s = 'Day ' + world.day + ' - ' + world.season + ' Season';
    if (world.islandName) s = world.islandName + ' - ' + s;
    if (holiday) s += ' - ' + holiday.name;
    return s;
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

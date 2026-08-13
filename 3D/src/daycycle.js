// Cozy Island 3D — world clock, seasons, holidays, and lighting helpers ☀️🌙

const SEASONS = ['Sweet', 'Saucy', 'Cool', 'Yeesh'];
const SEASON_LENGTH = 40;

const HOLIDAY_INTERVAL = 6;
const HOLIDAYS = [
    { name: 'Backwards Hats Day',     desc: 'Everyone wears their hat backwards, even if they do not have a hat.' },
    { name: 'Compliment a Crab Day',  desc: 'Beach crabs receive one mandatory sincere compliment before noon.' },
    { name: 'Talk Like an Eagle Day', desc: 'All islanders must begin every sentence with a mighty "Kyaaaaa!"' },
    { name: 'Toast Toss Tournament',  desc: 'Beach targets appear and islanders throw stale toast for prizes.' },
    { name: 'Garden Day',             desc: 'A day for the player and neighbors to start gardens.' },
    { name: 'Snake Run Day',          desc: 'A holiday for snakes! They dart between trees, rocks, and buildings all day.' },
    { name: 'Tourist Time!',          desc: 'A dreamy little boat beaches with a few bewildered tourists.' },
    { name: 'Ab Appreciation Day',    desc: 'A flex-and-sip festival honoring every abdominal.' },
    { name: 'Backflip Day',           desc: 'Interact with anyone or anything and they celebrate with a backflip.' },
    { name: "Hoggy's Birthday",         desc: 'The wild hog is guest of honor. Bring him a gift!' },
    { name: 'Clean Your Room Day',    desc: 'No going outside until you tidy up one piece of furniture or decor.' },
    { name: 'Day of the Island God',  desc: 'The Island God rises on the east beach. Animal life doubles in its honor.' },
    { name: 'Dig a Hole Day',         desc: 'Pick a spot and dig it with a pickaxe.' },
    { name: 'Lost Mail Day',          desc: 'Crates of undelivered letters wash up on the beach.' },
    { name: 'Name the Island Day',    desc: 'Propose a name for the island and canvass the neighbors for votes.' },
    { name: 'The Flealess Market',    desc: 'A traveling merchant sets up near the dock, bartering rare goods.' },
    { name: 'Castle of Sticks Day',   desc: 'Gather sticks and raise a twig tower.' },
    { name: 'Familiar Seller',        desc: 'A traveling druid sets up near the dock with one familiar for sale.' },
    { name: 'Memory Lantern Night',   desc: 'At dusk, a lantern-lighter lines the shore with paper lanterns.' },
    { name: 'Well-Wishing Garden',    desc: 'A visiting gardener hands out potted flowers to plant near a neighbor.' },
    { name: 'Turtle Crossing Guard Day', desc: 'A wave of turtles crawls across the island. Help them cross safely.' },
    { name: 'The Picnic Reset',       desc: 'A visiting organizer arranges every neighbor into one long communal picnic line.' },
    { name: 'The Returning Bird',     desc: 'A migrating bird returns, and one neighbor is convinced they are old friends.' },
    { name: 'The Petal Path Maker',   desc: 'A visiting path-artist connects the dock to your door with flower petals.' },
    { name: 'The Neighborhood Time Capsule', desc: 'A traveling historian buries a memory box.' },
];

const SEASONAL_HOLIDAYS = [
    { name: 'Sweet Valley', desc: 'A spring altar rises on the beach.' },
    { name: 'Peak Saucy',   desc: 'A summer-solstice bonfire on the beach.' },
    { name: 'Cool Valley',  desc: 'Neighbors gather for a memory walk to the shore.' },
    { name: 'Peak Yeesh',   desc: 'The longest night. Build the Everburn bonfire near the dock.' },
];

export class WorldClock {
    constructor(config, options = {}) {
        this.config = config;
        this.day = options.day ?? 1;
        this.minutes = options.minutes ?? 8 * 60; // start at 8:00 AM, village awake
        this.season = options.season ?? this.getSeasonForDay(this.day);
        this.holiday = options.holiday ?? this.getHolidayForDay(this.day);
        this.callbacks = { newDay: [], newSeason: [], newHoliday: [] };
    }

    get minutesPerRealSecond() {
        return (24 * 60) / this.config.DAY_LENGTH_SECONDS;
    }

    update(dt) {
        const prevDay = this.day;
        const prevSeason = this.season;
        const prevHolidayName = this.holiday ? this.holiday.name : null;

        this.minutes += dt * this.minutesPerRealSecond;
        if (this.minutes >= 24 * 60) {
            this.minutes -= 24 * 60;
            this.day++;
        }

        this.season = this.getSeasonForDay(this.day);
        this.holiday = this.getHolidayForDay(this.day);

        if (this.day !== prevDay) {
            this.dispatch('newDay', this.daySnapshot());
        }
        if (this.season !== prevSeason) {
            this.dispatch('newSeason', { season: this.season, day: this.day });
        }
        const holidayName = this.holiday ? this.holiday.name : null;
        if (holidayName !== prevHolidayName) {
            this.dispatch('newHoliday', { holiday: this.holiday, day: this.day });
        }
    }

    daySnapshot() {
        return {
            day: this.day,
            season: this.season,
            holiday: this.holiday,
            minutes: this.minutes,
        };
    }

    get timeString() {
        const h = Math.floor(this.minutes / 60);
        const m = Math.floor(this.minutes % 60);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 || 12;
        const displayM = m.toString().padStart(2, '0');
        return `${displayH}:${displayM} ${ampm}`;
    }

    get dateString() {
        let s = `Day ${this.day} — ${this.timeString}`;
        if (this.season) s += ` · ${this.season}`;
        if (this.holiday) s += ` · ${this.holiday.name}`;
        return s;
    }

    get progress() {
        return this.minutes / (24 * 60);
    }

    get hour() {
        return this.minutes / 60;
    }

    static isHolidayDay(day) {
        return ((day - 1) % SEASON_LENGTH) % HOLIDAY_INTERVAL === 0;
    }

    isHolidayDay(day = this.day) {
        return WorldClock.isHolidayDay(day);
    }

    getSeasonForDay(day = this.day) {
        const idx = Math.floor((day - 1) / SEASON_LENGTH) % SEASONS.length;
        return SEASONS[idx];
    }

    getHolidayForDay(day = this.day) {
        if (!this.isHolidayDay(day)) return null;
        const dayOfSeason0 = (day - 1) % SEASON_LENGTH;
        if (dayOfSeason0 === 0) {
            const seasonIdx = Math.floor((day - 1) / SEASON_LENGTH) % SEASONS.length;
            return SEASONAL_HOLIDAYS[seasonIdx];
        }
        const seasonNum = Math.floor((day - 1) / SEASON_LENGTH);
        const slot = dayOfSeason0 / HOLIDAY_INTERVAL - 1;
        return HOLIDAYS[(seasonNum * 6 + slot) % HOLIDAYS.length];
    }

    getTimeOfDay() {
        const hour = this.hour;
        if (hour >= 21 || hour < 5) return 'night';
        if (hour >= 5 && hour < 11) return 'morning';
        if (hour >= 11 && hour < 17) return 'afternoon';
        return 'evening';
    }

    on(event, cb) {
        if (this.callbacks[event]) this.callbacks[event].push(cb);
    }

    off(event, cb) {
        if (!this.callbacks[event]) return;
        const idx = this.callbacks[event].indexOf(cb);
        if (idx !== -1) this.callbacks[event].splice(idx, 1);
    }

    dispatch(event, payload) {
        for (const cb of this.callbacks[event] || []) {
            try { cb(payload); } catch (e) { console.warn(`WorldClock ${event} callback failed:`, e); }
        }
    }
}

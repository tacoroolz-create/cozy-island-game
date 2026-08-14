// Cozy Island 3D — items, tools, inventory, and shipping bin prices 🎒

export const TOOL_IDS = new Set(['axe', 'hoe', 'watering_can']);

export const ITEMS = {
    // raw goods
    log:          { name: 'Log',          icon: 'assets/icons/log.svg',         color: '#8b5a2b', value: 10 },
    stone:        { name: 'Stone',        icon: 'assets/icons/stone.svg',       color: '#9d9a92', value: 10 },
    fiber:        { name: 'Fiber',        icon: 'assets/icons/fiber.svg',       color: '#ff7bac', value: 10 },
    seashell:     { name: 'Seashell',     icon: 'assets/icons/seashell.svg',    color: '#ffe6ea', value: 15 },
    stick:        { name: 'Stick',        icon: 'assets/icons/stick.svg',       color: '#8b6b45', value: 5 },
    banana:       { name: 'Banana',       icon: 'assets/icons/banana.svg',      color: '#ffe066', value: 20 },
    berry:        { name: 'Berry',        icon: 'assets/icons/berry.svg',       color: '#d94f6a', value: 15 },

    // tools
    axe:          { name: 'Axe',          icon: 'assets/icons/axe.svg',         color: '#a87e5b', value: 0, tool: true },
    hoe:          { name: 'Hoe',          icon: 'assets/icons/hoe.svg',         color: '#bca06a', value: 0, tool: true },
    watering_can: { name: 'Watering Can', icon: 'assets/icons/watering_can.svg', color: '#7aaec7', value: 0, tool: true },

    // seeds
    turnip_seed:     { name: 'Turnip Seed',     icon: 'assets/icons/seed.svg',  color: '#d9c5a0', value: 10, seed: 'turnip' },
    tomato_seed:       { name: 'Tomato Seed',     icon: 'assets/icons/seed.svg',  color: '#e8c4a0', value: 15, seed: 'tomato' },
    corn_seed:         { name: 'Corn Seed',       icon: 'assets/icons/seed.svg',  color: '#f2e1a0', value: 15, seed: 'corn' },
    strawberry_seed:   { name: 'Strawberry Seed', icon: 'assets/icons/seed.svg',  color: '#e8c4c0', value: 25, seed: 'strawberry' },

    // produce
    turnip:       { name: 'Turnip',       icon: 'assets/icons/turnip.svg',      color: '#ffffff', value: 60 },
    tomato:       { name: 'Tomato',       icon: 'assets/icons/tomato.svg',      color: '#e84a3c', value: 80 },
    corn:         { name: 'Corn',         icon: 'assets/icons/corn.svg',        color: '#ffd54f', value: 90 },
    strawberry:   { name: 'Strawberry',   icon: 'assets/icons/strawberry.svg',  color: '#d94f6a', value: 150 },
};

export class Inventory {
    constructor() {
        this.items = {};     // id -> count
        this.tools = ['axe', 'hoe', 'watering_can'];
        this.activeIds = [...this.tools];
        this.activeIndex = 0; // which active slot is held
        this.wallet = 100;
        this.items['turnip_seed'] = 5;
        this.items['tomato_seed'] = 3;
        this.rebuildActive();
    }

    rebuildActive() {
        // Tools always stay first; then any seed items in inventory.
        const seeds = Object.keys(this.items).filter(id => ITEMS[id] && ITEMS[id].seed && this.items[id] > 0);
        const was = this.activeIds[this.activeIndex];
        this.activeIds = [...this.tools, ...seeds];
        // Try to keep the same item selected.
        const idx = this.activeIds.indexOf(was);
        this.activeIndex = idx >= 0 ? idx : Math.min(this.activeIndex, this.activeIds.length - 1);
        if (this.activeIndex < 0) this.activeIndex = 0;
    }

    has(id, n = 1) { return (this.items[id] || 0) >= n; }
    count(id) { return this.items[id] || 0; }
    add(id, n = 1) { this.items[id] = (this.items[id] || 0) + n; if (ITEMS[id] && ITEMS[id].seed) this.rebuildActive(); }
    remove(id, n = 1) {
        this.items[id] = (this.items[id] || 0) - n;
        if (this.items[id] <= 0) delete this.items[id];
        if (ITEMS[id] && ITEMS[id].seed) this.rebuildActive();
    }

    activeTool() { return this.activeIds[this.activeIndex] || null; }
    activeItem() { return this.activeTool(); }
    cycleActive(dir) {
        if (!this.activeIds.length) return;
        this.activeIndex = (this.activeIndex + dir + this.activeIds.length) % this.activeIds.length;
    }

    canAfford(n) { return this.wallet >= n; }
    earn(n) { this.wallet += n; }
    spend(n) {
        if (this.wallet < n) return false;
        this.wallet -= n;
        return true;
    }

    serialize() {
        return { items: this.items, wallet: this.wallet, activeIndex: this.activeIndex };
    }
    deserialize(data) {
        this.items = data.items || {};
        this.wallet = typeof data.wallet === 'number' ? data.wallet : 100;
        this.activeIndex = typeof data.activeIndex === 'number' ? data.activeIndex : 0;
        this.rebuildActive();
    }
}

export function itemValue(id, def = ITEMS[id]) {
    return def ? (def.value || 0) : 0;
}

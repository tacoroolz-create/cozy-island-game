// Cozy Island 3D — HUD, dialogue box, menu
const ITEM_NAMES = {
    log: 'Log', stone: 'Stone', fiber: 'Fiber', seashell: 'Seashell',
    stick: 'Stick', banana: 'Banana', berry: 'Berry',
};

export class UI {
    constructor() {
        this.clockEl = document.getElementById('clock');
        this.promptEl = document.getElementById('prompt');
        this.invBar = document.getElementById('inventory-bar');
        this.menu = document.getElementById('menu');
        this.menuBody = document.getElementById('menu-body');
        this.dialogue = document.getElementById('dialogue');
        this.dialogueName = document.getElementById('dialogue-name');
        this.dialogueText = document.getElementById('dialogue-text');
        this.toast = document.getElementById('toast');

        this.lastClock = '';
        this.lastPrompt = null;
        this.lastInvKey = '';
        this.toastTimer = 0;
    }

    updateClock(gameTime) {
        const s = gameTime.dateString;
        if (s !== this.lastClock) { this.clockEl.textContent = s; this.lastClock = s; }
    }

    updatePrompt(text) {
        if (text === this.lastPrompt) return;
        this.lastPrompt = text;
        if (text) {
            this.promptEl.textContent = text;
            this.promptEl.classList.add('visible');
        } else {
            this.promptEl.classList.remove('visible');
        }
    }

    updateInventory(inventory) {
        const ids = Object.keys(inventory).filter(id => inventory[id] > 0).slice(0, 8);
        const key = ids.map(id => `${id}:${inventory[id]}`).join('|');
        if (key === this.lastInvKey) return;
        this.lastInvKey = key;

        this.invBar.innerHTML = '';
        if (!ids.length) {
            const empty = document.createElement('div');
            empty.className = 'slot empty';
            this.invBar.appendChild(empty);
            return;
        }
        for (const id of ids) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.title = ITEM_NAMES[id] ?? id;
            // Sprites live in the 2D game's asset folder one level up.
            slot.innerHTML =
                `<img src="../assets/sprites/${id}.png" alt="${id}" ` +
                `onerror="this.style.display='none';this.parentNode.classList.add('noicon');` +
                `this.parentNode.dataset.label='${(ITEM_NAMES[id] ?? id).slice(0, 3)}'">` +
                `<span class="qty">${inventory[id]}</span>`;
            this.invBar.appendChild(slot);
        }
    }

    showDialogue(line) {
        this.dialogueName.textContent = line.name;
        this.dialogueText.textContent = line.text;
        this.dialogue.classList.add('visible');
    }

    hideDialogue() {
        this.dialogue.classList.remove('visible');
    }

    showToast(text, seconds = 2.5) {
        this.toast.textContent = text;
        this.toast.classList.add('visible');
        this.toastTimer = seconds;
    }

    updateMenu(isOpen, player, gameTime) {
        if (!isOpen) { this.menu.classList.remove('visible'); return; }
        this.menu.classList.add('visible');
        const items = Object.entries(player.inventory).filter(([, n]) => n > 0);
        const list = items.length
            ? items.map(([id, n]) => `<li>${ITEM_NAMES[id] ?? id} × ${n}</li>`).join('')
            : '<li class="dim">Nothing yet. Try shaking a tree.</li>';
        this.menuBody.innerHTML =
            `<h2>Pockets</h2><ul>${list}</ul>` +
            `<h2>Today</h2><p>Day ${gameTime.day} · ${gameTime.season}` +
            (gameTime.holiday ? ` · ${gameTime.holiday.name}` : '') + `</p>` +
            (gameTime.holiday ? `<p class="dim">${gameTime.holiday.desc}</p>` : '') +
            `<h2>Controls</h2><p class="dim">WASD move · Shift run · Drag to orbit · Wheel zoom<br>` +
            `Space interact · E menu · P pixel filter</p>`;
    }

    tick(dt) {
        if (this.toastTimer > 0) {
            this.toastTimer -= dt;
            if (this.toastTimer <= 0) this.toast.classList.remove('visible');
        }
    }
}

// Cozy Island 3D — HUD, dialogue box, menu
import { ITEMS } from './items.js';

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
        const tools = inventory.tools;
        const active = inventory.activeTool();
        const ids = Object.keys(inventory.items).filter(id => inventory.items[id] > 0).slice(0, 8);
        const key = `${active}|${tools.join(',')}|${ids.map(id => `${id}:${inventory.items[id]}`).join('|')}`;
        if (key === this.lastInvKey) return;
        this.lastInvKey = key;

        this.invBar.innerHTML = '';
        for (let i = 0; i < tools.length; i++) {
            const id = tools[i];
            const slot = document.createElement('div');
            slot.className = 'slot' + (id === active ? ' active' : '');
            const def = ITEMS[id];
            slot.title = def ? `${def.name} — ${i + 1}` : id;
            slot.innerHTML = def
                ? `<img src="${def.icon}" alt="${id}" onerror="this.style.display='none';this.parentNode.classList.add('noicon');this.parentNode.dataset.label='${def.name.slice(0,3)}'">`
                : '';
            this.invBar.appendChild(slot);
        }
        for (const id of ids) {
            const def = ITEMS[id];
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.title = def ? `${def.name} × ${inventory.items[id]}` : id;
            slot.innerHTML = def
                ? `<img src="${def.icon}" alt="${id}" onerror="this.style.display='none';this.parentNode.classList.add('noicon');this.parentNode.dataset.label='${(def.name).slice(0,3)}'">` +
                  `<span class="qty">${inventory.items[id]}</span>`
                : `<span class="qty">${inventory.items[id]}</span>`;
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
        const inv = player.inventory;
        const items = Object.entries(inv.items).filter(([, n]) => n > 0);
        const list = items.length
            ? items.map(([id, n]) => {
                const def = ITEMS[id];
                return `<li>${def ? def.name : id} × ${n}${def && def.value ? ` <span class="dim">(${def.value}G)</span>` : ''}</li>`;
              }).join('')
            : '<li class="dim">Nothing yet. Try shaking a tree or planting a seed.</li>';
        const active = inv.activeTool();
        const activeName = active && ITEMS[active] ? ITEMS[active].name : active;
        this.menuBody.innerHTML =
            `<h2>Wallet</h2><p>${inv.wallet}G</p>` +
            `<h2>Held Tool</h2><p>${activeName || 'Hands'}</p>` +
            `<h2>Pockets</h2><ul>${list}</ul>` +
            `<h2>Today</h2><p>Day ${gameTime.day} · ${gameTime.season}` +
            (gameTime.holiday ? ` · ${gameTime.holiday.name}` : '') + `</p>` +
            (gameTime.holiday ? `<p class="dim">${gameTime.holiday.desc}</p>` : '') +
            `<h2>Controls</h2><p class="dim">WASD move · Shift run · Drag to orbit · Wheel zoom<br>` +
            `Space interact · E menu · P pixel filter · Tab/1/2/3 tools</p>`;
    }

    tick(dt) {
        if (this.toastTimer > 0) {
            this.toastTimer -= dt;
            if (this.toastTimer <= 0) this.toast.classList.remove('visible');
        }
    }
}

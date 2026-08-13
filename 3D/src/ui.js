// Cozy Island 3D — UI updates
export class UI {
    constructor(config) {
        this.config = config;
        this.clockEl = document.getElementById('clock');
        this.seasonEl = document.getElementById('season');
        this.promptEl = document.getElementById('prompt');
        this.invBar = document.getElementById('inventory-bar');
        this.menu = document.getElementById('menu');
    }

    updateClock(gameTime) {
        this.clockEl.textContent = gameTime.dateString;
    }

    updatePrompt(text) {
        if (text) {
            this.promptEl.textContent = text;
            this.promptEl.classList.add('visible');
        } else {
            this.promptEl.classList.remove('visible');
        }
    }

    updateInventory(inventory) {
        this.invBar.innerHTML = '';
        const ids = Object.keys(inventory).slice(0, 8);
        if (ids.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'slot';
            empty.innerHTML = ' ';
            this.invBar.appendChild(empty);
            return;
        }
        for (const id of ids) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            const qty = inventory[id];
            const imgHtml = `\n                <img src="assets/sprites/${id}.png" alt="${id}"\n                    onerror="this.onerror=null;this.src='../assets/sprites/${id}.png';this.onerror=function(){this.style.display='none';}">\n            `;
            slot.innerHTML = imgHtml + `<span class="qty">${qty}</span>`;
            this.invBar.appendChild(slot);
        }
    }

    updateMenu(isOpen) {
        if (isOpen) this.menu.classList.add('visible');
        else this.menu.classList.remove('visible');
    }
}

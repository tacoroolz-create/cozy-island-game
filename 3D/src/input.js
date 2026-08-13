// Cozy Island 3D — input handling
export class Input {
    constructor() {
        this.keys = {};
        this.mouse = { x: 0, y: 0, dx: 0, dy: 0, down: false };
        this.wheel = 0;
        this.interactPressed = false;
        this.interactKeyDown = false;
        this.menuToggle = false;
        this.menuOpen = false;

        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space') {
                if (!this.interactKeyDown) this.interactPressed = true;
                this.interactKeyDown = true;
            }
            if (e.code === 'KeyE') {
                this.menuToggle = true;
                this.menuOpen = !this.menuOpen;
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            if (e.code === 'Space') this.interactKeyDown = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (this.mouse.down) {
                this.mouse.dx += e.movementX;
                this.mouse.dy += e.movementY;
            }
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mousedown', () => { this.mouse.down = true; });
        window.addEventListener('mouseup', () => { this.mouse.down = false; });

        window.addEventListener('wheel', (e) => {
            this.wheel += e.deltaY * 0.001;
        }, { passive: true });

        // Unlock pointer on menu
        document.addEventListener('pointerlockchange', () => {});
    }

    update() {
        // Reset per-frame impulses (interact is consumed by player)
        this.menuToggle = false;
        this.mouse.dx = 0;
        this.mouse.dy = 0;
        this.wheel = 0;
    }

    forward() { return this.keys['KeyW'] || this.keys['ArrowUp']; }
    back() { return this.keys['KeyS'] || this.keys['ArrowDown']; }
    left() { return this.keys['KeyA'] || this.keys['ArrowLeft']; }
    right() { return this.keys['KeyD'] || this.keys['ArrowRight']; }
    run() { return this.keys['ShiftLeft'] || this.keys['ShiftRight']; }

    consumeInteract() {
        const v = this.interactPressed;
        this.interactPressed = false;
        return v;
    }
}

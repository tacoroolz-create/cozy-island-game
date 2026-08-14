// Cozy Island 3D — keyboard and mouse
//
// Per-frame deltas (mouse.dx/dy, wheel) are cleared by endFrame() *after* the
// game has read them. Clearing at the top of the frame is what killed the
// camera in the first prototype.
const SWALLOW = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

export class Input {
    constructor(canvas) {
        this.keys = {};
        this.mouse = { x: 0, y: 0, dx: 0, dy: 0, down: false };
        this.wheel = 0;
        this.interactPressed = false;
        this.menuOpen = false;
        this.pixelToggled = false;
        this.toolCycleDir = 0;
        this.toolSelect = null;

        window.addEventListener('keydown', (e) => {
            if (SWALLOW.has(e.code)) e.preventDefault(); // stop the page scrolling
            if (e.repeat) return;
            this.keys[e.code] = true;
            if (e.code === 'Space' || e.code === 'Enter') this.interactPressed = true;
            if (e.code === 'KeyE') this.menuOpen = !this.menuOpen;
            if (e.code === 'Escape') this.menuOpen = false;
            if (e.code === 'KeyP') this.pixelToggled = true;
            if (e.code === 'Tab' || e.code === 'KeyQ') this.toolCycleDir = 1;
            if (e.code === 'Digit1') this.toolSelect = 0;
            if (e.code === 'Digit2') this.toolSelect = 1;
            if (e.code === 'Digit3') this.toolSelect = 2;
        });

        window.addEventListener('keyup', (e) => { this.keys[e.code] = false; });
        // Keys stick down if the window loses focus mid-stride.
        window.addEventListener('blur', () => { this.keys = {}; this.mouse.down = false; });

        const target = canvas ?? window;
        target.addEventListener('mousedown', (e) => { if (e.button === 0) this.mouse.down = true; });
        window.addEventListener('mouseup', () => { this.mouse.down = false; });
        window.addEventListener('mousemove', (e) => {
            if (this.mouse.down) {
                this.mouse.dx += e.movementX || 0;
                this.mouse.dy += e.movementY || 0;
            }
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('contextmenu', (e) => e.preventDefault());
        window.addEventListener('wheel', (e) => { this.wheel += e.deltaY * 0.0012; }, { passive: true });

        // Touch drag orbits the camera, so it's at least pannable on a tablet.
        let last = null;
        target.addEventListener('touchstart', (e) => { last = e.touches[0]; }, { passive: true });
        target.addEventListener('touchmove', (e) => {
            if (!last) return;
            const t = e.touches[0];
            this.mouse.dx += t.clientX - last.clientX;
            this.mouse.dy += t.clientY - last.clientY;
            this.mouse.down = true;
            last = t;
        }, { passive: true });
        target.addEventListener('touchend', () => { last = null; this.mouse.down = false; }, { passive: true });
    }

    endFrame() {
        this.mouse.dx = 0;
        this.mouse.dy = 0;
        this.wheel = 0;
    }

    forward() { return !!(this.keys['KeyW'] || this.keys['ArrowUp']); }
    back()    { return !!(this.keys['KeyS'] || this.keys['ArrowDown']); }
    left()    { return !!(this.keys['KeyA'] || this.keys['ArrowLeft']); }
    right()   { return !!(this.keys['KeyD'] || this.keys['ArrowRight']); }
    run()     { return !!(this.keys['ShiftLeft'] || this.keys['ShiftRight']); }

    consumeInteract() {
        const v = this.interactPressed;
        this.interactPressed = false;
        return v;
    }

    consumePixelToggle() {
        const v = this.pixelToggled;
        this.pixelToggled = false;
        return v;
    }

    consumeToolCycle() {
        const v = this.toolCycleDir;
        this.toolCycleDir = 0;
        return v;
    }

    consumeToolSelect() {
        const v = this.toolSelect;
        this.toolSelect = null;
        return v;
    }
}


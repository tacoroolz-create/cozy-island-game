// Cozy Island 3D — minimal house interior scene 🏠
import * as THREE from 'three';
import * as Farming from './farming.js';


const lambert = (color, opts = {}) => new THREE.MeshLambertMaterial({ color, ...opts });

export class Interior {
    constructor(scene, camera, player) {
        this.scene = scene;
        this.camera = camera;
        this.player = player;
        this.active = false;
        this.group = new THREE.Group();
        this.objects = []; // interactable props

        this.buildRoom();
        this.scene.add(this.group);
        this.group.visible = false;
    }

    buildRoom() {
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 6), lambert(0xc8a878));
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.group.add(floor);

        const wallMat = lambert(0xe8dcc8);
        const back = new THREE.Mesh(new THREE.BoxGeometry(8, 3, 0.2), wallMat);
        back.position.set(0, 1.5, -3);
        back.receiveShadow = true;
        this.group.add(back);
        const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3, 6), wallMat);
        left.position.set(-4, 1.5, 0);
        left.receiveShadow = true;
        this.group.add(left);
        const right = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3, 6), wallMat);
        right.position.set(4, 1.5, 0);
        right.receiveShadow = true;
        this.group.add(right);

        // Bed
        const bed = new THREE.Group();
        const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 1.5), lambert(0x8fd0e8));
        mattress.position.y = 0.45;
        bed.add(mattress);
        const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.7), lambert(0xffffff));
        pillow.position.set(-0.7, 0.75, 0);
        bed.add(pillow);
        bed.position.set(-2.5, 0, -2);
        this.group.add(bed);
        this.objects.push({ kind: 'bed', label: 'Sleep until morning', x: -2.5, z: -2, r: 1.5 });

        // Table
        const table = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.9), lambert(0x8b5a2b));
        table.position.set(2, 0.35, -1.5);
        table.castShadow = true;
        this.group.add(table);
        this.objects.push({ kind: 'table', label: 'A small table', x: 2, z: -1.5, r: 1.2 });

        // Door area
        this.objects.push({ kind: 'door', label: 'Leave the house', x: 0, z: 2.5, r: 1.5 });

        // Place the player in the middle of the room, facing the door.
        this.playerInPos = new THREE.Vector3(0, 0, 0);
    }

    enter(kind) {
        this.active = true;
        this.group.visible = true;
        this.kind = kind;
        this.savedPos = this.player.pos.clone();
        this.player.pos.copy(this.playerInPos);
        this.player.facing.set(0, 0, 1);
        this.player.group.visible = false;
        this.player.shadow.visible = false;
        this.camera.position.set(0, 4.5, 7);
        this.camera.lookAt(0, 0.8, 0);
    }

    exit() {
        this.active = false;
        this.group.visible = false;
        if (this.savedPos) {
            this.player.pos.copy(this.savedPos);
            this.player.group.visible = true;
            this.player.shadow.visible = true;
        }
    }

    updatePrompt(player) {
        if (!this.active) return null;
        const fx = player.facing.x || 0, fz = player.facing.z || 1;
        const f = { x: fx, z: fz };
        let best = null, bestScore = Infinity;
        for (const p of this.objects) {
            const dx = p.x - player.pos.x, dz = p.z - player.pos.z;
            const d = Math.hypot(dx, dz);
            if (d > 2.2) continue;
            const dot = d < 0.001 ? 1 : (dx * f.x + dz * f.z) / d;
            if (dot < 0.1) continue;
            const score = d - dot * 1.4;
            if (score < bestScore) { bestScore = score; best = p; }
        }
        return best ? `Space — ${best.label}` : '';
    }

    interact(gameTime, world) {
        const fx = this.player.facing.x || 0, fz = this.player.facing.z || 1;
        const f = { x: fx, z: fz };
        let best = null, bestScore = Infinity;
        for (const p of this.objects) {
            const dx = p.x - this.player.pos.x, dz = p.z - this.player.pos.z;
            const d = Math.hypot(dx, dz);
            if (d > 2.2) continue;
            const dot = d < 0.001 ? 1 : (dx * f.x + dz * f.z) / d;
            if (dot < 0.1) continue;
            const score = d - dot * 1.4;
            if (score < bestScore) { bestScore = score; best = p; }
        }
        if (!best) return null;
        if (best.kind === 'bed') {
            if (gameTime.hour >= 20 || gameTime.hour < 6) {
                gameTime.minutes = 6 * 60;
                gameTime.day++;
                gameTime.season = gameTime.getSeasonForDay(gameTime.day);
                gameTime.holiday = gameTime.getHolidayForDay(gameTime.day);
                Farming.onNewDay();
                world.farmDirty = true;
                if (world.neighbors) for (const n of world.neighbors) n.onNewDay();
                this.exit();
                return { name: 'Bed', text: 'You sleep soundly and wake to a new day.' };
            }
            return { name: 'Bed', text: 'It is too early to sleep. Go enjoy the daylight.' };
        }
        if (best.kind === 'door') {
            this.exit();
            return { name: 'Door', text: 'Back outside.' };
        }
        return { name: 'Room', text: 'A cozy little corner of the island.' };
    }
}


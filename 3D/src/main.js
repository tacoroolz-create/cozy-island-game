// Cozy Island 3D — main entry point 🏝️
import * as THREE from 'three';
import { Input } from './input.js';
import { World } from './world.js';
import { Player } from './player.js';
import { UI } from './ui.js';
import { WorldClock } from './daycycle.js';
import { loadGame, saveGame } from './save.js';

const CONFIG = {
    TILE_SIZE: 16,
    WORLD_WIDTH: 100,
    WORLD_HEIGHT: 100,
    SEA_MARGIN: 6,
    BEACH_THICKNESS: 5,
    DAY_LENGTH_SECONDS: 30 * 60, // 30 real minutes per in-game day
};

const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 60, 220);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('game-container').appendChild(renderer.domElement);

const input = new Input();
const world = new World(CONFIG, scene);
const player = new Player(CONFIG, scene, world, camera);
const ui = new UI(CONFIG);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xfff4d6, 1.2);
sunLight.position.set(50, 100, 50);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 250;
sunLight.shadow.camera.left = -100;
sunLight.shadow.camera.right = 100;
sunLight.shadow.camera.top = 100;
sunLight.shadow.camera.bottom = -100;
scene.add(sunLight);

const moonLight = new THREE.DirectionalLight(0xaaccff, 0.25);
moonLight.position.set(-50, 80, -50);
scene.add(moonLight);

// World clock + persistence
const gameTime = new WorldClock(CONFIG);
if (loadGame(player, gameTime)) {
    console.log('Loaded save —', gameTime.dateString);
}

gameTime.on('newDay', (snapshot) => {
    console.log('New day!', snapshot);
    saveGame(player, gameTime);
});

function updateLighting() {
    const progress = gameTime.progress;
    const hour = gameTime.hour;

    // Sun arc: sunrise ~5.5h (0.23), noon ~12h (0.5), sunset ~18.5h (0.77)
    // Map day progress to an angle where noon is at PI/2.
    const angle = (progress - 0.25) * Math.PI * 2;
    const r = 120;

    // Sun position follows a smooth arc; below-horizon at night.
    const sunY = Math.sin(angle) * r;
    const sunX = Math.cos(angle) * r;
    sunLight.position.set(sunX, sunY, 30);

    // Moon opposite the sun, gently arcing.
    const moonAngle = angle + Math.PI;
    const moonY = Math.max(10, Math.sin(moonAngle) * r);
    moonLight.position.set(Math.cos(moonAngle) * r, moonY, -30);

    // Smooth sky + fog gradient keyed to hour.
    const sky = skyColorForHour(hour, gameTime.season);
    scene.background = sky;
    scene.fog.color = sky;

    // Daylight factor 0..1 based on sun elevation.
    const daylight = THREE.MathUtils.clamp(Math.sin(angle), 0, 1);

    // Ambient dims at night; warmer at dawn/dusk; cool at night.
    const ambientNight = new THREE.Color(0x3a3a55);
    const ambientDay = new THREE.Color(0xffffff);
    const ambientColor = ambientNight.clone().lerp(ambientDay, daylight);
    ambientLight.color.copy(ambientColor);
    ambientLight.intensity = 0.12 + daylight * 0.48;

    sunLight.intensity = daylight * 1.5;
    sunLight.color.setHSL(0.09 + daylight * 0.04, 0.7, 0.65 + daylight * 0.25);

    moonLight.intensity = (1 - daylight) * 0.35;
}

function skyColorForHour(hour, season) {
    // Color stops in hex.
    const NIGHT = new THREE.Color(0x1a1a3a);
    const PRE_DAWN = new THREE.Color(0x4a3b5c);
    const DAWN = new THREE.Color(0xffa07a);
    const DAY = new THREE.Color(0x87CEEB);
    const DUSK = new THREE.Color(0xff8c42);
    const PRE_NIGHT = new THREE.Color(0x2d2d5a);

    let c = new THREE.Color();
    if (hour < 4) {
        c.copy(NIGHT);
    } else if (hour < 6) {
        c.copy(NIGHT).lerp(PRE_DAWN, map(hour, 4, 6, 0, 1));
    } else if (hour < 8) {
        c.copy(PRE_DAWN).lerp(DAWN, map(hour, 6, 8, 0, 1));
    } else if (hour < 10) {
        c.copy(DAWN).lerp(DAY, map(hour, 8, 10, 0, 1));
    } else if (hour < 16) {
        c.copy(DAY);
    } else if (hour < 18.5) {
        c.copy(DAY).lerp(DUSK, map(hour, 16, 18.5, 0, 1));
    } else if (hour < 20.5) {
        c.copy(DUSK).lerp(PRE_NIGHT, map(hour, 18.5, 20.5, 0, 1));
    } else {
        c.copy(PRE_NIGHT).lerp(NIGHT, map(hour, 20.5, 22, 0, 1));
    }

    // Subtle season tint.
    if (season === 'Cool') {
        c.b = Math.min(1, c.b + 0.04);
        c.r = Math.max(0, c.r - 0.03);
    } else if (season === 'Yeesh') {
        c.b = Math.min(1, c.b + 0.07);
        c.g = Math.max(0, c.g - 0.02);
    }
    return c;
}

function map(value, start1, stop1, start2, stop2) {
    const t = (value - start1) / (stop1 - start1);
    return start2 + t * (stop2 - start2);
}

function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.1);

    input.update();
    player.update(dt, input);
    gameTime.update(dt);
    updateLighting();
    ui.updateClock(gameTime);
    ui.updatePrompt(player.getInteractionPrompt());
    ui.updateInventory(player.inventory);
    ui.updateMenu(input.menuOpen);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('beforeunload', () => {
    saveGame(player, gameTime);
});

// Boot
updateLighting();
animate();

// Expose for debugging
window.COZY3D = { scene, camera, player, world, gameTime, saveGame, loadGame };

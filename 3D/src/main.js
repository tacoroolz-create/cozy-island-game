// Cozy Island 3D — main entry point 🏝️
import * as THREE from 'three';
import { Input } from './input.js';
import { World } from './world.js';
import { Player } from './player.js';
import { UI } from './ui.js';
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

// Game time state (mirrors 2D day cycle)
const gameTime = {
    day: 1,
    minutes: 6 * 60, // start at 6:00 AM
    season: 'Sweet Valley',
    holiday: '—',
};

// Try to load an existing save
if (loadGame(player, gameTime)) {
    console.log('Loaded save — Day', gameTime.day, gameTime.minutes);
}

function updateDayCycle(dt) {
    const minutesPerSecond = 24 * 60 / CONFIG.DAY_LENGTH_SECONDS;
    const prevDay = gameTime.day;
    gameTime.minutes += dt * minutesPerSecond;
    if (gameTime.minutes >= 24 * 60) {
        gameTime.minutes -= 24 * 60;
        gameTime.day++;
    }
    if (gameTime.day !== prevDay) {
        saveGame(player, gameTime);
    }
    const dayProgress = gameTime.minutes / (24 * 60);
    updateLighting(dayProgress);
}

function updateLighting(progress) {
    // Sun angle: rise at ~0.05, set at ~0.55 for a simple arc
    const angle = (progress - 0.25) * Math.PI * 2;
    const r = 120;
    sunLight.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 30);
    moonLight.position.set(-Math.cos(angle) * r, Math.max(10, -Math.sin(angle) * r), -30);

    // Sky color interpolation
    const c = new THREE.Color();
    if (progress < 0.2 || progress > 0.8) {
        c.set(0x1a1a3a); // night
    } else if (progress < 0.3 || progress > 0.7) {
        c.set(0xffb347); // dawn/dusk
    } else {
        c.set(0x87CEEB); // day
    }
    scene.background = c;
    scene.fog.color = c;

    // Ambient intensity
    const daylight = Math.max(0, Math.sin((progress - 0.25) * Math.PI * 2));
    ambientLight.intensity = 0.15 + daylight * 0.45;
    sunLight.intensity = daylight * 1.4;
    moonLight.intensity = (1 - daylight) * 0.3;
}

function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.1);

    input.update();
    player.update(dt, input);
    updateDayCycle(dt);
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
updateLighting(gameTime.minutes / (24 * 60));
animate();

// Expose for debugging
window.COZY3D = { scene, camera, player, world, gameTime, saveGame, loadGame };

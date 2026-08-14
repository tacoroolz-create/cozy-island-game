// Cozy Island 3D — main entry point 🏝️
import * as THREE from 'three';
import { Input } from './input.js';
import { World, WATER_LEVEL } from './world.js';
import { Player } from './player.js';
import { populate } from './npc.js';
import { UI } from './ui.js';
import { WorldClock } from './daycycle.js';
import * as Farming from './farming.js';
import { loadGame, saveGame } from './save.js';
import { Interior } from './interior.js';
import { ITEMS } from './items.js';

const boot = document.getElementById('boot-status');
const setBoot = (t) => { if (boot) boot.textContent = t; };

try {

const CONFIG = { DAY_LENGTH_SECONDS: 30 * 60 }; // 30 real minutes per in-game day

// Render at N64 vertical resolution and let the browser upscale with hard
// pixel edges. This is most of the retro look; P toggles it, and this number
// is the dial — lower is chunkier (240 is literal N64, 480 is the AC-era look).
const RETRO_HEIGHT = 480;
let pixelated = true;

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.2, 700);
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('game-container').appendChild(renderer.domElement);

function applyResolution() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(pixelated
        ? Math.min(1, RETRO_HEIGHT / h)
        : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.domElement.classList.toggle('pixelated', pixelated);
}
applyResolution();

setBoot('Growing an island… 🏝️');
const world = new World(scene);
const input = new Input(renderer.domElement);
const player = new Player(scene, world, camera);
const ui = new UI();
const interior = new Interior(scene, camera, player);
interior.world = world; // so sleep can call neighbor.onNewDay
player.onEnterHouse = (kind) => interior.enter(kind);
const rng = Math.random;
const { neighbors, hog } = populate(world, scene, rng);
world.neighbors = neighbors;
const actors = [...neighbors, hog];

// ---------------------------------------------------------------- sky

scene.fog = new THREE.Fog(0x87ceeb, 55, 175);

const ambientLight = new THREE.HemisphereLight(0xffffff, 0x6b7a4a, 0.55);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xfff4d6, 1.3);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near = 1;
sunLight.shadow.camera.far = 160;
sunLight.shadow.camera.left = -48;
sunLight.shadow.camera.right = 48;
sunLight.shadow.camera.top = 48;
sunLight.shadow.camera.bottom = -48;
sunLight.shadow.bias = -0.0012;
scene.add(sunLight, sunLight.target);

const moonLight = new THREE.DirectionalLight(0xaaccff, 0.25);
scene.add(moonLight);

// Sun and moon discs, kept facing the camera.
const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(9, 20), new THREE.MeshBasicMaterial({ color: 0xfff3c4, fog: false }));
const moonDisc = new THREE.Mesh(new THREE.CircleGeometry(6, 20), new THREE.MeshBasicMaterial({ color: 0xeef2ff, fog: false }));
scene.add(sunDisc, moonDisc);

// Stars: one Points cloud, faded in after dusk.
const starGeo = new THREE.BufferGeometry();
{
    const n = 500, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
        const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u);
        arr[i * 3] = Math.cos(a) * r * 300;
        arr[i * 3 + 1] = Math.abs(u) * 300 + 20;
        arr[i * 3 + 2] = Math.sin(a) * r * 300;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
}
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false });
scene.add(new THREE.Points(starGeo, starMat));

// Low-poly clouds drifting over the island.
const clouds = new THREE.Group();
const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true, transparent: true, opacity: 0.9 });
for (let i = 0; i < 14; i++) {
    const puff = new THREE.Group();
    const lobes = 3 + Math.floor(Math.random() * 3);
    for (let j = 0; j < lobes; j++) {
        const m = new THREE.Mesh(new THREE.IcosahedronGeometry(3 + Math.random() * 2.5, 0), cloudMat);
        m.position.set((j - lobes / 2) * 3.6 + Math.random(), Math.random() * 1.2, Math.random() * 2 - 1);
        m.scale.y = 0.55;
        puff.add(m);
    }
    const a = Math.random() * Math.PI * 2, r = 20 + Math.random() * 70;
    puff.position.set(Math.cos(a) * r, 42 + Math.random() * 14, Math.sin(a) * r);
    clouds.add(puff);
}
scene.add(clouds);

// ---------------------------------------------------------------- clock + save

const gameTime = new WorldClock(CONFIG);
if (loadGame(player, gameTime, hog, neighbors)) console.log('Loaded save —', gameTime.dateString);
world.setSeason(gameTime.season);
refreshNoticeBoard();

gameTime.on('newDay', () => {
    saveGame(player, gameTime, hog);
    world.setSeason(gameTime.season);
    refreshNoticeBoard();
    ui.showToast(`Day ${gameTime.day} · ${gameTime.season}` +
        (gameTime.holiday ? ` — ${gameTime.holiday.name}!` : ''), 4);
});
gameTime.on('newSeason', () => world.setSeason(gameTime.season));

function refreshNoticeBoard() {
    const board = world.props.find(p => p.kind === 'board');
    if (!board) return;
    board.line = gameTime.holiday
        ? `Today is ${gameTime.holiday.name}. ${gameTime.holiday.desc}`
        : `Day ${gameTime.day} of ${gameTime.season}. No events posted — someone has drawn a hog in the corner.`;
}

// ---------------------------------------------------------------- lighting

const SKY_STOPS = [
    [0,    0x101a33], [4,  0x101a33], [6,  0x4a3b5c], [7.5, 0xf0a07a],
    [9,    0x9fd0ee], [11, 0x87ceeb], [16, 0x87ceeb], [18,  0xf59a4a],
    [19.5, 0xe2653f], [21, 0x2d3060], [23, 0x101a33], [24,  0x101a33],
];
const skyA = new THREE.Color(), skyB = new THREE.Color(), sky = new THREE.Color();

function skyColorForHour(hour, season) {
    let i = 0;
    while (i < SKY_STOPS.length - 2 && hour >= SKY_STOPS[i + 1][0]) i++;
    const [h0, c0] = SKY_STOPS[i], [h1, c1] = SKY_STOPS[i + 1];
    const t = (hour - h0) / (h1 - h0 || 1);
    skyA.setHex(c0); skyB.setHex(c1);
    sky.copy(skyA).lerp(skyB, THREE.MathUtils.clamp(t, 0, 1));
    if (season === 'Cool') { sky.r = Math.min(1, sky.r + 0.03); sky.b = Math.max(0, sky.b - 0.02); }
    else if (season === 'Yeesh') { sky.b = Math.min(1, sky.b + 0.06); sky.g = Math.max(0, sky.g - 0.02); }
    return sky;
}

const ambDay = new THREE.Color(0xffffff);
const ambNight = new THREE.Color(0x4a5578);
const groundDay = new THREE.Color(0x8a9a5b);
const groundNight = new THREE.Color(0x2a3145);

function updateLighting() {
    const hour = gameTime.hour;
    // Sun rises ~6, peaks at noon, sets ~18.
    const angle = (hour / 24 - 0.25) * Math.PI * 2;
    const daylight = THREE.MathUtils.clamp(Math.sin(angle), 0, 1);
    const dir = new THREE.Vector3(Math.cos(angle) * 0.85, Math.sin(angle), 0.42).normalize();

    // Keep the shadow frustum tight around the player instead of the whole island.
    sunLight.target.position.copy(player.pos);
    sunLight.position.copy(player.pos).addScaledVector(dir, 70);
    moonLight.position.copy(player.pos).addScaledVector(dir, -70).setY(player.pos.y + 60);

    const s = skyColorForHour(hour, gameTime.season);
    scene.background = s.clone();
    scene.fog.color.copy(s);

    ambientLight.color.copy(ambNight).lerp(ambDay, daylight);
    ambientLight.groundColor.copy(groundNight).lerp(groundDay, daylight);
    ambientLight.intensity = 0.24 + daylight * 0.5;

    sunLight.intensity = daylight * 1.35;
    // Warm and low at the horizon, white overhead.
    sunLight.color.setHSL(0.10 - daylight * 0.02, 0.62 - daylight * 0.45, 0.62 + daylight * 0.25);
    sunLight.castShadow = daylight > 0.04;
    moonLight.intensity = (1 - daylight) * 0.32;

    sunDisc.position.copy(camera.position).addScaledVector(dir, 260);
    sunDisc.visible = dir.y > -0.15;
    sunDisc.lookAt(camera.position);
    moonDisc.position.copy(camera.position).addScaledVector(dir, -260);
    moonDisc.visible = dir.y < 0.15;
    moonDisc.lookAt(camera.position);

    starMat.opacity = THREE.MathUtils.clamp(1 - daylight * 5, 0, 0.95);
    cloudMat.opacity = 0.35 + daylight * 0.55;
    cloudMat.color.setRGB(0.55 + daylight * 0.45, 0.56 + daylight * 0.44, 0.62 + daylight * 0.38);
}

// ---------------------------------------------------------------- loop

let dialogueOpen = false;

function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.elapsedTime;

    if (input.consumePixelToggle()) { pixelated = !pixelated; applyResolution(); }

    const cycle = input.consumeToolCycle();
    if (cycle) player.cycleTool(cycle);
    const select = input.consumeToolSelect();
    if (select !== null) {
        player.inventory.activeIndex = Math.min(select, player.inventory.tools.length - 1);
    }

    const paused = input.menuOpen || dialogueOpen;

    if (input.consumeInteract()) {
        if (dialogueOpen) {
            dialogueOpen = false;
            ui.hideDialogue();
        } else if (interior.active) {
            const line = interior.interact(gameTime, world);
            if (line) { dialogueOpen = true; ui.showDialogue(line); }
        } else if (!input.menuOpen) {
            const line = player.interact(gameTime.hour);
            if (line) { dialogueOpen = true; ui.showDialogue(line); }
        }
    }

    if (!paused && !interior.active) {
        gameTime.update(dt);
        player.update(dt, input, actors);
        for (const a of actors) a.update(dt, world, gameTime.hour);
        world.update(dt, elapsed);
        clouds.rotation.y += dt * 0.004;
    } else {
        // Still let the camera orbit while reading, so you can look around.
        player.updateCamera(dt);
    }

    updateLighting();
    ui.updateClock(gameTime);
    ui.updatePrompt(paused ? '' : (interior.active ? interior.updatePrompt(player) : player.prompt));
    ui.updateInventory(player.inventory);
    ui.updateMenu(input.menuOpen, player, gameTime);
    ui.tick(dt);

    renderer.render(scene, camera);
    input.endFrame();
}

window.addEventListener('resize', applyResolution);
window.addEventListener('beforeunload', () => saveGame(player, gameTime, hog, neighbors));
// Mobile/tab-switch never fires beforeunload reliably.
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveGame(player, gameTime, hog, neighbors);
});

updateLighting();
animate();

window.COZY3D = { scene, camera, player, world, gameTime, neighbors, hog, saveGame, loadGame, WATER_LEVEL, ITEMS, Farming, interior };
if (boot) boot.style.display = 'none';

} catch (err) {
    console.error('Cozy Island 3D failed to boot:', err);
    if (boot) {
        boot.style.background = '#b00020';
        boot.style.color = '#fff';
        boot.textContent = 'Failed to start:\n' + (err && err.stack ? err.stack : err);
    }
    throw err;
}

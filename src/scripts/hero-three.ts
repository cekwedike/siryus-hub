import * as THREE from 'three';

const LIME = 0xd1df4b;
const GOLD = 0xb8924a;
const BG_DARK = 0x050505;
const BG_LIGHT = 0xe8eae4;

type Floater = {
  mesh: THREE.Mesh;
  base: THREE.Vector3;
  phase: number;
  spin: THREE.Vector3;
};

function disposeObject(root: THREE.Object3D) {
  root.traverse((obj: THREE.Object3D) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry?.dispose();
      const m = obj.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    }
    if (obj instanceof THREE.Points) {
      obj.geometry?.dispose();
      const m = obj.material;
      if (!Array.isArray(m)) m?.dispose();
    }
  });
}

export function initHeroThree(container: HTMLElement): () => void {
  let destroyed = false;
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.22);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xf2f6ea, 1.15);
  key.position.set(8, 10, 12);
  scene.add(key);

  const rim = new THREE.DirectionalLight(GOLD, 0.55);
  rim.position.set(-10, -4, -6);
  scene.add(rim);

  const ptLime = new THREE.PointLight(LIME, 120, 45, 2);
  ptLime.position.set(-6, 3, 8);
  scene.add(ptLime);

  const ptGold = new THREE.PointLight(GOLD, 70, 35, 2);
  ptGold.position.set(6, -4, 6);
  scene.add(ptGold);

  const world = new THREE.Group();
  world.position.x = 2.1;
  scene.add(world);

  const floaters: Floater[] = [];

  function addFloater(
    geometry: THREE.BufferGeometry,
    color: number,
    metal: number,
    rough: number,
    emissive: number,
    position: [number, number, number],
    scale: number
  ) {
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: metal,
      roughness: rough,
      emissive,
      emissiveIntensity: 0.18,
      envMapIntensity: 1,
    });
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.scale.setScalar(scale);
    world.add(mesh);
    floaters.push({
      mesh,
      base: mesh.position.clone(),
      phase: Math.random() * Math.PI * 2,
      spin: new THREE.Vector3(
        0.08 + Math.random() * 0.06,
        0.12 + Math.random() * 0.1,
        0.05 + Math.random() * 0.05
      ),
    });
  }

  const spread = 0.68;
  addFloater(
    new THREE.TorusKnotGeometry(0.65, 0.2, 120, 16),
    LIME,
    0.72,
    0.28,
    LIME,
    [-2.6 * spread, 0.65 * spread, -0.9 * spread],
    0.92
  );
  addFloater(
    new THREE.IcosahedronGeometry(0.95, 1),
    GOLD,
    0.65,
    0.32,
    GOLD,
    [2.5 * spread, -0.35 * spread, -1.6 * spread],
    0.95
  );
  addFloater(
    new THREE.OctahedronGeometry(1.0, 0),
    LIME,
    0.58,
    0.38,
    0x2a3008,
    [0.85 * spread, 1.45 * spread, 1.1 * spread],
    0.9
  );
  addFloater(
    new THREE.TorusGeometry(0.95, 0.32, 32, 64),
    GOLD,
    0.7,
    0.3,
    0x3d2a0c,
    [-1.5 * spread, -1.25 * spread, 1.5 * spread],
    0.92
  );
  addFloater(
    new THREE.IcosahedronGeometry(0.55, 0),
    LIME,
    0.55,
    0.45,
    LIME,
    [2.8 * spread, 1.0 * spread, 0.45 * spread],
    0.9
  );
  addFloater(
    new THREE.TetrahedronGeometry(1.05, 0),
    GOLD,
    0.62,
    0.35,
    GOLD,
    [-2.85 * spread, -0.85 * spread, 0.75 * spread],
    0.82
  );

  const pCount = 420;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = 4.5 + Math.random() * 7;
    const sinP = Math.sin(phi);
    pPos[i * 3] = r * sinP * Math.cos(theta);
    pPos[i * 3 + 1] = r * sinP * Math.sin(theta);
    pPos[i * 3 + 2] = r * Math.cos(phi);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: LIME,
    size: 0.07,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(pGeo, pMat);
  world.add(particles);

  let fogDark = new THREE.FogExp2(BG_DARK, 0.042);
  let fogLight = new THREE.FogExp2(BG_LIGHT, 0.028);
  scene.fog = fogDark;
  scene.background = new THREE.Color(BG_DARK);

  function syncTheme() {
    const light = document.body.classList.contains('light-theme');
    scene.background = new THREE.Color(light ? BG_LIGHT : BG_DARK);
    scene.fog = light ? fogLight : fogDark;
    ambient.intensity = light ? 0.52 : 0.22;
    key.intensity = light ? 0.75 : 1.15;
    rim.intensity = light ? 0.35 : 0.55;
    ptLime.intensity = light ? 85 : 120;
    ptGold.intensity = light ? 45 : 70;
    pMat.opacity = light ? 0.22 : 0.32;
  }
  syncTheme();

  const themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
  });

  let targetMX = 0;
  let targetMY = 0;
  let camX = 0;
  let camY = 0;

  function onMove(e: MouseEvent) {
    const rect = container.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    targetMX = nx * 2 - 1;
    targetMY = -(ny * 2 - 1);
  }
  if (!reducedMotion) {
    window.addEventListener('mousemove', onMove, { passive: true });
  }

  const clock = new THREE.Clock();

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w < 2 || h < 2) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  function tick() {
    if (destroyed) return;
    requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    const slow = reducedMotion ? 0.35 : 1;

    if (!reducedMotion) {
      camX += (targetMX * 0.75 - camX) * 0.042;
      camY += (targetMY * 0.5 - camY) * 0.042;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.position.z = 13;
      camera.lookAt(0.35, 0, 0);
    }

    const wRot = t * 0.08 * slow;
    world.rotation.y = wRot;
    world.rotation.x = Math.sin(t * 0.1 * slow) * 0.045;

    for (const f of floaters) {
      const m = f.mesh;
      m.rotation.x += f.spin.x * 0.014 * slow;
      m.rotation.y += f.spin.y * 0.014 * slow;
      m.rotation.z += f.spin.z * 0.01 * slow;
      const bob = Math.sin(t * 0.52 * slow + f.phase) * 0.16;
      const sway = Math.cos(t * 0.35 * slow + f.phase * 1.3) * 0.1;
      m.position.x = f.base.x + sway;
      m.position.y = f.base.y + bob;
      m.position.z = f.base.z + Math.sin(t * 0.26 * slow + f.phase) * 0.08;
    }

    particles.rotation.y = t * 0.025 * slow;
    particles.rotation.x = Math.sin(t * 0.07 * slow) * 0.08;

    renderer.render(scene, camera);
  }
  requestAnimationFrame(tick);

  return () => {
    destroyed = true;
    themeObserver.disconnect();
    ro.disconnect();
    if (!reducedMotion) {
      window.removeEventListener('mousemove', onMove);
    }
    disposeObject(world);
    particles.geometry.dispose();
    pMat.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  };
}

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//3D model loader
const loader = new GLTFLoader();

//Create scene
const scene = new THREE.Scene();

//let mixer = new THREE.animationMixer();

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x235964, 1);
document.body.appendChild(renderer.domElement);

//Camera (FOV, aspect ratio, clipping dist near, clipping dist far)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxDistance = 5;
controls.minDistance = 3;
controls.maxPolarAngle = Math.PI / 2;

//Add lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight, ambientLight);

//Glass material
const bowlMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0,
  roughness: 1,
  envMapIntensity: 0.9,
  clearcoat: 1,
  transparent: true,
  transmission: 0.6,
  opacity: 1,
  reflectivity: 0.2,
});

//Load objects
const bowlUrl = "models/bowl.glb";
loader.load(bowlUrl, (gltf) => {
  console.log(gltf);

  const model = gltf.scene;
  scene.add(model);

  model.traverse((o) => {
    if (o.isMesh) {
      o.material = bowlMaterial;
    }
  });
});

const sandUrl = "models/sand.glb";
loader.load(sandUrl, (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});

const ballUrl = "models/beachball.glb";
loader.load(ballUrl, (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});

const starfishUrl = "models/starfish.glb";
loader.load(starfishUrl, (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});

const waterUrl = "models/water.glb";
loader.load(waterUrl, (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  model.traverse((o) => {
    if (o.isMesh) {
      o.material = bowlMaterial;
    }
  });
});

const tortoiseAUrl = "models/tortoiseA.glb";
loader.load(tortoiseAUrl, (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});

const tortoiseBUrl = "models/tortoiseB.glb";
loader.load(tortoiseBUrl, (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});

animate();

//Render scene
function animate(mixer) {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//3D model loader
const loader = new GLTFLoader();

//Create scene
const scene = new THREE.Scene();

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);
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
controls.maxDistance = 10;
controls.minDistance = 1;
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
  transmission: 0.95,
  opacity: 1,
  reflectivity: 0.2,
});

//Add cube and apply material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, bowlMaterial);
scene.add(cube);

//Render scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

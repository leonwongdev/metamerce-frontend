import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
console.log("🚀 ~ file: threed.js ~ line 1 ~ THREE");
/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// set to yellow
scene.background = new THREE.Color(0xe4be9b);
// use GUI to change the background color
// gui.addColor(scene, "background").name("Background Color");
// console log the real hex value
gui
  .addColor(scene, "background")
  .name("Background Color")
  .onChange(() => {
    console.log(scene.background);
  });

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.96);
directionalLight.position.set(-1.47, -1.47, 3.5);
gui.add(directionalLight, "intensity").min(0).max(3).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);

// Shadow properties
directionalLight.castShadow = true;
console.log(directionalLight.shadow);

// These are like the resolution of the shadow map
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
scene.add(directionalLight);
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.radius = 101;
// scene.add(directionalLightCameraHelper);

var lightFolder = gui.addFolder("Directional Light");

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
// sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true;
// scene.add(plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0.87;
camera.position.z = 2;
scene.add(camera);
const cameraFolder = gui.addFolder("Camera Position");
cameraFolder.add(camera.position, "x", -10, 10, 0.01);
cameraFolder.add(camera.position, "y", -10, 10, 0.01);
cameraFolder.add(camera.position, "z", -10, 10, 0.01);
// Create an object to hold the lookAt position
const lookAtPosition = { x: 0, y: 0.5, z: 0 };

// Add lookAt position properties to the GUI
const lookAtFolder = gui.addFolder("LookAt Position");
lookAtFolder
  .add(lookAtPosition, "x", -10, 10, 0.01)
  .onChange(updateCameraLookAt);
lookAtFolder
  .add(lookAtPosition, "y", -10, 10, 0.01)
  .onChange(updateCameraLookAt);
lookAtFolder
  .add(lookAtPosition, "z", -10, 10, 0.01)
  .onChange(updateCameraLookAt);

// Function to update the camera's lookAt position
function updateCameraLookAt() {
  console.log(lookAtPosition);
  camera.lookAt(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
}

// Initial update
updateCameraLookAt();

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
// If you use PCFSoftShadowMap you can't use the shadow.radius property
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("/textures/wood-light.jpeg");
// Test to load 3d model
// const loader = new GLTFLoader();
// loader.load("/textures/wooden_display_stand_rack.glb", function (gltf) {
//   gltf.scene.traverse(function (child) {
//     if (child.isMesh) {
//       // Apply the texture to the mesh material
//       child.material.map = texture;
//       child.material.needsUpdate = true;
//     }
//   });

//   scene.add(gltf.scene);
// });
// Test to load 3d model
const loader = new GLTFLoader();
loader.load("/capstone-shelf-5a.glb", function (gltf) {
  const model = gltf.scene;
  scene.add(model);
  const modelFolder = gui.addFolder("Model Position");
  modelFolder.add(model.position, "x", -10, 10, 0.01);
  modelFolder.add(model.position, "y", -10, 10, 0.01);
  modelFolder.add(model.position, "z", -10, 10, 0.01);
});

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  //  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

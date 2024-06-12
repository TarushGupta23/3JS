import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Camera path points
const cameraPath = [
    { position: new THREE.Vector3(0, 5, 5), rotation: new THREE.Euler(0, 0, 0) },
    { position: new THREE.Vector3(0, 5, -4), rotation: new THREE.Euler(-Math.PI/12, 0, 0) },    
    { position: new THREE.Vector3(5, 5, -5), rotation: new THREE.Euler(-Math.PI/2, 0, 0) },
];


// // Orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoom = false;
// controls.minPolarAngle = -Math.PI / 2; // Horizontal rotation
// controls.maxPolarAngle = -Math.PI / 2; // Horizontal rotation
// controls.enableDamping = true;
// controls.dampingFactor = 0.1;
// controls.enabled = false; // Initially disabled

// Set initial camera position and rotation
camera.position.copy(cameraPath[0].position);
camera.rotation.copy(cameraPath[0].rotation);

// Load Models
const loader = new GLTFLoader();

let laptop, file;

loader.load(
    '3dModles/laptop.glb',
    (gltf) => {
        laptop = gltf.scene;
        laptop.position.set(0, 0, -5); // Adjust position as needed
        scene.add(laptop);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

// Create file
file = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.1, 5),
    new THREE.MeshLambertMaterial({ color: 'red' })
);
file.position.set(5, 0.1, -5);
scene.add(file);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Move camera to the next position
let currentPointIndex = 0;
let isTransitioning = false; // Flag to prevent multiple transitions
let isScrolling = false; // Flag to track if user is currently scrolling
let transitionTimeout; // Timeout for delaying next transition

window.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        moveToNextPosition();
    }
});

// Add the event listener for the wheel event with appropriate options
window.addEventListener('wheel', (event) => {
    if (isTransitioning || isScrolling) return; // Ignore scroll events if transitioning or already scrolling

    isScrolling = true; // Set scrolling flag
    if (event.deltaY > 0) {
        currentPointIndex = (currentPointIndex + 1) % cameraPath.length;
    } else {
        currentPointIndex = (currentPointIndex - 1 + cameraPath.length) % cameraPath.length;
    }
    moveToNextPosition();

    // Set timeout to reset scrolling flag after delay
    clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1500); // Adjust delay as needed
}, { passive: false });

function moveToNextPosition() {
    isTransitioning = true; // Set transitioning flag
    // currentPointIndex = (currentPointIndex + 1) % cameraPath.length;
    const nextPoint = cameraPath[currentPointIndex];

    // Enable or disable orbit controls based on the current index
    // controls.enabled = (currentPointIndex === 0);

    // Animate the camera movement
    new TWEEN.Tween(camera.position)
        .to({ x: nextPoint.position.x, y: nextPoint.position.y, z: nextPoint.position.z }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
            isTransitioning = false; // Reset flag when done
        })
        .start();

    const startQuaternion = camera.quaternion.clone();
    const endQuaternion = new THREE.Quaternion().setFromEuler(nextPoint.rotation);

    new TWEEN.Tween(startQuaternion)
        .to(endQuaternion, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.quaternion.copy(startQuaternion);
        })
        .start();
}

// // Custom controls update to fix camera tilt and height
// controls.addEventListener('change', () => {
//     if (controls.enabled) {
//         // Maintain a constant height
//         camera.position.y = 5;

//         // Apply a fixed tilt
//         camera.rotation.x = 0;
//     }
// });

// Start the TWEEN animation loop
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}
animate();

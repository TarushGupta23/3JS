import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

// Camera initial position
camera.position.set(0, 5, 5);

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

// loader.load(
//     'path/to/file.glb',
//     (gltf) => {
//         file = gltf.scene;
//         file.position.set(0, -1, 0); // Adjust position as needed
//         scene.add(file);
//     },
//     undefined,
//     (error) => {
//         console.error(error);
//     }
// );

file = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.1, 5),
    new THREE.MeshLambertMaterial({color: "red"})
)
file.position.set(5, 0.1, -5)
scene.add(file)

// Animation loop
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle scroll
let scrollPercent = 0;

window.addEventListener('scroll', () => {
    scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    moveCamera();
});

function moveCamera() {
    const laptopPosition = { x: 0, y: 0, z: 5 };
    const filePosition = { x: 0, y: -1, z: 5 };

    const lerp = (a, b, t) => a + (b - a) * t;

    camera.position.x = lerp(laptopPosition.x, filePosition.x, scrollPercent);
    camera.position.y = lerp(laptopPosition.y, filePosition.y, scrollPercent);
    camera.position.z = lerp(laptopPosition.z, filePosition.z, scrollPercent);
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Adjust lookAt as needed
}

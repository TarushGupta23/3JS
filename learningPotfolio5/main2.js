import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import TWEEN from '@tweenjs/tween.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const angle15 = Math.PI/12;
const a30 = Math.PI/6;
const a45 = Math.PI/4;
const a90 = Math.PI / 2;
const a120 = 2*Math.PI/3;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// scene.add(camera)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);


// Set initial camera position and rotation
camera.position.copy(new THREE.Vector3(0, 10, 20));
// camera.rotation.copy(cameraPath[0].rotation);

// Load Models
const loader = new GLTFLoader();

let mixer = null;

loader.load(
    '3dModles/test-now.gltf',
    (gltf) => {
        // const s = 100
        // gltf.scene.scale.set(s, s, s);
        console.log(gltf)
        scene.add(gltf.scene);
        mixer = new THREE.AnimationMixer(gltf.scene)
        // const action = mixer.clipAction(gltf.animations[0])
        // action.play()
        // console.log(action)
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

// // Create file

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the TWEEN animation loop
let time = Date.now()
function animate() {
    requestAnimationFrame(animate);
    const currTime = Date.now()
    const delta = currTime - time
    time = currTime
    if (mixer != null) {
        // mixer.update(delta/1000);
    }
    renderer.render(scene, camera);
}
animate();

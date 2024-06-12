// import * as THREE from 'three';

// // Scene setup
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x88ff88, 1)
// document.body.appendChild(renderer.domElement);

// // Add initial cube
// let geometry = new THREE.BoxGeometry(10, 6, 0.5);
// let material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
// let screen = new THREE.Mesh(geometry, material);
// scene.add(screen);

// camera.position.z = 5;

// // Render loop
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();


import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CSS2D Renderer
const cssRenderer = new CSS2DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

// Load HTML content
const div = document.createElement('div');
div.innerHTML = `
    <body>
        <div>Hello and welcome to all</div>
        <p>this is a para with an article <br> <article>hlo</article></p>
    </body>
`;
const object = new CSS2DObject(div);
object.position.set(0, 0, -50); // Adjust position as needed
scene.add(object);

// Add initial cube
const geometry = new THREE.BoxGeometry(10, 6, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const screen = new THREE.Mesh(geometry, material);
scene.add(screen);

camera.position.z = 5;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
}
animate();

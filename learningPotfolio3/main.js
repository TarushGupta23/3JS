import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Add initial cube
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
let shape = new THREE.Mesh(geometry, material);
scene.add(shape);

camera.position.z = 5;

// CSS2D Renderer
const cssRenderer = new CSS2DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

// Add text label
const labelDiv = document.createElement('div');
labelDiv.className = 'label';
labelDiv.textContent = 'Information about the shape';
const labelObject = new CSS2DObject(labelDiv);
labelObject.position.set(0, 0, 0);
scene.add(labelObject);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Shape information
const shapesInfo = [
    {
        name: "A Cube",
        vertices: 8,
        edges: 12,
        faces: 6,
        formulas: "Volume = a³",
        createGeometry: () => new THREE.BoxGeometry()
    },
    {
        name: "A Cuboid",
        vertices: 8,
        edges: 12,
        faces: 6,
        formulas: "Volume = l × w × h",
        createGeometry: () => new THREE.BoxGeometry(2, 1, 1)
    },
    {
        name: "A Sphere",
        vertices: "Infinite",
        edges: "None",
        faces: 1,
        formulas: "Volume = 4/3 × π × r³",
        createGeometry: () => new THREE.SphereGeometry(1, 32, 32)
    },
    {
        name: "A Cone",
        vertices: 1 + 1, // 1 vertex at the top and 1 base circle
        edges: "1 curved edge",
        faces: 2,
        formulas: "Volume = 1/3 × π × r² × h",
        createGeometry: () => new THREE.ConeGeometry(1, 2, 32)
    },
    {
        name: "A Cylinder",
        vertices: "Infinite",
        edges: "2 curved edges",
        faces: 3,
        formulas: "Volume = π × r² × h",
        createGeometry: () => new THREE.CylinderGeometry(1, 1, 2, 32)
    }
];

let currentShapeIndex = 0;

// Function to update the shape and info
function updateShape() {
    scene.remove(shape);
    geometry = shapesInfo[currentShapeIndex].createGeometry();
    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    document.getElementById('heading').innerText = shapesInfo[currentShapeIndex].name;
    document.getElementById('content').innerHTML = `
        <p>Vertices: ${shapesInfo[currentShapeIndex].vertices}</p>
        <p>Edges: ${shapesInfo[currentShapeIndex].edges}</p>
        <p>Faces: ${shapesInfo[currentShapeIndex].faces}</p>
        <p>Formulas: ${shapesInfo[currentShapeIndex].formulas}</p>
    `;
}

// Next button event listener
document.getElementById('nextButton').addEventListener('click', () => {
    currentShapeIndex = (currentShapeIndex + 1) % shapesInfo.length;
    updateShape();
});

// Initial call to set up the first shape
updateShape();

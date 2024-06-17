import * as THREE from 'three'

/**
 * SCENE
 */
const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const aspectRatio = sizes.width/sizes.height
const camera = new THREE.OrthographicCamera(-1*aspectRatio, 1*aspectRatio, 1, -1, 0.1, 100)
// const camera = new THREE.PerspectiveCamera(25, sizes.width/sizes.height); // act same as above orthographic
camera.position.z = 5
scene.add(camera)
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * OBJECTS
 */
const material = new THREE.MeshNormalMaterial();
const geometry = new THREE.BoxGeometry(1, 2, 2.5);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

const newPos = new THREE.Vector3(1, 1, 0)
mesh.position.copy(newPos)

// console.log(mesh.position.distanceTo(camera.position))
mesh.scale.set(0.5, 0.5, 0.5)
mesh.rotation.copy(new THREE.Euler(0, 0, Math.PI / 4))

/**
 * RENDER LOOPS
 */
let clock = new THREE.Clock()
function animate() {
    renderer.render(scene, camera)

    const elapsedTime = clock.getElapsedTime()
    // 45 deg rotation in 1 sec
    mesh.rotation.y = elapsedTime * Math.PI / 4 
    mesh.rotation.x = elapsedTime * Math.PI / 4 
    
    mesh.position.y = Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)

    requestAnimationFrame(animate)
}
animate()
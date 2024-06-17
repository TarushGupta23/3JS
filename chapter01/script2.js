import * as Three from 'three'
import gsap from 'gsap'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 5;
const renderer = new Three.WebGLRenderer({
    canvas: document.getElementById('canvas')
})
renderer.setSize(sizes.width, sizes.height)
scene.add(camera)

const mesh = new Three.Mesh(
    new Three.BoxGeometry(1, 1, 1),
    new Three.MeshBasicMaterial({color: '#0FFF50', wireframe: true })
)
scene.add(mesh)

const cursor = { x: 0, y: 0 }
addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

function animate() {
    camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3
    camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)
 
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()
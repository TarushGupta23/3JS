import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const sizes = {
    w: window.innerWidth, 
    h: window.innerHeight
}
const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(45, sizes.w / sizes.h, 0.1, 100)
camera.position.set(0, 0, 5)
scene.add(camera)
const renderer = new Three.WebGLRenderer({ canvas: document.getElementById('canvas') })
renderer.setSize(sizes.w, sizes.h)

const controls = new OrbitControls(camera, document.getElementById('canvas'))
controls.target.y = 5
controls.enableDamping = true

const mesh = new Three.Mesh(
    new Three.TorusGeometry(.5, .25, 12, 16),
    new Three.MeshNormalMaterial({wireframe: true})
)
mesh.position.y = 5
scene.add(mesh)

addEventListener('dblclick', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        document.getElementById('canvas').requestFullscreen()
    }
})

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    controls.update()
}
animate()
import * as Three from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'

const sizes = {
    w: window.innerWidth, 
    h: window.innerHeight
}
const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(45, sizes.w / sizes.h, 0.1, 100)
camera.position.set(0, 0, 10)
scene.add(camera)
const renderer = new Three.WebGLRenderer({ canvas: document.getElementById('canvas') })
renderer.setSize(sizes.w, sizes.h)

const controls = new OrbitControls(camera, document.getElementById('canvas'))
controls.enableDamping = true

const gui = new GUI({
    title: 'Tarush Controls',
    closeFolders: true
})

addEventListener('keydown', (event) => {
    if (event.key === 'h') { gui.show(gui._hidden) }
})

const geometry = new Three.TorusKnotGeometry( 2, .5, 60, 12 ); 
const textureLoader = new Three.TextureLoader()

// // BASIC MATERIAL
// const material = new Three.MeshBasicMaterial({ opacity: 0.5, transparent: true, })

// // NORMAL MATERIAL
// const material = new Three.MeshNormalMaterial({ flatShading: true })

// MATCAP MATERIAL
const texture = textureLoader.load('./static/check_rim_light.jpg')
texture.colorSpace = Three.SRGBColorSpace;
const material = new Three.MeshMatcapMaterial({
    matcap: texture,
})


const mesh1 = new Three.Mesh(geometry, material)
const mesh2 = new Three.Mesh(new Three.SphereGeometry(2, 12, 12), material)
mesh1.position.x = -3
mesh2.position.x = 3
scene.add(mesh1, mesh2)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    controls.update()
}
animate()
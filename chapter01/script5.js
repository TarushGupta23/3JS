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


const light = new Three.PointLight(0xffffff, 100)
scene.add(light)
const light2 = new Three.PointLight(0xffffff, 100)
scene.add(light2)
light2.position.set(10, 0, 5)

const textureLoader = new Three.TextureLoader()

// MATCAP MATERIAL
const texture = textureLoader.load('./static/rb.jpg')
texture.colorSpace = Three.SRGBColorSpace;
const material = new Three.MeshMatcapMaterial({
    matcap: texture,
})
const gui = new GUI();

const loader = new GLTFLoader();
let laptop

const debugObject = {}
const arr = ['green.png', 'purpleGreen.png', 'rb.jpg', 'red.jpg', 'redBlue.jpg', 'variousColor.png']
let idx = 0;
debugObject.texture = () => {
    let t = textureLoader.load('./static/'+arr[idx])
    t.colorSpace = Three.SRGBColorSpace;
    laptop.children[0].material.matcap = t
    idx = (idx + 1) % arr.length;
}
gui.add(debugObject, 'texture')
loader.load(
    './static/rayquaza.glb',
    (gltf) => {
        laptop = gltf.scene;
        const s = 0.05
        laptop.scale.set(s, s, s);
        scene.add(laptop);
        console.log(laptop.children[0].material)
        laptop.children[0].material = material
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    controls.update()
}
animate()
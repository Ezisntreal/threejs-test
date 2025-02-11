import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

//sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    new THREE.MeshStandardMaterial({ roughness: 0.7, color: 'red' })
)
sphere.position.x = 1.55
sphere.position.y = 1.95
sphere.position.z = 8
scene.add(sphere)

let currentColorIndex = 0;

setInterval(() => {
    let colorWarning = "green"
    if(currentColorIndex % 2) colorWarning = "red"
    sphere.material.color.set(colorWarning);
    currentColorIndex += 1
}, 700); // 3000 milliseconds = 3 seconds

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

//light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// House container
const group = new THREE.Group()
scene.add(group)

const boxLeft = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial()
)
boxLeft.position.y = 1.25
group.add(boxLeft)


//scene.add(tunnelGroup);
const cylinderParams = {
    height: 20,
    radius: 2.05,
    segments: 32
};

const tunnel = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderParams.radius, cylinderParams.radius, cylinderParams.height, cylinderParams.segments, 1, true, Math.PI * 0.4, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.8,
        side: THREE.DoubleSide
    })
)
tunnel.rotation.x = Math.PI * 0.5
tunnel.position.y = Math.PI * 0.2
scene.add(tunnel)
const folder = gui.addFolder('Cylinder');
folder.add(cylinderParams, 'height', 1, 20).name('Height').onChange(updateCylinder);
folder.add(cylinderParams, 'radius', 1, 10).name('Radius Top').onChange(updateCylinder);
folder.add(cylinderParams, 'radius', 1, 10).name('Radius Bottom').onChange(updateCylinder);
folder.add(cylinderParams, 'segments', 8, 64).name('Segments').step(4).onChange(updateCylinder);
folder.open();

function updateCylinder() {
    tunnel.geometry.dispose();
    tunnel.geometry = new THREE.CylinderGeometry(cylinderParams.radius, cylinderParams.radius, cylinderParams.height, cylinderParams.segments, 1, true);
}

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    // Tính toán vị trí chuột
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Cập nhật raycaster
    raycaster.setFromCamera(mouse, camera);

    // Kiểm tra va chạm
    const intersects = raycaster.intersectObjects([tunnel]);

    if (intersects.length > 0) {
        // Thay đổi màu
        intersects[0].object.material.color.set(0x00ff00); // Màu xanh lá cây
    } else {
        // Trả về màu ban đầu
        tunnel.material.color.set(0xffffff);
    }
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 10
scene.add(camera)

//control
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const timer = new Timer()

const tick = () => {
    timer.update()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //udpate renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

tick()
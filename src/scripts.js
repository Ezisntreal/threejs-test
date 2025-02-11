import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

const group = new THREE.Group()
scene.add(group)

// Textures

const textureLoader = new THREE.TextureLoader()


//sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    new THREE.MeshStandardMaterial({ roughness: 0.7, color: 'red' })
)
sphere.position.x = 1.55
sphere.position.y = 1.95
sphere.position.z = 8
group.add(sphere)

let currentColorIndex = 0;

setInterval(() => {
    let colorWarning = "green"
    if (currentColorIndex % 2) colorWarning = "red"
    sphere.material.color.set(colorWarning);
    currentColorIndex += 1
}, 700); // 3000 milliseconds = 3 seconds

// Floor
const flooAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_disp_1k.jpg')

//floorColorTexture.colorSpace = THREE.SRGBColorSpace

// floorColorTexture.repeat.set(16,16)
// floorARMTexture.repeat.set(16,16)
// floorNormalTexture.repeat.set(16,16)
// floorDisplacementTexture.repeat.set(16,16)

// floorColorTexture.wrapS = THREE.RepeatWrapping
// floorARMTexture.wrapS = THREE.RepeatWrapping
// floorNormalTexture.wrapS = THREE.RepeatWrapping
// floorDisplacementTexture.wrapS = THREE.RepeatWrapping

// floorColorTexture.wrapT = THREE.RepeatWrapping
// floorARMTexture.wrapT = THREE.RepeatWrapping
// floorNormalTexture.wrapT = THREE.RepeatWrapping
// floorDisplacementTexture.wrapT = THREE.RepeatWrapping


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 28, 50, 50),
    new THREE.MeshStandardMaterial({
        wireframe: true,
        side: THREE.DoubleSide,
        //alphaMap: flooAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        //displacementScale: 0.3,
        //displacementBias: -0.2

    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = -0.5
group.add(floor)

//light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
group.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(4, 5, -2)
directionalLight.rotation.z = Math.PI * 2
group.add(directionalLight)

// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// group.add(directionalLightCameraHelper)

// House container
const tunnelColorTexture = textureLoader.load('./tunnel/brick_wall_04_diff_1k.jpg')
const tunnelARMTexture = textureLoader.load('./tunnel/brick_wall_04_arm_1k.jpg')
const tunnelNormalTexture = textureLoader.load('./tunnel/brick_wall_04_nor_gl_1k.jpg')
const tunnelDisplacementTexture = textureLoader.load('./tunnel/brick_wall_04_disp_1k.jpg')

const tunnel2ColorTexture = textureLoader.load('./textures/mixed_stone_tiles_diff_1k.jpg')
const tunnel2ARMTexture = textureLoader.load('./textures/mixed_stone_tiles_arm_1k.jpg')
const tunnel2NormalTexture = textureLoader.load('./textures/mixed_stone_tiles_nor_gl_1k.jpg')
const tunnel2DisplacementTexture = textureLoader.load('./textures/mixed_stone_tiles_disp_1k.jpg')

const tunnel3ColorTexture = textureLoader.load('./textures2/rubber_tiles_diff_1k.jpg')
const tunnel3ARMTexture = textureLoader.load('./textures2/rubber_tiles_arm_1k.jpg')
const tunnel3NormalTexture = textureLoader.load('./textures2/rubber_tiles_nor_gl_1k.jpg')


tunnel3ColorTexture.repeat.set(8, 8)
tunnel3ARMTexture.repeat.set(8, 8)
tunnel3NormalTexture.repeat.set(8, 8)
tunnel2DisplacementTexture.repeat.set(8, 8)

tunnel3ColorTexture.wrapS = THREE.RepeatWrapping
tunnel3ARMTexture.wrapS = THREE.RepeatWrapping
tunnel3NormalTexture.wrapS = THREE.RepeatWrapping
tunnel2DisplacementTexture.wrapS = THREE.RepeatWrapping

tunnel3ColorTexture.wrapT = THREE.RepeatWrapping
tunnel3ARMTexture.wrapT = THREE.RepeatWrapping
tunnel3NormalTexture.wrapT = THREE.RepeatWrapping
tunnel2DisplacementTexture.wrapT = THREE.RepeatWrapping
// tunnelColorTexture.rotation = Math.PI / 2
// tunnelARMTexture.rotation = Math.PI * 0.5
// tunnelNormalTexture.rotation = Math.PI * 0.5
// tunnelDisplacementTexture.rotation = Math.PI * 0.5

// tunnelColorTexture.center.set(0.5, 0.5);
// tunnelARMTexture.center.set(0.5, 0.5);
// tunnelNormalTexture.center.set(0.5, 0.5);
// tunnelDisplacementTexture.center.set(0.5, 0.5);

tunnelColorTexture.repeat.set(2, 2)
tunnelARMTexture.repeat.set(2, 2)
tunnelNormalTexture.repeat.set(2, 2)
tunnelDisplacementTexture.repeat.set(2, 2)

tunnelColorTexture.wrapS = THREE.RepeatWrapping
tunnelARMTexture.wrapS = THREE.RepeatWrapping
tunnelNormalTexture.wrapS = THREE.RepeatWrapping
tunnelDisplacementTexture.wrapS = THREE.RepeatWrapping

tunnelColorTexture.wrapT = THREE.RepeatWrapping
tunnelARMTexture.wrapT = THREE.RepeatWrapping
tunnelNormalTexture.wrapT = THREE.RepeatWrapping
tunnelDisplacementTexture.wrapT = THREE.RepeatWrapping

// const boxLeft = new THREE.Mesh(
//     new THREE.BoxGeometry(6, 2.7, 2),
//     new THREE.MeshStandardMaterial()
// )
// boxLeft.position.y = 1.35
// boxLeft.position.z = 11
// group.add(boxLeft)

const boxRight = new THREE.Mesh(
    new THREE.BoxGeometry(6, 2.7, 4),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        // map: tunnelColorTexture,
        // aoMap: tunnelARMTexture,
        // roughnessMap: tunnelARMTexture,
        // metalnessMap: tunnelARMTexture,
        // normalMap: tunnelNormalTexture,

    })
)
boxRight.position.y = 1.35
boxRight.position.x = -6
boxRight.position.z = -12
group.add(boxRight)

const cylinderParams = {
    height: 10,
    radius: 2.05,
    segments: 32
};

const tunnelLeft = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderParams.radius, cylinderParams.radius, cylinderParams.height, cylinderParams.segments, 1, true, Math.PI * 0.4, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        //displacementMap: tunnelDisplacementTexture,
        // map: tunnel3ColorTexture,
        // aoMap: tunnel3ARMTexture,
        // roughnessMap: tunnel3ARMTexture,
        // metalnessMap: tunnel3ARMTexture,
        // normalMap: tunnel3NormalTexture,
    })
)
tunnelLeft.rotation.x = Math.PI * 0.5
tunnelLeft.position.y = Math.PI * 0.2
tunnelLeft.position.z = 7
group.add(tunnelLeft)

const tunnelLeft2 = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderParams.radius - 0.1, cylinderParams.radius - 0.1, cylinderParams.height, cylinderParams.segments, 1, true, Math.PI * 0.4, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.8,
        side: THREE.DoubleSide,
    })
)
tunnelLeft2.rotation.x = Math.PI * 0.5
tunnelLeft2.position.y = Math.PI * 0.2
tunnelLeft2.position.z = 7
group.add(tunnelLeft2)


// const folder = gui.addFolder('Cylinder');
// folder.add(cylinderParams, 'height', 1, 20).name('Height').onChange(updateTunnelLeft);
// folder.add(cylinderParams, 'radius', 1, 10).name('Radius Top').onChange(updateTunnelLeft);
// folder.add(cylinderParams, 'radius', 1, 10).name('Radius Bottom').onChange(updateTunnelLeft);
// folder.add(cylinderParams, 'segments', 8, 64).name('Segments').step(4).onChange(updateTunnelLeft);
// folder.open();

function updateTunnelLeft() {
    tunnelLeft.geometry.dispose();
    tunnelLeft.geometry = new THREE.CylinderGeometry(cylinderParams.radius, cylinderParams.radius, cylinderParams.height, cylinderParams.segments, 1, true);
}

const tunnelRight = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderParams.radius, cylinderParams.radius, cylinderParams.height, cylinderParams.segments, 1, true, Math.PI * 0.4, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.8,
        side: THREE.DoubleSide
    })
)
tunnelRight.rotation.x = Math.PI * 0.5
tunnelRight.position.y = Math.PI * 0.2
tunnelRight.position.z = -7
group.add(tunnelRight)

const tunnelRight2 = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderParams.radius - 0.1, cylinderParams.radius - 0.1, cylinderParams.height, cylinderParams.segments, 1, true, Math.PI * 0.4, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.8,
        side: THREE.DoubleSide
    })
)
tunnelRight2.rotation.x = Math.PI * 0.5
tunnelRight2.position.y = Math.PI * 0.2
tunnelRight2.position.z = -7
group.add(tunnelRight2)

const tunnelCenter = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderParams.radius, cylinderParams.radius, 4, cylinderParams.segments, 1, true, Math.PI * 0.4, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.8,
        side: THREE.DoubleSide
    })
)
tunnelCenter.rotation.x = Math.PI * 0.5
tunnelCenter.position.y = Math.PI * 0.2
group.add(tunnelCenter)

const tunnelCenter2 = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderParams.radius - 0.1, cylinderParams.radius - 0.1, 4, cylinderParams.segments, 1, true, Math.PI * 0.4, Math.PI * 1.2),
    new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.8,
        side: THREE.DoubleSide
    })
)
tunnelCenter2.rotation.x = Math.PI * 0.5
tunnelCenter2.position.y = Math.PI * 0.2
group.add(tunnelCenter2)

// Graves
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const graveGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.1)
const graveMaterial = new THREE.MeshStandardMaterial()

const graves = new THREE.Group()
group.add(graves)

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const x = i > 15 ? -3 - getRandomNumber(1, 6) : 3 + getRandomNumber(1, 6)
    const z = Math.cos(angle) * getRandomNumber(3, 7)
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', onMouseMove, false);

window.addEventListener("dblclick", function (event) {
    // Tính toán vị trí chuột
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Cập nhật raycaster
    raycaster.setFromCamera(mouse, camera);
    checkDoubleIntersects(tunnelLeft, "hầm trái")
    checkDoubleIntersects(tunnelRight, "hầm phải")
    checkDoubleIntersects(tunnelCenter, "hầm giữa")
});

function checkDoubleIntersects(geo, pos) {
    const intersects = raycaster.intersectObjects([geo]);
    if (intersects.length > 0) {
        alert("vị trí dbclick " + pos)
    }
}

function checkIntersects(geo) {
    const intersects = raycaster.intersectObjects([geo]);
    if (intersects.length > 0) {
        // Thay đổi màu
        intersects[0].object.material.color.set(0x00ff00); // Màu xanh lá cây
    } else {
        // Trả về màu ban đầu
        geo.material.color.set(0xffffff);
    }
}

function onMouseMove(event) {
    // Tính toán vị trí chuột
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Cập nhật raycaster
    raycaster.setFromCamera(mouse, camera);

    // Kiểm tra va chạm
    checkIntersects(tunnelLeft)
    checkIntersects(tunnelCenter)
    checkIntersects(tunnelRight)
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 16
camera.position.y = 8
camera.position.z = 1
scene.add(camera)

const helper = new THREE.CameraHelper(camera);
group.add(helper)

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

    updateCameraPosition()
    helper.update();
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

window.addEventListener('keydown', (event) => (keyState[event.code] = true));
window.addEventListener('keyup', (event) => (keyState[event.code] = false));
const keyState = {};

function updateCameraPosition() {
    const speed = 0.2;
    if (keyState['ArrowUp']) group.position.x += speed;
    if (keyState['ArrowDown']) group.position.x -= speed;
    if (keyState['ArrowLeft']) group.position.z -= speed;
    if (keyState['ArrowRight']) group.position.z += speed;
}

tick()
import * as THREE from 'three';
import { CSS2DRenderer, CSS3DRenderer, OrbitControls } from 'three/examples/jsm/Addons.js';
import mesh from './mesh2.js';

const scene = new THREE.Scene();

scene.add(mesh);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(300, 500, 200);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

// 标注信息2D
const css2Renderer = new CSS2DRenderer();
css2Renderer.setSize(width, height);

const div = document.createElement('div');
div.style.position = 'relative';
div.style.color = '#fff';
div.appendChild(css2Renderer.domElement);
css2Renderer.domElement.style.position = 'absolute';
css2Renderer.domElement.style.left = '0px';
css2Renderer.domElement.style.top = '0px';
css2Renderer.domElement.style.pointerEvents = 'none';

div.appendChild(renderer.domElement);
document.body.appendChild(div);

// 标注信息3D
const css3Renderer = new CSS3DRenderer();
css3Renderer.setSize(width, height);

const div3D = document.createElement('div');
div3D.style.position = 'relative';
div3D.style.color = '#00f';
div3D.appendChild(css3Renderer.domElement);
css3Renderer.domElement.style.position = 'absolute';
css3Renderer.domElement.style.left = '0px';
css3Renderer.domElement.style.top = '0px';
css3Renderer.domElement.style.pointerEvents = 'none';

div3D.appendChild(renderer.domElement);
document.body.appendChild(div3D);

function render() {
    css2Renderer.render(scene, camera);
    css3Renderer.render(scene, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

// document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// 增加屏幕缩放时更新渲染器和css2Renderer的尺寸
window.onresize = function () {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    css2Renderer.setSize(width, height);

    camera.aspect = width / height;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
}

// 增加点击时，显示标注信息
renderer.domElement.addEventListener('click', function (event) {
    const y = -((event.offsetY / height) * 2 - 1);
    const x = ((event.offsetX / width) * 2 - 1);

    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

    // const intersections = rayCaster.intersectObject(mesh.children);
    // console.log('intersections', intersections);

    // if(intersections.length) {
    //     const obj = intersections[0].object;
    //     const tag = obj.getObjectByName('tag');
    //     console.log('tag', tag);
    //     if(tag) {
    //         tag.visible = !tag.visible;
    //     }
    // }
});
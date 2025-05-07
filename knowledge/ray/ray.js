// 射线：3D场景中点击的实现就是基于射线。
// 确定射线的起点和方向，即可形成一条射线。

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh2.js'

const scene = new THREE.Scene();
scene.add(mesh);

const axeHelper = new THREE.AxesHelper(500);
scene.add(axeHelper);

const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(400, 500, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.domElement.addEventListener('click', (e) => {
    const y = -((e.offsetY / height) * 2 - 1);
    const x = (e.offsetX / width) * 2 - 1;

    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

    // 可视化射线
    // const arrowHelper = new THREE.ArrowHelper(rayCaster.ray.direction, rayCaster.ray.origin, 600);
    // scene.add(arrowHelper);

    const intersects = rayCaster.intersectObjects(mesh.children);

    intersects.forEach(item => {
        item.object.material.color.set('pink');
    });
});
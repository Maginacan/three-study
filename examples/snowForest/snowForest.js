import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mountainside from './mountainside.js';
import snow from './snow.js';

const scene = new THREE.Scene();

scene.add(mountainside);
scene.add(snow);

const directionLight = new THREE.DirectionalLight(0xffffff, 5);
directionLight.position.set(1000, 1000, 1000);
directionLight.castShadow = true;
directionLight.shadow.camera.left = -2000;
directionLight.shadow.camera.right = 2000;
directionLight.shadow.camera.top = 2000;
directionLight.shadow.camera.bottom = -2000;
directionLight.shadow.camera.near = 0.5;
directionLight.shadow.camera.far = 10000;
scene.add(directionLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 100, 10000);
camera.position.set(500, 500, 1600);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    // 开启抗锯齿
    antialias: true,
});
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.setClearColor('darkblue');

// 增加相机旋转效果
let angle = 0;
let c = 1000;
function render() {
    angle += 0.01;
    camera.position.x = c * Math.sin(angle);
    camera.position.z = c * Math.cos(angle);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
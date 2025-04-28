/**
 * AmbientLight 环境光, 用于模拟自然光，均匀照亮整个场景
 * DirectionalLight 平行光, 用于模拟太阳光，从特定方向照亮场景
 * PointLight 点光源, 从特定位置照亮场景，可以模拟灯泡
 * SpotLight 聚光灯, 从特定位置照亮场景，可以模拟手电筒、舞台的灯光
 * HemisphereLight 半球光, 两种颜色的光，比如天空颜色、地面颜色相互叠加
 * RectAreaLight 矩形区域光, 类似窗户、LED灯管等从一个面发光的效果
 */
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
// import { mesh, light } from './DirectionalLight.js';
// import { mesh, light } from './PointLight.js';
import { mesh, light } from './AmbientLight.js';

const scene = new THREE.Scene();
scene.add(mesh, light);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(200, 800, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

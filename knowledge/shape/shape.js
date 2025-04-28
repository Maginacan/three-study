/**
 * 使用规律进行几何体生成
 * THREEJS中可以使用顶点创建几何体，但是使用顶点创建几何体会非常麻烦，而且不易控制
 * LatheGeometry 可以由曲线绕 y 轴旋转生成几何体，非常适用于创建螺旋形的几何体
 * TubeGeometry 可以由曲线生成一定半径的空心管道
 * ShapeGeometry 可以由多边形生成几何体，非常适用于创建复杂的平面图形
 * ExtrudeFeometry 可以通过拉伸shape生成几何体
 */

import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import shapeGeometryMesh from './ShapeGeometry.js'

const scene = new THREE.Scene();

scene.add(shapeGeometryMesh);

// 平行光源
const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(100, 100, 100);
scene.add(directionLight);

// 增加环境光
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(200, 200, 200);
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
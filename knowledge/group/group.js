/**
 * Scene中可以添加很多对象，比如摄像机、灯光、网格等
 * 我们将一个mesh直接添加到scene中，或者将一个mesh添加到group中，再将group添加到scene中，这两者是不一样的。
 */

import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';

const scene = new THREE.Scene();

// // 直接将mesh添加到scene中
// scene.add(mesh);
// mesh.position.x = 200;
// mesh.translateZ(200);

// 将mesh添加到group中
const group = new THREE.Group();
mesh.name = 'group'
group.add(mesh);
scene.add(group);
group.position.x = 200;
group.translateZ(200);
mesh.position.x = 200; // 这个时候mesh的x就是400
// 世界坐标：将mesh添加到group中后，他的绝对坐标就是group的position+mesh的position
// 局部坐标：mesh在group内部的position

// 获取一个mesh的世界坐标
const pos = new THREE.Vector3();
mesh.getWorldPosition(pos);
console.log('world pos', pos); // [400, 0, 200]
console.log('group.pos', group.position); // [200, 0, 200]
console.log('mesh.pos', mesh.position); // [200, 0, 0]

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(3000, 2000, 1000);
scene.add(light);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const axesHelper2Group = new THREE.AxesHelper(1000);
group.add(axesHelper2Group);

// scene.scale.set(0.1,0.1,0.1);
// console.log('scene', scene);
// console.log('group', group);

scene.traverse((obj) => {
    console.log('obj', obj);
    if(obj.isMesh) {
        obj.material.color = new THREE.Color('pink');
    }
})

// 如果想找某个名字的对象，可以使用 getObjectByName api来查找
// getObjectById 是根据id查找
const groupScene = scene.getObjectByName('group');
groupScene.material.color = new THREE.Color('lightgreen');

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(500, 500, 500);
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


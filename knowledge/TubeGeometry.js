// 使用曲线生成一个管道
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const p1 = new THREE.Vector3(-100, 0, 0);
const p2 = new THREE.Vector3(50, 100, 0);
const p3 = new THREE.Vector3(100, 0, 100);
const p4 = new THREE.Vector3(100, 0, 0);

const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

const geometry = new THREE.TubeGeometry(curve, 50, 20, 20);

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('blue'),
    side: THREE.DoubleSide,
    // wireframe: true,
})

const tubeGeometrymesh = new THREE.Mesh(geometry, material);

const gui = new GUI();

const obj = {
    tubularSegments: 50,
    radius: 20,
    radialSegements: 20,
}

function onChange() {
    tubeGeometrymesh.geometry = new THREE.TubeGeometry(curve, obj.tubularSegments, obj.radius, obj.radialSegements);
}

gui.add(obj, "tubularSegments").onChange(onChange).min(3).max(100).step(1).name('管道方向分段数');
gui.add(obj, "radius").onChange(onChange).min(10).max(100).step(1).name('管道半径');
gui.add(obj, "radialSegements").onChange(onChange).min(3).max(100).step(1).name('管道径向分段数');

export default tubeGeometrymesh;
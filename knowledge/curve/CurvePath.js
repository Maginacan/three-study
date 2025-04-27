// 组合多条曲线在一起
import * as THREE from 'three';

const p1 = new THREE.Vector2(0, 0);
const p2 = new THREE.Vector2(100, 100);
const line1 = new THREE.LineCurve(p1, p2);

const arc = new THREE.EllipseCurve(0, 100, 100 , 100, 0, Math.PI);

const p3 = new THREE.Vector2(-100, -100);
const line2 = new THREE.LineCurve(p1, p3);

const curvePath = new THREE.CurvePath();
curvePath.add(line1);
curvePath.add(arc);
curvePath.add(line2);

const pointsArr = curvePath.getPoints(20);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.MeshBasicMaterial({
    color: 'gray'
})

const curveLine = new THREE.Line(geometry, material);

export default curveLine;
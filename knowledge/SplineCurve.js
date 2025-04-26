// 不规则曲线
import * as THREE from 'three';

const arr = [
    new THREE.Vector2(-100, 0),
    new THREE.Vector2( -50, 50 ),
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2( 50, -50 ),
	new THREE.Vector2( 100, 0 ),
]

const curve = new THREE.SplineCurve(arr);
const pointList = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointList);

const material = new THREE.LineBasicMaterial({ 
    color: new THREE.Color('orange') 
});

const splineCurveLine = new THREE.Line( geometry, material );

export default splineCurveLine;
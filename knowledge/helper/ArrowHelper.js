import * as THREE from 'three';

const origin = new THREE.Vector3(0, 0, 0);

const direction = new THREE.Vector3(1, 2, 0);
direction.normalize();

const arrowHelper = new THREE.ArrowHelper(direction, origin, 500, new THREE.Color('yellow'));

export default arrowHelper;
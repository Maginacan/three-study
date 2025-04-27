import * as THREE from 'three';

const foundation = new THREE.BoxGeometry(4000, 300, 3000);
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('gray'),
})

const foundationMesh = new THREE.Mesh(foundation, material);

export default foundationMesh;
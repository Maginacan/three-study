import * as THREE from 'three';

const pointArr = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 2000),
    new THREE.Vector2(-1500, 3000),
    new THREE.Vector2(-3000, 2000),
    new THREE.Vector2(-3000, 0),
]

const shape = new THREE.Shape(pointArr);

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100,
})

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('lightGray')
})

const sideWall = new THREE.Mesh(geometry, material);

export default sideWall;
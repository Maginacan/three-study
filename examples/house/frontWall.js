import * as THREE from 'three'

const pointArr = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(4000, 0),
    new THREE.Vector2(4000, 2000),
    new THREE.Vector2(0, 2000),
]

const shape = new THREE.Shape(pointArr);

const door = new THREE.Path();
door.moveTo(1000, 0);
door.lineTo(2000, 0);
door.lineTo(2000, 1500);
door.lineTo(1000, 1500);
shape.holes.push(door);

const win = new THREE.Path();
win.moveTo(2500, 500);
win.lineTo(3500, 500);
win.lineTo(3500, 1500);
win.lineTo(2500, 1500);
shape.holes.push(win);

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100
})



const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('lightgrey')
})

const frontWallMesh = new THREE.Mesh(geometry, material);

export default frontWallMesh;
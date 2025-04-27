import * as THREE from 'three';
import foundationMesh from './foundation.js'
import sideWall from './sideWall.js'

const houseMesh = new THREE.Group();
houseMesh.add(foundationMesh);

sideWall.rotateY(Math.PI / 2);
sideWall.translateX(1500);
sideWall.translateZ(2000);
sideWall.translateY(-150);
houseMesh.add(sideWall)

export default houseMesh;
import * as THREE from 'three';
import foundationMesh from './foundation.js'
import sideWall from './sideWall.js'
import behindWallMesh from './behindWall.js'
import frontWallMesh from './frontWall.js'
import roof from './roof.js'
import doorstep from './doorStep.js'

const houseMesh = new THREE.Group();
houseMesh.add(foundationMesh);

sideWall.rotateY(Math.PI / 2);
sideWall.translateX(1500);
sideWall.translateZ(2000);
sideWall.translateY(-150);
houseMesh.add(sideWall)

const sideWall2 = sideWall.clone();
sideWall2.translateZ(-4000);
houseMesh.add(sideWall2)

houseMesh.add(behindWallMesh);

frontWallMesh.translateX(-2000);
frontWallMesh.translateZ(1400);
frontWallMesh.translateY(-150);
houseMesh.add(frontWallMesh);

houseMesh.add(roof);

const roof2 = roof.clone();
roof2.rotateX( 70 / 180 * Math.PI);
roof2.position.z = -roof.position.z;
houseMesh.add(roof2);

houseMesh.add(doorstep);

export default houseMesh;
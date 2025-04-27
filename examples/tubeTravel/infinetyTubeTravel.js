import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import infinetyMesh from './infinetyMesh.js';

const scene = new THREE.Scene();

scene.add(infinetyMesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(0.9, -520, 6.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

let H = 0;
const clock = new THREE.Clock();
function render() {
    // infinetyMesh.material.map.offset.y += 0.01;
    // infinetyMesh.material.map.offset.y += clock.getDelta() * 0.5;

    infinetyMesh.material.alphaMap.offset.y += clock.getDelta() * 0.5;

    H += 0.002;
    if(H > 1){
        H = 0;
    }
    infinetyMesh.material.color.setHSL(H, 0.5, 0.5);
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

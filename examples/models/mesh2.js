import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/' );
dracoLoader.setDecoderPath('../../public/gltf/');
loader.setDRACOLoader(dracoLoader);

const mesh = new THREE.Group();

loader.load("../models/Michelle-small.glb", function (gltf) {
    console.log(gltf);
    gltf.scene.scale.setScalar(5);
    mesh.add(gltf.scene);
})

export default mesh;

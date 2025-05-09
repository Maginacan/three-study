import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const mesh = new THREE.Group();
const loader = new GLTFLoader();

loader.load('../../models/Michelle.glb', function (gltf) {
    const michelle = gltf.scene;
    mesh.add(michelle);
    gltf.scene.scale.set(200, 200, 200);
    mesh.position.set(0, -150, 0);

    const mixer = new THREE.AnimationMixer(mesh);
    const clipAction = mixer.clipAction(gltf.animations[0]);
    clipAction.play();

    const clock = new THREE.Clock();

    function render() {
        const delta = clock.getDelta();
        mixer.update(delta);
        requestAnimationFrame(render);
    }

    render();
})

export default mesh;
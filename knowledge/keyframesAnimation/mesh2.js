import * as THREE from 'three';
import { GLTFLoader, CSS2DObject, CSS3DObject } from 'three/examples/jsm/Addons.js';
import createCanvas from './createCanvas';

const mesh = new THREE.Group();
const loader = new GLTFLoader();

// 标注信息2D
const ele = document.createElement('div');
ele.innerHTML = '<p>This is Michelle!</p>';
const obj = new CSS2DObject(ele);
obj.position.x = 100;
mesh.add(obj);
obj.name = 'tag';
obj.visible = true;

// 标注信息3D
const ele3d = document.createElement('div');
ele3d.innerHTML = '<p>This is Michelle-3D!</p>';
// 反面不可见
ele3d.style.backfaceVisibility = 'hidden';
const obj3D = new CSS3DObject(ele3d);
mesh.add(obj3D);

// 在使用 CSS3DObject 和 CSS2DObject 时，无法进行缩放
// 使用sprite来绘制标注，除了不能创建dom外，可以进行缩放
const texture = new THREE.CanvasTexture(createCanvas('Michelle'));
const sproteMaterial = new THREE.SpriteMaterial({
    color: 'lightgreen',
    map: texture,
});
const spriteMesh = new THREE.Sprite(sproteMaterial);
spriteMesh.scale.set(80, 50);
spriteMesh.position.set(0, 350, 0);
mesh.add(spriteMesh);

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
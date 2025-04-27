import * as THREE from 'three';

const geometry = new THREE.CylinderGeometry(30, 50, 1000, 32, 32, true);

const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/storm.png');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 2);

const material = new THREE.MeshBasicMaterial({
    // color: new THREE.Color('pink'),
    side: THREE.BackSide,
    // map: texture,
    // 使用灰度纹理
    transparent: true,
    // 反面贴图
    alphaMap: texture,
})

const infinetyMesh = new THREE.Mesh(geometry, material);

export default infinetyMesh;
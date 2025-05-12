import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('../../assets/zhuan.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.TorusGeometry(300, 100);
const material = new THREE.MeshPhysicalMaterial({
    color: 'blue',
    // 光泽：表示布料和织物材料的光泽度，范围从0到1，默认值为0。
    sheen: 1,
    sheenRoughness: 1,
    sheenColor: 'white',
    sheenColorMap: texture,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;

import * as THREE from 'three';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const textureCube = new THREE.CubeTextureLoader()
    .setPath('../../models/city/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

const geometry = new THREE.SphereGeometry(300);
const material = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0,
    roughness: 0,
    transmission: 1,
    envMap: textureCube,
    // 彩虹层
    // 彩虹层强度
    iridescence: 1,
    // 彩虹层折射率
    iridescenceIOR: 1.8,
    // 反射率
    reflectivity: 1,
});

const gui = new GUI();
gui.addColor(material, 'color');


const mesh = new THREE.Mesh(geometry, material);

export default mesh;

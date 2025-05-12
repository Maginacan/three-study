import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const gui = new GUI();
const body = gui.addFolder('车身');
const win = gui.addFolder('车窗');



const loader = new GLTFLoader();
const mesh = new THREE.Group();

const textureCube = new THREE.CubeTextureLoader()
                        .setPath('../../models/forest/')
                        .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

loader.load('../../models/car.glb', (gltf) => {
    mesh.add(gltf.scene);
    gltf.scene.scale.setScalar(30);
    gltf.scene.traverse((child) => {
        if(child.isMesh) {
            if(child.material.isMeshPhysicalMaterial) {
                child.material.envMap = textureCube;
                child.material.envMapIntensity = 2;
            };
            if(child.name === '车身') {
                // 金属度
                child.material.metalness = 0.9;
                // 粗糙度
                child.material.roughness = 0.2;
                // 在表面增加一层薄薄的半透明材质
                child.material.clearcoat = 1;
                // 表面粗糙度
                child.material.clearcoatRoughness = 0.1;

                body.addColor(child.material, 'color');
                body.add(child.material, 'metalness', 0, 1);
                body.add(child.material, 'roughness', 0, 1);
                body.add(child.material, 'clearcoat', 0, 1);
                body.add(child.material, 'clearcoatRoughness', 0, 1);
            }

            if(child.name === '车窗') {
                child.material.color.set(0xffffff);
                // 透光率
                child.material.transmission = 1;
                // 折射率（0-2.33）
                child.material.ior = 1.3;
                win.add(child.material, 'roughness', 0, 1);  
                win.addColor(child.material, 'color');
                win.add(child.material, 'transmission', 0, 1);
                win.add(child.material, 'ior', 1, 2.3);
                win.add(child.material, 'metalness', 0, 1);
            }

            
        }
    });
});

export default mesh;
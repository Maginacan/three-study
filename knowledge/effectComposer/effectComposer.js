import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import mesh from './mesh.js';

const scene = new THREE.Scene();

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(300, 200, 400);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(0, 500, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

// 后期效果增加
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 增加描边效果
const outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
composer.addPass(outlinePass);
// 描边颜色
outlinePass.visibleEdgeColor.set('orange');
// 亮度
outlinePass.edgeStrength = 10;
// 描边厚度
outlinePass.edgeThickness  = 10;
// 闪烁
outlinePass.pulsePeriod  = 1;

// 增加发光效果
const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
bloomPass.threshold = 0;
bloomPass.strength = 0; // 发光强度
bloomPass.radius = 0;
composer.addPass(bloomPass);



function render() {
    composer.render();
    // renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

let selectedObject = null;
renderer.domElement.addEventListener('click', (e) => {
  const y = -((e.offsetY / height) * 2 - 1);
  const x = (e.offsetX / width) * 2 - 1;

  const rayCaster = new THREE.Raycaster();
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersections = rayCaster.intersectObjects(mesh.children);

  if(intersections.length > 0) {
    // 选中时增加描边效果
    outlinePass.selectedObjects = [intersections[0].object];
    selectedObject = intersections[0].object;
    // 增加发光强度
    // selectedObject.material.emissiveIntensity = 1;
    selectedObject.material.emissive.set(0x00ff00); 
    selectedObject.material.needsUpdate = true;
    // 选中时增加发光效果
    // if(!composer.passes.includes(bloomPass)) {
    //     composer.addPass(bloomPass);
    // }
  } else {
    outlinePass.selectedObjects = [];
    // 移除发光效果
    if (selectedObject) {
        selectedObject.material.emissiveIntensity = 0;
    }
  }

//   intersections.forEach(item => {
//     item.object.material.color.set('pink')
//   });
});


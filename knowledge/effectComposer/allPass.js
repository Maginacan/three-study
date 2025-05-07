import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import {EffectComposer, RenderPass, GlitchPass, AfterimagePass, BloomPass, BokehPass, FilmPass, GammaCorrectionShader, HalftonePass, OutlinePass, ShaderPass, SMAAPass, UnrealBloomPass } from 'three/addons/Addons.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(300, 300, 300);
const material = new THREE.MeshLambertMaterial({
  color: 'pink'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(400, 500, 600);
camera.lookAt(0, 0, 0);

// 默认渲染的模型是有锯齿的
const renderer = new THREE.WebGLRenderer({
    // 开启抗锯齿
    antialias: true,
});


renderer.setSize(width, height)

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 故障闪屏： 每过几秒就会闪屏
// const glitchPass = new GlitchPass();
// composer.addPass(glitchPass);
// 残影：在物体运动时，会留下残影
// const afterimagePass = new AfterimagePass();
// composer.addPass(afterimagePass);
// 电影雪花
// const filmPass = new FilmPass(0.5, false);
// composer.addPass(filmPass);
// 发光效果
// const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height));
// composer.addPass(bloomPass);
// 三色圆点效果
// const halftonePass = new HalftonePass({
//     radius: 8,
// });
// composer.addPass(halftonePass);
// 描边效果
// const outLinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
// outLinePass.selectedObjects = [mesh];
// outLinePass.visibleEdgeColor.set('blue');
// outLinePass.edgeStrength = 20;
// outLinePass.edgeThickness = 10;
// outLinePass.pulsePeriod = 1;
// composer.addPass(outLinePass);
// 或者使用后期处理
// const pixelRatio = renderer.getPixelRatio();
// const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
// composer.addPass(smaaPass);
// 伽马矫正：在使用多个后期处理pass后会导致颜色不正确，就可以使用伽马矫正来进行处理
const gammaPass= new ShaderPass(GammaCorrectionShader);
composer.addPass(gammaPass);
function render() {
    composer.render();
    // renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

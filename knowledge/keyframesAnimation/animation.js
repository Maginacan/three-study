// 关键帧动画：有些模型中就自带关键帧动画
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh2.js';

const scene = new THREE.Scene();

scene.add(mesh);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

// 定义mesh名称
mesh.name = 'Box';
// 确定时间线
const times = [0, 2, 5];
// 确定各时间的顶点值 x,y,z为一组
const values = [0, 0, 0, 0, 100, 0, 0, 0, -100];
const track = new THREE.KeyframeTrack('Box.position', times, values);

const times2 = [0, 2, 5];
const values2 = [1, 1, 1, 1, 2, 1, 1, 0.5, 1];
const track2 = new THREE.KeyframeTrack('Box.scale', times2, values2);

// 定义动画名称和持续时间
const clip = new THREE.AnimationClip('move', 5, [track, track2]);

// 使用 AnimationMixer 进行动画播放
const mixer = new THREE.AnimationMixer(mesh);
const clipAction = mixer.clipAction(clip);
clipAction.play();
// 也可调整播放速度和进行暂停操作等
clipAction.timeScale = 2;
setTimeout(() => {
    clipAction.paused = true;
}, 5000);

const clock = new THREE.Clock();
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    const delta = clock.getDelta();
    mixer.update(delta);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


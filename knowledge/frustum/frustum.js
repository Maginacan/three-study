import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// 视锥体
{
    const scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0);

    const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
    const cameraHelper = new THREE.CameraHelper(camera2);
    scene.add(cameraHelper);

    const gui = new GUI();
    function onChange() {
        camera2.updateProjectionMatrix();
        cameraHelper.update();
    }
    // 我们看见的三维世界，就是下面的near和far之间的部分
    // near默认为0.1，调大可以裁掉近距离的物体
    // far默认为2000，调大可以让裁掉的物体显示更完整
    // fov默认为50，可以通过调整fov，减小fov值，可以让物体离得远一点，让物体看起来更大
    // aspect默认为1（正方形画布），一般设置为网页的宽高比
    // 在调整物体远近时，也可以调整相机的位置，让物体看起来更小
    gui.add(camera2, 'fov', [30, 60, 10]).onChange(onChange);
    gui.add(camera2, 'aspect', {
        '16/9': 16/9,
        '4/3': 4/3,
        '1/1': 1
    }).onChange(onChange);
    gui.add(camera2, 'near', 0, 300).onChange(onChange);
    gui.add(camera2, 'far', 300, 800).onChange(onChange);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height)

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();

    document.body.append(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

}


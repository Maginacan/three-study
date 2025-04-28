// ThreeJS的三维世界：由一个个物体组成。
// 物体包含几何体和材质，几何体定义了物体的形状，材质定义了物体的颜色、纹理等属性，最后组成一个Mesh。
// Mesh可以通过Group分组，最终构成一棵树（类似于DOM树）
// 最终组成三维世界的是：
// 1. 场景(scene)：物体的集合。
// 2. 相机(camera)：观察世界的视角。
// 3. 渲染器(renderer)：将三维世界绘制到屏幕上。
// 4. 灯光(light)：为场景提供光源，实现不同的明暗效果。

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 创建常规三维
{
    const scene = new THREE.Scene();
    // First Mesh
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial(({
        // 支持多种颜色方式HSL,HEX,RGBA等
        color: new THREE.Color('orange'),
        opacity: 0.5,
    }));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    // add mesh to scene
    scene.add(mesh);

    // Light
    // 支持rgba，red，#fff等格式
    // 10000为光照强度，默认值为1，越大越亮
    const pointLight = new THREE.PointLight('rgba(255,255,255,0.5)', 20000); 
    // 设置光源位置，默认照向(0,0,0)点，所以需要设置位置才能看到效果
    pointLight.position.set(80, 80, 80);
    // add light to scene
    scene.add(pointLight);

    // 增加GUI控制
    const gui = new GUI();
    // 使用Folder创建分组，控制Mesh
    const meshFolder = gui.addFolder('Mesh');
    meshFolder.addColor(mesh.material, 'color')
    // step为步长，按键盘上下键可以直接调整
    meshFolder.add(mesh.position, 'x').step(10);
    meshFolder.add(mesh.position, 'y').step(10);
    meshFolder.add(mesh.position, 'z').step(10);

    // 使用Folder创建分组，控制灯光
    const lightFolder = gui.addFolder('Light');
    lightFolder.add(pointLight.position, 'x').step(10);
    lightFolder.add(pointLight.position, 'y').step(10);
    lightFolder.add(pointLight.position, 'z').step(10);
    lightFolder.add(pointLight, 'intensity').step(1000);

    // 创建自定义分组
    const customerFolder = gui.addFolder('Custom');
    const customerObj = {
        name: 'James',
        bool:false,
        num:100,
        color:'#ff0000',
        logic: function() {
            console.log("This is a custom logic");
        }
    }
    // onChange可以使用onChange方法写逻辑与模型交互
    customerFolder.add(customerObj, 'name').onChange((value) => {
        console.log('value', value);
    });
    customerFolder.add(customerObj, 'bool');
    customerFolder.add(customerObj, 'num').min(0).max(200).step(1);
    customerFolder.add(customerObj, 'color',["#ffffff","#00ff00"]);
    customerFolder.add(customerObj, 'logic');

    // 坐标系展示
    const axesHelper = new THREE.AxesHelper(400);
    // 添加坐标系到场景中，红色为x轴，绿色为y轴，蓝色为z轴
    scene.add(axesHelper);  

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 透视相机，参数为：视角（看的范围有多大）、宽高比（视锥体的宽高比例）、近平面、远平面
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    // 设置相机位置
    camera.position.set(200, 200, 200);
    // 照向(0,0,0)点，即观察原点
    camera.lookAt(0, 0, 0);

    // 创建辅助相机
    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height)

    function render() {
        renderer.render(scene, camera);
        // 使用requestAnimationFrame来优化渲染性能，进行一帧帧的循环渲染
        requestAnimationFrame(render);
    }

    render();

    document.body.append(renderer.domElement);

    // 添加轨道控制器，实现通过鼠标拖动来360°观察3D场景
    // 原理就是给convas元素增加事件监听，监听pointer（通用指针事件，如鼠标、触控、手写笔）、contextmenu（鼠标右键）、wheel（滚轮）等事件
    const controls = new OrbitControls(camera, renderer.domElement);
}

/**
 * ThreeJS渲染流程
 * 1.创建一个Scene；
 * 2.使用几何体和材质生成各种Mesh，并将Mesh添加到Scene中；
 * 3.设置相机的角度和可视范围，并将相机添加到Scene中；
 * 4.设置灯光，并将灯光添加到Scene中；
 * 5.使用Render进行渲染，渲染到convas元素上；
 * 6.将canvas元素挂载到dom中。
*/
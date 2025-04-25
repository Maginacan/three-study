import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


/**
 * 网格模型：
 * 几何体都是由顶点-->三角形-->几何体
 * 所有几何体都是一堆顶点数据，构成一堆三角形，三角形构成了任何几何体
 * 一个三角形有三个顶点，一个正方形就是六个顶点（两个三角形组成），一个立方体就是36个顶点（六个正方形组成）
 * 在ThreeJS中， BufferGeometry 是所有几何体的父类
 */
{
    const scene = new THREE.Scene();

    // 使用ThreeJS内置的几何体的时候，可以设置分段（segements），分段越多，顶点和三角形就越多，就越平滑，渲染越精细，但会降低性能，所以分段数不要设置太多，使用默认值即可
    const geometry = new THREE.BufferGeometry();
    // TypedArray描述了底层二进制数据缓冲区的类数组视图，例如Float32Array
    // 顶点数据存在重复，ThreeJS提供一个优化顶点存储的方案，使用顶点索引来来引用顶点
    const vertices = new Float32Array([
        0, 0, 0,
        100, 0, 0,
        0, 100, 0,
        // 100, 0, 0,
        // 0, 100, 0,
        100, 100, 0
    ]);

    // BufferAttribute参数是顶点数组，每个顶点由3个数值表示
    const attribute = new THREE.BufferAttribute(vertices, 3);
    // 顶点数据，每个顶点由3个数值表示
    geometry.attributes.position = attribute;

    // 在此处创建顶点索引
    const indexes = new Uint16Array([
        0, 1, 2, 2, 1, 3
    ]);
    geometry.index = new THREE.BufferAttribute(indexes, 1);
    
    /**
     * 在网格模型中，存在正方面的概念
     * 从相机看过去的方向，如果一个三角形是逆时针连接的的顶点，就是正面，顺时针就是反面，默认只展示正面。
     * 如果想让他双面可见，需要设置side属性
     */
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('orange'),
        // wireframe: true,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const pointLight = new THREE.PointLight(0xffffff, 10000);
    pointLight.position.set(80, 80, 80);
    scene.add(pointLight);

    const axesHelper = new THREE.AxesHelper(200);
    scene.add(axesHelper);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0);

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
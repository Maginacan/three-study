import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
/**
 * 点模型和线模型：
 * 直接渲染一个个的点和由点连成的一条条的线
 */

{
    const scene = new THREE.Scene();

    // 点模型
    // 1.先创建一个几何体
    const geometryPoints = new THREE.BufferGeometry();
    // 2.定义点
    const verticesPoints = new Float32Array([
        0, 0, 0, // x,y,z
        100, 0, 0,
        0, 100, 0,
        0, 0, 100,
        100, 100, 0
    ]);
    // 3.更改几何体的属性
    const attributePoints = new THREE.BufferAttribute(verticesPoints, 3);
    geometryPoints.attributes.position = attributePoints;
    // 4.创建几何体材质
    const materialPoints = new THREE.PointsMaterial({
        color: new THREE.Color('orange'),
        size: 5
    });
    // 5.创建mesh
    const points = new THREE.Points(geometryPoints, materialPoints);
    // 6.添加mesh进scene中
    scene.add(points);

    /**
     * 线模型：
     * 1.Line: 普通线段
     * 2.LineLoop：首尾相连的线段
     * 3.LineSegments：每两个点一条线段
     */
    const geometryLine = new THREE.BufferGeometry();
    const verticesLine = new Float32Array([
        100, 0, 0,
        100, 100, 0,
        100, 100, 100
    ])
    const attributeLine = new THREE.BufferAttribute(verticesLine, 3);
    geometryLine.attributes.position = attributeLine;
    const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color('red'),
    })
    const line = new THREE.Line(geometryLine, lineMaterial);
    // 创建首尾相连的线
    const lineLoop = new THREE.LineLoop(geometryLine, lineMaterial);
    // 每两个点一条线就需要使用LineSegments方法
    scene.add(line);
    scene.add(lineLoop);

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
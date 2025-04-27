// 曲线
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ellipseCurveLine from './EllipseCurve.js'
import splineCurveLine from './SplineCurve.js'
import quadraticBezierCurveline from './QuadraticBezierCurve.js'
import cubicBezierCurve3line from './CubicBezierCurve3.js'
import curveLine from './CurvePath.js'

{
    const scene = new THREE.Scene();

    scene.add(ellipseCurveLine);
    scene.add(splineCurveLine);
    scene.add(quadraticBezierCurveline);
    scene.add(cubicBezierCurve3line);
    scene.add(curveLine);

    const axesHelper = new THREE.AxesHelper(200);
    scene.add(axesHelper);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
    camera.position.set(0, 100, 200);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    render();

    document.body.append(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
}
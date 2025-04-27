import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';

/**
 * 材质：
 *  1.点模型：有专门的材质PointsMaterial
 *  2.线模型：LineBasicMaterial、LineDashedMaterial（虚线）
 *  3.网格模型：MeshBasicMaterial（不受光照影响）、MeshLambertMaterial（支持漫反射）、MeshPhongMaterial（镜面反射）等
 */
{
    const scene = new THREE.Scene();

    // const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
    // // BoxGeometry是为mesh准备的，为了渲染线模型需要使用EdgesGeometry转一下
    // const geometryLine = new THREE.EdgesGeometry(boxGeometry);
    // const materialLine = new THREE.LineDashedMaterial({
    //     color: 'orange',
    //     gapSize: 10,
    //     dashSize: 10,
    // })
    // const line = new THREE.Line(geometryLine, materialLine);
    // line.computeLineDistances();
    // scene.add(line);
    
    const loader = new THREE.TextureLoader();
    // // 地球
    // const texture = loader.load("../assets/diqiu.jpg");
    // texture.colorSpace = THREE.SRGBColorSpace;
    // const geometry = new THREE.SphereGeometry(100);
    // const material = new THREE.MeshBasicMaterial(({
    //     // color: new THREE.Color('blue'),
    //     // side: THREE.DoubleSide,
    //     // 设置透明度需要以下两个属性
    //     // transparent: true,
    //     // opacity: 0.5,
    //     // 纹理贴图，使用map进行指定
    //     map: texture,
    //     // 设置受环境影响的凹凸感
    //     aoMap: texture,
    // }));
    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    // 砖
    const textureZhuan = loader.load('../assets/zhuan.jpg');
    // 水平方向
    textureZhuan.wrapS = THREE.RepeatWrapping;
    // 垂直方向
    textureZhuan.wrapT = THREE.RepeatWrapping;
    textureZhuan.repeat.set(3, 3);
    textureZhuan.colorSpace = THREE.SRGBColorSpace;
    const geometryZhuan = new THREE.PlaneGeometry(1000, 1000);
    
    const materialZhuan = new THREE.MeshBasicMaterial({
        color: 'orange',
        map: textureZhuan,
        aoMap: textureZhuan,
        side: THREE.DoubleSide,
    });
    
    const meshZhuan = new THREE.Mesh(geometryZhuan, materialZhuan);
    scene.add(meshZhuan);

    const pointLight = new THREE.PointLight(0xffffff, 10000);
    pointLight.position.set(180, 180, 180);
    scene.add(pointLight);

    // const axesHelper = new THREE.AxesHelper(200);
    // scene.add(axesHelper);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100000);
    camera.position.set(90, 230, 1125);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height)

    function render() {
        // mesh.rotateZ(0.001)
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();

    document.body.append(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
}

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createNoise2D } from 'simplex-noise'
{
    const scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

    // 生产随机顶点数据
    // 使用噪声算法，生产随机但连续的数，让生成的山脉看起来更加平滑
    // 注意放在函数外面
    const noise2D = createNoise2D();
    // 此函数在render函数中调用
    function updatePosition() {
        const positions = geometry.attributes.position;
    
        for (let i = 0 ; i < positions.count; i ++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = noise2D(x / 300, y / 300) * 50;
            // 使用 sin 函数和当前时间，生成随机数
            // 加上 x * 0.01 的原因是为了让Z轴数字变化不一样，防止整体同上同下
            const sinNum = Math.sin(Date.now() * 0.001  + x * 0.01) * 5;
    
            positions.setZ(i, z + sinNum);
        }
        // positions可更新
        positions.needsUpdate = true;
    }
    
    

    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('orange'),
        wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI / 2)
    scene.add(mesh);

    // const axesHelper = new THREE.AxesHelper(200);
    // scene.add(axesHelper);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(450, 150, 100);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height)

    function render() {
        updatePosition();
        // 让mesh按照Z轴进行旋转，因为mesh是在xy平面上的
        mesh.rotateZ(0.001);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();

    document.body.append(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
}
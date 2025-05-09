import * as THREE from 'three';

const group = new THREE.Group();

// 创建播放按钮
function createPlaybtnConvas() {
    const dpr = window.devicePixelRatio;
    const convas = document.createElement('canvas');
    const w = convas.width = 100 * dpr;
    const h = convas.height = 100 * dpr;

    const c = convas.getContext('2d');
    // convas的translate通过在网格上将画布和原点水平移动X单位和垂直移动Y单位，向当前矩阵添加一个平移变换。
    c.translate(w / 2, h / 2);
    c.arc(0, 0, 40 * dpr, 0, Math.PI * 2);
    c.fillStyle = 'orange';
    c.fill();

    // 绘制三角形
    c.beginPath();
    c.moveTo(-10 * dpr, -20 * dpr);
    c.lineTo(-10 * dpr, 20 * dpr);
    c.lineTo(20 * dpr, 0);
    c.closePath();
    c.fillStyle = "#fff";
    c.fill();
    return convas;
};

// 创建五角星
function createStarConvas() {
    const dpr = window.devicePixelRatio;
    const canvas = document.createElement("canvas");
    const w = canvas.width = 100 * dpr;
    const h = canvas.height = 100 * dpr;

    const ctx = canvas.getContext('2d');
    ctx.moveTo(30 * dpr,20 * dpr);
    ctx.beginPath();
    ctx.lineTo(50 * dpr,0);
    ctx.lineTo(70 * dpr,20 * dpr);
    ctx.lineTo(100 * dpr,30 * dpr);
    ctx.lineTo(85 * dpr,60 * dpr);
    ctx.lineTo(80 * dpr,90 * dpr);
    ctx.lineTo(50 * dpr,80 * dpr);
    ctx.lineTo(20 * dpr,90 * dpr);
    ctx.lineTo(15 * dpr,60 * dpr);
    ctx.lineTo(0,30 * dpr);
    ctx.lineTo(30 * dpr,20 * dpr);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    return canvas;
};

function createPlane(x, y) {
    const texture = new THREE.CanvasTexture(createStarConvas());
    texture.colorSpace = THREE.SRGBColorSpace;
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshPhongMaterial({
        // color: 'white',
        map: texture,
    });
    const mesh =  new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    return mesh;
};

group.add(createPlane(-300, 0));
group.add(createPlane(0, 0));
group.add(createPlane(300, 0));

export default group;

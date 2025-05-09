import * as THREE from 'three';
import data from './data.js';
import createLabel from './label';

const group = new THREE.Group();

// 定义饼图大小
const R = 300;
function createPie(data) {
    let total = 0;
    data.forEach(item => {
        total += item.value;
    });

    const angles = data.map(item => {
        return item.value / total * 360;
    });

    let startAngle = 0;
    angles.map((angle, i) => {
        const curvePath = new THREE.CurvePath();

        // 用 MathUtils.degToRad 把角度转为弧度制
        const rad = THREE.MathUtils.degToRad(angle);
        const endAngle = startAngle + rad;

        const x1 = R * Math.cos(startAngle);
        const y1 = R * Math.sin(startAngle);

        const x2 = R * Math.cos(endAngle);
        const y2 = R * Math.sin(endAngle);

        const v1 = new THREE.Vector2(0, 0);
        const v2 = new THREE.Vector2(x1, y1);
        const v3 = new THREE.Vector2(x2, y2);

        const line1 = new THREE.LineCurve(v1, v2);
        curvePath.add(line1);

        const arc = new THREE.EllipseCurve(0, 0, R, R, startAngle, endAngle);
        curvePath.add(arc);

        const line2 = new THREE.LineCurve(v1, v3);
        curvePath.add(line2);

        const points = curvePath.getPoints(100);
        const shape = new THREE.Shape(points);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 100
        });

        const material = new THREE.MeshPhongMaterial({
            color: getRandomColor()
        });

        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

        // 点击饼图时，记录中间角度
        mesh.angle = (endAngle + startAngle) / 2;
        // 增加label
        const label = createLabel(data[i].name + ' ' + data[i].value);
        label.position.x = 400 * Math.cos(mesh.angle);
        label.position.y = 400 * Math.sin(mesh.angle);
        label.position.z = 150;
        mesh.add(label);

        label.target = mesh;
        mesh.target = mesh;

        // 下一个饼图的起始角度需要加上已经画过的角度
        startAngle += rad;
    })
}

let usedColor = [];
let colors = ['red', 'pink', 'blue', 'purple', 'orange', 'lightblue', 'green', 'lightgreen']
function getRandomColor() {
    let index = Math.floor(Math.random() * colors.length);
    while(usedColor.includes(index)) {
        index = Math.floor(Math.random() * colors.length);
    }
    usedColor.push(index);
    return colors[index];
};

createPie(data);

group.rotateX(- Math.PI / 3);

export default group;

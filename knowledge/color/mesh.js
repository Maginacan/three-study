import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const p1 = new THREE.Vector3(0, 0, 0);
const p2 = new THREE.Vector3(0, 100, 0);
const p3 = new THREE.Vector3(100, 0, 0);
geometry.setFromPoints([p1, p2, p3]);

const colors = new Float32Array([
    1, 0, 0, // p1颜色,红色
    0, 1, 0, // p2颜色，绿色
    0, 0, 1, // p3颜色，蓝色
]);
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

// const material = new THREE.PointsMaterial({
//     vertexColors: true,
//     // 设置点的大小
//     size: 30,
// });
// const points = new THREE.Points(geometry, material);
// export default points;

// const material = new THREE.LineBasicMaterial({
//     vertexColors: true,
// });
// const line = new THREE.LineLoop(geometry, material);

// export default line;

const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;

import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const p1 = new THREE.Vector3(0, 0, 0);
const p2 = new THREE.Vector3(300, 0, 0);
const p3 = new THREE.Vector3(0, 300, 0);

geometry.setFromPoints([p1, p2, p3]);

const material = new THREE.MeshBasicMaterial({
    color: 'orange',
});

const mesh = new THREE.Mesh(geometry, material);

// 使用射线来判断射线是否穿过某个三角形。
const ray = new THREE.Ray();
ray.origin.set(50, 50, 100);
ray.direction.set(0, 0, -1);

const arrowHelper = new THREE.ArrowHelper(ray.direction, ray.origin, 1000, 'red');
mesh.add(arrowHelper);

const point = new THREE.Vector3();
ray.intersectTriangle(p1, p2, p3, false, point);

export default mesh;
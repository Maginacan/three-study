import * as THREE from 'three';

function generateMesh(colorStr, x) {
    const geometry = new THREE.DodecahedronGeometry(100);
    const material = new THREE.MeshPhongMaterial({
        color: colorStr,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;

    return mesh;
};

const mesh1 = generateMesh('orange', 0);
const mesh2 = generateMesh('red', -300);
const mesh3 = generateMesh('blue', 300);

const group = new THREE.Group();
group.add(mesh1, mesh2, mesh3);
export default group;
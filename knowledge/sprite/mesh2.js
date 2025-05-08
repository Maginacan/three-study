import * as THREE from 'three';

const loader = new THREE.TextureLoader();
function createSprite(x, y ) {
    const textTure = loader.load( '../../assets/sprite.png' );
    const spriteMaterial = new THREE.SpriteMaterial({ map: textTure });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.x = x;
    sprite.position.y = y;
    return sprite;
}

function createMesh(color, x) {
    const geometry = new THREE.DodecahedronGeometry(1);
    const material = new THREE.MeshBasicMaterial({
        color: color
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    return mesh;    
}

const mesh = createMesh('orange', 0);
const mesh2 = createMesh('skyblue', 5);
const mesh3 = createMesh('lightgreen', -5);

const group = new THREE.Group();
group.add(mesh);
group.add(mesh2);
group.add(mesh3);

const sprite1 = createSprite(0, 1.5);
const sprite2 = createSprite(5, 1.5);
const sprite3 = createSprite(-5, 1.5);
group.add(sprite1);
group.add(sprite2);
group.add(sprite3);

export default group;
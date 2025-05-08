import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const textTure = loader.load('../../assets/snow.png');
const spriteMaterial = new THREE.SpriteMaterial({ map: textTure });

const group = new THREE.Group();

for(let i = 0; i < 10000; i++) {
    const sprite = new THREE.Sprite(spriteMaterial);

    const x = 1000 * Math.random();
    const y = 1000 * Math.random();
    const z = 1000 * Math.random();
    sprite.position.set(x, y, z);
    group.add(sprite);
};

function render() {
    group.children.forEach(item => {
        item.position.y -= 0.1;
        if(item.position.y < 1000) {
            item.position.y = 1000;
        }
    });

    requestAnimationFrame(render);
};

render();

export default group;
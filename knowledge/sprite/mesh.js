import * as THREE from 'three';

const group = new THREE.Group();

const material = new THREE.SpriteMaterial({
    color: 'pink',
});

const sprite = new THREE.Sprite(material);

group.add(sprite);

export default group;


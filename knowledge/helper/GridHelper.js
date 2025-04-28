import * as THREE from 'three';

// 二维坐标中绘制网格
const gridHelper = new THREE.GridHelper(1000, 10,  new THREE.Color('0x008000'), new THREE.Color('0xFFC0CB'));

export { gridHelper };
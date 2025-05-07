import * as THREE from 'three';

const group = new THREE.Group();

function generateBox(colorStr, x, y, z) {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial({
        color: colorStr,
    })

    const box = new THREE.Mesh(geometry, material);
    box.position.set(x, y, z);

    return box;
};

const box = generateBox('blue', 0, 0, 0);
const box2 = generateBox('green', 0, 0, 300);
const box3 =generateBox('red', 300, 0, 0);
group.add(box, box2, box3);

// // 创建射线穿过模型，使用setTimeout实现异步，防止render未完成
// setTimeout(() => {
//     // 使用RayCaster来判断射线是否与网格模型相交，并改变颜色
//     const rayCaster = new THREE.Raycaster();
//     rayCaster.ray.origin.set(-100, 30, 0);
//     rayCaster.ray.direction.set(1, 0, 0);

//     const arrowHelper = new THREE.ArrowHelper(rayCaster.ray.direction, rayCaster.ray.origin, 600);
//     group.add(arrowHelper);

//     const intersects = rayCaster.intersectObjects([box, box2, box3]);
//     console.log(intersects);

//     intersects.forEach(item => {
//         item.object.material.color.set('pink');
//     })
// }, 0);

/**
 * 为了实现点击屏幕上某个模型，创建一条射线穿过模型
 * 1.使用相机位置作为射线原点；
 * 2.使用转换的坐标系，确定点击的位置，作为射线的方向；
 * 3.创建射线，实现点击模型改变颜色。
 */
/**
 * 坐标转换规则：
 * 1.点击某点时，可以确定点击位置距离convas左上角的offsetX和offsetY；
 * 2.根据offsetX/canvas的宽度，offsetY/convas的高度，计算出0-1之间的值；
 * 3.计算出的值*2，在减去1，就将点击位置的坐标转换为了-1到1之间的值；
 * 4.因为Y轴的方向是向下的，所以需要将值取反。
 */
// 具体代码见ray.js中最后部分
export default group;

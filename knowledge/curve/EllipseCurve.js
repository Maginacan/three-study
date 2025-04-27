// 椭圆或者圆形曲线
import * as THREE from 'three';

// 第一二个为原点，后面为长短轴长度，第五六个可以设置起始结束的角度
const arc = new THREE.EllipseCurve(0, 0, 100, 50);
// 将曲线分为20段，也就有了21个点
const pointList = arc.getPoints(20);

const gemetry = new THREE.BufferGeometry();
gemetry.setFromPoints(pointList);

// 点模型
const materialPoint = new THREE.PointsMaterial({
    color: 'orange',
    size: 10,
});
const pointsMesh = new THREE.Points(gemetry, materialPoint);

// 线模型
const materialLine = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange')
})
const ellipseCurveLine = new THREE.Line(gemetry, materialLine);
ellipseCurveLine.add(pointsMesh)

export default ellipseCurveLine;